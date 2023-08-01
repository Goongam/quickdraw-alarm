import {useCallback, useEffect, useState} from 'react';
import {getOneWord, words} from '../util/word';

export function useWord() {
  const [word, setWord] = useState('');

  const setRandomWord = useCallback(() => {
    setWord(getOneWord());
  }, []);

  useEffect(() => {
    setRandomWord();
  }, [setRandomWord]);

  return {word, setRandomWord};
}
