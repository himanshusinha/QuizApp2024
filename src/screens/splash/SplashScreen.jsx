import {View, Text, Animated, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WrapperContainer from '../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import {createAnimationLoop} from '../../../src/utils/animation'; // Import the animation function
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import images from '../../constants/images';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import routes from '../../constants/routes';

const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [initialized, setInitialized] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loop = createAnimationLoop(scaleValue);
    loop.start();

    const timeoutId = setTimeout(() => {
      loop.stop();
      setInitialized(true);
    }, 2000); // Adjust the timeout as needed

    return () => {
      clearTimeout(timeoutId);
      loop.stop();
    };
  }, []);

  useEffect(() => {
    if (initialized) {
      auth().onAuthStateChanged(user => {
        const routeName = user ? routes.DRAWERNAVIGATION : routes.LOGIN_SCREEN;
        navigation.dispatch(StackActions.replace(routeName));
      });
    }
  }, [initialized, navigation]);

  if (!initialized) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0000FF', '#0047AB', '#00008B']}
          style={styles.linearGradient}>
          <Animated.Text
            style={[styles.text, {transform: [{scale: scaleValue}]}]}>
            <Image source={images.quiz} style={styles.logo} />
          </Animated.Text>
        </LinearGradient>
      </View>
    );
  }

  return null;
};

export default SplashScreen;
