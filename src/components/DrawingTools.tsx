
import React from 'react';

interface DrawingToolsProps {
  setTool: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setBrushSize: React.Dispatch<React.SetStateAction<number>>;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({ setTool, setColor, setBrushSize }) => {
  return (
    <div className="drawing-tools">
      <button onClick={() => setTool('pencil')}>Pencil</button>
      <button onClick={() => setTool('brush')}>Brush</button>
      <input type="color" onChange={(e) => setColor(e.target.value)} />
      <input type="range" min="1" max="50" onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
    </div>
  );
};

export default DrawingTools;
