
export async function sudokuSolver(board, animateSetBoard , isSolvingRef){
    // Initialize rows, columns, and boxes.
    const rows = new Array(9).fill(null).map(() => new Set());
    const cols = new Array(9).fill(null).map(() => new Set());
    const boxes = new Array(9).fill(null).map(() => new Set());

    // Fill in initial numbers.
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
        let num = board[r][c];
        if (num === "") continue; // Skip empty cells.

        // Calculate box index.
        const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        
        num =  parseInt(num);
        // Add to appropriate sets.
        if (rows[r].has(num) || cols[c].has(num) || boxes[b].has(num)) {
            return false;
        }
        rows[r].add(num);
        cols[c].add(num);
        boxes[b].add(num);
        }
    }

    // Recursive backtracking function.
    async function sovler () {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col ++) {
                if (board[row][col] === "") {
                    for (let num = 1; num < 10; num++) {
                        // this is only fo animation purposes usually it would be in the if statement
                        await animateSetBoard(row, col, num.toString());
                        if (!rows[row].has(num) && !cols[col].has(num) && !boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].has(num)) {
                            rows[row].add(num);
                            cols[col].add(num);
                            boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].add(num);
                            if (await sovler()) {
                                return true;
                            } else {
                                if (isSolvingRef.current === false) return false;
                                await animateSetBoard(row, col, "");
                                rows[row].delete(num);
                                cols[col].delete(num);
                                boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].delete(num);
                            }
                        }
                        else{
                            await animateSetBoard(row, col, "");
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    return await sovler();
}


export function generateSudokuBoard() {

    // Initialize rows, columns, and boxes.
    const rows = new Array(9).fill(null).map(() => new Set());
    const cols = new Array(9).fill(null).map(() => new Set());
    const boxes = new Array(9).fill(null).map(() => new Set());
   
    function rand() {
        return Math.floor(Math.random() * 9) + 1;
    }

    let board = Array.from({length: 9}, () => Array(9).fill(''));

    // generate 30 random numbers in random positions and make sure they are valid
    for (let i = 0; i < 30; i++) {

        do {
            var row = rand() - 1;
            var col = rand() - 1;
            var num = rand().toString();
        } while (rows[row].has(num) || cols[col].has(num) || boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].has(num));

        console.log(num, typeof(num))
        board[row][col] = num;
        rows[row].add(num);
        cols[col].add(num);
        boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].add(num);

    }

    return board;
}
