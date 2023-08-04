/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity, Switch} from 'react-native';
import {useContext} from 'react';
import {Alarm} from '../util/alarm';
import React from 'react';

interface Props {
  alarm: Alarm;
  handlePress: (id: number) => void;
}
export default function AlarmItem({alarm, handlePress}: Props) {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 100,
        backgroundColor: '#87AFEB',
        borderColor: '#739BE1',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 5,
      }}
      onPress={() => {
        handlePress(alarm.id);
      }}>
      {/* <Text style={{color: 'black'}}>
        {alarm.date.getFullYear()}년 {alarm.date.getMonth() + 1}월{' '}
        {alarm.date.getDate()}일 {alarm.date.getHours()}시{' '}
        {alarm.date.getMinutes()}분
      </Text> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
          //   height: 20,
        }}>
        <Text>{alarm.title}</Text>
        <Text>
          {alarm.year}년 {alarm.month}월 {alarm.day}일
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Text style={{fontSize: 30}}>
          {alarm.hour}시 {alarm.minute}분
        </Text>
        {/* <Switch
          trackColor={{false: '#767577', true: '#2e3d58'}}
          thumbColor={alarm.active ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={value => {
            handleModifyActive(alarm.date, value);
          }}
          value={alarm.active}
        /> */}
      </View>
    </TouchableOpacity>
  );
}
