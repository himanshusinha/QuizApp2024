import {FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import firestore from '@react-native-firebase/firestore'; // Import firestore
import ItemCategories from '../../../components/list/ItemCategories/ItemCategories';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('QUIZ') // Assuming 'QUIZ' is your root collection
      .onSnapshot(querySnapshot => {
        const categoriesData = [];
        querySnapshot.forEach(doc => {
          // Iterate through the documents in the collection
          const {NAME, NO_OF_TESTS} = doc.data();
          categoriesData.push({
            CAT_ID: doc.id,
            NAME,
            NO_OF_TESTS,
          });
        });
        setCategories(categoriesData.filter((item, index) => index !== 0)); // Filter out the item at position 0
      });

    return () => unsubscribe();
  }, []);

  return (
    <WrapperContainer style={styles.container}>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={({item, index}) => <ItemCategories item={item} />}
        keyExtractor={item => item.CAT_ID}
      />
    </WrapperContainer>
  );
};

export default HomeScreen;
