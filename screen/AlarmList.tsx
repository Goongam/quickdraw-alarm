import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Alarm, getAlarm, getAlarms, stopring} from '../util/alarm';
import AlarmItem from '../components/AlarmItem';

export default function AlarmList() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    getAlarms().then(alarmlist => {
      setAlarms(alarmlist);
    });
  }, []);
  const navi = useNavigation();

  const handleNewAlarm = () => {
    navi.navigate('NewAlarm', {setAlarms});
  };

  const handleClickAlarm = (id: number) => {
    getAlarm(id).then(alarm => {
      navi.navigate('NewAlarm', {setAlarms, alarm});
    });
  };

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <TouchableOpacity onPress={handleNewAlarm}>
        <Text style={{color: 'black'}}>새알림</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          stopring();
        }}>
        <Text style={{color: 'black'}}>테스트알림종료</Text>
      </TouchableOpacity>
      <ScrollView style={{flexGrow: 1}}>
        <View>
          <Text>리스트</Text>

          <View>
            {alarms.map((alarm, i) => (
              <AlarmItem
                key={alarm.id}
                alarm={alarm}
                handlePress={handleClickAlarm}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
