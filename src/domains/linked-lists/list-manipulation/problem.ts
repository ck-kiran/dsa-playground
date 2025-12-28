import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { LinkedListVisualizer } from './visualizer';
import { generateReverseListSteps } from './algorithm';

export const reverseListProblem: Problem = {
  id: 'reverse-list-visualizer',
  title: 'Reverse Linked List',
  difficulty: 'Easy',
  description: 'Visualize how to reverse a linked list step by step.',
};

export const reverseListModule: ProblemModule = {
  config: {
    id: 'reverse-list-visualizer',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: 'Reverse a singly linked list iteratively by adjusting the next pointers of each node.',
    constraints: [
      'Reverse in-place',
      'Time Complexity: O(N)',
      'Space Complexity: O(1)',
      'N = number of nodes',
    ],
    defaultCode: `function reverseList(head) {
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
    defaultInputs: {
      list: [1, 2, 3, 4, 5],
    },
  },
  generateSteps: (inputs) => {
    const { list } = inputs as { list: number[] };
    return generateReverseListSteps(list);
  },
  Visualizer: LinkedListVisualizer,
};

export { LinkedListVisualizer } from './visualizer';
export { generateReverseListSteps } from './algorithm';