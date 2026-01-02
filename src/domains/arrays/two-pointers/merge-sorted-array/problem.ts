import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { MergeSortedArrayVisualizer } from './visualizer';
import { generateMergeSortedArraySteps } from './algorithm';

export const mergeSortedArrayProblem: Problem = {
  id: 'merge-sorted-array',
  title: 'Merge Sorted Array',
  difficulty: 'Easy',
  description: 'Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned but stored inside the array nums1.',
};

export const mergeSortedArrayModule: ProblemModule = {
  config: {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order.',
    constraints: [
      'nums1.length == m + n',
      'nums2.length == n',
      '0 ≤ m, n ≤ 200',
      '1 ≤ m + n ≤ 200',
      '-10^9 ≤ nums1[i], nums2[j] ≤ 10^9',
    ],
    defaultCode: `function merge(nums1, m, nums2, n) {
  let i = m - 1; // Last element in nums1
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Last position in merged array

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Copy remaining elements from nums2
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}`,
    defaultInputs: {
      nums1: [1, 2, 3, 0, 0, 0],
      m: 3,
      nums2: [2, 5, 6],
      n: 3,
    },
    approaches: [
      {
        id: 'extra-space',
        title: 'Extra Space Approach',
        description: 'Use additional array to merge, then copy back',
        code: `function merge(nums1, m, nums2, n) {
  const merged = [];
  let i = 0, j = 0;

  // Merge both arrays
  while (i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else {
      merged.push(nums2[j]);
      j++;
    }
  }

  // Add remaining elements
  while (i < m) merged.push(nums1[i++]);
  while (j < n) merged.push(nums2[j++]);

  // Copy back to nums1
  for (let k = 0; k < merged.length; k++) {
    nums1[k] = merged[k];
  }
}`,
        timeComplexity: 'O(M + N)',
        spaceComplexity: 'O(M + N)'
      },
      {
        id: 'sort-approach',
        title: 'Copy and Sort',
        description: 'Copy nums2 to nums1 and sort the entire array',
        code: `function merge(nums1, m, nums2, n) {
  // Copy nums2 elements to nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  // Sort the entire array
  nums1.sort((a, b) => a - b);
}`,
        timeComplexity: 'O((M + N) log(M + N))',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Merge from the end to avoid overwriting',
        code: `function merge(nums1, m, nums2, n) {
  let i = m - 1; // Last element in nums1
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Last position in merged array

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Copy remaining elements from nums2
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}`,
        timeComplexity: 'O(M + N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { nums1, m, nums2, n } = inputs as { nums1: number[], m: number, nums2: number[], n: number };
    return generateMergeSortedArraySteps(nums1, m, nums2, n);
  },
  Visualizer: MergeSortedArrayVisualizer,
};

export { MergeSortedArrayVisualizer } from './visualizer';
export { generateMergeSortedArraySteps } from './algorithm';