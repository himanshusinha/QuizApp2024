import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import ItemTest from '../../../components/list/ItemTest/ItemTest';

const TestScreen = () => {
  const route = useRoute();
  const {categoryId, categoryName} = route.params;
  console.log(categoryName);
  const navigation = useNavigation();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({headerTitle: categoryName});
  }, [categoryName, navigation]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsRef = firestore()
          .collection('QUIZ')
          .doc(categoryId)
          .collection('TEST_LIST');
        const testsSnapshot = await testsRef.get();
        console.log('Number of documents:', testsSnapshot.docs.length);

        const testsData = [];
        testsSnapshot.docs.forEach(doc => {
          const testData = doc.data();
          const testArray = [];

          const numTests =
            Object.keys(testData).filter(key => key.startsWith('CAT')).length /
            2;
          for (let i = 1; i <= numTests; i++) {
            testArray.push({
              TEST_INFO: testData[`CAT${i}_ID`],
              CAT_ID: testData[`CAT${i}_ID`],
              TIME: testData[`CAT${i}_TIME`],
            });
          }
          testsData.push(...testArray);
        });
        setTests(testsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [categoryId]);

  return (
    <WrapperContainer style={styles.container}>
      {!loading && tests.length > 0 && (
        <FlatList
          data={tests}
          renderItem={({item, index}) => <ItemTest item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {!loading && tests.length === 0 && (
        <Text>No tests found for this category</Text>
      )}
    </WrapperContainer>
  );
};

export default TestScreen;
