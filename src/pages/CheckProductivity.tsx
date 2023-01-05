/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, SafeAreaView, Dimensions, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Layout from '../components/Layout';
import Daily from './Daily';
import Monthly from './Monthly';

const CheckProductivity = () => {
  const [selectedTab, setSelectedTab] = useState('DAILY');
  return (
    <SafeAreaView style={{height: Dimensions.get('screen').height}}>
      <Layout title="Check your Productivity" />
      {selectedTab === 'DAILY' && <Daily />}
      {selectedTab === 'MONTHLY' && <Monthly />}
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          justifyContent: 'space-around',
          flexDirection: 'row',
          width: '100%',
          height: 70,
        }}>
        <Button
          style={{flex: 1, height: '100%'}}
          onPress={() => setSelectedTab('DAILY')}>
          DAILY
        </Button>
        <Button
          style={{flex: 1, height: '100%'}}
          onPress={() => setSelectedTab('MONTHLY')}>
          MONTHLY
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CheckProductivity;
