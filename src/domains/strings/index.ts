import { Topic } from '@/shared/types/domain';
import { patternMatchingPattern } from './pattern-matching';

export const stringsTopic: Topic = {
  id: 'strings',
  title: 'Strings',
  description: 'Sequence of characters.',
  icon: 'Type',
  patterns: [
    patternMatchingPattern,
  ],
};

export * from './pattern-matching';