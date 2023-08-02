import AsyncStorage from '@react-native-async-storage/async-storage';
import {INIT_WORD_COUNT} from '../constants';

export async function setWordCount(count: number) {
  try {
    return await AsyncStorage.setItem('word-count', `${count}`);
  } catch (e) {
    throw new Error('save error: word-count');
  }
}

export async function getWordCount() {
  try {
    const wordCount = await AsyncStorage.getItem('word-count');
    if (!wordCount) {
      setWordCount(INIT_WORD_COUNT);
      return INIT_WORD_COUNT;
    }
    return wordCount;
  } catch (e) {
    throw new Error('get error: word-count');
  }
}
