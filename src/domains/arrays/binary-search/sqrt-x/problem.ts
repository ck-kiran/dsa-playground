import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { SqrtVisualizer } from './visualizer';
import { generateSqrtSteps } from './algorithm';

export const sqrtProblem: Problem = {
  id: 'sqrt-x',
  title: 'Sqrt(x)',
  difficulty: 'Easy',
  description: 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.',
};

export const sqrtModule: ProblemModule = {
  config: {
    id: 'sqrt-x',
    title: 'Sqrt(x)',
    difficulty: 'Easy',
    description: 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well. You must not use any built-in exponent function or operator.',
    constraints: [
      '0 ≤ x ≤ 2^31 - 1',
    ],
    defaultCode: `function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}`,
    defaultInputs: {
      x: 8,
    },
    approaches: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Check each number starting from 0',
        code: `function mySqrt(x) {
  if (x < 2) return x;

  for (let i = 1; i <= x; i++) {
    if (i * i === x) {
      return i;
    } else if (i * i > x) {
      return i - 1;
    }
  }

  return 0;
}`,
        timeComplexity: 'O(√N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (Optimal)',
        description: 'Use binary search on the range [0, x/2]',
        code: `function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'newtons-method',
        title: 'Newton\'s Method',
        description: 'Use Newton\'s iterative method for square root',
        code: `function mySqrt(x) {
  if (x < 2) return x;

  let guess = x;
  while (guess * guess > x) {
    guess = Math.floor((guess + x / guess) / 2);
  }

  return guess;
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { x } = inputs as { x: number };
    return generateSqrtSteps(x);
  },
  Visualizer: SqrtVisualizer,
};

export { SqrtVisualizer } from './visualizer';
export { generateSqrtSteps } from './algorithm';