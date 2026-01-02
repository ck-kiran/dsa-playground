interface SqrtVisualizerProps {
  step: any;
}

export function SqrtVisualizer({ step }: SqrtVisualizerProps) {
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
    x,
    square,
    result,
    resultSquare,
    nextSquare,
    comparison,
    direction,
    isPerfectSquare,
    isSpecialCase,
    explanation
  } = data;

  // For special cases where we don't have an array
  if (isSpecialCase) {
    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-lg font-bold text-green-600">Special Case</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-2">
            √{x} = {result}
          </div>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Problem statement */}
      <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <div className="text-sm text-gray-600 dark:text-gray-400">Finding:</div>
        <div className="text-2xl font-bold text-blue-600">√{x}</div>
        <div className="text-sm text-gray-500 mt-1">Floor square root</div>
      </div>

      {/* Search range visualization */}
      {array.length > 0 && (
        <div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            Search Range:
          </div>
          <div className="flex gap-1 flex-wrap justify-center max-w-4xl">
            {array.map((value: number, index: number) => {
              const isLeft = left === value;
              const isMid = mid === value;
              const isRight = right === value;
              const isHighlighted = highlightIndices.includes(index);

              return (
                <div
                  key={index}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded border-2 text-xs font-semibold
                    transition-all duration-300 relative
                    ${isMid ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                    ${isLeft && !isMid ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                    ${isRight && !isMid ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                    ${isHighlighted && !isMid && !isLeft && !isRight ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                    ${!isHighlighted && !isMid && !isLeft && !isRight ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                    ${isPerfectSquare && isMid ? 'ring-2 ring-green-400' : ''}
                  `}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Current calculation */}
      {mid !== undefined && square !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Check:</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {mid}² = {square}
          </div>
          <div className={`text-lg mt-2 ${
            comparison === 'equal' ? 'text-green-600' :
            comparison === 'less' ? 'text-orange-600' : 'text-red-600'
          }`}>
            {comparison === 'equal' ? `= ${x} ✓` :
             comparison === 'less' ? `< ${x}` : `> ${x}`}
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
              <span>Mid: {mid} (square: {square})</span>
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

      {/* Search direction */}
      {direction && (
        <div className="text-center p-2 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            🔍 Searching {direction === 'left' ? '← Left' : 'Right →'} half
          </div>
        </div>
      )}

      {/* Final result */}
      {result !== undefined && isComplete && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Answer:</div>
          <div className="text-3xl font-bold text-green-600">
            √{x} = {result}
          </div>
          {explanation && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {explanation}
            </div>
          )}
          {isPerfectSquare && (
            <div className="text-sm text-green-600 mt-1 font-medium">
              🎉 Perfect Square!
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