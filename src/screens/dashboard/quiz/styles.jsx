import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../utils/responsiveSize';
import fontFamily from '../../../utils/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: moderateScale(50),
    backgroundColor: colors.purple,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: textScale(16),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    color: colors.white,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: moderateScale(140),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: colors.white,
  },
  content: {
    flex: 1,
    marginTop: moderateScale(40),
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: colors.white,
    margin: moderateScale(10),
    height: moderateScale(400),
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(40),
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2),
    justifyContent: 'center',
  },
  questionText: {
    marginHorizontal: moderateScale(20),
  },
  optionContainer: {
    backgroundColor: colors.white,
    margin: moderateScale(10),
    borderRadius: moderateScale(10),
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2),
    justifyContent: 'center',
  },
  optionContent: {
    marginHorizontal: moderateScale(20),
  },
  optionText: {
    paddingVertical: moderateScale(10),
  },
  footer: {
    height: Platform.OS === 'ios' ? moderateScale(70) : moderateScale(50),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButtons: {
    flexDirection: 'row',
    paddingStart: moderateScale(10),
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.purple,
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.5),
    padding: 5,
  },
  buttonIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: colors.white,
  },
  buttonText: {
    fontSize: textScale(10),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
  },
});
export default styles;
