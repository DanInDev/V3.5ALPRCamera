"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNoCameraDeviceError = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var DefaultNoCameraDeviceError = function () { return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
    react_1.default.createElement(react_native_1.Text, null, 'No Cameras Found'),
    react_1.default.createElement(react_native_1.TouchableOpacity, { style: { width: 'auto', backgroundColor: 'green', height: 'auto' } },
        react_1.default.createElement(react_native_1.Text, { style: { fontSize: 18 } }, "No Camera Device was Found!")))); };
exports.DefaultNoCameraDeviceError = DefaultNoCameraDeviceError;
