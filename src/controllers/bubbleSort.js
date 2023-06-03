

export default async function BubbleSort(arrayRef, compare, swap) {
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
