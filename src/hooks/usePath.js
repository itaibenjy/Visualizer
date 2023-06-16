
import { useState, useEffect, useRef } from 'react';
import BFS from '../controllers/BFS';
import Astar from '../controllers/Astar';
import DFS from '../controllers/DFS';
import MazeGen from '../controllers/MazeGen';
import SwarmSearch from '../controllers/Swarm';

/**
 * This hook contains functions for updating the pathfinding grid and visualizing the pathfinding algorithm in real time.
 * @returns {Object} An object containing the following properties:
 * - grid: a 2D array of Node objects representing the pathfinding grid
 * - startNode: the starting Node object
 * - endNode: the ending Node object
 * - setType: a string representing the type of Node to set (wall, unwall, start, or end)
 * - setIsVisualizing: a function to set the isVisualizing state
 * - isVisualizing: a boolean representing whether the pathfinding algorithm is currently visualizing
 * - realTimeUpdate: a function to update the shortest path with the chosen algorithm in real time
 * - updateColor: a function to update the color of a Node on the grid based on the selected type
 * - afterVisualize: a boolean representing whether the pathfinding algorithm has finished visualizing
 * - setAfterVisualize: a function to set the afterVisualize state
 */
export function usePath() {


    class Node {
        constructor(row, col) {
            this.row = row;
            this.col = col;
            this.isStart = false;
            this.isEnd = false;
            this.isVisited = false;
            this.isWall = false;
            this.isCurrent = false;
            this.isPath = false;
            this.previousNode = null;
            this.distance = Infinity;
        }
    }
    
    const maxSpeed = 500;
    const [speed, setSpeed] = useState(50); // 50 is default speed
    const [isVisualizing, setIsVisualizing] = useState(false); 
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);
    const [setType, setSetType] = useState("wall"); // wall, start, end
    const [afterVisualize, setAfterVisualize] = useState(false);
    const [selected, setSelected] = useState(0);
    const [agentsSelected, setAgentsSelected] = useState(4);


    const [grid, setGrid] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const speedRef = useRef(speed);
    const isVisualizingRef = useRef(isVisualizing);
    const gridRef = useRef(grid);
    const afterVisualizeRef = useRef(afterVisualize);

    const cellSize = 30; // The size of each cell in pixels
    let cols = Math.floor(windowSize.width / cellSize) + 1;
    let rows = windowSize.height > 50 ? Math.floor((windowSize.height-50) / cellSize) : 1 ;

    const [startNode, setStartNode] = useState();
    const [endNode, setEndNode] = useState();


    /**
     * force render the page
     */
    function forceRender() {
        setForceUpdate(prev => prev + 1);
    }

    /**
     * This side effect is used to add event listeners to the window for resizing the grid
     */
    useEffect(() => {
        const handleResize = () => {
            cols = Math.floor(windowSize.width / cellSize) + 1;
            rows = windowSize.height > 50 ? Math.floor((windowSize.height-50) / cellSize) : 1 ;
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        const handleMount = () => {
            window.scrollTo(0, 0);
            document.body.classList.add('no-scroll');
        };

        window.addEventListener('resize', handleResize);
        
        document.body.classList.add('no-scroll');
        handleMount();

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('no-scroll');

        };
    }, []);

    /**
     * This side effect is used for resizing the grid when the window size changes 
     */
    useEffect(() => {
        const newGrid = [];
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < cols; j++) {
                currentRow.push(new Node(i, j));
            }
            newGrid.push(currentRow);
        }
        newGrid[Math.floor(rows/2)][Math.floor(cols/4)].isStart = true;
        newGrid[Math.floor(rows/2)][Math.floor(cols/4)*3].isEnd= true;
        setStartNode(newGrid[Math.floor(rows/2)][Math.floor(cols/4)]);
        setEndNode(newGrid[Math.floor(rows/2)][Math.floor(cols/4)*3]);
        setGrid(newGrid);
        setAfterVisualize(false);
        setIsVisualizing(false);
    }, [windowSize]);

    /**
     * This function is used to find and update the shortest path with the chosen algorithm in real time
     * @param {Node} start The start node
     * @param {Node} end The end node
     */
    async function realTimeUpdate(start = startNode, end = endNode) {
        if (afterVisualizeRef.current) {
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    grid[i][j].isVisited = false;
                    grid[i][j].isCurrent = false;
                    grid[i][j].isPath = false;
                    grid[i][j].previousNode = null;
                    grid[i][j].distance = Infinity;
                }
            }
            const path = await Algorithms[selected].function(gridRef, start, end, wait);
            if (path.found){
                await pathFind(path.path);
            }
        }
    }

    /**
     * This function is used to add a delay between pathfinding steps
     */
    async function wait() {
        if (afterVisualizeRef.current) { return; }
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }

   


    /**
     * This hook contains the logic for pathfinding and grid manipulation.
     * @returns {Object} An object containing the necessary functions and state variables for pathfinding and grid manipulation.
     */
    async function wait() {
        if (afterVisualizeRef.current) { return; }
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }

    /**
     * Updates the color of a node on the grid based on the current set type.
     * @param {number} row - The row index of the node.
     * @param {number} col - The column index of the node.
     * @param {boolean} isMove - A flag indicating whether the node is being moved.
     */
    async function updateColor(row, col, isMove = false) {

        switch (setType) {
            case "wall":
                if(grid[row][col].isStart || grid[row][col].isEnd) break;
                grid[row][col].isWall = true;
                if (grid[row][col].isVisited) realTimeUpdate(startNode, endNode);
                break;
            case "unwall":
                if(grid[row][col].isStart || grid[row][col].isEnd) break;
                grid[row][col].isWall = false;
                realTimeUpdate(startNode, endNode);
                break;
            case "start":
                if(grid[row][col].isEnd || grid[row][col].isWall) break;
                if(startNode.row === row && startNode.col === col && !isMove) break;
                updateStart(row, col, isMove);
                break;
            case "end":
                if(grid[row][col].isStart || grid[row][col].isWall) break;
                if(endNode.row === row && endNode.col === col && !isMove) break; 
                updateEnd(row, col);
                break;
            default:
                break;
        }

        forceRender();

    };

    /**
     * Updates the start node on the grid.
     * @param {number} row - The row index of the new start node.
     * @param {number} col - The column index of the new start node.
     * @param {boolean} isMove - A flag indicating whether the node is being moved.
     */
    function updateStart(row, col, isMove){
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].isStart = false;
            }
        }
        grid[row][col].isStart = true;
        setStartNode(grid[row][col]);
        if (afterVisualize) {
            realTimeUpdate(grid[row][col], endNode);
        }
    }

    /**
     * Updates the end node on the grid.
     * @param {number} row - The row index of the new end node.
     * @param {number} col - The column index of the new end node.
     */
    function updateEnd(row, col){
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].isEnd = false;
            }
        }
        grid[row][col].isEnd = true;
        setEndNode(grid[row][col]);
        if (afterVisualize) {
            realTimeUpdate(startNode, grid[row][col]);
        }
    }

    /**
     * Updates the speed reference when the speed state changes.
     */
    useEffect(() => {
        speedRef.current = speed;
    } , [speed]);

    /**
     * Updates the isVisualizingRef reference when the isVisualizing state changes.
     */
    useEffect(() => {
        isVisualizingRef.current = isVisualizing;
    }, [isVisualizing]); 

    /**
     * Updates the gridRef reference when the grid state changes.
     */
    useEffect(() => {
        gridRef.current = grid;
    }, [grid]);

    /**
     * Updates the afterVisualizeRef reference when the afterVisualize state changes.
     */
    useEffect(() => {
        afterVisualizeRef.current = afterVisualize;
    }, [afterVisualize]);

    /**
     * Changes the speed state when the speed slider is moved.
     * @param {Object} event - The event object.
     */
    function changeSpeed(event){
        setSpeed(event.target.value);
    }

    /**
     * Executes the selected algorithm and visualizes the pathfinding process.
     * @param {Object} algorithm - The algorithm object containing the name and function properties.
     */
    async function excecuteAlgorithm(algorithm){
        setIsVisualizing(true);
        clearVisited();
        const path = await algorithm.function(gridRef, startNode, endNode, wait, agentsSelected+1);
        if (path.found){
            await pathFind(path.path);
        }
        setAfterVisualize(true);
        setIsVisualizing(false);
    }

    /**
     * Starts the pathfinding visualization process.
     */
    async function startVisualizing(){
        setAfterVisualize(false)
        excecuteAlgorithm(Algorithms[selected]);
    }

    /**
     * Animates the pathfinding process by highlighting the nodes in the path.
     * @param {Array} path - The array of nodes in the path.
     */
    async function pathFind(path){
        for (let i = 0; i < path.length; i++) {
            path[i].isPath = true;
            await wait();
        }
    }

    /**
     * Clears the visited, current, path, previousNode, and distance properties of all nodes on the grid.
     */
    function clearVisited(){
        const newGrid = [...grid];
        for (let i = 0; i < newGrid.length; i++) {
            for (let j = 0; j < newGrid[i].length; j++) {
                newGrid[i][j].isVisited = false;
                newGrid[i][j].isCurrent = false;
                newGrid[i][j].isPath = false;
                newGrid[i][j].previousNode = null;
                newGrid[i][j].distance = Infinity;
            }
        }
        setGrid(newGrid);
        setAfterVisualize(false);
    }

    /**
     * Clears the visited, current, path, wall, previousNode, and distance properties of all nodes on the grid.
     */
    function clearAll(){
        const newGrid = [...grid];
        for (let i = 0; i < newGrid.length; i++) {
            for (let j = 0; j < newGrid[i].length; j++) {
                newGrid[i][j].isVisited = false;
                newGrid[i][j].isCurrent = false;
                newGrid[i][j].isPath = false;
                newGrid[i][j].isWall = false;
                newGrid[i][j].previousNode = null;
                newGrid[i][j].distance = Infinity;
            }
        }
        setGrid(newGrid);
        setAfterVisualize(false);
    }

    /**
     * Generates a maze on the grid using the selected algorithm.
     */
    async function mazeGen(){
        clearVisited();
        setIsVisualizing(true);
        console.log("Maze Gen")
        await MazeGen(gridRef, startNode, endNode, waitGen, setEndNode);
        console.log("Maze Gen")
        setIsVisualizing(false);
    }

    /**
     * Adds a delay between maze generation steps.
     */
    async function waitGen(){
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }


    /**
     * The array of algorithm objects containing the name and function properties.
     */
    const Algorithms = [
        {
            name: "A*",
            function: Astar
        },
        {
            name: "Breadth First Search",
            function: BFS
        },
        {
            name: "Depth First Search",
            function: DFS
        },
        {
            name: "Swarm (Random)",
            function: SwarmSearch
        }
    ]

    const gridProps = {grid, updateColor, cellSize, cols, rows, setIsMouseDown, isMouseDown, setSetType, realTimeUpdate}
    const actionProps = {speed, changeSpeed, startVisualizing, isVisualizing, clearVisited, clearAll, mazeGen}
    const algorithmProps = {Algorithms, selected, setSelected, agentsSelected, setAgentsSelected}


    return {gridProps, actionProps, algorithmProps}
}