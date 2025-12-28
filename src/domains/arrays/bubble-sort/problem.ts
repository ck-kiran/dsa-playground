import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { BubbleSortVisualizer } from './visualizer';
import { generateBubbleSortSteps } from './algorithm';

export const bubbleSortProblem: Problem = {
  id: 'bubble-sort-visualizer',
  title: 'Bubble Sort',
  difficulty: 'Easy',
  description: 'Learn the bubble sort algorithm step by step.',
};

export const bubbleSortModule: ProblemModule = {
  config: {
    id: 'bubble-sort-visualizer',
    title: 'Bubble Sort',
    difficulty: 'Easy',
    description: 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    constraints: [
      'In-place sorting algorithm',
      'Time Complexity: O(N²)',
      'Space Complexity: O(1)',
      'N = number of elements',
    ],
    defaultCode: `function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}`,
    defaultInputs: {
      array: [64, 34, 25, 12, 22, 11, 90],
    },
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateBubbleSortSteps(array);
  },
  Visualizer: BubbleSortVisualizer,
};