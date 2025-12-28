'use client';

import { Play, RotateCcw, AlertTriangle, Info, Code2, Presentation, ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { instrumentCode } from '@/lib/code-instrumenter';

import { generateBinarySearchSteps } from '@/domains/arrays/binary-search/algorithm';
import { generateTwoSumSteps } from '@/domains/hash-maps/basic-hashing/algorithm';
import { generateStringSearchSteps } from '@/domains/strings/pattern-matching/algorithm';
import { generateReverseListSteps } from '@/domains/linked-lists/list-manipulation/algorithm';
import { generateTreeTraversalSteps } from '@/domains/trees/tree-traversal/algorithm';
import { Controls } from '@/shared/components/ui/Controls';
import { CodeEditor } from '@/shared/components/ui/CodeEditor';
import { BinarySearchVisualizer } from '@/domains/arrays/binary-search/visualizer';
import { TwoSumVisualizer } from '@/domains/hash-maps/basic-hashing/visualizer';
import { StringSearchVisualizer } from '@/domains/strings/pattern-matching/visualizer';
import { LinkedListVisualizer } from '@/domains/linked-lists/list-manipulation/visualizer';
import { TreeTraversalVisualizer } from '@/domains/trees/tree-traversal/visualizer';

import type { Step } from '@/shared/types/step';

// Initial data configuration
const BINARY_SEARCH_INITIAL = {
  id: 'binary-search-visualizer',
  array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  target: 23,
  title: 'Binary Search',
  difficulty: 'Easy',
  description:
    'Given a sorted array of integers and a target value, return the index of the target if it is present in the array. If it is not present, return -1.',
  constraints: [
    'Array is sorted in ascending order',
    'Time Complexity: O(log N)',
    'Space Complexity: O(1)',
  ],
  code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
};

const TWO_SUM_INITIAL = {
  id: 'two-sum-visualizer',
  array: [2, 7, 11, 15, 3, 6, 8],
  target: 9,
  title: 'Two Sum',
  difficulty: 'Easy',
  description:
    'Find two numbers in an array that add up to a specific target value. Return the indices of the two numbers.',
  constraints: [
    'Each input has exactly one solution',
    'You may not use the same element twice',
    'Time Complexity: O(N)',
    'Space Complexity: O(N)',
  ],
  code: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
};

const STRING_SEARCH_INITIAL = {
  id: 'string-search-visualizer',
  text: 'ABAAABCDABABCABCABCDAB',
  pattern: 'ABCAB',
  title: 'String Search',
  difficulty: 'Medium',
  description:
    'Find all occurrences of a pattern string within a text string using naive string matching algorithm.',
  constraints: [
    'Case sensitive matching',
    'Time Complexity: O(N × M)',
    'Space Complexity: O(1)',
    'N = length of text, M = length of pattern',
  ],
  code: `function naiveStringSearch(text, pattern) {
  const matches = [];

  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j = 0;
    while (j < pattern.length && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === pattern.length) {
      matches.push(i);
    }
  }

  return matches;
}`,
};

const REVERSE_LIST_INITIAL = {
  id: 'reverse-list-visualizer',
  list: [1, 2, 3, 4, 5],
  title: 'Reverse Linked List',
  difficulty: 'Easy',
  description:
    'Reverse a singly linked list iteratively by adjusting the next pointers of each node.',
  constraints: [
    'Reverse in-place',
    'Time Complexity: O(N)',
    'Space Complexity: O(1)',
    'N = number of nodes',
  ],
  code: `function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}`,
};

const TREE_TRAVERSAL_INITIAL = {
  id: 'tree-traversal-visualizer',
  traversalType: 'inorder',
  title: 'Binary Tree Traversal',
  difficulty: 'Medium',
  description:
    'Traverse a binary tree using different strategies: inorder, preorder, and postorder.',
  constraints: [
    'Recursive implementation',
    'Time Complexity: O(N)',
    'Space Complexity: O(H)',
    'N = number of nodes, H = height of tree',
  ],
  code: `function inorderTraversal(root) {
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
};

interface DsaPlaygroundPageProps {
  problemId?: string;
}

export function DsaPlaygroundPage({
  problemId = 'binary-search-visualizer',
}: DsaPlaygroundPageProps) {
  const getConfig = () => {
    switch (problemId) {
      case 'two-sum-visualizer':
        return TWO_SUM_INITIAL;
      case 'string-search-visualizer':
        return STRING_SEARCH_INITIAL;
      case 'reverse-list-visualizer':
        return REVERSE_LIST_INITIAL;
      case 'tree-traversal-visualizer':
        return TREE_TRAVERSAL_INITIAL;
      default:
        return BINARY_SEARCH_INITIAL;
    }
  };

  const config = getConfig();

  // View State
  const [activeTab, setActiveTab] = useState<'code' | 'visualize'>('code');

  const [target, setTarget] = useState<number>((config as any).target || 0);
  const [text, setText] = useState<string>((config as any).text || '');
  const [pattern, setPattern] = useState<string>((config as any).pattern || '');
  const [traversalType, setTraversalType] = useState<string>((config as any).traversalType || 'inorder');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userCode, setUserCode] = useState(() => config.code);
  const [customSteps, setCustomSteps] = useState<Step[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset state when problem changes
  const [lastProblemId, setLastProblemId] = useState(problemId);
  if (lastProblemId !== problemId) {
    setLastProblemId(problemId);
    setUserCode(config.code);
    setCustomSteps(null);
    setError(null);
    setTarget((config as any).target || 0);
    setText((config as any).text || '');
    setPattern((config as any).pattern || '');
    setTraversalType((config as any).traversalType || 'inorder');
    setCurrentStepIndex(0);
    setActiveTab('code');
  }

  const defaultSteps: Step[] = useMemo(() => {
    switch (problemId) {
      case 'two-sum-visualizer':
        return generateTwoSumSteps((config as any).array, target);
      case 'string-search-visualizer':
        return generateStringSearchSteps(text, pattern);
      case 'reverse-list-visualizer':
        return generateReverseListSteps((config as any).list);
      case 'tree-traversal-visualizer':
        return generateTreeTraversalSteps(traversalType as any);
      default:
        return generateBinarySearchSteps((config as any).array, target);
    }
  }, [target, text, pattern, traversalType, problemId, config]);

  const steps = customSteps || defaultSteps;
  const currentStep = steps[currentStepIndex] || steps[steps.length - 1];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setTarget(val);
      setCurrentStepIndex(0);
      setCustomSteps(null);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setCurrentStepIndex(0);
    setCustomSteps(null);
  };

  const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(e.target.value);
    setCurrentStepIndex(0);
    setCustomSteps(null);
  };

  const handleTraversalTypeChange = (type: string) => {
    setTraversalType(type);
    setCurrentStepIndex(0);
    setCustomSteps(null);
  };

  const handleRunCode = () => {
    setError(null);
    setCustomSteps(null);
    try {
      // For new problem types, we'll use default steps since code execution is complex
      // Users can still modify and see how the algorithm works conceptually
      if (problemId === 'string-search-visualizer') {
        setCustomSteps(generateStringSearchSteps(text, pattern));
        setCurrentStepIndex(0);
        setActiveTab('visualize');
        return;
      }

      if (problemId === 'reverse-list-visualizer') {
        const configList = (config as any).list;
        if (configList) {
          setCustomSteps(generateReverseListSteps(configList));
          setCurrentStepIndex(0);
          setActiveTab('visualize');
        }
        return;
      }

      if (problemId === 'tree-traversal-visualizer') {
        setCustomSteps(generateTreeTraversalSteps(traversalType as any));
        setCurrentStepIndex(0);
        setActiveTab('visualize');
        return;
      }

      // Original code execution for binary search and two sum
      const instrumentedCode = instrumentCode(userCode);
      const recordedSteps: Step[] = [];

      const logStep = (state: Record<string, unknown>) => {
        if (problemId === 'two-sum-visualizer') {
          let mapObj: Record<number, number> = {};
          if (state.map instanceof Map) {
            mapObj = Object.fromEntries(state.map);
          } else if (typeof state.map === 'object' && state.map) {
            mapObj = state.map as Record<number, number>;
          }

          const i =
            typeof state.i === 'number'
              ? state.i
              : typeof state.curr === 'number'
                ? state.curr
                : undefined;

          recordedSteps.push({
            array: (config as any).array,
            pointers: { curr: i || 0 },
            hashMap: mapObj,
            message:
              typeof i === 'number'
                ? `Checking index ${i}, Map size: ${Object.keys(mapObj).length}`
                : `Initializing search...`,
          });
        } else {
          // Binary Search
          const left = typeof state.left === 'number' ? state.left : undefined;
          const right = typeof state.right === 'number' ? state.right : undefined;
          const mid = typeof state.mid === 'number' ? state.mid : undefined;

          const hasRange = left !== undefined && right !== undefined;
          const hasMid = mid !== undefined;

          let message = '';
          if (hasMid && typeof mid === 'number') {
            message = `Checking mid index ${mid} (value: ${(config as any).array[mid]})`;
          } else if (hasRange) {
            message = `Searching range [${left}, ${right}]`;
          } else {
            message = `Initializing binary search...`;
          }

          recordedSteps.push({
            array: (config as any).array,
            pointers: { left: left || 0, right: right || 0, mid: mid || 0 },
            highlightIndices: hasMid && typeof mid === 'number' ? [mid] : [],
            message: message,
          });
        }
      };

      const runner = new Function(
        'arr',
        'target',
        'logStep',
        `
        "use strict";
        ${instrumentedCode}
        if (typeof binarySearch === 'function') return binarySearch(arr, target);
        if (typeof twoSum === 'function') return twoSum(arr, target);
        throw new Error("Function not found");
      `
      );

      runner((config as any).array, target, logStep);

      if (recordedSteps.length === 0) {
        setError('No steps recorded. Loop might not have executed.');
      } else {
        setCustomSteps(recordedSteps);
        setCurrentStepIndex(0);
        setActiveTab('visualize'); // Automatically switch to visualizer on success
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4 overflow-hidden relative">
      {/* Header Bar */}
      <div className="flex items-center justify-between shrink-0 px-2 h-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{config.title}</h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold
            ${config.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}
          `}
          >
            {config.difficulty}
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all
                    ${activeTab === 'code' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}
                `}
          >
            Code & Problem
          </button>
          <button
            onClick={() => setActiveTab('visualize')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all
                    ${activeTab === 'visualize' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}
                `}
          >
            Visualizer
          </button>
        </div>
      </div>

      {/* Code View */}
      {activeTab === 'code' && (
        <div className="flex-1 flex gap-4 min-h-0 animate-in fade-in zoom-in-95 duration-200">
          {/* Left Panel: Problem Statement */}
          <div className="w-[35%] flex flex-col gap-4 overflow-hidden">
            <div className="bg-card border rounded-xl flex flex-col shadow-sm h-full overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2 text-sm font-medium">
                <Info className="w-4 h-4 text-primary" />
                Problem Statement
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {config.description}
                  </p>

                  <h4 className="text-foreground font-semibold mt-6 mb-2 uppercase text-xs tracking-wider">
                    Constraints
                  </h4>
                  <ul className="space-y-1 list-disc pl-4 text-sm text-muted-foreground">
                    {config.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Code Editor */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden bg-card border rounded-xl shadow-sm h-full">
              <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Code2 className="w-4 h-4 text-primary" />
                  Solution
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUserCode(config.code)}
                    title="Reset Code"
                  >
                    <RotateCcw className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleRunCode}
                    className="h-8 gap-2 bg-green-600 hover:bg-green-700 text-white border-0"
                  >
                    <Play className="w-3 h-3 fill-current" /> Run & Visualize
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor initialCode={userCode} onChange={v => setUserCode(v || '')} />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="shrink-0">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Execution Error</AlertTitle>
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      )}

      {/* Visualizer View */}
      {activeTab === 'visualize' && (
        <div className="flex-1 flex flex-col gap-4 min-h-0 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex-1 flex flex-col bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Presentation className="w-4 h-4 text-primary" />
                Visualization
              </div>
              <div className="flex items-center gap-3">
                {/* Dynamic input controls based on problem type */}
                {(problemId === 'binary-search-visualizer' || problemId === 'two-sum-visualizer') && (
                  <div className="flex items-center gap-2 mr-2">
                    <Label
                      htmlFor="visualizer-target"
                      className="text-xs text-muted-foreground whitespace-nowrap"
                    >
                      Target Value:
                    </Label>
                    <Input
                      type="number"
                      id="visualizer-target"
                      value={target}
                      onChange={handleTargetChange}
                      className="h-7 w-20 text-xs bg-background"
                    />
                  </div>
                )}
                {problemId === 'string-search-visualizer' && (
                  <>
                    <div className="flex items-center gap-2 mr-2">
                      <Label className="text-xs text-muted-foreground whitespace-nowrap">
                        Text:
                      </Label>
                      <Input
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        className="h-7 w-32 text-xs bg-background"
                      />
                    </div>
                    <div className="flex items-center gap-2 mr-2">
                      <Label className="text-xs text-muted-foreground whitespace-nowrap">
                        Pattern:
                      </Label>
                      <Input
                        type="text"
                        value={pattern}
                        onChange={handlePatternChange}
                        className="h-7 w-20 text-xs bg-background"
                      />
                    </div>
                  </>
                )}
                {problemId === 'tree-traversal-visualizer' && (
                  <div className="flex items-center gap-2 mr-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Type:
                    </Label>
                    <select
                      value={traversalType}
                      onChange={(e) => handleTraversalTypeChange(e.target.value)}
                      className="h-7 text-xs bg-background border border-input rounded-md px-2"
                    >
                      <option value="inorder">Inorder</option>
                      <option value="preorder">Preorder</option>
                      <option value="postorder">Postorder</option>
                    </select>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('code')}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Code
                </Button>
                <div className="h-4 w-px bg-border mx-1" />
                <Button variant="outline" size="sm" onClick={handleReset} className="h-7 text-xs">
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </Button>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-8 bg-background/50 overflow-y-auto">
              {(() => {
                switch (problemId) {
                  case 'two-sum-visualizer':
                    return <TwoSumVisualizer step={currentStep} />;
                  case 'string-search-visualizer':
                    return <StringSearchVisualizer step={currentStep} />;
                  case 'reverse-list-visualizer':
                    return <LinkedListVisualizer step={currentStep} />;
                  case 'tree-traversal-visualizer':
                    return <TreeTraversalVisualizer step={currentStep} />;
                  default:
                    return <BinarySearchVisualizer step={currentStep} />;
                }
              })()}
            </div>

            <div className="p-4 border-t bg-muted/10 shrink-0">
              <Controls
                onNext={handleNext}
                onReset={handleReset}
                canNext={currentStepIndex < steps.length - 1}
                currentStepIndex={currentStepIndex}
                totalSteps={steps.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
