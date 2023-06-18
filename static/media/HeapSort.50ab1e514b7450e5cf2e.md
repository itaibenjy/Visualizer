## About
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. The idea is to build a Binary Heap from the given array. The Binary Heap is a Complete Binary Tree where items are stored in a special order such that the value of a parent node is greater (or smaller) than the values of its two children nodes. The biggest (or smallest) item is stored at the root of the heap. Once the heap is built, the root element (maximum or minimum depending on the type of heap) is swapped with the last element of the array and `heapify` process is repeated for the remaining elements.

## Example
Heap sort is like sorting books by using a special bookshelf (a binary heap) where a bigger book always weighs down smaller books underneath it. You keep removing the biggest book (the root of the heap) and placing it into the sorted section, then adjusting the shelf so the biggest of the remaining books moves to the top. You repeat this process until you have no more books on the special shelf and all books are in the sorted section.

## Time Complexity
The worst-case, average, and best-case time complexity are all `O(n log n)`, where `n` is the number of items being sorted.

## Space Complexity
Heap Sort is an in-place sorting algorithm and has a space complexity of `O(1)`.

## Code
```javascript
function heapSort(arr) {
    let len = arr.length;

    // Build max heap
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--)
        heapify(arr, len, i);

    // Heap sort
    for (let i = len - 1; i >= 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Heapify root element
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, len, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // If left child is larger than root
    if (left < len && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than largest so far
    if (right < len && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    if (largest !== i) {
        swap(arr, i, largest);

        // Recursively heapify the affected sub-tree
        heapify(arr, len, largest);
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```
