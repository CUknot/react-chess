
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
  const [lastMove, setLastMove] = useState(null); 
  const [validMoves, setValidMoves] = useState([]); // Track valid moves
  const [turn , setTurn] = useState('white');

  // Define the updateBoard function
  const updateBoard = (startX, startY, targetX, targetY, piece, enPassantCapture) => {
    // Clone the board to avoid directly mutating state
    const newBoard = board.map(row => row.slice());

    // Move the piece to the target location
    newBoard[targetY][targetX] = newBoard[startY][startX];
    newBoard[startY][startX] = null; // Empty the original square

    if (enPassantCapture) {
      newBoard[startY][targetX] = null; // Remove the captured pawn
    }

    // Update the state with the new board
    setBoard(newBoard);

    // Set the last move (to track for en passant)
    setLastMove({ startX, startY, targetX, targetY, piece });

    // Switch turns
    setTurn(turn === 'white' ? 'black' : 'white');

    setValidMoves([]);
  };

  const handleSquareClick = (x, y) => {
    if (selectedSquare) {
      const [startX, startY] = selectedSquare;
      const piece = board[startY][startX];
      const { isValid, enPassantCapture } = validateMove(startX, startY, x, y, piece, board, lastMove, turn);
      //console.log(isValid, enPassantCapture);
  
      // Validate the move with explicit coordinates
      if (isValid) {
        updateBoard(startX, startY, x, y, piece, enPassantCapture); // Move the piece
      }
  
      setSelectedSquare(null); // Deselect after move
      setValidMoves([]); // Clear highlights after moving
    } else {
      const piece = board[y][x];

      setSelectedSquare([x, y]); // Select the piece
      calculateValidMoves(x, y, piece); // Calculate moves for highlighting
    }
  };

  const calculateValidMoves = (x, y, piece) => {
    const moves = [];

    // Check every square on the board to see if it's a valid move
    for (let targetY = 0; targetY < 8; targetY++) {
      for (let targetX = 0; targetX < 8; targetX++) {
        const { isValid } = validateMove(x, y, targetX, targetY, piece, board, null, turn);
        if (isValid) {
          moves.push([targetX, targetY]); // Add valid move coordinates
        }
      }
    }

    setValidMoves(moves);
  };

  const renderSquare = (row, col) => {
    const isWhite = (row + col) % 2 === 0;
    let color = isWhite ? 'white' : 'black'; // Change 'const' to 'let'
    const piece = board[row][col];
    
    // Update the color based on conditions
    if (selectedSquare && selectedSquare[0] === col && selectedSquare[1] === row) {
        color = 'red'; // Highlight selected square
    } else if (validMoves.some(([x, y]) => x === col && y === row)) {
        color = 'green'; // Highlight valid moves
    }

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
}


  const createBoard = () => {
    let squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        squares.push(renderSquare(row, col));
      }
    }
    return squares;
  };

  return <div>
    <div>current turn: {turn}</div>
    <div className="grid grid-cols-8 gap-0">
    {createBoard()}
    </div>
    </div>;
};

export default Board;
