import {StyleSheet} from 'react-native';
import {moderateScale} from '../utils/responsiveSize';

const styles = StyleSheet.create({
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    top: moderateScale(7),
  },
});
export default styles;
