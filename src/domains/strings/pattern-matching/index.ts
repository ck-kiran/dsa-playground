import { Pattern } from '@/shared/types/domain';
import { stringSearchProblem } from './problem';

export const patternMatchingPattern: Pattern = {
  id: 'pattern-matching',
  title: 'Pattern Matching',
  description: 'Find patterns within strings efficiently.',
  problems: [
    stringSearchProblem,
  ],
};

export * from './problem';