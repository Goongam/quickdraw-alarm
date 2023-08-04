import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
// import {} from '';

interface Props {
  text: string;
  onPress: (value?: string) => void;
}
export default function ColorButton({text, onPress}: Props) {
  return (
    <TouchableOpacity
      style={{
        // width: '100%',
        // height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#91C8E4',
        borderRadius: 30,
        padding: 5,
        margin: 10,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text style={{fontSize: 20, color: 'black'}}>{text}</Text>
    </TouchableOpacity>
  );
}
