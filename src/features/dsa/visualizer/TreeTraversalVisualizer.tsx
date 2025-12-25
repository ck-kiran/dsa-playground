'use client';

import React, { useState, useCallback } from 'react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
  id: string;
}

type TraversalType = 'inorder' | 'preorder' | 'postorder';

interface TreeTraversalVisualizerProps {
  initialTree?: TreeNode;
}

export function TreeTraversalVisualizer({
  initialTree
}: TreeTraversalVisualizerProps) {
  const defaultTree: TreeNode = {
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

  const [tree] = useState<TreeNode>(initialTree || defaultTree);
  const [traversalType, setTraversalType] = useState<TraversalType>('inorder');
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [traversalOrder, setTraversalOrder] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [step, setStep] = useState(0);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const inorderTraversal = useCallback(async (node: TreeNode | undefined, order: number[], visited: string[]): Promise<void> => {
    if (!node) return;

    // Visit left subtree
    if (node.left) {
      await inorderTraversal(node.left, order, visited);
    }

    // Visit current node
    setCurrentNode(node.id);
    await sleep(800);

    order.push(node.value);
    visited.push(node.id);
    setTraversalOrder([...order]);
    setVisitedNodes([...visited]);

    await sleep(500);
    setCurrentNode(null);

    // Visit right subtree
    if (node.right) {
      await inorderTraversal(node.right, order, visited);
    }
  }, []);

  const preorderTraversal = useCallback(async (node: TreeNode | undefined, order: number[], visited: string[]): Promise<void> => {
    if (!node) return;

    // Visit current node first
    setCurrentNode(node.id);
    await sleep(800);

    order.push(node.value);
    visited.push(node.id);
    setTraversalOrder([...order]);
    setVisitedNodes([...visited]);

    await sleep(500);
    setCurrentNode(null);

    // Visit left subtree
    if (node.left) {
      await preorderTraversal(node.left, order, visited);
    }

    // Visit right subtree
    if (node.right) {
      await preorderTraversal(node.right, order, visited);
    }
  }, []);

  const postorderTraversal = useCallback(async (node: TreeNode | undefined, order: number[], visited: string[]): Promise<void> => {
    if (!node) return;

    // Visit left subtree
    if (node.left) {
      await postorderTraversal(node.left, order, visited);
    }

    // Visit right subtree
    if (node.right) {
      await postorderTraversal(node.right, order, visited);
    }

    // Visit current node last
    setCurrentNode(node.id);
    await sleep(800);

    order.push(node.value);
    visited.push(node.id);
    setTraversalOrder([...order]);
    setVisitedNodes([...visited]);

    await sleep(500);
    setCurrentNode(null);
  }, []);

  const startTraversal = useCallback(async () => {
    if (isTraversing) return;

    setIsTraversing(true);
    setVisitedNodes([]);
    setTraversalOrder([]);
    setCurrentNode(null);
    setStep(0);

    const order: number[] = [];
    const visited: string[] = [];

    try {
      switch (traversalType) {
        case 'inorder':
          await inorderTraversal(tree, order, visited);
          break;
        case 'preorder':
          await preorderTraversal(tree, order, visited);
          break;
        case 'postorder':
          await postorderTraversal(tree, order, visited);
          break;
      }
    } catch (error) {
      console.error('Traversal error:', error);
    }

    setIsTraversing(false);
    setCurrentNode(null);
  }, [traversalType, tree, inorderTraversal, preorderTraversal, postorderTraversal, isTraversing]);

  const reset = useCallback(() => {
    setVisitedNodes([]);
    setCurrentNode(null);
    setTraversalOrder([]);
    setIsTraversing(false);
    setStep(0);
  }, []);

  const renderNode = (node: TreeNode) => {
    const isVisited = visitedNodes.includes(node.id);
    const isCurrent = currentNode === node.id;

    let nodeColor = 'bg-white border-gray-300';
    if (isCurrent) {
      nodeColor = 'bg-yellow-200 border-yellow-400';
    } else if (isVisited) {
      nodeColor = 'bg-green-200 border-green-400';
    }

    const visitOrder = visitedNodes.indexOf(node.id) + 1;

    return (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r="25"
          className={`${nodeColor} stroke-2 transition-all duration-300`}
          fill="currentColor"
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          className="text-sm font-bold fill-gray-800"
        >
          {node.value}
        </text>
        {isVisited && (
          <text
            x={node.x}
            y={node.y - 35}
            textAnchor="middle"
            className="text-xs font-bold fill-green-600"
          >
            {visitOrder}
          </text>
        )}
      </g>
    );
  };

  const renderEdge = (from: TreeNode, to: TreeNode) => {
    return (
      <line
        key={`${from.id}-${to.id}`}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="rgb(107, 114, 128)"
        strokeWidth="2"
      />
    );
  };

  const renderTree = (node: TreeNode | undefined): JSX.Element[] => {
    if (!node) return [];

    const elements: JSX.Element[] = [];

    // Render edges first (so they appear behind nodes)
    if (node.left) {
      elements.push(renderEdge(node, node.left));
      elements.push(...renderTree(node.left));
    }
    if (node.right) {
      elements.push(renderEdge(node, node.right));
      elements.push(...renderTree(node.right));
    }

    // Render the current node
    elements.push(renderNode(node));

    return elements;
  };

  const getTraversalDescription = () => {
    switch (traversalType) {
      case 'inorder':
        return 'Left → Root → Right: Visit left subtree, then root, then right subtree';
      case 'preorder':
        return 'Root → Left → Right: Visit root first, then left subtree, then right subtree';
      case 'postorder':
        return 'Left → Right → Root: Visit left subtree, then right subtree, then root';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Traversal Type:</label>
          <div className="flex gap-2">
            {(['inorder', 'preorder', 'postorder'] as TraversalType[]).map((type) => (
              <button
                key={type}
                onClick={() => setTraversalType(type)}
                disabled={isTraversing}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  traversalType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } disabled:opacity-50`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <strong>{traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal:</strong> {getTraversalDescription()}
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <svg width="600" height="250" className="border rounded bg-white">
          {renderTree(tree)}
        </svg>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium mb-2">Traversal Order:</div>
          <div className="flex gap-2 flex-wrap">
            {traversalOrder.length > 0 ? (
              traversalOrder.map((value, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-green-100 border border-green-300 rounded text-sm"
                >
                  {value}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No traversal started</div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={startTraversal}
            disabled={isTraversing}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm"
          >
            {isTraversing ? 'Traversing...' : `Start ${traversalType} Traversal`}
          </button>
          <button
            onClick={reset}
            disabled={isTraversing}
            className="px-4 py-2 bg-gray-500 text-white rounded text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded-full"></div>
          <span>Currently visiting</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 border border-green-400 rounded-full"></div>
          <span>Already visited</span>
        </div>
      </div>
    </div>
  );
}