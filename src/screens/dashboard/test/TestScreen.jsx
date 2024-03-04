import React from 'react';
import ItemTest from '../../../components/list/ItemTest/ItemTest';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import {FlatList, View} from 'react-native';
import {test} from '../../../constants/list';

const TestScreen = () => {
  return (
    <WrapperContainer style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        data={test}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <ItemTest item={item} />
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </WrapperContainer>
  );
};

export default TestScreen;
