import type { Step } from '@/shared/types/step';

function simulateGuess(guess: number, target: number): number {
  if (guess === target) return 0;
  if (guess > target) return -1; // Target is lower
  return 1; // Target is higher
}

export const generateGuessNumberSteps = (n: number, pick: number): Step[] => {
  const steps: Step[] = [];
  let left = 1;
  let right = n;
  let guessCount = 0;

  // Create range visualization
  const range = Array.from({length: n}, (_, i) => i + 1);

  // Initial step
  steps.push({
    array: range,
    pointers: { left: left - 1, right: right - 1 }, // Adjust for 0-based indexing in visualization
    message: `Guessing Game: Find the number between 1 and ${n}. Secret number is ${pick}`,
    highlightIndices: [pick - 1], // Highlight secret number
    data: { n, pick, guessCount, range: [left, right] }
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    guessCount++;
    const guessResult = simulateGuess(mid, pick);

    steps.push({
      array: range,
      pointers: { left: left - 1, right: right - 1, mid: mid - 1 },
      message: `Guess #${guessCount}: Try ${mid}`,
      highlightIndices: [mid - 1, pick - 1],
      action: 'make-guess',
      data: {
        n,
        pick,
        guessCount,
        currentGuess: mid,
        guessResult,
        range: [left, right]
      }
    });

    if (guessResult === 0) {
      // Found it!
      steps.push({
        array: range,
        pointers: { left: left - 1, right: right - 1, mid: mid - 1 },
        message: `🎉 Correct! The number is ${mid}. Found in ${guessCount} guesses!`,
        highlightIndices: [mid - 1],
        isComplete: true,
        action: 'found-correct',
        data: {
          n,
          pick,
          guessCount,
          currentGuess: mid,
          guessResult,
          result: mid
        }
      });
      return steps;
    } else if (guessResult === -1) {
      // Target is lower
      steps.push({
        array: range,
        pointers: { left: left - 1, right: right - 1, mid: mid - 1 },
        message: `Guess ${mid} is too HIGH. Secret number is lower. Search left half.`,
        highlightIndices: Array.from({length: mid - left}, (_, i) => left - 1 + i),
        action: 'too-high',
        data: {
          n,
          pick,
          guessCount,
          currentGuess: mid,
          guessResult,
          direction: 'lower'
        }
      });
      right = mid - 1;
    } else {
      // Target is higher
      steps.push({
        array: range,
        pointers: { left: left - 1, right: right - 1, mid: mid - 1 },
        message: `Guess ${mid} is too LOW. Secret number is higher. Search right half.`,
        highlightIndices: Array.from({length: right - mid}, (_, i) => mid + i),
        action: 'too-low',
        data: {
          n,
          pick,
          guessCount,
          currentGuess: mid,
          guessResult,
          direction: 'higher'
        }
      });
      left = mid + 1;
    }

    // Show updated range
    if (left <= right) {
      steps.push({
        array: range,
        pointers: { left: left - 1, right: right - 1 },
        message: `Updated search range: [${left}, ${right}]`,
        highlightIndices: Array.from({length: right - left + 1}, (_, i) => left - 1 + i),
        data: {
          n,
          pick,
          guessCount,
          range: [left, right],
          isRangeUpdate: true
        }
      });
    }
  }

  // Should never reach here in valid input
  steps.push({
    array: range,
    message: `Error: Could not find the number. This should not happen with valid input.`,
    highlightIndices: [],
    isComplete: true,
    data: { n, pick, guessCount, error: true }
  });

  return steps;
};