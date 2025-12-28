import { Problem } from '@/shared/types/domain';

export const binarySearchProblem: Problem = {
  id: 'binary-search-visualizer',
  title: 'Binary Search',
  difficulty: 'Easy',
  description: 'Visualize how binary search divides the search space.',
};

export { BinarySearchVisualizer } from './visualizer';
export { generateBinarySearchSteps } from './algorithm';