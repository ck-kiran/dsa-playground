import { Problem } from '@/shared/types/domain';

export const reverseListProblem: Problem = {
  id: 'reverse-list-visualizer',
  title: 'Reverse Linked List',
  difficulty: 'Easy',
  description: 'Visualize how to reverse a linked list step by step.',
};

export { ReverseListVisualizer } from './visualizer';
export { generateReverseListSteps } from './algorithm';