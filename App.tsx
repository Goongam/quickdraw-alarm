/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ReactNativeAN from 'react-native-alarm-notification';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AlarmList from './screen/AlarmList';
import NewAlarm from './screen/NewAlarm';

const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));
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
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const start = async () => {
    const alarm = await ReactNativeAN.scheduleAlarm({
      ...alarmNotifData,
      fire_date: ReactNativeAN.parseDate(new Date(Date.now() + 1000)),
    });
    console.log(alarm); // { id: 1 }
  };

  const stop = async () => {
    const alarms = await ReactNativeAN.getScheduledAlarms();
    console.log(alarms.length);
    ReactNativeAN.removeAllFiredNotifications();
    ReactNativeAN.stopAlarmSound();
  };
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{gestureEnabled: false}}>
        {/* <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="테스트" onPress={start} />
          <Button title="테스트2" onPress={stop} />
        </View>
      </ScrollView>

    </SafeAreaView> */}
        <Stack.Screen name="List" component={AlarmList} />
        <Stack.Screen name="NewAlarm" component={NewAlarm} />
        {/* <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="Canvas"
          component={AlarmCanvas}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
