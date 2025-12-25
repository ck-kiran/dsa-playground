import type { Step } from '../types/step';

export const generateTwoSumSteps = (arr: number[], target: number): Step[] => {
  const steps: Step[] = [];
  const map: Record<number, number> = {}; // Stores value -> index

  // Initial step
  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: {},
    hashMap: { ...map },
    message: `Starting Two Sum for target ${target}.`,
  });

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const complement = target - num;

    // Step: Check if complement exists
    steps.push({
      array: [...arr],
      highlightIndices: [i],
      pointers: { curr: i },
      hashMap: { ...map },
      message: `Checking index ${i} (value: ${num}). Need complement: ${target} - ${num} = ${complement}.`,
    });

    if (complement in map) {
      const complementIndex = map[complement];
      // Step: Found
      steps.push({
        array: [...arr],
        highlightIndices: [i, complementIndex],
        pointers: { curr: i },
        hashMap: { ...map },
        message: `Found complement ${complement} at index ${complementIndex}! Solution: [${complementIndex}, ${i}].`,
      });
      return steps;
    }

    // Step: Add to map
    map[num] = i;
    steps.push({
      array: [...arr],
      highlightIndices: [i],
      pointers: { curr: i },
      hashMap: { ...map },
      message: `Complement ${complement} not found in map. Adding ${num} -> index ${i} to map.`,
    });
  }

  // Step: Not Found
  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: {},
    hashMap: { ...map },
    message: `No two sum solution found.`,
  });

  return steps;
};
