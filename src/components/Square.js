import React from 'react';
import Piece from './Piece';

const Square = ({ color, piece }) => {
  const bgColor = color === 'white' ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
  
  return (
    <div className={`w-16 h-16 flex items-center justify-center ${bgColor}`}>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;