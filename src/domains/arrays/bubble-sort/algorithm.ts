import type { Step } from '@/shared/types/step';

export function generateBubbleSortSteps(array: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...array]; // Don't mutate original array
  const n = arr.length;

  // Add initial state
  steps.push({
    array: [...arr],
    pointers: {},
    message: 'Starting bubble sort...',
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison step
      steps.push({
        array: [...arr],
        pointers: { j, next: j + 1 },
        highlightIndices: [j, j + 1],
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Add swap step
        steps.push({
          array: [...arr],
          pointers: { j, next: j + 1 },
          highlightIndices: [j, j + 1],
          message: `Swapped ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }
  }

  // Add final state
  steps.push({
    array: [...arr],
    pointers: {},
    message: 'Bubble sort completed!',
  });

  return steps;
}