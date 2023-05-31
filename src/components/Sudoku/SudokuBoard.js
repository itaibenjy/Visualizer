import './Sudoku.css';
import SudokuCell from './SudokuCell';

const SudokuBoard = ({board, setBoard, isSolving}) => {


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
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <SudokuCell 
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