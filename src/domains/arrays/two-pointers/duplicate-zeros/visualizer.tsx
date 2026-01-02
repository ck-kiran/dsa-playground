interface DuplicateZerosVisualizerProps {
  step: any;
}

export function DuplicateZerosVisualizer({ step }: DuplicateZerosVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right } = pointers;
  const { value, from, to, possibleDups, duplicatedAt } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Array visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Array:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {array.map((num: number, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isHighlighted = highlightIndices.includes(index);
            const isDuplicated = duplicatedAt?.includes(index);

            return (
              <div
                key={index}
                className={`
                  w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isLeft ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                  ${isRight ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                  ${isDuplicated ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
                  ${isHighlighted && !isLeft && !isRight && !isDuplicated ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${!isHighlighted && !isLeft && !isRight && !isDuplicated ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                  ${num === 0 ? 'font-bold' : ''}
                `}
              >
                {num}
                {/* Position indicator */}
                <div className="absolute -bottom-5 text-xs text-gray-500 dark:text-gray-400">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pointers legend */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        {left !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
            <span>Read: {left}</span>
          </div>
        )}
        {right !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
            <span>Write: {right}</span>
          </div>
        )}
        {possibleDups !== undefined && (
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            <span className="font-semibold">Zeros to Duplicate: {possibleDups}</span>
          </div>
        )}
      </div>

      {/* Action details */}
      {action === 'copy' && value !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Copy Operation:</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Copy {value} from index {from} to index {to}
          </div>
        </div>
      )}

      {action === 'duplicate-zero' && duplicatedAt && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Duplicate Zero:</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            Zero duplicated at indices {duplicatedAt.join(', ')}
          </div>
        </div>
      )}

      {action === 'count-zero' && (
        <div className="text-center p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Counting Phase:</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            Found zero at index {left}
          </div>
        </div>
      )}

      {/* Result */}
      {isComplete && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Complete!</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">
            All zeros duplicated in-place
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs flex-wrap justify-center mt-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-100 border-2 border-blue-500"></div>
          <span>Read Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-100 border-2 border-orange-500"></div>
          <span>Write Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-100 border-2 border-green-500"></div>
          <span>Duplicated Zero</span>
        </div>
      </div>
    </div>
  );
}
