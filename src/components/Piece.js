import BB from '../assets/pieces/BB.png';
import BH from '../assets/pieces/BH.png';
import BK from '../assets/pieces/BK.png';
import BQ from '../assets/pieces/BQ.png';
import BR from '../assets/pieces/BR.png';
import BP from '../assets/pieces/BP.png';
import WB from '../assets/pieces/WB.png';
import WH from '../assets/pieces/WH.png';
import WK from '../assets/pieces/WK.png';
import WQ from '../assets/pieces/WQ.png';
import WR from '../assets/pieces/WR.png';
import WP from '../assets/pieces/WP.png';

const Piece = ({ type, color }) => {
  const pieceImages = {
    king: {
      white: WK,
      black: BK,
    },
    queen: {
      white: WQ,
      black: BQ,
    },
    rook: {
      white: WR,
      black: BR,
    },
    bishop: {
      white: WB,
      black: BB,
    },
    knight: {
      white: WH,
      black: BH,
    },
    pawn: {
      white: WP,
      black: BP,
    },
  };

  return (
    <img 
      src={pieceImages[type][color]} 
      alt={`${color} ${type}`} 
      className="w-12 h-12" 
    />
  );
};

export default Piece;
