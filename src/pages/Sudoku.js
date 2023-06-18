import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import SudokuBoard from "../components/Sudoku/SudokuBoard";
import Alert from "../components/Alert";
import { useState } from "react";

import { useSudoku } from '../hooks/useSudoku';
import SudokuInfo from "../data/info/Sudoku.md"
import InfoButton from "../components/InfoButton";

/**
 * Renders a Sudoku game page with a SudokuBoard component and various controls.
 * @returns {JSX.Element} The Sudoku game page.
 */

export default function Sudoku() {

  const initialBoard = Array.from({length: 9}, () => Array(9).fill(''));

  const {boardProps, actionProps} = useSudoku(initialBoard);

    return (<>
    <MDBContainer className="p-1 mb-5 pageContainer">
    <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>Sudoku</MDBTypography>
        <MDBContainer  className="d-flex justify-content-center my-3">
            <MDBBtn size="sm" color="secondary" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>User Input</MDBTypography>
            <MDBBtn size="sm" color="success" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Valid</MDBTypography>
            <MDBBtn size="sm" color="danger" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Invalid</MDBTypography>
        </MDBContainer>
        <SudokuBoard {...boardProps} />
        <MDBContainer  className="d-flex justify-content-center">
            {actionProps.success && <Alert message="Solved!" type="success" />}
            {actionProps.unsolve && <Alert message="Unsolvable!" type="danger" />}
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center">
            <MDBTypography variant='h6' className="mx-2">Solving Speed</MDBTypography>
            <MDBRange min='0' max='200' value={actionProps.speed} onChange={actionProps.changeSpeed} id='customRange' label=''/>
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center mt-2">
            <MDBTooltip title='Generate New Board' tag='span' placement="bottom">
                <MDBBtn floating color="danger" className="mx-1" disabled={actionProps.isSolving} onClick={actionProps.generateNewSudokuBoard}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
            </MDBTooltip>

            {!actionProps.isSolving ? 
            <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                <MDBBtn floating color="success" className="mx-1" disabled={actionProps.isSolving} onClick={actionProps.solveSudoku}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
            </MDBTooltip>
            :
            <MDBTooltip title='Fast Forward' tag='span' placement="bottom">
                <MDBBtn floating color="success" className="mx-1" disabled={!actionProps.isSolving} onClick={actionProps.fastSolveSudoku}><MDBIcon fas icon="fast-forward" /></MDBBtn>
            </MDBTooltip>
            }

            <MDBTooltip title='Clear Board' tag='span' placement="bottom">
                <MDBBtn floating color="danger" className="mx-1" disabled={actionProps.isSolving} onClick={actionProps.clearBoard}><MDBIcon fas size="lg" icon="trash-alt" /></MDBBtn>
            </MDBTooltip>
        </MDBContainer>
    </MDBContainer>
    <InfoButton markdownFiles={[SudokuInfo]} title="Sudoku Information" />
    </>);
}
