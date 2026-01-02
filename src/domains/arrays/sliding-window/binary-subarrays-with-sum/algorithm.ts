import type { Step } from '@/shared/types/step';

export const generateBinarySubarraysWithSumSteps = (nums: number[], goal: number): Step[] => {
  const steps: Step[] = [];

  const atMost = (g: number) => {
    let left = 0, sum = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > g && left <= right) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  const result = atMost(goal) - atMost(goal - 1);

  steps.push({
    array: [...nums],
    message: `Count binary subarrays with sum = ${goal}`,
    data: { goal }
  });

  steps.push({
    array: [...nums],
    message: `Result: ${result} subarrays`,
    isComplete: true,
    data: { result, goal }
  });

  return steps;
};
