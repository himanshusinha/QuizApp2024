import React from 'react';
import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import routes from '../constants/routes';
import images from '../constants/images';
import styles from './styles';
import * as Screens from '../screens';
import fontFamily from '../utils/fontFamily';
import {moderateScale} from '../utils/responsiveSize';

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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={[
                  styles.image,
                  {tintColor: focused ? colors.blue : colors.grey},
                ]}
                source={images.house}
                tintColor={focused ? colors.blue : colors.grey}
              />
              <Text
                style={{
                  color: focused ? colors.blue : colors.grey,
                  fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                  top: moderateScale(10),
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={routes.LEADERBOARD_SCREEN}
        component={Screens.LeaderBoardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={[
                  styles.image,
                  {tintColor: focused ? colors.blue : colors.grey},
                ]}
                source={images.dashboard}
                tintColor={focused ? colors.blue : colors.grey}
              />
              <Text
                style={{
                  color: focused ? colors.blue : colors.grey,
                  fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                  top: moderateScale(10),
                }}>
                LeaderBoard
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={routes.PROFILE_SCREEN}
        component={Screens.ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={[
                  styles.image,
                  {tintColor: focused ? colors.blue : colors.grey},
                ]}
                source={images.user}
                tintColor={focused ? colors.blue : colors.grey}
              />
              <Text
                style={{
                  color: focused ? colors.blue : colors.grey,
                  fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                  top: moderateScale(10),
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
