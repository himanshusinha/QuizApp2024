import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const SignUpText = ({onPress, dontText, signUpText}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textDont}>{dontText}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Text style={styles.textSignUp}>{signUpText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpText;
