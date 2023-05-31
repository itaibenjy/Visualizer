import React, { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

const SudokuCell = ({ board, row, col, onValueChange }) => {

  const handleChange = (event) => {
    // check if the value is a number between 1 and 9 or empty
    if (event.target.value === '' || (event.target.value >= 1 && event.target.value <= 9)) {
      onValueChange(event.target.value);
    }
  };

  return (
    <td>
      <input 
        type="text" 
        maxLength="1" 
        value={board[row][col]} 
        onChange={handleChange} 
        style={{ width: '40px', height: '40px', textAlign: 'center', border: 'none' }} 
      />
    </td>
  );
};

export default SudokuCell;
