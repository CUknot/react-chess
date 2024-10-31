import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
      <Board />
    </div>
  );
}

export default App;