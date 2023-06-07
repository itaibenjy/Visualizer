
import { useState, useEffect, useRef } from 'react';
import BFS from '../controllers/BFS';
import Astar from '../controllers/Astar';
import MazePrimeGen from '../controllers/MazePrimeGen';

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
    const cols = Math.floor(windowSize.width / cellSize)+1;
    const rows = Math.floor(windowSize.height / cellSize);

    const [startNode, setStartNode] = useState();
    const [endNode, setEndNode] = useState();

    function forceRender() {
        setForceUpdate(prev => prev + 1);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        document.body.classList.add('no-scroll');

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('no-scroll');

        };
    }, []);

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
    }, [rows, cols, windowSize]);

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

    async function wait() {
        if (afterVisualizeRef.current) { return; }
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }


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
    

    useEffect(() => {
        speedRef.current = speed;
    } , [speed]);

    useEffect(() => {
        isVisualizingRef.current = isVisualizing;
    }, [isVisualizing]); 

    useEffect(() => {
        gridRef.current = grid;
    }, [grid]);

    useEffect(() => {
        afterVisualizeRef.current = afterVisualize;
    }, [afterVisualize]);


    const Dijkstra = (array) => {
        console.log("Dijkstra");
    }

    function changeSpeed(event){
        setSpeed(event.target.value);
    }

    async function excecuteAlgorithm(algorithm){
        setIsVisualizing(true);
        clearVisited();
        const path = await algorithm.function(gridRef, startNode, endNode, wait);
        if (path.found){
            await pathFind(path.path);
        }
        setAfterVisualize(true);
        setIsVisualizing(false);
    }

    async function startVisualizing(){
        setAfterVisualize(false)
        excecuteAlgorithm(Algorithms[selected]);
    }

    async function pathFind(path){
        for (let i = 0; i < path.length; i++) {
            path[i].isPath = true;
            await wait();
        }
    }

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

    async function mazeGen(){
        setIsVisualizing(true);
        console.log("Maze Gen")
        await MazePrimeGen(gridRef, startNode, endNode, waitGen);
        console.log("Maze Gen")
        setIsVisualizing(false);
    }

    async function waitGen(){
        if (afterVisualizeRef.current) { return; }
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, 1);
        });
    }

    const Algorithms = [
        {
            name: "A*",
            function: Astar
        },
        {
            name: "Breadth First Search",
            function: BFS
        }
    ]


    return {speed, changeSpeed, startVisualizing, isVisualizing, Algorithms,  grid, updateColor, cellSize, cols, rows, setIsMouseDown, isMouseDown, clearVisited, clearAll, mazeGen,  setSetType, selected, setSelected, realTimeUpdate}
}