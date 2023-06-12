
export default async function DFS(gridRef, start, end, wait) {
    const grid = gridRef.current;
    const stack = [];
    const startNode = start;
    stack.push(startNode);
    startNode.isVisited = true;
    let found = false;

    while (stack.length > 0) {
        const currentNode = stack.pop();
        currentNode.isCurrent = true;
        await wait();
        if (currentNode === end) {
            found = true;
            break;
        };
        const neighbors = getNeighbors(grid, currentNode);
        const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        for (let neighbor of unvisitedNeighbors) {
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
        currentNode.isCurrent = false;
        currentNode.isVisited = true;
        await wait();
    }
    const path = found ? getPath(end) : [];
    return {path, found};
}

function getNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter(neighbor => !neighbor.isWall && !neighbor.isVisited);
}

function getPath(end) {
    const path = [];
    let currentNode = end;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
}