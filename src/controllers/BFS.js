

export default async function BFS(gridRef, startNode, end, wait) {
    const grid = gridRef.current;
    const queue = [];
    const path = [];
    let endNode;
    let found = false;
    queue.push(startNode);
    while (queue.length > 0) {
        const node = queue.shift();
        if (node.isEnd) {
            endNode = node;
            found = true;
            break;
        };
        if (node.isWall) continue;
        if (node.isVisited) continue;
        node.isVisited = true;
        node.isCurrent = true;
        await wait();
        const neighbors = getNeighbors(node, grid);
        for (const neighbor of neighbors) {
            neighbor.previousNode = node;
            queue.push(neighbor);
        }
        node.isCurrent = false;
    }

    if (endNode) {
        let currentNode = endNode;
        while (currentNode) {
            path.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
    }

    return {path, found}

}

function getNeighbors(node, grid) {
    let neighbors = [];
    let { row, col } = node;

    if (row > 0 && !grid[row-1][col].isWall) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1 && !grid[row+1][col].isWall){
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0 && !grid[row][col-1].isWall) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1  && !grid[row][col+1].isWall) {
        neighbors.push(grid[row][col + 1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}