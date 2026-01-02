import type { Step } from '@/shared/types/step';

export const generateFruitIntoBasketsSteps = (fruits: number[]): Step[] => {
  const steps: Step[] = [];
  const basket = new Map<number, number>();
  let left = 0;
  let maxFruits = 0;

  steps.push({
    array: [...fruits],
    pointers: { left, right: 0 },
    message: 'Collect maximum fruits with at most 2 types',
    highlightIndices: [],
    data: { basket: {}, maxFruits }
  });

  for (let right = 0; right < fruits.length; right++) {
    const fruit = fruits[right];
    basket.set(fruit, (basket.get(fruit) || 0) + 1);

    steps.push({
      array: [...fruits],
      pointers: { left, right },
      message: `Pick fruit ${fruit}. Basket has ${basket.size} types`,
      highlightIndices: [right],
      action: 'expand',
      data: { basket: Object.fromEntries(basket), maxFruits, currentFruits: right - left + 1 }
    });

    while (basket.size > 2) {
      const leftFruit = fruits[left];
      basket.set(leftFruit, basket.get(leftFruit)! - 1);
      if (basket.get(leftFruit) === 0) {
        basket.delete(leftFruit);
      }

      steps.push({
        array: [...fruits],
        pointers: { left, right },
        message: `Too many types! Remove fruit ${leftFruit} from left`,
        highlightIndices: [left],
        action: 'shrink',
        data: { basket: Object.fromEntries(basket), maxFruits }
      });

      left++;
    }

    const currentFruits = right - left + 1;
    if (currentFruits > maxFruits) {
      maxFruits = currentFruits;

      steps.push({
        array: [...fruits],
        pointers: { left, right },
        message: `New max: ${maxFruits} fruits`,
        highlightIndices: Array.from({ length: currentFruits }, (_, i) => left + i),
        action: 'update-max',
        data: { basket: Object.fromEntries(basket), maxFruits }
      });
    }
  }

  steps.push({
    array: [...fruits],
    pointers: {},
    message: `Maximum ${maxFruits} fruits collected`,
    highlightIndices: [],
    isComplete: true,
    data: { result: maxFruits }
  });

  return steps;
};
