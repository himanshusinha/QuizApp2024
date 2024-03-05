import {View, Text, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {firebase} from '@react-native-firebase/auth';

const ItemStart = ({item, index}) => {
  const {width} = Dimensions.get('window');
  const cardWidth = (width - 20 * 4.8) / 3;
  const [testTime, setTestTime] = useState(0); // State to store test time
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchTestTime = async () => {
      try {
        const testInfoSnapshot = await firebase
          .firestore()
          .doc('QUIZ/OVVqzp5xqIomntt8l5Jn/TEST_LIST/TEST_INFO')
          .get();

        if (testInfoSnapshot.exists) {
          const testInfoData = testInfoSnapshot.data();
          if (testInfoData && testInfoData.CAT1_TIME) {
            // Set the test time state with the fetched value
            setTestTime(testInfoData.CAT1_TIME);
          } else {
            console.error('CAT1_TIME field not found in TEST_INFO document');
          }
        } else {
          console.error('TEST_INFO document does not exist');
        }
      } catch (error) {
        console.error('Error fetching test time:', error);
      }
    };

    fetchTestTime();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('Questions')
          .get();
        const fetchedQuestions = querySnapshot.docs.map(doc => doc.data());
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  let sub_title;
  if (item.title === 'Questions') {
    sub_title = questions.length;
  } else if (item.title === 'Best Score') {
    sub_title = 0;
  } else if (item.title === 'Time') {
    sub_title = testTime + ' minutes';
  }

  return (
    <View style={[styles.card, {width: cardWidth}]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{sub_title}</Text>
      </View>
    </View>
  );
};

export default ItemStart;
