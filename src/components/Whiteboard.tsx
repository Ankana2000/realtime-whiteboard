import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import * as fabric from 'fabric';



const socket = io('http://localhost:3001');

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const fabricCanvas = new fabric.Canvas(canvas);
      fabricCanvas.isDrawingMode = true;

      if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.color = 'black';
        fabricCanvas.freeDrawingBrush.width = 5;
      }

      const handleMouseDown = () => setIsDrawing(true);
      const handleMouseUp = () => setIsDrawing(false);

      const handleMouseMove = (e: fabric.TEvent) => {
        if (isDrawing && fabricCanvas.freeDrawingBrush) {
          const pointer = fabricCanvas.getPointer(e.e as MouseEvent);
          socket.emit('drawing', {
            x: pointer.x,
            y: pointer.y,
            color: fabricCanvas.freeDrawingBrush.color,
            width: fabricCanvas.freeDrawingBrush.width
          });
        }
      };

      fabricCanvas.on('mouse:down', handleMouseDown);
      fabricCanvas.on('mouse:up', handleMouseUp);
      fabricCanvas.on('mouse:move', handleMouseMove);

      socket.on('drawing', (data) => {
        if (fabricCanvas.freeDrawingBrush) {
          fabricCanvas.freeDrawingBrush.color = data.color;
          fabricCanvas.freeDrawingBrush.width = data.width;
        }
        fabricCanvas.add(new fabric.Circle({
          left: data.x,
          top: data.y,
          radius: data.width / 2,
          fill: data.color,
          selectable: false
        }));
      });

      return () => {
        fabricCanvas.off('mouse:down', handleMouseDown);
        fabricCanvas.off('mouse:up', handleMouseUp);
        fabricCanvas.off('mouse:move', handleMouseMove);
      };
    }
  }, [isDrawing]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Whiteboard;
