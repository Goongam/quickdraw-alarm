import ReactNativeAN from 'react-native-alarm-notification';

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

export async function deleteAlarm(id: number) {
  return ReactNativeAN.deleteAlarm(id);
}

const alarmNotifData = {
  title: 'My Notification Title',
  message: 'My Notification Message',
  channel: 'my_channel_id',
  small_icon: 'ic_launcher',
  // sound_name: 'drre.mp3',
  // play_sound: true,
  // You can add any additional data that is important for the notification
  // It will be added to the PendingIntent along with the rest of the bundle.
  // e.g.
  data: {foo: 'bar'},
};

export async function scheduleAlarm(date: Date) {
  const alarm = await ReactNativeAN.scheduleAlarm({
    ...alarmNotifData,
    fire_date: ReactNativeAN.parseDate(date),
  });
  console.log('알람 추가:', alarm);

  return alarm;
}

export async function stopring() {
  const alarms = await ReactNativeAN.getScheduledAlarms();
  console.log(alarms.length);
  ReactNativeAN.removeAllFiredNotifications();
  ReactNativeAN.stopAlarmSound();
}
