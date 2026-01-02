interface MinimumWindowSubstringVisualizerProps {
  step: any;
}

export function MinimumWindowSubstringVisualizer({ step }: MinimumWindowSubstringVisualizerProps) {
  const {
    text = '',
    pattern = '',
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right } = pointers;
  const { need = {}, window = {}, valid, minLen, minWindow, currentWindow, result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Pattern to find */}
      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Find all characters from:</div>
        <div className="text-xl font-bold text-purple-700 dark:text-purple-300">"{pattern}"</div>
      </div>

      {/* String visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">String:</div>
        <div className="flex gap-1 justify-center flex-wrap max-w-4xl">
          {text.split('').map((char: string, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isInWindow = highlightIndices.includes(index);

            return (
              <div
                key={index}
                className={`
                  w-10 h-10 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isLeft ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 scale-110' : ''}
                  ${isRight ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 scale-110' : ''}
                  ${isInWindow && !isLeft && !isRight ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
                  ${!isInWindow && !isLeft && !isRight ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {char}
                <div className="absolute -bottom-5 text-xs text-gray-500 dark:text-gray-400">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status info */}
      <div className="flex gap-4 text-sm flex-wrap justify-center">
        {valid !== undefined && need && (
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300">
            <span className="font-semibold text-blue-700 dark:text-blue-300">
              Valid: {valid}/{Object.keys(need).length}
            </span>
          </div>
        )}
        {minLen !== undefined && minLen !== Infinity && (
          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded border border-green-300">
            <span className="font-semibold text-green-700 dark:text-green-300">
              Min Length: {minLen}
            </span>
          </div>
        )}
      </div>

      {/* Current/Min window */}
      {(currentWindow || minWindow) && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {minWindow ? 'Minimum Window:' : 'Current Window:'}
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
            "{minWindow || currentWindow}"
          </div>
        </div>
      )}

      {/* Character frequencies */}
      <div className="flex gap-6 flex-wrap justify-center max-w-2xl">
        <div className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Need:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(need).map(([char, count]) => (
              <div key={char} className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">
                {char}: {count as number}
              </div>
            ))}
          </div>
        </div>
        {Object.keys(window).length > 0 && (
          <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Window:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(window).map(([char, count]) => (
                <div key={char} className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">
                  {char}: {count as number}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {isComplete && (
        <div className={`text-center p-4 border-2 rounded-lg ${
          result ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-500 bg-gray-50 dark:bg-gray-800'
        }`}>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {result ? 'Minimum Window Found:' : 'No Valid Window'}
          </div>
          <div className={`text-2xl font-bold ${result ? 'text-green-600 dark:text-green-400' : 'text-gray-600'}`}>
            {result ? `"${result}"` : 'None'}
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
