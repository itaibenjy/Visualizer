

export async function BubbleSort(arrayRef, compare, swap) {
    let isSorted = false;
    let counter = 0;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < arrayRef.current.length - 1 - counter; i++) {
            await compare(i, i + 1);
            if (arrayRef.current[i] > arrayRef.current[i + 1]) {
                console.log("swap" ,arrayRef.current[i] , arrayRef.current[i+1])
                await swap(i, i + 1);
                isSorted = false;
            }
        }
        counter++;
    }
}


export async function MergeSort(arrayRef, compare, swap) {
    await mergeHelper(arrayRef, 0, arrayRef.current.length - 1, compare, swap);
}

async function mergeHelper(arrayRef, start, end, compare, swap) {
    if (start >= end) {
        return;
    }
    const middle = Math.floor((start + end) / 2);
    await mergeHelper(arrayRef, start, middle, compare, swap);
    await mergeHelper(arrayRef, middle + 1, end, compare, swap);
    await merge(arrayRef, start, middle, end, compare, swap);
}

async function merge(arrayRef, start, middle, end, compare, swap) {
    let i = start;
    let j = middle + 1;

    while (i <= middle && j <= end) {
        await compare(i, j);
        if (arrayRef.current[i] <= arrayRef.current[j]) {
            i++;
        } else {
            for (let k = j; k > i; k--) {
                await swap(k, k - 1);
            }

        i++;
        middle++;
        j++;
        }
    }
}