interface CountNiceSubarraysVisualizerProps {
  step: any;
}

export function CountNiceSubarraysVisualizer({ step }: CountNiceSubarraysVisualizerProps) {
  const { array = [], message = '', isComplete = false, data = {} } = step;
  const { k, result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Array:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {array.map((num: number, index: number) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded border-2 text-sm font-semibold ${
                num % 2 === 1 ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30' : 'border-gray-300 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      {k !== undefined && <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded"><span className="font-semibold">K = {k} odd numbers</span></div>}
      {isComplete && result !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">Count: {result}</div>
        </div>
      )}
      <div className="text-center max-w-2xl"><p className="text-lg text-gray-700 dark:text-gray-300">{message}</p></div>
    </div>
  );
}
