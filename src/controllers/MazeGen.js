/**
 * Returns an array of wall nodes that are neighbors of the given node.
 * @param {Array<Array<Node>>} grid - The grid of nodes.
 * @param {Node} node - The node to get the wall neighbors of.
 * @returns {Array<Node>} - An array of wall nodes that are neighbors of the given node.
 */
function getWallNeighbors(grid, node) {
    // the neighbors of a wall node are the nodes that are 2 nodes away from it 
    // because the maze is 2 times smaller than the grid due to the walls being full blocks 
    const neighbors = [];
    const { row, col } = node;
    if (row > 1) neighbors.push(grid[row - 2][col]);
    if (col < grid[0].length - 2) neighbors.push(grid[row][col + 2]);
    if (row < grid.length - 2) neighbors.push(grid[row + 2][col]);
    if (col > 1) neighbors.push(grid[row][col - 2]);
    return neighbors.filter(neighbor => neighbor.isWall);
}

/**
 * Returns the node that is in the middle of two nodes to connect the paths.
 * @param {Array<Array<Node>>} grid - The grid of nodes.
 * @param {Node} nodeA - The first node.
 * @param {Node} nodeB - The second node.
 * @returns {Node} - The node that is in the middle of the two nodes.
 */
function getBetweenNode(grid, nodeA, nodeB) {
    // the node between two nodes is the node that is in the middle of them to connect the paths
    const row = (nodeA.row + nodeB.row) / 2;
    const col = (nodeA.col + nodeB.col) / 2;
    return grid[row][col];
}

/**
 * Generates a maze using the recursive backtracking algorithm.
 * @param {Object} gridRef - A reference to the grid object.
 * @param {Node} start - The starting node.
 * @param {Node} end - The ending node.
 * @param {Function} wait - A function that returns a promise that resolves after a certain amount of time.
 * @param {Function} setEnd - A function that sets the end node.
 */
export default async function recursiveMazeGen(gridRef, start, end, wait, setEnd) {
    // make a 2 times smaller grid 
    const grid = gridRef.current;

    // dfs maze generation
    const stack = [];
    const visited = new Set();
    const startNode = start;
    stack.push(startNode);
    visited.add(startNode);

    // set all nodes to walls
    for (let row of gridRef.current) {
        for (let node of row) {
            node.isWall = true;
        }
    }
    
    startNode.isWall = false;
    while (stack.length > 0) {
        const currentNode = stack.pop();
        // get all neighbors that are walls and not visited
        const neighbors = getWallNeighbors(grid, currentNode);
        const unvisitedNeighbors = neighbors.filter(neighbor => !visited.has(neighbor));
        // if there are no unvisited neighbors, continue (backtrack)
        if (unvisitedNeighbors.length === 0) continue;
        // choose a random unvisited neighbor
        const randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        // remove the wall between the current node and the random neighbor
        const betweenNode = getBetweenNode(grid, currentNode, randomNeighbor);
        // removing the wall to make a path
        betweenNode.isWall = false;
        randomNeighbor.isWall = false;
        // adding to visited and stack
        visited.add(randomNeighbor);
        stack.push(currentNode);
        stack.push(randomNeighbor);
        // wait for visualization
        await wait();
    }

    // make sure the end node is not a wall move it if necessary
    if (end.isWall) {
        const avaliableNeighbors = []
        if (end.row > 0 && !grid[end.row - 1][end.col].isWall) avaliableNeighbors.push(grid[end.row - 1][end.col]);
        if (end.col < grid[0].length - 1 && !grid[end.row][end.col + 1].isWall) avaliableNeighbors.push(grid[end.row][end.col + 1]);
        if (end.row < grid.length - 1 && !grid[end.row + 1][end.col].isWall) avaliableNeighbors.push(grid[end.row + 1][end.col]);
        if (end.col > 0 && !grid[end.row][end.col - 1].isWall) avaliableNeighbors.push(grid[end.row][end.col - 1]);
        const randomNeighbor = avaliableNeighbors[Math.floor(Math.random() * avaliableNeighbors.length)];
        end.isEnd = false;
        end = randomNeighbor;
        randomNeighbor.isEnd = true;
        setEnd(randomNeighbor);
        await wait();
    }

}
