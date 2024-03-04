import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const [info, setInfo] = useState('');

  const [profileImage, setProfileImage] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '800101377313-0eeda4fr1s9hdk6kmtjbk8lccrdicio4.apps.googleusercontent.com',
    });
  }, []);

  const handleLogin = ({email, password}) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        console.log('User logged in successfully!');

        const user = auth().currentUser;
        if (user) {
          await firestore().collection('users').doc(user.uid).set({
            email: user.email,
          });
        }
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Incorrect password.');
        } else {
          console.error('Error logging in:', error);
          Alert.alert('Error', 'An error occurred. Please try again later.');
        }
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      AsyncStorage.setItem('loggedIn', 'true');
      await auth().signInWithCredential(googleCredential);

      const profileImage = userInfo.user.photo;
      setProfileImage(profileImage);

      // You can also do additional operations with other user information from 'userInfo'
    } catch (error) {
      console.error('Error signing in with Google:', error);
      Alert.alert(
        'Error',
        'An error occurred while signing in with Google. Please try again later.',
      );
    }
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
                onPress={() => handleSubmit()}
              />
            </View>
            <View style={styles.buttonGoogleContainer}>
              <ButtonComp
                leftImg={images.google}
                text="Sign In With Google"
                textStyle={styles.buttonText}
                style={styles.button}
                onPress={() => handleGoogleSignIn()}
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
