/* eslint-disable prettier/prettier */
import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';

let socket: Socket | undefined;
export function useSocket(namespace?: string | undefined) {
  const disconnect = useCallback(() => {
    socket?.close();
    socket = undefined;
  }, []);

  if (!socket) {
    socket = SocketIOClient('http://18.208.144.99:3333', {
      autoConnect: true,
    });
  }

  // if(!namespace) return {socket, disconnect};

  return {socket, disconnect};
}
