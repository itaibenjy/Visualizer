
/**
 * Returns the best move for the AI player using the minimax algorithm.
 * @param {number[][]} board - The current state of the game board.
 * @returns {{row: number, col: number}} - The row and column of the best move.
 */
export function getMinimaxMove(board) {
    let boardCopy = board.map(row => [...row]);
    let bestScore = -Infinity;
    let bestMove = {row: null, col: null};

    for (let row = 0; row < boardCopy.length; row++) {
        for (let col = 0; col < boardCopy[0].length; col++) {
            if (boardCopy[row][col] === 0) {
                boardCopy[row][col] = 2;
                let score = minimax(boardCopy, 1, false);
                boardCopy[row][col] = 0;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = {row, col};
                }
            }
        }
    }

    return bestMove;
}

/**
 * Returns the score of the current board state for the given player using the minimax algorithm.
 * @param {number[][]} board - The current state of the game board.
 * @param {number} player - The player for whom to calculate the score.
 * @param {boolean} isMaximizing - Whether the current player is maximizing or minimizing.
 * @returns {number} - The score of the current board state for the given player.
 */
function minimax(board, player, isMaximizing) {
    const winner = getWinner(board);
    if (winner === 1) return -1;
    if (winner === 2) return 1;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                if (board[row][col] === 0) {
                    board[row][col] = 2;
                    let score = minimax(board, 1, false);
                    board[row][col] = 0;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                if (board[row][col] === 0) {
                    board[row][col] = 1;
                    let score = minimax(board, 2, true);
                    board[row][col] = 0;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

/**
 * Returns whether the game board is full.
 * @param {number[][]} board - The current state of the game board.
 * @returns {boolean} - Whether the game board is full.
 */
export function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== 0));
}

/**
 * Returns the winner of the game, if any.
 * @param {number[][]} board - The current state of the game board.
 * @returns {number} - The winner of the game, if any.
 */
export function getWinner(board, dye=false) {
    const lines = [
        // horizontal
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        // vertical
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        // diagonal
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]],
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a[0]][a[1]] !== 0 && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            let player = board[a[0]][a[1]];
            if (dye){
                board[a[0]][a[1]] = 3;
                board[b[0]][b[1]] = 3;
                board[c[0]][c[1]] = 3;
            }
            return player;
        }
    }
    return null;
}