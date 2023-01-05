/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

const Layout = ({title}: {title: string}) => {
  return (
    <View
      style={{
        height: 70,
        justifyContent: 'center',
        backgroundColor: 'green',
        top: 0,
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        borderWidth: 0.3,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          textAlign: 'center',
          fontFamily: 'bi',
        }}>
        {title || 'Kaam Kiya?'}
      </Text>
    </View>
  );
};

export default Layout;
