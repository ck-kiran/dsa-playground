import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { MoveZerosVisualizer } from './visualizer';
import { generateMoveZerosSteps } from './algorithm';

export const moveZerosProblem: Problem = {
  id: 'move-zeros',
  title: 'Move Zeros',
  difficulty: 'Easy',
  description: 'Given an integer array nums, move all 0s to the end of it while maintaining the relative order of the non-zero elements.',
};

export const moveZerosModule: ProblemModule = {
  config: {
    id: 'move-zeros',
    title: 'Move Zeros',
    difficulty: 'Easy',
    description: 'Given an integer array nums, move all 0s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.',
    constraints: [
      '1 ≤ nums.length ≤ 10^4',
      '-2^31 ≤ nums[i] ≤ 2^31 - 1',
    ],
    defaultCode: `function moveZeroes(nums) {
  let writeIndex = 0;

  // First pass: move all non-zeros to the front
  for (let readIndex = 0; readIndex < nums.length; readIndex++) {
    if (nums[readIndex] !== 0) {
      nums[writeIndex] = nums[readIndex];
      writeIndex++;
    }
  }

  // Second pass: fill remaining positions with zeros
  for (let i = writeIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}`,
    defaultInputs: {
      array: [0, 1, 0, 3, 12],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Extra Space)',
        description: 'Create new array with non-zeros first, then zeros',
        code: `function moveZeroes(nums) {
  const nonZeros = [];
  const zeros = [];

  for (const num of nums) {
    if (num === 0) {
      zeros.push(num);
    } else {
      nonZeros.push(num);
    }
  }

  const result = [...nonZeros, ...zeros];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'bubble-approach',
        title: 'Bubble-like Approach',
        description: 'Move each zero to the end by swapping',
        code: `function moveZeroes(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      // Move this zero to the end
      for (let j = i; j < nums.length - 1; j++) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Use read and write pointers to move non-zeros',
        code: `function moveZeroes(nums) {
  let writeIndex = 0;

  // First pass: move all non-zeros to the front
  for (let readIndex = 0; readIndex < nums.length; readIndex++) {
    if (nums[readIndex] !== 0) {
      nums[writeIndex] = nums[readIndex];
      writeIndex++;
    }
  }

  // Second pass: fill remaining positions with zeros
  for (let i = writeIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateMoveZerosSteps(array);
  },
  Visualizer: MoveZerosVisualizer,
};

export { MoveZerosVisualizer } from './visualizer';
export { generateMoveZerosSteps } from './algorithm';