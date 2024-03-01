import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale} from '../../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
});
export default styles;
