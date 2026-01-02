import type { Step } from '@/shared/types/step';

export const generateSqrtSteps = (x: number): Step[] => {
  const steps: Step[] = [];

  // Handle special cases
  if (x < 2) {
    steps.push({
      message: `Special case: x=${x}. Square root of ${x} is ${x}`,
      isComplete: true,
      data: { x, result: x, isSpecialCase: true }
    });
    return steps;
  }

  let left = 1;
  let right = Math.floor(x / 2);
  const searchRange = Array.from({length: right - left + 1}, (_, i) => left + i);

  // Initial step
  steps.push({
    array: searchRange,
    pointers: { left, right },
    message: `Finding square root of ${x}. Search range: [${left}, ${right}]`,
    highlightIndices: [],
    data: { x, searchRange: [left, right] }
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    steps.push({
      array: searchRange,
      pointers: { left, right, mid },
      message: `Check mid=${mid}: ${mid}² = ${square} vs x=${x}`,
      highlightIndices: [mid - searchRange[0]], // Adjust for array indexing
      action: 'check-square',
      data: {
        x,
        mid,
        square,
        searchRange: [left, right],
        comparison: square === x ? 'equal' : square < x ? 'less' : 'greater'
      }
    });

    if (square === x) {
      steps.push({
        array: searchRange,
        pointers: { left, right, mid },
        message: `Perfect square! ${mid}² = ${square} = ${x}. Answer is ${mid}`,
        highlightIndices: [mid - searchRange[0]],
        isComplete: true,
        action: 'found-exact',
        data: { x, result: mid, square, isPerfectSquare: true }
      });
      return steps;
    } else if (square < x) {
      steps.push({
        array: searchRange,
        pointers: { left, right, mid },
        message: `${mid}² = ${square} < ${x}. Search right half for larger values.`,
        highlightIndices: Array.from({length: right - mid}, (_, i) => mid + 1 - searchRange[0] + i),
        action: 'search-right',
        data: { x, mid, square, direction: 'right' }
      });
      left = mid + 1;
    } else {
      steps.push({
        array: searchRange,
        pointers: { left, right, mid },
        message: `${mid}² = ${square} > ${x}. Search left half for smaller values.`,
        highlightIndices: Array.from({length: mid - left}, (_, i) => left - searchRange[0] + i),
        action: 'search-left',
        data: { x, mid, square, direction: 'left' }
      });
      right = mid - 1;
    }

    // Update search range visualization
    const newSearchRange = Array.from({length: Math.max(0, right - left + 1)}, (_, i) => left + i);
    steps.push({
      array: newSearchRange.length > 0 ? newSearchRange : searchRange,
      pointers: { left, right },
      message: `Updated search range: [${left}, ${right}]`,
      highlightIndices: [],
      data: { x, searchRange: [left, right], isRangeUpdate: true }
    });
  }

  // Final result - right pointer has the floor value
  const result = right;
  const resultSquare = result * result;
  const nextSquare = (result + 1) * (result + 1);

  steps.push({
    array: searchRange,
    message: `Search complete. ${result}² = ${resultSquare} ≤ ${x} < ${nextSquare} = ${result + 1}². Floor square root is ${result}`,
    highlightIndices: [],
    isComplete: true,
    data: {
      x,
      result,
      resultSquare,
      nextSquare,
      explanation: `${result}² = ${resultSquare} ≤ ${x} < ${nextSquare} = ${result + 1}²`
    }
  });

  return steps;
};