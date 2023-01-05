/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Image, ActivityIndicator, Text} from 'react-native';
import {Card} from 'react-native-paper';
import Layout from '../components/Layout';

const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchQuote = async () => {
      const data = await axios.get('https://api.quotable.io/random');
      if (data?.data?.content && data?.data?.author) {
        setQuote({
          ...data.data,
        });
        setLoading(false);
      }
    };
    fetchQuote();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout title="Random Quote" />
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )}
      {!loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card style={{width: '90%', alignSelf: 'center'}}>
            <Card.Content>
              <Text style={{color: 'black', fontSize: 16}}>
                {quote.content}
              </Text>
            </Card.Content>
            <View style={{height: 20}} />
            <View
              style={{
                paddingHorizontal: 12,
                paddingBottom: 12,
                alignItems: 'flex-end',
              }}>
              <Text style={{color: 'black', fontSize: 12}}>
                - {quote.author}
              </Text>
            </View>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RandomQuote;
