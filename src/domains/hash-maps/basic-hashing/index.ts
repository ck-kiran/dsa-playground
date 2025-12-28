import { Pattern } from '@/shared/types/domain';
import { twoSumProblem } from './problem';

export const basicHashingPattern: Pattern = {
  id: 'basic-hashing',
  title: 'Basic Hashing',
  description: 'Using hash maps to store and retrieve data efficiently.',
  problems: [
    twoSumProblem,
  ],
};

export * from './problem';