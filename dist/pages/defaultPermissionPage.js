"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPermissionPage = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_vision_camera_1 = require("react-native-vision-camera");
var DefaultPermissionPage = function () {
    var requestPermission = (0, react_native_vision_camera_1.useCameraPermission)().requestPermission;
    return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
        react_1.default.createElement(react_native_1.Text, { style: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 } }, 'Camera Permission Denied'),
        react_1.default.createElement(react_native_1.TouchableOpacity, { style: { width: 'auto', backgroundColor: 'green', height: 'auto', borderRadius: 5, padding: 10 }, onPress: requestPermission },
            react_1.default.createElement(react_native_1.Text, { style: { fontSize: 18, color: 'white', fontWeight: 'bold' } }, "REQUEST CAMERA PERMISSION"))));
};
exports.DefaultPermissionPage = DefaultPermissionPage;
