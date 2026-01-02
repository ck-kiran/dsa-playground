interface MaximumPointsFromCardsVisualizerProps {
  step: any;
}

export function MaximumPointsFromCardsVisualizer({ step }: MaximumPointsFromCardsVisualizerProps) {
  const { array = [], highlightIndices = [], message = '', isComplete = false, data = {} } = step;
  const { k, totalPoints, maxPoints, result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Cards:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {array.map((card: number, index: number) => (
            <div
              key={index}
              className={`w-12 h-16 flex items-center justify-center rounded border-2 text-sm font-semibold transition-all ${
                highlightIndices.includes(index) ? 'border-green-500 bg-green-100 dark:bg-green-900/30 scale-110' :
                'border-gray-300 bg-white dark:bg-gray-800'
              }`}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {k !== undefined && <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded"><span className="font-semibold">Cards to pick: {k}</span></div>}
        {totalPoints !== undefined && <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded"><span className="font-semibold">Current: {totalPoints}</span></div>}
        {maxPoints !== undefined && <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded"><span className="font-semibold">Max: {maxPoints}</span></div>}
      </div>
      {isComplete && result !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">Maximum Points: {result}</div>
        </div>
      )}
      <div className="text-center max-w-2xl"><p className="text-lg text-gray-700 dark:text-gray-300">{message}</p></div>
    </div>
  );
}
