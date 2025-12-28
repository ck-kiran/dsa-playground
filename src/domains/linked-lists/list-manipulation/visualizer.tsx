'use client';

import React, { useState, useCallback } from 'react';
import type { Step } from '../../../shared/types/step';

interface ListNode {
  value: number;
  next: number | null;
  id: number;
}

interface ReverseListVisualizerProps {
  initialList?: number[];
}

export function ReverseListVisualizer({
  initialList = [1, 2, 3, 4, 5]
}: ReverseListVisualizerProps) {
  const [originalNodes, setOriginalNodes] = useState<ListNode[]>(() =>
    initialList.map((val, idx) => ({
      value: val,
      next: idx < initialList.length - 1 ? idx + 1 : null,
      id: idx
    }))
  );

  const [nodes, setNodes] = useState<ListNode[]>(originalNodes);
  const [prev, setPrev] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | null>(0);
  const [next, setNext] = useState<number | null>(1);
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const reset = useCallback(() => {
    const resetNodes = originalNodes.map((node, idx) => ({
      ...node,
      next: idx < originalNodes.length - 1 ? idx + 1 : null
    }));
    setNodes(resetNodes);
    setPrev(null);
    setCurrent(0);
    setNext(originalNodes.length > 1 ? 1 : null);
    setStep(0);
    setIsAnimating(false);
    setIsReversed(false);
  }, [originalNodes]);

  const stepForward = useCallback(async () => {
    if (current === null || isAnimating) return;

    setIsAnimating(true);

    // Store next before we lose it
    const nextNode = nodes[current]?.next;

    // Reverse the current node's pointer
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === current
          ? { ...node, next: prev }
          : node
      )
    );

    await new Promise(resolve => setTimeout(resolve, 800));

    // Move pointers forward
    setPrev(current);
    setCurrent(nextNode);
    setNext(nextNode !== null && nodes[nextNode] ? nodes[nextNode].next : null);
    setStep(step + 1);

    // Check if we're done
    if (nextNode === null) {
      setIsReversed(true);
    }

    setIsAnimating(false);
  }, [current, prev, nodes, step, isAnimating]);

  const autoReverse = useCallback(async () => {
    if (isAnimating) return;

    let currentTemp = current;
    let prevTemp = prev;
    let stepTemp = step;

    while (currentTemp !== null) {
      setIsAnimating(true);

      // Store next before we lose it
      const nextNode = nodes.find(n => n.id === currentTemp)?.next || null;

      // Reverse the current node's pointer
      setNodes(prevNodes =>
        prevNodes.map(node =>
          node.id === currentTemp
            ? { ...node, next: prevTemp }
            : node
        )
      );

      await new Promise(resolve => setTimeout(resolve, 600));

      // Move pointers forward
      setPrev(currentTemp);
      setCurrent(nextNode);
      setNext(nextNode !== null ? nodes.find(n => n.id === nextNode)?.next || null : null);
      setStep(stepTemp + 1);

      prevTemp = currentTemp;
      currentTemp = nextNode;
      stepTemp++;

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsReversed(true);
    setIsAnimating(false);
  }, [current, prev, nodes, step, isAnimating]);

  const updateList = useCallback((newList: number[]) => {
    const newNodes = newList.map((val, idx) => ({
      value: val,
      next: idx < newList.length - 1 ? idx + 1 : null,
      id: idx
    }));
    setOriginalNodes(newNodes);
    setNodes(newNodes);
    setPrev(null);
    setCurrent(newList.length > 0 ? 0 : null);
    setNext(newList.length > 1 ? 1 : null);
    setStep(0);
    setIsReversed(false);
  }, []);

  const renderNode = (node: ListNode, index: number) => {
    const isCurrentNode = current === node.id;
    const isPrevNode = prev === node.id;
    const isNextNode = next === node.id;

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
        <div className={`relative ${nodeColor} border-2 rounded-lg p-4 min-w-[80px] text-center`}>
          <div className="text-lg font-bold">{node.value}</div>
          {label && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded bg-gray-100">
              {label}
            </div>
          )}
        </div>

        {node.next !== null && (
          <div className="flex items-center mx-2">
            <div className="w-8 h-0.5 bg-gray-400"></div>
            <div className="w-0 h-0 border-l-[8px] border-l-gray-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
          </div>
        )}

        {node.next === null && index < nodes.length - 1 && (
          <div className="mx-2 text-gray-400">NULL</div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Custom List (comma-separated numbers):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="1,2,3,4,5"
              onChange={(e) => {
                const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                if (values.length > 0) {
                  updateList(values);
                }
              }}
              className="flex-1 p-2 border rounded text-sm"
              disabled={isAnimating}
            />
            <button
              onClick={() => updateList([1, 2, 3, 4, 5])}
              className="px-3 py-2 bg-gray-500 text-white rounded text-sm"
              disabled={isAnimating}
            >
              Default
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-lg font-semibold">
          {isReversed ? 'Reversed' : 'Original'} Linked List:
        </div>

        <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg min-h-[120px]">
          {nodes.map((node, index) => renderNode(node, index))}
          {nodes.length === 0 && (
            <div className="text-gray-400">Empty list</div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm">
          <div><strong>Step {step}:</strong></div>
          {!isReversed ? (
            <div>
              {current !== null ? (
                <>Current node: {nodes.find(n => n.id === current)?.value},
                 Previous: {prev !== null ? nodes.find(n => n.id === prev)?.value : 'null'}</>
              ) : (
                'Reversal complete!'
              )}
            </div>
          ) : (
            <div>Linked list has been reversed successfully!</div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={stepForward}
            disabled={isAnimating || current === null}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm"
          >
            {isAnimating ? 'Processing...' : 'Next Step'}
          </button>
          <button
            onClick={autoReverse}
            disabled={isAnimating || current === null}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300 text-sm"
          >
            Auto Reverse
          </button>
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-4 py-2 bg-gray-500 text-white rounded text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-xs space-y-1 bg-gray-50 p-3 rounded">
        <div><strong>Algorithm:</strong></div>
        <div>1. Keep track of previous, current, and next nodes</div>
        <div>2. Reverse the current node's pointer to point to previous</div>
        <div>3. Move all pointers one step forward</div>
        <div>4. Repeat until current becomes null</div>
      </div>
    </div>
  );
}

// Step-based visualizer for the DsaPlaygroundPage
export function LinkedListVisualizer({ step }: { step: Step }) {
  const { linkedList = [], listPointers = {} } = step;

  if (!linkedList || linkedList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-lg text-muted-foreground">
          No linked list provided
        </div>
      </div>
    );
  }

  const renderNode = (node: any, index: number) => {
    const { prev, current, next } = listPointers;
    const isCurrentNode = current === node.id;
    const isPrevNode = prev === node.id;
    const isNextNode = next === node.id;

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
      <div key={node.id || index} className="relative flex items-center">
        <div className={`relative ${nodeColor} border-2 rounded-lg p-4 min-w-[80px] text-center`}>
          <div className="text-lg font-bold">{node.value}</div>
          {label && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded bg-gray-100">
              {label}
            </div>
          )}
        </div>

        {node.next !== null && (
          <div className="flex items-center mx-2">
            <div className="w-8 h-0.5 bg-gray-400"></div>
            <div className="w-0 h-0 border-l-[8px] border-l-gray-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
          </div>
        )}

        {node.next === null && index < linkedList.length - 1 && (
          <div className="mx-2 text-gray-400">NULL</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Linked List Visualization */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground text-center">
          Linked List Reversal
        </div>
        <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg border min-h-[120px] justify-center">
          {linkedList.map((node, index) => renderNode(node, index))}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="text-center max-w-lg p-4 bg-background rounded-md border shadow-sm">
        <p className="text-lg font-medium text-foreground">{step.message}</p>
      </div>

      {/* Legend */}
      <div className="flex space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
          <span>Current node</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
          <span>Previous node</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded"></div>
          <span>Next node</span>
        </div>
      </div>
    </div>
  );
}