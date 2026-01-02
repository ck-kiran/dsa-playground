interface RemoveDuplicatesVisualizerProps {
  step: any;
}

export function RemoveDuplicatesVisualizer({ step }: RemoveDuplicatesVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { uniqueIndex, currentIndex } = pointers;
  const {
    originalArray,
    currentValue,
    lastUniqueValue,
    isDuplicate,
    newUniqueValue,
    newUniqueIndex,
    placedValue,
    placedIndex,
    duplicateValue,
    duplicateIndex,
    result,
    uniqueArray,
    uniqueCount,
    removedCount
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Algorithm info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Unique Elements:</div>
          <div className="text-2xl font-bold text-green-600">{uniqueCount || 1}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Removed:</div>
          <div className="text-2xl font-bold text-red-600">{removedCount || 0}</div>
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isUniqueIndex = uniqueIndex === index;
          const isCurrentIndex = currentIndex === index;
          const isHighlighted = highlightIndices.includes(index);
          const isInUniqueSection = uniqueIndex !== undefined && index <= uniqueIndex;
          const isDuplicatePos = duplicateIndex === index;
          const isPlacedPos = placedIndex === index;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300 relative
                ${isUniqueIndex && isCurrentIndex ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isUniqueIndex && !isCurrentIndex ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isCurrentIndex && !isUniqueIndex ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isPlacedPos ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 ring-2 ring-green-400' : ''}
                ${isDuplicatePos && !isCurrentIndex ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : ''}
                ${isHighlighted && !isUniqueIndex && !isCurrentIndex && !isPlacedPos && !isDuplicatePos ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${isInUniqueSection && !isUniqueIndex && !isCurrentIndex && !isPlacedPos && !isDuplicatePos && !isHighlighted ? 'border-green-300 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : ''}
                ${!isInUniqueSection && !isUniqueIndex && !isCurrentIndex && !isPlacedPos && !isDuplicatePos && !isHighlighted ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Unique section indicator */}
              {isInUniqueSection && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparison display */}
      {action === 'compare' && currentValue !== undefined && lastUniqueValue !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comparison:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">nums[{currentIndex}] = {currentValue}</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">
              {isDuplicate ? '=' : '≠'}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">nums[{uniqueIndex}] = {lastUniqueValue}</div>
              <div className="text-xs text-gray-500">Last Unique</div>
            </div>
          </div>
          <div className={`text-sm mt-2 font-medium ${
            isDuplicate ? 'text-red-600' : 'text-green-600'
          }`}>
            {isDuplicate ? '✗ Duplicate (Skip)' : '✓ New Unique (Keep)'}
          </div>
        </div>
      )}

      {/* Move unique display */}
      {action === 'move-unique' && newUniqueValue !== undefined && newUniqueIndex !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
            ✅ New Unique Element
          </div>
          <div className="text-lg font-bold text-green-600">
            Moving {newUniqueValue} to position {newUniqueIndex}
          </div>
        </div>
      )}

      {/* Skip duplicate display */}
      {action === 'skip-duplicate' && duplicateValue !== undefined && duplicateIndex !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
            ⏭️ Skipping Duplicate
          </div>
          <div className="text-lg font-bold text-red-600">
            nums[{duplicateIndex}] = {duplicateValue}
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(uniqueIndex !== undefined || currentIndex !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {uniqueIndex !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Unique Index: {uniqueIndex} ({array[uniqueIndex]})</span>
            </div>
          )}
          {currentIndex !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Current Index: {currentIndex} ({array[currentIndex]})</span>
            </div>
          )}
        </div>
      )}

      {/* Result display */}
      {isComplete && result !== undefined && originalArray && uniqueArray && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
          <div className="text-2xl font-bold text-green-600 mb-2">
            New Length: {result}
          </div>
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
                [{uniqueArray.join(', ')}]
              </div>
              <div className="text-xs text-gray-500">Unique Elements</div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Unique Section</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Unique Index</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Current Index</span>
        </div>
      </div>

      {/* Algorithm note */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 max-w-lg">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Algorithm:</strong> Two pointers approach. Unique index tracks the end of unique section,
          current index scans for new unique elements. Time: O(N), Space: O(1).
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