/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Button, Modal, Portal, Provider} from 'react-native-paper';
import {Context} from '../context/provider';
import {TextInput} from 'react-native';

const Drawer = ({status, visible, hideModal}) => {
  const containerStyle = {
    backgroundColor: 'white',
    height: 350,
    width: 350,
    alignSelf: 'center',
    padding: 20,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 300, width: 300}}
            source={
              status === 'PRODUCTIVE'
                ? require('../assets/images/happy.png')
                : require('../assets/images/angry.png')
            }
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default Drawer;
