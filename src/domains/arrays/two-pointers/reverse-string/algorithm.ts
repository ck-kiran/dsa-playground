import type { Step } from '@/shared/types/step';

export const generateReverseStringSteps = (s: string[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...s];
  let left = 0;
  let right = arr.length - 1;

  // Initial step
  steps.push({
    array: [...arr],
    pointers: { left, right },
    message: `Reverse the string using two pointers approach`,
    highlightIndices: [],
    data: { originalString: [...s] }
  });

  while (left < right) {
    // Show comparison
    steps.push({
      array: [...arr],
      pointers: { left, right },
      message: `Compare characters at positions ${left} and ${right}: '${arr[left]}' and '${arr[right]}'`,
      highlightIndices: [left, right],
      action: 'compare',
      data: {
        leftChar: arr[left],
        rightChar: arr[right],
        leftIndex: left,
        rightIndex: right
      }
    });

    // Show swap
    steps.push({
      array: [...arr],
      pointers: { left, right },
      message: `Swapping '${arr[left]}' at position ${left} with '${arr[right]}' at position ${right}`,
      highlightIndices: [left, right],
      action: 'swap',
      data: {
        swapFrom: arr[left],
        swapTo: arr[right],
        fromIndex: left,
        toIndex: right
      }
    });

    // Perform the swap
    [arr[left], arr[right]] = [arr[right], arr[left]];

    // Show after swap
    steps.push({
      array: [...arr],
      pointers: { left, right },
      message: `After swap: '${arr[left]}' and '${arr[right]}'`,
      highlightIndices: [left, right],
      action: 'swapped',
      data: {
        newLeftChar: arr[left],
        newRightChar: arr[right],
        leftIndex: left,
        rightIndex: right
      }
    });

    left++;
    right--;

    // Show pointer movement
    if (left < right) {
      steps.push({
        array: [...arr],
        pointers: { left, right },
        message: `Move left pointer to ${left} and right pointer to ${right}`,
        highlightIndices: [left, right],
        action: 'move-pointers',
        data: {
          newLeft: left,
          newRight: right,
          remainingPairs: Math.floor((right - left + 1) / 2)
        }
      });
    }
  }

  // Check if we're done
  if (left >= right) {
    steps.push({
      array: [...arr],
      pointers: { left, right },
      message: left === right
        ? `Pointers meet at position ${left} - string is completely reversed!`
        : `Pointers crossed (left: ${left}, right: ${right}) - string is completely reversed!`,
      highlightIndices: left === right ? [left] : [],
      action: 'complete',
      data: {
        finalLeft: left,
        finalRight: right,
        meetingPoint: left === right ? left : null
      }
    });
  }

  // Final step
  steps.push({
    array: [...arr],
    pointers: {},
    message: `String successfully reversed!`,
    highlightIndices: [],
    isComplete: true,
    data: {
      result: [...arr],
      originalString: [...s],
      stringLength: arr.length,
      swapsPerformed: Math.floor(s.length / 2)
    }
  });

  return steps;
};