import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
/**
  
  * The properties of the ALPR camera component.
  
 */
export interface ALPRCameraProps {
    /**
   * Boolean determining whether the camera should be active or not.
   * IsActive = true, by default. To limit memory usage and batterylife when the camera is not displayed
   * or not in focus set isActive = false.
   */
    isActive?: boolean;
    /**
     * Function invoked when a plate is recognized.
     *
     * @param {string | null} result - The recognized plate.
     */
    OnPlateRecognized?: (result: string | null) => void;
    /**
     * Function invoked when a picture is taken.
     *
     * @param {string | null} string - The image path.
     */
    OnPictureTaken?: (blob: Blob | null) => void;
    /**
   * @param cameraStyle ViewStyle for the camera portion of the component
   */
    cameraStyle?: ViewStyle;
    /**
  * @param PermissionPage Replace the default Permissions page, to ask for camera permissions
  */
    PermissionPage?: React.JSX.Element;
    /**
  * @param NoCameraDevicePage Replace the default NoCameraDevice page, when no camera device is found
  */
    NoCameraDevicePage?: React.JSX.Element;
    /**
     * @param takePictureButtonStyle ViewStyle for the take picture button
     */
    takePictureButtonStyle?: ViewStyle;
    /**
     * @param takePictureButtonTextStyle TextStyle for the take picture button's text
     */
    takePictureButtonTextStyle?: TextStyle;
    /**
   * @param takePictureButtonText Text on the picture button
   */
    takePictureButtonText?: string;
    /**
     * Type determining whether the torch should be on or off.
     */
    torch?: 'off' | 'on';
    /**
     * Function invoked when the call limit is reached.
     *
     * @param {string | null} result - The result indicating API call limit reached.
     */
    OnCallLimitReached?: (result: string | null) => void;
    /**
     * The amount of times a license plate has to be read before it triggers this function.
     * See {@link callLimiter} for more specifics.
     */
    callLimit?: number;
    /**
     * Specify the filterOption to be used with its Key as a string, which has been added via. the addFilterToMap function.
     * Default filter is "DK" (Danish/Norwegian license plates).
     */
    filterOption?: string;
    /**
     *  Option to implement children nodes inside the ALPR camera.
     */
    children?: ReactNode;
}
export default ALPRCameraProps;
