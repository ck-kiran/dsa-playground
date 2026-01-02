import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { DuplicateZerosVisualizer } from './visualizer';
import { generateDuplicateZerosSteps } from './algorithm';

export const duplicateZerosProblem: Problem = {
  id: 'duplicate-zeros',
  title: 'Duplicate Zeros',
  difficulty: 'Easy',
  description: 'Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.',
};

export const duplicateZerosModule: ProblemModule = {
  config: {
    id: 'duplicate-zeros',
    title: 'Duplicate Zeros',
    difficulty: 'Easy',
    description: 'Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right. Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.',
    constraints: [
      '1 ≤ arr.length ≤ 10^4',
      '0 ≤ arr[i] ≤ 9',
    ],
    defaultCode: `function duplicateZeros(arr) {
  let possibleDups = 0;
  let length = arr.length - 1;

  // Count zeros that can be duplicated
  for (let left = 0; left <= length - possibleDups; left++) {
    if (arr[left] === 0) {
      // Edge case: single zero at the end
      if (left === length - possibleDups) {
        arr[length] = 0;
        length--;
        break;
      }
      possibleDups++;
    }
  }

  // Start backwards from last element
  let last = length - possibleDups;

  // Copy elements from back
  for (let i = last; i >= 0; i--) {
    if (arr[i] === 0) {
      arr[i + possibleDups] = 0;
      possibleDups--;
      arr[i + possibleDups] = 0;
    } else {
      arr[i + possibleDups] = arr[i];
    }
  }
}`,
    defaultInputs: {
      array: [1, 0, 2, 3, 0, 4, 5, 0],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Extra Space)',
        description: 'Create new array and copy elements, duplicating zeros',
        code: `function duplicateZeros(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (result.length >= arr.length) break;

    result.push(arr[i]);

    if (arr[i] === 0 && result.length < arr.length) {
      result.push(0);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = result[i];
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'two-pass',
        title: 'Two-Pass (Optimal)',
        description: 'Count zeros, then process from right to left',
        code: `function duplicateZeros(arr) {
  let possibleDups = 0;
  let length = arr.length - 1;

  // Count zeros that can be duplicated
  for (let left = 0; left <= length - possibleDups; left++) {
    if (arr[left] === 0) {
      if (left === length - possibleDups) {
        arr[length] = 0;
        length--;
        break;
      }
      possibleDups++;
    }
  }

  // Start backwards from last element
  let last = length - possibleDups;

  for (let i = last; i >= 0; i--) {
    if (arr[i] === 0) {
      arr[i + possibleDups] = 0;
      possibleDups--;
      arr[i + possibleDups] = 0;
    } else {
      arr[i + possibleDups] = arr[i];
    }
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateDuplicateZerosSteps(array);
  },
  Visualizer: DuplicateZerosVisualizer,
};

export { DuplicateZerosVisualizer } from './visualizer';
export { generateDuplicateZerosSteps } from './algorithm';
