import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { LongestSubarraySumVisualizer } from './visualizer';
import { generateLongestSubarraySumSteps } from './algorithm';

export const longestSubarraySumProblem: Problem = {
  id: 'longest-subarray-sum-visualizer',
  title: 'Longest Subarray with Sum ≤ K',
  difficulty: 'Medium',
  description: 'Find the length of the longest subarray with sum less than or equal to K.',
};

export const longestSubarraySumModule: ProblemModule = {
  config: {
    id: 'longest-subarray-sum-visualizer',
    title: 'Longest Subarray with Sum ≤ K',
    difficulty: 'Medium',
    description: 'Given an array of positive integers and a target sum K, find the length of the longest contiguous subarray whose sum is less than or equal to K.',
    constraints: [
      'Array contains positive integers only',
      'K is a positive integer',
      'Array length: 1 ≤ N ≤ 10^5',
    ],
    defaultCode: `function longestSubArray(nums, k) {
  let l = 0, r = 0, maxLength = 0, sum = 0;

  while (r < nums.length) {
    sum += nums[r];
    if (sum > k) {
      sum -= nums[l];
      l++;
    } else if (sum <= k) {
      maxLength = Math.max(maxLength, r - l + 1);
    }
    r++;
  }

  return maxLength;
}`,
    defaultInputs: {
      array: [1, 2, 3, 1, 1, 1, 1, 4, 2, 3],
      k: 3,
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Nested Loops)',
        description: 'Check every possible subarray using nested loops',
        code: `function longestSubArray(nums, k) {
  let maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum <= k) {
        maxLength = Math.max(maxLength, j - i + 1);
      } else {
        break;
      }
    }
  }

  return maxLength;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'better',
        title: 'Better Sliding Window',
        description: 'Sliding window with while loop for shrinking',
        code: `function longestSubArray(nums, k) {
  let l = 0, r = 0, maxLength = 0, sum = 0;

  while (r < nums.length) {
    sum += nums[r];

    while (sum > k) {
      sum -= nums[l];
      l++;
    }

    if (sum <= k) {
      maxLength = Math.max(maxLength, r - l + 1);
    }
    r++;
  }

  return maxLength;
}`,
        timeComplexity: 'O(2N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'optimized',
        title: 'Optimized Sliding Window',
        description: 'Most optimal sliding window approach',
        code: `function longestSubArray(nums, k) {
  let l = 0, r = 0, maxLength = 0, sum = 0;

  while (r < nums.length) {
    sum += nums[r];

    if (sum > k) {
      sum -= nums[l];
      l++;
    } else if (sum <= k) {
      maxLength = Math.max(maxLength, r - l + 1);
    }
    r++;
  }

  return maxLength;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, k } = inputs as { array: number[]; k: number };
    return generateLongestSubarraySumSteps(array, k);
  },
  Visualizer: LongestSubarraySumVisualizer,
};

export { LongestSubarraySumVisualizer } from './visualizer';
export { generateLongestSubarraySumSteps } from './algorithm';