import BB from '../assets/pieces/Chess_bdt60.png';
import WB from '../assets/pieces/Chess_blt60.png';
import BK from '../assets/pieces/Chess_kdt60.png';
import WK from '../assets/pieces/Chess_klt60.png';
import BH from '../assets/pieces/Chess_ndt60.png';
import WH from '../assets/pieces/Chess_nlt60.png';
import BP from '../assets/pieces/Chess_pdt60.png';
import WP from '../assets/pieces/Chess_plt60.png';
import BQ from '../assets/pieces/Chess_qdt60.png';
import WQ from '../assets/pieces/Chess_qlt60.png';
import BR from '../assets/pieces/Chess_rdt60.png';
import WR from '../assets/pieces/Chess_rlt60.png';

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
