import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ReverseStringVisualizer } from './visualizer';
import { generateReverseStringSteps } from './algorithm';

export const reverseStringProblem: Problem = {
  id: 'reverse-string',
  title: 'Reverse String',
  difficulty: 'Easy',
  description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
};

export const reverseStringModule: ProblemModule = {
  config: {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    constraints: [
      '1 ≤ s.length ≤ 10^5',
      's[i] is a printable ascii character',
    ],
    defaultCode: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap characters at left and right
    [s[left], s[right]] = [s[right], s[left]];

    left++;
    right--;
  }
}`,
    defaultInputs: {
      string: ['h', 'e', 'l', 'l', 'o'],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Extra Space)',
        description: 'Create reversed array and copy back',
        code: `function reverseString(s) {
  const reversed = [];

  for (let i = s.length - 1; i >= 0; i--) {
    reversed.push(s[i]);
  }

  for (let i = 0; i < s.length; i++) {
    s[i] = reversed[i];
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'recursive',
        title: 'Recursive Approach',
        description: 'Use recursion with helper function',
        code: `function reverseString(s) {
  function reverse(left, right) {
    if (left >= right) return;

    [s[left], s[right]] = [s[right], s[left]];
    reverse(left + 1, right - 1);
  }

  reverse(0, s.length - 1);
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Use two pointers to swap characters in-place',
        code: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap characters at left and right
    [s[left], s[right]] = [s[right], s[left]];

    left++;
    right--;
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { string } = inputs as { string: string[] };
    return generateReverseStringSteps(string);
  },
  Visualizer: ReverseStringVisualizer,
};

export { ReverseStringVisualizer } from './visualizer';
export { generateReverseStringSteps } from './algorithm';