import { problemRegistry } from '@/shared/services/problemRegistry';

// Visualizer status mapping - now uses dynamic registry
export const getVisualizerStatus = (problemId: string): 'Available' | 'Coming Soon' => {
  const availableProblems = problemRegistry.getAllIds();
  return availableProblems.includes(problemId) ? 'Available' : 'Coming Soon';
};

// Animation speeds
export const PLAYBACK_SPEEDS = {
  slow: 2000,
  normal: 1000,
  fast: 500,
  veryFast: 200
} as const;

export type PlaybackSpeed = keyof typeof PLAYBACK_SPEEDS;