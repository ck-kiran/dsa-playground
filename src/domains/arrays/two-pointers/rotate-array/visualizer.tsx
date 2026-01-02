interface RotateArrayVisualizerProps {
  step: any;
}

export function RotateArrayVisualizer({ step }: RotateArrayVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { start, end } = pointers;
  const { index1, index2, value1, value2, k, actualK } = data;

  // Determine current phase
  const phaseInfo = action?.includes('phase-1') ? { phase: 1, color: 'blue' }
    : action?.includes('phase-2') ? { phase: 2, color: 'green' }
    : action?.includes('phase-3') ? { phase: 3, color: 'purple' }
    : null;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Phase indicator */}
      {phaseInfo && (
        <div className="flex items-center gap-4 px-4 py-2 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              phaseInfo.phase === 1 ? 'bg-blue-500' :
              phaseInfo.phase === 2 ? 'bg-green-500' :
              'bg-purple-500'
            }`}></div>
            <span className="font-semibold">Phase {phaseInfo.phase}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {phaseInfo.phase === 1 ? 'Reverse entire array' :
             phaseInfo.phase === 2 ? `Reverse first ${actualK} elements` :
             'Reverse remaining elements'}
          </span>
        </div>
      )}

      {/* Array visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Array:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {array.map((num: number, index: number) => {
            const isStart = start === index;
            const isEnd = end === index;
            const isHighlighted = highlightIndices.includes(index);
            const isSwapping = (index === index1 || index === index2) && action === 'swap';

            return (
              <div
                key={index}
                className={`
                  w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-semibold
                  transition-all duration-300 relative
                  ${isStart ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 scale-110' : ''}
                  ${isEnd ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 scale-110' : ''}
                  ${isSwapping ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 scale-110' : ''}
                  ${isHighlighted && !isStart && !isEnd && !isSwapping ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${!isHighlighted && !isStart && !isEnd && !isSwapping ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {num}
                {/* Position indicator */}
                <div className="absolute -bottom-5 text-xs text-gray-500 dark:text-gray-400">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pointers and info */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        {start !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
            <span>Start: {start}</span>
          </div>
        )}
        {end !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
            <span>End: {end}</span>
          </div>
        )}
        {k !== undefined && actualK !== undefined && (
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            <span className="font-semibold">Rotate by: {actualK} {k !== actualK ? `(k=${k})` : ''}</span>
          </div>
        )}
      </div>

      {/* Swap visualization */}
      {action === 'swap' && value1 !== undefined && value2 !== undefined && (
        <div className="text-center p-4 border-2 border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Swapping:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">{value1}</div>
              <div className="text-xs text-gray-500">Index {index1}</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">↔</div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">{value2}</div>
              <div className="text-xs text-gray-500">Index {index2}</div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {isComplete && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rotation Complete!</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">
            Array rotated {actualK} positions to the right
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>

      {/* Algorithm explanation */}
      <div className="text-center text-xs text-muted-foreground max-w-xl border-t pt-4">
        <p>Reverse algorithm: Reverse entire array, then reverse first k elements, then reverse remaining elements</p>
      </div>
    </div>
  );
}
