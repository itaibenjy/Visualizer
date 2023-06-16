/**
 * A priority queue data structure used in the A* algorithm.
 */
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    /**
     * Adds a node to the queue with a given priority.
     * @param {Object} node - The node to add to the queue.
     * @param {number} priority - The priority of the node.
     */
    enqueue(node, priority) {
        this.queue.unshift({ node, priority });
        this.sort();
    }

    /**
     * Removes and returns the node with the highest priority from the queue.
     * @returns {Object} The node with the highest priority.
     */
    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift().node;
        }
    }

    /**
     * Sorts the queue based on the priority of each node.
     */
    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return !this.queue.length;
    }
}

/**
 * Finds the shortest path between a start node and an end node on a grid using the A* algorithm.
 * @param {Object} gridRef - A reference to the grid on which to perform the search.
 * @param {Object} startNode - The node from which to start the search.
 * @param {Object} endNode - The node at which to end the search.
 * @param {Function} wait - A function that returns a promise that resolves after a certain amount of time.
 * @returns {Object} An object containing the shortest path and a boolean indicating whether a path was found.
 */
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

/**
 * Calculates the Manhattan distance between two nodes.
 * @param {Object} nodeA - The first node.
 * @param {Object} nodeB - The second node.
 * @returns {number} The Manhattan distance between the two nodes.
 */
function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row);
}

/**
 * Calculates the Euclidean distance between two nodes.
 * @param {Object} nodeA - The first node.
 * @param {Object} nodeB - The second node.
 * @returns {number} The Euclidean distance between the two nodes.
 */
function euclideanDistance(nodeA, nodeB) {
    const x = nodeA.col - nodeB.col;
    const y = nodeA.row - nodeB.row;
    return Math.sqrt(x * x + y * y);
}

/**
 * Gets the unvisited neighbors of a node on a grid.
 * @param {Object} node - The node for which to get the unvisited neighbors.
 * @param {Array} grid - The grid on which the node resides.
 * @returns {Array} An array of unvisited neighbor nodes.
 */
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]);
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall ) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
