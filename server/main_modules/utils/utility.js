function getColors() {
    r = Math.floor(Math.random()*200) + 50;
    g = Math.floor(Math.random()*200) + 50;
    b = Math.floor(Math.random()*200) + 50;
    return {
      color: `rgb(${r}, ${g}, ${b}`,
      stroke: `rgb(${r-40}, ${g-40},${b-40})`
    }
  }
function quickSortRecursive(arr, start, end) {
  // Base case or terminating case
  if (start >= end) {
      return;
  }
  
  // Returns pivotIndex
  let index = partition(arr, start, end);
  
  // Recursively apply the same logic to the left and right subarrays
  quickSortRecursive(arr, start, index - 1);
  quickSortRecursive(arr, index + 1, end);
}
function partition(arr, start, end){
  // Taking the last element as the pivot
  const pivotValue = arr[end].mass;
  let pivotIndex = start; 
  for (let i = start; i < end; i++) {
      if (arr[i].mass < pivotValue) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
      }
  }
  
  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
  return pivotIndex;
};
  
module.exports = { getColors,quickSortRecursive }
