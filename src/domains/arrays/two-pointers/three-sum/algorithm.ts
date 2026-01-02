import type { Step } from '@/shared/types/step';

export const generateThreeSumSteps = (nums: number[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...nums];
  const result: number[][] = [];

  // Initial step
  steps.push({
    array: [...arr],
    pointers: {},
    message: `Find all unique triplets that sum to zero`,
    highlightIndices: [],
    data: {
      originalArray: [...nums],
      target: 0,
      triplets: [],
      sortNeeded: true
    }
  });

  // Sort the array first
  arr.sort((a, b) => a - b);

  steps.push({
    array: [...arr],
    pointers: {},
    message: `First, sort the array to enable two-pointer approach`,
    highlightIndices: [],
    action: 'sort',
    data: {
      originalArray: [...nums],
      sortedArray: [...arr],
      target: 0
    }
  });

  // Main algorithm
  for (let i = 0; i < arr.length - 2; i++) {
    // Skip duplicates for i
    if (i > 0 && arr[i] === arr[i - 1]) {
      steps.push({
        array: [...arr],
        pointers: { i },
        message: `Skip duplicate i: arr[${i}] = ${arr[i]} (same as previous)`,
        highlightIndices: [i, i - 1],
        action: 'skip-duplicate-i',
        data: {
          duplicateValue: arr[i],
          skippedIndex: i,
          triplets: [...result]
        }
      });
      continue;
    }

    steps.push({
      array: [...arr],
      pointers: { i },
      message: `Fix first element: nums[${i}] = ${arr[i]}. Find two elements that sum to ${-arr[i]}`,
      highlightIndices: [i],
      action: 'fix-first',
      data: {
        firstElement: arr[i],
        target: -arr[i],
        firstIndex: i,
        triplets: [...result]
      }
    });

    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      steps.push({
        array: [...arr],
        pointers: { i, left, right },
        message: `Check triplet: ${arr[i]} + ${arr[left]} + ${arr[right]} = ${sum}`,
        highlightIndices: [i, left, right],
        action: 'check-triplet',
        data: {
          triplet: [arr[i], arr[left], arr[right]],
          sum,
          target: 0,
          comparison: sum === 0 ? 'equal' : sum < 0 ? 'less' : 'greater',
          triplets: [...result]
        }
      });

      if (sum === 0) {
        // Found a valid triplet
        const triplet = [arr[i], arr[left], arr[right]];
        result.push(triplet);

        steps.push({
          array: [...arr],
          pointers: { i, left, right },
          message: `Found valid triplet: [${triplet.join(', ')}]`,
          highlightIndices: [i, left, right],
          action: 'found-triplet',
          data: {
            foundTriplet: triplet,
            triplets: [...result],
            tripletsCount: result.length
          }
        });

        // Skip duplicates for left pointer
        while (left < right && arr[left] === arr[left + 1]) {
          left++;
          steps.push({
            array: [...arr],
            pointers: { i, left, right },
            message: `Skip duplicate left: arr[${left}] = ${arr[left]}`,
            highlightIndices: [left, left - 1],
            action: 'skip-duplicate-left',
            data: {
              duplicateValue: arr[left],
              triplets: [...result]
            }
          });
        }

        // Skip duplicates for right pointer
        while (left < right && arr[right] === arr[right - 1]) {
          right--;
          steps.push({
            array: [...arr],
            pointers: { i, left, right },
            message: `Skip duplicate right: arr[${right}] = ${arr[right]}`,
            highlightIndices: [right, right + 1],
            action: 'skip-duplicate-right',
            data: {
              duplicateValue: arr[right],
              triplets: [...result]
            }
          });
        }

        left++;
        right--;
      } else if (sum < 0) {
        // Sum too small, move left pointer right
        steps.push({
          array: [...arr],
          pointers: { i, left, right },
          message: `Sum ${sum} < 0, need larger value. Move left pointer right.`,
          highlightIndices: [left],
          action: 'move-left',
          data: {
            reason: 'sum too small',
            oldLeft: left,
            newLeft: left + 1,
            triplets: [...result]
          }
        });
        left++;
      } else {
        // Sum too large, move right pointer left
        steps.push({
          array: [...arr],
          pointers: { i, left, right },
          message: `Sum ${sum} > 0, need smaller value. Move right pointer left.`,
          highlightIndices: [right],
          action: 'move-right',
          data: {
            reason: 'sum too large',
            oldRight: right,
            newRight: right - 1,
            triplets: [...result]
          }
        });
        right--;
      }
    }
  }

  // Final result
  steps.push({
    array: [...arr],
    pointers: {},
    message: `Found ${result.length} unique triplets that sum to zero`,
    highlightIndices: [],
    isComplete: true,
    data: {
      result: [...result],
      originalArray: [...nums],
      sortedArray: [...arr],
      tripletsCount: result.length,
      allTriplets: result
    }
  });

  return steps;
};