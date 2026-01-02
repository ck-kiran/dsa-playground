interface ValidMountainArrayVisualizerProps {
  step: any;
}

export function ValidMountainArrayVisualizer({ step }: ValidMountainArrayVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left } = pointers;
  const { result, reason, peakIndex, peakValue, currentValue, nextValue } = data;

  // Calculate bar heights for visualization
  const maxVal = Math.max(...array, 1);
  const barMaxHeight = 150;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Mountain visualization with bars */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mountain Profile:</div>
        <div className="flex gap-1 items-end justify-center" style={{ height: `${barMaxHeight + 40}px` }}>
          {array.map((value: number, index: number) => {
            const isPointer = left === index;
            const isHighlighted = highlightIndices.includes(index);
            const isPeak = peakIndex === index;
            const barHeight = (value / maxVal) * barMaxHeight;

            return (
              <div key={index} className="flex flex-col items-center justify-end relative" style={{ height: `${barMaxHeight}px` }}>
                {/* Bar */}
                <div
                  className={`
                    w-12 flex items-end justify-center text-xs font-semibold
                    transition-all duration-300 relative border-2
                    ${isPointer ? 'bg-blue-500 dark:bg-blue-600 border-blue-700 text-white scale-105' : ''}
                    ${isPeak ? 'bg-yellow-500 dark:bg-yellow-600 border-yellow-700 text-white scale-105' : ''}
                    ${isHighlighted && !isPointer && !isPeak && action?.includes('climbing-up') ? 'bg-green-500 dark:bg-green-600 border-green-700 text-white' : ''}
                    ${isHighlighted && !isPointer && !isPeak && action?.includes('climbing-down') ? 'bg-orange-500 dark:bg-orange-600 border-orange-700 text-white' : ''}
                    ${!isHighlighted && !isPointer && !isPeak ? 'bg-gray-400 dark:bg-gray-600 border-gray-500 dark:border-gray-500 text-white' : ''}
                  `}
                  style={{ height: `${barHeight}px`, minHeight: '20px' }}
                >
                  <span className="pb-1">{value}</span>
                </div>

                {/* Position indicator */}
                <div className="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400">
                  {index}
                </div>

                {/* Pointer indicator */}
                {isPointer && (
                  <div className="absolute -top-6 text-xs font-bold text-blue-600 dark:text-blue-400">
                    PTR
                  </div>
                )}
                {isPeak && !isPointer && (
                  <div className="absolute -top-6 text-xs font-bold text-yellow-600 dark:text-yellow-400">
                    PEAK
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        {left !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 border-2 border-blue-700"></div>
            <span>Pointer: {left}</span>
          </div>
        )}
        {peakIndex !== undefined && (
          <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded border border-yellow-300">
            <span className="font-semibold text-yellow-700 dark:text-yellow-300">Peak at {peakIndex}: {peakValue}</span>
          </div>
        )}
      </div>

      {/* Action details */}
      {action === 'climbing-up' && currentValue !== undefined && nextValue !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Climbing Up:</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {currentValue} &lt; {nextValue} ✓
          </div>
        </div>
      )}

      {action === 'climbing-down' && currentValue !== undefined && nextValue !== undefined && (
        <div className="text-center p-4 border-2 border-orange-500 rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Climbing Down:</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {currentValue} &gt; {nextValue} ✓
          </div>
        </div>
      )}

      {/* Result */}
      {isComplete && result !== undefined && (
        <div className={`text-center p-4 border-2 rounded-lg ${
          result
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
          <div className={`text-2xl font-bold ${
            result ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {result ? '✓ Valid Mountain' : '✗ Not a Mountain'}
          </div>
          {reason && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {reason}
            </div>
          )}
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? (result ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + ' font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs flex-wrap justify-center mt-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 border border-blue-700"></div>
          <span>Current Pointer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 border border-green-700"></div>
          <span>Ascending</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 border border-orange-700"></div>
          <span>Descending</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 border border-yellow-700"></div>
          <span>Peak</span>
        </div>
      </div>
    </div>
  );
}
