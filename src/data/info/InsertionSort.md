## About
Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. The algorithm works by taking one element from the list at a time and inserting it in its correct position in the new sorted list. In arrays, the new list and the remaining elements can share the array's space, but insertion is expensive, requiring shifting all following elements over by one.

## Example
Let's go back to the hand of playing cards. Another way you might sort them is by taking one card at a time and inserting it into the correct position among the cards you've already sorted, until all cards are sorted. This is how insertion sort works. It builds a sorted list one element at a time by repeatedly taking the next unsorted element and inserting it into the correct position in the sorted part of the list.

## Time Complexity
The best-case time complexity is `O(n)`, when the input is already sorted. The worst-case and average time complexity are both `O(n²)`, where `n` is the number of items being sorted.

## Space Complexity
Insertion Sort is an in-place sorting algorithm and has a space complexity of `O(1)`.

## Code
```javascript
function insertionSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}
```
