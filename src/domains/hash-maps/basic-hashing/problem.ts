import { Problem } from '@/shared/types/domain';

export const twoSumProblem: Problem = {
  id: 'two-sum-visualizer',
  title: 'Two Sum',
  difficulty: 'Easy',
  description: 'Find two numbers that add up to a specific target.',
};

export { TwoSumVisualizer } from './visualizer';
export { generateTwoSumSteps } from './algorithm';