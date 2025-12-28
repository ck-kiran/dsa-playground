import type { Step } from '@/shared/types/step';

export function generateSearchInsertSteps(array: number[], target: number): Step[] {
  const steps: Step[] = [];
  let left = 0;
  let right = array.length - 1;

  steps.push({
    array: [...array],
    pointers: { left, right },
    message: `Searching for position to insert ${target}`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...array],
      pointers: { left, right, mid },
      highlightIndices: [mid],
      message: `Checking mid=${mid}, value=${array[mid]}`,
    });

    if (array[mid] === target) {
      steps.push({
        array: [...array],
        pointers: { left, right, mid },
        highlightIndices: [mid],
        message: `Found ${target} at index ${mid}`,
      });
      return steps;
    } else if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...array],
        pointers: { left, right },
        message: `${array[mid]} < ${target}, search right half`,
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...array],
        pointers: { left, right },
        message: `${array[mid]} > ${target}, search left half`,
      });
    }
  }

  steps.push({
    array: [...array],
    pointers: { insertPosition: left },
    highlightIndices: [left],
    message: `Insert position for ${target} is index ${left}`,
  });

  return steps;
}