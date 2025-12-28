import { Problem } from '@/shared/types/domain';

export const treeTraversalProblem: Problem = {
  id: 'tree-traversal-visualizer',
  title: 'Binary Tree Traversal',
  difficulty: 'Medium',
  description: 'Visualize in-order, pre-order, and post-order tree traversals.',
};

export { TreeTraversalVisualizer } from './visualizer';
export { generateTreeTraversalSteps } from './algorithm';