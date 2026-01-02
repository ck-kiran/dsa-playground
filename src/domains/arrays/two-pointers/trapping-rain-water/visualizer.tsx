interface TrappingRainWaterVisualizerProps {
  step: any;
}

export function TrappingRainWaterVisualizer({ step }: TrappingRainWaterVisualizerProps) {
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
    leftMax = 0,
    rightMax = 0,
    totalWater = 0,
    waterLevels = [],
    waterTrapped,
    position,
    height,
    leftHeight,
    rightHeight
  } = data;

  // Calculate max height for scaling
  const maxHeight = Math.max(...array, 1);
  const barMaxHeight = 200;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Elevation map with water visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Elevation Map:</div>
        <div className="flex gap-1 items-end justify-center" style={{ height: `${barMaxHeight + 40}px` }}>
          {array.map((h: number, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isHighlighted = highlightIndices.includes(index);
            const waterLevel = waterLevels[index] || 0;
            const barHeight = (h / maxHeight) * barMaxHeight;
            const waterHeight = (waterLevel / maxHeight) * barMaxHeight;

            return (
              <div key={index} className="flex flex-col items-center justify-end relative" style={{ height: `${barMaxHeight}px` }}>
                {/* Water visualization */}
                {waterLevel > 0 && (
                  <div
                    className="w-8 bg-blue-400/60 dark:bg-blue-500/40 border-x border-blue-500 dark:border-blue-400 transition-all duration-300"
                    style={{ height: `${waterHeight}px` }}
                  />
                )}

                {/* Elevation bar */}
                <div
                  className={`
                    w-8 flex items-end justify-center text-xs font-semibold
                    transition-all duration-300 relative border-2
                    ${isLeft ? 'bg-blue-500 dark:bg-blue-600 border-blue-700 text-white' : ''}
                    ${isRight ? 'bg-orange-500 dark:bg-orange-600 border-orange-700 text-white' : ''}
                    ${isHighlighted && !isLeft && !isRight && action === 'trap-water' ? 'bg-green-500 dark:bg-green-600 border-green-700 text-white' : ''}
                    ${isHighlighted && !isLeft && !isRight && (action === 'update-left-max' || action === 'update-right-max') ? 'bg-purple-500 dark:bg-purple-600 border-purple-700 text-white' : ''}
                    ${!isHighlighted && !isLeft && !isRight ? 'bg-gray-600 dark:bg-gray-700 border-gray-700 dark:border-gray-600 text-white' : ''}
                  `}
                  style={{ height: `${barHeight}px`, minHeight: '20px' }}
                >
                  <span className="pb-1">{h}</span>
                </div>

                {/* Position indicator */}
                <div className="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400">
                  {index}
                </div>

                {/* Pointer indicators */}
                {isLeft && (
                  <div className="absolute -top-6 text-xs font-bold text-blue-600 dark:text-blue-400">
                    L
                  </div>
                )}
                {isRight && (
                  <div className="absolute -top-6 text-xs font-bold text-orange-600 dark:text-orange-400">
                    R
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pointers and max values info */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 border-2 border-blue-700"></div>
          <span>Left: {left !== undefined ? left : 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 border-2 border-orange-700"></div>
          <span>Right: {right !== undefined ? right : 'N/A'}</span>
        </div>
        <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          <span className="font-semibold">Left Max: {leftMax}</span>
        </div>
        <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          <span className="font-semibold">Right Max: {rightMax}</span>
        </div>
        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300 dark:border-blue-700">
          <span className="font-semibold text-blue-700 dark:text-blue-300">Total Water: {totalWater}</span>
        </div>
      </div>

      {/* Current action details */}
      {action === 'compare' && leftHeight !== undefined && rightHeight !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comparing Heights:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{leftHeight}</div>
              <div className="text-xs text-gray-500">Left[{left}]</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">
              {leftHeight < rightHeight ? '<' : leftHeight > rightHeight ? '>' : '='}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{rightHeight}</div>
              <div className="text-xs text-gray-500">Right[{right}]</div>
            </div>
          </div>
        </div>
      )}

      {/* Water trapped indicator */}
      {action === 'trap-water' && waterTrapped !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Water Trapped:</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                +{waterTrapped}
              </div>
              <div className="text-xs text-gray-500">units at position {position}</div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Max({left !== undefined && position === left ? leftMax : rightMax}) - Height({height}) = {waterTrapped}
            </div>
          </div>
        </div>
      )}

      {/* Max update indicator */}
      {(action === 'update-left-max' || action === 'update-right-max') && (
        <div className="text-center p-4 border-2 border-purple-500 rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {action === 'update-left-max' ? 'Left Max Updated' : 'Right Max Updated'}:
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {action === 'update-left-max' ? leftMax : rightMax}
          </div>
          <div className="text-xs text-gray-500">at position {position}</div>
        </div>
      )}

      {/* Result */}
      {isComplete && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Water Trapped:</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {totalWater} units
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs flex-wrap justify-center mt-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-600 border border-gray-700"></div>
          <span>Elevation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-400/60 border border-blue-500"></div>
          <span>Water</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 border border-green-700"></div>
          <span>Trapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500 border border-purple-700"></div>
          <span>Updating Max</span>
        </div>
      </div>
    </div>
  );
}
