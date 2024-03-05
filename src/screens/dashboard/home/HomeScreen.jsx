import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import ItemCategories from '../../../components/list/ItemCategories/ItemCategories';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('QUIZ')
      .onSnapshot(querySnapshot => {
        const categoriesData = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const {NAME, NO_OF_TESTS} = data;
          categoriesData.push({
            CAT_ID: doc.id,
            NAME,
            NO_OF_TESTS,
          });
        });
        setCategories(categoriesData.filter((item, index) => index !== 0));
      });

    return () => unsubscribe();
  }, []);

  const handleCategoryPress = (categoryId, categoryName) => {
    console.log('Category ID:', categoryId);
    console.log('Category Name:', categoryName);

    navigation.navigate(routes.TEST_SCREEN, {
      categoryId,
      categoryName,
    });
  };

  return (
    <WrapperContainer style={styles.container}>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item.CAT_ID, item.NAME)}>
            <ItemCategories item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.CAT_ID}
      />
    </WrapperContainer>
  );
};

export default HomeScreen;
