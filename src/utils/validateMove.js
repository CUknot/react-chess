const validateMove = (startX, startY, targetX, targetY, piece, board) => {
    if (!piece) return false; // No piece to move
  
    // Calculate the movement delta
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
  
    const targetPiece = board[targetY][targetX];
    //if (targetPiece && targetPiece.color === piece.color) return false; 
  
    // Check piece type and apply movement rules
    switch (piece.type) {
      case 'pawn': {
        const direction = piece.color === 'white' ? -1 : 1;
        
        // Move forward by 1
        if (startX === targetX && startY + direction === targetY && !targetPiece) {
          return true;
        }
        
        // Capture diagonally
        if (Math.abs(deltaX) === 1 && deltaY === direction && targetPiece && targetPiece.color !== piece.color) {
          return true;
        }
  
        break;
      }
  
      case 'rook': {
        // Horizontal or vertical movement
        if (deltaX === 0 || deltaY === 0) {
          return isPathClear(startX, startY, targetX, targetY, board);
        }
        break;
      }
  
      case 'knight': {
        // L-shaped movement
        if ((Math.abs(deltaX) === 2 && Math.abs(deltaY) === 1) || (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 2)) {
          return true;
        }
        break;
      }
  
      case 'bishop': {
        // Diagonal movement
        if (Math.abs(deltaX) === Math.abs(deltaY)) {
          return isPathClear(startX, startY, targetX, targetY, board);
        }
        break;
      }
  
      case 'queen': {
        // Horizontal, vertical, or diagonal movement
        if (deltaX === 0 || deltaY === 0 || Math.abs(deltaX) === Math.abs(deltaY)) {
          return isPathClear(startX, startY, targetX, targetY, board);
        }
        break;
      }
  
      case 'king': {
        // Move one square in any direction
        if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) {
          return true;
        }
        break;
      }
  
      default:
        return false;
    }
  
    return false;
  };
  
  // Helper function to check if the path is clear (for rook, bishop, and queen)
  const isPathClear = (startX, startY, targetX, targetY, board) => {
    const stepX = Math.sign(targetX - startX);
    const stepY = Math.sign(targetY - startY);
    
    let x = startX + stepX;
    let y = startY + stepY;
  
    while (x !== targetX || y !== targetY) {
      if (board[y][x]) return false; // Path is blocked by another piece
      x += stepX;
      y += stepY;
    }
  
    return true;
  };
  
  export default validateMove;
  