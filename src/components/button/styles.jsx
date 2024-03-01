import colors from '../../constants/colors';
import {StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../utils/responsiveSize';

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    height: moderateScale(52),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Change the flexDirection to row
    paddingHorizontal: moderateScale(16),
  },
  leftImageStyle: {
    marginRight: moderateScale(8), // Add margin to separate the image from text
  },
  textStyle: {
    color: colors.white,
    fontSize: textScale(16),
  },
});

export default styles;
