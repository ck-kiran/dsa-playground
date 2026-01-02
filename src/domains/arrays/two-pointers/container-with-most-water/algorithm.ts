import type { Step } from '@/shared/types/step';

export const generateContainerWithMostWaterSteps = (heights: number[]): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = heights.length - 1;
  let maxWater = 0;

  // Initial step
  steps.push({
    array: [...heights],
    pointers: { left, right },
    message: `Finding maximum water container area. Start with widest container.`,
    highlightIndices: [left, right],
    data: { maxWater: 0, currentArea: 0 }
  });

  while (left < right) {
    const width = right - left;
    const leftHeight = heights[left];
    const rightHeight = heights[right];
    const minHeight = Math.min(leftHeight, rightHeight);
    const currentArea = width * minHeight;

    // Show calculation step
    steps.push({
      array: [...heights],
      pointers: { left, right },
      message: `Calculate area: width=${width} × height=${minHeight} = ${currentArea}`,
      highlightIndices: [left, right],
      action: 'calculate',
      data: {
        width,
        leftHeight,
        rightHeight,
        minHeight,
        currentArea,
        maxWater
      }
    });

    if (currentArea > maxWater) {
      maxWater = currentArea;
      steps.push({
        array: [...heights],
        pointers: { left, right },
        message: `New maximum area found: ${maxWater}`,
        highlightIndices: [left, right],
        action: 'new-max',
        data: {
          width,
          leftHeight,
          rightHeight,
          minHeight,
          currentArea,
          maxWater,
          isNewMax: true
        }
      });
    } else {
      steps.push({
        array: [...heights],
        pointers: { left, right },
        message: `Current area ${currentArea} ≤ max area ${maxWater}`,
        highlightIndices: [left, right],
        action: 'compare',
        data: {
          width,
          leftHeight,
          rightHeight,
          minHeight,
          currentArea,
          maxWater
        }
      });
    }

    // Move pointer with smaller height
    if (leftHeight < rightHeight) {
      steps.push({
        array: [...heights],
        pointers: { left, right },
        message: `Left height (${leftHeight}) < Right height (${rightHeight}). Move left pointer.`,
        highlightIndices: [left, right],
        action: 'move-left',
        data: { leftHeight, rightHeight, maxWater }
      });
      left++;
    } else {
      steps.push({
        array: [...heights],
        pointers: { left, right },
        message: `Left height (${leftHeight}) ≥ Right height (${rightHeight}). Move right pointer.`,
        highlightIndices: [left, right],
        action: 'move-right',
        data: { leftHeight, rightHeight, maxWater }
      });
      right--;
    }
  }

  // Final result
  steps.push({
    array: [...heights],
    pointers: { left, right },
    message: `Algorithm complete. Maximum water area: ${maxWater}`,
    highlightIndices: [],
    isComplete: true,
    data: { maxWater, result: maxWater }
  });

  return steps;
};