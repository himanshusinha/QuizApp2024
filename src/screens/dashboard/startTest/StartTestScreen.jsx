// StartTestScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {quizData} from '../../../constants/list';
import ItemStart from '../../../components/list/ItemStart/ItemStart';
import styles from './styles';
import ButtonComp from '../../../components/button/ButtonComp';
import routes from '../../../constants/routes';
import {firebase} from '@react-native-firebase/auth';

const StartTestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const category = route?.params?.categoryName;
  const categoryId = route?.params?.categoryId;
  const selectedTest = route?.params?.testNumber;
  console.log(selectedTest, '.....selected test in start test');
  const [testTime, setTestTime] = useState(0);

  useEffect(() => {
    const fetchTestTime = async () => {
      try {
        const testInfoSnapshot = await firebase
          .firestore()
          .doc(`QUIZ/${categoryId}/TEST_LIST/TEST_INFO`)
          .get();

        if (testInfoSnapshot.exists) {
          const testInfoData = testInfoSnapshot.data();
          const key = `CAT${selectedTest}_TIME`;
          if (testInfoData && testInfoData[key]) {
            setTestTime(testInfoData[key]);
          } else {
            console.error(`${key} not found in TEST_INFO document`);
          }
        } else {
          console.error('TEST_INFO document does not exist');
        }
      } catch (error) {
        console.error('Error fetching test time:', error);
      }
    };

    fetchTestTime();
  }, [categoryId, selectedTest]);

  return (
    <View style={styles.container}>
      <Text style={styles.testNumber}>{`Test ${selectedTest}`}</Text>
      <FlatList
        data={quizData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <ItemStart
            item={item}
            index={index}
            categoryId={categoryId}
            selectedTest={selectedTest}
            testTime={testTime}
          />
        )}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false}
      />
      <View style={styles.buttonContainer}>
        <ButtonComp
          onPress={() => {
            navigation.navigate(routes.QUIZ_SCREEN, {
              category: category,
              categoryId: categoryId,
              testTime: testTime,
              selectedTest: selectedTest,
            });
          }}
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
