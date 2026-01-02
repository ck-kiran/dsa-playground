import type { Step } from '@/shared/types/step';

export const generateRemoveDuplicatesSteps = (nums: number[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...nums];

  if (arr.length === 0) {
    steps.push({
      array: [],
      pointers: {},
      message: 'Empty array, returning 0',
      isComplete: true,
      data: { result: 0, uniqueCount: 0 }
    });
    return steps;
  }

  let uniqueIndex = 0;

  // Initial step
  steps.push({
    array: [...arr],
    pointers: { uniqueIndex },
    message: `Remove duplicates in-place. First element is always unique.`,
    highlightIndices: [0],
    data: {
      originalArray: [...nums],
      currentUnique: arr[0],
      uniqueCount: 1
    }
  });

  for (let currentIndex = 1; currentIndex < arr.length; currentIndex++) {
    steps.push({
      array: [...arr],
      pointers: { uniqueIndex, currentIndex },
      message: `Compare nums[${currentIndex}] = ${arr[currentIndex]} with last unique nums[${uniqueIndex}] = ${arr[uniqueIndex]}`,
      highlightIndices: [currentIndex, uniqueIndex],
      action: 'compare',
      data: {
        currentValue: arr[currentIndex],
        lastUniqueValue: arr[uniqueIndex],
        isDuplicate: arr[currentIndex] === arr[uniqueIndex]
      }
    });

    if (arr[currentIndex] !== arr[uniqueIndex]) {
      // Found a new unique element
      uniqueIndex++;

      steps.push({
        array: [...arr],
        pointers: { uniqueIndex, currentIndex },
        message: `New unique element found! Move ${arr[currentIndex]} to position ${uniqueIndex}`,
        highlightIndices: [currentIndex, uniqueIndex],
        action: 'move-unique',
        data: {
          newUniqueValue: arr[currentIndex],
          newUniqueIndex: uniqueIndex,
          fromIndex: currentIndex
        }
      });

      if (uniqueIndex !== currentIndex) {
        arr[uniqueIndex] = arr[currentIndex];
      }

      steps.push({
        array: [...arr],
        pointers: { uniqueIndex, currentIndex },
        message: `nums[${uniqueIndex}] = ${arr[uniqueIndex]}. Unique count: ${uniqueIndex + 1}`,
        highlightIndices: [uniqueIndex],
        action: 'placed-unique',
        data: {
          placedValue: arr[uniqueIndex],
          placedIndex: uniqueIndex,
          uniqueCount: uniqueIndex + 1
        }
      });
    } else {
      // Duplicate found
      steps.push({
        array: [...arr],
        pointers: { uniqueIndex, currentIndex },
        message: `Duplicate found: nums[${currentIndex}] = ${arr[currentIndex]} (same as nums[${uniqueIndex}]). Skip it.`,
        highlightIndices: [currentIndex],
        action: 'skip-duplicate',
        data: {
          duplicateValue: arr[currentIndex],
          duplicateIndex: currentIndex,
          uniqueCount: uniqueIndex + 1
        }
      });
    }
  }

  // Final result
  const finalLength = uniqueIndex + 1;
  const uniqueArray = arr.slice(0, finalLength);

  steps.push({
    array: [...arr],
    pointers: { uniqueIndex },
    message: `All duplicates removed! New length: ${finalLength}`,
    highlightIndices: Array.from({ length: finalLength }, (_, i) => i),
    isComplete: true,
    data: {
      result: finalLength,
      uniqueArray,
      originalArray: [...nums],
      uniqueCount: finalLength,
      removedCount: nums.length - finalLength
    }
  });

  return steps;
};