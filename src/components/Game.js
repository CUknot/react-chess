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
    // Reset the board and other game state as needed
  };

  return (
    <div>
      {isGameOver ? (
        <GameOverScreen 
          winner={winner} 
          onRestart={restartGame}  
        />
      ) : (
        <Board onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default Game;
