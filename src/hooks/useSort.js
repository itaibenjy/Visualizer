import { useState, useEffect, useRef } from 'react';
import { BubbleSort, MergeSort, InsertionSort, SelectionSort, QuickSort, HeapSort } from '../controllers/sortController';

/**
 * Custom hook that provides state and functions for sorting an array of numbers and visualizing the sorting process.
 * @returns {Object} An object containing actionProps, boardProps, and algorithmProps.
 */
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

    /**
     * Generates a new random array of numbers.
     * @returns {Array} An array of random numbers.
     */
    function randomArray() {
        const newArray = Array.from({length: size}, () => Math.floor(Math.random() * 1000));
        return newArray;
    }

    /**
     * Generates a new random array of numbers and sets the state variables accordingly.
     */
    function randomizeArray() {
        const newArray = randomArray();
        setArray(newArray);
        setSorted([...newArray].sort((a, b) => a - b));
        setColors(newArray.map((value, index) => value === sorted[index] ? "success" : "info"));
    }

    /**
     * Delays the execution of the next step in the sorting algorithm by a certain amount of time.
     * @returns {Promise} A promise that resolves after the specified delay.
     */
    async function wait() {
        return await new Promise(resolve => {
            setTimeout(resolve, maxSpeed - speedRef.current);
        });
    }

    /**
     * Delays the execution of the next step in the sorting algorithm by half the amount of time specified by wait().
     * @returns {Promise} A promise that resolves after the specified delay.
     */
    async function halfWait() {
        return await new Promise(resolve => {
            setTimeout(resolve, (maxSpeed - speedRef.current) / 2);
        });
    }

    /**
     * Sets the state variables for the array, sorted array, and colors array to new values based on the current size state variable.
     */
    useEffect(() => {
        const newArray = randomArray(); 
        const sortedArray = [...newArray].sort((a, b) => a - b);
        setArray(newArray);
        setSorted(sortedArray);
        setColors(newArray.map((value, index) => value === sortedArray[index] ? "success" : "info"));
    }, [size]);

    /**
     * Updates the speedRef.current value whenever the speed state variable changes.
     */
    useEffect(() => {
        speedRef.current = speed;
    } , [speed]);

    /**
     * Updates the arrayRef.current value whenever the array state variable changes.
     */
    useEffect(() => {
        arrayRef.current = array;
    }, [array]);

    /**
     * Updates the colorsRef.current value whenever the colors state variable changes.
     */
    useEffect(() => {
        colorsRef.current = colors;
    }, [colors]);

    /**
     * Resets the colors of the array to their original values based on the sorted array.
     */
    function resetColors(){
        const newColors = arrayRef.current.map((value, index) => value === sorted[index] ? "success" : "info");
        setColors(newColors);
    }

    /**
     * Updates the size state variable based on the value of the input element passed as an argument.
     * @param {Event} e - The event object representing the change event of the input element.
     */
    function changeSize(e) {
        setSize(e.target.value);
    }

    /**
     * Updates the speed state variable based on the value of the input element passed as an argument.
     * @param {Event} event - The event object representing the change event of the input element.
     */
    function changeSpeed(event){
        setSpeed(event.target.value);
    }

    /**
     * Executes the sorting algorithm passed as an argument and visualizes the sorting process.
     * @param {Object} algorithm - An object containing the name and function of the sorting algorithm to be executed.
     */
    async function excecuteAlgorithm(algorithm) {
        setIsVisualizing(true);
        await algorithm.function(arrayRef, compare, algorithm.name === "Merge Sort" ? mergeSwap : swap);
        await resetColors();
        setIsVisualizing(false);
    }

    /**
     * Changes the color of the elements being compared in the array and waits for a certain amount of time.
     * @param {number} i - The index of the first element being compared.
     * @param {number} j - The index of the second element being compared.
     */
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

    /**
     * Swaps the positions of two elements in the array and waits for a certain amount of time.
     * @param {number} i - The index of the first element to be swapped.
     * @param {number} j - The index of the second element to be swapped.
     */
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

    /**
     * Changes the color of the elements being swapped in the array and waits for half the amount of time specified by wait().
     * Calls dswap() to perform the actual swap and waits for the other half of the specified time.
     * @param {number} i - The index of the first element to be swapped.
     * @param {number} j - The index of the second element to be swapped.
     */
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

    /**
     * Changes the color of the elements being swapped in the array and waits for half the amount of time specified by wait().
     * Performs the swap by shifting elements in the array and waits for the other half of the specified time.
     * @param {number} i - The index of the first element to be swapped.
     * @param {number} j - The index of the second element to be swapped.
     */
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

    /**
     * An array of objects representing the available sorting algorithms and their corresponding functions.
     */
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

    /**
     * An object containing the state variables and functions related to user actions (e.g. changing the size or speed of the array).
     */
    const actionProps = {isVisualizing, randomizeArray, speed, changeSpeed, size, changeSize};
    /**
     * An object containing the state variables related to the array being sorted and its colors.
     */
    const boardProps = {array, colors}
    /**
     * An object containing the available sorting algorithms and the function to execute them.
     */
    const algorithmProps = {Algorithms, excecuteAlgorithm};

    return {actionProps, boardProps, algorithmProps}
}