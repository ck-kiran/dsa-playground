import type { Step } from '@/shared/types/step';

export const generateMergeSortedArraySteps = (nums1: number[], m: number, nums2: number[], n: number): Step[] => {
  const steps: Step[] = [];
  const arr1 = [...nums1];
  const arr2 = [...nums2];

  // Initial setup
  let i = m - 1; // Last element in nums1
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Last position in merged array

  steps.push({
    array: [...arr1],
    secondArray: [...arr2],
    pointers: { i, j, k },
    message: `Merge two sorted arrays. Start from the end to avoid overwriting.`,
    highlightIndices: [],
    data: {
      originalNums1: [...nums1],
      originalNums2: [...nums2],
      m, n,
      mergeDirection: 'backward'
    }
  });

  // Main merging loop
  while (i >= 0 && j >= 0) {
    steps.push({
      array: [...arr1],
      secondArray: [...arr2],
      pointers: { i, j, k },
      message: `Compare nums1[${i}] = ${arr1[i]} with nums2[${j}] = ${arr2[j]}`,
      highlightIndices: [k],
      action: 'compare',
      data: {
        value1: arr1[i],
        value2: arr2[j],
        position1: i,
        position2: j,
        mergePosition: k
      }
    });

    if (arr1[i] > arr2[j]) {
      steps.push({
        array: [...arr1],
        secondArray: [...arr2],
        pointers: { i, j, k },
        message: `${arr1[i]} > ${arr2[j]}, so place ${arr1[i]} at position ${k}`,
        highlightIndices: [k, i],
        action: 'place-from-nums1',
        data: {
          placedValue: arr1[i],
          fromArray: 'nums1',
          fromIndex: i,
          toIndex: k
        }
      });

      arr1[k] = arr1[i];
      i--;
    } else {
      steps.push({
        array: [...arr1],
        secondArray: [...arr2],
        pointers: { i, j, k },
        message: `${arr2[j]} >= ${arr1[i]}, so place ${arr2[j]} at position ${k}`,
        highlightIndices: [k, j],
        action: 'place-from-nums2',
        data: {
          placedValue: arr2[j],
          fromArray: 'nums2',
          fromIndex: j,
          toIndex: k
        }
      });

      arr1[k] = arr2[j];
      j--;
    }

    k--;

    steps.push({
      array: [...arr1],
      secondArray: [...arr2],
      pointers: { i, j, k },
      message: `Updated pointers: i=${i}, j=${j}, k=${k}`,
      highlightIndices: k >= 0 ? [k] : [],
      action: 'update-pointers',
      data: {
        newI: i,
        newJ: j,
        newK: k,
        remainingNums1: i >= 0,
        remainingNums2: j >= 0
      }
    });
  }

  // Copy remaining elements from nums2 (if any)
  while (j >= 0) {
    steps.push({
      array: [...arr1],
      secondArray: [...arr2],
      pointers: { i, j, k },
      message: `nums1 exhausted. Copy remaining nums2[${j}] = ${arr2[j]} to position ${k}`,
      highlightIndices: [k, j],
      action: 'copy-remaining-nums2',
      data: {
        remainingValue: arr2[j],
        fromIndex: j,
        toIndex: k
      }
    });

    arr1[k] = arr2[j];
    j--;
    k--;

    steps.push({
      array: [...arr1],
      secondArray: [...arr2],
      pointers: { i, j, k },
      message: `Copied! Continue with remaining elements.`,
      highlightIndices: [],
      action: 'continue-copy'
    });
  }

  // Note: No need to copy remaining nums1 elements as they're already in place

  steps.push({
    array: [...arr1],
    secondArray: [...arr2],
    pointers: {},
    message: `Merge complete! Arrays successfully merged in-place.`,
    highlightIndices: Array.from({ length: m + n }, (_, idx) => idx),
    isComplete: true,
    data: {
      result: [...arr1],
      originalNums1: [...nums1],
      originalNums2: [...nums2],
      totalElements: m + n,
      mergedSuccessfully: true
    }
  });

  return steps;
};