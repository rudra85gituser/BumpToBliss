import { StyleSheet } from 'react-native';

export const ICON_SIZE = 128;
export const LOGO_WIDTH = 76;
export const LOGO_HEIGHT = 71;
export const GLOW_SIZE = 201;

export const sharedStyles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  image: {
    position: 'absolute',
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
});
