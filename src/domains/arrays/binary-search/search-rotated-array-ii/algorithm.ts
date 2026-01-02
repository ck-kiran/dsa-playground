import type { Step } from '@/shared/types/step';

export const generateSearchRotatedArrayIISteps = (arr: number[], target: number): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = arr.length - 1;

  // Find rotation point and duplicates for context
  const rotationPoint = findRotationPoint(arr);
  const duplicateIndices = findDuplicates(arr);

  // Initial step
  steps.push({
    array: [...arr],
    target,
    pointers: { left, right },
    message: `Searching for ${target} in rotated sorted array with duplicates`,
    highlightIndices: [],
    data: { rotationPoint, duplicateIndices, targetExists: arr.includes(target) }
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      target,
      pointers: { left, right, mid },
      message: `Check mid=${mid}: arr[${mid}]=${arr[mid]} vs target=${target}`,
      highlightIndices: [mid],
      action: 'check-mid',
      data: {
        currentValue: arr[mid],
        leftValue: arr[left],
        rightValue: arr[right],
        rotationPoint,
        duplicateIndices
      }
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Found target ${target} at index ${mid}!`,
        highlightIndices: [mid],
        isComplete: true,
        action: 'found',
        data: { result: true, foundIndex: mid, rotationPoint, duplicateIndices }
      });
      return steps;
    }

    // Handle duplicates at boundaries - the key difference from original problem
    if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Duplicates detected: arr[${left}]=${arr[left]}, arr[${mid}]=${arr[mid]}, arr[${right}]=${arr[right]}. Shrink both ends.`,
        highlightIndices: [left, mid, right],
        action: 'handle-duplicates',
        data: {
          duplicateValue: arr[mid],
          leftValue: arr[left],
          rightValue: arr[right],
          rotationPoint,
          duplicateIndices
        }
      });
      left++;
      right--;
    } else if (arr[left] <= arr[mid]) {
      // Left half is sorted
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Left half [${left}..${mid}] is sorted: ${arr[left]} ≤ ${arr[mid]}`,
        highlightIndices: Array.from({length: mid - left + 1}, (_, i) => left + i),
        action: 'left-sorted',
        data: { sortedHalf: 'left', rotationPoint, duplicateIndices }
      });

      if (arr[left] <= target && target < arr[mid]) {
        steps.push({
          array: [...arr],
          target,
          pointers: { left, right, mid },
          message: `Target ${target} is in sorted left half: ${arr[left]} ≤ ${target} < ${arr[mid]}`,
          highlightIndices: Array.from({length: mid - left}, (_, i) => left + i),
          action: 'search-left',
          data: { direction: 'left', rotationPoint, duplicateIndices }
        });
        right = mid - 1;
      } else {
        steps.push({
          array: [...arr],
          target,
          pointers: { left, right, mid },
          message: `Target ${target} is NOT in left half. Search right half.`,
          highlightIndices: Array.from({length: right - mid}, (_, i) => mid + 1 + i),
          action: 'search-right',
          data: { direction: 'right', rotationPoint, duplicateIndices }
        });
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Right half [${mid}..${right}] is sorted: ${arr[mid]} < ${arr[left]}`,
        highlightIndices: Array.from({length: right - mid + 1}, (_, i) => mid + i),
        action: 'right-sorted',
        data: { sortedHalf: 'right', rotationPoint, duplicateIndices }
      });

      if (arr[mid] < target && target <= arr[right]) {
        steps.push({
          array: [...arr],
          target,
          pointers: { left, right, mid },
          message: `Target ${target} is in sorted right half: ${arr[mid]} < ${target} ≤ ${arr[right]}`,
          highlightIndices: Array.from({length: right - mid}, (_, i) => mid + 1 + i),
          action: 'search-right',
          data: { direction: 'right', rotationPoint, duplicateIndices }
        });
        left = mid + 1;
      } else {
        steps.push({
          array: [...arr],
          target,
          pointers: { left, right, mid },
          message: `Target ${target} is NOT in right half. Search left half.`,
          highlightIndices: Array.from({length: mid - left}, (_, i) => left + i),
          action: 'search-left',
          data: { direction: 'left', rotationPoint, duplicateIndices }
        });
        right = mid - 1;
      }
    }

    // Show updated range
    if (left <= right) {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right },
        message: `Updated search range: [${left}, ${right}]`,
        highlightIndices: Array.from({length: Math.max(0, right - left + 1)}, (_, i) => left + i),
        data: { rotationPoint, duplicateIndices, isRangeUpdate: true }
      });
    }
  }

  // Target not found
  steps.push({
    array: [...arr],
    target,
    pointers: { left, right },
    message: `Target ${target} not found in array. Returning false.`,
    highlightIndices: [],
    isComplete: true,
    data: { result: false, rotationPoint, duplicateIndices }
  });

  return steps;
};

function findRotationPoint(arr: number[]): number {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return i;
    }
  }
  return 0; // No rotation
}

function findDuplicates(arr: number[]): number[][] {
  const duplicates: number[][] = [];
  const seen = new Map<number, number[]>();

  arr.forEach((val, idx) => {
    if (!seen.has(val)) {
      seen.set(val, []);
    }
    seen.get(val)!.push(idx);
  });

  seen.forEach((indices, val) => {
    if (indices.length > 1) {
      duplicates.push(indices);
    }
  });

  return duplicates;
}