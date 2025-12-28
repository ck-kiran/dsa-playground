import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { SearchInsertVisualizer } from './visualizer';
import { generateSearchInsertSteps } from './algorithm';

export const searchInsertProblem: Problem = {
  id: 'search-insert-position-visualizer',
  title: 'Search Insert Position',
  difficulty: 'Easy',
  description: 'Find the index where a target should be inserted in a sorted array.',
};

export const searchInsertModule: ProblemModule = {
  config: {
    id: 'search-insert-position-visualizer',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    description: 'Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
    constraints: [
      'Array is sorted in ascending order',
      'Time Complexity: O(log N)',
      'Space Complexity: O(1)',
    ],
    defaultCode: `function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
    defaultInputs: {
      array: [1, 3, 5, 6],
      target: 4,
    },
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateSearchInsertSteps(array, target);
  },
  Visualizer: SearchInsertVisualizer,
};