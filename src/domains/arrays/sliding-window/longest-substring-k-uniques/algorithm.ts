import type { Step } from '@/shared/types/step';

export const generateLongestSubstringKUniquesSteps = (s: string, k: number): Step[] => {
  const steps: Step[] = [];
  const charMap = new Map<string, number>();
  let left = 0;
  let maxLength = 0;

  steps.push({
    text: s,
    pointers: { left, right: 0 },
    message: `Find longest substring with exactly ${k} unique characters`,
    highlightIndices: [],
    data: { k, maxLength, charMap: {} }
  });

  for (let right = 0; right < s.length; right++) {
    charMap.set(s[right], (charMap.get(s[right]) || 0) + 1);

    while (charMap.size > k) {
      charMap.set(s[left], charMap.get(s[left])! - 1);
      if (charMap.get(s[left]) === 0) charMap.delete(s[left]);
      left++;
    }

    if (charMap.size === k) {
      maxLength = Math.max(maxLength, right - left + 1);

      steps.push({
        text: s,
        pointers: { left, right },
        message: `Valid window with ${k} unique chars: "${s.substring(left, right + 1)}"`,
        highlightIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        data: { k, maxLength, charMap: Object.fromEntries(charMap) }
      });
    }
  }

  steps.push({
    text: s,
    pointers: {},
    message: `Longest substring with ${k} unique characters: length ${maxLength}`,
    isComplete: true,
    data: { result: maxLength, k }
  });

  return steps;
};
