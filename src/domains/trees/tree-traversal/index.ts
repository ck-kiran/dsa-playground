import { Pattern } from '@/shared/types/domain';
import { treeTraversalProblem } from './problem';

export const treeTraversalPattern: Pattern = {
  id: 'tree-traversal',
  title: 'Tree Traversal',
  description: 'Different ways to visit nodes in a tree.',
  problems: [
    treeTraversalProblem,
  ],
};

export * from './problem';