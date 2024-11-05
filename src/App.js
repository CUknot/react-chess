import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
      <Game />
    </div>
  );
}

export default App;