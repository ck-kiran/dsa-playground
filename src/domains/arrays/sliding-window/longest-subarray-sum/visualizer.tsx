
interface LongestSubarraySumVisualizerProps {
  step: any;
}

export function LongestSubarraySumVisualizer({ step }: LongestSubarraySumVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    sum = 0,
    maxLength = 0,
    target = 0,
    currentWindow = [],
    isMaxWindow = false,
    isComplete = false
  } = step;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Array visualization */}
      <div className="flex gap-2">
        {array.map((value: number, index: number) => {
          const isHighlighted = highlightIndices.includes(index);
          const isLeft = pointers.left === index;
          const isRight = pointers.right === index;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300
                ${isMaxWindow && isHighlighted ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
                ${isHighlighted && !isMaxWindow ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${isLeft ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                ${isRight ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                ${!isHighlighted && !isLeft && !isRight ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
            </div>
          );
        })}
      </div>

      {/* Pointers legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
          <span>Left (L={pointers.left})</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
          <span>Right (R={pointers.right})</span>
        </div>
        {isMaxWindow && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-green-500 bg-green-100"></div>
            <span>Max Window</span>
          </div>
        )}
      </div>

      {/* Current window display */}
      {currentWindow.length > 0 && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Current Window:</div>
          <div className="font-mono text-lg font-bold">
            [{currentWindow.join(', ')}]
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Length: {currentWindow.length}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-lg font-bold text-blue-600">{sum}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Current Sum</div>
        </div>
        <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-lg font-bold text-green-600">{target}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Target (≤ K)</div>
        </div>
        <div className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-lg font-bold text-purple-600">{maxLength}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Max Length</div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center max-w-md">
        <p className={`text-lg ${isComplete ? 'text-green-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}