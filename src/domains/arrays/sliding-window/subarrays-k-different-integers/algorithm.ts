import type { Step } from '@/shared/types/step';

export const generateSubarraysWithKDifferentIntegersSteps = (nums: number[], k: number): Step[] => {
  const steps: Step[] = [];

  const atMost = (target: number) => {
    const map = new Map();
    let left = 0, count = 0;
    for (let right = 0; right < nums.length; right++) {
      map.set(nums[right], (map.get(nums[right]) || 0) + 1);
      while (map.size > target) {
        map.set(nums[left], map.get(nums[left])! - 1);
        if (map.get(nums[left]) === 0) map.delete(nums[left]);
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };

  const result = atMost(k) - atMost(k - 1);

  steps.push({
    array: [...nums],
    message: `Count subarrays with exactly ${k} different integers`,
    data: { k }
  });

  steps.push({
    array: [...nums],
    message: `Result: ${result} subarrays`,
    isComplete: true,
    data: { result, k }
  });

  return steps;
};
