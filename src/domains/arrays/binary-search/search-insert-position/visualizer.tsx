import type { Step } from '@/shared/types/step';

export function SearchInsertVisualizer({ step }: { step: Step }) {
  const { array = [], pointers = {}, highlightIndices = [], message = '' } = step;

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex gap-2">
        {array.map((value, index) => {
          const isHighlighted = highlightIndices.includes(index);
          const isLeft = pointers.left === index;
          const isRight = pointers.right === index;
          const isMid = pointers.mid === index;
          const isInsertPosition = pointers.insertPosition === index;

          let className = "w-12 h-12 flex items-center justify-center rounded border-2 transition-all duration-300 ";

          if (isInsertPosition) {
            className += "border-purple-500 bg-purple-100 dark:bg-purple-900/30";
          } else if (isMid) {
            className += "border-blue-500 bg-blue-100 dark:bg-blue-900/30";
          } else if (isLeft) {
            className += "border-green-500 bg-green-100 dark:bg-green-900/30";
          } else if (isRight) {
            className += "border-red-500 bg-red-100 dark:bg-red-900/30";
          } else if (isHighlighted) {
            className += "border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
          } else {
            className += "border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600";
          }

          return (
            <div key={index} className={className}>
              <span className="text-sm font-semibold">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg text-gray-700 dark:text-gray-300">{message}</p>
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
          {typeof pointers.left === 'number' && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">
              Left: {pointers.left}
            </span>
          )}
          {typeof pointers.right === 'number' && (
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded">
              Right: {pointers.right}
            </span>
          )}
          {typeof pointers.mid === 'number' && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded">
              Mid: {pointers.mid}
            </span>
          )}
          {typeof pointers.insertPosition === 'number' && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded">
              Insert at: {pointers.insertPosition}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}