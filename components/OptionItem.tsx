import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Difficulty} from '../util/storage';

interface Props {
  title: string;
  value: string;
  handleValueChange: (value: string) => void;
}
export default function OptionItem({handleValueChange, value, title}: Props) {
  return (
    <View style={style.item}>
      <Text style={{color: '#F6F4EB', fontSize: 18, fontWeight: 'bold'}}>
        {title}
      </Text>
      <TextInput
        style={{
          color: '#F6F4EB',
          borderColor: '#F6F4EB',
          borderBottomWidth: 1,
          height: 40,
          textAlign: 'center',
        }}
        onChangeText={transPoint => handleValueChange(transPoint)}
        value={value}
        maxLength={1}
        returnKeyType="done"
        keyboardType="number-pad"
      />
    </View>
  );
}

const style = StyleSheet.create({
  item: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#91C8E4',
  },
});
