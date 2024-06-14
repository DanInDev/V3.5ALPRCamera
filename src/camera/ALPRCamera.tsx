import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, runAsync, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';

import { OCRFrame, scanOCR } from '@DanInDev/vision-camera-ocr';
import { Worklets } from 'react-native-worklets-core';
import { applyFilterFunctions } from '../filtering/filterService';
import { callLimiter } from '../api/callLimiter';
import { ALPRCameraProps } from './ALPRCameraProps';
import { DefaultPermissionPage } from '../pages/defaultPermissionPage';
import { DefaultNoCameraDeviceError } from '../pages/noCameraDeviceError';

import RNFS from 'react-native-fs';

export const ALPRCamera: React.FC<ALPRCameraProps> = ({
  isActive = true,
  OnPlateRecognized,
  OnCallLimitReached,
  OnPictureTaken,
  callLimit,
  filterOption = 'DK',
  cameraStyle,
  PermissionPage,
  NoCameraDevicePage,
  takePictureButtonStyle,
  takePictureButtonTextStyle,
  takePictureButtonText,
  torch = "off",
  children,
}: ALPRCameraProps) => {

  // Hook to check if the app has camera permissions
  const { hasPermission } = useCameraPermission();

  // Hook for camera device
  const device = useCameraDevice('back');

  // Camera reference, required for taking pictures
  const camera = useRef<Camera>(null);

  const currentFilterRef = useRef<string>(filterOption);

  const [currentFilter, setCurrentFilter] = useState<string>(filterOption);

  console.log ('First filter is: ', currentFilter)

  
  useEffect(() => {
    currentFilterRef.current = filterOption;
    setCurrentFilter(filterOption);
    console.log ('Filter changed to: ', currentFilter)
  }, [filterOption]);

  const findPlatesAndVerify = Worklets.createRunOnJS((ocrFrame: OCRFrame) => {
    const ocrResult = applyFilterFunctions(ocrFrame, currentFilterRef.current);

    if (OnPlateRecognized) {
      OnPlateRecognized(ocrResult);
    }

    if (ocrResult !== null) {
      callLimiter(ocrResult, callLimit || 0, (result: string | null) => {
        if (result !== null) {
          console.log(`APILimiter[${callLimit || 0}] has recognized: ${ocrResult}\n`);
          if (OnCallLimitReached) {
            OnCallLimitReached(result);
          }
        }
      });
    }
  });


  // Takes a picture utilzing the camera, and returns a blob with a callback and deletes the file
  const takePicture = async (): Promise<Blob | null> => {
    if (camera.current !== null) {
      const file = await camera.current.takePhoto({ enableShutterSound: false });
      const result = await fetch(`file://${file.path}`);
      const data = await result.blob();

      // Call the callback function with the blob
      if (OnPictureTaken) {
        OnPictureTaken(data);
      }

      // Delete the file after the blob is processed
      try {
        await RNFS.unlink(file.path);
        console.log('File deleted successfully');
      } catch (error) {
        console.error('Failed to delete file', error);
      }

      return data;
    }
    console.log('Camera not found');
    return null;
  };

  // Main frameprocessor that runs the SCANOCR plugin and uses the filters to find license plates
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    runAsync(frame, () => {
      'worklet';
      const ocrFrame = scanOCR(frame);
      findPlatesAndVerify(ocrFrame);
    });
  }, []);

  // Conditional rendering after all hooks are defined
  if (!hasPermission) {
    return PermissionPage || <DefaultPermissionPage />;
  }

  if (device == null) {
    return NoCameraDevicePage || <DefaultNoCameraDeviceError />;
  }


  return (
    <View style={cameraStyle || { flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
        photo={true}
        enableZoomGesture={true}
        torch={torch}
        resizeMode='cover'
      />
      {children}
      {takePictureButtonStyle || takePictureButtonText ? (
        <TouchableOpacity onPress={takePicture} style={takePictureButtonStyle}>
          {takePictureButtonText ? (
            <Text style={takePictureButtonTextStyle}>{takePictureButtonText}</Text>
          ) : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ALPRCamera;
