## About
Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly swapping the adjacent elements if they are in wrong order. The algorithm keeps passing through the list until it has made a pass without any swaps, at which point it stops because the list is sorted. This algorithm gets its name from the way smaller elements "bubble" to the top of the list. It's generally best for small lists or lists that are already mostly sorted.

## Example
Imagine you have a line of dancers, and you want to order them by height, but you're only allowed to swap two dancers next to each other. This is essentially what bubble sort does. It compares two elements at a time, starting from the beginning of the array, and swaps them if they're out of order. This process continues until it can go through the entire list without any swaps.

## Time Complexity
The worst-case and average time complexity are both `O(n²)`, where n is the number of items being sorted. The best case, when the input is already sorted, is `O(n)`.

## Space Complexity
Bubble Sort is an in-place sorting algorithm and has a space complexity of `O(1)`.

## Code
```javascript
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
```
