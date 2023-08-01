/* eslint-disable prettier/prettier */
import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';

let socket: Socket | undefined;
export function useSocket(namespace?: string | undefined) {
  const disconnect = useCallback(() => {
    socket?.close();
    socket = undefined;
  }, []);

  console.log('socket', socket);

  if (!socket) {
    socket = SocketIOClient('http://221.141.68.153:3000', {
      autoConnect: true,
    });
  }

  // if(!namespace) return {socket, disconnect};

  return {socket, disconnect};
}
