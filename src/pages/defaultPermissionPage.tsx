import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';

export const DefaultPermissionPage = () => {
  const { requestPermission } = useCameraPermission();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 }}
      >
        {'Camera Permission Denied'}
      </Text>
      <TouchableOpacity
        style={{ width: 'auto', backgroundColor: 'green', height: 'auto', borderRadius: 5, padding: 10 }}
        onPress={requestPermission}
      >
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>REQUEST CAMERA PERMISSION</Text>
      </TouchableOpacity>
    </View>
  );
};
