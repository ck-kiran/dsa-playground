interface FruitIntoBasketsVisualizerProps {
  step: any;
}

export function FruitIntoBasketsVisualizer({ step }: FruitIntoBasketsVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    data = {}
  } = step;

  const { left, right } = pointers;
  const { basket = {}, maxFruits, result } = data;

  const fruitColors = ['🍎', '🍊', '🍇', '🍌', '🍓', '🥝', '🍑', '🍉'];

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Array visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fruit Trees:</div>
        <div className="flex gap-1 justify-center flex-wrap">
          {array.map((fruit: number, index: number) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isInWindow = highlightIndices.includes(index);

            return (
              <div
                key={index}
                className={`
                  w-14 h-14 flex items-center justify-center rounded border-2 text-2xl
                  transition-all duration-300 relative
                  ${isLeft ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 scale-110' : ''}
                  ${isRight ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 scale-110' : ''}
                  ${isInWindow && !isLeft && !isRight ? 'border-green-500 bg-green-100 dark:bg-green-900/30' : ''}
                  ${!isInWindow && !isLeft && !isRight ? 'border-gray-300 bg-gray-50 dark:bg-gray-800' : ''}
                `}
              >
                {fruitColors[fruit % fruitColors.length]}
                <div className="absolute -bottom-5 text-xs text-gray-500">
                  {fruit}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Basket status */}
      {Object.keys(basket).length > 0 && (
        <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Baskets ({Object.keys(basket).length}/2):</div>
          <div className="flex gap-4">
            {Object.entries(basket).map(([fruit, count]) => (
              <div key={fruit} className="text-center">
                <div className="text-3xl">{fruitColors[Number(fruit) % fruitColors.length]}</div>
                <div className="text-sm font-semibold">Type {fruit}: {count as number}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-4 text-sm flex-wrap justify-center">
        {maxFruits !== undefined && (
          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded border border-green-300">
            <span className="font-semibold text-green-700 dark:text-green-300">Max Fruits: {maxFruits}</span>
          </div>
        )}
      </div>

      {/* Result */}
      {isComplete && result !== undefined && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Maximum Fruits Collected:</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {result}
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-2xl">
        <p className={`text-lg ${isComplete ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
