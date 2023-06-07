function getWallNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 1) neighbors.push(grid[row - 2][col]);
    if (col < grid[0].length - 2) neighbors.push(grid[row][col + 2]);
    if (row < grid.length - 2) neighbors.push(grid[row + 2][col]);
    if (col > 1) neighbors.push(grid[row][col - 2]);
    return neighbors.filter(neighbor => neighbor.isWall);
}

function getBetweenNode(grid, nodeA, nodeB) {
    const row = (nodeA.row + nodeB.row) / 2;
    const col = (nodeA.col + nodeB.col) / 2;
    return grid[row][col];
}

export default async function primsMazeGenerator(gridRef, start, end, wait) {

    // set all nodes to walls
    for (let row of gridRef.current) {
        for (let node of row) {
            node.isWall = true;
        }
    }

    // set start and end nodes
    start.isWall = false;
    end.isWall = false;

    const grid = gridRef.current;
    let startNode = grid[0][0];
    startNode.isWall = false;
    let frontier = getWallNeighbors(grid, startNode);

    while (frontier.length > 0) {
        let randomIndex = Math.floor(Math.random() * frontier.length);
        let wallNode = frontier[randomIndex];
        frontier.splice(randomIndex, 1);
        
        let neighbors = getWallNeighbors(grid, wallNode);
        if (neighbors.length === 0) continue;

        let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        let betweenNode = getBetweenNode(grid, wallNode, randomNeighbor);
        
        wallNode.isWall = false;
        betweenNode.isWall = false;
        await wait();
        
        let newFrontier = getWallNeighbors(grid, wallNode);
        frontier = frontier.concat(newFrontier);
    }
}

