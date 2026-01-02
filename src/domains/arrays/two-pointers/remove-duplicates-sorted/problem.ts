import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { RemoveDuplicatesVisualizer } from './visualizer';
import { generateRemoveDuplicatesSteps } from './algorithm';

export const removeDuplicatesFromSortedArrayProblem: Problem = {
  id: 'remove-duplicates-from-sorted-array',
  title: 'Remove Duplicates from Sorted Array',
  difficulty: 'Easy',
  description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.',
};

export const removeDuplicatesFromSortedArrayModule: ProblemModule = {
  config: {
    id: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.',
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10^4',
      '-100 ≤ nums[i] ≤ 100',
      'nums is sorted in non-decreasing order',
    ],
    defaultCode: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let uniqueIndex = 0;

  for (let currentIndex = 1; currentIndex < nums.length; currentIndex++) {
    if (nums[currentIndex] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[currentIndex];
    }
  }

  return uniqueIndex + 1;
}`,
    defaultInputs: {
      array: [1, 1, 2, 2, 3, 4, 4, 5],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Extra Space)',
        description: 'Use Set to track unique elements',
        code: `function removeDuplicates(nums) {
  const uniqueSet = new Set();
  const result = [];

  for (const num of nums) {
    if (!uniqueSet.has(num)) {
      uniqueSet.add(num);
      result.push(num);
    }
  }

  // Copy back to original array
  for (let i = 0; i < result.length; i++) {
    nums[i] = result[i];
  }

  return result.length;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'nested-loop',
        title: 'Nested Loop Approach',
        description: 'Remove duplicates by shifting elements',
        code: `function removeDuplicates(nums) {
  let length = nums.length;

  for (let i = 0; i < length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      // Shift all elements to the left
      for (let j = i + 1; j < length - 1; j++) {
        nums[j] = nums[j + 1];
      }
      length--;
      i--; // Check the same position again
    }
  }

  return length;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Use two pointers to track unique elements',
        code: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let uniqueIndex = 0;

  for (let currentIndex = 1; currentIndex < nums.length; currentIndex++) {
    if (nums[currentIndex] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[currentIndex];
    }
  }

  return uniqueIndex + 1;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateRemoveDuplicatesSteps(array);
  },
  Visualizer: RemoveDuplicatesVisualizer,
};

export { RemoveDuplicatesVisualizer } from './visualizer';
export { generateRemoveDuplicatesSteps } from './algorithm';