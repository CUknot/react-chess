import React, { useState } from 'react';
import Square from './Square';
import validateMove from '../utils/validateMove';

const Board = () => {
  const initialBoardSetup = [
    [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' },
    ],
    [
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
      { type: 'pawn', color: 'black' },
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
      { type: 'pawn', color: 'white' },
    ],
    [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' },
    ],
  ];

  const [board, setBoard] = useState(initialBoardSetup);
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Define the updateBoard function
  const updateBoard = (startX, startY, targetX, targetY) => {
    // Clone the board to avoid directly mutating state
    const newBoard = board.map(row => row.slice());

    // Move the piece to the target location
    newBoard[targetY][targetX] = newBoard[startY][startX];
    newBoard[startY][startX] = null; // Empty the original square

    // Update the state with the new board
    setBoard(newBoard);
  };

  const handleSquareClick = (x, y) => {
    if (selectedSquare) {
      const [startX, startY] = selectedSquare;
      const piece = board[startY][startX];
  
      // Validate the move with explicit coordinates
      if (validateMove(startX, startY, x, y, piece, board)) {
        updateBoard(startX, startY, x, y); // Move the piece
      }
  
      setSelectedSquare(null); // Deselect after move
    } else {
      setSelectedSquare([x, y]); // Select the piece
    }
  };

  const renderSquare = (row, col) => {
    const isWhite = (row + col) % 2 === 0;
    const color = isWhite ? 'white' : 'black';
    const piece = board[row][col];
    return (
      <Square
        key={`${row}-${col}`}
        x={col}
        y={row}
        color={color}
        piece={piece}
        onClick={() => handleSquareClick(col, row)} // Pass coordinates on click
      />
    );
  };

  const createBoard = () => {
    let squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        squares.push(renderSquare(row, col));
      }
    }
    return squares;
  };

  return <div className="grid grid-cols-8 gap-0">{createBoard()}</div>;
};

export default Board;
