import type { Step } from '../types/step';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  id: string;
  x: number;
  y: number;
}

export function generateTreeTraversalSteps(
  traversalType: 'inorder' | 'preorder' | 'postorder' = 'inorder'
): Step[] {
  const steps: Step[] = [];

  // Default binary tree structure with positioning
  const tree: TreeNode = {
    value: 1,
    x: 300,
    y: 50,
    id: '1',
    left: {
      value: 2,
      x: 150,
      y: 120,
      id: '2',
      left: {
        value: 4,
        x: 75,
        y: 190,
        id: '4'
      },
      right: {
        value: 5,
        x: 225,
        y: 190,
        id: '5'
      }
    },
    right: {
      value: 3,
      x: 450,
      y: 120,
      id: '3',
      left: {
        value: 6,
        x: 375,
        y: 190,
        id: '6'
      },
      right: {
        value: 7,
        x: 525,
        y: 190,
        id: '7'
      }
    }
  };

  const visitedNodes: string[] = [];
  const traversalOrder: number[] = [];

  // Initial step
  steps.push({
    tree,
    visitedNodes: [],
    currentNode: null,
    traversalOrder: [],
    traversalType,
    message: `Starting ${traversalType} traversal of binary tree`
  });

  // Generate steps based on traversal type
  switch (traversalType) {
    case 'inorder':
      inorderTraversal(tree, visitedNodes, traversalOrder, steps);
      break;
    case 'preorder':
      preorderTraversal(tree, visitedNodes, traversalOrder, steps);
      break;
    case 'postorder':
      postorderTraversal(tree, visitedNodes, traversalOrder, steps);
      break;
  }

  // Final step
  steps.push({
    tree,
    visitedNodes: [...visitedNodes],
    currentNode: null,
    traversalOrder: [...traversalOrder],
    traversalType,
    message: `${traversalType} traversal complete! Order: [${traversalOrder.join(', ')}]`
  });

  return steps;
}

function inorderTraversal(
  node: TreeNode | undefined,
  visitedNodes: string[],
  traversalOrder: number[],
  steps: Step[]
): void {
  if (!node) return;

  // Visit left subtree
  if (node.left) {
    steps.push({
      tree: steps[0].tree,
      visitedNodes: [...visitedNodes],
      currentNode: node.id,
      traversalOrder: [...traversalOrder],
      traversalType: 'inorder',
      message: `At node ${node.value}: Going to left child (${node.left.value})`
    });
    inorderTraversal(node.left, visitedNodes, traversalOrder, steps);
  }

  // Visit current node
  steps.push({
    tree: steps[0].tree,
    visitedNodes: [...visitedNodes],
    currentNode: node.id,
    traversalOrder: [...traversalOrder],
    traversalType: 'inorder',
    message: `Visiting node ${node.value} (processing current node)`
  });

  visitedNodes.push(node.id);
  traversalOrder.push(node.value);

  steps.push({
    tree: steps[0].tree,
    visitedNodes: [...visitedNodes],
    currentNode: node.id,
    traversalOrder: [...traversalOrder],
    traversalType: 'inorder',
    message: `Added ${node.value} to traversal order`
  });

  // Visit right subtree
  if (node.right) {
    steps.push({
      tree: steps[0].tree,
      visitedNodes: [...visitedNodes],
      currentNode: node.id,
      traversalOrder: [...traversalOrder],
      traversalType: 'inorder',
      message: `At node ${node.value}: Going to right child (${node.right.value})`
    });
    inorderTraversal(node.right, visitedNodes, traversalOrder, steps);
  }
}

function preorderTraversal(
  node: TreeNode | undefined,
  visitedNodes: string[],
  traversalOrder: number[],
  steps: Step[]
): void {
  if (!node) return;

  // Visit current node first
  steps.push({
    tree: steps[0].tree,
    visitedNodes: [...visitedNodes],
    currentNode: node.id,
    traversalOrder: [...traversalOrder],
    traversalType: 'preorder',
    message: `Visiting node ${node.value} (processing current node first)`
  });

  visitedNodes.push(node.id);
  traversalOrder.push(node.value);

  steps.push({
    tree: steps[0].tree,
    visitedNodes: [...visitedNodes],
    currentNode: node.id,
    traversalOrder: [...traversalOrder],
    traversalType: 'preorder',
    message: `Added ${node.value} to traversal order`
  });

  // Visit left subtree
  if (node.left) {
    steps.push({
      tree: steps[0].tree,
      visitedNodes: [...visitedNodes],
      currentNode: node.id,
      traversalOrder: [...traversalOrder],
      traversalType: 'preorder',
      message: `At node ${node.value}: Going to left child (${node.left.value})`
    });
    preorderTraversal(node.left, visitedNodes, traversalOrder, steps);
  }

  // Visit right subtree
  if (node.right) {
    steps.push({
      tree: steps[0].tree,
      visitedNodes: [...visitedNodes],
      currentNode: node.id,
      traversalOrder: [...traversalOrder],
      traversalType: 'preorder',
      message: `At node ${node.value}: Going to right child (${node.right.value})`
    });
    preorderTraversal(node.right, visitedNodes, traversalOrder, steps);
  }
}

function postorderTraversal(
  node: TreeNode | undefined,
  visitedNodes: string[],
  traversalOrder: number[],
  steps: Step[]
): void {
  if (!node) return;

  // Visit left subtree
  if (node.left) {
    steps.push({
      tree: steps[0].tree,
      visitedNodes: [...visitedNodes],
      currentNode: node.id,
      traversalOrder: [...traversalOrder],
      traversalType: 'postorder',
      message: `At node ${node.value}: Going to left child (${node.left.value})`
    });
    postorderTraversal(node.left, visitedNodes, traversalOrder, steps);
  }

  // Visit right subtree
  if (node.right) {
    steps.push({
      tree: steps[0].tree,
      visitedNodes: [...visitedNodes],
      currentNode: node.id,
      traversalOrder: [...traversalOrder],
      traversalType: 'postorder',
      message: `At node ${node.value}: Going to right child (${node.right.value})`
    });
    postorderTraversal(node.right, visitedNodes, traversalOrder, steps);
  }

  // Visit current node last
  steps.push({
    tree: steps[0].tree,
    visitedNodes: [...visitedNodes],
    currentNode: node.id,
    traversalOrder: [...traversalOrder],
    traversalType: 'postorder',
    message: `Visiting node ${node.value} (processing current node last)`
  });

  visitedNodes.push(node.id);
  traversalOrder.push(node.value);

  steps.push({
    tree: steps[0].tree,
    visitedNodes: [...visitedNodes],
    currentNode: node.id,
    traversalOrder: [...traversalOrder],
    traversalType: 'postorder',
    message: `Added ${node.value} to traversal order`
  });
}