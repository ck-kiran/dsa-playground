interface FindFirstLastPositionVisualizerProps {
  step: any;
}

export function FindFirstLastPositionVisualizer({ step }: FindFirstLastPositionVisualizerProps) {
  const {
    array = [],
    target,
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right, mid } = pointers;
  const { currentValue, first, last, result, searchType } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Target display */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <div className="text-sm text-gray-600 dark:text-gray-400">Target:</div>
        <div className="text-2xl font-bold text-blue-600">{target}</div>
      </div>

      {/* Array visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isLeft = left === index;
          const isMid = mid === index;
          const isRight = right === index;
          const isHighlighted = highlightIndices.includes(index);
          const isTarget = value === target;
          const isInRange = isComplete && first !== -1 && last !== -1 && index >= first && index <= last;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300 relative
                ${isMid ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isLeft && !isMid ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isRight && !isMid ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isInRange ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
                ${isHighlighted && !isMid && !isLeft && !isRight && !isInRange ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${!isHighlighted && !isMid && !isLeft && !isRight && !isInRange ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                ${(action === 'found-target-first' || action === 'found-target-last') && isMid ? 'ring-2 ring-green-400' : ''}
              `}
            >
              {value}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Target indicator */}
              {isTarget && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Search status */}
      {searchType && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Search: <span className="font-semibold">
              {searchType === 'first' ? 'Finding First Position' : 'Finding Last Position'}
            </span>
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(left !== undefined || right !== undefined || mid !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {left !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Left: {left}</span>
            </div>
          )}
          {mid !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>Mid: {mid} (value: {currentValue})</span>
            </div>
          )}
          {right !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Right: {right}</span>
            </div>
          )}
        </div>
      )}

      {/* Current results */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-lg font-bold text-green-600">
            {first !== undefined ? first : '?'}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">First Position</div>
        </div>
        <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-lg font-bold text-green-600">
            {last !== undefined ? last : '?'}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Last Position</div>
        </div>
      </div>

      {/* Final result */}
      {result && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Result:</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
            [{result[0]}, {result[1]}]
          </div>
          {result[0] !== -1 && result[1] !== -1 && (
            <div className="text-sm text-green-600 mt-1">
              Found {result[1] - result[0] + 1} occurrence(s) of {target}
            </div>
          )}
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}