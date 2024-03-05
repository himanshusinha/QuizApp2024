import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import {moderateScale} from '../../utils/responsiveSize';
import colors from '../../constants/colors';
import images from '../../constants/images';
import routes from '../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from './styles';

const CustomDrawer = props => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const [loginStatus, setLoginStatus] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        setUserEmail(userInfo.user.email);
        setUserName(userInfo.user.name);
        setUserImage(userInfo.user.photo);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.clear();
      auth().signOut();
      const isGoogleSignedIn = await GoogleSignin.isSignedIn();

      if (isGoogleSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        await auth().signOut();
      }

      setLoginStatus(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleItemPress = item => {
    setSelectedItem(item.name);
    switch (item.name) {
      case 'Home':
        navigation.navigate(routes.HOME_SCREEN);
        break;
      case 'LeaderBoard':
        navigation.navigate(routes.LEADERBOARD_SCREEN);
        break;
      case 'Bookmarks Questions':
        navigation.navigate(routes.BOOKMARKS_SCREEN);
        break;
      case 'Settings':
        navigation.navigate(routes.SETTINGS_SCREEN);
        break;
      case 'Quiz Rules':
        navigation.navigate(routes.QUIZ_RULES_SCREEN);
        break;
      case 'About':
        navigation.navigate(routes.ABOUT_SCREEN);
        break;
      case 'Profile':
        navigation.navigate(routes.PROFILE_SCREEN);
        break;
      case 'LogOut':
        handleLogOut();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {name: 'Home', image: images.house},
    {name: 'Profile', image: images.user},
    {name: 'LeaderBoard', image: images.dashboard},
    {name: 'Bookmarks Questions', image: images.bookmark},
    {name: 'Settings', image: images.settings},
    {name: 'Quiz Rules', image: images.ideas},
    {name: 'About', image: images.info},
    {name: 'LogOut', image: images.logout},
  ];

  const renderItem = (item, index) => {
    const isSelected = selectedItem === item.name;
    const textColor = isSelected ? colors.blue : colors.grey;

    return (
      <TouchableOpacity
        key={index}
        style={styles.touchable}
        onPress={() => handleItemPress(item)}>
        <Image
          source={item.image}
          style={[
            styles.image,
            {tintColor: isSelected ? colors.blue : colors.grey},
          ]}
        />
        <Text style={{marginStart: 10, color: textColor}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1.5}}>
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      <SafeAreaView style={{flex: 0.43, backgroundColor: colors.blue}}>
        <View style={styles.header}>
          <Image
            source={userImage ? {uri: userImage} : images.quiz}
            style={styles.userImage}
          />
          <View style={{bottom: moderateScale(5)}}>
            <Text style={styles.title}>{userName}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, index) => renderItem(item, index))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CustomDrawer;
