import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { RotateArrayVisualizer } from './visualizer';
import { generateRotateArraySteps } from './algorithm';

export const rotateArrayProblem: Problem = {
  id: 'rotate-array',
  title: 'Rotate Array',
  difficulty: 'Medium',
  description: 'Given an array, rotate the array to the right by k steps, where k is non-negative.',
};

export const rotateArrayModule: ProblemModule = {
  config: {
    id: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    description: 'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.',
    constraints: [
      '1 ≤ nums.length ≤ 10^5',
      '-2^31 ≤ nums[i] ≤ 2^31 - 1',
      '0 ≤ k ≤ 10^5',
    ],
    defaultCode: `function rotate(nums, k) {
  const n = nums.length;
  k = k % n;

  // Reverse entire array
  reverse(nums, 0, n - 1);

  // Reverse first k elements
  reverse(nums, 0, k - 1);

  // Reverse remaining elements
  reverse(nums, k, n - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}`,
    defaultInputs: {
      array: [1, 2, 3, 4, 5, 6, 7],
      k: 3,
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        description: 'Rotate one element at a time, k times',
        code: `function rotate(nums, k) {
  const n = nums.length;
  k = k % n;

  for (let i = 0; i < k; i++) {
    let previous = nums[n - 1];
    for (let j = 0; j < n; j++) {
      const temp = nums[j];
      nums[j] = previous;
      previous = temp;
    }
  }
}`,
        timeComplexity: 'O(N × K)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'extra-array',
        title: 'Using Extra Array',
        description: 'Create new array and place elements at correct positions',
        code: `function rotate(nums, k) {
  const n = nums.length;
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }

  for (let i = 0; i < n; i++) {
    nums[i] = result[i];
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'reverse',
        title: 'Reverse Method (Optimal)',
        description: 'Reverse entire array, then reverse first k and remaining elements',
        code: `function rotate(nums, k) {
  const n = nums.length;
  k = k % n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, k } = inputs as { array: number[]; k: number };
    return generateRotateArraySteps(array, k);
  },
  Visualizer: RotateArrayVisualizer,
};

export { RotateArrayVisualizer } from './visualizer';
export { generateRotateArraySteps } from './algorithm';
