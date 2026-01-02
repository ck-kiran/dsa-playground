import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { BestTimeToBuyAndSellStockVisualizer } from './visualizer';
import { generateBestTimeToBuyAndSellStockSteps } from './algorithm';

export const bestTimeToBuyAndSellStockProblem: Problem = {
  id: 'best-time-to-buy-and-sell-stock',
  title: 'Best Time to Buy and Sell Stock',
  difficulty: 'Easy',
  description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
};

export const bestTimeToBuyAndSellStockModule: ProblemModule = {
  config: {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    constraints: [
      '1 ≤ prices.length ≤ 10^5',
      '0 ≤ prices[i] ≤ 10^4',
    ],
    defaultCode: `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // Update max profit if selling today gives better profit
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);

    // Update min price if today's price is lower
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}`,
    defaultInputs: {
      array: [7, 1, 5, 3, 6, 4],
    },
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force (Nested Loops)',
        description: 'Try all possible buy and sell combinations',
        code: `function maxProfit(prices) {
  let maxProfit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: 'one-pass',
        title: 'One Pass (Optimal)',
        description: 'Track minimum price and maximum profit in single pass',
        code: `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  generateSteps: (inputs) => {
    const { array } = inputs as { array: number[] };
    return generateBestTimeToBuyAndSellStockSteps(array);
  },
  Visualizer: BestTimeToBuyAndSellStockVisualizer,
};

export { BestTimeToBuyAndSellStockVisualizer } from './visualizer';
export { generateBestTimeToBuyAndSellStockSteps } from './algorithm';
