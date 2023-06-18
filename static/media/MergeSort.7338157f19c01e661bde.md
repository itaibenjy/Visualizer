## About
Merge Sort is a divide-and-conquer, comparison-based sorting algorithm. It works by dividing the unsorted list into n sublists, each containing one element (a list of one element is considered sorted), and repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.

## Example
Merge sort is like organizing a bookshelf by splitting the books into two piles, then splitting those piles into two more piles, until you only have individual books. Then, you put two books together, sorting them by size. You keep putting together (merging) and sorting the piles of books until you have one big, sorted pile.

## Time Complexity
The worst-case, average and best-case time complexity are all `O(n log n)`, where `n` is the number of items being sorted.

## Space Complexity
The space complexity of Merge Sort is `O(n)` because it requires additional space to hold the auxiliary arrays.

## Code
```javascript
function mergeSort(arr) {
    if (arr.length < 2)
        return arr;

    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [], l = 0, r = 0;

    while (l < left.length && r < right.length) {
        if (left[l] < right[r]) {
            result.push(left[l++]);
        } else {
            result.push(right[r++]);
        }
    }

    // Remaining part needs to be added to the result
    return result.concat(left.slice(l)).concat(right.slice(r));
}
```
