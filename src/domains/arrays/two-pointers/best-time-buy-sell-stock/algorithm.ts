import type { Step } from '@/shared/types/step';

export const generateBestTimeToBuyAndSellStockSteps = (prices: number[]): Step[] => {
  const steps: Step[] = [];
  const n = prices.length;

  let minPrice = prices[0];
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;

  // Initial step
  steps.push({
    array: [...prices],
    pointers: { current: 0, buyDay, sellDay },
    message: `Find maximum profit by buying and selling stock once. Start with day 0.`,
    highlightIndices: [0],
    data: {
      minPrice,
      maxProfit,
      buyDay,
      sellDay,
      currentPrice: prices[0]
    }
  });

  // Process each day
  for (let i = 1; i < n; i++) {
    const currentPrice = prices[i];
    const potentialProfit = currentPrice - minPrice;

    steps.push({
      array: [...prices],
      pointers: { current: i, buyDay, sellDay },
      message: `Day ${i}: Price = ${currentPrice}. Min price so far = ${minPrice}`,
      highlightIndices: [i, buyDay],
      action: 'check-price',
      data: {
        minPrice,
        maxProfit,
        buyDay,
        sellDay,
        currentPrice,
        currentDay: i
      }
    });

    // Calculate potential profit if we sell today
    if (potentialProfit > 0) {
      steps.push({
        array: [...prices],
        pointers: { current: i, buyDay },
        message: `Potential profit if bought on day ${buyDay} (${minPrice}) and sold on day ${i} (${currentPrice}): ${potentialProfit}`,
        highlightIndices: [i, buyDay],
        action: 'calculate-profit',
        data: {
          minPrice,
          maxProfit,
          buyDay,
          sellDay,
          currentPrice,
          potentialProfit,
          currentDay: i
        }
      });

      // Update max profit if we found a better deal
      if (potentialProfit > maxProfit) {
        maxProfit = potentialProfit;
        sellDay = i;

        steps.push({
          array: [...prices],
          pointers: { current: i, buyDay, sellDay },
          message: `New maximum profit found! Buy day ${buyDay} (${minPrice}), Sell day ${sellDay} (${currentPrice}), Profit: ${maxProfit}`,
          highlightIndices: [buyDay, sellDay],
          action: 'update-max-profit',
          data: {
            minPrice,
            maxProfit,
            buyDay,
            sellDay,
            currentPrice,
            potentialProfit,
            currentDay: i
          }
        });
      }
    }

    // Update minimum price if current price is lower
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      buyDay = i;

      steps.push({
        array: [...prices],
        pointers: { current: i, buyDay, sellDay },
        message: `New minimum price found on day ${i}: ${minPrice}. Update potential buy day.`,
        highlightIndices: [i],
        action: 'update-min-price',
        data: {
          minPrice,
          maxProfit,
          buyDay,
          sellDay,
          currentPrice,
          currentDay: i
        }
      });
    }
  }

  // Final step
  steps.push({
    array: [...prices],
    pointers: { buyDay, sellDay },
    message: maxProfit > 0
      ? `Maximum profit: ${maxProfit} (Buy on day ${buyDay} at ${prices[buyDay]}, Sell on day ${sellDay} at ${prices[sellDay]})`
      : `No profit possible. Best to not trade.`,
    highlightIndices: maxProfit > 0 ? [buyDay, sellDay] : [],
    isComplete: true,
    data: {
      result: maxProfit,
      buyDay,
      sellDay,
      buyPrice: prices[buyDay],
      sellPrice: maxProfit > 0 ? prices[sellDay] : undefined,
      minPrice,
      maxProfit
    }
  });

  return steps;
};
