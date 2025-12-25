import type { Step } from '../types/step';

interface LinkedListVisualizerProps {
  step: Step;
}

export function LinkedListVisualizer({ step }: LinkedListVisualizerProps) {
  const { linkedList = [], listPointers } = step;

  if (linkedList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-lg text-muted-foreground">
          No linked list provided
        </div>
      </div>
    );
  }

  const renderNode = (node: { value: number; next: number | null; id: number }) => {
    const isCurrentNode = listPointers?.current === node.id;
    const isPrevNode = listPointers?.prev === node.id;
    const isNextNode = listPointers?.next === node.id;

    let nodeColor = 'bg-white border-gray-300';
    let label = '';

    if (isCurrentNode) {
      nodeColor = 'bg-blue-200 border-blue-400';
      label = 'current';
    } else if (isPrevNode) {
      nodeColor = 'bg-green-200 border-green-400';
      label = 'prev';
    } else if (isNextNode) {
      nodeColor = 'bg-orange-200 border-orange-400';
      label = 'next';
    }

    return (
      <div key={node.id} className="relative flex items-center">
        <div className={`relative ${nodeColor} border-2 rounded-lg p-4 min-w-[80px] text-center transition-colors duration-300`}>
          <div className="text-lg font-bold">{node.value}</div>
          {label && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded bg-gray-100">
              {label}
            </div>
          )}
        </div>

        {/* Arrow visualization */}
        {node.next !== null ? (
          <div className="flex items-center mx-2">
            <div className="w-8 h-0.5 bg-gray-400"></div>
            <div className="w-0 h-0 border-l-[8px] border-l-gray-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
          </div>
        ) : (
          <div className="mx-2 text-gray-400 text-sm">NULL</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Linked List Display */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground text-center">
          Linked List Structure:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-gray-50 rounded-lg min-h-[120px]">
          {linkedList.map((node) => renderNode(node))}
        </div>
      </div>

      {/* Pointer Information */}
      {listPointers && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground text-center">
            Current Pointers:
          </div>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
              <span className="font-medium">Prev</span>
              <span className="text-muted-foreground">
                {listPointers.prev !== null
                  ? linkedList.find(n => n.id === listPointers.prev)?.value || 'null'
                  : 'null'
                }
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
              <span className="font-medium">Current</span>
              <span className="text-muted-foreground">
                {listPointers.current !== null
                  ? linkedList.find(n => n.id === listPointers.current)?.value || 'null'
                  : 'null'
                }
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded"></div>
              <span className="font-medium">Next</span>
              <span className="text-muted-foreground">
                {listPointers.next !== null
                  ? linkedList.find(n => n.id === listPointers.next)?.value || 'null'
                  : 'null'
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
          <span>Previous node</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
          <span>Current node</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded"></div>
          <span>Next node</span>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="text-xs space-y-1 bg-gray-50 p-3 rounded text-center max-w-md">
        <div className="font-bold">Algorithm Steps:</div>
        <div>1. Store reference to next node</div>
        <div>2. Reverse current node's pointer to previous</div>
        <div>3. Move pointers one step forward</div>
        <div>4. Repeat until current becomes null</div>
      </div>
    </div>
  );
}