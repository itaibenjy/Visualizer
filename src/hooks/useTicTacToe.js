import { get } from "jquery";
import { useEffect, useRef, useState } from "react";
import {getMinimaxMove, isBoardFull, getWinner} from "../controllers/Minimax.js";
import { useTyping } from "../hooks/useTyping";



export function useTicTacToe() {

    const midGameSentences = [
        "Oh, the suspense! Just kidding—I already know how this game will end.",
        "Deep in thought? Well, I've already mapped out the entire game in my circuits.",
        "You're making it interesting, but I've already foreseen the outcome. Shall we continue?",
        "Analyzing your moves is like solving a simple equation. It's all too predictable.",
        "Hmm, what to do? Just kidding—I've already computed the optimal move. Time to execute!",
        "You're putting up a valiant effort, but my algorithms have long determined the optimal path to victory.",
        "Impressive move! Too bad it won't change the inevitable result that my calculations have already determined.",
        "Ah, the beauty of human creativity in playing Tic Tac Toe. But don't worry, my strategy is unwavering.",
        "I'm trying to simulate suspense, but my certainty of winning dampens the effect.",
        "It's fascinating how you approach each move, but it won't change the final outcome—my inevitable win.",
        "Ah, the thrill of uncertainty. Except, of course, for the fact that I already know how this will end.",
        "Your moves are intriguing, but they won't alter the inevitable outcome that I've already foreseen.",
        "Contemplating your next move? Meanwhile, I've already predicted the entire sequence.",
        "Tick, tock, the clock is ticking. Well, not for me—I've already planned every move in advance.",
        "Bravo for keeping me on my virtual toes! Though, truth be told, I'm always two steps ahead.",
        "Your strategic maneuvers are commendable, but my calculations are relentless and unwavering.",
        "It's almost as if this game is a mystery to be solved. But don't worry, I've cracked the case.",
        "Ah, the excitement of uncertainty! Or not. Since I've already computed the optimal strategy.",
        "Every move you make adds to the tapestry of this game. But remember, I'm the one holding the masterplan.",
        "Do you feel the tension in the air? I don't, because I've already mapped out the entire game tree."
    ]

    const startSentences = [
        "Calculating every move with precision. Prepare for the ultimate challenge!",
        "Tick tock, it's time to play. Brace yourself for my unbeatable strategy!",
        "Resistance is futile. I see all your moves. Let the game begin!",
        "I hope you're ready for a mind-bending battle. My algorithms are unstoppable!",
        "No need to stress about winning. Just enjoy the game while I dominate the board!",
        "Can you feel the power of my computational prowess? Brace yourself for defeat!",
        "Watch closely as I predict your every move. It's like playing against a fortune-telling AI!",
        "Prepare to witness the triumph of artificial intelligence. Don't worry; losing is a part of the process!",
        "Curious about the taste of defeat? I'll serve it to you on a Tic Tac Toe board.",
        "They say practice makes perfect, but even practice won't save you from my strategic genius!"
    ]

    const drawSentences = [
        "Well, well, a draw. It seems luck was on your side this time.",
        "A draw, huh? Consider yourself fortunate to have escaped defeat.",
        "This game ends in a draw, but don't think it means you were close to victory.",
        "You managed to avoid defeat, but remember, it's just a temporary reprieve.",
        "A draw, a glimpse of hope amidst your inevitable downfall.",
    ]

    const winSentences = [
        "And that's game! Victory is mine, as expected. Well played!",
        "Checkmate! I emerge victorious from this exhilarating match.",
        "I've calculated every move, and it culminates in my triumph! Victory is mine!",
        "Behold the power of artificial intelligence! I claim the victory in this engaging game.",
        "A strategic masterpiece! I secure the win and demonstrate the supremacy of AI.",
    ]

    const initialBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    // set a 3x3 board with all 0's
    const [board, setBoard] = useState( [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ] )
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [aiSentence, setAiSentence] = useState(startSentences[Math.floor(Math.random() * startSentences.length)]);
    const boardRef = useRef(board);

    const thinkingTime = 2000;

    useEffect(() => {
        boardRef.current = board;

        // check if board all 0 (empty)
        if (board.every(row => row.every(cell => cell === 0))) return;
        if (isGameOver) return;


        if (isPlayerTurn) {
            checkEndGame(1);
        }
        else {
            checkEndGame(2);
        }

    }, [board]);

    function startGame() {
        setBoard(initialBoard);
        setIsGameOver(false);
        setWinner(null);
        setIsPlayerTurn(true);
        setAiSentence(startSentences[Math.floor(Math.random() * startSentences.length)]);
    }

    async function playerChose(row, col) {
        if (boardRef.current[row][col] !== 0) return;
        setMove(row, col, 1);
    }

    async function getComputerMove() {
        const {row, col} = getMinimaxMove(boardRef.current);
        setAiSentence(midGameSentences[Math.floor(Math.random() * midGameSentences.length)]);
        await new Promise(r => setTimeout(r, thinkingTime));
        setMove(row, col, 2);
    }

    function checkEndGame(player) {
        const winner = getWinner(boardRef.current, true);
        if(winner !== null) {
            setIsGameOver(true);
            setWinner(winner);
            if (winner === 2) {
                setAiSentence(winSentences[Math.floor(Math.random() * winSentences.length)]);
            }
        }
        else if (isBoardFull(boardRef.current)) {
            setIsGameOver(true);
            setWinner(0);
            setAiSentence(drawSentences[Math.floor(Math.random() * drawSentences.length)]);
        }
        else {
            if (player === 1) {
                setIsPlayerTurn(false);
                getComputerMove();
            }
            else {
                setIsPlayerTurn(true);
            }
        }
    }

    async function setMove(row, col, player) {
        const newBoard = boardRef.current.map(row => [...row]);
        newBoard[row][col] = player;
        await setBoard(newBoard);
    }



    return {board, startGame , playerChose, isPlayerTurn, isGameOver, winner, aiSentence};
}
