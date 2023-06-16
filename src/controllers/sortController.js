/**
 * Sorts an array using the bubble sort algorithm.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 */
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


/**
 * Sorts an array using the insertion sort algorithm.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 */
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


/**
 * Sorts an array using the selection sort algorithm.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 */
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



/**
 * Sorts an array using the merge sort algorithm.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} mergeSwap - A function that swaps two elements of the array during the merge process.
 */
export async function MergeSort(arrayRef, compare, mergeSwap) {
    await mergeHelper(arrayRef, 0, arrayRef.current.length - 1, compare, mergeSwap);
}


/**
 * Recursively divides an array into halves and merges them using the merge function.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {number} start - The starting index of the array to be sorted.
 * @param {number} end - The ending index of the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} mergeSwap - A function that swaps two elements of the array during the merge process.
 */
async function mergeHelper(arrayRef, start, end, compare, mergeSwap) {
    if (start >= end) {
        return;
    }
    const middle = Math.floor((start + end) / 2);
    await mergeHelper(arrayRef, start, middle, compare, mergeSwap);
    await mergeHelper(arrayRef, middle + 1, end, compare, mergeSwap);
    await merge(arrayRef, start, middle, end, compare, mergeSwap);
}

/**
 * Merges two sorted subarrays into a single sorted subarray.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {number} start - The starting index of the first subarray.
 * @param {number} middle - The ending index of the first subarray.
 * @param {number} end - The ending index of the second subarray.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} mergeSwap - A function that swaps two elements of the array during the merge process.
 * @returns {Promise<void>} - A Promise that resolves when the subarray is merged.
 */
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



/**
 * Sorts an array using the quick sort algorithm.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 */
export async function QuickSort(arrayRef, compare, swap) { 
    await quickHelper(arrayRef, 0, arrayRef.current.length - 1, compare, swap);
}

/**
 * Helper function for the quick sort algorithm that recursively partitions the array.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {number} start - The starting index of the subarray to be sorted.
 * @param {number} end - The ending index of the subarray to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 * @returns {Promise<void>} - A Promise that resolves when the subarray is sorted.
 */
async function quickHelper(arrayRef, start, end, compare, swap) {
    if (start < end) {
        let pivotIndex = await partition(arrayRef, start, end, compare, swap);
        await quickHelper(arrayRef, start, pivotIndex - 1, compare, swap);
        await quickHelper(arrayRef, pivotIndex + 1, end, compare, swap);
    }
}

/**
 * Partitions the subarray around a pivot value and returns the index of the pivot.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {number} start - The starting index of the subarray to be partitioned.
 * @param {number} end - The ending index of the subarray to be partitioned.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 * @returns {Promise<number>} - A Promise that resolves with the index of the pivot.
 */
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



/**
 * Sorts an array using the heap sort algorithm.
 * @param {Object} arrayRef - A reference to the array to be sorted.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 */
export async function HeapSort(arrayRef, compare, swap) {
    await heapify(arrayRef, arrayRef.current.length, compare, swap);
    let end = arrayRef.current.length - 1;
    while (end > 0) {
        await swap(0, end);
        await siftDown(arrayRef, 0, end, compare, swap);
        end--;
    }
}

/**
 * Heapifies an array to satisfy the heap property.
 * @param {Object} arrayRef - A reference to the array to be heapified.
 * @param {number} length - The length of the array to be heapified.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 * @returns {Promise<void>} - A Promise that resolves when the array is heapified.
 */
async function heapify(arrayRef, length, compare, swap) {
    let start = Math.floor(length / 2);
    while (start >= 0) {
        await siftDown(arrayRef, start, length, compare, swap);
        start--;
    }
}   

/**
 * Sifts down an element in the heap to satisfy the heap property.
 * @param {Object} arrayRef - A reference to the array containing the heap.
 * @param {number} start - The index of the element to be sifted down.
 * @param {number} end - The index of the last element in the heap.
 * @param {Function} compare - A function that compares two elements of the array.
 * @param {Function} swap - A function that swaps two elements of the array.
 * @returns {Promise<void>} - A Promise that resolves when the element is sifted down.
 */
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