import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { SingleElementSortedVisualizer } from './visualizer';
import { generateSingleElementSortedSteps } from './algorithm';

export const singleElementInSortedArrayProblem: Problem = {
  id: 'single-element-in-sorted-array',
  title: 'Single Element in a Sorted Array',
  difficulty: 'Medium',
  description: 'You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element that appears only once.',
};

export const singleElementInSortedArrayModule: ProblemModule = {
  config: {
    id: 'single-element-in-sorted-array',
    title: 'Single Element in a Sorted Array',
    difficulty: 'Medium',
    description: 'You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find that single one. Your solution must run in O(log n) time and O(1) space.',
    constraints: [
      '1 ≤ nums.length ≤ 10^5',
      '0 ≤ nums[i] ≤ 10^5',
      'Every element appears twice except one',
      'Array is sorted',
    ],
    defaultCode: `function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Ensure mid is even for pair checking
    if (mid % 2 === 1) {
      mid--;
    }

    // Check if pair is intact
    if (nums[mid] === nums[mid + 1]) {
      // Pair is intact, single element is on the right
      left = mid + 2;
    } else {
      // Pair is broken, single element is on the left
      right = mid;
    }
  }

  return nums[left];
}`,
    defaultInputs: {
      array: [1, 1, 2, 3, 3, 4, 4, 8, 8],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        description: 'Check each element to find the single one',
        code: `function singleNonDuplicate(nums) {
  for (let i = 0; i < nums.length; i += 2) {
    if (i === nums.length - 1 || nums[i] !== nums[i + 1]) {
      return nums[i];
    }
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'xor-approach',
        title: 'XOR Approach',
        description: 'Use XOR to cancel out pairs',
        code: `function singleNonDuplicate(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (Optimal)',
        description: 'Use binary search to find the single element',
        code: `function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Ensure mid is even for pair checking
    if (mid % 2 === 1) {
      mid--;
    }

    // Check if pair is intact
    if (nums[mid] === nums[mid + 1]) {
      // Pair is intact, single element is on the right
      left = mid + 2;
    } else {
      // Pair is broken, single element is on the left
      right = mid;
    }
  }

  return nums[left];
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateSingleElementSortedSteps(array);
  },
  Visualizer: SingleElementSortedVisualizer,
};

export { SingleElementSortedVisualizer } from './visualizer';
export { generateSingleElementSortedSteps } from './algorithm';