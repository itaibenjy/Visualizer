class Agent {
    constructor(startNode, node = startNode) {
        this.startNode = startNode;
        this.node = node;
    }

    // Agent tries to move in a random direction
    move(gridRef,) {
        let directions = [
            [-1, 0], // Up
            [0, 1], // Right
            [1, 0], // Down
            [0, -1] // Left
        ];

        // Shuffle the directions to ensure randomness
        directions.sort(() => Math.random() - 0.5);


        // If no valid move backtrack until a valid move is found
        while (true) {

            for (let direction of directions) {
                let newX = this.node.row + direction[0];
                let newY = this.node.col + direction[1];

                // Check if the new position is within the grid
                if (newX >= 0 && newY >= 0 && newX < gridRef.current.length && newY < gridRef.current[0].length) {
                    let newNode = gridRef.current[newX][newY];

                    // Check if the node is a wall or has already been visited
                    if (!newNode.isWall && !newNode.isVisited) {
                        newNode.isVisited = true;
                        newNode.previousNode = this.node; // Keep track of the path
                        this.node.isCurrent = false;
                        this.node = newNode;
                        this.node.isCurrent = true;
                        return newNode;
                    }
                }
            }
            // not found backtrack
            this.node.isCurrent = false;
            this.node = this.node.previousNode;
            if (this.node === this.startNode || this.node === null) {
                return this.node;
            }
        }

    }
}

export default async function swarmSearch(gridRef, startNode, endNode, wait, numberOfAgents=8) {
    // Create an array of agents at the start node ( numberOfAgents )
    let agents = [];
    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent(startNode));
    }

    // Keep track of whether the search is finished
    let finished = false;
    let endAgent = null; // The agent that found the end
    startNode.isVisited= true;


    while (!finished) {
        // Make all agents move
        let moves = agents.map(agent => agent.move(gridRef));

        // Wait for all agents to finish moving
        let newNodes = await Promise.all(moves);
        // Check if any agent has reached the end node
        for (let i = 0; i < newNodes.length; i++) {
            if (newNodes[i] && newNodes[i].isEnd) {
                finished = true;
                endAgent = agents[i];
                break;
            }
        }

        // removing agents that have backtracked to the start node or have no more valid moves
        agents = agents.filter(agent => agent.node !== startNode && agent.node !== null);

        // Check if all agents have been removed no path found
        if(agents.length === 0){
            finished = true;
        }

        // add new agents to the array
        for (let k = 0; k < numberOfAgents-agents.length; k++) {
            agents.push(new Agent(startNode, agents[0].node));
        }

        // Wait for the screen to update
        await wait();
    }

    // Construct the path
    let path = [];
    if (endAgent) {
        let node = endAgent.node;
        while (node.col !== startNode.col || node.row !== startNode.row) {
            path.unshift(node);
            node = node.previousNode;
        }
    }

    return {
        path: path,
        found: !!endAgent,
    };
}
