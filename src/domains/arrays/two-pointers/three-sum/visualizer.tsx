interface ThreeSumVisualizerProps {
  step: any;
}

export function ThreeSumVisualizer({ step }: ThreeSumVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { i, left, right } = pointers;
  const {
    originalArray,
    sortedArray,
    target,
    firstElement,
    triplet,
    sum,
    comparison,
    foundTriplet,
    triplets,
    tripletsCount,
    result,
    allTriplets,
    duplicateValue,
    reason
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Algorithm info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Target Sum:</div>
          <div className="text-2xl font-bold text-blue-600">0</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Triplets Found:</div>
          <div className="text-2xl font-bold text-green-600">{tripletsCount || 0}</div>
        </div>
        {firstElement !== undefined && (
          <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">First Element:</div>
            <div className="text-2xl font-bold text-purple-600">{firstElement}</div>
            <div className="text-xs text-gray-500">Need sum = {target}</div>
          </div>
        )}
      </div>

      {/* Array visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isI = i === index;
          const isLeft = left === index;
          const isRight = right === index;
          const isHighlighted = highlightIndices.includes(index);
          const isInTriplet = (i === index) || (left === index) || (right === index);

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300 relative
                ${isI ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' : ''}
                ${isLeft && !isI ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isRight && !isI && !isLeft ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isHighlighted && !isInTriplet ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${!isHighlighted && !isInTriplet ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Positive/negative indicator */}
              {value > 0 && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
              {value < 0 && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sort comparison */}
      {action === 'sort' && originalArray && sortedArray && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Array Sorting:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                [{originalArray.join(', ')}]
              </div>
              <div className="text-xs text-gray-500">Original</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                [{sortedArray.join(', ')}]
              </div>
              <div className="text-xs text-gray-500">Sorted</div>
            </div>
          </div>
        </div>
      )}

      {/* Triplet check display */}
      {action === 'check-triplet' && triplet && sum !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Triplet:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{triplet[0]}</div>
              <div className="text-xs text-gray-500">i = {i}</div>
            </div>
            <div className="text-xl">+</div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{triplet[1]}</div>
              <div className="text-xs text-gray-500">left = {left}</div>
            </div>
            <div className="text-xl">+</div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{triplet[2]}</div>
              <div className="text-xs text-gray-500">right = {right}</div>
            </div>
            <div className="text-xl">=</div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                comparison === 'equal' ? 'text-green-600' :
                comparison === 'less' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {sum}
              </div>
              <div className="text-xs text-gray-500">
                {comparison === 'equal' ? '✓ Found!' :
                 comparison === 'less' ? '< 0' : '> 0'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Found triplet display */}
      {action === 'found-triplet' && foundTriplet && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
            🎉 Valid Triplet Found!
          </div>
          <div className="text-xl font-bold text-green-600">
            [{foundTriplet.join(', ')}]
          </div>
          <div className="text-sm text-green-700 dark:text-green-300 mt-1">
            Sum = {foundTriplet.reduce((a: number, b: number) => a + b, 0)}
          </div>
        </div>
      )}

      {/* Skip duplicate display */}
      {(action === 'skip-duplicate-i' || action === 'skip-duplicate-left' || action === 'skip-duplicate-right') &&
       duplicateValue !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <div className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-2">
            ⏭️ Skipping Duplicate
          </div>
          <div className="text-lg font-bold text-yellow-600">
            Value: {duplicateValue}
          </div>
        </div>
      )}

      {/* Move pointer display */}
      {(action === 'move-left' || action === 'move-right') && reason && (
        <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
            🔄 Moving Pointer
          </div>
          <div className="text-lg font-bold text-blue-600">
            {reason === 'sum too small' ? 'Sum < 0: Move left →' : 'Sum > 0: Move ← right'}
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(i !== undefined || left !== undefined || right !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {i !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>i: {i} ({array[i]})</span>
            </div>
          )}
          {left !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>left: {left} ({array[left]})</span>
            </div>
          )}
          {right !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>right: {right} ({array[right]})</span>
            </div>
          )}
        </div>
      )}

      {/* Found triplets list */}
      {triplets && triplets.length > 0 && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Found Triplets:</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {triplets.map((triplet: number[], idx: number) => (
              <div key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-800 rounded text-sm font-medium">
                [{triplet.join(', ')}]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final result */}
      {isComplete && result && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Final Result:</div>
          <div className="text-2xl font-bold text-green-600 mb-2">
            {result.length} unique triplets
          </div>
          {result.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {result.map((triplet: number[], idx: number) => (
                <div key={idx} className="px-3 py-2 bg-green-100 dark:bg-green-800 rounded text-base font-medium">
                  [{triplet.join(', ')}]
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>First Element (i)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Left Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Right Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Positive</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Negative</span>
        </div>
      </div>

      {/* Algorithm note */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 max-w-lg">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Algorithm:</strong> Sort array, then for each element, use two pointers to find pairs.
          Skip duplicates to avoid duplicate triplets. Time: O(N²), Space: O(1) excluding output.
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