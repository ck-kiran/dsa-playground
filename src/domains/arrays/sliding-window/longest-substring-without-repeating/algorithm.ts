import type { Step } from '@/shared/types/step';

export const generateLongestSubstringWithoutRepeatingSteps = (s: string): Step[] => {
  const steps: Step[] = [];
  const n = s.length;
  const charMap = new Map<string, number>();
  let left = 0;
  let maxLength = 0;
  let maxStart = 0;
  let maxEnd = 0;

  // Initial step
  steps.push({
    text: s,
    pointers: { left, right: 0 },
    message: 'Find longest substring without repeating characters',
    highlightIndices: [],
    data: { charMap: {}, maxLength, currentWindow: '' }
  });

  for (let right = 0; right < n; right++) {
    const char = s[right];

    steps.push({
      text: s,
      pointers: { left, right },
      message: `Expanding window: checking character '${char}' at index ${right}`,
      highlightIndices: [right],
      action: 'expand',
      data: { charMap: Object.fromEntries(charMap), maxLength, currentWindow: s.substring(left, right + 1), currentChar: char }
    });

    // If character already exists in current window, shrink from left
    if (charMap.has(char) && charMap.get(char)! >= left) {
      const oldLeft = left;
      left = charMap.get(char)! + 1;

      steps.push({
        text: s,
        pointers: { left, right },
        message: `Duplicate '${char}' found! Shrink window: move left from ${oldLeft} to ${left}`,
        highlightIndices: [right, charMap.get(char)!],
        action: 'shrink',
        data: { charMap: Object.fromEntries(charMap), maxLength, currentWindow: s.substring(left, right + 1), duplicateChar: char }
      });
    }

    // Update character position
    charMap.set(char, right);

    // Update max length if current window is larger
    const currentLength = right - left + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = left;
      maxEnd = right;

      steps.push({
        text: s,
        pointers: { left, right },
        message: `New max length: ${maxLength}. Substring: "${s.substring(left, right + 1)}"`,
        highlightIndices: Array.from({ length: currentLength }, (_, i) => left + i),
        action: 'update-max',
        data: { charMap: Object.fromEntries(charMap), maxLength, currentWindow: s.substring(left, right + 1) }
      });
    } else {
      steps.push({
        text: s,
        pointers: { left, right },
        message: `Current window: "${s.substring(left, right + 1)}" (length ${currentLength})`,
        highlightIndices: Array.from({ length: currentLength }, (_, i) => left + i),
        data: { charMap: Object.fromEntries(charMap), maxLength, currentWindow: s.substring(left, right + 1) }
      });
    }
  }

  // Final step
  steps.push({
    text: s,
    pointers: { left: maxStart, right: maxEnd },
    message: `Longest substring without repeating: "${s.substring(maxStart, maxEnd + 1)}" (length ${maxLength})`,
    highlightIndices: Array.from({ length: maxLength }, (_, i) => maxStart + i),
    isComplete: true,
    data: { result: maxLength, longestSubstring: s.substring(maxStart, maxEnd + 1), charMap: Object.fromEntries(charMap), maxLength }
  });

  return steps;
};
