

export async function BubbleSort(arrayRef, compare, swap) {
    let isSorted = false;
    let counter = 0;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < arrayRef.current.length - 1 - counter; i++) {
            await compare(i, i + 1);
            if (arrayRef.current[i] > arrayRef.current[i + 1]) {
                await swap(i, i + 1);
                isSorted = false;
            }
        }
        counter++;
    }
}

export async function InsertionSort(arrayRef, compare, swap) {
    for (let i = 1; i < arrayRef.current.length; i++) {
        let j = i;
        while (j > 0 && arrayRef.current[j] < arrayRef.current[j - 1]) {
            await compare(j, j - 1);
            await swap(j, j - 1);
            j--;
        }
    }
}


export async function SelectionSort(arrayRef, compare, swap) {
    for (let i = 0; i < arrayRef.current.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arrayRef.current.length; j++) {
            await compare(minIndex, j);
            if (arrayRef.current[j] < arrayRef.current[minIndex]) {
                minIndex = j;
            }
        }
        await swap(i, minIndex);
    }
}



export async function MergeSort(arrayRef, compare, mergeSwap) {
    await mergeHelper(arrayRef, 0, arrayRef.current.length - 1, compare, mergeSwap);
}

async function mergeHelper(arrayRef, start, end, compare, mergeSwap) {
    if (start >= end) {
        return;
    }
    const middle = Math.floor((start + end) / 2);
    await mergeHelper(arrayRef, start, middle, compare, mergeSwap);
    await mergeHelper(arrayRef, middle + 1, end, compare, mergeSwap);
    await merge(arrayRef, start, middle, end, compare, mergeSwap);
}

async function merge(arrayRef, start, middle, end, compare, mergeSwap) {
    let i = start;
    let j = middle + 1;

    while (i <= middle && j <= end) {
        await compare(i, j);
        if (arrayRef.current[i] <= arrayRef.current[j]) {
            i++;
        } else {
            await mergeSwap(i,j);

        i++;
        middle++;
        j++;
        }
    }
}

export async function QuickSort(arrayRef, compare, swap) { 
    await quickHelper(arrayRef, 0, arrayRef.current.length - 1, compare, swap);
}

async function quickHelper(arrayRef, start, end, compare, swap) {
    if (start < end) {
        let pivotIndex = await partition(arrayRef, start, end, compare, swap);
        await quickHelper(arrayRef, start, pivotIndex - 1, compare, swap);
        await quickHelper(arrayRef, pivotIndex + 1, end, compare, swap);
    }
}

async function partition(arrayRef, start, end, compare, swap) {
    let pivotIndex = end;
    let pivotValue = arrayRef.current[pivotIndex];
    let i = start;
    for (let j = start; j < end; j++) {
        await compare(j, pivotIndex);
        if (arrayRef.current[j] < pivotValue) {
            await swap(i, j);
            i++;
        }
    }
    await swap(i, pivotIndex);
    return i;
}



export async function HeapSort(arrayRef, compare, swap) {
    await heapify(arrayRef, arrayRef.current.length, compare, swap);
    let end = arrayRef.current.length - 1;
    while (end > 0) {
        await swap(0, end);
        await siftDown(arrayRef, 0, end, compare, swap);
        end--;
    }
}

async function heapify(arrayRef, length, compare, swap) {
    let start = Math.floor(length / 2);
    while (start >= 0) {
        await siftDown(arrayRef, start, length, compare, swap);
        start--;
    }
}   

async function siftDown(arrayRef, start, end, compare, swap) {
    let root = start;
    while (root * 2 + 1 < end) {
        let child = root * 2 + 1;
        let swapIndex = root;
        await compare(swapIndex, child);
        if (arrayRef.current[swapIndex] < arrayRef.current[child]) {
            swapIndex = child;
        }
        if (child + 1 < end) {
            await compare(swapIndex, child + 1);
            if (arrayRef.current[swapIndex] < arrayRef.current[child + 1]) {
                swapIndex = child + 1;
            }
        }
        if (swapIndex === root) {
            return;
        } else {
            await swap(root, swapIndex);
            root = swapIndex;
        }
    }
}