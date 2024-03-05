import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {quizData} from '../../../constants/list';
import ItemStart from '../../../components/list/ItemStart/ItemStart';
import styles from './styles';
import ButtonComp from '../../../components/button/ButtonComp';
import routes from '../../../constants/routes';

const StartTestScreen = () => {
  const navigation = useNavigation();
  const routess = useRoute();
  const category = routess?.params?.categoryName;
  const testNumber = routess?.params?.testNumber;
  console.log(testNumber);
  console.log(category);
  const [testTime, setTestTime] = useState(0); // State to store test time
  console.log(testTime);
  const [questions, setQuestions] = useState([]);
  console.log(questions);
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
            console.log('Test Time:', testInfoData.CAT1_TIME);
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
  return (
    <View style={styles.container}>
      <Text style={styles.testNumber}>{`Test ${testNumber}`}</Text>

      <FlatList
        data={quizData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <ItemStart item={item} index={index} />}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false}
      />
      <View style={styles.buttonContainer}>
        <ButtonComp
          onPress={() => navigation.navigate(routes.QUIZ_SCREEN)}
          activeOpacity={0.9}
          text="START"
          textStyle={styles.buttonText}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default StartTestScreen;
