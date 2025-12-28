import { Pattern } from '@/shared/types/domain';
import { binarySearchProblem } from './problem';

export const binarySearchPattern: Pattern = {
  id: 'binary-search',
  title: 'Binary Search',
  description: 'Efficiently find an element in a sorted array.',
  problems: [
    binarySearchProblem,
  ],
};

export * from './problem';