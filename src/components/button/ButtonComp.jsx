import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

const ButtonComp = ({
  onPress = () => {},
  text = '',
  style = {},
  leftImg = null,
  textStyle = {},
  leftImageStyle = {},
  isLoading = false,
  buttonDisabled,
  activeOpacity,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={buttonDisabled}
      style={{...styles.container, ...style}}
      onPress={onPress}>
      {!!leftImg && (
        <Image
          source={leftImg}
          style={{...styles.leftImageStyle, ...leftImageStyle}}
        />
      )}
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComp;
