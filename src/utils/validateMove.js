const validateMove = (startX, startY, targetX, targetY, piece, board) => {
  if (!piece) return false; // No piece to move

  // Calculate the movement delta
  const deltaX = targetX - startX;
  const deltaY = targetY - startY;

  const targetPiece = board[targetY][targetX];
  if (targetPiece && targetPiece.color === piece.color) return false;

  // Check piece type and apply movement rules
  let isValid = false;
  switch (piece.type) {
    case 'pawn': {
      const direction = piece.color === 'white' ? -1 : 1;
      
      // Move forward by 1
      if (startX === targetX && startY + direction === targetY && !targetPiece) {
        isValid = true;
      }
      
      // Capture diagonally
      if (Math.abs(deltaX) === 1 && deltaY === direction && targetPiece && targetPiece.color !== piece.color) {
        isValid = true;
      }

      break;
    }

    case 'rook': {
      if (deltaX === 0 || deltaY === 0) {
        isValid = isPathClear(startX, startY, targetX, targetY, board);
      }
      break;
    }

    case 'knight': {
      if ((Math.abs(deltaX) === 2 && Math.abs(deltaY) === 1) || (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 2)) {
        isValid = true;
      }
      break;
    }

    case 'bishop': {
      if (Math.abs(deltaX) === Math.abs(deltaY)) {
        isValid = isPathClear(startX, startY, targetX, targetY, board);
      }
      break;
    }

    case 'queen': {
      if (deltaX === 0 || deltaY === 0 || Math.abs(deltaX) === Math.abs(deltaY)) {
        isValid = isPathClear(startX, startY, targetX, targetY, board);
      }
      break;
    }

    case 'king': {
      if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) {
        isValid = true;
      }
      break;
    }

    default:
      return false;
  }

  if (isValid) {
    // Simulate the move to check if it leaves the king in check
    const newBoard = board.map(row => row.slice()); // Clone the board
    newBoard[targetY][targetX] = piece; // Move piece to target position
    newBoard[startY][startX] = null; // Remove piece from start position
    
    if (isKingInCheck(piece.color, newBoard)) {
      return false; // Move is invalid if it leaves the king in check
    }
  }

  return isValid;
};

// Check if the king of a given color is in check
const isKingInCheck = (color, board) => {
  let kingPosition = null;

  // Find the king's position
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];
      if (piece && piece.type === 'king' && piece.color === color) {
        kingPosition = { x, y };
        break;
      }
    }
  }

  if (!kingPosition) return false; // No king found (should not happen in a normal game)

  // Check if any opponent piece can move to the king's position
  const opponentColor = color === 'white' ? 'black' : 'white';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];
      if (piece && piece.color === opponentColor) {
        if (validateMove(x, y, kingPosition.x, kingPosition.y, piece, board)) {
          return true; // King is in check
        }
      }
    }
  }

  return false; // King is not in check
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
