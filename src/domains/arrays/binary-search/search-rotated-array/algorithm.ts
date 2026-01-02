import type { Step } from '@/shared/types/step';

export const generateSearchRotatedArraySteps = (arr: number[], target: number): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = arr.length - 1;

  // Find rotation point for visualization
  const rotationPoint = findRotationPoint(arr);

  // Initial step
  steps.push({
    array: [...arr],
    target,
    pointers: { left, right },
    message: `Searching for ${target} in rotated sorted array. Rotation point: ${rotationPoint}`,
    highlightIndices: [],
    data: { rotationPoint }
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
      data: { currentValue: arr[mid], rotationPoint }
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
        data: { result: mid, rotationPoint }
      });
      return steps;
    }

    // Determine which half is sorted
    if (arr[left] <= arr[mid]) {
      // Left half is sorted
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Left half [${left}..${mid}] is sorted: ${arr[left]} ≤ ${arr[mid]}`,
        highlightIndices: Array.from({length: mid - left + 1}, (_, i) => left + i),
        action: 'left-sorted',
        data: { sortedHalf: 'left', rotationPoint }
      });

      if (arr[left] <= target && target < arr[mid]) {
        steps.push({
          array: [...arr],
          target,
          pointers: { left, right, mid },
          message: `Target ${target} is in sorted left half: ${arr[left]} ≤ ${target} < ${arr[mid]}`,
          highlightIndices: Array.from({length: mid - left}, (_, i) => left + i),
          action: 'search-left',
          data: { direction: 'left', rotationPoint }
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
          data: { direction: 'right', rotationPoint }
        });
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Right half [${mid}..${right}] is sorted: ${arr[mid]} < ${arr[left]} (left has larger values)`,
        highlightIndices: Array.from({length: right - mid + 1}, (_, i) => mid + i),
        action: 'right-sorted',
        data: { sortedHalf: 'right', rotationPoint }
      });

      if (arr[mid] < target && target <= arr[right]) {
        steps.push({
          array: [...arr],
          target,
          pointers: { left, right, mid },
          message: `Target ${target} is in sorted right half: ${arr[mid]} < ${target} ≤ ${arr[right]}`,
          highlightIndices: Array.from({length: right - mid}, (_, i) => mid + 1 + i),
          action: 'search-right',
          data: { direction: 'right', rotationPoint }
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
          data: { direction: 'left', rotationPoint }
        });
        right = mid - 1;
      }
    }
  }

  // Target not found
  steps.push({
    array: [...arr],
    target,
    pointers: { left, right },
    message: `Target ${target} not found in array. Returning -1.`,
    highlightIndices: [],
    isComplete: true,
    data: { result: -1, rotationPoint }
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