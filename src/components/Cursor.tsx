import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Cursor: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      socket.emit('cursor', { x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
};

export default Cursor;