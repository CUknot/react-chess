import React from 'react';
import Piece from './Piece';

const Square = ({ x, y, color, piece, onClick }) => {
  let backgroundColor = '#00FF00';
  switch(color){
    case 'green':
      backgroundColor = '#00FF00'; // Green for valid moves
      break;
    case 'red':
      backgroundColor = '#FF0000'; // Red for check or error indication
      break;
    case 'white':
      backgroundColor = '#f0d9b5'; // Default white square
      break;
    case 'black':
      backgroundColor = '#b58863'; // Default black square
      break;
    default:
      backgroundColor = '#00FF00';
  }

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
