import { Topic } from '@/shared/types/domain';
import { binarySearchPattern } from './binary-search';
import { twoPointersPattern } from './two-pointers';
import { bubbleSortPattern } from './bubble-sort';

export const arraysTopic: Topic = {
  id: 'arrays',
  title: 'Arrays',
  description: 'Fundamental data structure storing elements in contiguous memory.',
  icon: 'LayoutList',
  patterns: [
    binarySearchPattern,
    twoPointersPattern,
    bubbleSortPattern,
  ],
};

export * from './binary-search';
export * from './two-pointers';
export * from './bubble-sort';