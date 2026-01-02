import type { Step } from '@/shared/types/step';

function reverseArray(arr: number[], start: number, end: number, steps: Step[], message: string) {
  const startIdx = start;
  const endIdx = end;

  steps.push({
    array: [...arr],
    pointers: { start, end },
    message: `${message} (indices ${startIdx} to ${endIdx})`,
    highlightIndices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
    action: 'reverse-start'
  });

  while (start < end) {
    steps.push({
      array: [...arr],
      pointers: { start, end },
      message: `Swap elements at indices ${start} and ${end}: ${arr[start]} ↔ ${arr[end]}`,
      highlightIndices: [start, end],
      action: 'swap',
      data: { index1: start, index2: end, value1: arr[start], value2: arr[end] }
    });

    [arr[start], arr[end]] = [arr[end], arr[start]];

    steps.push({
      array: [...arr],
      pointers: { start, end },
      message: `After swap: [${start}]=${arr[start]}, [${end}]=${arr[end]}`,
      highlightIndices: [start, end],
      action: 'swapped'
    });

    start++;
    end--;
  }
}

export const generateRotateArraySteps = (nums: number[], k: number): Step[] => {
  const steps: Step[] = [];
  const arr = [...nums];
  const n = arr.length;
  const actualK = k % n; // Handle k > n

  // Initial step
  steps.push({
    array: [...arr],
    pointers: {},
    message: `Rotate array right by k=${k} steps (actual: ${actualK} after modulo)`,
    highlightIndices: [],
    data: { originalArray: [...nums], k, actualK }
  });

  if (actualK === 0) {
    steps.push({
      array: [...arr],
      pointers: {},
      message: 'No rotation needed (k is 0 or multiple of array length)',
      isComplete: true,
      data: { result: arr }
    });
    return steps;
  }

  // Step 1: Reverse entire array
  steps.push({
    array: [...arr],
    pointers: {},
    message: 'Step 1: Reverse the entire array',
    highlightIndices: [],
    action: 'phase-1'
  });

  reverseArray(arr, 0, n - 1, steps, 'Reversing entire array');

  steps.push({
    array: [...arr],
    pointers: {},
    message: `After reversing entire array: [${arr.join(', ')}]`,
    highlightIndices: Array.from({ length: n }, (_, i) => i),
    action: 'phase-1-complete'
  });

  // Step 2: Reverse first k elements
  steps.push({
    array: [...arr],
    pointers: {},
    message: `Step 2: Reverse first ${actualK} elements`,
    highlightIndices: [],
    action: 'phase-2'
  });

  reverseArray(arr, 0, actualK - 1, steps, `Reversing first ${actualK} elements`);

  steps.push({
    array: [...arr],
    pointers: {},
    message: `After reversing first ${actualK} elements: [${arr.join(', ')}]`,
    highlightIndices: Array.from({ length: actualK }, (_, i) => i),
    action: 'phase-2-complete'
  });

  // Step 3: Reverse remaining elements
  steps.push({
    array: [...arr],
    pointers: {},
    message: `Step 3: Reverse remaining ${n - actualK} elements`,
    highlightIndices: [],
    action: 'phase-3'
  });

  reverseArray(arr, actualK, n - 1, steps, `Reversing elements from ${actualK} to ${n - 1}`);

  // Final step
  steps.push({
    array: [...arr],
    pointers: {},
    message: `Array rotated right by ${actualK} positions!`,
    highlightIndices: Array.from({ length: n }, (_, i) => i),
    isComplete: true,
    data: { result: arr, originalArray: [...nums], k: actualK }
  });

  return steps;
};
