import {StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../utils/responsiveSize';
import fontFamily from '../../utils/fontFamily';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    bottom: moderateScale(20),
  },
  title: {
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    color: colors.white,
  },
  menu: {backgroundColor: colors.white},
  header: {
    backgroundColor: colors.blue,
    height: moderateScale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
