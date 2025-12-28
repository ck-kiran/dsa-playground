// Available visualizers - used for checking which problems have implementations
export const AVAILABLE_VISUALIZERS = [
  'binary-search-visualizer',
  'two-sum-visualizer',
  'string-search-visualizer',
  'reverse-list-visualizer',
  'tree-traversal-visualizer'
];

// Visualizer status mapping
export const getVisualizerStatus = (problemId: string): 'Available' | 'Coming Soon' => {
  return AVAILABLE_VISUALIZERS.includes(problemId) ? 'Available' : 'Coming Soon';
};

// Default algorithm inputs for testing/demo purposes
export const DEFAULT_ALGORITHM_INPUTS = {
  'binary-search-visualizer': {
    array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
    target: 7
  },
  'two-sum-visualizer': {
    array: [2, 7, 11, 15],
    target: 9
  },
  'tree-traversal-visualizer': {
    // Default binary tree structure
    root: {
      value: 1,
      left: { value: 2, left: { value: 4 }, right: { value: 5 } },
      right: { value: 3, left: { value: 6 }, right: { value: 7 } }
    }
  },
  'string-search-visualizer': {
    text: 'abcabcabcabc',
    pattern: 'abca'
  },
  'reverse-list-visualizer': {
    list: [1, 2, 3, 4, 5]
  }
};

// Animation speeds
export const PLAYBACK_SPEEDS = {
  slow: 2000,
  normal: 1000,
  fast: 500,
  veryFast: 200
} as const;

export type PlaybackSpeed = keyof typeof PLAYBACK_SPEEDS;