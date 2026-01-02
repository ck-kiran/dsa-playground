import type { Step } from '@/shared/types/step';

export const generateMoveZerosSteps = (nums: number[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...nums];
  let writeIndex = 0;

  // Initial step
  steps.push({
    array: [...arr],
    pointers: { writeIndex },
    message: `Move all zeros to the end while maintaining relative order of non-zero elements`,
    highlightIndices: [],
    data: { originalArray: [...nums] }
  });

  // Two-pass approach: first move all non-zeros
  for (let readIndex = 0; readIndex < arr.length; readIndex++) {
    steps.push({
      array: [...arr],
      pointers: { writeIndex, readIndex },
      message: `Check nums[${readIndex}] = ${arr[readIndex]}`,
      highlightIndices: [readIndex],
      action: 'check',
      data: { currentValue: arr[readIndex], isZero: arr[readIndex] === 0 }
    });

    if (arr[readIndex] !== 0) {
      // Move non-zero element to writeIndex position
      if (writeIndex !== readIndex) {
        steps.push({
          array: [...arr],
          pointers: { writeIndex, readIndex },
          message: `Moving non-zero element ${arr[readIndex]} from index ${readIndex} to index ${writeIndex}`,
          highlightIndices: [readIndex, writeIndex],
          action: 'move',
          data: {
            valueToMove: arr[readIndex],
            fromIndex: readIndex,
            toIndex: writeIndex
          }
        });

        arr[writeIndex] = arr[readIndex];
      } else {
        steps.push({
          array: [...arr],
          pointers: { writeIndex, readIndex },
          message: `Non-zero element ${arr[readIndex]} already in correct position at index ${writeIndex}`,
          highlightIndices: [writeIndex],
          action: 'already-correct',
          data: { value: arr[readIndex] }
        });
      }

      writeIndex++;

      steps.push({
        array: [...arr],
        pointers: { writeIndex, readIndex },
        message: `Updated writeIndex to ${writeIndex}`,
        highlightIndices: [writeIndex - 1],
        action: 'update-write',
        data: { newWriteIndex: writeIndex }
      });
    } else {
      steps.push({
        array: [...arr],
        pointers: { writeIndex, readIndex },
        message: `Skipping zero at index ${readIndex}`,
        highlightIndices: [readIndex],
        action: 'skip-zero',
        data: { zeroIndex: readIndex }
      });
    }
  }

  // Fill remaining positions with zeros
  for (let i = writeIndex; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      pointers: { writeIndex: i },
      message: `Filling index ${i} with zero`,
      highlightIndices: [i],
      action: 'fill-zero',
      data: { fillIndex: i, oldValue: arr[i] }
    });

    arr[i] = 0;

    steps.push({
      array: [...arr],
      pointers: { writeIndex: i },
      message: `Set nums[${i}] = 0`,
      highlightIndices: [i],
      action: 'zero-filled',
      data: { filledIndex: i }
    });
  }

  // Final step
  steps.push({
    array: [...arr],
    pointers: {},
    message: `All zeros moved to the end! Non-zero relative order preserved.`,
    highlightIndices: [],
    isComplete: true,
    data: {
      result: [...arr],
      originalArray: [...nums],
      zerosCount: nums.filter(n => n === 0).length,
      nonZerosCount: nums.filter(n => n !== 0).length
    }
  });

  return steps;
};