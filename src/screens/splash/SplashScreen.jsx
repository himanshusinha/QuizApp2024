import {View, Text, Animated, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WrapperContainer from '../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import {createAnimationLoop} from '../../../src/utils/animation'; // Import the animation function
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import routes from '../../constants/routes';
import images from '../../constants/images';

const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const loop = createAnimationLoop(scaleValue);
    loop.start();

    const timeoutId = setTimeout(() => {
      loop.stop();
      // Navigate to the next screen after 2 seconds
      navigation.replace(routes.HOME_SCREEN); // Replace 'NextScreen' with the name of your next screen
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      loop.stop();
    };
  }, [scaleValue, navigation]);

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
};

export default SplashScreen;
