import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { FindFirstLastPositionVisualizer } from './visualizer';
import { generateFindFirstLastPositionSteps } from './algorithm';

export const findFirstAndLastPositionProblem: Problem = {
  id: 'find-first-and-last-position',
  title: 'Find First and Last Position of Element in Sorted Array',
  difficulty: 'Medium',
  description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.',
};

export const findFirstAndLastPositionModule: ProblemModule = {
  config: {
    id: 'find-first-and-last-position',
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1].',
    constraints: [
      '0 ≤ nums.length ≤ 10^5',
      '-10^9 ≤ nums[i] ≤ 10^9',
      'nums is a non-decreasing array',
      '-10^9 ≤ target ≤ 10^9',
    ],
    defaultCode: `function searchRange(nums, target) {
  function findFirst(nums, target) {
    let left = 0, right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;
        right = mid - 1; // Continue searching left
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  function findLast(nums, target) {
    let left = 0, right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;
        left = mid + 1; // Continue searching right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  const first = findFirst(nums, target);
  const last = findLast(nums, target);

  return [first, last];
}`,
    defaultInputs: {
      array: [5, 7, 7, 8, 8, 10],
      target: 8,
    },
    approaches: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Scan array to find first and last positions',
        code: `function searchRange(nums, target) {
  let first = -1, last = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) first = i;
      last = i;
    }
  }

  return [first, last];
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search-combined',
        title: 'Binary Search (Find Both)',
        description: 'Find any occurrence, then expand left and right',
        code: `function searchRange(nums, target) {
  // Find any occurrence
  let left = 0, right = nums.length - 1;
  let found = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      found = mid;
      break;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (found === -1) return [-1, -1];

  // Expand to find first and last
  let first = found, last = found;
  while (first > 0 && nums[first - 1] === target) first--;
  while (last < nums.length - 1 && nums[last + 1] === target) last++;

  return [first, last];
}`,
        timeComplexity: 'O(log N + k) where k is count of target',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search-optimal',
        title: 'Binary Search (Optimal)',
        description: 'Use two binary searches to find first and last positions',
        code: `function searchRange(nums, target) {
  function findFirst(nums, target) {
    let left = 0, right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;
        right = mid - 1; // Continue searching left
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  function findLast(nums, target) {
    let left = 0, right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;
        left = mid + 1; // Continue searching right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  const first = findFirst(nums, target);
  const last = findLast(nums, target);

  return [first, last];
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateFindFirstLastPositionSteps(array, target);
  },
  Visualizer: FindFirstLastPositionVisualizer,
};

export { FindFirstLastPositionVisualizer } from './visualizer';
export { generateFindFirstLastPositionSteps } from './algorithm';