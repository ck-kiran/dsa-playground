import { Topic } from '@/shared/types/domain';
import { treeTraversalPattern } from './tree-traversal';

export const treesTopic: Topic = {
  id: 'trees',
  title: 'Trees',
  description: 'Hierarchical data structure.',
  icon: 'Network',
  patterns: [
    treeTraversalPattern,
  ],
};

export * from './tree-traversal';