/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

//@ts-ignore
import Canvas, {CanvasRenderingContext2D} from 'react-native-canvas';
import {useSocket} from '../hooks/useSocket';
import Time from '../components/Time';
import {useRoute} from '@react-navigation/native';
import {stopring} from '../util/alarm';
import {useWord} from '../hooks/useWord';
import {translate_words} from '../util/word';
import {Difficulty, getDifficulty} from '../util/storage';
import Termination from '../components/Termination';
interface Result {
  label: string;
  score: number;
  korLabel: string;
}

function AlarmCanvas({navigation}: {navigation: any}): JSX.Element {
  //캔버스
  const [canvas, setCanvas] = useState<Canvas>();
  const [canvasX, setCanvasX] = useState<number>(0);
  const [canvasY, setCanvasY] = useState<number>(0);
  const [canvasLayoutHeight, setCanvasLayoutHeight] = useState(0);
  //터치영역
  const [touchX, setTouchX] = useState<number>(0);
  const [touchY, setTouchY] = useState<number>(0);

  //터치중
  const [onTouching, setOnTouching] = useState(false);

  //폰 화면 크기
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  //결과값
  const [result, setResult] = useState({label: '?', score: 0, korLabel: '?'});

  const {socket, disconnect} = useSocket();

  const route = useRoute();

  const {word, setRandomWord, wordCount, currectCount, currectAnswer} =
    useWord();

  const clearCanvas = useCallback(() => {
    canvas?.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }, [canvas]);

  // const difficulty: Difficulty = 'normal';
  const receiveMsg = useCallback(
    async (data: Result[]) => {
      //난이도
      let AnswerCondition;
      const difficulty = await getDifficulty();
      if (difficulty === 'normal') {
        //보통
        AnswerCondition = data.find(element => {
          console.log(element.korLabel);
          if (element.label === word) {
            return true;
          }
        });
      } else if (difficulty === 'hard') {
        //어려움
        AnswerCondition = data[0].label === word;
      }
      if (AnswerCondition) {
        //정답
        currectAnswer();
        clearCanvas();
      }
      setResult(data[0]);
    },
    [word, currectAnswer, clearCanvas],
  );
  //통신
  useEffect(() => {
    const sendInterval = setInterval(async () => {
      if (!socket.connect) {
        console.log('서버와 연결 불가');

        clearInterval(sendInterval);
      }
      if (!canvas) {
        return console.log('캔버스가 없음');
      }

      const url = await canvas?.toDataURL('image/jpeg', 0);
      socket.emit('message', url);
    }, 1000);

    return () => {
      clearInterval(sendInterval);
      socket.off('message');
    };
  }, [socket, canvas]);

  //연결종료
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  //소켓 이벤트 등록
  useEffect(() => {
    // 서버로부터 메시지를 받을 때 처리
    socket.on('message', function (data: Result[]) {
      receiveMsg(data);
    });

    return () => {
      socket.off('message');
    };
  }, [socket, receiveMsg]);

  //캔버스 초기설정
  const handleCanvas = (c: Canvas) => {
    if (canvas || !c) {
      return;
    }
    setCanvas(c);
    c.width = screenWidth;
    c.height = canvasLayoutHeight; //or screenHeight
    c.getContext('2d').fillStyle = '#000000';
    c.getContext('2d').fillRect(0, 0, c.width, c.height);
    console.log('높이:', c.height);
  };

  const viewRef = useRef(null);

  let beforeX = useRef(0);
  let beforeY = useRef(0);

  //그림 그리기
  useEffect(() => {
    if (!canvas) {
      return console.log('캔버스가 없음');
    }

    const isInside =
      touchX >= canvasX &&
      touchY >= canvasY &&
      touchX <= canvasX + canvas.width &&
      touchY <= canvasY + canvas.height;

    if (!isInside) {
      console.log('캔버스 밖을 누르는 중');
      return;
    }

    const posX = touchX - canvasX;
    const posY = touchY - canvasY;

    const ctx = canvas.getContext('2d');

    if (beforeX.current === 0 || beforeY.current === 0) {
      beforeX.current = posX;
      beforeY.current = posY;
      return;
    }

    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.moveTo(beforeX.current, beforeY.current);
    ctx.lineTo(posX, posY);
    ctx.stroke();

    if (onTouching) {
      beforeX.current = posX;
      beforeY.current = posY;
    } else {
      beforeX.current = 0;
      beforeY.current = 0;
    }
  }, [touchX, touchY, canvas, screenWidth, canvasX, canvasY, onTouching]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        setTouchX(gestureState.x0);
        setTouchY(gestureState.y0);
      },
      onPanResponderMove: (event, gestureState) => {
        setOnTouching(true);
        setTouchX(gestureState.moveX);
        setTouchY(gestureState.moveY);
      },
      onPanResponderRelease: () => {
        setOnTouching(false);
      },
      onPanResponderTerminate: () => {
        // 터치 강제 종료 시 필요한 작업 수행
      },
    }),
  ).current;

  //캔버스
  useEffect(() => {
    if (!canvas) {
      return console.log('캔버스가 업승ㅁ', canvasLayoutHeight);
    }
    canvas.height = canvasLayoutHeight;
  }, [canvas, canvasLayoutHeight]);

  //캔버스 화면 뒤로가기 막기
  useEffect(() => {
    const onBackPress = () => {
      if (route.name === 'Canvas') {
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => subscription.remove();
  }, [route]);

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#008080',
        display: 'flex',
        justifyContent: 'flex-start',
      }}>
      <Termination />
      <Time />
      <View style={styles.scoreLayout}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '200',
          }}>{`${currectCount}/${wordCount}`}</Text>
      </View>

      <View style={styles.wordLayout}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          {`${translate_words[word]}을(를) 그리세요`}
        </Text>
      </View>

      <View
        style={{position: 'relative', flex: 1}}
        onLayout={event => {
          setCanvasX(event.nativeEvent.layout.x);
          setCanvasY(event.nativeEvent.layout.y);
          console.log(event.nativeEvent.layout.height);
          setCanvasLayoutHeight(event.nativeEvent.layout.height);
        }}>
        <View
          style={{backgroundColor: 'black'}}
          {...panResponder.panHandlers}
          ref={viewRef}>
          <Canvas ref={handleCanvas} />
        </View>

        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: '#008080',
              borderColor: 'brown',
              borderWidth: 1,
              borderStyle: 'dotted',
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            {result.korLabel} ({Math.floor(result.score * 100)}%)
          </Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={styles.button} onPress={clearCanvas}>
          <Text style={{color: 'white'}}>지우기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setRandomWord();
            clearCanvas();
          }}>
          <Text style={{color: 'white'}}>다른 단어</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AlarmCanvas;

const styles = StyleSheet.create({
  scoreLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    maxHeight: 40,
  },
  wordLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    maxHeight: 60,
  },
  predictLayout: {},
  button: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'black',
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
  buttonText: {
    fontFamily: 'cursive',
  },
});
