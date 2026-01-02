import type { Step } from '@/shared/types/step';

export const generateTrappingRainWaterSteps = (heights: number[]): Step[] => {
  const steps: Step[] = [];
  const n = heights.length;

  if (n === 0) {
    steps.push({
      array: [],
      pointers: {},
      message: 'Empty array - no water can be trapped',
      highlightIndices: [],
      isComplete: true,
      data: { totalWater: 0, originalHeights: [...heights] }
    });
    return steps;
  }

  let left = 0;
  let right = n - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;
  const waterLevels = new Array(n).fill(0);

  // Initial step
  steps.push({
    array: [...heights],
    pointers: { left, right },
    message: 'Initialize two pointers and track maximum heights from each side',
    highlightIndices: [],
    data: {
      originalHeights: [...heights],
      leftMax,
      rightMax,
      totalWater,
      waterLevels: [...waterLevels]
    }
  });

  while (left < right) {
    // Show current state
    steps.push({
      array: [...heights],
      pointers: { left, right },
      message: `Compare heights: left[${left}] = ${heights[left]}, right[${right}] = ${heights[right]}`,
      highlightIndices: [left, right],
      action: 'compare',
      data: {
        leftHeight: heights[left],
        rightHeight: heights[right],
        leftIndex: left,
        rightIndex: right,
        leftMax,
        rightMax,
        totalWater,
        waterLevels: [...waterLevels]
      }
    });

    if (heights[left] < heights[right]) {
      // Process left side
      if (heights[left] >= leftMax) {
        // Update left max
        leftMax = heights[left];
        steps.push({
          array: [...heights],
          pointers: { left, right },
          message: `Height[${left}] = ${heights[left]} >= leftMax(${leftMax}). Update leftMax to ${leftMax}`,
          highlightIndices: [left],
          action: 'update-left-max',
          data: {
            newLeftMax: leftMax,
            position: left,
            height: heights[left],
            leftMax,
            rightMax,
            totalWater,
            waterLevels: [...waterLevels]
          }
        });
      } else {
        // Trap water
        const waterTrapped = leftMax - heights[left];
        waterLevels[left] = waterTrapped;
        totalWater += waterTrapped;

        steps.push({
          array: [...heights],
          pointers: { left, right },
          message: `Height[${left}] = ${heights[left]} < leftMax(${leftMax}). Trap ${waterTrapped} unit(s) of water`,
          highlightIndices: [left],
          action: 'trap-water',
          data: {
            waterTrapped,
            position: left,
            height: heights[left],
            leftMax,
            rightMax,
            totalWater,
            waterLevels: [...waterLevels]
          }
        });
      }
      left++;
    } else {
      // Process right side
      if (heights[right] >= rightMax) {
        // Update right max
        rightMax = heights[right];
        steps.push({
          array: [...heights],
          pointers: { left, right },
          message: `Height[${right}] = ${heights[right]} >= rightMax(${rightMax}). Update rightMax to ${rightMax}`,
          highlightIndices: [right],
          action: 'update-right-max',
          data: {
            newRightMax: rightMax,
            position: right,
            height: heights[right],
            leftMax,
            rightMax,
            totalWater,
            waterLevels: [...waterLevels]
          }
        });
      } else {
        // Trap water
        const waterTrapped = rightMax - heights[right];
        waterLevels[right] = waterTrapped;
        totalWater += waterTrapped;

        steps.push({
          array: [...heights],
          pointers: { left, right },
          message: `Height[${right}] = ${heights[right]} < rightMax(${rightMax}). Trap ${waterTrapped} unit(s) of water`,
          highlightIndices: [right],
          action: 'trap-water',
          data: {
            waterTrapped,
            position: right,
            height: heights[right],
            leftMax,
            rightMax,
            totalWater,
            waterLevels: [...waterLevels]
          }
        });
      }
      right--;
    }

    // Show pointer movement
    if (left < right) {
      steps.push({
        array: [...heights],
        pointers: { left, right },
        message: `Move pointers inward: left = ${left}, right = ${right}`,
        highlightIndices: [left, right],
        action: 'move-pointers',
        data: {
          newLeft: left,
          newRight: right,
          leftMax,
          rightMax,
          totalWater,
          waterLevels: [...waterLevels]
        }
      });
    }
  }

  // Final step
  steps.push({
    array: [...heights],
    pointers: {},
    message: `Pointers met! Total water trapped: ${totalWater} units`,
    highlightIndices: [],
    isComplete: true,
    data: {
      result: totalWater,
      originalHeights: [...heights],
      finalWaterLevels: [...waterLevels],
      leftMax,
      rightMax,
      totalWater,
      waterLevels: [...waterLevels]
    }
  });

  return steps;
};