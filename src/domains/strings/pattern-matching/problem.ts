import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { StringSearchVisualizer } from './visualizer';
import { generateStringSearchSteps } from './algorithm';

export const stringSearchProblem: Problem = {
  id: 'string-search-visualizer',
  title: 'String Search',
  difficulty: 'Medium',
  description: 'Visualize pattern matching algorithms like KMP or Boyer-Moore.',
};

export const stringSearchModule: ProblemModule = {
  config: {
    id: 'string-search-visualizer',
    title: 'String Search',
    difficulty: 'Medium',
    description: 'Find all occurrences of a pattern string within a text string using naive string matching algorithm.',
    constraints: [
      'Case sensitive matching',
      'Time Complexity: O(N × M)',
      'Space Complexity: O(1)',
      'N = length of text, M = length of pattern',
    ],
    defaultCode: `function naiveStringSearch(text, pattern) {
  const matches = [];

  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j = 0;
    while (j < pattern.length && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === pattern.length) {
      matches.push(i);
    }
  }

  return matches;
}`,
    defaultInputs: {
      text: 'ABAAABCDABABCABCABCDAB',
      pattern: 'ABCAB',
    },
  },
  generateSteps: (inputs) => {
    const { text, pattern } = inputs as { text: string; pattern: string };
    return generateStringSearchSteps(text, pattern);
  },
  Visualizer: StringSearchVisualizer,
};

export { StringSearchVisualizer } from './visualizer';
export { generateStringSearchSteps } from './algorithm';