import { motion } from 'framer-motion';

import type { Step } from '../types/step';

interface TwoSumVisualizerProps {
  step: Step;
}

export function TwoSumVisualizer({ step }: TwoSumVisualizerProps) {
  const { array, highlightIndices, pointers, hashMap } = step;

  return (
    <div className="flex flex-col gap-8 p-4 bg-secondary/20 rounded-lg border min-h-[400px]">
      {/* Array Visualization */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
          Array
        </h3>
        <div className="flex flex-wrap gap-2 justify-center items-end">
          {array?.map((value, index) => {
            const isHighlighted = highlightIndices?.includes(index);
            const isCurr = pointers?.curr === index;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Pointer Label */}
                <div className="h-6 flex items-end text-xs font-mono font-bold">
                  {isCurr && <span className="text-blue-500">i</span>}
                </div>

                <motion.div
                  layout
                  initial={false}
                  animate={{
                    scale: isCurr ? 1.1 : 1,
                    backgroundColor: isHighlighted ? 'var(--color-primary)' : 'var(--color-card)',
                    color: isHighlighted
                      ? 'var(--color-primary-foreground)'
                      : 'var(--color-card-foreground)',
                  }}
                  className={`
                    relative flex items-center justify-center w-12 h-12 rounded-md border-2 shadow-sm
                    ${isHighlighted ? 'border-primary' : 'border-border'}
                    `}
                >
                  <span className="text-lg font-semibold">{value}</span>
                </motion.div>

                <span className="text-xs text-muted-foreground">{index}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border/50 w-full" />

      {/* Hash Map Visualization */}
      <div className="flex flex-col items-center gap-4 w-full">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
          Hash Map (Value → Index)
        </h3>
        <div className="flex flex-wrap gap-4 justify-center min-h-[100px] w-full p-4 bg-background/50 rounded-lg border border-dashed">
          {hashMap && Object.entries(hashMap).length > 0 ? (
            Object.entries(hashMap).map(([key, val]) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                key={key}
                className="flex flex-col items-center p-2 bg-card border rounded shadow-sm min-w-[60px]"
              >
                <span className="text-sm font-medium text-muted-foreground">Key: {key}</span>
                <div className="w-full h-[1px] bg-border my-1" />
                <span className="text-sm font-bold">Idx: {val}</span>
              </motion.div>
            ))
          ) : (
            <div className="flex items-center justify-center text-muted-foreground text-sm italic">
              Map is empty
            </div>
          )}
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto mt-4 p-4 bg-background rounded-md border shadow-sm">
        <p className="text-lg font-medium text-foreground">{step.message}</p>
      </div>
    </div>
  );
}
