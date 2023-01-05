/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Box from '../components/Box';
import Layout from '../components/Layout';

const Landing = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Layout title="Productivity" />
      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 16, color: 'black'}}>
          Hi Yo, how are you???
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>
          This is just a reminder, because, thats why.
        </Text>
      </View>
      <View
        style={{flexDirection: 'column', alignSelf: 'center', width: '90%'}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            height: 100,
            marginBottom: 10,
          }}>
          <Box
            action={() => navigation.navigate('LogHour')}
            title="Log hour"
            subtitle="Log daily hours here"
          />
          <Box
            action={() => navigation.navigate('CheckProductivity')}
            title="Check your productivity"
            subtitle="Check all your past produtivity here"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            height: 100,
          }}>
          <Box
            action={() => navigation.navigate('RandomQuote')}
            title="Random Quote"
            subtitle="This is just a random quote section to motivate you"
          />
          <Box
            action={() => navigation.navigate('JustABox')}
            title="BOX"
            subtitle="BOX"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Landing;
