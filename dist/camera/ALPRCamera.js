"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPRCamera = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_vision_camera_1 = require("react-native-vision-camera");
var react_native_worklets_core_1 = require("react-native-worklets-core");
var callLimiter_1 = require("../api/callLimiter");
var defaultPermissionPage_1 = require("../pages/defaultPermissionPage");
var noCameraDeviceError_1 = require("../pages/noCameraDeviceError");
var react_native_fs_1 = __importDefault(require("react-native-fs"));
var react_native_vision_camera_text_recognition_1 = require("react-native-vision-camera-text-recognition");
var ALPRCamera = function (_a) {
    var _b = _a.isActive, isActive = _b === void 0 ? true : _b, OnPlateRecognized = _a.OnPlateRecognized, OnCallLimitReached = _a.OnCallLimitReached, OnPictureTaken = _a.OnPictureTaken, callLimit = _a.callLimit, _c = _a.filterOption, filterOption = _c === void 0 ? 'DK' : _c, cameraStyle = _a.cameraStyle, PermissionPage = _a.PermissionPage, NoCameraDevicePage = _a.NoCameraDevicePage, takePictureButtonStyle = _a.takePictureButtonStyle, takePictureButtonTextStyle = _a.takePictureButtonTextStyle, takePictureButtonText = _a.takePictureButtonText, _d = _a.torch, torch = _d === void 0 ? "off" : _d, children = _a.children;
    // Hook to check if the app has camera permissions
    var hasPermission = (0, react_native_vision_camera_1.useCameraPermission)().hasPermission;
    // Hook for camera device
    var device = (0, react_native_vision_camera_1.useCameraDevice)('back');
    // Camera reference, required for taking pictures
    var camera = (0, react_1.useRef)(null);
    var currentFilterRef = (0, react_1.useRef)(filterOption);
    var _e = (0, react_1.useState)(filterOption), currentFilter = _e[0], setCurrentFilter = _e[1];
    console.log('First filter is: ', currentFilter);
    (0, react_1.useEffect)(function () {
        currentFilterRef.current = filterOption;
        setCurrentFilter(filterOption);
        console.log('Filter changed to: ', currentFilter);
    }, [filterOption]);
    var findPlatesAndVerify = react_native_worklets_core_1.Worklets.createRunOnJS(function (text) {
        //const ocrResult = applyFilterFunctions(text, currentFilterRef.current);
        var ocrResult = text;
        if (OnPlateRecognized) {
            OnPlateRecognized(ocrResult);
        }
        if (ocrResult !== null) {
            (0, callLimiter_1.callLimiter)(ocrResult, callLimit || 0, function (result) {
                if (result !== null) {
                    console.log("APILimiter[".concat(callLimit || 0, "] has recognized: ").concat(ocrResult, "\n"));
                    if (OnCallLimitReached) {
                        OnCallLimitReached(result);
                    }
                }
            });
        }
    });
    // Takes a picture utilzing the camera, and returns a blob with a callback and deletes the file
    var takePicture = function () { return __awaiter(void 0, void 0, void 0, function () {
        var file, result, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(camera.current !== null)) return [3 /*break*/, 8];
                    return [4 /*yield*/, camera.current.takePhoto({ enableShutterSound: false })];
                case 1:
                    file = _a.sent();
                    return [4 /*yield*/, fetch("file://".concat(file.path))];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, result.blob()];
                case 3:
                    data = _a.sent();
                    // Call the callback function with the blob
                    if (OnPictureTaken) {
                        OnPictureTaken(data);
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, react_native_fs_1.default.unlink(file.path)];
                case 5:
                    _a.sent();
                    console.log('File deleted successfully');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Failed to delete file', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, data];
                case 8:
                    console.log('Camera not found');
                    return [2 /*return*/, null];
            }
        });
    }); };
    var options = { language: 'latin', mode: 'recognize' };
    var scanText = (0, react_native_vision_camera_text_recognition_1.useTextRecognition)(options).scanText;
    // Main frameprocessor that runs the SCANOCR plugin and uses the filters to find license plates
    var frameProcessor = (0, react_native_vision_camera_1.useFrameProcessor)(function (frame) {
        'worklet';
        (0, react_native_vision_camera_1.runAsync)(frame, function () {
            'worklet';
            var data = scanText(frame);
            console.log(data, 'data');
            findPlatesAndVerify(data.result.result.text);
        });
    }, []);
    // Conditional rendering after all hooks are defined
    if (!hasPermission) {
        return PermissionPage || react_1.default.createElement(defaultPermissionPage_1.DefaultPermissionPage, null);
    }
    if (device == null) {
        return NoCameraDevicePage || react_1.default.createElement(noCameraDeviceError_1.DefaultNoCameraDeviceError, null);
    }
    return (react_1.default.createElement(react_native_1.View, { style: cameraStyle || { flex: 1 } },
        react_1.default.createElement(react_native_vision_camera_1.Camera, { ref: camera, style: react_native_1.StyleSheet.absoluteFill, device: device, isActive: isActive, frameProcessor: frameProcessor, photo: true, enableZoomGesture: true, torch: torch, resizeMode: 'cover' }),
        children,
        takePictureButtonStyle || takePictureButtonText ? (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: takePicture, style: takePictureButtonStyle }, takePictureButtonText ? (react_1.default.createElement(react_native_1.Text, { style: takePictureButtonTextStyle }, takePictureButtonText)) : null)) : null));
};
exports.ALPRCamera = ALPRCamera;
exports.default = exports.ALPRCamera;
