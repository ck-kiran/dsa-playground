import type { Step } from '../../../shared/types/step';

interface StringSearchVisualizerProps {
  step: Step;
}

export function StringSearchVisualizer({ step }: StringSearchVisualizerProps) {
  const { text = '', pattern = '', textIndex = -1, patternIndex = -1, matches = [] } = step;

  if (!text || !pattern) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-lg text-muted-foreground">
          No text or pattern provided
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Text Display */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground">Text:</div>
        <div className="flex space-x-1 text-lg font-mono">
          {text.split('').map((char, index) => {
            let bgColor = 'bg-white border-gray-300';

            // Highlight current position being checked
            if (index === textIndex) {
              bgColor = 'bg-blue-200 border-blue-400';
            }
            // Highlight matched positions
            else if (matches.some(matchStart => index >= matchStart && index < matchStart + pattern.length)) {
              bgColor = 'bg-green-200 border-green-400';
            }

            return (
              <div
                key={index}
                className={`${bgColor} border-2 rounded w-10 h-12 flex items-center justify-center font-bold transition-colors duration-300`}
              >
                {char}
              </div>
            );
          })}
        </div>
        <div className="flex space-x-1 text-sm font-mono text-muted-foreground">
          {text.split('').map((_, index) => (
            <div key={index} className="w-10 text-center">
              {index}
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Display */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground">Pattern:</div>
        <div className="flex space-x-1 text-lg font-mono">
          {pattern.split('').map((char, index) => {
            let bgColor = 'bg-white border-gray-300';

            // Highlight current pattern position being checked
            if (index === patternIndex) {
              bgColor = 'bg-yellow-200 border-yellow-400';
            }

            return (
              <div
                key={index}
                className={`${bgColor} border-2 rounded w-10 h-12 flex items-center justify-center font-bold transition-colors duration-300`}
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Position Indicator */}
      {textIndex >= 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">
            Pattern alignment at position {Math.max(0, textIndex - patternIndex)}:
          </div>
          <div className="flex space-x-1">
            {/* Show empty spaces before pattern alignment */}
            {Array.from({ length: Math.max(0, textIndex - patternIndex) }, (_, i) => (
              <div key={`space-${i}`} className="w-10 h-8"></div>
            ))}
            {/* Show pattern characters */}
            {pattern.split('').map((char, index) => {
              const textPos = Math.max(0, textIndex - patternIndex) + index;
              let bgColor = 'bg-gray-100 border-gray-300';

              if (index === patternIndex) {
                bgColor = 'bg-yellow-200 border-yellow-400';
              } else if (index < patternIndex) {
                if (textPos < text.length && text[textPos] === char) {
                  bgColor = 'bg-green-100 border-green-300';
                } else {
                  bgColor = 'bg-red-100 border-red-300';
                }
              }

              return (
                <div
                  key={index}
                  className={`${bgColor} border-2 rounded w-10 h-8 flex items-center justify-center text-sm font-mono transition-colors duration-300`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Matches Found */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Matches found at positions:
          </div>
          <div className="flex space-x-2">
            {matches.map((position, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-green-100 border border-green-300 rounded text-sm font-mono"
              >
                {position}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
          <span>Current text position</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
          <span>Current pattern position</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
          <span>Match found</span>
        </div>
      </div>
    </div>
  );
}