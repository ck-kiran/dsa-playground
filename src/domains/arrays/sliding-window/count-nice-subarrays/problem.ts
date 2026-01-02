import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { CountNiceSubarraysVisualizer } from './visualizer';
import { generateCountNiceSubarraysSteps } from './algorithm';

export const countNumberOfNiceSubarraysProblem: Problem = {
  id: 'count-number-of-nice-subarrays',
  title: 'Count Number of Nice Subarrays',
  difficulty: 'Medium',
  description: 'Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.',
};

export const countNumberOfNiceSubarraysModule: ProblemModule = {
  config: {
    id: 'count-number-of-nice-subarrays',
    title: 'Count Number of Nice Subarrays',
    difficulty: 'Medium',
    description: 'Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it. Return the number of nice sub-arrays.',
    constraints: [
      '1 ≤ nums.length ≤ 5 * 10^4',
      '1 ≤ nums[i] ≤ 10^5',
      '1 ≤ k ≤ nums.length',
    ],
    defaultCode: `function numberOfSubarrays(nums, k) {
  const atMost = (target) => {
    let left = 0, odds = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      if (nums[right] % 2 === 1) odds++;
      while (odds > target) {
        if (nums[left] % 2 === 1) odds--;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  return atMost(k) - atMost(k - 1);
}`,
    defaultInputs: {
      array: [1, 1, 2, 1, 1],
      k: 3,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Count subarrays with at most k odd numbers',
        code: `function numberOfSubarrays(nums, k) {
  const atMost = (target) => {
    let left = 0, odds = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      if (nums[right] % 2 === 1) odds++;
      while (odds > target) {
        if (nums[left] % 2 === 1) odds--;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  return atMost(k) - atMost(k - 1);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, k } = inputs as { array: number[]; k: number };
    return generateCountNiceSubarraysSteps(array, k);
  },
  Visualizer: CountNiceSubarraysVisualizer,
};

export { CountNiceSubarraysVisualizer } from './visualizer';
export { generateCountNiceSubarraysSteps } from './algorithm';
