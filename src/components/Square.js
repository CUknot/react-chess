import React from 'react';
import Piece from './Piece';

const Square = ({ x, y, color, piece, onClick, highlight }) => {
  const bgColor = color === 'white' ? '#f0d9b5' : '#b58863';
  const backgroundColor = highlight ? 'red' : bgColor;

  return (
    <div
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: backgroundColor, // explicitly use variable without reassignment
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black'
      }}
    >
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
