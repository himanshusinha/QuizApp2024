import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import images from '../../constants/images';
import styles from './styles';
import colors from '../../constants/colors';
import {moderateScale} from '../../utils/responsiveSize';

const TextInputWithLabel = ({
  value,
  onChangeText,
  placeholder,
  rightIcon,
  leftIcon,
  secureTextEntry,
  placeholderTextColor,
  keyboardType,
  autoCapitalize,
  autoCorrect,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  const inputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: isFocused ? colors.blue : colors.grey, // Change border color when focused
          borderBottomWidth: moderateScale(0.5),
        },
      ]}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => inputRef.current.focus()}>
        <Image
          source={leftIcon}
          style={[
            styles.imageStyle,
            {tintColor: isFocused ? colors.blue : colors.grey},
          ]}
        />
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!isPasswordVisible && secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={handleFocus} // Call handleFocus when the input is focused
          onBlur={handleBlur} // Call handleBlur when the input is blurred
          style={styles.inputStyle}
        />
        {rightIcon && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={isPasswordVisible ? images.show : images.hide}
              style={[
                styles.imageStyle,
                {tintColor: isFocused ? colors.blue : colors.grey},
              ]}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TextInputWithLabel;
