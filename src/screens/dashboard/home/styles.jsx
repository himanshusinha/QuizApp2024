import {StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../../utils/responsiveSize';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curvedContainer: {
    width: moderateScale(400),
    height: moderateScale(400),
    backgroundColor: colors.blue,
    overflow: 'hidden',
    borderBottomLeftRadius: moderateScale(200),
    borderBottomRightRadius: moderateScale(200),
  },

  flatListContainer: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(5),
  },
});

export default styles;
