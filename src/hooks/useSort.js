import { useState, useEffect, useRef } from 'react';
import { BubbleSort, MergeSort, InsertionSort, SelectionSort, QuickSort, HeapSort } from '../controllers/sortController';

export function useSort() {

    const maxSpeed = 500;
    
    const [size, setSize] = useState(5); // 100 is default size
    const [array, setArray] = useState(randomArray());
    const [sorted, setSorted] = useState([...array].sort((a, b) => a - b));
    const [colors,setColors] = useState(array.map((value, index) => value === sorted[index] ? "success" : "info"));
    const [speed, setSpeed] = useState(50); // 50 is default speed
    const [isVisualizing, setIsVisualizing] = useState(false); 

    const speedRef = useRef(speed);
    const arrayRef = useRef(array);
    const colorsRef = useRef(colors);

    function randomArray() {
        const newArray = Array.from({length: size}, () => Math.floor(Math.random() * 1000));
        return newArray;
    }

    function randomizeArray() {
        const newArray = randomArray();
        setArray(newArray);
        setSorted([...newArray].sort((a, b) => a - b));
        setColors(newArray.map((value, index) => value === sorted[index] ? "success" : "info"));
    }

    async function wait() {
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }

    async function halfWait() {
        return await new Promise(resolve => {
            setTimeout(resolve, (maxSpeed - speedRef.current) / 2);
        });
    }

    useEffect(() => {
        const newArray = randomArray(); 
        const sortedArray = [...newArray].sort((a, b) => a - b);
        setArray(newArray);
        setSorted(sortedArray);
        setColors(newArray.map((value, index) => value === sortedArray[index] ? "success" : "info"));
    }, [size]);

    useEffect(() => {
        speedRef.current = speed;
    } , [speed]);

    useEffect(() => {
        arrayRef.current = array;
    }, [array]);

    useEffect(() => {
        colorsRef.current = colors;
    }, [colors]);

    function resetColors(){
        const newColors = arrayRef.current.map((value, index) => value === sorted[index] ? "success" : "info");
        setColors(newColors);
    }

    function changeSize(e) {
        setSize(e.target.value);
    }

    function changeSpeed(event){
        setSpeed(event.target.value);
    }

    async function excecuteAlgorithm(algorithm) {
        setIsVisualizing(true);
        await algorithm.function(arrayRef, compare, algorithm.name == "Merge Sort" ? mergeSwap : swap);
        await resetColors();
        setIsVisualizing(false);
    }

    async function compare(i, j) {
        setColors(colorsRef.current.map((value, index) => {
            if (index === i || index === j) {
                return "warning";
            } else if (arrayRef.current[index] === sorted[index]) {
                return "success";
            } else {
                return "info";
            }}));
        
        await wait();

    }

    async function dswap(i, j) {
        const newArray = await arrayRef.current.map((value, index) => {
            if (index === i) {
                return arrayRef.current[j];
            } else if (index === j) {
                return arrayRef.current[i];
            } else {
                return value;
            }
        });
        await setArray(newArray);
    }

    async function swap(i, j) {
        if (i === j) return;
        setColors(colorsRef.current.map((value, index) => {
            if (index === i || index === j) {
                return "danger";
            } else if (arrayRef.current[index] === sorted[index]) {
                return "success";
            } else {
                return "info";
            }}));

        await halfWait();

        await dswap(i, j);

        await halfWait();

    }

    async function mergeSwap(i, j) {
        setColors(colorsRef.current.map((value, index) => {
            if (index === i || index === j) {
                return "danger";
            } else if (arrayRef.current[index] === sorted[index]) {
                return "success";
            } else {
                return "info";
            }}));
        
        await halfWait();

        const newArray = [...arrayRef.current];
        for (let k = j; k > i; k--) {
            var temp = newArray[k];
            newArray[k] = newArray[k - 1];
            newArray[k - 1] = temp;
        }
        await setArray(newArray);

        await halfWait();
    }

    const Algorithms = [
        {
            name: "Bubble Sort",
            function: BubbleSort
        },
        {
            name: "Merge Sort",
            function: MergeSort
        },
        {
            name: "Insertion Sort",
            function: InsertionSort
        },
        {
            name: "Selection Sort",
            function: SelectionSort
        },
        {
            name: "Quick Sort",
            function: QuickSort
        },
        {
            name: "Heap Sort",
            function: HeapSort
        }

    ];



    return {array, changeSize, size, colors, Algorithms, excecuteAlgorithm, speed, changeSpeed, isVisualizing, randomizeArray}
}