import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import * as Screens from '../screens';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routes.SPLASH_SCREEN}
        component={Screens.SplashScreen}
      />
      <Stack.Screen
        name={routes.LOGIN_SCREEN}
        component={Screens.LoginScreen}
      />
      <Stack.Screen
        name={routes.SIGNUP_SCREEN}
        component={Screens.SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
