import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {moderateScale, textScale} from '../../utils/responsiveSize';
import fontFamily from '../../utils/fontFamily';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(45),
    borderRadius: moderateScale(10),
  },
  imageStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(5),
    marginHorizontal: moderateScale(10),
    marginLeft: moderateScale(10),
    marginEnd: moderateScale(10),
  },
  inputStyle: {
    flex: 1,
    height: moderateScale(45),
    borderRadius: moderateScale(10),
    paddingStart: moderateScale(10),
    color: colors.black,
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
});
export default styles;
