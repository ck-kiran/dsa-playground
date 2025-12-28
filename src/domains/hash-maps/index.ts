import { Topic } from '@/shared/types/domain';
import { basicHashingPattern } from './basic-hashing';

export const hashMapsTopic: Topic = {
  id: 'hash-maps',
  title: 'Hash Maps',
  description: 'Data structure that implements an associative array abstract data type.',
  icon: 'Calculator',
  patterns: [
    basicHashingPattern,
  ],
};

export * from './basic-hashing';