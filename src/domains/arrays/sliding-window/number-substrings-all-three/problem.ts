import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { NumberOfSubstringsContainingAllThreeVisualizer } from './visualizer';
import { generateNumberOfSubstringsContainingAllThreeSteps } from './algorithm';

export const numberOfSubstringsContainingAllThreeCharactersProblem: Problem = {
  id: 'number-of-substrings-containing-all-three-characters',
  title: 'Number of Substrings Containing All Three Characters',
  difficulty: 'Medium',
  description: 'Given a string s consisting only of characters a, b and c. Return the number of substrings containing at least one occurrence of all these characters a, b and c.',
};

export const numberOfSubstringsContainingAllThreeModule: ProblemModule = {
  config: {
    id: 'number-of-substrings-containing-all-three-characters',
    title: 'Number of Substrings Containing All Three Characters',
    difficulty: 'Medium',
    description: 'Given a string s consisting only of characters a, b and c. Return the number of substrings containing at least one occurrence of all these characters a, b and c.',
    constraints: [
      '3 ≤ s.length ≤ 5 * 10^4',
      's only consists of a, b or c characters',
    ],
    defaultCode: `function numberOfSubstrings(s) {
  const count = { a: 0, b: 0, c: 0 };
  let left = 0;
  let result = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]]++;

    while (count.a > 0 && count.b > 0 && count.c > 0) {
      result += s.length - right;
      count[s[left]]--;
      left++;
    }
  }

  return result;
}`,
    defaultInputs: {
      s: 'abcabc',
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Count all valid substrings starting from each position',
        code: `function numberOfSubstrings(s) {
  const count = { a: 0, b: 0, c: 0 };
  let left = 0;
  let result = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]]++;

    while (count.a > 0 && count.b > 0 && count.c > 0) {
      result += s.length - right;
      count[s[left]]--;
      left++;
    }
  }

  return result;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { s } = inputs as { s: string };
    return generateNumberOfSubstringsContainingAllThreeSteps(s);
  },
  Visualizer: NumberOfSubstringsContainingAllThreeVisualizer,
};

export { NumberOfSubstringsContainingAllThreeVisualizer } from './visualizer';
export { generateNumberOfSubstringsContainingAllThreeSteps } from './algorithm';
