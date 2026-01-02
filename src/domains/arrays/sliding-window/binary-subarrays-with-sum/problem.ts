import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { BinarySubarraysWithSumVisualizer } from './visualizer';
import { generateBinarySubarraysWithSumSteps } from './algorithm';

export const binarySubarraysWithSumProblem: Problem = {
  id: 'binary-subarrays-with-sum',
  title: 'Binary Subarrays With Sum',
  difficulty: 'Medium',
  description: 'Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.',
};

export const binarySubarraysWithSumModule: ProblemModule = {
  config: {
    id: 'binary-subarrays-with-sum',
    title: 'Binary Subarrays With Sum',
    difficulty: 'Medium',
    description: 'Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.',
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10^4',
      'nums[i] is either 0 or 1',
      '0 ≤ goal ≤ nums.length',
    ],
    defaultCode: `function numSubarraysWithSum(nums, goal) {
  const atMost = (g) => {
    let left = 0, sum = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > g && left <= right) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  return atMost(goal) - atMost(goal - 1);
}`,
    defaultInputs: {
      array: [1, 0, 1, 0, 1],
      goal: 2,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Count subarrays with sum at most goal',
        code: `function numSubarraysWithSum(nums, goal) {
  const atMost = (g) => {
    let left = 0, sum = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > g && left <= right) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  return atMost(goal) - atMost(goal - 1);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, goal } = inputs as { array: number[]; goal: number };
    return generateBinarySubarraysWithSumSteps(array, goal);
  },
  Visualizer: BinarySubarraysWithSumVisualizer,
};

export { BinarySubarraysWithSumVisualizer } from './visualizer';
export { generateBinarySubarraysWithSumSteps } from './algorithm';
