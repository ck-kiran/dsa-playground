import type { Step } from '@/shared/types/step';

export const generateSingleElementSortedSteps = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = arr.length - 1;

  // Find the actual single element for reference
  const actualSingle = findActualSingle(arr);

  // Initial step
  steps.push({
    array: [...arr],
    pointers: { left, right },
    message: `Finding single element in sorted array where all elements appear twice except one`,
    highlightIndices: [],
    data: { actualSingle }
  });

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    const originalMid = mid;

    // Show mid calculation
    steps.push({
      array: [...arr],
      pointers: { left, right, mid: originalMid },
      message: `Calculate mid = ${originalMid}. Check if mid is even for pair analysis.`,
      highlightIndices: [originalMid],
      action: 'calculate-mid',
      data: { originalMid, actualSingle }
    });

    // Ensure mid is even for pair checking
    if (mid % 2 === 1) {
      mid--;
      steps.push({
        array: [...arr],
        pointers: { left, right, mid },
        message: `Mid ${originalMid} is odd. Adjust to even index ${mid} for pair checking.`,
        highlightIndices: [mid],
        action: 'adjust-mid',
        data: { originalMid, adjustedMid: mid, actualSingle }
      });
    }

    // Show the pair being checked
    const pairValue1 = arr[mid];
    const pairValue2 = mid + 1 < arr.length ? arr[mid + 1] : undefined;

    steps.push({
      array: [...arr],
      pointers: { left, right, mid },
      message: `Check pair: nums[${mid}]=${pairValue1}, nums[${mid + 1}]=${pairValue2}`,
      highlightIndices: [mid, mid + 1],
      action: 'check-pair',
      data: {
        pairIndex1: mid,
        pairIndex2: mid + 1,
        pairValue1,
        pairValue2,
        actualSingle
      }
    });

    // Check if pair is intact
    if (arr[mid] === arr[mid + 1]) {
      // Pair is intact, single element is on the right
      steps.push({
        array: [...arr],
        pointers: { left, right, mid },
        message: `Pair is intact (${pairValue1} = ${pairValue2}). Single element must be on the right side.`,
        highlightIndices: Array.from({length: Math.max(0, right - (mid + 1))}, (_, i) => mid + 2 + i),
        action: 'search-right',
        data: {
          decision: 'right',
          reason: 'pair intact',
          pairValue1,
          pairValue2,
          actualSingle
        }
      });
      left = mid + 2;
    } else {
      // Pair is broken, single element is on the left
      steps.push({
        array: [...arr],
        pointers: { left, right, mid },
        message: `Pair is broken (${pairValue1} ≠ ${pairValue2}). Single element must be on the left side.`,
        highlightIndices: Array.from({length: mid - left + 1}, (_, i) => left + i),
        action: 'search-left',
        data: {
          decision: 'left',
          reason: 'pair broken',
          pairValue1,
          pairValue2,
          actualSingle
        }
      });
      right = mid;
    }

    // Show updated range
    if (left < right) {
      steps.push({
        array: [...arr],
        pointers: { left, right },
        message: `Updated search range: [${left}, ${right}]`,
        highlightIndices: Array.from({length: right - left + 1}, (_, i) => left + i),
        data: { actualSingle, isRangeUpdate: true }
      });
    }
  }

  // Final result
  const result = arr[left];
  steps.push({
    array: [...arr],
    pointers: { left, right },
    message: `Found single element: nums[${left}] = ${result}`,
    highlightIndices: [left],
    isComplete: true,
    action: 'found-single',
    data: { result, actualSingle, finalIndex: left }
  });

  return steps;
};

function findActualSingle(arr: number[]): number {
  const counts = new Map();
  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }
  for (const [num, count] of counts) {
    if (count === 1) return num;
  }
  return -1;
}