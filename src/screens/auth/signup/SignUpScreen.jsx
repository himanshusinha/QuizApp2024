import React from 'react';
import {View, Image, Text, Alert} from 'react-native';
import {Formik} from 'formik';
import styles from './styles';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import TextInputWithLabel from '../../../components/textinputfield/TextInputWithLabel';
import ButtonComp from '../../../components/button/ButtonComp';
import {useNavigation} from '@react-navigation/native';
import signUpValidationSchema from '../../../utils/signUpValidationSchema';
import SignUpText from '../../../components/signupText/SignUpText';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
const SignUpScreen = () => {
  const navigation = useNavigation();
  const handleSignUp = async values => {
    try {
      console.log('Form values:', values);

      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      // Get the current user's UID
      const uid = userCredential.user.uid;

      // Save additional user data to Firestore using the UID
      await firestore().collection('UserInfo').doc(uid).set({
        EMAIL_ID: values.email,
        NAME: values.fullname,
        TOTAL_SCORE: 0,
      });

      // Save user data to AsyncStorage
      await AsyncStorage.setItem('fullname', values.fullname);
      await AsyncStorage.setItem('email', values.email);
      await AsyncStorage.setItem('password', values.password);

      console.log('User added successfully!');
      const totalUsersRef = firestore()
        .collection('UserInfo')
        .doc('TOTAL_USERS');
      await firestore().runTransaction(async transaction => {
        const doc = await transaction.get(totalUsersRef);
        if (!doc.exists) {
          throw new Error('TOTAL_USERS document does not exist');
        }

        let currentCount = doc.data().COUNT || 0;
        const newCount = currentCount + 1;

        transaction.update(totalUsersRef, {COUNT: newCount});
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error adding user:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={images.quiz} style={styles.logo} />
      </View>

      <Formik
        initialValues={{
          fullname: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={values => handleSignUp(values)}
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
                label="Full Name"
                placeholder="Please Enter FullName"
                outlineColor={colors.color1_light2}
                activeOutlineColor={colors.color1_light2}
                textColor={colors.blackOpacity30}
                value={values.fullname}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                error={errors.fullname}
                touched={touched.fullname}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.fullname && errors.fullname && (
                <Text style={styles.errorText}>{errors.fullname}</Text>
              )}
            </View>
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
                leftIcon={images.user}
                mode="outlined"
                label="Mobile"
                placeholder="Please Enter Mobile"
                outlineColor={colors.color1_light2}
                activeOutlineColor={colors.color1_light2}
                textColor={colors.blackOpacity30}
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                error={errors.mobile}
                touched={touched.mobile}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
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
                label="Confirm Password"
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
