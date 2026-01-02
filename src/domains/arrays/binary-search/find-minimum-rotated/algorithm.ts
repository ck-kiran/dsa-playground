import type { Step } from '@/shared/types/step';

export const generateFindMinimumRotatedSteps = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = arr.length - 1;

  // Find rotation point for context
  const rotationPoint = findRotationPoint(arr);
  const actualMin = Math.min(...arr);

  // Initial step
  steps.push({
    array: [...arr],
    pointers: { left, right },
    message: `Finding minimum in rotated sorted array. Rotation point: ${rotationPoint}, Actual min: ${actualMin}`,
    highlightIndices: [],
    data: { rotationPoint, actualMin }
  });

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      pointers: { left, right, mid },
      message: `Check mid=${mid}: nums[${mid}]=${arr[mid]}, nums[${right}]=${arr[right]}`,
      highlightIndices: [mid, right],
      action: 'compare',
      data: {
        midValue: arr[mid],
        rightValue: arr[right],
        rotationPoint,
        actualMin
      }
    });

    if (arr[mid] > arr[right]) {
      // Minimum is in right half
      steps.push({
        array: [...arr],
        pointers: { left, right, mid },
        message: `nums[${mid}]=${arr[mid]} > nums[${right}]=${arr[right]}. Minimum is in right half.`,
        highlightIndices: Array.from({length: right - mid}, (_, i) => mid + 1 + i),
        action: 'search-right',
        data: {
          decision: 'right',
          reason: `${arr[mid]} > ${arr[right]}`,
          rotationPoint,
          actualMin
        }
      });
      left = mid + 1;
    } else {
      // Minimum is in left half (including mid)
      steps.push({
        array: [...arr],
        pointers: { left, right, mid },
        message: `nums[${mid}]=${arr[mid]} ≤ nums[${right}]=${arr[right]}. Minimum is in left half (including mid).`,
        highlightIndices: Array.from({length: mid - left + 1}, (_, i) => left + i),
        action: 'search-left',
        data: {
          decision: 'left',
          reason: `${arr[mid]} ≤ ${arr[right]}`,
          rotationPoint,
          actualMin
        }
      });
      right = mid;
    }

    // Show updated search range
    if (left < right) {
      steps.push({
        array: [...arr],
        pointers: { left, right },
        message: `Updated search range: [${left}, ${right}]`,
        highlightIndices: Array.from({length: right - left + 1}, (_, i) => left + i),
        data: { rotationPoint, actualMin, isRangeUpdate: true }
      });
    }
  }

  // Final result
  const result = arr[left];
  steps.push({
    array: [...arr],
    pointers: { left, right },
    message: `Found minimum: nums[${left}] = ${result}`,
    highlightIndices: [left],
    isComplete: true,
    action: 'found-minimum',
    data: { result, rotationPoint, actualMin, finalIndex: left }
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