import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import routes from '../constants/routes';
import images from '../constants/images';
import styles from './styles';
import * as Screens from '../screens';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        component={Screens.HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={images.house}
              tintColor={focused ? colors.black : colors.grey}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.LEADERBOARD_SCREEN}
        component={Screens.LeaderBoardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={images.dashboard}
              tintColor={focused ? colors.black : colors.grey}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.PROFILE_SCREEN}
        component={Screens.ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={images.user}
              tintColor={focused ? colors.black : colors.grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
