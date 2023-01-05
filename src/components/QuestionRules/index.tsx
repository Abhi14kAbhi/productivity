/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {rules} from '../../utils/constants';

const QuestionRules = ({onNextPress}: {onNextPress: () => {}}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontFamily: 'Bold_Italic',
            textDecorationLine: 'underline',
          }}>
          Rules
        </Text>
      </View>
      <View style={{flex: 1, width: '90%', alignItems: 'center'}}>
        <ScrollView>
          {rules.map(item => {
            return (
              <View key={item} style={{flexDirection: 'row', marginTop: 10}}>
                <Text
                  style={{fontSize: 20, fontFamily: 'Italic', color: 'black'}}>
                  ⊛
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Italic',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Button
        style={{
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onNextPress}>
        <Text>Next</Text>
      </Button>
    </View>
  );
};

export default QuestionRules;
