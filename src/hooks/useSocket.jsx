import { useEffect, useRef } from 'react';
import socket from '../socket/init';

export const useSocket = () => {
  const socketRef = useRef(socket);

  useEffect(() => {
    // Connect socket
    socketRef.current.connect();

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return socketRef.current;
};