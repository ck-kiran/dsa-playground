interface ContainerWithMostWaterVisualizerProps {
  step: any;
}

export function ContainerWithMostWaterVisualizer({ step }: ContainerWithMostWaterVisualizerProps) {
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
  const {
    width,
    leftHeight,
    rightHeight,
    minHeight,
    currentArea,
    maxWater,
    isNewMax
  } = data;

  const maxHeight = Math.max(...array, 1);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Container visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Heights Array:</div>
        <div className="flex items-end gap-1 justify-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          {array.map((height: number, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isHighlighted = highlightIndices.includes(index);
            const heightPercent = (height / maxHeight) * 100;

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Bar */}
                <div
                  className={`
                    w-8 border-2 transition-all duration-300 relative
                    ${isLeft ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30' : ''}
                    ${isRight ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30' : ''}
                    ${isHighlighted && !isLeft && !isRight ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30' : ''}
                    ${!isHighlighted && !isLeft && !isRight ? 'border-gray-300 bg-gray-100 dark:bg-gray-700' : ''}
                    ${isNewMax && (isLeft || isRight) ? 'border-green-500 bg-green-100 dark:bg-green-900/30' : ''}
                  `}
                  style={{
                    height: `${Math.max(heightPercent * 1.5, 20)}px`,
                    minHeight: '20px'
                  }}
                >
                  {/* Water area visualization */}
                  {action === 'calculate' && isLeft && (
                    <div
                      className="absolute top-0 left-0 bg-blue-300/50 border border-blue-400"
                      style={{
                        height: `${(minHeight! / maxHeight) * 100 * 1.5}px`,
                        width: `${32 + (width! - 1) * 36}px`,
                        minHeight: '20px'
                      }}
                    />
                  )}
                </div>

                {/* Height label */}
                <div className="text-xs mt-1 font-medium">{height}</div>

                {/* Index */}
                <div className="text-xs text-gray-500">{index}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pointers info */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
          <span>Left: index {left} (height: {leftHeight || array[left] || 0})</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
          <span>Right: index {right} (height: {rightHeight || array[right] || 0})</span>
        </div>
      </div>

      {/* Calculation details */}
      {width !== undefined && (
        <div className="grid grid-cols-2 gap-4 text-center max-w-md w-full">
          <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-lg font-bold text-blue-600">{width}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Width</div>
          </div>
          <div className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-lg font-bold text-purple-600">{minHeight}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Min Height</div>
          </div>
        </div>
      )}

      {/* Area calculation */}
      {currentArea !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Area:</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {width} × {minHeight} = {currentArea}
          </div>
          {isNewMax && (
            <div className="text-sm text-green-600 mt-1 font-medium">🎉 New Maximum!</div>
          )}
        </div>
      )}

      {/* Max water tracker */}
      <div className="text-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
        <div className="text-sm text-gray-600 dark:text-gray-400">Maximum Water Area:</div>
        <div className="text-xl font-bold text-green-600">{maxWater || 0}</div>
      </div>

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}