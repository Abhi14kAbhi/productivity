import React from 'react';
import {Text, View} from 'react-native';

const Question = ({
  question,
  answer,
  options,
  onCorrectAnswer,
  onIncorrectAnswer,
}: {
  question: string;
  answer: string;
  options: string[];
  onCorrectAnswer: Function;
  onIncorrectAnswer: Function;
}) => {
  return (
    <View>
      <View>
        <Text>{question}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Question;
