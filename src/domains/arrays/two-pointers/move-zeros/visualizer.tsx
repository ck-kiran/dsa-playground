interface MoveZerosVisualizerProps {
  step: any;
}

export function MoveZerosVisualizer({ step }: MoveZerosVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { writeIndex, readIndex } = pointers;
  const {
    originalArray,
    currentValue,
    isZero,
    valueToMove,
    fromIndex,
    toIndex,
    newWriteIndex,
    zeroIndex,
    fillIndex,
    oldValue,
    filledIndex,
    result,
    zerosCount,
    nonZerosCount
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Algorithm info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Non-zeros:</div>
          <div className="text-2xl font-bold text-blue-600">{nonZerosCount || 0}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Zeros:</div>
          <div className="text-2xl font-bold text-red-600">{zerosCount || 0}</div>
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isWriteIndex = writeIndex === index;
          const isReadIndex = readIndex === index;
          const isHighlighted = highlightIndices.includes(index);
          const isZeroValue = value === 0;
          const isMoveFrom = fromIndex === index;
          const isMoveTo = toIndex === index;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300 relative
                ${isWriteIndex && isReadIndex ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isWriteIndex && !isReadIndex ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isReadIndex && !isWriteIndex ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isMoveFrom ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${isMoveTo && !isWriteIndex && !isReadIndex ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
                ${isZeroValue && !isWriteIndex && !isReadIndex && !isMoveFrom && !isMoveTo ? 'border-red-300 bg-red-50 dark:bg-red-900/20 text-red-600' : ''}
                ${isHighlighted && !isWriteIndex && !isReadIndex && !isMoveFrom && !isMoveTo ? 'border-pink-500 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200' : ''}
                ${!isHighlighted && !isWriteIndex && !isReadIndex && !isMoveFrom && !isMoveTo && !isZeroValue ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Zero indicator */}
              {isZeroValue && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Operation display */}
      {action === 'move' && valueToMove !== undefined && fromIndex !== undefined && toIndex !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
            🔄 Moving Non-Zero Element
          </div>
          <div className="text-lg font-bold text-green-600">
            nums[{fromIndex}] = {valueToMove} → nums[{toIndex}]
          </div>
        </div>
      )}

      {/* Zero skip display */}
      {action === 'skip-zero' && zeroIndex !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
            ⏭️ Skipping Zero
          </div>
          <div className="text-lg font-bold text-red-600">
            nums[{zeroIndex}] = 0 (will be moved later)
          </div>
        </div>
      )}

      {/* Fill zero display */}
      {action === 'fill-zero' && fillIndex !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <div className="text-sm text-orange-800 dark:text-orange-200 font-medium mb-2">
            🔧 Filling with Zero
          </div>
          <div className="text-lg font-bold text-orange-600">
            nums[{fillIndex}] = {oldValue} → 0
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(writeIndex !== undefined || readIndex !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {writeIndex !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Write Index: {writeIndex}</span>
            </div>
          )}
          {readIndex !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Read Index: {readIndex}</span>
            </div>
          )}
        </div>
      )}

      {/* Original vs Result comparison */}
      {isComplete && originalArray && result && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Transformation:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                [{originalArray.join(', ')}]
              </div>
              <div className="text-xs text-gray-500">Original</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                [{result.join(', ')}]
              </div>
              <div className="text-xs text-gray-500">Result</div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Zero Values</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Write Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Read Pointer</span>
        </div>
      </div>

      {/* Algorithm note */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 max-w-lg">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Algorithm:</strong> Two-pass approach. First pass moves all non-zeros to the front,
          second pass fills remaining positions with zeros. Time: O(N), Space: O(1).
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