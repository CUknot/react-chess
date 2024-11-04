// Square.js
import React from 'react';
import Piece from './Piece';

const Square = ({ x, y, color, piece, onClick, highlight}) => {
  const bgColor = color === 'white' ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
  if(highlight) bgColor = 'red';

  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center ${bgColor}`}
    >
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  
  );
};

export default Square;
