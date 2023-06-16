import './Sudoku.css';
import SudokuCell from './SudokuCell';

/**
 * A component that renders a Sudoku board.
 * @param {Array<Array<number>>} board - The Sudoku board represented as a 2D array of numbers.
 * @param {function} setBoard - A function to update the Sudoku board.
 * @param {boolean} isSolving - A boolean indicating whether the board is currently being solved.
 * @param {Array<Array<string>>} boardStyle - A 2D array of strings representing the style of each cell on the board.
 * @returns {JSX.Element} - A table element representing the Sudoku board.
 */
const SudokuBoard = ({board, setBoard, isSolving, boardStyle}) => {

  /**
   * A function that handles changes to a cell's value.
   * @param {number} row - The row index of the cell being changed.
   * @param {number} col - The column index of the cell being changed.
   * @param {number} value - The new value of the cell.
   */
  const handleValueChange = (row, col, value) => {
    // make sure the user can't change the value while the board is being solved
    if (isSolving) return;

    // create a copy of the board and update the value of the cell
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  return (
    <table className="sudoku">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr className="sudoku" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <SudokuCell 
                style={boardStyle[rowIndex][colIndex]}
                key={colIndex}
                board={board} 
                row={rowIndex}
                col={colIndex}
                onValueChange={value => handleValueChange(rowIndex, colIndex, value)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SudokuBoard;
