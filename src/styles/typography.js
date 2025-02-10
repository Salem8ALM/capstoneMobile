import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const FONTS = {
  sizes: {
    small: width * 0.035,
    medium: width * 0.04,
    large: width * 0.06,
    xlarge: width * 0.08,
  },
  weights: {
    regular: "400",
    medium: "500",
    bold: "700",
  }
}; 