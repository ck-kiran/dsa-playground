import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { FruitIntoBasketsVisualizer } from './visualizer';
import { generateFruitIntoBasketsSteps } from './algorithm';

export const fruitIntoBasketsProblem: Problem = {
  id: 'fruit-into-baskets',
  title: 'Fruit Into Baskets',
  difficulty: 'Medium',
  description: 'You are visiting a farm with a row of fruit trees. You want to collect as much fruit as possible. You have two baskets that can hold any amount of fruit, but each basket can only hold one type of fruit.',
};

export const fruitIntoBasketsModule: ProblemModule = {
  config: {
    id: 'fruit-into-baskets',
    title: 'Fruit Into Baskets',
    difficulty: 'Medium',
    description: 'You are visiting a farm that has a single row of fruit trees. You want to collect as much fruit as possible using two baskets, where each basket can only hold one type of fruit. Starting from any tree, you must pick exactly one fruit from every tree while moving to the right. Once you reach a tree with fruit that cannot fit in your baskets, you must stop.',
    constraints: [
      '1 ≤ fruits.length ≤ 10^5',
      '0 ≤ fruits[i] < fruits.length',
    ],
    defaultCode: `function totalFruit(fruits) {
  const basket = new Map();
  let left = 0;
  let maxFruits = 0;

  for (let right = 0; right < fruits.length; right++) {
    basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);

    while (basket.size > 2) {
      basket.set(fruits[left], basket.get(fruits[left]) - 1);
      if (basket.get(fruits[left]) === 0) {
        basket.delete(fruits[left]);
      }
      left++;
    }

    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}`,
    defaultInputs: {
      array: [1, 2, 1, 2, 3],
    },
    approaches: [
      {
        id: 'sliding-window',
        title: 'Sliding Window (Optimal)',
        description: 'Use hashmap to track at most 2 fruit types',
        code: `function totalFruit(fruits) {
  const basket = new Map();
  let left = 0;
  let maxFruits = 0;

  for (let right = 0; right < fruits.length; right++) {
    basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);

    while (basket.size > 2) {
      basket.set(fruits[left], basket.get(fruits[left]) - 1);
      if (basket.get(fruits[left]) === 0) {
        basket.delete(fruits[left]);
      }
      left++;
    }

    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateFruitIntoBasketsSteps(array);
  },
  Visualizer: FruitIntoBasketsVisualizer,
};

export { FruitIntoBasketsVisualizer } from './visualizer';
export { generateFruitIntoBasketsSteps } from './algorithm';
