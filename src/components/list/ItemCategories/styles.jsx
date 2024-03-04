import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import fontFamily from '../../../utils/fontFamily';
import {moderateScale, textScale} from '../../../utils/responsiveSize';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(15),
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2),
  },
  category: {
    fontSize: textScale(16),
    fontFamily: fontFamily.POPPINS_BOLD,
  },
  test: {
    fontSize: textScale(12),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    top: moderateScale(4),
    color: colors.blue,
  },
  flatListContainer: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(5),
  },
});
export default styles;
