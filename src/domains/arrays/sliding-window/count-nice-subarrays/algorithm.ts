import type { Step } from '@/shared/types/step';

export const generateCountNiceSubarraysSteps = (nums: number[], k: number): Step[] => {
  const steps: Step[] = [];

  const atMost = (target: number) => {
    let left = 0, odds = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      if (nums[right] % 2 === 1) odds++;
      while (odds > target) {
        if (nums[left] % 2 === 1) odds--;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  const result = atMost(k) - atMost(k - 1);

  steps.push({
    array: [...nums],
    message: `Count subarrays with exactly ${k} odd numbers`,
    data: { k }
  });

  steps.push({
    array: [...nums],
    message: `Result: ${result} nice subarrays`,
    isComplete: true,
    data: { result, k }
  });

  return steps;
};
