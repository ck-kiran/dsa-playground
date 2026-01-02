interface SearchRotatedArrayIIVisualizerProps {
  step: any;
}

export function SearchRotatedArrayIIVisualizer({ step }: SearchRotatedArrayIIVisualizerProps) {
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
  const {
    currentValue,
    leftValue,
    rightValue,
    duplicateValue,
    result,
    foundIndex,
    rotationPoint,
    duplicateIndices,
    sortedHalf,
    direction,
    targetExists
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Target and array info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Target:</div>
          <div className="text-2xl font-bold text-blue-600">{target}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Rotation Point:</div>
          <div className="text-2xl font-bold text-purple-600">{rotationPoint || 0}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Has Duplicates:</div>
          <div className="text-2xl font-bold text-orange-600">
            {duplicateIndices && duplicateIndices.length > 0 ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isLeft = left === index;
          const isMid = mid === index;
          const isRight = right === index;
          const isHighlighted = highlightIndices.includes(index);
          const isTarget = value === target;
          const isRotationPoint = index === rotationPoint && rotationPoint > 0;
          const isFound = action === 'found' && index === foundIndex;

          // Check if this index is part of duplicate groups
          const isDuplicate = duplicateIndices && duplicateIndices.some((group: number[]) =>
            group.length > 1 && group.includes(index)
          );

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300 relative
                ${isMid ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isLeft && !isMid ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isRight && !isMid ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isFound ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 ring-2 ring-green-400' : ''}
                ${action === 'handle-duplicates' && (isLeft || isMid || isRight) ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : ''}
                ${isHighlighted && !isMid && !isLeft && !isRight && !isFound ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${!isHighlighted && !isMid && !isLeft && !isRight && !isFound && action !== 'handle-duplicates' ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
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
              {/* Rotation point indicator */}
              {isRotationPoint && (
                <div className="absolute -top-2 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              {/* Duplicate indicator */}
              {isDuplicate && (
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Duplicate handling explanation */}
      {action === 'handle-duplicates' && duplicateValue !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
            🔄 Duplicate Handling
          </div>
          <div className="text-lg font-bold text-red-600">
            arr[{left}] = arr[{mid}] = arr[{right}] = {duplicateValue}
          </div>
          <div className="text-sm text-red-600 dark:text-red-300 mt-2">
            Cannot determine which half is sorted. Shrink search space by moving both pointers.
          </div>
        </div>
      )}

      {/* Sorted half indicator */}
      {sortedHalf && (
        <div className="text-center p-2 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            🔍 {sortedHalf === 'left' ? 'Left' : 'Right'} half is sorted
          </div>
        </div>
      )}

      {/* Comparison display for boundary values */}
      {leftValue !== undefined && rightValue !== undefined && currentValue !== undefined && (
        <div className="text-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Boundary Values:</div>
          <div className="flex items-center gap-4 justify-center text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600">arr[{left}] = {leftValue}</div>
              <div className="text-xs text-gray-500">Left</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600">arr[{mid}] = {currentValue}</div>
              <div className="text-xs text-gray-500">Mid</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-600">arr[{right}] = {rightValue}</div>
              <div className="text-xs text-gray-500">Right</div>
            </div>
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(left !== undefined || right !== undefined || mid !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {left !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Left: {left} ({array[left]})</span>
            </div>
          )}
          {mid !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>Mid: {mid} ({currentValue})</span>
            </div>
          )}
          {right !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Right: {right} ({array[right]})</span>
            </div>
          )}
        </div>
      )}

      {/* Search direction indicator */}
      {direction && (
        <div className="text-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">Next Search Direction:</div>
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {direction === 'left' ? '← Left Half' : 'Right Half →'}
          </div>
        </div>
      )}

      {/* Result */}
      {result !== undefined && isComplete && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Result:</div>
          <div className={`text-2xl font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
            {result ? `Found at index ${foundIndex}` : 'Not Found (false)'}
          </div>
          {targetExists !== undefined && (
            <div className="text-sm text-gray-500 mt-1">
              Target actually exists in array: {targetExists ? 'Yes' : 'No'}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Target Value</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Rotation Point</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Duplicate Values</span>
        </div>
      </div>

      {/* Algorithm note */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 max-w-lg">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> This version handles duplicates by shrinking search space when
          arr[left] = arr[mid] = arr[right], which can degrade to O(N) in worst case.
        </div>
      </div>

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}