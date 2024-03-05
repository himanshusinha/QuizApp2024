import {View, Text, Image, Pressable, Platform, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, textScale} from '../../../utils/responsiveSize';
import colors from '../../../constants/colors';
import fontFamily from '../../../utils/fontFamily';
import images from '../../../constants/images';
import ButtonComp from '../../../components/button/ButtonComp';
import {firebase} from '@react-native-firebase/auth';

const QuizScreen = () => {
  const [questionData, setQuestionData] = useState([]);

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

  const renderOptions = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          margin: moderateScale(10),
          borderRadius: moderateScale(10),
          elevation: 2,
          shadowColor: colors.black,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: moderateScale(2),
          justifyContent: 'center',
        }}>
        <View style={{marginHorizontal: moderateScale(20)}}>
          <Text style={{paddingVertical: moderateScale(10)}}>{item}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          height: moderateScale(50),
          backgroundColor: colors.purple,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(14),
          }}>
          <Text
            style={{
              fontSize: textScale(16),
              fontFamily: fontFamily.POPPINS_SEMI_BOLD,
              color: colors.white,
            }}>
            GK
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: moderateScale(140),
            }}>
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
        </View>
      </View>
      <FlatList
        data={questionData}
        renderItem={({item}) => (
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
              <Text>{item.Question}</Text>
              <FlatList
                data={[item.A, item.B, item.C, item.D]}
                renderItem={renderOptions}
                keyExtractor={(option, index) => index.toString()}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
