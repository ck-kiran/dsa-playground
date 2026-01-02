import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { LongestSubstringKUniquesVisualizer } from './visualizer';
import { generateLongestSubstringKUniquesSteps } from './algorithm';

export const longestSubstringWithKUniquesProblem: Problem = {
  id: 'longest-substring-with-k-uniques',
  title: 'Longest Substring with K Unique Characters',
  difficulty: 'Medium',
  description: 'Given a string s and an integer k, find the length of the longest substring that contains exactly k unique characters.',
};

export const longestSubstringWithKUniquesModule: ProblemModule = {
  config: {
    id: 'longest-substring-with-k-uniques',
    title: 'Longest Substring with K Unique Characters',
    difficulty: 'Medium',
    description: 'Given a string s and an integer k, find the length of the longest substring that contains exactly k unique characters.',
    constraints: [
      '1 ≤ s.length ≤ 10^5',
      '1 ≤ k ≤ 26',
    ],
    defaultCode: `function lengthOfLongestSubstringKDistinct(s, k) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    map.set(s[right], (map.get(s[right]) || 0) + 1);

    while (map.size > k) {
      map.set(s[left], map.get(s[left]) - 1);
      if (map.get(s[left]) === 0) map.delete(s[left]);
      left++;
    }

    if (map.size === k) {
      maxLength = Math.max(maxLength, right - left + 1);
    }
  }

  return maxLength;
}`,
    defaultInputs: {
      s: 'eceba',
      k: 2,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Track unique characters in window',
        code: `function lengthOfLongestSubstringKDistinct(s, k) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    map.set(s[right], (map.get(s[right]) || 0) + 1);

    while (map.size > k) {
      map.set(s[left], map.get(s[left]) - 1);
      if (map.get(s[left]) === 0) map.delete(s[left]);
      left++;
    }

    if (map.size === k) {
      maxLength = Math.max(maxLength, right - left + 1);
    }
  }

  return maxLength;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s, k } = inputs as { s: string; k: number };
    return generateLongestSubstringKUniquesSteps(s, k);
  },
  Visualizer: LongestSubstringKUniquesVisualizer,
};

export { LongestSubstringKUniquesVisualizer } from './visualizer';
export { generateLongestSubstringKUniquesSteps } from './algorithm';
