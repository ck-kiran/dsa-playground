import type { Step } from '@/shared/types/step';

function isAlphaNumeric(char: string): boolean {
  return /^[a-zA-Z0-9]$/.test(char);
}

export const generateValidPalindromeSteps = (s: string): Step[] => {
  const steps: Step[] = [];
  let left = 0;
  let right = s.length - 1;

  // Initial step
  steps.push({
    text: s,
    pointers: { left, right },
    message: `Checking if "${s}" is a palindrome using two pointers`,
    highlightIndices: []
  });

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphaNumeric(s[left])) {
      steps.push({
        text: s,
        pointers: { left, right },
        message: `Skip non-alphanumeric character '${s[left]}' at position ${left}`,
        highlightIndices: [left],
        action: 'skip-left'
      });
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphaNumeric(s[right])) {
      steps.push({
        text: s,
        pointers: { left, right },
        message: `Skip non-alphanumeric character '${s[right]}' at position ${right}`,
        highlightIndices: [right],
        action: 'skip-right'
      });
      right--;
    }

    // If pointers crossed, we're done
    if (left >= right) break;

    // Compare characters
    const leftChar = s[left].toLowerCase();
    const rightChar = s[right].toLowerCase();

    steps.push({
      text: s,
      pointers: { left, right },
      message: `Compare '${s[left]}' (${leftChar}) with '${s[right]}' (${rightChar})`,
      highlightIndices: [left, right],
      action: 'compare',
      data: { leftChar, rightChar, leftIndex: left, rightIndex: right }
    });

    if (leftChar !== rightChar) {
      // Not a palindrome
      steps.push({
        text: s,
        pointers: { left, right },
        message: `Characters don't match! '${leftChar}' ≠ '${rightChar}'. Not a palindrome.`,
        highlightIndices: [left, right],
        isComplete: true,
        data: { result: false, leftChar, rightChar }
      });
      return steps;
    } else {
      // Characters match
      steps.push({
        text: s,
        pointers: { left, right },
        message: `Characters match! '${leftChar}' = '${rightChar}'. Continue...`,
        highlightIndices: [left, right],
        action: 'match',
        data: { leftChar, rightChar }
      });
    }

    left++;
    right--;
  }

  // All characters matched
  steps.push({
    text: s,
    pointers: { left, right },
    message: `All characters matched! "${s}" is a palindrome.`,
    highlightIndices: [],
    isComplete: true,
    data: { result: true }
  });

  return steps;
};