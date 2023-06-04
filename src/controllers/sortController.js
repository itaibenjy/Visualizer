

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