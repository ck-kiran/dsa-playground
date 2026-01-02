import type { Step } from '@/shared/types/step';

export const generateMinimumWindowSubstringSteps = (s: string, t: string): Step[] => {
  const steps: Step[] = [];

  if (s.length === 0 || t.length === 0) {
    steps.push({
      text: s,
      pattern: t,
      message: 'Empty string - no window possible',
      isComplete: true,
      data: { result: '' }
    });
    return steps;
  }

  const need = new Map<string, number>();
  const window = new Map<string, number>();

  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  let minLen = Infinity;
  let start = 0;

  steps.push({
    text: s,
    pattern: t,
    pointers: { left, right },
    message: `Find minimum window in s="${s}" containing all characters from t="${t}"`,
    highlightIndices: [],
    data: { need: Object.fromEntries(need), window: {}, valid, minLen, required: need.size }
  });

  while (right < s.length) {
    const char = s[right];

    steps.push({
      text: s,
      pattern: t,
      pointers: { left, right },
      message: `Expand: add '${char}' at index ${right}`,
      highlightIndices: [right],
      action: 'expand',
      data: { need: Object.fromEntries(need), window: Object.fromEntries(window), valid, minLen, currentWindow: s.substring(left, right + 1) }
    });

    if (need.has(char)) {
      window.set(char, (window.get(char) || 0) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }
    right++;

    while (valid === need.size) {
      const windowLen = right - left;

      if (windowLen < minLen) {
        minLen = windowLen;
        start = left;

        steps.push({
          text: s,
          pattern: t,
          pointers: { left, right: right - 1 },
          message: `New minimum window found: "${s.substring(left, right)}" (length ${minLen})`,
          highlightIndices: Array.from({ length: windowLen }, (_, i) => left + i),
          action: 'update-min',
          data: { need: Object.fromEntries(need), window: Object.fromEntries(window), valid, minLen, minWindow: s.substring(left, right) }
        });
      }

      const leftChar = s[left];

      steps.push({
        text: s,
        pattern: t,
        pointers: { left, right: right - 1 },
        message: `Valid window found. Try shrinking: remove '${leftChar}' from left`,
        highlightIndices: [left],
        action: 'shrink',
        data: { need: Object.fromEntries(need), window: Object.fromEntries(window), valid, minLen }
      });

      if (need.has(leftChar)) {
        if (window.get(leftChar) === need.get(leftChar)) {
          valid--;
        }
        window.set(leftChar, window.get(leftChar)! - 1);
      }
      left++;
    }
  }

  const result = minLen === Infinity ? '' : s.substring(start, start + minLen);

  steps.push({
    text: s,
    pattern: t,
    pointers: minLen !== Infinity ? { left: start, right: start + minLen - 1 } : {},
    message: result ? `Minimum window substring: "${result}"` : 'No valid window found',
    highlightIndices: result ? Array.from({ length: minLen }, (_, i) => start + i) : [],
    isComplete: true,
    data: { result, minLen: minLen === Infinity ? 0 : minLen, need: Object.fromEntries(need) }
  });

  return steps;
};
