import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';

const ItemCategories = ({item}) => {
  const {width} = Dimensions.get('window');
  const cardWidth = (width - 80) / 2;

  return (
    <View style={[styles.card, {width: cardWidth}]}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.test}>{item.test}</Text>
    </View>
  );
};

export default ItemCategories;
