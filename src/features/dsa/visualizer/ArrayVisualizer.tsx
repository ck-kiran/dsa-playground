import { motion } from 'framer-motion';

import type { Step } from '../types/step';

interface ArrayVisualizerProps {
  step: Step;
}

export function ArrayVisualizer({ step }: ArrayVisualizerProps) {
  const { array, highlightIndices, pointers } = step;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-4 bg-secondary/20 rounded-lg border min-h-[300px]">
      <div className="flex flex-wrap gap-2 justify-center items-end">
        {array?.map((value, index) => {
          const isHighlighted = highlightIndices?.includes(index);
          const isMid = pointers?.mid === index;
          const isLeft = pointers?.left === index;
          const isRight = pointers?.right === index;

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              {/* Pointers Labels */}
              <div className="h-6 flex items-end text-xs font-mono font-bold">
                {isLeft && <span className="text-blue-500">L</span>}
                {isRight && <span className="text-red-500 ml-1">R</span>}
              </div>

              {/* Bar/Box */}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor: isMid
                    ? 'var(--color-primary)' // Mid gets primary color
                    : isHighlighted
                      ? 'var(--color-accent)'
                      : 'var(--color-card)',
                }}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-md border-2 shadow-sm
                  ${isMid ? 'text-primary-foreground border-primary' : 'bg-card text-card-foreground border-border'}
                  ${isHighlighted && !isMid ? 'bg-accent text-accent-foreground border-accent' : ''}
                `}
              >
                <span className="text-lg font-semibold">{value}</span>

                {/* Mid Pointer Indicator specifically attached to box */}
                {isMid && (
                  <motion.div
                    layoutId="mid-pointer"
                    className="absolute -bottom-8 text-primary font-bold text-sm"
                  >
                    MID
                  </motion.div>
                )}
              </motion.div>

              {/* Index Label */}
              <span className="text-xs text-muted-foreground">{index}</span>
            </div>
          );
        })}
      </div>

      <div className="text-center max-w-lg mt-4 p-4 bg-background rounded-md border shadow-sm">
        <p className="text-lg font-medium text-foreground">{step.message}</p>
      </div>
    </div>
  );
}
