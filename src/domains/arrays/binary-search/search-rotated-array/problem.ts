import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { SearchRotatedArrayVisualizer } from './visualizer';
import { generateSearchRotatedArraySteps } from './algorithm';

export const searchInRotatedSortedArrayProblem: Problem = {
  id: 'search-in-rotated-sorted-array',
  title: 'Search in Rotated Sorted Array',
  difficulty: 'Medium',
  description: 'There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
};

export const searchInRotatedSortedArrayModule: ProblemModule = {
  config: {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
    constraints: [
      '1 ≤ nums.length ≤ 5000',
      '-10^4 ≤ nums[i] ≤ 10^4',
      'All values of nums are unique',
      'nums is an ascending array that is possibly rotated',
      '-10^4 ≤ target ≤ 10^4',
    ],
    defaultCode: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Check which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Target is in left half
      } else {
        left = mid + 1; // Target is in right half
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Target is in right half
      } else {
        right = mid - 1; // Target is in left half
      }
    }
  }

  return -1;
}`,
    defaultInputs: {
      array: [4, 5, 6, 7, 0, 1, 2],
      target: 0,
    },
    approaches: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Scan entire array to find target',
        code: `function search(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (Optimal)',
        description: 'Identify sorted half and search accordingly',
        code: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Check which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Target is in left half
      } else {
        left = mid + 1; // Target is in right half
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Target is in right half
      } else {
        right = mid - 1; // Target is in left half
      }
    }
  }

  return -1;
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateSearchRotatedArraySteps(array, target);
  },
  Visualizer: SearchRotatedArrayVisualizer,
};

export { SearchRotatedArrayVisualizer } from './visualizer';
export { generateSearchRotatedArraySteps } from './algorithm';