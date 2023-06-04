import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import SudokuBoard from "../components/Sudoku/SudokuBoard";
import Alert from "../components/Alert";

import { useSudoku } from '../hooks/useSudoku';


export default function Sudoku() {

  const initialBoard = Array.from({length: 9}, () => Array(9).fill(''));

  const {board, setBoard, isSolving, solveSudoku, fastSolveSudoku, speed, changeSpeed , generateNewSudokuBoard,  clearBoard, success, unsolve, boardStyle} = useSudoku(initialBoard);
  const props = {board, setBoard, isSolving};

    return (<MDBContainer className="p-1 mb-5">
    <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>Sudoku</MDBTypography>
        <MDBContainer  className="d-flex justify-content-center my-3">
            <MDBBtn size="sm" color="secondary" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>User Input</MDBTypography>
            <MDBBtn size="sm" color="success" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Valid</MDBTypography>
            <MDBBtn size="sm" color="danger" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Invalid</MDBTypography>
        </MDBContainer>
        <SudokuBoard {...props} boardStyle={boardStyle} />
        <MDBContainer  className="d-flex justify-content-center">
            {success && <Alert message="Solved!" type="success" />}
            {unsolve && <Alert message="Unsolvable!" type="danger" />}
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center">
            <MDBTypography variant='h6' className="mx-2">Solving Speed</MDBTypography>
            <MDBRange min='0' max='200' value={speed} onChange={changeSpeed} id='customRange' label=''/>
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center mt-2">
            <MDBTooltip title='Generate New Board' tag='span' placement="bottom">
                <MDBBtn floating color="danger" className="mx-1" disabled={isSolving} onClick={generateNewSudokuBoard}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
            </MDBTooltip>

            {!isSolving ? 
            <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                <MDBBtn floating color="success" className="mx-1" disabled={isSolving} onClick={solveSudoku}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
            </MDBTooltip>
            :
            <MDBTooltip title='Fast Forward' tag='span' placement="bottom">
                <MDBBtn floating color="success" className="mx-1" disabled={!isSolving} onClick={fastSolveSudoku}><MDBIcon fas icon="fast-forward" /></MDBBtn>
            </MDBTooltip>
            }

            <MDBTooltip title='Clear Board' tag='span' placement="bottom">
                <MDBBtn floating color="danger" className="mx-1" disabled={isSolving} onClick={clearBoard}><MDBIcon fas size="lg" icon="trash-alt" /></MDBBtn>
            </MDBTooltip>
        </MDBContainer>
        </MDBContainer>
    );
}
