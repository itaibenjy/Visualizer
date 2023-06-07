class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(node, priority) {
        this.queue.push({ node, priority });
        this.sort();
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift().node;
        }
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return !this.queue.length;
    }
}

export default async function Astar(gridRef, startNode, endNode, wait) {
    const grid = gridRef.current;
    startNode.distance = 0;
    const visitedNodes = [];
    let path = [];
    let found = false;
    const unvisitedNodes = new PriorityQueue();
    unvisitedNodes.enqueue(startNode, 0);

    while (!unvisitedNodes.isEmpty()) {
        const closestNode = unvisitedNodes.dequeue();
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) break;

        closestNode.isVisited = true;
        closestNode.isCurrent = true;
        await wait();
        visitedNodes.push(closestNode);

        if (closestNode === endNode) {
            found = true;
            break;
        }
        const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            const distance = closestNode.distance + 1;
            if (distance < neighbor.distance) {
                neighbor.distance = distance;
                neighbor.totalDistance = distance + manhattanDistance(neighbor, endNode);
                neighbor.previousNode = closestNode;
                if (!neighbor.isVisited) {
                    unvisitedNodes.enqueue(neighbor, neighbor.totalDistance);
                }
            }
        }
        closestNode.isCurrent = false;
    }
    if (found) {
        let currentNode = endNode;
        while (currentNode !== startNode) {
            path.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        path.unshift(startNode);
    }
    return { path, found }
}

function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]);
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall ) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


