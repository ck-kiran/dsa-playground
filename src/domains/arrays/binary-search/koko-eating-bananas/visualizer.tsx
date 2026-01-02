interface KokoEatingBananasVisualizerProps {
  step: any;
}

export function KokoEatingBananasVisualizer({ step }: KokoEatingBananasVisualizerProps) {
  const {
    array = [],
    pointers = {},
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right, mid } = pointers;
  const {
    piles,
    h,
    speed,
    timeNeeded,
    timeBreakdown,
    canFinish,
    result,
    finalTime,
    finalBreakdown,
    totalBananas,
    searchRange
  } = data;

  const breakdown = timeBreakdown || finalBreakdown || [];

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Problem info */}
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="text-center p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Bananas:</div>
          <div className="text-2xl font-bold text-yellow-600">
            {totalBananas || array.reduce((a: number, b: number) => a + b, 0)}
          </div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Time Limit:</div>
          <div className="text-2xl font-bold text-blue-600">{h} hours</div>
        </div>
        {speed !== undefined && (
          <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Speed:</div>
            <div className="text-2xl font-bold text-purple-600">{speed}/hour</div>
          </div>
        )}
      </div>

      {/* Banana piles visualization */}
      <div className="w-full max-w-4xl">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
          Banana Piles:
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          {array.map((pile: number, index: number) => {
            const maxHeight = Math.max(...array);
            const heightPercent = (pile / maxHeight) * 100;

            return (
              <div key={index} className="text-center">
                {/* Pile visualization */}
                <div
                  className="w-12 bg-yellow-400 border-2 border-yellow-500 rounded-t mx-auto mb-1 flex items-end justify-center"
                  style={{
                    height: `${Math.max(heightPercent * 0.8, 20)}px`,
                    minHeight: '20px'
                  }}
                >
                  <span className="text-xs font-bold text-yellow-900 mb-1">
                    {pile}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Pile {index + 1}</div>
                {/* Time calculation for this pile */}
                {breakdown[index] && (
                  <div className="text-xs text-purple-600 mt-1">
                    {breakdown[index].time}h
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Time calculation breakdown */}
      {breakdown.length > 0 && (
        <div className="w-full max-w-4xl p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            Time Calculation (Speed: {speed || result} bananas/hour):
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {breakdown.map((item: any, index: number) => (
              <div key={index} className="text-center p-2 border rounded bg-white dark:bg-gray-700">
                <div className="text-sm font-medium">Pile {index + 1}</div>
                <div className="text-xs text-gray-500">{item.calculation}</div>
                <div className="text-sm font-bold text-purple-600">{item.time} hours</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3 p-2 border-t">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Time:</div>
            <div className={`text-lg font-bold ${
              timeNeeded !== undefined
                ? (timeNeeded <= h ? 'text-green-600' : 'text-red-600')
                : finalTime <= h ? 'text-green-600' : 'text-red-600'
            }`}>
              {timeNeeded || finalTime} hours
            </div>
          </div>
        </div>
      )}

      {/* Search range */}
      {searchRange && (
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Speed Search Range:</div>
          <div className="text-lg font-bold text-blue-600">
            [{searchRange[0]}, {searchRange[1]}]
          </div>
        </div>
      )}

      {/* Pointers info */}
      {(left !== undefined || right !== undefined || mid !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {left !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Min Speed: {left}</span>
            </div>
          )}
          {mid !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>Try Speed: {mid}</span>
            </div>
          )}
          {right !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Max Speed: {right}</span>
            </div>
          )}
        </div>
      )}

      {/* Decision display */}
      {timeNeeded !== undefined && (
        <div className={`text-center p-3 border rounded-lg ${
          canFinish ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className={`text-lg font-bold ${canFinish ? 'text-green-600' : 'text-red-600'}`}>
            {canFinish ? '✓ Can Finish in Time' : '✗ Too Slow'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {timeNeeded} hours {canFinish ? '≤' : '>'} {h} hours
          </div>
        </div>
      )}

      {/* Final result */}
      {result !== undefined && isComplete && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Minimum Eating Speed:</div>
          <div className="text-3xl font-bold text-green-600">
            {result} bananas/hour
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Takes {finalTime} hours (≤ {h} hours)
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