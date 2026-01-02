interface ReverseStringVisualizerProps {
  step: any;
}

export function ReverseStringVisualizer({ step }: ReverseStringVisualizerProps) {
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
  const {
    originalString,
    leftChar,
    rightChar,
    leftIndex,
    rightIndex,
    swapFrom,
    swapTo,
    fromIndex,
    toIndex,
    newLeftChar,
    newRightChar,
    newLeft,
    newRight,
    remainingPairs,
    finalLeft,
    finalRight,
    meetingPoint,
    result,
    stringLength,
    swapsPerformed
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Algorithm info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">String Length:</div>
          <div className="text-2xl font-bold text-blue-600">{stringLength || array.length}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Swaps Performed:</div>
          <div className="text-2xl font-bold text-green-600">{swapsPerformed || 0}</div>
        </div>
      </div>

      {/* String visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((char: string, index: number) => {
          const isLeft = left === index;
          const isRight = right === index;
          const isHighlighted = highlightIndices.includes(index);
          const isMeetingPoint = meetingPoint === index;
          const isBothPointers = isLeft && isRight;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-lg font-semibold
                transition-all duration-300 relative
                ${isBothPointers ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isLeft && !isRight ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isRight && !isLeft ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isMeetingPoint && !isLeft && !isRight ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isHighlighted && !isLeft && !isRight && !isMeetingPoint ? 'border-pink-500 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200' : ''}
                ${!isHighlighted && !isLeft && !isRight && !isMeetingPoint ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {char}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Swap indicator */}
              {(fromIndex === index || toIndex === index) && action === 'swap' && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Swap operation display */}
      {action === 'swap' && swapFrom !== undefined && swapTo !== undefined && fromIndex !== undefined && toIndex !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <div className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-2">
            🔄 Swapping Characters
          </div>
          <div className="text-lg font-bold text-yellow-600">
            '{swapFrom}' at [{fromIndex}] ↔ '{swapTo}' at [{toIndex}]
          </div>
        </div>
      )}

      {/* Comparison display */}
      {action === 'compare' && leftChar !== undefined && rightChar !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
            👀 Comparing Characters
          </div>
          <div className="text-lg font-bold text-blue-600">
            Left: '{leftChar}' at [{leftIndex}] | Right: '{rightChar}' at [{rightIndex}]
          </div>
        </div>
      )}

      {/* Movement display */}
      {action === 'move-pointers' && newLeft !== undefined && newRight !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
            ➡️ Moving Pointers
          </div>
          <div className="text-lg font-bold text-green-600">
            Left: {newLeft} | Right: {newRight} | Remaining pairs: {remainingPairs}
          </div>
        </div>
      )}

      {/* Completion display */}
      {action === 'complete' && (
        <div className="text-center p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-2">
            🎯 Reversal Complete
          </div>
          <div className="text-lg font-bold text-purple-600">
            {meetingPoint !== null
              ? `Pointers meet at position ${meetingPoint}`
              : `Pointers crossed: Left=${finalLeft}, Right=${finalRight}`
            }
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(left !== undefined || right !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {left !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Left Pointer: {left}</span>
            </div>
          )}
          {right !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Right Pointer: {right}</span>
            </div>
          )}
          {remainingPairs !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-gray-500 bg-gray-100"></div>
              <span>Remaining pairs: {remainingPairs}</span>
            </div>
          )}
        </div>
      )}

      {/* Original vs Result comparison */}
      {isComplete && originalString && result && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Transformation:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200 font-mono">
                "{originalString.join('')}"
              </div>
              <div className="text-xs text-gray-500">Original</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 font-mono">
                "{result.join('')}"
              </div>
              <div className="text-xs text-gray-500">Reversed</div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Left Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Right Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Meeting Point</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span>Swapping</span>
        </div>
      </div>

      {/* Algorithm note */}
      <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 max-w-lg">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Algorithm:</strong> Use two pointers starting from both ends. Swap characters at
          pointer positions and move pointers inward until they meet. Time: O(N), Space: O(1).
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