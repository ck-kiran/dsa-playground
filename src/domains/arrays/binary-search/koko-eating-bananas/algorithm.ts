import type { Step } from '@/shared/types/step';

function calculateTime(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}

export const generateKokoEatingBananasSteps = (piles: number[], h: number): Step[] => {
  const steps: Step[] = [];
  let left = 1;
  let right = Math.max(...piles);

  // Initial step
  steps.push({
    array: piles,
    message: `Find minimum eating speed to finish ${piles.reduce((a, b) => a + b)} bananas in ${h} hours`,
    data: {
      piles,
      h,
      totalBananas: piles.reduce((a, b) => a + b),
      searchRange: [left, right]
    }
  });

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const timeNeeded = calculateTime(piles, mid);

    // Show calculation details
    const timeBreakdown = piles.map(pile => ({
      pile,
      time: Math.ceil(pile / mid),
      calculation: `⌈${pile}/${mid}⌉ = ${Math.ceil(pile / mid)}`
    }));

    steps.push({
      array: piles,
      pointers: { left, right, mid },
      message: `Try eating speed ${mid} bananas/hour. Calculate total time needed.`,
      action: 'calculate-time',
      data: {
        piles,
        h,
        speed: mid,
        timeNeeded,
        timeBreakdown,
        searchRange: [left, right]
      }
    });

    steps.push({
      array: piles,
      pointers: { left, right, mid },
      message: `Speed ${mid}: Need ${timeNeeded} hours ${timeNeeded <= h ? '≤' : '>'} ${h} hours available`,
      action: 'compare-time',
      data: {
        piles,
        h,
        speed: mid,
        timeNeeded,
        timeBreakdown,
        canFinish: timeNeeded <= h,
        searchRange: [left, right]
      }
    });

    if (timeNeeded <= h) {
      // Can eat slower or this is optimal
      steps.push({
        array: piles,
        pointers: { left, right, mid },
        message: `✓ Can finish in time! Try slower speed (search left half).`,
        action: 'search-slower',
        data: {
          piles,
          h,
          speed: mid,
          timeNeeded,
          direction: 'slower',
          decision: 'can finish'
        }
      });
      right = mid;
    } else {
      // Need to eat faster
      steps.push({
        array: piles,
        pointers: { left, right, mid },
        message: `✗ Too slow! Need to eat faster (search right half).`,
        action: 'search-faster',
        data: {
          piles,
          h,
          speed: mid,
          timeNeeded,
          direction: 'faster',
          decision: 'too slow'
        }
      });
      left = mid + 1;
    }

    // Show updated range
    if (left < right) {
      steps.push({
        array: piles,
        pointers: { left, right },
        message: `Updated speed range: [${left}, ${right}]`,
        data: {
          piles,
          h,
          searchRange: [left, right],
          isRangeUpdate: true
        }
      });
    }
  }

  // Final result
  const result = left;
  const finalTime = calculateTime(piles, result);
  const finalBreakdown = piles.map(pile => ({
    pile,
    time: Math.ceil(pile / result),
    calculation: `⌈${pile}/${result}⌉ = ${Math.ceil(pile / result)}`
  }));

  steps.push({
    array: piles,
    message: `Found minimum eating speed: ${result} bananas/hour (takes ${finalTime} hours)`,
    isComplete: true,
    action: 'found-answer',
    data: {
      piles,
      h,
      result,
      finalTime,
      finalBreakdown
    }
  });

  return steps;
};