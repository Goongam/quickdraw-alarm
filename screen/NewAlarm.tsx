import React, {useState} from 'react';
import {View, Text, Button, Dimensions, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Alarm, deleteAlarm, getAlarm, scheduleAlarm} from '../util/alarm';
import DatePicker from 'react-native-date-picker';
import ColorButton from '../components/ColorButton';

const screen_width = Dimensions.get('window').width; //full width
const screen_height = Dimensions.get('window').height; //full width
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
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 1000 * 60));
  const {setAlarms, alarm} = route.params;

  //TODO: 렌더링
  const handleNew = () => {
    scheduleAlarm(date, title)
      .then(({id}) => {
        getAlarm(id).then(addAlarm => {
          setAlarms((pre: Alarm[]) => [...pre, addAlarm]);
        });

        // setAlarms((pre)=> [...pre, ]);
        navigation.navigate('List');
      })
      .catch(err => {
        console.log(err);
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
        width: screen_width,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TextInput
        style={{
          color: 'black',
          borderColor: 'black',
          borderBottomWidth: 1,
          height: 40,
          // width: '100%',
          textAlign: 'center',
          marginRight: 20,
          marginLeft: 20,
        }}
        autoFocus={true}
        placeholderTextColor={'gray'}
        textAlign="left"
        placeholder="알람 이름"
        onChangeText={transPoint => setTitle(transPoint)}
        value={title}
        maxLength={15}
        returnKeyType="done"
      />
      <DatePicker
        style={{
          marginTop: 10,
          height: screen_height / 3,
          width: screen_width - 10,
          margin: 5,
        }}
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
        fadeToColor={'white'}
        textColor="black"
      />
      {alarm ? (
        <ColorButton text="삭제" onPress={handleDelete} />
      ) : (
        <ColorButton text="추가" onPress={handleNew} />
      )}
    </View>
  );
}
