import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { MinimumWindowSubstringVisualizer } from './visualizer';
import { generateMinimumWindowSubstringSteps } from './algorithm';

export const minimumWindowSubstringProblem: Problem = {
  id: 'minimum-window-substring',
  title: 'Minimum Window Substring',
  difficulty: 'Hard',
  description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
};

export const minimumWindowSubstringModule: ProblemModule = {
  config: {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
    constraints: [
      'm == s.length',
      'n == t.length',
      '1 ≤ m, n ≤ 10^5',
      's and t consist of uppercase and lowercase English letters',
    ],
    defaultCode: `function minWindow(s, t) {
  const need = new Map();
  const window = new Map();

  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;

  while (right < s.length) {
    const char = s[right];
    right++;

    if (need.has(char)) {
      window.set(char, (window.get(char) || 0) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }

      const leftChar = s[left];
      left++;

      if (need.has(leftChar)) {
        if (window.get(leftChar) === need.get(leftChar)) {
          valid--;
        }
        window.set(leftChar, window.get(leftChar) - 1);
      }
    }
  }

  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}`,
    defaultInputs: {
      s: 'ADOBECODEBANC',
      t: 'ABC',
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window (Optimal)',
        description: 'Use two pointers and hash maps to track character frequencies',
        code: `function minWindow(s, t) {
  const need = new Map();
  const window = new Map();

  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;

  while (right < s.length) {
    const char = s[right];
    right++;

    if (need.has(char)) {
      window.set(char, (window.get(char) || 0) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }

      const leftChar = s[left];
      left++;

      if (need.has(leftChar)) {
        if (window.get(leftChar) === need.get(leftChar)) {
          valid--;
        }
        window.set(leftChar, window.get(leftChar) - 1);
      }
    }
  }

  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}`,
        timeComplexity: 'O(M + N)',
        spaceComplexity: 'O(M + N)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s, t } = inputs as { s: string; t: string };
    return generateMinimumWindowSubstringSteps(s, t);
  },
  Visualizer: MinimumWindowSubstringVisualizer,
};

export { MinimumWindowSubstringVisualizer } from './visualizer';
export { generateMinimumWindowSubstringSteps } from './algorithm';
