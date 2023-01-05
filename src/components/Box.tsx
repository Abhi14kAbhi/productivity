/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-paper';

const Box = ({
  title,
  action,
  subtitle,
}: {
  title: string;
  action: () => {};
  subtitle: string;
}) => {
  return (
    <Card
      elevation={4}
      onPress={action}
      style={{
        borderRadius: 10,
        width: '48%',
        height: '100%',
        padding: 12,
        borderWidth: 2,
      }}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 10}}>
        {title}
      </Text>
      <View style={{height: 10}} />
      <Text
        style={{
          fontSize: 8,
          textDecorationLine: 'underline',
        }}>
        {subtitle}
      </Text>
    </Card>
  );
};

export default Box;
