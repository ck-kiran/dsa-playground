import type { Step } from '@/shared/types/step';

export const generateValidMountainArraySteps = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const n = arr.length;

  // Initial step
  steps.push({
    array: [...arr],
    pointers: {},
    message: 'Check if array forms a valid mountain (strictly increasing then strictly decreasing)',
    highlightIndices: [],
    data: { originalArray: [...arr] }
  });

  // Early exit conditions
  if (n < 3) {
    steps.push({
      array: [...arr],
      pointers: {},
      message: `Array length is ${n}. Minimum length for mountain is 3.`,
      highlightIndices: [],
      isComplete: true,
      data: { result: false, reason: 'Too short' }
    });
    return steps;
  }

  // Climb up from left
  let left = 0;

  steps.push({
    array: [...arr],
    pointers: { left },
    message: 'Start climbing from left. Look for strictly increasing sequence.',
    highlightIndices: [left],
    action: 'climb-up-start'
  });

  while (left < n - 1 && arr[left] < arr[left + 1]) {
    steps.push({
      array: [...arr],
      pointers: { left },
      message: `arr[${left}]=${arr[left]} < arr[${left + 1}]=${arr[left + 1]}. Continue climbing up.`,
      highlightIndices: [left, left + 1],
      action: 'climbing-up',
      data: { currentValue: arr[left], nextValue: arr[left + 1] }
    });

    left++;
  }

  steps.push({
    array: [...arr],
    pointers: { left },
    message: `Stopped at index ${left}. This should be the peak.`,
    highlightIndices: [left],
    action: 'peak-found',
    data: { peakIndex: left, peakValue: arr[left] }
  });

  // Check if we reached a valid peak
  if (left === 0 || left === n - 1) {
    const reason = left === 0 ? 'No ascending part' : 'No descending part';
    steps.push({
      array: [...arr],
      pointers: { left },
      message: `Invalid: Peak at ${left === 0 ? 'start' : 'end'} of array. ${reason}.`,
      highlightIndices: [left],
      isComplete: true,
      data: { result: false, reason, peakIndex: left }
    });
    return steps;
  }

  // Climb down from peak
  steps.push({
    array: [...arr],
    pointers: { left },
    message: `Now check descending part from peak at index ${left}.`,
    highlightIndices: [left],
    action: 'climb-down-start'
  });

  while (left < n - 1 && arr[left] > arr[left + 1]) {
    steps.push({
      array: [...arr],
      pointers: { left },
      message: `arr[${left}]=${arr[left]} > arr[${left + 1}]=${arr[left + 1]}. Continue climbing down.`,
      highlightIndices: [left, left + 1],
      action: 'climbing-down',
      data: { currentValue: arr[left], nextValue: arr[left + 1] }
    });

    left++;
  }

  steps.push({
    array: [...arr],
    pointers: { left },
    message: `Reached index ${left}. Expected to reach end (${n - 1}).`,
    highlightIndices: [left],
    action: 'descent-complete'
  });

  // Check if we reached the end
  const isValidMountain = left === n - 1;

  steps.push({
    array: [...arr],
    pointers: { left },
    message: isValidMountain
      ? `Valid mountain! Strictly increasing then strictly decreasing.`
      : `Not a valid mountain. Stopped at index ${left}, but array ends at ${n - 1}.`,
    highlightIndices: isValidMountain ? Array.from({ length: n }, (_, i) => i) : [left],
    isComplete: true,
    data: {
      result: isValidMountain,
      reason: isValidMountain ? 'Valid mountain' : 'Did not descend to end',
      finalIndex: left
    }
  });

  return steps;
};
