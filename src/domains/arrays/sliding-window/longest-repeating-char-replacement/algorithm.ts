import type { Step } from '@/shared/types/step';

export const generateLongestRepeatingCharacterReplacementSteps = (s: string, k: number): Step[] => {
  const steps: Step[] = [];
  const count = new Map<string, number>();
  let left = 0;
  let maxCount = 0;
  let maxLength = 0;

  steps.push({
    text: s,
    pointers: { left, right: 0 },
    message: `Find longest substring with same letter after ${k} replacements`,
    highlightIndices: [],
    data: { k, maxCount, maxLength, count: {} }
  });

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    count.set(char, (count.get(char) || 0) + 1);
    maxCount = Math.max(maxCount, count.get(char)!);

    const windowLen = right - left + 1;
    const replacements = windowLen - maxCount;

    steps.push({
      text: s,
      pointers: { left, right },
      message: `Add '${char}'. Window: ${windowLen}, Most frequent: ${maxCount}, Need ${replacements} replacements`,
      highlightIndices: [right],
      action: 'expand',
      data: { k, maxCount, maxLength, count: Object.fromEntries(count), windowLen, replacements }
    });

    if (replacements > k) {
      const leftChar = s[left];
      count.set(leftChar, count.get(leftChar)! - 1);
      left++;

      steps.push({
        text: s,
        pointers: { left, right },
        message: `Too many replacements (${replacements} > ${k}). Shrink window`,
        highlightIndices: [left - 1],
        action: 'shrink',
        data: { k, maxCount, maxLength, count: Object.fromEntries(count) }
      });
    }

    const currentLen = right - left + 1;
    if (currentLen > maxLength) {
      maxLength = currentLen;

      steps.push({
        text: s,
        pointers: { left, right },
        message: `New max length: ${maxLength}`,
        highlightIndices: Array.from({ length: currentLen }, (_, i) => left + i),
        action: 'update-max',
        data: { k, maxCount, maxLength }
      });
    }
  }

  steps.push({
    text: s,
    pointers: {},
    message: `Longest repeating substring: ${maxLength} characters`,
    highlightIndices: [],
    isComplete: true,
    data: { result: maxLength, k }
  });

  return steps;
};
