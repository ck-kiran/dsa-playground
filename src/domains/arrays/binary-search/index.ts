import { Pattern } from '@/shared/types/domain';
import { basicBinarySearchProblem, basicBinarySearchModule } from './basic-binary-search/problem';
import { searchInsertProblem, searchInsertModule } from './search-insert-position/problem';
import { findFirstAndLastPositionProblem, findFirstAndLastPositionModule } from './find-first-last-position/problem';
import { searchInRotatedSortedArrayProblem, searchInRotatedSortedArrayModule } from './search-rotated-array/problem';
import { searchInRotatedSortedArrayIIProblem, searchInRotatedSortedArrayIIModule } from './search-rotated-array-ii/problem';
import { sqrtProblem, sqrtModule } from './sqrt-x/problem';
import { findMinimumInRotatedSortedArrayProblem, findMinimumInRotatedSortedArrayModule } from './find-minimum-rotated/problem';
import { singleElementInSortedArrayProblem, singleElementInSortedArrayModule } from './single-element-sorted/problem';
import { guessNumberHigherOrLowerProblem, guessNumberHigherOrLowerModule } from './guess-number/problem';
import { kokoEatingBananasProblem, kokoEatingBananasModule } from './koko-eating-bananas/problem';

export const binarySearchPattern: Pattern = {
  id: 'binary-search',
  title: 'Binary Search',
  description: 'Efficiently search sorted arrays using the divide-and-conquer approach.',
  problems: [
    basicBinarySearchProblem,
    searchInsertProblem,
    guessNumberHigherOrLowerProblem,
    findFirstAndLastPositionProblem,
    searchInRotatedSortedArrayProblem,
    searchInRotatedSortedArrayIIProblem,
    findMinimumInRotatedSortedArrayProblem,
    singleElementInSortedArrayProblem,
    kokoEatingBananasProblem,
    sqrtProblem,
  ],
};

// Export problem modules for detailed problem pages
export const binarySearchModules = {
  'binary-search-visualizer': basicBinarySearchModule,
  'search-insert-position': searchInsertModule,
  'find-first-last-position': findFirstAndLastPositionModule,
  'search-rotated-array': searchInRotatedSortedArrayModule,
  'search-rotated-array-ii': searchInRotatedSortedArrayIIModule,
  'sqrt-x': sqrtModule,
  'find-minimum-rotated': findMinimumInRotatedSortedArrayModule,
  'single-element-sorted': singleElementInSortedArrayModule,
  'guess-number': guessNumberHigherOrLowerModule,
  'koko-eating-bananas': kokoEatingBananasModule,
};

export * from './basic-binary-search/problem';
export * from './search-insert-position/problem';