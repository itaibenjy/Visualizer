/**
 * Performs a depth-first search algorithm on a grid to find a path from a start node to an end node.
 * @param {React.RefObject} gridRef - A reference to the grid component.
 * @param {Object} start - The starting node.
 * @param {Object} end - The ending node.
 * @param {Function} wait - A function that returns a promise that resolves after a certain amount of time.
 * @returns {Object} An object containing the path and a boolean indicating whether the path was found.
 */
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

/**
 * Returns an array of neighboring nodes that are not walls and have not been visited.
 * @param {Array} grid - The grid of nodes.
 * @param {Object} node - The node to get neighbors for.
 * @returns {Array} An array of neighboring nodes.
 */
function getNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;
    // get all neighbors first left, then up, then right, then down
    // so the final dfs will go left first then up then right then down if possible 
    // if all the board is empty it will make a snake like path
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter(neighbor => !neighbor.isWall && !neighbor.isVisited);
}

/**
 * Returns an array of nodes representing the path from the end node to the start node.
 * @param {Object} end - The end node.
 * @returns {Array} An array of nodes representing the path.
 */
function getPath(end) {
    const path = [];
    let currentNode = end;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
}