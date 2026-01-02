import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { SearchRotatedArrayIIVisualizer } from './visualizer';
import { generateSearchRotatedArrayIISteps } from './algorithm';

export const searchInRotatedSortedArrayIIProblem: Problem = {
  id: 'search-in-rotated-sorted-array-ii',
  title: 'Search in Rotated Sorted Array II',
  difficulty: 'Medium',
  description: 'There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Given the array nums after the possible rotation and an integer target, return true if target is in nums, or false if it is not in nums.',
};

export const searchInRotatedSortedArrayIIModule: ProblemModule = {
  config: {
    id: 'search-in-rotated-sorted-array-ii',
    title: 'Search in Rotated Sorted Array II',
    difficulty: 'Medium',
    description: 'There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Given the array nums after the possible rotation and an integer target, return true if target is in nums, or false if it is not in nums. This is a follow-up problem to Search in Rotated Sorted Array, where nums may contain duplicates.',
    constraints: [
      '1 ≤ nums.length ≤ 5000',
      '-10^4 ≤ nums[i] ≤ 10^4',
      'nums is guaranteed to be rotated at some pivot',
      '-10^4 ≤ target ≤ 10^4',
    ],
    defaultCode: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return true;
    }

    // Handle duplicates at boundaries
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}`,
    defaultInputs: {
      array: [2, 5, 6, 0, 0, 1, 2],
      target: 0,
    },
    approaches: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Scan entire array to find target',
        code: `function search(nums, target) {
  return nums.includes(target);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (With Duplicate Handling)',
        description: 'Modified binary search to handle duplicates',
        code: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return true;
    }

    // Handle duplicates at boundaries
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}`,
        timeComplexity: 'O(log N) average, O(N) worst case',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateSearchRotatedArrayIISteps(array, target);
  },
  Visualizer: SearchRotatedArrayIIVisualizer,
};

export { SearchRotatedArrayIIVisualizer } from './visualizer';
export { generateSearchRotatedArrayIISteps } from './algorithm';