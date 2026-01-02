import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { LongestRepeatingCharacterReplacementVisualizer } from './visualizer';
import { generateLongestRepeatingCharacterReplacementSteps } from './algorithm';

export const longestRepeatingCharacterReplacementProblem: Problem = {
  id: 'longest-repeating-character-replacement',
  title: 'Longest Repeating Character Replacement',
  difficulty: 'Medium',
  description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.',
};

export const longestRepeatingCharacterReplacementModule: ProblemModule = {
  config: {
    id: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
    constraints: [
      '1 ≤ s.length ≤ 10^5',
      's consists of only uppercase English letters',
      '0 ≤ k ≤ s.length',
    ],
    defaultCode: `function characterReplacement(s, k) {
  const count = new Map();
  let left = 0;
  let maxCount = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    count.set(s[right], (count.get(s[right]) || 0) + 1);
    maxCount = Math.max(maxCount, count.get(s[right]));

    if (right - left + 1 - maxCount > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
    defaultInputs: {
      s: 'AABABBA',
      k: 1,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window (Optimal)',
        description: 'Track most frequent character in window',
        code: `function characterReplacement(s, k) {
  const count = new Map();
  let left = 0;
  let maxCount = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    count.set(s[right], (count.get(s[right]) || 0) + 1);
    maxCount = Math.max(maxCount, count.get(s[right]));

    if (right - left + 1 - maxCount > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s, k } = inputs as { s: string; k: number };
    return generateLongestRepeatingCharacterReplacementSteps(s, k);
  },
  Visualizer: LongestRepeatingCharacterReplacementVisualizer,
};

export { LongestRepeatingCharacterReplacementVisualizer } from './visualizer';
export { generateLongestRepeatingCharacterReplacementSteps } from './algorithm';
