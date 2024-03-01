import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RoutesStack = () => {
  return (
    <NavigationContainer>
      {true ? <DrawerNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RoutesStack;
