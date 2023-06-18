import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import TicTacToeBoard from "../components/TicTacToe/TicTacToeBoard";
import Alert from "../components/Alert";
import InfoButton from "../components/InfoButton";

import { useTicTacToe } from '../hooks/useTicTacToe';
import { useTyping } from "../hooks/useTyping";
import Minimax from "../data/info/Minimax.md"



/**
 * Renders the TicTacToe game page.
 * @returns {JSX.Element} The TicTacToe game page.
 */
export default function TicTacToe() {
    const {board, startGame, playerChose, isPlayerTurn, isGameOver, winner, aiSentence} = useTicTacToe();
    const props = {board, isPlayerTurn, playerChose};
    const text = useTyping(aiSentence);

    return (<>
    <MDBContainer className="p-1 mb-5 pageContainer">
    <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>TicTacToe</MDBTypography>
        <MDBContainer  className="d-flex justify-content-center">
            {aiSentence && <Alert message={text} type="info" />}
        </MDBContainer>
        <TicTacToeBoard  {...props}/>
        <MDBContainer  className="d-flex justify-content-center">
            {isGameOver && winner === 1 && <Alert message="You Won!" type="success" />}
            {isGameOver && winner === 2 && <Alert message="You Lost!" type="danger" />}
            {isGameOver && winner === 0 && <Alert message="Its a Draw!" type="primary" />}
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center mt-2">
            <MDBTooltip title='Start New Game' tag='span' placement="bottom">
                <MDBBtn floating color="success" className="mx-1" onClick={startGame}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
            </MDBTooltip>
        </MDBContainer>
        </MDBContainer>
        <InfoButton markdownFiles={[Minimax]} title="Minimax Algorithm (Tic Tac Toe)" />
    </>);
}
