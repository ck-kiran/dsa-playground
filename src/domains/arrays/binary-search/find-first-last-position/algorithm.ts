import type { Step } from '@/shared/types/step';

export const generateFindFirstLastPositionSteps = (arr: number[], target: number): Step[] => {
  const steps: Step[] = [];

  // Initial step
  steps.push({
    array: [...arr],
    target,
    message: `Finding first and last position of ${target} in sorted array`,
    highlightIndices: []
  });

  // Step 1: Find first position
  steps.push({
    array: [...arr],
    target,
    message: `Step 1: Finding first position of ${target}`,
    highlightIndices: [],
    action: 'find-first-start'
  });

  const first = findFirstPosition(arr, target, steps);

  // Step 2: Find last position
  steps.push({
    array: [...arr],
    target,
    message: `Step 2: Finding last position of ${target}`,
    highlightIndices: [],
    action: 'find-last-start',
    data: { first }
  });

  const last = findLastPosition(arr, target, steps, first);

  // Final result
  steps.push({
    array: [...arr],
    target,
    message: `Result: [${first}, ${last}] - Range from index ${first} to ${last}`,
    highlightIndices: first !== -1 && last !== -1 ? Array.from({length: last - first + 1}, (_, i) => first + i) : [],
    isComplete: true,
    data: { first, last, result: [first, last] }
  });

  return steps;
};

function findFirstPosition(arr: number[], target: number, steps: Step[]): number {
  let left = 0, right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      target,
      pointers: { left, right, mid },
      message: `Check mid=${mid}: arr[${mid}]=${arr[mid]} vs target=${target}`,
      highlightIndices: [mid],
      action: 'find-first',
      data: { currentValue: arr[mid], searchType: 'first' }
    });

    if (arr[mid] === target) {
      result = mid;
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Found target at ${mid}! Continue searching left for first occurrence.`,
        highlightIndices: [mid],
        action: 'found-target-first',
        data: { currentValue: arr[mid], result, searchType: 'first' }
      });
      right = mid - 1; // Continue searching left
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `arr[${mid}]=${arr[mid]} < ${target}. Search right half.`,
        highlightIndices: [mid],
        action: 'search-right'
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `arr[${mid}]=${arr[mid]} > ${target}. Search left half.`,
        highlightIndices: [mid],
        action: 'search-left'
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    target,
    message: `First position search complete. First position: ${result}`,
    highlightIndices: result !== -1 ? [result] : [],
    data: { first: result, searchType: 'first' }
  });

  return result;
}

function findLastPosition(arr: number[], target: number, steps: Step[], first: number): number {
  let left = 0, right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      target,
      pointers: { left, right, mid },
      message: `Check mid=${mid}: arr[${mid}]=${arr[mid]} vs target=${target}`,
      highlightIndices: [mid],
      action: 'find-last',
      data: { currentValue: arr[mid], searchType: 'last', first }
    });

    if (arr[mid] === target) {
      result = mid;
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `Found target at ${mid}! Continue searching right for last occurrence.`,
        highlightIndices: [mid],
        action: 'found-target-last',
        data: { currentValue: arr[mid], result, searchType: 'last', first }
      });
      left = mid + 1; // Continue searching right
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `arr[${mid}]=${arr[mid]} < ${target}. Search right half.`,
        highlightIndices: [mid],
        action: 'search-right'
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        target,
        pointers: { left, right, mid },
        message: `arr[${mid}]=${arr[mid]} > ${target}. Search left half.`,
        highlightIndices: [mid],
        action: 'search-left'
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    target,
    message: `Last position search complete. Last position: ${result}`,
    highlightIndices: result !== -1 ? [result] : [],
    data: { last: result, first, searchType: 'last' }
  });

  return result;
}