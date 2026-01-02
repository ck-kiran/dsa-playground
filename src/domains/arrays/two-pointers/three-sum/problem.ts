import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ThreeSumVisualizer } from './visualizer';
import { generateThreeSumSteps } from './algorithm';

export const threeSumProblem: Problem = {
  id: 'three-sum',
  title: '3Sum',
  difficulty: 'Medium',
  description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
};

export const threeSumModule: ProblemModule = {
  config: {
    id: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    constraints: [
      '3 ≤ nums.length ≤ 3000',
      '-10^5 ≤ nums[i] ≤ 10^5',
    ],
    defaultCode: `function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for i
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left and right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,
    defaultInputs: {
      array: [-1, 0, 1, 2, -1, -4],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Three Loops)',
        description: 'Check all possible triplets with three nested loops',
        code: `function threeSum(nums) {
  const result = [];
  const seen = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = triplet.join(',');

          if (!seen.has(key)) {
            seen.add(key);
            result.push(triplet);
          }
        }
      }
    }
  }

  return result;
}`,
        timeComplexity: 'O(N³)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'hash-set',
        title: 'Hash Set Approach',
        description: 'Use hash set to find the third element',
        code: `function threeSum(nums) {
  const result = [];
  const seen = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    const target = -nums[i];
    const numSet = new Set();

    for (let j = i + 1; j < nums.length; j++) {
      const complement = target - nums[j];

      if (numSet.has(complement)) {
        const triplet = [nums[i], nums[j], complement].sort((a, b) => a - b);
        const key = triplet.join(',');

        if (!seen.has(key)) {
          seen.add(key);
          result.push(triplet);
        }
      }

      numSet.add(nums[j]);
    }
  }

  return result;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Sort array and use two pointers for each fixed element',
        code: `function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for i
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left and right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateThreeSumSteps(array);
  },
  Visualizer: ThreeSumVisualizer,
};

export { ThreeSumVisualizer } from './visualizer';
export { generateThreeSumSteps } from './algorithm';