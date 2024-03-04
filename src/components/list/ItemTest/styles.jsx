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
    width: '92.5%',
  },
  category: {
    fontSize: textScale(16),
    fontFamily: fontFamily.POPPINS_BOLD,
  },
  test: {
    fontSize: textScale(18),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
  },
  flatListContainer: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(5),
    width: '100%',
  },
  progressBar: {
    marginTop: moderateScale(10),
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  scoreText: {
    color: colors.blue,
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    fontSize: textScale(14),
  },
});
export default styles;
