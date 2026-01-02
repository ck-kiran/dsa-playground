import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ContainsDuplicateVisualizer } from './visualizer';
import { generateContainsDuplicateSteps } from './algorithm';

export const containsDuplicateProblem: Problem = {
  id: 'contains-duplicate',
  title: 'Contains Duplicate',
  difficulty: 'Easy',
  description: 'Given an integer array nums, return true if any value appears at least twice in the array.',
};

export const containsDuplicateModule: ProblemModule = {
  config: {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and false otherwise.',
    constraints: [
      '1 ≤ nums.length ≤ 10^5',
      '-10^9 ≤ nums[i] ≤ 10^9',
    ],
    defaultCode: `function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}`,
    defaultInputs: {
      array: [1, 2, 3, 1],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Nested Loops)',
        description: 'Check every pair of elements',
        code: `function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'sorting',
        title: 'Sorting Approach',
        description: 'Sort array and check adjacent elements',
        code: `function containsDuplicate(nums) {
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      return true;
    }
  }

  return false;
}`,
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'optimized',
        title: 'Hash Set (Optimal)',
        description: 'Use hash set to track seen elements',
        code: `function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateContainsDuplicateSteps(array);
  },
  Visualizer: ContainsDuplicateVisualizer,
};

export { ContainsDuplicateVisualizer } from './visualizer';
export { generateContainsDuplicateSteps } from './algorithm';