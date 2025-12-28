import React from 'react';
import type { Step } from '@/shared/types/step';

export function BubbleSortVisualizer({ step }: { step: Step }) {
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
                ${isHighlighted ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'border-gray-300'}
                ${isJ ? 'border-red-500 bg-red-100 dark:bg-red-900/30' : ''}
                ${isNext ? 'border-green-500 bg-green-100 dark:bg-green-900/30' : ''}
              `}
            >
              <span className="text-sm font-semibold">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">{message}</p>
        {Object.keys(pointers).length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Comparing positions {pointers.j} and {pointers.next}
          </p>
        )}
      </div>
    </div>
  );
}