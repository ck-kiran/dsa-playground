import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ValidMountainArrayVisualizer } from './visualizer';
import { generateValidMountainArraySteps } from './algorithm';

export const validMountainArrayProblem: Problem = {
  id: 'valid-mountain-array',
  title: 'Valid Mountain Array',
  difficulty: 'Easy',
  description: 'Given an array of integers arr, return true if it is a valid mountain array.',
};

export const validMountainArrayModule: ProblemModule = {
  config: {
    id: 'valid-mountain-array',
    title: 'Valid Mountain Array',
    difficulty: 'Easy',
    description: 'Given an array of integers arr, return true if and only if it is a valid mountain array. An array is a mountain array if: arr.length >= 3, there exists some i with 0 < i < arr.length - 1 such that arr[0] < arr[1] < ... < arr[i - 1] < arr[i] and arr[i] > arr[i + 1] > ... > arr[arr.length - 1].',
    constraints: [
      '1 ≤ arr.length ≤ 10^4',
      '0 ≤ arr[i] ≤ 10^4',
    ],
    defaultCode: `function validMountainArray(arr) {
  const n = arr.length;
  if (n < 3) return false;

  let i = 0;

  // Walk up
  while (i < n - 1 && arr[i] < arr[i + 1]) {
    i++;
  }

  // Peak can't be first or last
  if (i === 0 || i === n - 1) {
    return false;
  }

  // Walk down
  while (i < n - 1 && arr[i] > arr[i + 1]) {
    i++;
  }

  return i === n - 1;
}`,
    defaultInputs: {
      array: [0, 3, 2, 1],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Find Peak First',
        description: 'Find peak, then verify ascending and descending parts',
        code: `function validMountainArray(arr) {
  const n = arr.length;
  if (n < 3) return false;

  // Find peak
  let peak = 0;
  for (let i = 1; i < n - 1; i++) {
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      peak = i;
      break;
    }
  }

  if (peak === 0) return false;

  // Check ascending before peak
  for (let i = 0; i < peak; i++) {
    if (arr[i] >= arr[i + 1]) return false;
  }

  // Check descending after peak
  for (let i = peak; i < n - 1; i++) {
    if (arr[i] <= arr[i + 1]) return false;
  }

  return true;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Walk up then down in single pass',
        code: `function validMountainArray(arr) {
  const n = arr.length;
  if (n < 3) return false;

  let i = 0;

  // Walk up
  while (i < n - 1 && arr[i] < arr[i + 1]) {
    i++;
  }

  // Peak can't be first or last
  if (i === 0 || i === n - 1) {
    return false;
  }

  // Walk down
  while (i < n - 1 && arr[i] > arr[i + 1]) {
    i++;
  }

  return i === n - 1;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateValidMountainArraySteps(array);
  },
  Visualizer: ValidMountainArrayVisualizer,
};

export { ValidMountainArrayVisualizer } from './visualizer';
export { generateValidMountainArraySteps } from './algorithm';
