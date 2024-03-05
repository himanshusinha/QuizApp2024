import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import colors from '../../../constants/colors';
import styles from './styles';
import routes from '../../../constants/routes';

const ItemTest = ({item, index}) => {
  const navigation = useNavigation();
  const routess = useRoute();
  const category = routess?.params?.categoryName;
  console.log(category);

  const progress = 0.0;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(routes.START_TEST_SCREEN, {
          categoryName: category,
          testNumber: index + 1,
        });
      }}
      style={styles.card}>
      <Text style={styles.test}>{`Test ${index + 1}`}</Text>
      <View style={styles.progressBar}>
        <Progress.Bar progress={progress} width={250} color={colors.blue} />
        <View style={styles.score}>
          <Text style={styles.scoreText}>{'0 %'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemTest;
