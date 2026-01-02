import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { GuessNumberVisualizer } from './visualizer';
import { generateGuessNumberSteps } from './algorithm';

export const guessNumberHigherOrLowerProblem: Problem = {
  id: 'guess-number-higher-or-lower',
  title: 'Guess Number Higher or Lower',
  difficulty: 'Easy',
  description: 'We are playing the Guess Game. My number is between 1 and n. You guess a number and I tell you whether it is higher or lower than my number.',
};

export const guessNumberHigherOrLowerModule: ProblemModule = {
  config: {
    id: 'guess-number-higher-or-lower',
    title: 'Guess Number Higher or Lower',
    difficulty: 'Easy',
    description: 'We are playing the Guess Game. My number is between 1 and n. You have to guess which number I picked. Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.',
    constraints: [
      '1 ≤ n ≤ 2^31 - 1',
      '1 ≤ pick ≤ n',
    ],
    defaultCode: `function guessNumber(n) {
  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const result = guess(mid);

    if (result === 0) {
      return mid; // Found it!
    } else if (result === -1) {
      right = mid - 1; // Target is lower
    } else {
      left = mid + 1; // Target is higher
    }
  }

  return -1; // Should never reach here
}

// API function (provided by the system)
function guess(num) {
  // Returns:
  // -1: My number is lower
  //  0: Correct!
  //  1: My number is higher
}`,
    defaultInputs: {
      n: 10,
      pick: 6,
    },
    approaches: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Try each number from 1 to n',
        code: `function guessNumber(n) {
  for (let i = 1; i <= n; i++) {
    if (guess(i) === 0) {
      return i;
    }
  }
  return -1;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (Optimal)',
        description: 'Use binary search to minimize guesses',
        code: `function guessNumber(n) {
  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const result = guess(mid);

    if (result === 0) {
      return mid; // Found it!
    } else if (result === -1) {
      right = mid - 1; // Target is lower
    } else {
      left = mid + 1; // Target is higher
    }
  }

  return -1; // Should never reach here
}`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { n, pick } = inputs as { n: number; pick: number };
    return generateGuessNumberSteps(n, pick);
  },
  Visualizer: GuessNumberVisualizer,
};

export { GuessNumberVisualizer } from './visualizer';
export { generateGuessNumberSteps } from './algorithm';