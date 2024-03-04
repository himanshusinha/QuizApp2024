import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../screens/splash/SplashScreen'; // Import the SplashScreen component
import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RoutesNavigation = ({user, setUser}) => {
  const [initializing, setInitializing] = useState(true);
  const [showSplash, setShowSplash] = useState(true); // State to control showing the splash screen

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
    setShowSplash(false); // Hide splash screen once initialization is done
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || showSplash) return <SplashScreen />; // Show splash screen while initializing or when showSplash state is true

  return <>{user ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RoutesNavigation;
