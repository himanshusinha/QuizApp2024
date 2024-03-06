import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image, TouchableOpacity, Text, View, Platform} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import images from '../constants/images';
import routes from '../constants/routes';
import CustomDrawer from '../components/customDrawer/CustomDrawer';
import {moderateScale, textScale} from '../utils/responsiveSize';
import fontFamily from '../utils/fontFamily';
import * as Screens from '../screens';
import ButtonComp from '../components/button/ButtonComp';
import {firebase} from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({testTime}) => {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('Questions')
          .get();
        const fetchedQuestions = querySnapshot.docs.map(doc => doc.data());
        setQuestionData(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const startTimer = async () => {
    try {
      const testInfoSnapshot = await firebase
        .firestore()
        .doc('QUIZ/OVVqzp5xqIomntt8l5Jn/TEST_LIST/TEST_INFO')
        .get();

      if (testInfoSnapshot.exists) {
        const testInfoData = testInfoSnapshot.data();
        if (testInfoData && testInfoData.CAT1_TIME) {
          setTimer(testInfoData.CAT1_TIME); // Set the timer from firebase
        } else {
          console.error('CAT1_TIME field not found in TEST_INFO document');
        }
      } else {
        console.error('TEST_INFO document does not exist');
      }
    } catch (error) {
      console.error('Error fetching test time:', error);
    }
  };

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
      case routes.BOTTOM_NAVIGATION:
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
        component={Screens.BottomNavigation}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.LEADERBOARD_SCREEN}
        component={Screens.LeaderBoardScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.ABOUT_SCREEN}
        component={Screens.AboutScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.BOOKMARKS_SCREEN}
        component={Screens.BookmarkScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.SETTINGS_SCREEN}
        component={Screens.SettingsScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.QUIZ_RULES_SCREEN}
        component={Screens.QuizRulesScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route.name),
        })}
      />
      <Drawer.Screen
        name={routes.TEST_SCREEN}
        component={Screens.TestScreen}
        options={({route}) => ({
          headerTitle: route.params ? route.params.categoryName : 'Test',
        })}
      />
      <Drawer.Screen
        name={routes.START_TEST_SCREEN}
        component={Screens.StartTestScreen}
        options={({route}) => ({
          headerTitle: route.params ? route.params.categoryName : 'Category',
        })}
      />
      <Drawer.Screen
        name={routes.QUIZ_SCREEN}
        component={Screens.QuizScreen}
        options={({route}) => ({
          headerTitle: route.params ? route.params.category : 'Category',
          headerRight: props => (
            <ButtonComp
              activeOpacity={0.9}
              text="Submit"
              textStyle={{
                fontSize: textScale(12),
                fontFamily: fontFamily.POPPINS_SEMI_BOLD,
              }}
              style={{
                width: moderateScale(100),
                backgroundColor: colors.yellow,
                height: moderateScale(35),
                marginStart: moderateScale(80),
                bottom: moderateScale(5),
                marginEnd: moderateScale(10),
              }}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
