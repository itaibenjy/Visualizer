import { useState, useRef, useEffect } from "react";
import {sudokuSolver, generateSudokuBoard} from "../controllers/sudokuController"

/**
 * Custom hook that provides state and functions for solving a Sudoku board.
 * @param {Array<Array<string>>} initialBoard - The initial Sudoku board to solve.
 * @returns {Object} An object containing two properties: boardProps and actionProps.
 * boardProps contains the current state of the Sudoku board and its style.
 * actionProps contains functions to solve the Sudoku board, change the solving speed, generate a new Sudoku board, and clear the current board.
 */
export function useSudoku(initialBoard) {
  /**
   * State variables for the Sudoku board and its style, as well as the board to solve, solving status, and solving speed.
   */
  const [unsolve, setUnsolve] = useState(false);
  const [success, setSuccess] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [boardStyle, setBoardStyle] = useState(board.map(row => {return row.map(col => {return {color: "black", backgroundColor: "white" , fontWeight: "normal"}})}));
  const [boardToSolve, setBoardToSolve] = useState(initialBoard); 
  const [isSolving, setIsSolving] = useState(false);
  const [speed, setSpeed] = useState(50); // 50 is default speed

  /**
   * Ref variables for the solving speed, solving status, and board style.
   */
  const speedRef = useRef(speed);
  const isSolvingRef = useRef(isSolving);
  const boardStyleRef = useRef(boardStyle);

  /**
   * Effect hook to update the board style ref variable when the board style state variable changes.
   */
  useEffect(() => {
    boardStyleRef.current = boardStyle;
  }, [boardStyle]);

  /**
   * Effect hook to update the solving speed ref variable when the solving speed state variable changes.
   */
  useEffect(() => {
    speedRef.current = speed;
  } , [speed]);

  /**
   * Effect hook to update the solving status ref variable when the solving status state variable changes.
   */
  useEffect(() => {
    isSolvingRef.current = isSolving;
  }, [isSolving]); 

  /**
   * Function to animate setting the Sudoku board state and style.
   * @param {number} row - The row index of the cell being set.
   * @param {number} col - The column index of the cell being set.
   * @param {string} value - The value being set in the cell.
   * @param {boolean} isCorrect - Whether the value being set is correct or not.
   */
  async function animateSetBoard(row, col, value, isCorrect) {
    // if user stop the animation and fast forward don't change the state
    if (isSolvingRef.current === false) {
      return;
    }

    if (value !== "" ){
      const newBoardStyle = [...boardStyleRef.current];
      newBoardStyle[row][col] = isCorrect ? {color: "var(--mdb-success)", backgroundColor: "white", fontWeight: "normal"} : {color: "var(--mdb-danger)", backgroundColor: "white", fontWeight: "normal"};
    }

    setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = value;
        return newBoard;
    });

    // setting delay for user to see
    if (value !== "" && speedRef.current !== 200){
      await new Promise(resolve => setTimeout(resolve, 200 - speedRef.current));
    }

  };

  /**
   * Function to solve the Sudoku board.
   */
  async function solveSudoku(){
    // set style of inputed board
    setBoardStyle(board.map(row => {return row.map(col => {return col !== "" ? {color: "black", backgroundColor: "#eee", fontWeight: "500"} : {color: "black", backgroundColor: "white", fontWeight: "normal"}})}));

    await setIsSolving(true);
    setBoardToSolve(board.map(row => [...row]));
    setUnsolve(false);
    setSuccess(false);
    const result = await sudokuSolver(board, animateSetBoard, isSolvingRef);

    // check if user stop the animation and fast forward
    if (isSolvingRef.current === false) {
      return;
    }

    // check if the sudoku is solved
    if (result === true) {
      setSuccess(true)
    } else {
      setUnsolve(true);
    }
    setIsSolving(false);
  }

  /**
   * Function to fast forward the Sudoku board solution animation and solve it instantly.
   */
  async function fastSolveSudoku(){
    // fast forward the animation and solve it instantly

    setUnsolve(false);
    setSuccess(false);
    let newBoard = [...boardToSolve];
    const result = await sudokuSolver(newBoard, (row, col, value) => {newBoard[row][col] = value}, isSolvingRef);

    // stop the animation 
    setIsSolving(false);

    // check if the sudoku is solved and set the board as the solved state
    setBoard(newBoard);
    if (result === true) {
      setSuccess(true);
      setBoardStyle(prevBoardStyle => {
        let newBoardStyle = [...prevBoardStyle];
        for (let i = 0; i < newBoardStyle.length; i++) {
          for (let j = 0; j < newBoardStyle[i].length; j++) {
            if (newBoardStyle[i][j].backgroundColor === "white") {
              newBoardStyle[i][j] = {color: "var(--mdb-success)", backgroundColor: "white", fontWeight: "normal"};
            }
          }
        }
        return newBoardStyle;
      });
    } else {
      setUnsolve(true);
    }
  }

  /**
   * Function to change the solving speed of the Sudoku board.
   * @param {Object} event - The event object containing the new speed value.
   */
  function changeSpeed(event){
    setSpeed(event.target.value);
  }

  /**
   * Function to generate a new Sudoku board.
   */
  function generateNewSudokuBoard(){
    setBoardStyle(board.map(row => {return row.map(col => {return  {color: "black", backgroundColor: "white", fontWeight: "normal"}})}));
    setUnsolve(false);
    setSuccess(false);
    setBoard(generateSudokuBoard());
  }

  /**
   * Function to clear the current Sudoku board.
   */
  function clearBoard(){
    setBoardStyle(board.map(row => {return row.map(col => {return  {color: "black", backgroundColor: "white", fontWeight: "normal"}})}));
    setUnsolve(false);
    setSuccess(false);
    setBoard(initialBoard);
  }

  /**
   * Object containing the current state of the Sudoku board and its style.
   */
  const boardProps = {board, setBoard, isSolving, boardStyle};

  /**
   * Object containing functions to solve the Sudoku board, change the solving speed, generate a new Sudoku board, and clear the current board.
   */
  const actionProps = {solveSudoku, fastSolveSudoku, isSolving, speed, changeSpeed, generateNewSudokuBoard, clearBoard, unsolve, success};

  return {boardProps, actionProps}
}

