import React, { useState, useEffect } from 'react';
import Square from './Square';
import validateMove from '../utils/validateMove';
import isCheckmate from '../utils/IsCheckmate';

const Board = ({ onGameOver }) => {
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
  const [validMoves, setValidMoves] = useState([]); 
  const [turn , setTurn] = useState('white');

  // Define the updateBoard function
  const updateBoard = (startX, startY, targetX, targetY, piece, enPassantCapture) => {
    // Clone the board to avoid directly mutating state
    const newBoard = board.map(row => row.slice());

    newBoard[targetY][targetX] = newBoard[startY][startX];
    newBoard[startY][startX] = null; 

    if (enPassantCapture) {
      newBoard[startY][targetX] = null; 
    }

    setBoard(newBoard);
    setLastMove({ startX, startY, targetX, targetY, piece });
    setTurn(turn === 'white' ? 'black' : 'white');
    setValidMoves([]);
  };

  useEffect(() => {
    if (isCheckmate(turn, board, lastMove)) {
      onGameOver(turn === 'white' ? 'Black' : 'White');
    }
  }, [board, turn, lastMove, onGameOver]); 

  const handleSquareClick = (x, y) => {
    if (selectedSquare) {
      const [startX, startY] = selectedSquare;
      const piece = board[startY][startX];
      const { isValid, enPassantCapture } = validateMove(startX, startY, x, y, piece, board, lastMove, turn);
  
      if (isValid) {
        updateBoard(startX, startY, x, y, piece, enPassantCapture); 
      }
  
      setSelectedSquare(null); 
      setValidMoves([]); 
    } else {
      const piece = board[y][x];

      setSelectedSquare([x, y]); 
      calculateValidMoves(x, y, piece); 
    }
  };

  const calculateValidMoves = (x, y, piece) => {
    const moves = [];

    for (let targetY = 0; targetY < 8; targetY++) {
      for (let targetX = 0; targetX < 8; targetX++) {
        const { isValid } = validateMove(x, y, targetX, targetY, piece, board, null, turn);
        if (isValid) {
          moves.push([targetX, targetY]); 
        }
      }
    }

    setValidMoves(moves);
  };

  const renderSquare = (row, col) => {
    const isWhite = (row + col) % 2 === 0;
    let color = isWhite ? 'bg-white' : 'bg-gray-700'; 
    const piece = board[row][col];
    
    if (selectedSquare && selectedSquare[0] === col && selectedSquare[1] === row) {
      color = 'bg-red-300';
    } else if (validMoves.some(([x, y]) => x === col && y === row)) {
      color = 'bg-green-300';  
    }

    return (
      <Square
        key={`${row}-${col}`}
        color={color}
        piece={piece}
        onClick={() => handleSquareClick(col, row)} 
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

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Current Turn: {turn}</h2>
      <div className="grid grid-cols-8 gap-0">
        {createBoard()}
      </div>
    </div>
  );
};

export default Board;
