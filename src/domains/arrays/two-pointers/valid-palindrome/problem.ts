import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ValidPalindromeVisualizer } from './visualizer';
import { generateValidPalindromeSteps } from './algorithm';

export const validPalindromeProblem: Problem = {
  id: 'valid-palindrome',
  title: 'Valid Palindrome',
  difficulty: 'Easy',
  description: 'A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.',
};

export const validPalindromeModule: ProblemModule = {
  config: {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: 'A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.',
    constraints: [
      '1 ≤ s.length ≤ 2 * 10^5',
      's consists only of printable ASCII characters',
    ],
    defaultCode: `function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    // Compare characters
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNumeric(char) {
  return /^[a-zA-Z0-9]$/.test(char);
}`,
    defaultInputs: {
      s: 'A man, a plan, a canal: Panama',
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Clean and Reverse',
        description: 'Clean string and compare with its reverse',
        code: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Use two pointers moving inward',
        code: `function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    // Compare characters
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNumeric(char) {
  return /^[a-zA-Z0-9]$/.test(char);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s } = inputs as { s: string };
    return generateValidPalindromeSteps(s);
  },
  Visualizer: ValidPalindromeVisualizer,
};

export { ValidPalindromeVisualizer } from './visualizer';
export { generateValidPalindromeSteps } from './algorithm';