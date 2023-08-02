import {useCallback, useEffect, useState} from 'react';
import {getOneWord, words} from '../util/word';
import {getWordCount} from '../util/storage';
import {INIT_WORD_COUNT} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {stopring} from '../util/alarm';

export function useWord() {
  const [word, setWord] = useState('');
  const [wordCount, setWordCount] = useState(INIT_WORD_COUNT);
  const [currectCount, setCurrectCount] = useState(0);

  const navigation = useNavigation();

  const setRandomWord = useCallback(() => {
    setWord(getOneWord());
  }, []);

  const currectAnswer = () => {
    setCurrectCount(currectCount + 1);
    setRandomWord();
  };

  useEffect(() => {
    setRandomWord();
    getWordCount().then(count => setWordCount(+count));
  }, [setRandomWord]);

  useEffect(() => {
    //정답
    if (currectCount === wordCount) {
      stopring();
      //@ts-ignore
      navigation.navigate('List');
    }
  }, [currectCount, navigation, wordCount]);
  return {word, setRandomWord, wordCount, currectCount, currectAnswer};
}
