/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {Context} from '../context/provider';
import {convert12HourFormat} from '../utils';

const HourCard = ({
  time,
  status,
  comment = '',
  onSubmit = () => {},
  selectedTask,
  setSelectedTask,
  isEditable,
}: {
  time: number;
  status?: string;
  comment?: string;
  onSubmit: (number: number, status: string, time: number) => void;
  selectedTask: number;
  setSelectedTask: (number: number) => void;
  isEditable: boolean;
}) => {
  const [input, setInput] = useState(comment || '');

  return (
    <View
      style={{
        borderLeftWidth: 5,
        borderRadius: 10,
        borderColor:
          status === 'PRODUCTIVE'
            ? 'green'
            : status === 'UNPRODUCTIVE'
            ? 'red'
            : 'grey',
      }}>
      <Card elevation={1}>
        <Card.Title
          title={`${convert12HourFormat(time)} - ${convert12HourFormat(
            time + 1,
          )}`}
          subtitle={status}
        />
        <Text
          style={{
            marginLeft: 16,
            marginRight: 16,
            fontSize: 16,
            color: 'black',
          }}>
          {comment}
        </Text>

        <Button
          disabled={!isEditable}
          onPress={() => setSelectedTask(selectedTask === time ? null : time)}>
          {selectedTask === time ? 'Hide' : status ? 'Edit' : 'Add'}
        </Button>
        {selectedTask === time && (
          <Card.Actions style={{flex: 1, flexDirection: 'column'}}>
            <View style={{height: 100, width: '90%', alignSelf: 'center'}}>
              <TextInput
                style={{height: 100, width: '100%'}}
                value={input}
                onChangeText={text => setInput(text)}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button
                onPress={() => {
                  onSubmit(input, 'PRODUCTIVE', time);
                  setSelectedTask(null);
                }}>
                Productive
              </Button>
              <Button
                onPress={() => {
                  onSubmit(input, 'UNPRODUCTIVE', time);
                  setSelectedTask(null);
                }}>
                Non-Productive
              </Button>
            </View>
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};

export default HourCard;
