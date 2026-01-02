interface SingleElementSortedVisualizerProps {
  step: any;
}

export function SingleElementSortedVisualizer({ step }: SingleElementSortedVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right, mid } = pointers;
  const {
    actualSingle,
    originalMid,
    adjustedMid,
    pairIndex1,
    pairIndex2,
    pairValue1,
    pairValue2,
    decision,
    reason,
    result,
    finalIndex
  } = data;

  // Group array elements into pairs for visualization
  const pairs = [];
  for (let i = 0; i < array.length; i += 2) {
    pairs.push([i, i + 1 < array.length ? i + 1 : null]);
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Problem info */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <div className="text-sm text-gray-600 dark:text-gray-400">Finding Single Element:</div>
        <div className="text-2xl font-bold text-blue-600">
          {actualSingle !== undefined ? actualSingle : '?'}
        </div>
        <div className="text-xs text-gray-500 mt-1">All others appear twice</div>
      </div>

      {/* Array visualization with pair grouping */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isLeft = left === index;
          const isMid = mid === index;
          const isRight = right === index;
          const isHighlighted = highlightIndices.includes(index);
          const isSingle = value === actualSingle && array.filter((v: number) => v === value).length === 1;
          const isResult = isComplete && index === finalIndex;
          const isPairElement = (index === pairIndex1 || index === pairIndex2);

          // Determine pair grouping for styling
          const isFirstInPair = index % 2 === 0;
          const isLastInPair = index % 2 === 1;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center text-sm font-semibold
                transition-all duration-300 relative
                ${isFirstInPair ? 'rounded-l border-l-2 border-t-2 border-b-2' : 'rounded-r border-r-2 border-t-2 border-b-2'}
                ${isMid ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isLeft && !isMid ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isRight && !isMid ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isResult ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 ring-2 ring-green-400' : ''}
                ${isPairElement && !isMid && !isLeft && !isRight && !isResult ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${isHighlighted && !isMid && !isLeft && !isRight && !isResult && !isPairElement ? 'border-pink-500 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200' : ''}
                ${!isHighlighted && !isMid && !isLeft && !isRight && !isResult && !isPairElement ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Single element indicator */}
              {isSingle && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              {/* Even/odd indicator for pair analysis */}
              {action === 'adjust-mid' && (
                <div className="absolute -top-2 -left-1 text-xs font-bold text-blue-600">
                  {index % 2 === 0 ? 'E' : 'O'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pair analysis */}
      {pairValue1 !== undefined && pairValue2 !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pair Check:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                nums[{pairIndex1}] = {pairValue1}
              </div>
              <div className="text-sm text-gray-500">Index {pairIndex1}</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">
              {pairValue1 === pairValue2 ? '=' : '≠'}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                nums[{pairIndex2}] = {pairValue2}
              </div>
              <div className="text-sm text-gray-500">Index {pairIndex2}</div>
            </div>
          </div>
          <div className={`text-sm mt-2 font-medium ${
            pairValue1 === pairValue2 ? 'text-green-600' : 'text-red-600'
          }`}>
            {pairValue1 === pairValue2 ? '✓ Pair Intact' : '✗ Pair Broken'}
          </div>
        </div>
      )}

      {/* Mid adjustment info */}
      {originalMid !== undefined && adjustedMid !== undefined && originalMid !== adjustedMid && (
        <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-purple-800 dark:text-purple-200 font-medium">
            Mid adjusted: {originalMid} (odd) → {adjustedMid} (even)
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">
            Always start pair checking from even index
          </div>
        </div>
      )}

      {/* Decision reasoning */}
      {decision && reason && (
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            🔍 Search {decision === 'left' ? '← Left' : 'Right →'} half
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
            Reason: {reason}
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
              <span>Mid: {mid} ({mid % 2 === 0 ? 'even' : 'odd'})</span>
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

      {/* Result */}
      {result !== undefined && isComplete && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Single Element Found:</div>
          <div className="text-3xl font-bold text-green-600">
            {result}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            At index {finalIndex}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Single Element</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-gray-400 rounded-l bg-gray-100"></div>
          <div className="w-4 h-3 border border-gray-400 rounded-r bg-gray-100 -ml-1"></div>
          <span>Pairs</span>
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