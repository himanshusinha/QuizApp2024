import {StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../utils/responsiveSize';
import fontFamily from '../../utils/fontFamily';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  textDont: {
    fontFamily: fontFamily.POPPINS_MEDIUM,
    fontSize: textScale(14),
    color: colors.black,
  },
  textSignUp: {
    fontFamily: fontFamily.POPPINS_MEDIUM,
    fontSize: textScale(14),
    color: colors.blue,
    marginStart: moderateScale(5),
  },
  textContainer: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
