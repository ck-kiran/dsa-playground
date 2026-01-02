import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { MaximumPointsFromCardsVisualizer } from './visualizer';
import { generateMaximumPointsFromCardsSteps } from './algorithm';

export const maximumPointsFromCardsProblem: Problem = {
  id: 'maximum-points-from-cards',
  title: 'Maximum Points You Can Obtain from Cards',
  difficulty: 'Medium',
  description: 'There are several cards arranged in a row. You can take one card from the beginning or from the end of the row. You have to take exactly k cards.',
};

export const maximumPointsFromCardsModule: ProblemModule = {
  config: {
    id: 'maximum-points-from-cards',
    title: 'Maximum Points You Can Obtain from Cards',
    difficulty: 'Medium',
    description: 'There are several cards arranged in a row, and each card has an associated number of points. In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards. Your score is the sum of the points of the cards you have taken. Return the maximum score you can obtain.',
    constraints: [
      '1 ≤ cardPoints.length ≤ 10^5',
      '1 ≤ cardPoints[i] ≤ 10^4',
      '1 ≤ k ≤ cardPoints.length',
    ],
    defaultCode: `function maxScore(cardPoints, k) {
  const n = cardPoints.length;
  let total = cardPoints.slice(0, k).reduce((a, b) => a + b, 0);
  let maxScore = total;

  for (let i = 0; i < k; i++) {
    total = total - cardPoints[k - 1 - i] + cardPoints[n - 1 - i];
    maxScore = Math.max(maxScore, total);
  }

  return maxScore;
}`,
    defaultInputs: {
      array: [1, 2, 3, 4, 5, 6, 1],
      k: 3,
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Start with k cards from left, swap one at a time from right',
        code: `function maxScore(cardPoints, k) {
  const n = cardPoints.length;
  let total = cardPoints.slice(0, k).reduce((a, b) => a + b, 0);
  let maxScore = total;

  for (let i = 0; i < k; i++) {
    total = total - cardPoints[k - 1 - i] + cardPoints[n - 1 - i];
    maxScore = Math.max(maxScore, total);
  }

  return maxScore;
}`,
        timeComplexity: 'O(K)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array, k } = inputs as { array: number[]; k: number };
    return generateMaximumPointsFromCardsSteps(array, k);
  },
  Visualizer: MaximumPointsFromCardsVisualizer,
};

export { MaximumPointsFromCardsVisualizer } from './visualizer';
export { generateMaximumPointsFromCardsSteps } from './algorithm';
