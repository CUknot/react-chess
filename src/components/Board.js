// Board.js
import React, { useState } from 'react';
import Square from './Square';

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
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    if (selectedPiece) {
      // If a piece is already selected, move it to the clicked square
      const newBoard = board.map(row => row.slice()); // Deep copy board

      // Place the selected piece in the new position
      newBoard[row][col] = selectedPiece;
      // Clear the previous position
      newBoard[selectedPosition.row][selectedPosition.col] = null;

      setBoard(newBoard);
      setSelectedPiece(null); // Deselect after moving
      setSelectedPosition(null); // Clear selected position
    } else if (piece) {
      // If no piece is selected, select the clicked square's piece
      setSelectedPiece(piece);
      setSelectedPosition({ row, col });
    }
  };

  const renderSquare = (row, col) => {
    const isWhite = (row + col) % 2 === 0;
    const color = isWhite ? 'white' : 'black';
    const piece = board[row][col]; // Get the piece from the board state
    return (
      <Square
        key={`${row}-${col}`}
        x={col}
        y={row}
        color={color}
        piece={piece}
        onClick={() => handleSquareClick(row, col)}
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
