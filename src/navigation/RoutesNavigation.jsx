import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import DrawerNavigation from './DrawerNavigation';
import AuthNavigation from './AuthNavigation';

const RoutesNavigation = ({user, setUser}) => {
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <DrawerNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RoutesNavigation;
