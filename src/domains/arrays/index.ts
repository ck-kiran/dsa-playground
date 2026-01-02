import { Topic } from '@/shared/types/domain';
import { binarySearchPattern } from './binary-search';
import { twoPointersPattern } from './two-pointers';
import { bubbleSortPattern } from './bubble-sort';
import { slidingWindowPattern } from './sliding-window';

export const arraysTopic: Topic = {
  id: 'arrays',
  title: 'Arrays',
  description: 'Fundamental data structure storing elements in contiguous memory.',
  icon: 'LayoutList',
  patterns: [
    binarySearchPattern,
    twoPointersPattern,
    slidingWindowPattern,
    bubbleSortPattern,
  ],
};

export * from './binary-search';
export * from './two-pointers';
export * from './sliding-window';
export * from './bubble-sort';