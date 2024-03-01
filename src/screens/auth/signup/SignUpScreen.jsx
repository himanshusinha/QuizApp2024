import React from 'react';
import {View, Image, Text} from 'react-native';
import {Formik} from 'formik';
import styles from './styles';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import TextInputWithLabel from '../../../components/textinputfield/TextInputWithLabel';
import ButtonComp from '../../../components/button/ButtonComp';
import {useNavigation} from '@react-navigation/native';
import signUpValidationSchema from '../../../utils/signUpValidationSchema';
import SignUpText from '../../../components/signupText/SignUpText';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const handleLogin = values => {
    console.log('Form values:', values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={images.quiz} style={styles.logo} />
      </View>

      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        onSubmit={handleLogin}
        validationSchema={signUpValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInputWithLabel
                leftIcon={images.user}
                mode="outlined"
                label="Email"
                placeholder="Please Enter Email"
                outlineColor={colors.color1_light2}
                activeOutlineColor={colors.color1_light2}
                textColor={colors.blackOpacity30}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInputWithLabel
                leftIcon={images.lock}
                rightIcon={images.hide}
                mode="outlined"
                label="Password"
                placeholder="Please Enter Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                secureTextEntry={true}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInputWithLabel
                leftIcon={images.lock}
                rightIcon={images.hide}
                mode="outlined"
                label="Password"
                placeholder="Please Enter Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                secureTextEntry={true}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComp
                text="Sign Up"
                textStyle={styles.buttonText}
                style={styles.button}
                onPress={handleSubmit}
              />
            </View>

            <SignUpText
              dontText="Already have an account?"
              signUpText="Login"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpScreen;
