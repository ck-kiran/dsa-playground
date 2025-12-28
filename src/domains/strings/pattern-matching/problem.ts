import { Problem } from '@/shared/types/domain';

export const stringSearchProblem: Problem = {
  id: 'string-search-visualizer',
  title: 'String Search',
  difficulty: 'Medium',
  description: 'Visualize pattern matching algorithms like KMP or Boyer-Moore.',
};

export { StringSearchVisualizer } from './visualizer';
export { generateStringSearchSteps } from './algorithm';