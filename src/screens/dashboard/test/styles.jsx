import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale} from '../../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  itemContainer: {
    width: '100%',
  },
  flatListContainer: {
    width: '100%',
  },
});
export default styles;
