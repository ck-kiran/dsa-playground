interface ValidPalindromeVisualizerProps {
  step: any;
}

export function ValidPalindromeVisualizer({ step }: ValidPalindromeVisualizerProps) {
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
  const { result, leftChar, rightChar } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* String visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">String:</div>
        <div className="flex gap-1 justify-center flex-wrap max-w-2xl">
          {text.split('').map((char: string, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isHighlighted = highlightIndices.includes(index);

            return (
              <div
                key={index}
                className={`
                  w-8 h-8 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isLeft ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                  ${isRight ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                  ${isHighlighted && !isLeft && !isRight ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${!isHighlighted && !isLeft && !isRight ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                  ${action === 'compare' && (isLeft || isRight) && result === false ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : ''}
                  ${action === 'match' && (isLeft || isRight) ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
                `}
              >
                {char}
                {/* Position indicator */}
                <div className="absolute -bottom-4 text-xs text-gray-500">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pointers legend and current comparison */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
          <span>Left Pointer: {left !== undefined ? left : 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
          <span>Right Pointer: {right !== undefined ? right : 'N/A'}</span>
        </div>
      </div>

      {/* Current character comparison */}
      {leftChar && rightChar && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Character Comparison:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">'{text[left]}'</div>
              <div className="text-sm text-gray-500">({leftChar})</div>
              <div className="text-xs text-gray-400">Position {left}</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">
              {action === 'match' ? '=' : action === 'compare' && result === false ? '≠' : 'vs'}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">'{text[right]}'</div>
              <div className="text-sm text-gray-500">({rightChar})</div>
              <div className="text-xs text-gray-400">Position {right}</div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result !== undefined && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Result:</div>
          <div className={`text-xl font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
            {result ? 'Valid Palindrome' : 'Not a Palindrome'}
          </div>
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