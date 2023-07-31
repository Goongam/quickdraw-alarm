import React, {useState} from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Alarm, deleteAlarm, getAlarm, scheduleAlarm} from '../util/alarm';
import DatePicker from 'react-native-date-picker';

var width = Dimensions.get('window').width; //full width
interface Params {
  setAlarms: any;
  alarm?: Alarm;
}
interface Route {
  params: Params;
}
export default function NewAlarm({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  //   console.log(route.params);
  const [date, setDate] = useState(new Date(Date.now() + 1000 * 60));
  const {setAlarms, alarm} = route.params;

  //TODO: 렌더링
  const handleNew = () => {
    scheduleAlarm(date).then(({id}) => {
      getAlarm(id).then(addAlarm => {
        setAlarms((pre: Alarm[]) => [...pre, addAlarm]);
      });

      // setAlarms((pre)=> [...pre, ]);
      navigation.navigate('List');
    });
  };

  const handleDelete = () => {
    // removeAlarm(modifyDate);
    if (alarm) {
      deleteAlarm(alarm?.id).then(() => {
        setAlarms((pre: Alarm[]) => pre.filter(a => a.id !== alarm.id));
      });
    }
    navigation.navigate('List');
  };

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <DatePicker
        style={{marginTop: 10, width}}
        date={
          alarm
            ? new Date(
                alarm.year,
                alarm.month - 1,
                alarm.day,
                alarm.hour,
                alarm.minute,
              )
            : date
        }
        onDateChange={setDate}
        fadeToColor={'black'}
        textColor="black"
      />
      {/* {alarm ? (
        <Button title="수정" onPress={handleModify} />
      ) : (
        <Button title="추가" onPress={handleNew} />
      )} */}
      {alarm ? (
        <Button title="삭제" onPress={handleDelete} />
      ) : (
        <Button title="추가" onPress={handleNew} />
      )}
    </View>
  );
}
