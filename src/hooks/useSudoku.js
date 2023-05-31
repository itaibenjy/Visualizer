import { useState, useRef, useEffect } from "react";
import {sudokuSolver, generateSudokuBoard} from "../controllers/sudokuController"


export function useSudoku(initialBoard) {
  const [unsolve, setUnsolve] = useState(false);
  const [success, setSuccess] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [boardToSolve, setBoardToSolve] = useState(initialBoard); 
  const [isSolving, setIsSolving] = useState(false);
  const [speed, setSpeed] = useState(50); // 50 is default speed

  const speedRef = useRef(speed);
  const isSolvingRef = useRef(isSolving);

  useEffect(() => {
    speedRef.current = speed;
  } , [speed]);

  useEffect(() => {
    isSolvingRef.current = isSolving;
  }, [isSolving]); 

  async function animateSetBoard(row, col, value) {
    // if user stop the animation and fast forward don't change the state
    if (isSolvingRef.current === false) {
      return;
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

  async function solveSudoku(){
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
      setSuccess(true)
    } else {
      setUnsolve(true);
    }
  }


  function changeSpeed(event){
    setSpeed(event.target.value);
  }

  function generateNewSudokuBoard(){
    setUnsolve(false);
    setSuccess(false);
    setBoard(generateSudokuBoard());
  }

  function clearBoard(){
    setUnsolve(false);
    setSuccess(false);
    setBoard(initialBoard);
  }

  return { board, setBoard , solveSudoku, fastSolveSudoku, isSolving, speed, changeSpeed, generateNewSudokuBoard, clearBoard, unsolve, success};
}

