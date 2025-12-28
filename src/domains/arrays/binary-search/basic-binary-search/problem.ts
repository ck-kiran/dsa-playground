import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { BinarySearchVisualizer } from './visualizer';
import { generateBinarySearchSteps } from './algorithm';

export const basicBinarySearchProblem: Problem = {
  id: 'binary-search-visualizer',
  title: 'Basic Binary Search',
  difficulty: 'Easy',
  description: 'Find target element in sorted array using binary search.',
};

export const basicBinarySearchModule: ProblemModule = {
  config: {
    id: 'binary-search-visualizer',
    title: 'Basic Binary Search',
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
    approaches: [
      {
        id: 'optimized',
        title: 'Optimized Binary Search',
        description: 'Standard iterative binary search with optimal performance',
        code: `function binarySearch(arr, target) {
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
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'recursive',
        title: 'Recursive Binary Search',
        description: 'Recursive implementation of binary search',
        code: `function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid;
  }

  if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, right);
  } else {
    return binarySearch(arr, target, left, mid - 1);
  }
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(log N)'
      },
      {
        id: 'brute-force',
        title: 'Linear Search (Brute Force)',
        description: 'Simple linear search approach for comparison',
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateBinarySearchSteps(array, target);
  },
  Visualizer: BinarySearchVisualizer,
};