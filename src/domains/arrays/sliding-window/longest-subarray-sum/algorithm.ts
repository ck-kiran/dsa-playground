import type { Step } from '@/shared/types/step';

export const generateLongestSubarraySumSteps = (arr: number[], k: number): Step[] => {
  const steps: Step[] = [];
  let l = 0, r = 0, maxLength = 0, sum = 0;

  // Initial step
  steps.push({
    array: [...arr],
    pointers: { left: l, right: r },
    sum: sum,
    maxLength: maxLength,
    target: k,
    message: `Starting sliding window. Target sum ≤ ${k}`,
    highlightIndices: []
  });

  while (r < arr.length) {
    sum += arr[r];

    // Step: Add current element
    steps.push({
      array: [...arr],
      pointers: { left: l, right: r },
      sum: sum,
      maxLength: maxLength,
      target: k,
      message: `Add arr[${r}] = ${arr[r]}. Sum = ${sum}`,
      highlightIndices: [r],
      currentWindow: arr.slice(l, r + 1)
    });

    if (sum > k) {
      // Step: Shrink window
      sum -= arr[l];
      l++;
      steps.push({
        array: [...arr],
        pointers: { left: l, right: r },
        sum: sum,
        maxLength: maxLength,
        target: k,
        message: `Sum > ${k}. Remove arr[${l-1}] = ${arr[l-1]}. Move left pointer. Sum = ${sum}`,
        highlightIndices: [l, r],
        currentWindow: arr.slice(l, r + 1)
      });
    } else {
      // Step: Valid window - check for max length
      const currentLength = r - l + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        steps.push({
          array: [...arr],
          pointers: { left: l, right: r },
          sum: sum,
          maxLength: maxLength,
          target: k,
          message: `Valid window! New max length = ${maxLength}`,
          highlightIndices: arr.slice(l, r + 1).map((_, idx) => l + idx),
          currentWindow: arr.slice(l, r + 1),
          isMaxWindow: true
        });
      } else {
        steps.push({
          array: [...arr],
          pointers: { left: l, right: r },
          sum: sum,
          maxLength: maxLength,
          target: k,
          message: `Valid window. Length = ${currentLength}`,
          highlightIndices: arr.slice(l, r + 1).map((_, idx) => l + idx),
          currentWindow: arr.slice(l, r + 1)
        });
      }
    }

    r++;
  }

  // Final step
  steps.push({
    array: [...arr],
    pointers: { left: l, right: r },
    sum: sum,
    maxLength: maxLength,
    target: k,
    message: `Algorithm complete. Maximum subarray length = ${maxLength}`,
    highlightIndices: [],
    isComplete: true
  });

  return steps;
};