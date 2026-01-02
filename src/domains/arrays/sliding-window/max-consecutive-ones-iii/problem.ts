import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { MaxConsecutiveOnesIIIVisualizer } from './visualizer';
import { generateMaxConsecutiveOnesIIISteps } from './algorithm';

export const maxConsecutiveOnesIIIProblem: Problem = {
  id: 'max-consecutive-ones-iii',
  title: 'Max Consecutive Ones III',
  difficulty: 'Medium',
  description: 'Given a binary array nums and an integer k, return the maximum number of consecutive 1s in the array if you can flip at most k 0s.',
};

export const maxConsecutiveOnesIIIModule: ProblemModule = {
  config: {
    id: 'max-consecutive-ones-iii',
    title: 'Max Consecutive Ones III',
    difficulty: 'Medium',
    description: 'Given a binary array nums and an integer k, return the maximum number of consecutive 1s in the array if you can flip at most k 0s.',
    constraints: [
      '1 ≤ nums.length ≤ 10^5',
      'nums[i] is either 0 or 1',
      '0 ≤ k ≤ nums.length',
    ],
    defaultCode: `function longestOnes(nums, k) {
  let left = 0;
  let zeros = 0;
  let maxOnes = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros++;
    }

    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    maxOnes = Math.max(maxOnes, right - left + 1);
  }

  return maxOnes;
}`,
    defaultInputs: {
      array: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
      k: 2,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window (Optimal)',
        description: 'Track zeros in current window, shrink when exceeds k',
        code: `function longestOnes(nums, k) {
  let left = 0;
  let zeros = 0;
  let maxOnes = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros++;
    }

    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    maxOnes = Math.max(maxOnes, right - left + 1);
  }

  return maxOnes;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, k } = inputs as { array: number[]; k: number };
    return generateMaxConsecutiveOnesIIISteps(array, k);
  },
  Visualizer: MaxConsecutiveOnesIIIVisualizer,
};

export { MaxConsecutiveOnesIIIVisualizer } from './visualizer';
export { generateMaxConsecutiveOnesIIISteps } from './algorithm';
