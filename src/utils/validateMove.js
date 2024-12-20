const validateMove = (startX, startY, targetX, targetY, piece, board, lastMove, turn) => {
  if (!piece || piece.color !== turn) return { isValid: false, enPassantCapture: false };

  const deltaX = targetX - startX;
  const deltaY = targetY - startY;
  const targetPiece = board[targetY]?.[targetX];
  if (targetPiece?.color === piece.color) return { isValid: false, enPassantCapture: false };

  let isValid = false;
  let enPassantCapture = false;
  const direction = piece.color === 'white' ? -1 : 1;

  switch (piece.type) {
    case 'pawn':
      if (startX === targetX && deltaY === direction && !targetPiece) isValid = true;
      if (startX === targetX && deltaY === 2 * direction && !targetPiece && !board[startY + direction]?.[startX] && (startY === 1 || startY === 6)) isValid = true;
      if (Math.abs(deltaX) === 1 && deltaY === direction && (targetPiece || (lastMove?.piece.type === 'pawn' && lastMove.piece.color !== piece.color && lastMove.targetX === targetX && lastMove.targetY === startY && Math.abs(lastMove.targetY - lastMove.startY) === 2))) {
        isValid = true;
        enPassantCapture = !targetPiece;
      }
      break;

    case 'rook':
      isValid = deltaX === 0 || deltaY === 0 ? isPathClear(startX, startY, targetX, targetY, board) : false;
      break;

    case 'knight':
      isValid = (Math.abs(deltaX) === 2 && Math.abs(deltaY) === 1) || (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 2);
      break;

    case 'bishop':
      isValid = Math.abs(deltaX) === Math.abs(deltaY) ? isPathClear(startX, startY, targetX, targetY, board) : false;
      break;

    case 'queen':
      isValid = deltaX === 0 || deltaY === 0 || Math.abs(deltaX) === Math.abs(deltaY) ? isPathClear(startX, startY, targetX, targetY, board) : false;
      break;

    case 'king':
      isValid = Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1;
      break;

    default:
      return { isValid: false, enPassantCapture: false };
  }

  if (isValid) {
    const newBoard = board.map(row => row.slice());
    newBoard[targetY][targetX] = piece;
    newBoard[startY][startX] = null;
    if (enPassantCapture) newBoard[startY][targetX] = null;

    if (isKingInCheck(piece.color, newBoard)) return { isValid: false, enPassantCapture: false };
  }

  return { isValid, enPassantCapture };
};

const isKingInCheck = (color, board) => {
  const kingPos = findKingPos(color, board);
  if (!kingPos) return false;

  const opponentColor = color === 'white' ? 'black' : 'white';
  return board.some((row, y) => row.some((piece, x) => piece?.color === opponentColor && validateMove(x, y, kingPos.x, kingPos.y, piece, board, null, opponentColor).isValid));
};

const isCheckmate = (color, board, lastMove) => {
  if (!isKingInCheck(color, board)) return false;

  return !board.some((row, y) => row.some((piece, x) => piece?.color === color && board.some((_, targetY) => board[targetY].some((_, targetX) => {
    if (targetX === x && targetY === y) return false;
    return validateMove(x, y, targetX, targetY, piece, board, lastMove, color).isValid;
  }))));
};

const findKingPos = (color, board) => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x]?.type === 'king' && board[y][x].color === color) return { x, y };
    }
  }
  return null;
};

const isPathClear = (startX, startY, targetX, targetY, board) => {
  const stepX = Math.sign(targetX - startX);
  const stepY = Math.sign(targetY - startY);

  for (let x = startX + stepX, y = startY + stepY; x !== targetX || y !== targetY; x += stepX, y += stepY) {
    if (board[y]?.[x]) return false;
  }

  return true;
};

export default validateMove;
export { isCheckmate, isKingInCheck };
