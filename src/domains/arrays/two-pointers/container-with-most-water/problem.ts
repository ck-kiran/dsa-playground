import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { ContainerWithMostWaterVisualizer } from './visualizer';
import { generateContainerWithMostWaterSteps } from './algorithm';

export const containerWithMostWaterProblem: Problem = {
  id: 'container-with-most-water',
  title: 'Container With Most Water',
  difficulty: 'Medium',
  description: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container that can contain the most water.',
};

export const containerWithMostWaterModule: ProblemModule = {
  config: {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    constraints: [
      'n == height.length',
      '2 ≤ n ≤ 10^5',
      '0 ≤ height[i] ≤ 10^4',
    ],
    defaultCode: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    maxWater = Math.max(maxWater, area);

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}`,
    defaultInputs: {
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        description: 'Check all possible pairs of lines',
        code: `function maxArea(height) {
  let maxWater = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = j - i;
      const minHeight = Math.min(height[i], height[j]);
      const area = width * minHeight;
      maxWater = Math.max(maxWater, area);
    }
  }

  return maxWater;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        description: 'Use two pointers starting from ends',
        code: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    maxWater = Math.max(maxWater, area);

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { heights } = inputs as { heights: number[] };
    return generateContainerWithMostWaterSteps(heights);
  },
  Visualizer: ContainerWithMostWaterVisualizer,
};

export { ContainerWithMostWaterVisualizer } from './visualizer';
export { generateContainerWithMostWaterSteps } from './algorithm';