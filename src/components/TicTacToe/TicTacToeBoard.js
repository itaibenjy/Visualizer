import './TicTacToe.css';
import X from '../../assets/images/X.png';
import O from '../../assets/images/O.png';
import Ored from '../../assets/images/O-RED.png';

/**
 * Renders the Tic Tac Toe board with the given board state, player turn status, and player move handler.
 * @param {Object} props - The component props.
 * @param {number[][]} props.board - The current state of the Tic Tac Toe board.
 * @param {boolean} props.isPlayerTurn - Whether it is currently the player's turn.
 * @param {Function} props.playerChose - The function to call when the player makes a move.
 * @returns {JSX.Element} - The Tic Tac Toe board component.
 */
const TicTacToeBoard = ({board, isPlayerTurn, playerChose}) => {

  function handleClick(row, col) {
    if (!isPlayerTurn) return;
    playerChose(row, col)
  }

  return (
    <table className="tictactoe">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr className="tictactoe" key={rowIndex}>
            {row.map((cell, colIndex) => (
                <td className="tictactoe" onClick={() => handleClick(rowIndex, colIndex)} key={colIndex} >
                {board[rowIndex][colIndex] === 1 && <img src={X} alt="X" className="tictactoe" />}
                {board[rowIndex][colIndex] === 2 && <img src={O} alt="O" className="tictactoe" />}
                {board[rowIndex][colIndex] === 3 && <img src={Ored} alt="O Red" className="tictactoe" />}
                </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicTacToeBoard;
