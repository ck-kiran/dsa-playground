import { Pattern } from '@/shared/types/domain';
import {
  twoSumProblem,
  maxNumberOfBalloonsProblem,
  containsDuplicateIIProblem,
  longestConsecutiveSequenceProblem,
  numberOfGoodPairsProblem,
  isomorphicStringsProblem,
  ransomNoteProblem,
  groupAnagramsProblem
} from './problem';
import { containsDuplicateProblem } from './contains-duplicate/problem';
import { validAnagramProblem } from './valid-anagram/problem';

export const basicHashingPattern: Pattern = {
  id: 'basic-hashing',
  title: 'Basic Hashing',
  description: 'Using hash maps to store and retrieve data efficiently.',
  problems: [
    twoSumProblem,
    maxNumberOfBalloonsProblem,
    containsDuplicateProblem,
    containsDuplicateIIProblem,
    validAnagramProblem,
    longestConsecutiveSequenceProblem,
    numberOfGoodPairsProblem,
    isomorphicStringsProblem,
    ransomNoteProblem,
    groupAnagramsProblem,
  ],
};

export * from './problem';