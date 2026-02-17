import { useFonts as useExpoFonts } from 'expo-font';

export function useFonts() {
  const [loaded, error] = useExpoFonts({
    'SharpSans-Thin': require('../assets/fonts/Sharp Sans Thin.otf'),
    'SharpSans-ThinItalic': require('../assets/fonts/Sharp Sans Thin Italic.otf'),
    'SharpSans-Light': require('../assets/fonts/Sharp Sans Light.otf'),
    'SharpSans-LightItalic': require('../assets/fonts/Sharp Sans Light Italic.otf'),
    'SharpSans-Regular': require('../assets/fonts/Sharp Sans.otf'),
    'SharpSans-Italic': require('../assets/fonts/Sharp Sans Italic.otf'),
    'SharpSans-Medium': require('../assets/fonts/Sharp Sans Medium.otf'),
    'SharpSans-MediumItalic': require('../assets/fonts/Sharp Sans Medium Italic.otf'),
    'SharpSans-Semibold': require('../assets/fonts/Sharp Sans Semibold.otf'),
    'SharpSans-SemiboldItalic': require('../assets/fonts/Sharp Sans Semibold Italic.otf'),
    'SharpSans-Bold': require('../assets/fonts/SharpSansBold.otf'),
    'SharpSans-BoldItalic': require('../assets/fonts/Sharp Sans Bold Italic.otf'),
    'SharpSans-Extrabold': require('../assets/fonts/Sharp Sans Extrabold.otf'),
    'SharpSans-ExtraboldItalic': require('../assets/fonts/Sharp Sans ExtraBold Italic.otf'),
  });

  return { loaded, error };
}

export const fontFamilies = {
  thin: 'SharpSans-Thin',
  thinItalic: 'SharpSans-ThinItalic',
  light: 'SharpSans-Light',
  lightItalic: 'SharpSans-LightItalic',
  regular: 'SharpSans-Regular',
  italic: 'SharpSans-Italic',
  medium: 'SharpSans-Medium',
  mediumItalic: 'SharpSans-MediumItalic',
  semibold: 'SharpSans-Semibold',
  semiboldItalic: 'SharpSans-SemiboldItalic',
  bold: 'SharpSans-Bold',
  boldItalic: 'SharpSans-BoldItalic',
  extrabold: 'SharpSans-Extrabold',
  extraboldItalic: 'SharpSans-ExtraboldItalic',
} as const;
