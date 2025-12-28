'use client';

import { Play, RotateCcw, AlertTriangle, Info, Code2, Presentation, ArrowLeft, ChevronDown, ChevronRight, Home } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { instrumentCode } from '@/lib/code-instrumenter';

import { problemRegistry } from '@/shared/services/problemRegistry';
import { ProblemInputControls } from '@/shared/components/ProblemInputControls';
import { Controls } from '@/shared/components/ui/Controls';
import { CodeEditor } from '@/shared/components/ui/CodeEditor';
import { useDomain } from '@/shared/hooks/useDomain';

import type { Step } from '@/shared/types/step';

interface DsaPlaygroundPageProps {
  problemId?: string;
  topicId?: string;
  patternId?: string;
}

export function DsaPlaygroundPage({
  problemId = 'binary-search-visualizer',
  topicId,
  patternId,
}: DsaPlaygroundPageProps) {
  const problemModule = problemRegistry.get(problemId);
  const { getTopicById, getPatternById } = useDomain();

  const topic = topicId ? getTopicById(topicId) : null;
  const pattern = topicId && patternId ? getPatternById(topicId, patternId) : null;

  if (!problemModule) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Problem Not Found</AlertTitle>
          <AlertDescription>
            The problem "{problemId}" could not be loaded.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { config } = problemModule;

  // View State
  const [activeTab, setActiveTab] = useState<'code' | 'visualize'>('code');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userCode, setUserCode] = useState(config.defaultCode);
  const [customSteps, setCustomSteps] = useState<Step[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedApproach, setSelectedApproach] = useState(config.approaches?.[0]?.id || 'default');
  const [isApproachDropdownOpen, setIsApproachDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Problem inputs state
  const [inputs, setInputs] = useState<Record<string, unknown>>(
    config.defaultInputs || {}
  );

  // Reset state when problem changes
  const [lastProblemId, setLastProblemId] = useState(problemId);
  if (lastProblemId !== problemId) {
    setLastProblemId(problemId);
    setUserCode(config.defaultCode);
    setCustomSteps(null);
    setError(null);
    setInputs(config.defaultInputs || {});
    setCurrentStepIndex(0);
    setActiveTab('code');
    setSelectedApproach(config.approaches?.[0]?.id || 'default');
  }

  // Get selected approach
  const currentApproach = config.approaches?.find(a => a.id === selectedApproach);
  const displayCode = currentApproach?.code || config.defaultCode;

  // Handle approach change
  const handleApproachChange = (approachId: string) => {
    setSelectedApproach(approachId);
    const approach = config.approaches?.find(a => a.id === approachId);
    setUserCode(approach?.code || config.defaultCode);
    setIsApproachDropdownOpen(false);
  };

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...(topic ? [{ label: topic.title, href: `/${topicId}` }] : []),
    ...(pattern ? [{ label: pattern.title, href: `/${topicId}/${patternId}` }] : []),
    { label: config.title }
  ];

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsApproachDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate default steps based on current inputs
  const defaultSteps: Step[] = useMemo(() => {
    return problemModule.generateSteps(inputs);
  }, [inputs, problemModule]);

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

  const handleInputChange = (newInputs: Record<string, unknown>) => {
    setInputs(newInputs);
    setCurrentStepIndex(0);
    setCustomSteps(null);
  };

  const handleRunCode = () => {
    setError(null);
    setCustomSteps(null);

    try {
      // For most problems, use default steps since code execution is complex
      if (problemId !== 'binary-search-visualizer' && problemId !== 'two-sum-visualizer') {
        setCustomSteps(problemModule.generateSteps(inputs));
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
            array: inputs.array as number[],
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
            message = `Checking mid index ${mid} (value: ${(inputs.array as number[])[mid]})`;
          } else if (hasRange) {
            message = `Searching range [${left}, ${right}]`;
          } else {
            message = `Initializing binary search...`;
          }

          recordedSteps.push({
            array: inputs.array as number[],
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

      runner(inputs.array, inputs.target, logStep);

      if (recordedSteps.length === 0) {
        setError('No steps recorded. Loop might not have executed.');
      } else {
        setCustomSteps(recordedSteps);
        setCurrentStepIndex(0);
        setActiveTab('visualize');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // Dynamically render the visualizer
  const VisualizerComponent = problemModule.Visualizer;

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4 overflow-hidden relative">
      {/* Breadcrumb */}
      <div className="shrink-0">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index === 0 && <Home className="w-4 h-4" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between shrink-0 px-2 h-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{config.title}</h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold
            ${config.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              config.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
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
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Code2 className="w-4 h-4 text-primary" />
                    Solution
                  </div>
                  {/* Code Approach Dropdown */}
                  {config.approaches && config.approaches.length > 0 && (
                    <div ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setIsApproachDropdownOpen(!isApproachDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        {currentApproach?.title || 'Default'}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {isApproachDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-background border rounded-md shadow-lg z-50">
                          {config.approaches.map((approach) => (
                            <button
                              key={approach.id}
                              onClick={() => handleApproachChange(approach.id)}
                              className={`w-full px-3 py-2 text-left text-xs hover:bg-muted transition-colors ${
                                selectedApproach === approach.id ? 'bg-muted' : ''
                              }`}
                            >
                              <div className="font-medium">{approach.title}</div>
                              <div className="text-muted-foreground text-[10px] mt-0.5">
                                Time: {approach.timeComplexity} | Space: {approach.spaceComplexity}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUserCode(currentApproach?.code || config.defaultCode)}
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
                <CodeEditor value={userCode} onChange={v => setUserCode(v || '')} />
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
                {/* Dynamic input controls */}
                <ProblemInputControls
                  problemId={problemId}
                  inputs={inputs}
                  onChange={handleInputChange}
                />
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
              {VisualizerComponent && <VisualizerComponent step={currentStep} />}
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