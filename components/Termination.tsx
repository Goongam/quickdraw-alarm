import React from 'react';
import {Image, TouchableOpacity, BackHandler} from 'react-native';
import {stopring} from '../util/alarm';
import {useNavigation} from '@react-navigation/native';

export default function Termination() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        stopring();
        //@ts-ignore
        navigation.navigate('List');
        // BackHandler.exitApp();
      }}>
      <Image
        source={require('../asset/images/close.png')}
        style={{width: 40, height: 40, position: 'absolute'}}
      />
    </TouchableOpacity>
  );
}
