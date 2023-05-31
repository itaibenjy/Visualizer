import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import SudokuBoard from "../components/Sudoku/SudokuBoard";
import Alert from "../components/Alert";

import { useSudoku } from '../hooks/useSudoku';


export default function Sudoku() {

  const initialBoard = Array.from({length: 9}, () => Array(9).fill(''));

  const {board, setBoard, isSolving, solveSudoku, fastSolveSudoku, speed, changeSpeed , generateNewSudokuBoard,  clearBoard, success, unsolve} = useSudoku(initialBoard);
  const props = {board, setBoard, isSolving};

    return (<>
    <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>Sudoku</MDBTypography>
        <SudokuBoard {...props} />
        <MDBContainer  className="d-flex justify-content-center">
            {success && <Alert message="Solved!" type="success" />}
            {unsolve && <Alert message="Unsolvable!" type="danger" />}
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center">
            <MDBTooltip title='Speed Control' tag='span' placement="right">
                <MDBRange min='0' max='200' value={speed} onChange={changeSpeed} id='customRange' label=''/>
            </MDBTooltip>
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center mt-2">
            <MDBTooltip title='Generate New Board' tag='span' placement="bottom">
                <MDBBtn floating color="danger" disabled={isSolving} onClick={generateNewSudokuBoard}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
            </MDBTooltip>

            {!isSolving ? 
            <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                <MDBBtn floating color="success" disabled={isSolving} onClick={solveSudoku}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
            </MDBTooltip>
            :
            <MDBTooltip title='Fast Forward' tag='span' placement="bottom">
                <MDBBtn floating color="success" disabled={!isSolving} onClick={fastSolveSudoku}><MDBIcon fas icon="fast-forward" /></MDBBtn>
            </MDBTooltip>
            }

            <MDBTooltip title='Clear Board' tag='span' placement="bottom">
                <MDBBtn floating color="danger" disabled={isSolving} onClick={clearBoard}><MDBIcon fas size="lg" icon="trash-alt" /></MDBBtn>
            </MDBTooltip>
        </MDBContainer>
        </>
    );
}
