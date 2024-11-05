import React from 'react';
import Piece from './Piece';

const Square = ({ color, piece, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center border border-black ${color}`} // Use Tailwind classes for size and styling
    >
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
