import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../screens/splash/SplashScreen';
import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RoutesNavigation = ({user, setUser}) => {
  const [initializing, setInitializing] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
    setShowSplash(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing || showSplash) return <SplashScreen />;

  return <>{user ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RoutesNavigation;
