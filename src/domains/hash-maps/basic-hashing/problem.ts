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

// Additional Hash Map Problems from the learning material
export const maxNumberOfBalloonsProblem: Problem = {
  id: 'maximum-number-of-balloons',
  title: 'Maximum Number of Balloons',
  difficulty: 'Easy',
  description: 'Given a string text, find the maximum number of instances of the word "balloon" that can be formed using the characters from text.',
};


export const containsDuplicateIIProblem: Problem = {
  id: 'contains-duplicate-ii',
  title: 'Contains Duplicate II',
  difficulty: 'Easy',
  description: 'Given an integer array nums and an integer k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k.',
};


export const longestConsecutiveSequenceProblem: Problem = {
  id: 'longest-consecutive-sequence',
  title: 'Longest Consecutive Sequence',
  difficulty: 'Medium',
  description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
};

export const numberOfGoodPairsProblem: Problem = {
  id: 'number-of-good-pairs',
  title: 'Number of Good Pairs',
  difficulty: 'Easy',
  description: 'Given an array of integers nums, return the number of good pairs. A pair (i, j) is called good if nums[i] == nums[j] and i < j.',
};

export const isomorphicStringsProblem: Problem = {
  id: 'isomorphic-strings',
  title: 'Isomorphic Strings',
  difficulty: 'Easy',
  description: 'Given two strings s and t, determine if they are isomorphic. Two strings are isomorphic if characters in s can be replaced to get t.',
};

export const ransomNoteProblem: Problem = {
  id: 'ransom-note',
  title: 'Ransom Note',
  difficulty: 'Easy',
  description: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine.',
};

export const groupAnagramsProblem: Problem = {
  id: 'group-anagrams',
  title: 'Group Anagrams',
  difficulty: 'Medium',
  description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
};

export { TwoSumVisualizer } from './visualizer';
export { generateTwoSumSteps } from './algorithm';