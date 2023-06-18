## About
Selection Sort is a simple comparison-based sorting algorithm. The algorithm divides the input into a sorted and an unsorted region. The sorted region starts empty while the unsorted region contains all the elements. It repeatedly selects the smallest (or largest, depending on the ordering) element from the unsorted region and moves it to the end of the sorted region. This process continues until the unsorted region is empty and the sorted region contains all elements.

## Example
Imagine you have a hand of playing cards. The way you might sort them is by repeatedly finding the smallest card and moving it to the correct position in your hand, then finding the next smallest card and doing the same, until all cards are sorted. That's how selection sort works. It repeatedly finds the smallest element from the unsorted part of the list and puts it at the beginning of the unsorted list, moving the boundary between the sorted and unsorted parts one element to the right each time.

## Time Complexity
The worst-case, average, and best-case time complexity are all `O(n²)`, where `n` is the number of items being sorted.

## Space Complexity
Selection Sort is an in-place sorting algorithm and has a space complexity of `O(1)`.

## Code
```javascript
function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            // Swap
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}
```
