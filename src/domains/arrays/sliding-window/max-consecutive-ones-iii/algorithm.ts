import type { Step } from '@/shared/types/step';

export const generateMaxConsecutiveOnesIIISteps = (nums: number[], k: number): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let maxOnes = 0;
  let zeros = 0;

  steps.push({
    array: [...nums],
    pointers: { left, right: 0 },
    message: `Find max consecutive 1's after flipping at most ${k} zeros`,
    highlightIndices: [],
    data: { k, zeros, maxOnes }
  });

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros++;
    }

    steps.push({
      array: [...nums],
      pointers: { left, right },
      message: `Expand window: nums[${right}] = ${nums[right]}. Zeros in window: ${zeros}`,
      highlightIndices: [right],
      action: 'expand',
      data: { k, zeros, maxOnes, currentWindow: right - left + 1 }
    });

    while (zeros > k) {
      steps.push({
        array: [...nums],
        pointers: { left, right },
        message: `Too many zeros (${zeros} > ${k}). Shrink window from left`,
        highlightIndices: [left],
        action: 'shrink',
        data: { k, zeros, maxOnes }
      });

      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    const currentLength = right - left + 1;
    if (currentLength > maxOnes) {
      maxOnes = currentLength;

      steps.push({
        array: [...nums],
        pointers: { left, right },
        message: `New max: ${maxOnes} consecutive ones`,
        highlightIndices: Array.from({ length: currentLength }, (_, i) => left + i),
        action: 'update-max',
        data: { k, zeros, maxOnes, currentWindow: currentLength }
      });
    }
  }

  steps.push({
    array: [...nums],
    pointers: {},
    message: `Maximum ${maxOnes} consecutive 1's possible by flipping at most ${k} zeros`,
    highlightIndices: [],
    isComplete: true,
    data: { result: maxOnes, k }
  });

  return steps;
};
