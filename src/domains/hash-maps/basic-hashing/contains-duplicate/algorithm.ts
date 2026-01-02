import type { Step } from '@/shared/types/step';

export const generateContainsDuplicateSteps = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const seen = new Set<number>();

  // Initial step
  steps.push({
    array: [...arr],
    hashMap: {},
    message: `Starting Contains Duplicate check for array [${arr.join(', ')}]`,
    highlightIndices: []
  });

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    // Step: Check if number exists in set
    const hasMapObject = Object.fromEntries(Array.from(seen).map(val => [val.toString(), true]));

    if (seen.has(num)) {
      // Found duplicate
      steps.push({
        array: [...arr],
        hashMap: hasMapObject,
        message: `Found duplicate! ${num} already exists in set`,
        highlightIndices: [i],
        action: 'found-duplicate',
        data: { currentIndex: i, currentValue: num, result: true }
      });

      // Final step
      steps.push({
        array: [...arr],
        hashMap: hasMapObject,
        message: `Algorithm complete. Contains duplicate: true`,
        highlightIndices: [],
        isComplete: true,
        data: { result: true }
      });

      return steps;
    } else {
      // Add number to set
      seen.add(num);
      const updatedHashMap = Object.fromEntries(Array.from(seen).map(val => [val.toString(), true]));

      steps.push({
        array: [...arr],
        hashMap: updatedHashMap,
        message: `Add ${num} to set. Not a duplicate.`,
        highlightIndices: [i],
        action: 'add-to-set',
        data: { currentIndex: i, currentValue: num }
      });
    }
  }

  // No duplicates found
  steps.push({
    array: [...arr],
    hashMap: Object.fromEntries(Array.from(seen).map(val => [val.toString(), true])),
    message: `Algorithm complete. Contains duplicate: false`,
    highlightIndices: [],
    isComplete: true,
    data: { result: false }
  });

  return steps;
};