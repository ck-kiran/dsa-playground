import { Pattern } from '@/shared/types/domain';
import { basicBinarySearchProblem } from './basic-binary-search/problem';
import { searchInsertProblem } from './search-insert-position/problem';

export const binarySearchPattern: Pattern = {
  id: 'binary-search',
  title: 'Binary Search',
  description: 'Efficiently search sorted arrays using the divide-and-conquer approach.',
  problems: [
    basicBinarySearchProblem,
    searchInsertProblem,
  ],
};

export * from './basic-binary-search/problem';
export * from './search-insert-position/problem';