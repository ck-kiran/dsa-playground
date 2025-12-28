import { Topic } from '@/shared/types/domain';
import { listManipulationPattern } from './list-manipulation';

export const linkedListsTopic: Topic = {
  id: 'linked-lists',
  title: 'Linked Lists',
  description: 'Linear data structure where elements are not stored at contiguous memory locations.',
  icon: 'Link',
  patterns: [
    listManipulationPattern,
  ],
};

export * from './list-manipulation';