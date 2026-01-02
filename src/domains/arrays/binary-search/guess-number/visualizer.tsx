interface GuessNumberVisualizerProps {
  step: any;
}

export function GuessNumberVisualizer({ step }: GuessNumberVisualizerProps) {
  const {
    array = [],
    pointers = {},
    highlightIndices = [],
    message = '',
    isComplete = false,
    action = '',
    data = {}
  } = step;

  const { left, right, mid } = pointers;
  const {
    n,
    pick,
    guessCount,
    currentGuess,
    guessResult,
    direction,
    result
  } = data;

  const getGuessResultText = (result: number) => {
    if (result === 0) return "Correct! 🎯";
    if (result === -1) return "Too High 📉";
    if (result === 1) return "Too Low 📈";
    return "";
  };

  const getGuessResultColor = (result: number) => {
    if (result === 0) return "text-green-600";
    if (result === -1) return "text-red-600";
    if (result === 1) return "text-blue-600";
    return "";
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Game info */}
      <div className="flex gap-4">
        <div className="text-center p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Secret Number:</div>
          <div className="text-2xl font-bold text-purple-600">{pick}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Range:</div>
          <div className="text-2xl font-bold text-blue-600">1 - {n}</div>
        </div>
        <div className="text-center p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Guesses:</div>
          <div className="text-2xl font-bold text-orange-600">{guessCount}</div>
        </div>
      </div>

      {/* Number line visualization */}
      <div className="w-full max-w-5xl">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
          Number Range (1 to {n}):
        </div>
        <div className="flex gap-1 flex-wrap justify-center">
          {array.map((value: number, index: number) => {
            const isLeft = left === index;
            const isMid = mid === index;
            const isRight = right === index;
            const isHighlighted = highlightIndices.includes(index);
            const isSecret = value === pick;
            const isCurrentGuess = currentGuess && value === currentGuess;

            return (
              <div
                key={index}
                className={`
                  w-8 h-8 flex items-center justify-center rounded border-2 text-xs font-semibold
                  transition-all duration-300 relative
                  ${isMid ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
                  ${isLeft && !isMid ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
                  ${isRight && !isMid ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' : ''}
                  ${isCurrentGuess && guessResult === 0 ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 ring-2 ring-green-400' : ''}
                  ${isHighlighted && !isMid && !isLeft && !isRight && !isCurrentGuess ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : ''}
                  ${!isHighlighted && !isMid && !isLeft && !isRight && !isCurrentGuess ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {value}
                {/* Secret number indicator */}
                {isSecret && (
                  <div className="absolute -top-2 -right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs">🎯</div>
                  </div>
                )}
                {/* Current guess indicator */}
                {isCurrentGuess && action === 'make-guess' && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="text-xs font-bold text-purple-600">👆</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current guess display */}
      {currentGuess !== undefined && guessResult !== undefined && (
        <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Guess #{guessCount}: {currentGuess}
          </div>
          <div className={`text-xl font-bold ${getGuessResultColor(guessResult)}`}>
            {getGuessResultText(guessResult)}
          </div>
          {direction && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Secret number is {direction}
            </div>
          )}
        </div>
      )}

      {/* Pointers info */}
      {(left !== undefined || right !== undefined || mid !== undefined) && (
        <div className="flex gap-4 text-sm flex-wrap justify-center">
          {left !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-500 bg-blue-100"></div>
              <span>Left: {left + 1}</span>
            </div>
          )}
          {mid !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
              <span>Mid: {mid + 1} (guess)</span>
            </div>
          )}
          {right !== undefined && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-orange-500 bg-orange-100"></div>
              <span>Right: {right + 1}</span>
            </div>
          )}
        </div>
      )}

      {/* Strategy explanation */}
      {action && !isComplete && (
        <div className="text-center p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            Strategy: Binary Search
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
            Always guess the middle of the current range to minimize guesses
          </div>
        </div>
      )}

      {/* Final result */}
      {result !== undefined && isComplete && (
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Game Complete!</div>
          <div className="text-3xl font-bold text-green-600">
            Found {result}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Total guesses: {guessCount}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Binary search optimal: ≤ {Math.ceil(Math.log2(n))} guesses
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Secret Number</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-purple-500 bg-purple-100"></div>
          <span>Current Guess</span>
        </div>
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