/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Time() {
  const [time, setTime] = useState<Date>(new Date());
  //현재시간
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes() === 0 ? '00' : time.getMinutes();

  return (
    <View style={styles.titleLayout}>
      <Text style={{fontSize: 50, fontWeight: '200'}}>
        {hour} : {minute}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    maxHeight: 100,
  },
});
