interface BestTimeToBuyAndSellStockVisualizerProps {
  step: any;
}

export function BestTimeToBuyAndSellStockVisualizer({ step }: BestTimeToBuyAndSellStockVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { current, buyDay, sellDay } = pointers;
  const {
    minPrice,
    maxProfit,
    currentPrice,
    potentialProfit,
    result,
    buyPrice,
    sellPrice
  } = data;

  // Calculate bar heights for price chart
  const maxVal = Math.max(...array, 1);
  const barMaxHeight = 180;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Price chart visualization */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Stock Prices by Day:</div>
        <div className="flex gap-1 items-end justify-center" style={{ height: `${barMaxHeight + 40}px` }}>
          {array.map((price: number, index: number) => {
            const isCurrent = current === index;
            const isBuyDay = buyDay === index;
            const isSellDay = sellDay === index;
            const isHighlighted = highlightIndices.includes(index);
            const barHeight = (price / maxVal) * barMaxHeight;

            return (
              <div key={index} className="flex flex-col items-center justify-end relative" style={{ height: `${barMaxHeight}px` }}>
                {/* Price bar */}
                <div
                  className={`
                    w-10 flex items-end justify-center text-xs font-semibold
                    transition-all duration-300 relative border-2
                    ${isCurrent ? 'bg-blue-500 dark:bg-blue-600 border-blue-700 text-white scale-110' : ''}
                    ${isBuyDay && !isCurrent ? 'bg-green-500 dark:bg-green-600 border-green-700 text-white scale-105' : ''}
                    ${isSellDay && !isCurrent ? 'bg-orange-500 dark:bg-orange-600 border-orange-700 text-white scale-105' : ''}
                    ${isHighlighted && !isCurrent && !isBuyDay && !isSellDay ? 'bg-purple-500 dark:bg-purple-600 border-purple-700 text-white' : ''}
                    ${!isHighlighted && !isCurrent && !isBuyDay && !isSellDay ? 'bg-gray-400 dark:bg-gray-600 border-gray-500 text-white' : ''}
                  `}
                  style={{ height: `${barHeight}px`, minHeight: '25px' }}
                >
                  <span className="pb-1">{price}</span>
                </div>

                {/* Day indicator */}
                <div className="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400">
                  D{index}
                </div>

                {/* Labels */}
                {isBuyDay && (
                  <div className="absolute -top-8 text-xs font-bold text-green-600 dark:text-green-400">
                    BUY
                  </div>
                )}
                {isSellDay && (
                  <div className="absolute -top-8 text-xs font-bold text-orange-600 dark:text-orange-400">
                    SELL
                  </div>
                )}
                {isCurrent && !isBuyDay && !isSellDay && (
                  <div className="absolute -top-8 text-xs font-bold text-blue-600 dark:text-blue-400">
                    NOW
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info panel */}
      <div className="flex gap-4 text-sm flex-wrap justify-center">
        {minPrice !== undefined && (
          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded border border-green-300">
            <span className="font-semibold text-green-700 dark:text-green-300">Min Price: {minPrice}</span>
          </div>
        )}
        {maxProfit !== undefined && (
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300">
            <span className="font-semibold text-blue-700 dark:text-blue-300">Max Profit: {maxProfit}</span>
          </div>
        )}
        {buyDay !== undefined && (
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            <span className="font-semibold">Buy Day: {buyDay}</span>
          </div>
        )}
        {sellDay !== undefined && maxProfit > 0 && (
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            <span className="font-semibold">Sell Day: {sellDay}</span>
          </div>
        )}
      </div>

      {/* Action details */}
      {action === 'calculate-profit' && potentialProfit !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Calculating Profit:</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {currentPrice} - {minPrice} = {potentialProfit}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Sell today - Buy at min price
          </div>
        </div>
      )}

      {action === 'update-max-profit' && (
        <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Best Deal Found!</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">
            Profit: {maxProfit}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Buy Day {buyDay} → Sell Day {sellDay}
          </div>
        </div>
      )}

      {action === 'update-min-price' && (
        <div className="text-center p-4 border-2 border-purple-500 rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Minimum Price:</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {minPrice}
          </div>
        </div>
      )}

      {/* Result */}
      {isComplete && result !== undefined && (
        <div className={`text-center p-4 border-2 rounded-lg ${
          result > 0
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : 'border-gray-500 bg-gray-50 dark:bg-gray-800'
        }`}>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Maximum Profit:</div>
          <div className={`text-3xl font-bold ${
            result > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {result > 0 ? `$${result}` : '$0'}
          </div>
          {result > 0 && buyPrice !== undefined && sellPrice !== undefined && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Buy at ${buyPrice} on day {buyDay}, Sell at ${sellPrice} on day {sellDay}
            </div>
          )}
          {result === 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              No profitable transaction possible
            </div>
          )}
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
          <div className="w-3 h-3 bg-blue-500 border border-blue-700"></div>
          <span>Current Day</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 border border-green-700"></div>
          <span>Buy Day</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 border border-orange-700"></div>
          <span>Sell Day</span>
        </div>
      </div>
    </div>
  );
}
