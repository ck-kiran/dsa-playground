import type { Step } from '../../../shared/types/step';

export const generateBinarySearchSteps = (arr: number[], target: number): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = arr.length - 1;

  // Initial step
  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: { left, right },
    message: `Starting Binary Search for target ${target}. Left: ${left}, Right: ${right}`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Step: Calculate Mid
    steps.push({
      array: [...arr],
      highlightIndices: [mid],
      pointers: { left, right, mid },
      message: `Calculated mid index: ${mid}, value: ${arr[mid]}`,
    });

    if (arr[mid] === target) {
      // Step: Found
      steps.push({
        array: [...arr],
        highlightIndices: [mid],
        pointers: { left, right, mid },
        message: `Found target ${target} at index ${mid}!`,
      });
      return steps;
    } else if (arr[mid] < target) {
      // Step: Go Right
      steps.push({
        array: [...arr],
        highlightIndices: [mid],
        pointers: { left, right, mid },
        message: `${arr[mid]} is less than ${target}. Moving left pointer to mid + 1.`,
      });
      left = mid + 1;
    } else {
      // Step: Go Left
      steps.push({
        array: [...arr],
        highlightIndices: [mid],
        pointers: { left, right, mid },
        message: `${arr[mid]} is greater than ${target}. Moving right pointer to mid - 1.`,
      });
      right = mid - 1;
    }
  }

  // Step: Not Found
  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: { left, right },
    message: `Target ${target} not found in the array.`,
  });

  return steps;
};

export const generateTwoSumSteps = (nums: number[], target: number): Step[] => {
  const steps: Step[] = [];
  const map = new Map<number, number>();

  // Initial step
  steps.push({
    array: [...nums],
    hashMap: {},
    pointers: {},
    message: `Starting Two Sum for target ${target}. Using hash map approach.`,
  });

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // Step: Check if complement exists
    steps.push({
      array: [...nums],
      hashMap: Object.fromEntries(map),
      pointers: { curr: i },
      message: `Checking index ${i}: value ${nums[i]}, need complement ${complement}`,
    });

    if (map.has(complement)) {
      const complementIndex = map.get(complement)!;
      // Step: Found solution
      steps.push({
        array: [...nums],
        hashMap: Object.fromEntries(map),
        pointers: { curr: i, complement: complementIndex },
        message: `Found solution! Indices [${complementIndex}, ${i}] sum to ${target}`,
      });
      return steps;
    }

    // Step: Add current number to map
    map.set(nums[i], i);
    steps.push({
      array: [...nums],
      hashMap: Object.fromEntries(map),
      pointers: { curr: i },
      message: `Added ${nums[i]} -> ${i} to hash map`,
    });
  }

  // Step: No solution found
  steps.push({
    array: [...nums],
    hashMap: Object.fromEntries(map),
    pointers: {},
    message: `No valid pair found that sums to ${target}`,
  });

  return steps;
};