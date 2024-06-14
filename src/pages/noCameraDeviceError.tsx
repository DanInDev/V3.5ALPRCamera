import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export const DefaultNoCameraDeviceError = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'No Cameras Found'}</Text>
        <TouchableOpacity style={{ width: 'auto', backgroundColor: 'green', height: 'auto' }}>
            <Text style={{ fontSize: 18 }}>No Camera Device was Found!</Text>
        </TouchableOpacity>
    </View>
);