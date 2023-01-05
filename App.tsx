import React, {useEffect} from 'react';
import {View, Text, Alert, Vibration} from 'react-native';

import {
  requestUserPermission,
  notificationListener,
} from './src/utils/pushNotification';
import messaging from '@react-native-firebase/messaging';
import {ProductivityProvider} from './src/context/provider';
import StackNavigator from './src/navigation/stackNavigation';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Vibration.vibrate();
    });

    return unsubscribe;
  }, []);

  return (
    <ProductivityProvider>
      <StackNavigator />
    </ProductivityProvider>
  );
};

export default App;
