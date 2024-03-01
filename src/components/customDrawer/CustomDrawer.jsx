import React, {useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
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
import images from '../../constants/images'; // Import your image assets
import routes from '../../constants/routes';

const CustomDrawer = props => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {navigation} = props;

  const handleItemPress = item => {
    setSelectedItem(item.name);
    // Navigate to the appropriate screen based on the item name
    switch (item.name) {
      case 'Profile':
        navigation.navigate(routes.PROFILE_SCREEN);
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
      default:
        break;
    }
  };

  // Array of objects containing item name and corresponding image source
  const menuItems = [
    {name: 'Profile', image: images.user}, // Adjust image source accordingly
    {name: 'LeaderBoard', image: images.dashboard},
    {name: 'Bookmarks Questions', image: images.bookmark},
    {name: 'Settings', image: images.settings},
    {name: 'Quiz Rules', image: images.ideas},
    {name: 'About', image: images.info},
  ];

  const renderItem = (item, index) => {
    const isSelected = selectedItem === item.name;
    const textColor = isSelected ? colors.blue : colors.grey;

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: moderateScale(20),
          paddingHorizontal: moderateScale(10),
        }}
        onPress={() => handleItemPress(item)}>
        <Image
          source={item.image} // Set the image source based on the item
          style={{
            width: moderateScale(20),
            height: moderateScale(20),
            tintColor: isSelected ? colors.blue : colors.grey,
          }}
        />
        <Text style={{marginStart: 10, color: textColor}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1.5}}>
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      <SafeAreaView style={{flex: 0.43, backgroundColor: colors.blue}}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              backgroundColor: colors.blue,
              height: moderateScale(150),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={images.quiz}
              style={{
                width: moderateScale(100),
                height: moderateScale(100),
                bottom: moderateScale(80),
              }}
            />
          </View>
        </DrawerContentScrollView>

        <View style={{backgroundColor: colors.white}}>
          {menuItems.map((item, index) => renderItem(item, index))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CustomDrawer;
