import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { LongestSubstringWithoutRepeatingVisualizer } from './visualizer';
import { generateLongestSubstringWithoutRepeatingSteps } from './algorithm';

export const longestSubstringWithoutRepeatingCharactersProblem: Problem = {
  id: 'longest-substring-without-repeating-characters',
  title: 'Longest Substring Without Repeating Characters',
  difficulty: 'Medium',
  description: 'Given a string s, find the length of the longest substring without repeating characters.',
};

export const longestSubstringWithoutRepeatingCharactersModule: ProblemModule = {
  config: {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    constraints: [
      '0 ≤ s.length ≤ 5 * 10^4',
      's consists of English letters, digits, symbols and spaces',
    ],
    defaultCode: `function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
    defaultInputs: {
      s: 'abcabcbb',
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        description: 'Check all substrings for duplicates',
        code: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;

  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      maxLength = Math.max(maxLength, j - i + 1);
    }
  }

  return maxLength;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(min(N, M))'
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window (Optimal)',
        description: 'Use hashmap to track character positions',
        code: `function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(min(N, M))'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s } = inputs as { s: string };
    return generateLongestSubstringWithoutRepeatingSteps(s);
  },
  Visualizer: LongestSubstringWithoutRepeatingVisualizer,
};

export { LongestSubstringWithoutRepeatingVisualizer } from './visualizer';
export { generateLongestSubstringWithoutRepeatingSteps } from './algorithm';
