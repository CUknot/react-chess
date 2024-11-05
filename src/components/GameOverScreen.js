const GameOverScreen = ({ winner, onRestart }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-4xl font-bold mb-4">Game Over</h1>
        <p className="text-2xl mb-4">{winner} wins!</p>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-lg transition duration-300"
        >
          Restart Game
        </button>
      </div>
    );
  };
  
  export default GameOverScreen;
  