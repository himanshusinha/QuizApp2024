import {Text, Dimensions, Pressable, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
import * as Progress from 'react-native-progress';
import colors from '../../../constants/colors';

const ItemTest = ({item}) => {
  const navigation = useNavigation();
  const routes = useRoute();
  const category = routes?.params?.categoryName;
  console.log(category);
  const progress = parseInt(item.topscore) / 100;

  return (
    <Pressable onPress={() => {}} style={styles.card}>
      <Text style={styles.test}>{item.title}</Text>
      <View style={styles.progressBar}>
        <Progress.Bar progress={progress} width={250} color={colors.blue} />
        <View style={styles.score}>
          <Text style={styles.scoreText}>{item.topscore + '%'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemTest;
