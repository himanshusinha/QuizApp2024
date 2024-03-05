import React, {useEffect} from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';

const ItemCategories = ({item}) => {
  const {width} = Dimensions.get('window');
  const cardWidth = (width - 80) / 2;
  const navigation = useNavigation();
  console.log(item, '....item');
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      // Reset the drawer title when the component is unmounted
      navigation.setOptions({title: 'Test'});
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToTestScreen = () => {
    // Pass the category ID to the TestScreen
    navigation.navigate(routes.TEST_SCREEN, {
      categoryId: item.CAT_ID,
      categoryName: item.NAME,
    });
  };

  return (
    <Pressable
      onPress={navigateToTestScreen}
      style={[styles.card, {width: cardWidth}]}>
      {/* Conditionally render the content */}
      <>
        <Text style={styles.category}>{item.NAME}</Text>
        <Text style={styles.test}>{item.NO_OF_TESTS} Tests</Text>
      </>

      {/* Render an empty View if the condition is false */}
    </Pressable>
  );
};

export default ItemCategories;
