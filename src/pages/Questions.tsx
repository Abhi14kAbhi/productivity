/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import Question from '../components/question';
import QuestionRules from '../components/QuestionRules';
import {questions} from '../utils/constants';
const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const incorrectAnswer = () => {
    console.log('incoreect');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/images/Background.png')}
        resizeMode="cover">
        <View style={{flex: 1}}>
          {currentQuestion === 0 ? (
            <QuestionRules
              onNextPress={async () => setCurrentQuestion(currentQuestion + 1)}
            />
          ) : (
            <Question
              question="This is question"
              answer="right answer"
              options={['right answer', 'wrong answer']}
              onCorrectAnswer={() => setCurrentQuestion(currentQuestion + 1)}
              onIncorrectAnswer={() => incorrectAnswer()}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Questions;
