//example code for image picker utils, to be replaced with actual image picker utils


/**
 * 
 * import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
export type ImageResponseType = {
  uri: string;
  mimeType: string;
};
export const imagePickerHandler = async (
  options?: Partial<ImageLibraryOptions>,
): Promise<ImageResponseType[] | undefined> => {
  const cameraOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
    selectionLimit: 0, // 0 means no limit
    ...options,
  };

  try {
    const result = await launchImageLibrary(cameraOptions);

    if (result.didCancel) {
      console.log('User cancelled image picker');
      return undefined;
    }

    if (result.errorCode) {
      console.log('ImagePicker Error:', result.errorMessage);
      throw new Error(result.errorMessage || 'Image picker error');
    }

    if (!result.assets || result.assets.length === 0) {
      return [];
    }

    return getBase64ImageInfo(result);
  } catch (error) {
    console.log('Error selecting image:', error);
    throw error;
  }
};

export const openCameraHandler = async (
  options?: Partial<ImageLibraryOptions>,
): Promise<ImageResponseType[] | undefined> => {
  const cameraOptions: CameraOptions = {
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
    saveToPhotos: true,
    ...options,
  };

  try {
    const result = await launchCamera(cameraOptions);

    if (result.didCancel) {
      console.log('User cancelled camera');
      return undefined;
    }

    if (result.errorCode) {
      console.log('Camera Error:', result.errorMessage);
      return undefined;
    }

    return getBase64ImageInfo(result);
  } catch (error) {
    console.log('Error capturing image:', error);
    throw error;
  }
};

export const getBase64ImageInfo = (result: ImagePickerResponse) => {
  return result.assets?.map(asset => ({
    uri: asset?.base64 ?? '',
    mimeType: asset?.type ?? '',
  }));
};

 */