import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {moderateScale, textScale} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: textScale(25),
    color: colors.white,
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(120),
  },
});
export default styles;
