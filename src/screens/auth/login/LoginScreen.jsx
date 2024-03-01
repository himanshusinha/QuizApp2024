import React from 'react';
import {View, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Formik} from 'formik';
import styles from './styles';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import TextInputWithLabel from '../../../components/textinputfield/TextInputWithLabel';
import ButtonComp from '../../../components/button/ButtonComp';
import strings from '../../../constants/strings';
import loginValidationSchema from '../../../utils/loginValidationSchema';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';
import SignUpText from '../../../components/signupText/SignUpText';

const LoginScreen = () => {
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
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}
        validationSchema={loginValidationSchema}>
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
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.forgotContainer}>
                <Text style={styles.forgot}>{strings.FORGOT}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComp
                text="Login"
                textStyle={styles.buttonText}
                style={styles.button}
                onPress={handleSubmit}
              />
            </View>
            <View style={styles.buttonGoogleContainer}>
              <ButtonComp
                leftImg={images.google}
                text="Sign In With Google"
                textStyle={styles.buttonText}
                style={styles.button}
                onPress={handleSubmit}
                leftImageStyle={styles.google}
              />
            </View>
            <SignUpText
              dontText="Don't have an account?"
              signUpText="Sign Up"
              onPress={() => {
                navigation.navigate(routes.SIGNUP_SCREEN);
              }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
