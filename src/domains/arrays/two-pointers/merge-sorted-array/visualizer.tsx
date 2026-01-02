interface MergeSortedArrayVisualizerProps {
  step: any;
}

export function MergeSortedArrayVisualizer({ step }: MergeSortedArrayVisualizerProps) {
  const {
    array = [],
    secondArray = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { i, j, k } = pointers;
  const {
    originalNums1,
    originalNums2,
    m, n,
    value1,
    value2,
    position1,
    position2,
    mergePosition,
    placedValue,
    fromArray,
    fromIndex,
    toIndex,
    newI,
    newJ,
    newK,
    remainingValue,
    result,
    totalElements
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Algorithm info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">nums1 (m={m || 0}):</div>
          <div className="text-lg font-bold text-blue-600">
            [{originalNums1 ? originalNums1.slice(0, m || 0).join(', ') : ''}]
          </div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">nums2 (n={n || 0}):</div>
          <div className="text-lg font-bold text-purple-600">
            [{originalNums2 ? originalNums2.join(', ') : ''}]
          </div>
        </div>
      </div>

      {/* nums1 array (main merge array) */}
      <div className="w-full">
        <div className="text-center mb-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">nums1 (merge target)</div>
        </div>
        <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
          {array.map((value: number, index: number) => {
            const isI = i === index;
            const isK = k === index;
            const isHighlighted = highlightIndices.includes(index);
            const isEmptySlot = originalNums1 && index >= (m || 0) && index < (totalElements || array.length);
            const isFromNums1Original = originalNums1 && index < (m || 0);

            return (
              <div
                key={index}
                className={`
                  w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isI && isK ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${isI && !isK ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                  ${isK && !isI ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : ''}
                  ${isHighlighted && !isI && !isK ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                  ${isEmptySlot && !isHighlighted && !isI && !isK ? 'border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-400 border-dashed' : ''}
                  ${isFromNums1Original && !isHighlighted && !isI && !isK ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : ''}
                  ${!isFromNums1Original && !isEmptySlot && !isHighlighted && !isI && !isK ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {value !== 0 || index < (m || 0) ? value : ''}
                {/* Index label */}
                <div className="absolute -bottom-4 text-xs text-gray-500">
                  {index}
                </div>
                {/* Original nums1 indicator */}
                {isFromNums1Original && (
                  <div className="absolute -top-2 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* nums2 array */}
      <div className="w-full">
        <div className="text-center mb-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">nums2 (source array)</div>
        </div>
        <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
          {secondArray.map((value: number, index: number) => {
            const isJ = j === index;
            const isUsed = j !== undefined && index > j;

            return (
              <div
                key={index}
                className={`
                  w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isJ ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${isUsed ? 'border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-400' : ''}
                  ${!isJ && !isUsed ? 'border-purple-300 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : ''}
                `}
              >
                {value}
                {/* Index label */}
                <div className="absolute -bottom-4 text-xs text-gray-500">
                  {index}
                </div>
                {/* Used indicator */}
                {isUsed && (
                  <div className="absolute -top-2 -right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison display */}
      {action === 'compare' && value1 !== undefined && value2 !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comparison:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">nums1[{position1}] = {value1}</div>
              <div className="text-xs text-gray-500">From nums1</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">
              {value1 > value2 ? '>' : '≤'}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">nums2[{position2}] = {value2}</div>
              <div className="text-xs text-gray-500">From nums2</div>
            </div>
          </div>
        </div>
      )}

      {/* Placement display */}
      {(action === 'place-from-nums1' || action === 'place-from-nums2') && placedValue !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
            📍 Placing Element
          </div>
          <div className="text-lg font-bold text-green-600">
            {placedValue} from {fromArray}[{fromIndex}] → nums1[{toIndex}]
          </div>
        </div>
      )}

      {/* Copy remaining display */}
      {action === 'copy-remaining-nums2' && remainingValue !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <div className="text-sm text-orange-800 dark:text-orange-200 font-medium mb-2">
            📋 Copying Remaining
          </div>
          <div className="text-lg font-bold text-orange-600">
            nums2[{fromIndex}] = {remainingValue} → nums1[{toIndex}]
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(i !== undefined || j !== undefined || k !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {i !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>i (nums1): {i} {i >= 0 ? `(${array[i]})` : '(done)'}</span>
            </div>
          )}
          {j !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>j (nums2): {j} {j >= 0 ? `(${secondArray[j]})` : '(done)'}</span>
            </div>
          )}
          {k !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-red-500 bg-red-100"></div>
              <span>k (merge): {k} {k >= 0 ? '(active)' : '(complete)'}</span>
            </div>
          )}
        </div>
      )}

      {/* Result display */}
      {isComplete && result && originalNums1 && originalNums2 && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Merge Result:</div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-lg font-bold text-green-600">
              [{result.join(', ')}]
            </div>
            <div className="text-sm text-gray-500">
              Successfully merged {totalElements} elements in-place
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Original nums1</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>nums2 pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Merge pointer</span>
        </div>
      </div>

      {/* Algorithm note */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 max-w-lg">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Algorithm:</strong> Merge from the end to avoid overwriting elements.
          Compare elements and place larger one at the end. Time: O(M+N), Space: O(1).
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