import {Animated, Easing} from 'react-native';

// Function to create the animation sequence
export const createAnimationLoop = scaleValue => {
  // Define animation sequence
  const shrinkAnimation = Animated.timing(scaleValue, {
    toValue: 0.5, // Shrink to 0.5 times the original size
    duration: 1000, // Animation duration in milliseconds
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const growAnimation = Animated.timing(scaleValue, {
    toValue: 1, // Grow back to the original size
    duration: 1000, // Animation duration in milliseconds
    easing: Easing.linear,
    useNativeDriver: true,
  });

  // Loop the animation sequence
  const sequence = Animated.sequence([shrinkAnimation, growAnimation]);
  const loop = Animated.loop(sequence);

  return loop;
};
