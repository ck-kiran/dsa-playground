import { Pattern } from '@/shared/types/domain';
import {
  longestSubstringWithoutRepeatingCharactersProblem,
  maximumPointsFromCardsProblem,
  maxConsecutiveOnesIIIProblem,
  fruitIntoBasketsProblem,
  longestSubstringWithKUniquesProblem,
  numberOfSubstringsContainingAllThreeCharactersProblem,
  longestRepeatingCharacterReplacementProblem,
  binarySubarraysWithSumProblem,
  countNumberOfNiceSubarraysProblem,
  subarraysWithKDifferentIntegersProblem,
  minimumWindowSubstringProblem,
} from './problem';
import { longestSubarraySumProblem, longestSubarraySumModule } from './longest-subarray-sum/problem';

export const slidingWindowPattern: Pattern = {
  id: 'sliding-window',
  title: 'Sliding Window',
  description: 'Use sliding window technique to solve problems involving contiguous subarrays or substrings.',
  problems: [
    longestSubarraySumProblem,
    longestSubstringWithoutRepeatingCharactersProblem,
    maximumPointsFromCardsProblem,
    maxConsecutiveOnesIIIProblem,
    fruitIntoBasketsProblem,
    longestSubstringWithKUniquesProblem,
    numberOfSubstringsContainingAllThreeCharactersProblem,
    longestRepeatingCharacterReplacementProblem,
    binarySubarraysWithSumProblem,
    countNumberOfNiceSubarraysProblem,
    subarraysWithKDifferentIntegersProblem,
    minimumWindowSubstringProblem,
  ],
};

// Export problem modules for detailed problem pages
export const slidingWindowModules = {
  'longest-subarray-sum': longestSubarraySumModule,
};

export * from './problem';