import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import styles from './styles';
import {firebase} from '@react-native-firebase/auth';

const ItemStart = ({item, categoryId, selectedTest, testTime}) => {
  const {width} = Dimensions.get('window');
  const cardWidth = (width - 20 * 4.8) / 3;
  const [questions, setQuestions] = useState([]);
  console.log(questions, '.....questions');
  console.log('Test Number:', selectedTest);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('Questions')
          .where('TEST', '==', 'AAA')
          .get();

        if (querySnapshot.empty) {
          console.log(
            'No matching documents found for selected test and category:',
            selectedTest,
          );
        } else {
          const fetchedQuestions = querySnapshot.docs.map(doc => doc.data());
          console.log('Fetched Questions:', fetchedQuestions);
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  useEffect(() => {
    console.log('Test Time:', testTime); // Log testTime prop
  }, [testTime]); // Log when testTime prop changes

  let sub_title;
  if (item.title === 'Questions') {
    sub_title = questions.length;
    console.log(sub_title);
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
