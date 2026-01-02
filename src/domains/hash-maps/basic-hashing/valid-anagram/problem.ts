import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ValidAnagramVisualizer } from './visualizer';
import { generateValidAnagramSteps } from './algorithm';

export const validAnagramProblem: Problem = {
  id: 'valid-anagram',
  title: 'Valid Anagram',
  difficulty: 'Easy',
  description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
};

export const validAnagramModule: ProblemModule = {
  config: {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another word.',
    constraints: [
      '1 ≤ s.length, t.length ≤ 5 * 10^4',
      's and t consist of lowercase English letters',
    ],
    defaultCode: `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const charCount = {};

  // Count characters in s
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement characters in t
  for (const char of t) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  return true;
}`,
    defaultInputs: {
      s: 'anagram',
      t: 'nagaram',
    },
    approaches: [
      {
        id: 'sorting',
        title: 'Sorting Approach',
        description: 'Sort both strings and compare',
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  return s.split('').sort().join('') === t.split('').sort().join('');
}`,
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'frequency-map',
        title: 'Frequency Map (Optimal)',
        description: 'Use hash map to count character frequencies',
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const charCount = {};

  // Count characters in s
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement characters in t
  for (const char of t) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  return true;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) - bounded by alphabet size'
      },
      {
        id: 'array-counter',
        title: 'Array Counter',
        description: 'Use fixed-size array for lowercase letters',
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s, t } = inputs as { s: string; t: string };
    return generateValidAnagramSteps(s, t);
  },
  Visualizer: ValidAnagramVisualizer,
};

export { ValidAnagramVisualizer } from './visualizer';
export { generateValidAnagramSteps } from './algorithm';