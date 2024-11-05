import validateMove from './validateMove';
import isKingInCheck from './validateMove';

const isCheckmate = (color, board, lastMove) => {
    if (!isKingInCheck(color, board, lastMove)) {
      console.log("0");
      return false; 
    }
  
    // Check all pieces of the current color to see if any can make a legal move
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const piece = board[y][x];
        if (piece && piece.color === color) {
          // Iterate through all possible target squares
          for (let targetY = 0; targetY < 8; targetY++) {
            for (let targetX = 0; targetX < 8; targetX++) {
              if (targetX !== x || targetY !== y) { // Don't check the same square
                const result = validateMove(x, y, targetX, targetY, piece, board, lastMove, color);
                if (result.isValid) {
                    return false; // There is at least one legal move, so it's not checkmate
                }
              }
            }
          }
        }
      }
    }
  
    // If no legal moves are available and the king is in check, it's checkmate
    return true; 
  };
  
  export default isCheckmate;