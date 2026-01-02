interface LongestSubstringKUniquesVisualizerProps {
  step: any;
}

export function LongestSubstringKUniquesVisualizer({ step }: LongestSubstringKUniquesVisualizerProps) {
  const { text = '', pointers = {}, highlightIndices = [], message = '', isComplete = false, data = {} } = step;
  const { left, right } = pointers;
  const { k, maxLength, result } = data;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">String:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {text.split('').map((char: string, index: number) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded border-2 text-sm font-semibold transition-all ${
                left === index ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30' :
                right === index ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30' :
                highlightIndices.includes(index) ? 'border-green-500 bg-green-100 dark:bg-green-900/30' :
                'border-gray-300 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>
      {k !== undefined && <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded"><span className="font-semibold">K = {k}</span></div>}
      {maxLength !== undefined && <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded"><span className="font-semibold">Max Length: {maxLength}</span></div>}
      {isComplete && result !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">Result: {result}</div>
        </div>
      )}
      <div className="text-center max-w-2xl"><p className="text-lg text-gray-700 dark:text-gray-300">{message}</p></div>
    </div>
  );
}
