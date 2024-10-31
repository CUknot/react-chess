 const validatePawnMove = (startX, startY, targetX, targetY, color, board) => {
    const direction = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;
  
    // Moving forward
    if (targetX === startX && targetY === startY + direction) {
      return !board[targetY][targetX]; // Move forward by one if empty
    }
    
    // Initial double move
    if (startY === startRow && targetX === startX && targetY === startY + 2 * direction) {
      return !board[targetY][targetX] && !board[startY + direction][startX];
    }
    
    // Diagonal capture
    if (Math.abs(targetX - startX) === 1 && targetY === startY + direction) {
      return board[targetY][targetX] && board[targetY][targetX].color !== color;
    }
    
    return false;
  };

  const validateRookMove = (startX, startY, targetX, targetY, color, board) => {
  if (startX !== targetX && startY !== targetY) return false; // Must be in a straight line

  const xDirection = targetX > startX ? 1 : targetX < startX ? -1 : 0;
  const yDirection = targetY > startY ? 1 : targetY < startY ? -1 : 0;

  let x = startX + xDirection;
  let y = startY + yDirection;

  // Check all squares between start and target for obstacles
  while (x !== targetX || y !== targetY) {
    if (board[y][x]) return false;
    x += xDirection;
    y += yDirection;
  }

  // Check target square for capture
  return !board[targetY][targetX] || board[targetY][targetX].color !== color;
};

const validateKnightMove = (startX, startY, targetX, targetY, color, board) => {
    const dx = Math.abs(startX - targetX);
    const dy = Math.abs(startY - targetY);
    
    // Check for "L" shape move
    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      return !board[targetY][targetX] || board[targetY][targetX].color !== color;
    }
    
    return false;
  };

  const validateBishopMove = (startX, startY, targetX, targetY, color, board) => {
    if (Math.abs(startX - targetX) !== Math.abs(startY - targetY)) return false; // Must be diagonal
  
    const xDirection = targetX > startX ? 1 : -1;
    const yDirection = targetY > startY ? 1 : -1;
    
    let x = startX + xDirection;
    let y = startY + yDirection;
  
    // Check all squares between start and target for obstacles
    while (x !== targetX || y !== targetY) {
      if (board[y][x]) return false;
      x += xDirection;
      y += yDirection;
    }
  
    return !board[targetY][targetX] || board[targetY][targetX].color !== color;
  };

  const validateKingMove = (startX, startY, targetX, targetY, color, board) => {
    const dx = Math.abs(startX - targetX);
    const dy = Math.abs(startY - targetY);
    
    // King moves one square in any direction
    if (dx <= 1 && dy <= 1) {
      return !board[targetY][targetX] || board[targetY][targetX].color !== color;
    }
    
    return false;
  };
    

const validateMove = (piece, start, target, board) => {
    const { type, color } = piece;
    const [startX, startY] = start;
    const [targetX, targetY] = target;
  
    switch (type) {
      case 'pawn':
        return validatePawnMove(startX, startY, targetX, targetY, color, board);
      case 'rook':
        return validateRookMove(startX, startY, targetX, targetY, color, board);
      case 'knight':
        return validateKnightMove(startX, startY, targetX, targetY, color, board);
      case 'bishop':
        return validateBishopMove(startX, startY, targetX, targetY, color, board);
      case 'queen':
        return validateQueenMove(startX, startY, targetX, targetY, color, board);
      case 'king':
        return validateKingMove(startX, startY, targetX, targetY, color, board);
      default:
        return false;
    }
  };

  
export default validateMove;