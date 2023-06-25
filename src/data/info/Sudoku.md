### Approach:

Our approach involves the implementation of sets for each row, column, and box that contain previously used numbers. This enables us to accurately determine which numerical values can be assigned to specific locations on the board.

By utilizing advanced constraint satisfaction problem (CSP) algorithms, which incorporate recursive and backtracking techniques, we can assign each location with a possible answer. In the event that the board becomes unsolvable, we have the ability to backtrack and assign alternative answers until the puzzle is solved or no further options are available, rendering the board unsolvable.

### Preprocess of the board to get the current sets.

```javascript
// Initialize rows, columns, and boxes.
const rows = new Array(9).fill(null).map(() => new Set());
const cols = new Array(9).fill(null).map(() => new Set());
const boxes = new Array(9).fill(null).map(() => new Set());

// Fill in initial numbers.
for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
    const num = board[r][c];
    if (num === "") continue; // Skip empty cells.

    // Calculate box index.
    const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);

    // Add to appropriate sets.
    rows[r].add(num);
    cols[c].add(num);
    boxes[b].add(num);
    }
}
```

### Solver function (Recursive with backtracking)

```javascript
function sovler () {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col ++) {
            if (board[row][col] === "") {
                for (let num = 1; num < 10; num++) {
                    if (!rows[row].has(num) && !cols[col].has(num) && !boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].has(num)) {
                        board[row][col] = num;
                        rows[row].add(num);
                        cols[col].add(num);
                        boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].add(num);
                        if (sovler()) {
                            return true;
                        } else {
                            board[row][col] = "";
                            rows[row].delete(num);
                            cols[col].delete(num);
                            boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].delete(num);
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
```

**At the final version on the app every set of board should be in an animated function to visualize the solving process.**