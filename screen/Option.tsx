/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import OptionItem from '../components/OptionItem';
import {INIT_DIFFICULTY, INIT_WORD_COUNT} from '../constants';
import {
  Difficulty,
  difficultyList,
  getDifficulty,
  getWordCount,
  setWordCount,
} from '../util/storage';
import OptionItemDropDown from '../components/OptionItemDropDown';

export default function Option() {
  const [wordCount, setWordCountState] = useState(`${INIT_WORD_COUNT}`);
  const [difficulty, setDifficulty] = useState('normal');

  const wordCountChange = (value: string) => {
    setWordCountState(value);
    // console.log(value);

    if (value === '0' || !value) {
      return;
    }
    setWordCount(+value);
  };

  const difficultyChange = (value: string) => {
    setDifficulty(value);
  };

  useEffect(() => {
    getDifficulty().then(value => setDifficulty(value));
    getWordCount().then(value => setWordCountState(`${value}`));
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <OptionItem
        value={wordCount}
        handleValueChange={wordCountChange}
        title="맞춰야 할 단어 개수"
      />
      <OptionItemDropDown
        title="AI 정답 판정"
        value={difficulty}
        handleValueChange={difficultyChange}
        list={difficultyList}
      />
    </View>
  );
}
