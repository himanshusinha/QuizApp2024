// styles.js
import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../utils/responsiveSize';
import fontFamily from '../../../utils/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  flatListContent: {
    alignItems: 'center',
  },
  card: {
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: 'lightblue',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    bottom: moderateScale(50),
    width: '60%',
    borderRadius: moderateScale(30),
  },
  buttonText: {
    fontFamily: fontFamily.POPPINS_BOLD,
    fontSize: textScale(18),
    color: colors.white,
  },
  buttonStyle: {
    borderRadius: moderateScale(40),
    height: moderateScale(45),
  },
  testNumber: {
    fontSize: textScale(20),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    top: moderateScale(230),
    position: 'absolute',
  },
});

export default styles;
