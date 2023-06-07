
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


    const [grid, setGrid] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const speedRef = useRef(speed);
    const isVisualizingRef = useRef(isVisualizing);
    const gridRef = useRef(grid);

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
    }, [rows, cols, windowSize]);


    async function wait() {
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }


    async function updateColor(row, col, kind){
        if (!isMouseDown) return;
        const newGrid = [...grid];

        switch (kind) {
            case "wall":
                newGrid[row][col].isWall = !newGrid[row][col].isWall;
                break;
            case "start":
                newGrid[row][col].isStart = true;
                break;
            case "end":
                newGrid[row][col].isEnd = true;
                break;
            case "visited":
                newGrid[row][col].isVisited = true;
                break;
            case "current":
                newGrid[row][col].isCurrent = true;
                break;
            default:
                break;
        }

        setGrid(newGrid);

    };
    

    useEffect(() => {
        speedRef.current = speed;
    } , [speed]);

    useEffect(() => {
        isVisualizingRef.current = isVisualizing;
    }, [isVisualizing]); 

    useEffect(() => {
        gridRef.current = grid;
    }, [grid]);


    const Dijkstra = (array) => {
        console.log("Dijkstra");
    }

    function changeSpeed(event){
        setSpeed(event.target.value);
    }

    async function excecuteAlgorithm(algorithm){
        if (isVisualizingRef.current) return;
        setIsVisualizing(true);
        clearVisited();
        const path = await algorithm.function(gridRef, startNode, endNode, wait);
        if (path.found){
            pathFind(path.path);
        }
        setIsVisualizing(false);
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
    }

    async function mazeGen(){
        setIsVisualizing(true);
        console.log("Maze Gen")
        await MazePrimeGen(gridRef, startNode, endNode, waitGen);
        console.log("Maze Gen")
        setIsVisualizing(false);
    }

    async function waitGen(){
        forceRender();
        return await new Promise(resolve => {
            setTimeout(resolve, 1);
        });
    }

    const Algorithms = [
        {
            name: "Breadth First Search",
            function: BFS
        },
        {
            name: "A*",
            function: Astar
        }
    ]

    return {speed, changeSpeed, excecuteAlgorithm, isVisualizing, Algorithms,  grid, updateColor, cellSize, cols, rows, setIsMouseDown, clearVisited, clearAll, mazeGen}
}