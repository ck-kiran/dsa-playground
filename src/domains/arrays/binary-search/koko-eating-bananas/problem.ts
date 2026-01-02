import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { KokoEatingBananasVisualizer } from './visualizer';
import { generateKokoEatingBananasSteps } from './algorithm';

export const kokoEatingBananasProblem: Problem = {
  id: 'koko-eating-bananas',
  title: 'Koko Eating Bananas',
  difficulty: 'Medium',
  description: 'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Return the minimum integer k such that she can eat all the bananas within h hours.',
};

export const kokoEatingBananasModule: ProblemModule = {
  config: {
    id: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    description: 'Koko loves to eat bananas. There are n piles of bananas. Return the minimum integer k such that she can eat all the bananas within h hours.',
    constraints: [
      '1 ≤ piles.length ≤ 10^4',
      'piles.length ≤ h ≤ 10^9',
      '1 ≤ piles[i] ≤ 10^9',
    ],
    defaultCode: `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const timeNeeded = calculateTime(piles, mid);

    if (timeNeeded <= h) {
      right = mid; // Can eat slower
    } else {
      left = mid + 1; // Need to eat faster
    }
  }

  return left;
}

function calculateTime(piles, speed) {
  return piles.reduce((total, pile) =>
    total + Math.ceil(pile / speed), 0);
}`,
    defaultInputs: {
      piles: [3, 6, 7, 11],
      h: 8,
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        description: 'Try every possible eating speed',
        code: `function minEatingSpeed(piles, h) {
  const maxPile = Math.max(...piles);

  for (let speed = 1; speed <= maxPile; speed++) {
    const timeNeeded = calculateTime(piles, speed);
    if (timeNeeded <= h) {
      return speed;
    }
  }

  return maxPile;
}`,
        timeComplexity: 'O(N * max(piles))',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'binary-search',
        title: 'Binary Search (Optimal)',
        description: 'Binary search on the answer space',
        code: `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const timeNeeded = calculateTime(piles, mid);

    if (timeNeeded <= h) {
      right = mid; // Can eat slower
    } else {
      left = mid + 1; // Need to eat faster
    }
  }

  return left;
}

function calculateTime(piles, speed) {
  return piles.reduce((total, pile) =>
    total + Math.ceil(pile / speed), 0);
}`,
        timeComplexity: 'O(N * log(max(piles)))',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { piles, h } = inputs as { piles: number[]; h: number };
    return generateKokoEatingBananasSteps(piles, h);
  },
  Visualizer: KokoEatingBananasVisualizer,
};

export { KokoEatingBananasVisualizer } from './visualizer';
export { generateKokoEatingBananasSteps } from './algorithm';