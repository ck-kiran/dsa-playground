interface LongestSubstringWithoutRepeatingVisualizerProps {
  step: any;
}

export function LongestSubstringWithoutRepeatingVisualizer({ step }: LongestSubstringWithoutRepeatingVisualizerProps) {
  const {
    text = '',
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right } = pointers;
  const { maxLength, currentWindow, charMap = {}, currentChar, duplicateChar, result, longestSubstring } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* String visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">String:</div>
        <div className="flex gap-1 justify-center flex-wrap max-w-3xl">
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
                {/* Position indicator */}
                <div className="absolute -bottom-5 text-xs text-gray-500 dark:text-gray-400">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Window info */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        {left !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
            <span>Left: {left}</span>
          </div>
        )}
        {right !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
            <span>Right: {right}</span>
          </div>
        )}
        {maxLength !== undefined && (
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300">
            <span className="font-semibold text-blue-700 dark:text-blue-300">Max Length: {maxLength}</span>
          </div>
        )}
      </div>

      {/* Current window */}
      {currentWindow && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Window:</div>
          <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
            "{currentWindow}"
          </div>
          <div className="text-sm text-gray-500 mt-1">Length: {currentWindow.length}</div>
        </div>
      )}

      {/* Character map */}
      {Object.keys(charMap).length > 0 && (
        <div className="text-center p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20 max-w-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Character Positions:</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(charMap).map(([char, pos]) => (
              <div key={char} className="px-2 py-1 bg-white dark:bg-gray-700 rounded border text-xs">
                <span className="font-bold">{char}</span>: {pos as number}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action details */}
      {action === 'shrink' && duplicateChar && (
        <div className="text-center p-4 border-2 border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Duplicate Found:</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">
            Character '{duplicateChar}' repeats - shrinking window
          </div>
        </div>
      )}

      {action === 'update-max' && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Maximum Found:</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            Length: {maxLength}
          </div>
        </div>
      )}

      {/* Result */}
      {isComplete && result !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Longest Substring:</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            "{longestSubstring}"
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            Length: {result}
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
