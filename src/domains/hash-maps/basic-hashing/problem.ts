import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { TwoSumVisualizer } from './visualizer';
import { generateTwoSumSteps } from './algorithm';

export const twoSumProblem: Problem = {
  id: 'two-sum-visualizer',
  title: 'Two Sum',
  difficulty: 'Easy',
  description: 'Find two numbers that add up to a specific target.',
};

export const twoSumModule: ProblemModule = {
  config: {
    id: 'two-sum-visualizer',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Find two numbers in an array that add up to a specific target value. Return the indices of the two numbers.',
    constraints: [
      'Each input has exactly one solution',
      'You may not use the same element twice',
      'Time Complexity: O(N)',
      'Space Complexity: O(N)',
    ],
    defaultCode: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
    defaultInputs: {
      array: [2, 7, 11, 15, 3, 6, 8],
      target: 9,
    },
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateTwoSumSteps(array, target);
  },
  Visualizer: TwoSumVisualizer,
};

export { TwoSumVisualizer } from './visualizer';
export { generateTwoSumSteps } from './algorithm';