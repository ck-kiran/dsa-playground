import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { TrappingRainWaterVisualizer } from './visualizer';
import { generateTrappingRainWaterSteps } from './algorithm';

export const trappingRainWaterProblem: Problem = {
  id: 'trapping-rain-water',
  title: 'Trapping Rain Water',
  difficulty: 'Hard',
  description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
};

export const trappingRainWaterModule: ProblemModule = {
  config: {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: [
      'n == height.length',
      '1 ≤ n ≤ 2 * 10^4',
      '0 ≤ height[i] ≤ 3 * 10^4',
    ],
    defaultCode: `function trap(height) {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,
    defaultInputs: {
      heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        description: 'For each element, find left and right max heights',
        code: `function trap(height) {
  const n = height.length;
  let water = 0;

  for (let i = 0; i < n; i++) {
    // Find maximum height on the left
    let leftMax = 0;
    for (let j = 0; j <= i; j++) {
      leftMax = Math.max(leftMax, height[j]);
    }

    // Find maximum height on the right
    let rightMax = 0;
    for (let j = i; j < n; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }

    // Water trapped at this position
    water += Math.min(leftMax, rightMax) - height[i];
  }

  return water;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        description: 'Pre-compute left and right max arrays',
        code: `function trap(height) {
  const n = height.length;
  if (n === 0) return 0;

  const leftMax = new Array(n);
  const rightMax = new Array(n);
  let water = 0;

  // Fill leftMax array
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // Fill rightMax array
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // Calculate water trapped
  for (let i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return water;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Use two pointers to track max heights optimally',
        code: `function trap(height) {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { heights } = inputs as { heights: number[] };
    return generateTrappingRainWaterSteps(heights);
  },
  Visualizer: TrappingRainWaterVisualizer,
};

export { TrappingRainWaterVisualizer } from './visualizer';
export { generateTrappingRainWaterSteps } from './algorithm';