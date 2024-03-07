import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../../../constants/colors';
import styles from './styles';
import routes from '../../../constants/routes';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const ItemTest = ({item, index, categoryId, testNumber}) => {
  console.log('Item:', item);
  console.log('testNumber:', testNumber);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testTime, setTestTime] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('Questions')
          .where('TEST', '==', category) // Filter questions based on the selected test
          .get();
        const fetchedQuestions = querySnapshot.docs.map(doc => doc.data());
        setQuestionData(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [questions]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(routes.START_TEST_SCREEN, {
          categoryName: item.TEST_INFO,
          categoryId: categoryId,
          questions: questions.le,
          testNumber: index + 1,
        });
      }}
      style={styles.card}>
      <Text style={styles.test}>{`Test ${index + 1}`}</Text>
      <View style={styles.progressBar}>
        <Progress.Bar progress={0} width={250} color={colors.blue} />
        <View style={styles.score}>
          <Text style={styles.scoreText}>{'0 %'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemTest;
