export type Problem = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
};

export type Pattern = {
  id: string;
  title: string;
  description: string;
  problems: Problem[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  icon: string; // We can use lucide icon names or similar
  patterns: Pattern[];
};

// Algorithm execution types
export interface AlgorithmStep {
  action: string;
  data: any;
  highlight?: string[];
  description?: string;
}

export interface VisualizationState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  data: any;
}

// Domain registry types
export interface DomainConfig {
  topic: Topic;
  visualizers: Record<string, React.ComponentType<any>>;
  algorithms: Record<string, AlgorithmStep[]>;
}