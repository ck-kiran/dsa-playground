interface MaxConsecutiveOnesIIIVisualizerProps {
  step: any;
}

export function MaxConsecutiveOnesIIIVisualizer({ step }: MaxConsecutiveOnesIIIVisualizerProps) {
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
  const { k, zeros, maxOnes, currentWindow, result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Array visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Binary Array:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {array.map((num: number, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isInWindow = highlightIndices.includes(index);

            return (
              <div
                key={index}
                className={`
                  w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isLeft ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 scale-110' : ''}
                  ${isRight ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 scale-110' : ''}
                  ${isInWindow && !isLeft && !isRight ? 'border-green-500 bg-green-100 dark:bg-green-900/30' : ''}
                  ${!isInWindow && !isLeft && !isRight ? (num === 1 ? 'border-gray-300 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 bg-red-50 dark:bg-red-900/10') : ''}
                  ${num === 1 ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}
                `}
              >
                {num}
                <div className="absolute -bottom-5 text-xs text-gray-500">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm flex-wrap justify-center">
        {k !== undefined && (
          <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-300">
            <span className="font-semibold text-purple-700 dark:text-purple-300">Max Flips: {k}</span>
          </div>
        )}
        {zeros !== undefined && (
          <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded border border-red-300">
            <span className="font-semibold text-red-700 dark:text-red-300">Zeros in Window: {zeros}</span>
          </div>
        )}
        {maxOnes !== undefined && (
          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded border border-green-300">
            <span className="font-semibold text-green-700 dark:text-green-300">Max Ones: {maxOnes}</span>
          </div>
        )}
      </div>

      {/* Result */}
      {isComplete && result !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Maximum Consecutive Ones:</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {result}
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
