import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { SubarraysWithKDifferentIntegersVisualizer } from './visualizer';
import { generateSubarraysWithKDifferentIntegersSteps } from './algorithm';

export const subarraysWithKDifferentIntegersProblem: Problem = {
  id: 'subarrays-with-k-different-integers',
  title: 'Subarrays with K Different Integers',
  difficulty: 'Hard',
  description: 'Given an integer array nums and an integer k, return the number of good subarrays of nums.',
};

export const subarraysWithKDifferentIntegersModule: ProblemModule = {
  config: {
    id: 'subarrays-with-k-different-integers',
    title: 'Subarrays with K Different Integers',
    difficulty: 'Hard',
    description: 'Given an integer array nums and an integer k, return the number of good subarrays of nums. A good array is an array where the number of different integers in that array is exactly k.',
    constraints: [
      '1 ≤ nums.length ≤ 2 * 10^4',
      '1 ≤ nums[i], k ≤ nums.length',
    ],
    defaultCode: `function subarraysWithKDistinct(nums, k) {
  const atMost = (target) => {
    const map = new Map();
    let left = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      map.set(nums[right], (map.get(nums[right]) || 0) + 1);
      while (map.size > target) {
        map.set(nums[left], map.get(nums[left]) - 1);
        if (map.get(nums[left]) === 0) map.delete(nums[left]);
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  return atMost(k) - atMost(k - 1);
}`,
    defaultInputs: {
      array: [1, 2, 1, 2, 3],
      k: 2,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Count subarrays with at most k different integers',
        code: `function subarraysWithKDistinct(nums, k) {
  const atMost = (target) => {
    const map = new Map();
    let left = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      map.set(nums[right], (map.get(nums[right]) || 0) + 1);
      while (map.size > target) {
        map.set(nums[left], map.get(nums[left]) - 1);
        if (map.get(nums[left]) === 0) map.delete(nums[left]);
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  return atMost(k) - atMost(k - 1);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, k } = inputs as { array: number[]; k: number };
    return generateSubarraysWithKDifferentIntegersSteps(array, k);
  },
  Visualizer: SubarraysWithKDifferentIntegersVisualizer,
};

export { SubarraysWithKDifferentIntegersVisualizer } from './visualizer';
export { generateSubarraysWithKDifferentIntegersSteps } from './algorithm';
