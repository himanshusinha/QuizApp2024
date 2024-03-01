import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image, TouchableOpacity, Text} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import images from '../constants/images';
import routes from '../constants/routes';
import BottomNavigation from './BottomNavigation';
import CustomDrawer from '../components/customDrawer/CustomDrawer';
import {moderateScale, textScale} from '../utils/responsiveSize';
import fontFamily from '../utils/fontFamily';
import {
  AboutScreen,
  BookmarkScreen,
  LeaderBoardScreen,
  QuizRulesScreen,
  SettingsScreen,
} from '../screens';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();

  // Function to get drawer label based on route name
  const getDrawerLabel = routeName => {
    switch (routeName) {
      case routes.HOME_SCREEN:
        return 'Home';
      case routes.ABOUT_SCREEN:
        return 'About';
      case routes.LEADERBOARD_SCREEN:
        return 'Leaderboard';
      case routes.BOOKMARKS_SCREEN:
        return 'Bookmarks';
      case routes.SETTINGS_SCREEN:
        return 'Settings';
      case routes.QUIZ_RULES_SCREEN:
        return 'Quiz Rules';
      default:
        return routeName;
    }
  };

  // Function to get header title based on route name
  const getHeaderTitle = routeName => {
    switch (routeName) {
      case routes.HOME_SCREEN:
        return 'Home';
      case routes.LEADERBOARD_SCREEN:
        return 'Leaderboard';
      case routes.PROFILE_SCREEN:
        return 'Profile';
      default:
        return getDrawerLabel(routeName);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {
          bottom: moderateScale(5),
          fontFamily: fontFamily.POPPINS_SEMI_BOLD,
          fontSize: textScale(18),
        },
        headerStyle: {
          backgroundColor: colors.blue,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              source={images.menu}
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                marginStart: moderateScale(20),
                tintColor: 'white',
                bottom: moderateScale(5),
              }}
            />
          </TouchableOpacity>
        ),
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={routes.HOME_SCREEN}
        component={BottomNavigation}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.LEADERBOARD_SCREEN}
        component={LeaderBoardScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.ABOUT_SCREEN}
        component={AboutScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.BOOKMARKS_SCREEN}
        component={BookmarkScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.QUIZ_RULES_SCREEN}
        component={QuizRulesScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
