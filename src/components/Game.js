import React, { useState } from 'react';
import Board from './Board';
import GameOverScreen from './GameOverScreen';

const Game = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Function to handle game over logic
  const handleGameOver = (winningColor) => {
    setWinner(winningColor);
    setIsGameOver(true);
  };

  // Function to restart the game
  const restartGame = () => {
    setWinner(null);
    setIsGameOver(false);
  };

  return (
    <div>
      {isGameOver ? (
        <GameOverScreen 
          winner={winner} 
          onRestart={restartGame}  
        />
      ) : (
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Chess Game</h1>
          <Board onGameOver={handleGameOver} />
        </div>
      )}
    </div>
  );
};

export default Game;
