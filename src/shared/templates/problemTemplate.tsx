// Template for creating a new problem module
import React from 'react';
import type { ProblemModule } from '@/shared/types/problem';
import type { Step } from '@/shared/types/step';

// Example: Template for a new sorting algorithm problem
export const newSortingProblemTemplate: ProblemModule = {
  config: {
    id: 'bubble-sort-visualizer', // Change this to your problem's unique ID
    title: 'Bubble Sort', // Change this to your problem's title
    difficulty: 'Easy', // Easy | Medium | Hard
    description: 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list...', // Problem description
    constraints: [
      'In-place sorting algorithm',
      'Time Complexity: O(N²)',
      'Space Complexity: O(1)',
      'N = number of elements',
    ],
    defaultCode: `function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}`,
    defaultInputs: {
      array: [64, 34, 25, 12, 22, 11, 90],
    },
  },

  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateBubbleSortSteps(array);
  },

  Visualizer: BubbleSortVisualizer,
};

// Example step generation function
function generateBubbleSortSteps(array: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...array]; // Don't mutate original array
  const n = arr.length;

  // Add initial state
  steps.push({
    array: [...arr],
    pointers: {},
    message: 'Starting bubble sort...',
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison step
      steps.push({
        array: [...arr],
        pointers: { j, next: j + 1 },
        highlightIndices: [j, j + 1],
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Add swap step
        steps.push({
          array: [...arr],
          pointers: { j, next: j + 1 },
          highlightIndices: [j, j + 1],
          message: `Swapped ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }
  }

  // Add final state
  steps.push({
    array: [...arr],
    pointers: {},
    message: 'Bubble sort completed!',
  });

  return steps;
}

// Example visualizer component
function BubbleSortVisualizer({ step }: { step: Step }) {
  const { array = [], pointers = {}, highlightIndices = [], message = '' } = step;

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex gap-2">
        {array.map((value, index) => {
          const isHighlighted = highlightIndices.includes(index);
          const isJ = pointers.j === index;
          const isNext = pointers.next === index;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2
                transition-all duration-300
                ${isHighlighted ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}
                ${isJ ? 'border-red-500 bg-red-100' : ''}
                ${isNext ? 'border-green-500 bg-green-100' : ''}
              `}
            >
              <span className="text-sm font-semibold">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-700">{message}</p>
        {Object.keys(pointers).length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Comparing positions {pointers.j} and {pointers.next}
          </p>
        )}
      </div>
    </div>
  );
}