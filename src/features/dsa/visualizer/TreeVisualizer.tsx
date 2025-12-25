import type { Step } from '../types/step';

interface TreeVisualizerProps {
  step: Step;
}

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  id: string;
  x: number;
  y: number;
}

export function TreeVisualizer({ step }: TreeVisualizerProps) {
  const { tree, visitedNodes = [], currentNode, traversalOrder = [], traversalType = 'inorder' } = step;

  if (!tree) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-lg text-muted-foreground">
          No tree provided
        </div>
      </div>
    );
  }

  // Default tree structure with positioned nodes
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

  const treeToRender = tree || defaultTree;

  const renderNode = (node: TreeNode) => {
    const isVisited = visitedNodes.includes(node.id);
    const isCurrent = currentNode === node.id;

    let fillColor = '#ffffff';
    let strokeColor = '#d1d5db';

    if (isCurrent) {
      fillColor = '#fef3c7';
      strokeColor = '#f59e0b';
    } else if (isVisited) {
      fillColor = '#dcfce7';
      strokeColor = '#22c55e';
    }

    const visitOrder = visitedNodes.indexOf(node.id) + 1;

    return (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          style={{ transition: 'all 0.3s ease' }}
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#374151"
        >
          {node.value}
        </text>
        {isVisited && visitOrder > 0 && (
          <text
            x={node.x}
            y={node.y - 35}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#059669"
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
    <div className="flex flex-col items-center space-y-8">
      {/* Traversal Type Information */}
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">
          {traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal
        </div>
        <div className="text-sm text-muted-foreground max-w-md">
          {getTraversalDescription()}
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <svg width="600" height="250" className="border rounded bg-white">
          {renderTree(treeToRender)}
        </svg>
      </div>

      {/* Traversal Order */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Traversal Order:</div>
          <div className="flex gap-2 flex-wrap justify-center">
            {traversalOrder.length > 0 ? (
              traversalOrder.map((value, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-green-100 border border-green-300 rounded text-sm font-mono"
                >
                  {value}
                </div>
              ))
            ) : (
              <div className="text-muted-foreground text-sm">No nodes visited yet</div>
            )}
          </div>
        </div>

        {/* Current Node Information */}
        {currentNode && (
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Currently visiting: <span className="font-mono font-bold">{
                (() => {
                  const findNodeValue = (node: TreeNode | undefined, id: string): number | null => {
                    if (!node) return null;
                    if (node.id === id) return node.value;
                    return findNodeValue(node.left, id) || findNodeValue(node.right, id);
                  };
                  return findNodeValue(treeToRender, currentNode);
                })()
              }</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded-full"></div>
          <span>Currently visiting</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 border border-green-400 rounded-full"></div>
          <span>Already visited</span>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="text-xs space-y-1 bg-gray-50 p-3 rounded text-center max-w-md">
        <div className="font-bold">Tree Traversal Types:</div>
        <div><strong>Inorder:</strong> Left → Root → Right</div>
        <div><strong>Preorder:</strong> Root → Left → Right</div>
        <div><strong>Postorder:</strong> Left → Right → Root</div>
      </div>
    </div>
  );
}