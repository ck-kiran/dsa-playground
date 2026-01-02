import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { FindMinimumRotatedVisualizer } from './visualizer';
import { generateFindMinimumRotatedSteps } from './algorithm';

export const findMinimumInRotatedSortedArrayProblem: Problem = {
  id: 'find-minimum-in-rotated-sorted-array',
  title: 'Find Minimum in Rotated Sorted Array',
  difficulty: 'Medium',
  description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.',
};

export const findMinimumInRotatedSortedArrayModule: ProblemModule = {
  config: {
    id: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.',
    constraints: [
      'n == nums.length',
      '1 ≤ n ≤ 5000',
      '-5000 ≤ nums[i] ≤ 5000',
      'All integers of nums are unique',
      'nums is sorted and rotated between 1 and n times',
    ],
    defaultCode: `function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // Minimum is in right half
      left = mid + 1;
    } else {
      // Minimum is in left half (including mid)
      right = mid;
    }
  }

  return nums[left];
}`,
    defaultInputs: {
      array: [4, 5, 6, 7, 0, 1, 2],
    },
    approaches: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Scan entire array to find minimum',
        code: `function findMin(nums) {
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    min = Math.min(min, nums[i]);
  }
  return min;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (Optimal)',
        description: 'Use binary search to find rotation point',
        code: `function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // Minimum is in right half
      left = mid + 1;
    } else {
      // Minimum is in left half (including mid)
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
    return generateFindMinimumRotatedSteps(array);
  },
  Visualizer: FindMinimumRotatedVisualizer,
};

export { FindMinimumRotatedVisualizer } from './visualizer';
export { generateFindMinimumRotatedSteps } from './algorithm';