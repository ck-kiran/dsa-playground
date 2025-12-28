import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { BinarySearchVisualizer } from './visualizer';
import { generateBinarySearchSteps } from './algorithm';

export const binarySearchProblem: Problem = {
  id: 'binary-search-visualizer',
  title: 'Binary Search',
  difficulty: 'Easy',
  description: 'Visualize how binary search divides the search space.',
};

export const binarySearchModule: ProblemModule = {
  config: {
    id: 'binary-search-visualizer',
    title: 'Binary Search',
    difficulty: 'Easy',
    description: 'Given a sorted array of integers and a target value, return the index of the target if it is present in the array. If it is not present, return -1.',
    constraints: [
      'Array is sorted in ascending order',
      'Time Complexity: O(log N)',
      'Space Complexity: O(1)',
    ],
    defaultCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
    defaultInputs: {
      array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      target: 23,
    },
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateBinarySearchSteps(array, target);
  },
  Visualizer: BinarySearchVisualizer,
};

export { BinarySearchVisualizer } from './visualizer';
export { generateBinarySearchSteps } from './algorithm';