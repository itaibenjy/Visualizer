import { useState, useEffect, useRef } from 'react';
import { BubbleSort, MergeSort } from '../controllers/sortController';

export function useSort() {

    const maxSpeed = 500;
    
    const [array, setArray] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [colors,setColors] = useState([]);
    const [size, setSize] = useState(5); // 100 is default size
    const [speed, setSpeed] = useState(50); // 50 is default speed
    const [isVisualizing, setIsVisualizing] = useState(false); 

    const speedRef = useRef(speed);
    const arrayRef = useRef(array);
    const colorsRef = useRef(colors);

    useEffect(() => {
        const newArray = Array.from({length: size}, () => Math.floor(Math.random() * 1000));
        const sortedArray = [...newArray].sort((a, b) => a - b);
        setArray(newArray);
        setSorted(sortedArray);
        resetColors();
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

    async function bubbleSort() {
        setIsVisualizing(true);
        await BubbleSort(arrayRef, compare, swap)
        await resetColors();
        setIsVisualizing(false);
    }

    async function mergeSort() {
        setIsVisualizing(true);
        await MergeSort(arrayRef, compare, swap)
        await resetColors();
        await resetColors();
        setIsVisualizing(false);
    }

    async function compare(i, j) {
        await setColors(arrayRef.current.map((value, index) => {
            if (index === i || index === j) {
                return "warning";
            } else if (value === sorted[index]) {
                return "success";
            } else {
                return "info";
            }}));
        if (speedRef.current !== maxSpeed){
            await new Promise(resolve => setTimeout(resolve, maxSpeed - speedRef.current));
        }

    }

    async function swap(i, j) {
        setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[i] = "danger";
            newColors[j] = "danger";
            return newColors;
        });

        if (speedRef.current !== maxSpeed){
            await new Promise(resolve => setTimeout(resolve, maxSpeed - speedRef.current));
        }

        const newArray = await arrayRef.current.map((value, index) => {
            if (index === i) {
                return arrayRef.current[j];
            } else if (index === j) {
                return arrayRef.current[i];
            } else {
                return value;
            }
        });
        setArray(newArray);

    }




    return {array, changeSize, size, colors, bubbleSort, mergeSort, speed, changeSpeed, isVisualizing}
}