interface ContainsDuplicateVisualizerProps {
  step: any;
}

export function ContainsDuplicateVisualizer({ step }: ContainsDuplicateVisualizerProps) {
  const {
    array = [],
    hashMap = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    data = {}
  } = step;

  const { currentIndex, currentValue, result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Array visualization */}
      <div className="flex gap-2">
        {array.map((value: number, index: number) => {
          const isHighlighted = highlightIndices.includes(index);
          const isCurrentIndex = currentIndex === index;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                transition-all duration-300
                ${isCurrentIndex && result === true ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : ''}
                ${isHighlighted && !isCurrentIndex ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                ${!isHighlighted && !isCurrentIndex ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
              `}
            >
              {value}
            </div>
          );
        })}
      </div>

      {/* Current element indicator */}
      {currentIndex !== undefined && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Current Element:</div>
          <div className="font-mono text-lg font-bold text-blue-600">
            arr[{currentIndex}] = {currentValue}
          </div>
        </div>
      )}

      {/* Hash Set visualization */}
      {Object.keys(hashMap).length > 0 && (
        <div className="w-full max-w-md">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">Hash Set:</div>
          <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-wrap gap-2">
              {Object.keys(hashMap).map((key) => (
                <div
                  key={key}
                  className={`
                    px-3 py-1 rounded border text-sm font-medium
                    ${key === currentValue?.toString() && result === true
                      ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                      : 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    }
                  `}
                >
                  {key}
                </div>
              ))}
            </div>
            {Object.keys(hashMap).length === 0 && (
              <div className="text-gray-500 text-sm italic">Empty</div>
            )}
          </div>
        </div>
      )}

      {/* Result */}
      {result !== undefined && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Result:</div>
          <div className={`text-xl font-bold ${result ? 'text-red-600' : 'text-green-600'}`}>
            {result ? 'Contains Duplicate' : 'No Duplicates'}
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-md">
        <p className={`text-lg ${isComplete ? 'text-green-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}