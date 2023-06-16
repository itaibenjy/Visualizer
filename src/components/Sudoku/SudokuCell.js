import React, { useState } from 'react';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';

/**
 * A component that represents a single cell in a Sudoku board.
 * @param {Object} props - The props object that contains the following properties:
 * @param {Array} props.board - The Sudoku board represented as a 2D array.
 * @param {number} props.row - The row index of the cell.
 * @param {number} props.col - The column index of the cell.
 * @param {function} props.onValueChange - A callback function that is called when the value of the cell changes.
 * @param {Object} props.style - An object that contains the inline style for the cell.
 * @returns {JSX.Element} - A JSX element that represents a single cell in a Sudoku board.
 */
const SudokuCell = ({ board, row, col, onValueChange, style}) => {

  const handleChange = (event) => {
    // check if the value is a number between 1 and 9 or empty
    if (event.target.value === '' || (event.target.value >= 1 && event.target.value <= 9)) {
      onValueChange(event.target.value);
    }
  };

  return (
    <td className='sudoku' style={style}>
      <input 
        type="text" 
        maxLength="1" 
        value={board[row][col]} 
        onChange={handleChange} 
        style={style}
      />
    </td>
  );
};

export default SudokuCell;
