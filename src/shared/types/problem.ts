import React from 'react';

export interface CodeApproach {
  id: string;
  title: string;
  description: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ProblemConfig {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints: string[];
  defaultCode: string;
  defaultInputs?: Record<string, unknown>;
  approaches?: CodeApproach[];
}

export interface ProblemModule {
  config: ProblemConfig;
  generateSteps: (inputs: Record<string, unknown>) => any[];
  Visualizer?: React.ComponentType<{ step: any }>;
  inputControls?: React.ComponentType<{
    inputs: Record<string, unknown>;
    onChange: (inputs: Record<string, unknown>) => void;
  }>;
}

export interface StepGeneratorInputs {
  [key: string]: unknown;
  array?: number[];
  target?: number;
  text?: string;
  pattern?: string;
  traversalType?: string;
  list?: number[];
}