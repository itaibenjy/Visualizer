import { useState, useEffect, useRef } from 'react';
import BubbleSort from '../controllers/bubbleSort';

export function useSort() {

    
    const [array, setArray] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [colors,setColors] = useState([]);
    const [size, setSize] = useState(5); // 100 is default size
    const [speed, setSpeed] = useState(50); // 50 is default speed
    const [isVisualizing, setIsVisualizing] = useState(false); 

    const speedRef = useRef(speed);
    const arrayRef = useRef(array);

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
        resetColors();
        arrayRef.current = array;
    }, [array]);

    function resetColors(){
        const newColors = array.map((value, index) => value === sorted[index] ? "success" : "info");
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
        setIsVisualizing(false);
    }

    async function compare(i, j) {
        setColors(array.map((value, index) => {
            if (index === i || index === j) {
                return "warning";
            } else if (value === sorted[index]) {
                return "success";
            } else {
                return "info";
            }}));
        if (speedRef.current !== 200){
            await new Promise(resolve => setTimeout(resolve, 200 - speedRef.current));
        }

    }

    async function swap(i, j) {
        setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[i] = "danger";
            newColors[j] = "danger";
            return newColors;
        });

        if (speedRef.current !== 200){
            await new Promise(resolve => setTimeout(resolve, 200 - speedRef.current));
        }

        setArray((prevArray) => {
            const newArray = [...prevArray];
            const temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
            return newArray;
        });

    }




    return {array, changeSize, size, colors, bubbleSort, speed, changeSpeed, isVisualizing}
}