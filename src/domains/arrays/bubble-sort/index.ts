import { Pattern } from '@/shared/types/domain';
import { bubbleSortProblem } from './problem';

export const bubbleSortPattern: Pattern = {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  description: 'Learn the fundamentals of sorting with the simplest comparison-based algorithm.',
  problems: [bubbleSortProblem],
};

export * from './problem';