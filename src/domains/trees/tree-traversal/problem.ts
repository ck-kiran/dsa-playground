import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { TreeTraversalVisualizer } from './visualizer';
import { generateTreeTraversalSteps } from './algorithm';

export const treeTraversalProblem: Problem = {
  id: 'tree-traversal-visualizer',
  title: 'Binary Tree Traversal',
  difficulty: 'Medium',
  description: 'Visualize in-order, pre-order, and post-order tree traversals.',
};

export const treeTraversalModule: ProblemModule = {
  config: {
    id: 'tree-traversal-visualizer',
    title: 'Binary Tree Traversal',
    difficulty: 'Medium',
    description: 'Traverse a binary tree using different strategies: inorder, preorder, and postorder.',
    constraints: [
      'Recursive implementation',
      'Time Complexity: O(N)',
      'Space Complexity: O(H)',
      'N = number of nodes, H = height of tree',
    ],
    defaultCode: `function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;

    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}`,
    defaultInputs: {
      traversalType: 'inorder',
    },
  },
  generateSteps: (inputs) => {
    const { traversalType } = inputs as { traversalType: string };
    return generateTreeTraversalSteps(traversalType as any);
  },
  Visualizer: TreeTraversalVisualizer,
};

export { TreeTraversalVisualizer } from './visualizer';
export { generateTreeTraversalSteps } from './algorithm';