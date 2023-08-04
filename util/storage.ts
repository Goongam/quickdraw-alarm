import AsyncStorage from '@react-native-async-storage/async-storage';
import {INIT_DIFFICULTY, INIT_WORD_COUNT, storage_key} from '../constants';

export async function setWordCount(count: number) {
  try {
    return await AsyncStorage.setItem(storage_key.word_count, `${count}`);
  } catch (e) {
    throw new Error('save error: word-count');
  }
}

export async function getWordCount() {
  try {
    const wordCount = await AsyncStorage.getItem(storage_key.word_count);
    if (!wordCount) {
      setWordCount(INIT_WORD_COUNT);
      return INIT_WORD_COUNT;
    }
    return wordCount;
  } catch (e) {
    throw new Error('get error: word-count');
  }
}

export type Difficulty = 'normal' | 'hard';

export const difficultyList: Difficulty[] = ['normal', 'hard'];

export async function setDifficulty(difficulty: Difficulty) {
  try {
    return await AsyncStorage.setItem(storage_key.difficulty, `${difficulty}`);
  } catch (e) {
    throw new Error('save error: difficulty');
  }
}

export async function getDifficulty() {
  try {
    const difficulty = await AsyncStorage.getItem(storage_key.difficulty);
    if (!difficulty) {
      setDifficulty(INIT_DIFFICULTY);
      return INIT_DIFFICULTY;
    }
    return difficulty;
  } catch (e) {
    throw new Error('get error: difficulty');
  }
}
