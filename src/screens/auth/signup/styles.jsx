import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';
import fontFamily from '../../../utils/fontFamily';
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: moderateScale(220),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {width: moderateScale(110), height: moderateScale(110)},
  inputContainer: {
    paddingHorizontal: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(20),
    top: moderateScale(100),
  },
  forgot: {
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_MEDIUM,
    color: colors.blue,
  },
  forgotContainer: {marginTop: moderateScale(20), alignItems: 'flex-end'},
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(100),
    borderRadius: moderateScale(40),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
  },
  buttonGoogleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
    borderRadius: moderateScale(40),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    flex: 1,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    alignSelf: 'center', // Center the button horizontally
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(40),
  },
  buttonGoogleText: {
    color: colors.white,
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
  },
  buttonGoogle: {
    width: '90%',
    alignSelf: 'center', // Center the button horizontally
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(40),
  },
  errorText: {
    marginTop: moderateScale(5),
    color: colors.red,
  },
  google: {
    width: moderateScale(28),
    height: moderateScale(28),
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.white,
    minHeight: screenHeight, // Set the minimum height to the screen height
  },
});
export default styles;
