import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import {moderateScale, textScale} from '../../../utils/responsiveSize';
import colors from '../../../constants/colors';
import fontFamily from '../../../utils/fontFamily';
import images from '../../../constants/images';
import ButtonComp from '../../../components/button/ButtonComp';
import {firebase} from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/core';

const QuizScreen = () => {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const routess = useRoute();
  const category = routess?.params?.category;
  const [remainingTime, setRemainingTime] = useState(0);
  const testTime = routess?.params?.testTime;

  const startTimer = timeInSeconds => {
    setRemainingTime(timeInSeconds);
  };

  useEffect(() => {
    startTimer(testTime * 60);
  }, [testTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('Questions')
          .get();
        const fetchedQuestions = querySnapshot.docs.map(doc => doc.data());
        setQuestionData(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = option => {
    const updatedQuestions = [...questionData];
    updatedQuestions[currentQuestionIndex].selectedOption = option;
    setQuestionData(updatedQuestions);

    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      const updatedQuestions = [...questionData];
      updatedQuestions[currentQuestionIndex].selectedOption = selectedOption;
      setQuestionData(updatedQuestions);

      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(
        updatedQuestions[currentQuestionIndex + 1]?.selectedOption || null,
      );
    } else {
      Alert.alert('Last Question', 'You have reached the last question.');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setSelectedOption(
        questionData[currentQuestionIndex - 1]?.selectedOption || null,
      );
    }
  };
  const handleClearSelection = () => {
    const updatedQuestions = [...questionData];
    updatedQuestions[currentQuestionIndex].selectedOption = null;
    setQuestionData(updatedQuestions);
    setSelectedOption(null);
  };
  const renderOptions = ({item, index}) => {
    const isSelected = selectedOption === index + 1;
    const optionStyle = isSelected ? {backgroundColor: colors.blue} : null;

    return (
      <Pressable
        onPress={() => handleOptionSelect(index + 1)}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? colors.gray : colors.white,
            margin: moderateScale(10),
            borderRadius: moderateScale(40),
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: moderateScale(2),
            justifyContent: 'center',
            padding: moderateScale(10),
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? colors.grey : null,
          },
          optionStyle, // Apply selected option style
        ]}>
        <Text
          style={{
            paddingVertical: moderateScale(10),
            color: isSelected ? colors.white : null,
            fontFamily: fontFamily.POPPINS_SEMI_BOLD,
          }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          height: moderateScale(50),
          backgroundColor: colors.purple,
          justifyContent: 'center',
          paddingHorizontal: moderateScale(14),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: textScale(16),
            fontFamily: fontFamily.POPPINS_SEMI_BOLD,
            color: colors.white,
          }}>
          {Math.floor(remainingTime / 60)}:{remainingTime % 60} seconds{' '}
        </Text>
        <Text
          style={{
            fontSize: textScale(16),
            fontFamily: fontFamily.POPPINS_SEMI_BOLD,
            color: colors.white,
          }}>
          {currentQuestionIndex + 1} / {questionData.length}
        </Text>
        <Image
          source={images.bookmarks}
          style={{
            width: moderateScale(20),
            height: moderateScale(20),
            tintColor: colors.white,
          }}
        />
        <Image
          source={images.menuicon}
          style={{
            width: moderateScale(20),
            height: moderateScale(20),
            tintColor: colors.white,
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: colors.white,
            margin: moderateScale(10),
            height: moderateScale(400),
            paddingVertical: moderateScale(20),
            marginTop: moderateScale(40),
            borderRadius: moderateScale(10),
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: moderateScale(2),
            justifyContent: 'center',
          }}>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <Text>{questionData[currentQuestionIndex]?.Question}</Text>
            <FlatList
              data={[
                questionData[currentQuestionIndex]?.A,
                questionData[currentQuestionIndex]?.B,
                questionData[currentQuestionIndex]?.C,
                questionData[currentQuestionIndex]?.D,
              ]}
              renderItem={renderOptions}
              keyExtractor={(option, index) => index.toString()}
            />
          </View>
        </View>
      </View>

      {/* Navigation buttons */}
      <View
        style={{
          height: Platform.OS === 'ios' ? moderateScale(70) : moderateScale(50),
          backgroundColor: colors.blue,
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingStart: moderateScale(10),
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={handlePrevious}
            style={{
              backgroundColor: colors.purple,
              borderRadius: moderateScale(5),
              borderWidth: moderateScale(0.5),
              padding: 5,
              marginStart: moderateScale(20),
            }}>
            <Image
              source={images.left}
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                tintColor: colors.white,
              }}
            />
          </Pressable>
          <ButtonComp
            onPress={handleClearSelection}
            activeOpacity={0.9}
            text="Clear Selection"
            textStyle={{
              fontSize: textScale(10),
              fontFamily: fontFamily.POPPINS_SEMI_BOLD,
            }}
            style={{
              width: moderateScale(120),
              backgroundColor: colors.blue,
              height: moderateScale(35),
              borderColor: colors.grey,
              borderWidth: 0.5,
            }}
          />
          <ButtonComp
            activeOpacity={0.9}
            text="Mark Review"
            textStyle={{
              fontSize: textScale(10),
              fontFamily: fontFamily.POPPINS_SEMI_BOLD,
            }}
            style={{
              width: moderateScale(120),
              backgroundColor: colors.blue,
              height: moderateScale(35),
              borderColor: colors.grey,
              borderWidth: 0.5,
            }}
          />
          <Pressable
            onPress={handleNext}
            style={{
              backgroundColor: colors.purple,
              borderRadius: moderateScale(5),
              borderWidth: moderateScale(0.5),
              padding: 5,
              marginEnd: moderateScale(30),
            }}>
            <Image
              source={images.right}
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                tintColor: colors.white,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default QuizScreen;
