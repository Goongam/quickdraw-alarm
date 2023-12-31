// @ts-ignore
import ReactNativeAN from 'react-native-alarm-notification';
import {NativeModules} from 'react-native';
// const {RNAlarmNotification} = NativeModules;
// const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

export interface Alarm {
  id: number; // number
  year: number; // number
  month: number; // number
  day: number;
  hour: number;
  minute: number; // number
  interval: string; // string
  intervalValue: number; // number
  largeIcon: string; // string (빈 문자열)
  loopSound: boolean; // boolean
  message: string; // string
  playSound: boolean; // boolean
  scheduleType: string; // string
  second: number; // number
  smallIcon: string; // string
  snoozeInterval: number; // number
  soundName: string; // string (빈 문자열)
  tag: string; // string (빈 문자열)
  ticker: string; // string (빈 문자열)
  title: string; // string
  useBigText: boolean; // boolean
  vibrate: boolean; // boolean
  vibration: number; // number
  volume: number; // number
}
export async function getAlarms(): Promise<Alarm[]> {
  return await ReactNativeAN.getScheduledAlarms();
}

export async function getAlarm(id: number) {
  const alarms: Alarm[] = await ReactNativeAN.getScheduledAlarms();
  const findAlarm = alarms.find(alarm => alarm.id === id);
  return findAlarm;
}

export async function getActiveAlarms() {
  const alarms: Alarm[] = await getAlarms();
  const filtered = alarms.filter(alarm => {
    if (convertDate(alarm) < new Date()) {
      return true;
    }
  });

  return filtered;
}

export function convertDate(alarm: Alarm) {
  return new Date(
    alarm.year,
    alarm.month - 1,
    alarm.day,
    alarm.hour,
    alarm.minute,
  );
}
export async function deleteAlarm(id: number) {
  return ReactNativeAN.deleteAlarm(id);
}

const alarmNotifData = {
  title: '알림',
  message: '터치해서 알람을 종료하세요',
  channel: 'my_channel_id',
  small_icon: 'ic_launcher',
  // sound_name: 'drre.mp3',
  // play_sound: true,
  // You can add any additional data that is important for the notification
  // It will be added to the PendingIntent along with the rest of the bundle.
  // e.g.
  data: {foo: 'bar'},
};

export async function scheduleAlarm(date: Date, title: string) {
  const alarm = await ReactNativeAN.scheduleAlarm({
    ...alarmNotifData,
    fire_date: ReactNativeAN.parseDate(date),
    title: title,
    loop_sound: true,
    volume: 1.0,
  });
  // subcribeOpenEvent();
  console.log('알람 추가:', alarm);

  return alarm;
}

export async function stopring() {
  ReactNativeAN.removeAllFiredNotifications();
  ReactNativeAN.stopAlarmSound();
  const activeAlarms = await getActiveAlarms();
  activeAlarms.forEach(alarm => deleteAlarm(alarm.id));
}
// let openedSubscription: any = null;
// // export function subcribeOpenEvent() {
// //   if (openedSubscription) {
// //     openedSubscription.remove();
// //   }

// //   RNAlarmEmitter.addListener('OnNotificationOpened', data =>
// //     console.log('앱 킴:', data),
// //   );

// //   console.log(RNAlarmEmitter.listenerCount('OnNotificationOpened'));
// // }
