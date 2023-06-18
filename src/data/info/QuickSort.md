## About
QuickSort is a divide-and-conquer, comparison-based sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted. The pivot selection and partitioning steps can be done in several different ways; the choice of specific implementation schemes greatly affects the algorithm's performance.

## Example
QuickSort is like organizing a closet. You first choose a random item (the pivot) then put everything smaller to the left and everything larger to the right. Now you have two smaller unsorted closets. You repeat this process on these smaller sections, again and again, until you're left with sections that only have one item and are therefore sorted.

## Time Complexity
The average and best-case time complexity is `O(n log n)`, where `n` is the number of items being sorted. However, in the worst case, when the input is already sorted or reverse sorted, it becomes `O(n²)`.

## Space Complexity
The worst-case space complexity is `O(n)`, but in the average case, it's `O(log n)` if a good pivot strategy is used.

## Code
```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        let pi = partition(arr, low, high);

        // Recursively sort elements before partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    // Pivot
    let pivot = arr[high];

    // Index of smaller element
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;

            // Swap arr[i] and arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Swap arr[i+1] and arr[high] (or pivot)
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    return i + 1;
}
```
