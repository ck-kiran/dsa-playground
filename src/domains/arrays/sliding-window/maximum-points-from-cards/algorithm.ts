import type { Step } from '@/shared/types/step';

export const generateMaximumPointsFromCardsSteps = (cardPoints: number[], k: number): Step[] => {
  const steps: Step[] = [];
  const n = cardPoints.length;
  let totalPoints = cardPoints.slice(0, k).reduce((a, b) => a + b, 0);
  let maxPoints = totalPoints;

  steps.push({
    array: [...cardPoints],
    message: `Take first ${k} cards. Total: ${totalPoints}`,
    highlightIndices: Array.from({ length: k }, (_, i) => i),
    data: { k, totalPoints, maxPoints }
  });

  for (let i = 0; i < k; i++) {
    totalPoints = totalPoints - cardPoints[k - 1 - i] + cardPoints[n - 1 - i];

    steps.push({
      array: [...cardPoints],
      message: `Swap: Remove card[${k - 1 - i}], Add card[${n - 1 - i}]. Total: ${totalPoints}`,
      highlightIndices: [k - 1 - i, n - 1 - i],
      data: { k, totalPoints, maxPoints }
    });

    maxPoints = Math.max(maxPoints, totalPoints);
  }

  steps.push({
    array: [...cardPoints],
    message: `Maximum points: ${maxPoints}`,
    isComplete: true,
    data: { result: maxPoints, k }
  });

  return steps;
};
