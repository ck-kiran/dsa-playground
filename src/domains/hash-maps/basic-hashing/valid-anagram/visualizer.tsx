interface ValidAnagramVisualizerProps {
  step: any;
}

export function ValidAnagramVisualizer({ step }: ValidAnagramVisualizerProps) {
  const {
    text = '',
    pattern = '',
    hashMap = {},
    textIndex,
    patternIndex,
    message = '',
    isComplete = false,
    data = {}
  } = step;

  const { result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* String visualizations */}
      <div className="space-y-4">
        {/* String s */}
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">String s:</div>
          <div className="flex gap-1 justify-center">
            {text.split('').map((char: string, index: number) => (
              <div
                key={index}
                className={`
                  w-8 h-8 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300
                  ${textIndex === index ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                  ${textIndex !== index ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        {/* String t */}
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">String t:</div>
          <div className="flex gap-1 justify-center">
            {pattern.split('').map((char: string, index: number) => (
              <div
                key={index}
                className={`
                  w-8 h-8 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300
                  ${patternIndex === index ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${patternIndex !== index ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current character indicators */}
      <div className="flex gap-8 text-sm">
        {textIndex !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
            <span>Current in s: '{text[textIndex]}'</span>
          </div>
        )}
        {patternIndex !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
            <span>Current in t: '{pattern[patternIndex]}'</span>
          </div>
        )}
      </div>

      {/* Character count hash map */}
      {Object.keys(hashMap).length > 0 && (
        <div className="w-full max-w-md">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">Character Count Map:</div>
          <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(hashMap).map(([char, count]) => (
                <div
                  key={char}
                  className={`
                    px-2 py-1 rounded border text-center text-sm font-medium
                    ${(count as number) === 0
                      ? 'border-gray-400 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      : 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    }
                  `}
                >
                  <div className="font-bold">{char}</div>
                  <div className="text-xs">{count as number}</div>
                </div>
              ))}
            </div>
            {Object.keys(hashMap).length === 0 && (
              <div className="text-gray-500 text-sm italic text-center">Empty</div>
            )}
          </div>
        </div>
      )}

      {/* Result */}
      {result !== undefined && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Result:</div>
          <div className={`text-xl font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
            {result ? 'Valid Anagram' : 'Not an Anagram'}
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-lg">
        <p className={`text-lg ${isComplete ? 'text-green-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}