import type { Step } from '../../../shared/types/step';

interface TreeTraversalVisualizerProps {
  step: Step;
}

export function TreeTraversalVisualizer({ step }: TreeTraversalVisualizerProps) {
  const { tree, visitedNodes = [], currentNode, traversalOrder = [], traversalType = 'inorder' } = step;

  if (!tree) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-lg text-muted-foreground">
          No tree structure provided
        </div>
      </div>
    );
  }

  const renderTree = (node: any, depth = 0): React.ReactNode => {
    if (!node) return null;

    const isCurrentNode = currentNode === node.id;
    const isVisited = visitedNodes.includes(node.id);

    let nodeColor = 'bg-white border-gray-300';
    if (isCurrentNode) {
      nodeColor = 'bg-yellow-200 border-yellow-400';
    } else if (isVisited) {
      nodeColor = 'bg-green-200 border-green-400';
    }

    return (
      <div key={node.id} className="flex flex-col items-center">
        <div
          className={`${nodeColor} border-2 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg transition-colors duration-300`}
        >
          {node.value}
        </div>

        {(node.left || node.right) && (
          <div className="flex mt-4 space-x-8">
            <div className="flex flex-col items-center">
              {node.left ? renderTree(node.left, depth + 1) : (
                <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400">
                  ∅
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              {node.right ? renderTree(node.right, depth + 1) : (
                <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400">
                  ∅
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Tree Visualization */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground text-center">
          Binary Tree ({traversalType} traversal)
        </div>
        <div className="flex justify-center p-8 bg-gray-50 rounded-lg border min-h-[300px] items-start">
          {renderTree(tree)}
        </div>
      </div>

      {/* Traversal Order */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground">
          Traversal Order:
        </div>
        <div className="flex space-x-2">
          {traversalOrder.map((value, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center font-bold"
            >
              {value}
            </div>
          ))}
          {traversalOrder.length === 0 && (
            <div className="text-gray-400 italic">No nodes visited yet</div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
          <span>Current node</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
          <span>Visited node</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span>Unvisited node</span>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="text-xs space-y-1 bg-gray-50 p-3 rounded max-w-md">
        <div><strong>{traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal:</strong></div>
        {traversalType === 'inorder' && (
          <div>Left → Current → Right</div>
        )}
        {traversalType === 'preorder' && (
          <div>Current → Left → Right</div>
        )}
        {traversalType === 'postorder' && (
          <div>Left → Right → Current</div>
        )}
      </div>
    </div>
  );
}