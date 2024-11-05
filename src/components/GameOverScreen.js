import React from 'react';

const GameOverScreen = ({ winner, onRestart, onMainMenu }) => {
  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      <h2>{winner ? `${winner} Wins!` : "It's a Draw!"}</h2>
      <div className="button-container">
        <button onClick={onRestart} className="restart-button">Restart Game</button>
      </div>
    </div>
  );
};

export default GameOverScreen;
