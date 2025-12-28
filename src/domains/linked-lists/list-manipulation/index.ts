import { Pattern } from '@/shared/types/domain';
import { reverseListProblem } from './problem';

export const listManipulationPattern: Pattern = {
  id: 'list-manipulation',
  title: 'List Manipulation',
  description: 'Common operations on linked lists.',
  problems: [
    reverseListProblem,
  ],
};

export * from './problem';