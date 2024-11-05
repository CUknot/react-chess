const validateMove = (startX, startY, targetX, targetY, piece, board, lastMove, turn) => {
  if (!piece) return { isValid: false , enPassantCapture: false};
  if (piece.color !== turn) return { isValid: false , enPassantCapture: false};

  // Calculate the movement delta
  const deltaX = targetX - startX;
  const deltaY = targetY - startY;

  const targetPiece = board[targetY][targetX];
  if (targetPiece && targetPiece.color === piece.color) return { isValid: false , enPassantCapture: false};

  let isValid = false;
  let enPassantCapture = false;
  switch (piece.type) {
    case 'pawn': {
      const direction = piece.color === 'white' ? -1 : 1;
      
      // Move forward by 1
      if (startX === targetX && startY + direction === targetY && !targetPiece) {
        isValid = true;
      }
      
      // Starting two-square move
      if (startX === targetX && startY + 2 * direction === targetY && !targetPiece &&
        !board[startY + direction][targetX] && (startY === 1 || startY === 6)) {
        isValid = true;
      }

      // Capture diagonally
      if (Math.abs(deltaX) === 1 && deltaY === direction && targetPiece && targetPiece.color !== piece.color) {
        isValid = true;
      }

      // En passant capture
      if (Math.abs(deltaX) === 1 && deltaY === direction && !targetPiece) {
        if (lastMove && lastMove.piece.type === 'pawn' && lastMove.piece.color !== piece.color) {
          const lastMoveDeltaY = lastMove.targetY - lastMove.startY;

          // Check if the last move was a two-square pawn advance to a position next to this pawn
          if (Math.abs(lastMoveDeltaY) === 2 && lastMove.targetX === targetX && lastMove.targetY === startY) {
            isValid = true;
            enPassantCapture = true;
          }
        }
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
      return { isValid: false ,enPassantCapture: false};
  }

  if (isValid) {
   const newBoard = board.map(row => row.slice());

   newBoard[targetY][targetX] = newBoard[startY][startX];
   newBoard[startY][startX] = null; 

   if (enPassantCapture) {
     newBoard[startY][targetX] = null; 
   }

    if (isKingInCheck(piece.color, newBoard, lastMove)) {
      return { isValid: false , enPassantCapture: false}; // Move is invalid if it leaves the king in check
    }
  }

  return { isValid, enPassantCapture };
};

const isKingInCheck = (color, board, lastMove) => {
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

  if (!kingPosition) return false ; 

  // Check if any opponent piece can move to the king's position
  const opponentColor = color === 'white' ? 'black' : 'white';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];
      if (piece && piece.color === opponentColor) {
        if (validateMove(x, y, kingPosition.x, kingPosition.y, piece, board, lastMove, opponentColor).isValid) {
          return true ; 
        }
      }
    }
  }

  return false ; 
};

// Helper function to check if the path is clear (for rook, bishop, and queen)
const isPathClear = (startX, startY, targetX, targetY, board) => {
  const stepX = Math.sign(targetX - startX);
  const stepY = Math.sign(targetY - startY);

  let x = startX + stepX;
  let y = startY + stepY;

  while (x !== targetX || y !== targetY) {
    if (board[y][x]) return false ; // Path is blocked by another piece
    x += stepX;
    y += stepY;
  }

  return true ;
};


export default validateMove;
