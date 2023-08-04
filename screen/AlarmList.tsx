import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {
  Alarm,
  convertDate,
  getActiveAlarms,
  getAlarm,
  getAlarms,
  stopring,
} from '../util/alarm';
import AlarmItem from '../components/AlarmItem';
import ColorButton from '../components/ColorButton';

export default function AlarmList() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const navi = useNavigation();
  const router = useRoute();

  useEffect(() => {
    getAlarms().then(alarmlist => {
      setAlarms(alarmlist);
    });
    navi.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navi.navigate('Option');
          }}>
          {/* <Text style={{color: 'black'}}>Left</Text> */}
          <Image
            source={require('../asset/images/setting.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navi.navigate('NewAlarm', {setAlarms});
          }}>
          {/* <Text style={{color: 'black'}}>Left</Text> */}
          <Image
            source={require('../asset/images/new.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      ),
      title: '알람 목록',
      headerTitleAlign: 'center',
    });
  }, [navi]);

  const handleNewAlarm = () => {
    // @ts-ignore
    navi.navigate('NewAlarm', {setAlarms});
  };

  const handleClickAlarm = (id: number) => {
    getAlarm(id).then(alarm => {
      // @ts-ignore
      navi.navigate('NewAlarm', {setAlarms, alarm});
    });
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log(router.name);

  //     getActiveAlarms().then(als => {
  //       if (als.length) {
  //         als.forEach(ala => {
  //           console.log('활성화 알람:', convertDate(ala), new Date());
  //         });
  //       } else {
  //         console.log('활성화 알람 없음...');
  //       }

  //       if (als.length >= 1) {
  //         //@ts-ignore
  //         navi.navigate('AlarmCanvas');
  //       }
  //     });
  //   }, 500);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [navi]);

  return (
    <View style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
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
      <TouchableOpacity
        style={{
          height: 40,
          backgroundColor: '#91C8E4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          //@ts-ignore
          navi.navigate('AlarmCanvas');
        }}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          알람 종료하러 가기
        </Text>
      </TouchableOpacity>
      {/* <Text
        text="알람 끄기"
        onPress={() => {
          //@ts-ignore
          navi.navigate('AlarmCanvas');
        }}
      /> */}
    </View>
  );
}
