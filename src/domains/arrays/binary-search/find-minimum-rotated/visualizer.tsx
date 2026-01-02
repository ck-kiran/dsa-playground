interface FindMinimumRotatedVisualizerProps {
  step: any;
}

export function FindMinimumRotatedVisualizer({ step }: FindMinimumRotatedVisualizerProps) {
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
    midValue,
    rightValue,
    rotationPoint,
    actualMin,
    decision,
    reason,
    result,
    finalIndex
  } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Problem info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Rotation Point:</div>
          <div className="text-2xl font-bold text-orange-600">{rotationPoint || 'None'}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Actual Min:</div>
          <div className="text-2xl font-bold text-green-600">{actualMin}</div>
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
        {array.map((value: number, index: number) => {
          const isLeft = left === index;
          const isMid = mid === index;
          const isRight = right === index;
          const isHighlighted = highlightIndices.includes(index);
          const isRotationPoint = index === rotationPoint && rotationPoint > 0;
          const isMinimum = value === actualMin;
          const isResult = isComplete && index === finalIndex;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300 relative
                ${isMid ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${isLeft && !isMid ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isRight && !isMid ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isResult ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 ring-2 ring-green-400' : ''}
                ${isHighlighted && !isMid && !isLeft && !isRight && !isResult ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                ${!isHighlighted && !isMid && !isLeft && !isRight && !isResult ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
              {/* Index label */}
              <div className="absolute -bottom-4 text-xs text-gray-500">
                {index}
              </div>
              {/* Rotation point indicator */}
              {isRotationPoint && (
                <div className="absolute -top-2 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              {/* Minimum value indicator */}
              {isMinimum && (
                <div className="absolute -top-2 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparison display */}
      {midValue !== undefined && rightValue !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comparison:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">nums[{mid}] = {midValue}</div>
              <div className="text-sm text-gray-500">Mid</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">
              {midValue > rightValue ? '>' : '≤'}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">nums[{right}] = {rightValue}</div>
              <div className="text-sm text-gray-500">Right</div>
            </div>
          </div>
        </div>
      )}

      {/* Decision reasoning */}
      {decision && reason && (
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            🔍 Decision: Search {decision === 'left' ? '← Left' : 'Right →'} half
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
              <span>Left: {left} ({array[left]})</span>
            </div>
          )}
          {mid !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>Mid: {mid} ({midValue})</span>
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

      {/* Result */}
      {result !== undefined && isComplete && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Minimum Found:</div>
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
          <span>Rotation Point</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Minimum Value</span>
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