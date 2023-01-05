import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../pages/Splash';
import Questions from '../pages/Questions';
import Landing from '../pages/Landing';
import LogHour from '../pages/LogHour';
import CheckProductivity from '../pages/CheckProductivity';
import RandomQuote from '../pages/RandomQuote';
import JustABox from '../pages/JustABox';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{header: () => null}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="LogHour" component={LogHour} />
        <Stack.Screen name="CheckProductivity" component={CheckProductivity} />
        <Stack.Screen name="RandomQuote" component={RandomQuote} />
        <Stack.Screen name="JustABox" component={JustABox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
