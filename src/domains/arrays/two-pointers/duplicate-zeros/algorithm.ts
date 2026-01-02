import type { Step } from '@/shared/types/step';

export const generateDuplicateZerosSteps = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const workingArray = [...arr];
  const n = workingArray.length;

  // Initial step
  steps.push({
    array: [...workingArray],
    pointers: {},
    message: 'Duplicate each zero, shifting remaining elements to the right',
    highlightIndices: [],
    data: { originalArray: [...arr] }
  });

  // Count zeros to determine how many elements will be shifted off
  let possibleDups = 0;
  let length = n - 1;

  // Step 1: Count zeros
  for (let left = 0; left <= length - possibleDups; left++) {
    if (workingArray[left] === 0) {
      if (left === length - possibleDups) {
        workingArray[length] = 0;
        length--;
        break;
      }
      possibleDups++;

      steps.push({
        array: [...workingArray],
        pointers: { left },
        message: `Found zero at index ${left}. Count of zeros to duplicate: ${possibleDups}`,
        highlightIndices: [left],
        action: 'count-zero',
        data: { possibleDups, left }
      });
    }
  }

  // Step 2: Process from right to left, duplicating zeros
  let left = length - possibleDups;

  steps.push({
    array: [...workingArray],
    pointers: { left, right: length },
    message: `Start duplicating from index ${left}, writing to index ${length}`,
    highlightIndices: [],
    action: 'start-duplicate'
  });

  for (let right = length; left >= 0; left--, right--) {
    steps.push({
      array: [...workingArray],
      pointers: { left, right },
      message: `Processing element at index ${left}: ${workingArray[left]}`,
      highlightIndices: [left, right],
      action: 'compare'
    });

    if (workingArray[left] !== 0) {
      // Copy non-zero element
      workingArray[right] = workingArray[left];

      steps.push({
        array: [...workingArray],
        pointers: { left, right },
        message: `Copy ${workingArray[left]} from index ${left} to index ${right}`,
        highlightIndices: [left, right],
        action: 'copy',
        data: { value: workingArray[left], from: left, to: right }
      });
    } else {
      // Duplicate the zero
      workingArray[right] = 0;
      right--;
      workingArray[right] = 0;

      steps.push({
        array: [...workingArray],
        pointers: { left, right },
        message: `Duplicate zero: write 0 at indices ${right} and ${right + 1}`,
        highlightIndices: [left, right, right + 1],
        action: 'duplicate-zero',
        data: { position: left, duplicatedAt: [right, right + 1] }
      });
    }
  }

  // Final step
  steps.push({
    array: [...workingArray],
    pointers: {},
    message: 'All zeros duplicated! Array modified in-place.',
    highlightIndices: Array.from({ length: n }, (_, i) => i),
    isComplete: true,
    data: { result: workingArray, originalArray: [...arr] }
  });

  return steps;
};
