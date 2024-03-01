import {FlatList} from 'react-native';
import React, {useLayoutEffect} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import {categories} from '../../../constants/list';
import ItemCategories from '../../../components/list/ItemCategories';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
    });
  }, [navigation]);
  return (
    <WrapperContainer style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        data={categories}
        renderItem={({item}) => <ItemCategories item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </WrapperContainer>
  );
};

export default HomeScreen;
