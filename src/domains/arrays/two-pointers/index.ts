import { Pattern } from '@/shared/types/domain';
import {
  duplicateZerosProblem,
  rotateArrayProblem,
  validMountainArrayProblem,
  bestTimeToBuyAndSellStockProblem
} from './problem';
import { validPalindromeProblem, validPalindromeModule } from './valid-palindrome/problem';
import { containerWithMostWaterProblem, containerWithMostWaterModule } from './container-with-most-water/problem';
import { moveZerosProblem, moveZerosModule } from './move-zeros/problem';
import { removeDuplicatesFromSortedArrayProblem, removeDuplicatesFromSortedArrayModule } from './remove-duplicates-sorted/problem';
import { mergeSortedArrayProblem, mergeSortedArrayModule } from './merge-sorted-array/problem';
import { reverseStringProblem, reverseStringModule } from './reverse-string/problem';
import { threeSumProblem, threeSumModule } from './three-sum/problem';
import { trappingRainWaterProblem, trappingRainWaterModule } from './trapping-rain-water/problem';

export const twoPointersPattern: Pattern = {
  id: 'two-pointers',
  title: 'Two Pointers',
  description: 'Use two pointers to iterate through the array.',
  problems: [
    moveZerosProblem,
    removeDuplicatesFromSortedArrayProblem,
    mergeSortedArrayProblem,
    reverseStringProblem,
    validPalindromeProblem,
    duplicateZerosProblem,
    threeSumProblem,
    trappingRainWaterProblem,
    rotateArrayProblem,
    containerWithMostWaterProblem,
    validMountainArrayProblem,
    bestTimeToBuyAndSellStockProblem,
  ],
};

// Export problem modules for detailed problem pages
export const twoPointersModules = {
  'move-zeros': moveZerosModule,
  'remove-duplicates-from-sorted-array': removeDuplicatesFromSortedArrayModule,
  'merge-sorted-array': mergeSortedArrayModule,
  'reverse-string': reverseStringModule,
  'valid-palindrome': validPalindromeModule,
  'three-sum': threeSumModule,
  'trapping-rain-water': trappingRainWaterModule,
  'container-with-most-water': containerWithMostWaterModule,
};

export * from './problem';