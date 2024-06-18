import React from 'react';
import { StyleSheet } from "react-native";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { DefaultPermissionPage } from '../src/pages/defaultPermissionPage';
import { DefaultNoCameraDeviceError } from '../src/pages/noCameraDeviceError';
import { useTextRecognition } from "react-native-vision-camera-text-recognition";
import { TextRecognitionOptions } from 'react-native-vision-camera-text-recognition/lib/typescript/src/types';

function App() {
// Hook to check if the app has camera permissions
const { hasPermission } = useCameraPermission();

// Hook for camera device
const device = useCameraDevice('back');
 
  // Conditional rendering after all hooks are defined
  if (!hasPermission) {
    return <DefaultPermissionPage />;
  }

  if (device == null) {
    return <DefaultNoCameraDeviceError />;
  }

  const options:TextRecognitionOptions = { language : 'latin', mode: 'recognize' }
  const {scanText} = useTextRecognition(options)

  // Main frameprocessor that runs the SCANOCR plugin and uses the filters to find license plates
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    runAsync(frame, () => {
      'worklet';
  
      const data = scanText(frame)
      console.log(data, 'data')

    });
  }, []);
  return (
    <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          frameProcessor={frameProcessor}
        />
    </>
  );
}
export default App;