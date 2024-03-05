import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../utils/responsiveSize';
import fontFamily from '../../../utils/fontFamily';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(15),
    height: moderateScale(130),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2),
    width: '92.5%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  textContainer: {
    marginVertical: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.black,
    top: moderateScale(14),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    fontSize: textScale(14),
  },
  subtitle: {
    color: colors.black,
    top: moderateScale(25),
    fontFamily: fontFamily.POPPINS_BOLD,
    fontSize: textScale(16),
  },
});
export default styles;
