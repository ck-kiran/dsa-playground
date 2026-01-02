import type { Step } from '@/shared/types/step';

export const generateValidAnagramSteps = (s: string, t: string): Step[] => {
  const steps: Step[] = [];
  const charCount: Record<string, number> = {};

  // Initial step
  steps.push({
    text: s,
    pattern: t,
    hashMap: {},
    message: `Checking if "${t}" is an anagram of "${s}"`,
    highlightIndices: []
  });

  // Length check
  if (s.length !== t.length) {
    steps.push({
      text: s,
      pattern: t,
      hashMap: {},
      message: `Different lengths: "${s}" (${s.length}) vs "${t}" (${t.length}). Not an anagram.`,
      highlightIndices: [],
      isComplete: true,
      data: { result: false }
    });
    return steps;
  }

  // Count characters in s
  steps.push({
    text: s,
    pattern: t,
    hashMap: {},
    message: `Step 1: Count characters in "${s}"`,
    highlightIndices: []
  });

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCount[char] = (charCount[char] || 0) + 1;

    steps.push({
      text: s,
      pattern: t,
      hashMap: { ...charCount },
      message: `Add '${char}' to count map. Count: ${charCount[char]}`,
      textIndex: i,
      highlightIndices: [i],
      action: 'count-char'
    });
  }

  // Step 2: Check characters in t
  steps.push({
    text: s,
    pattern: t,
    hashMap: { ...charCount },
    message: `Step 2: Check characters in "${t}" against count map`,
    highlightIndices: []
  });

  for (let i = 0; i < t.length; i++) {
    const char = t[i];

    if (!charCount[char] || charCount[char] === 0) {
      // Character not found or count is 0
      steps.push({
        text: s,
        pattern: t,
        hashMap: { ...charCount },
        message: `'${char}' not found in map or count is 0. Not an anagram.`,
        patternIndex: i,
        highlightIndices: [i],
        isComplete: true,
        data: { result: false }
      });
      return steps;
    } else {
      // Decrement count
      charCount[char]--;
      steps.push({
        text: s,
        pattern: t,
        hashMap: { ...charCount },
        message: `Found '${char}' in map. Decrement count: ${charCount[char]}`,
        patternIndex: i,
        highlightIndices: [i],
        action: 'decrement-char'
      });
    }
  }

  // All characters matched
  steps.push({
    text: s,
    pattern: t,
    hashMap: { ...charCount },
    message: `All characters matched! "${t}" is an anagram of "${s}".`,
    highlightIndices: [],
    isComplete: true,
    data: { result: true }
  });

  return steps;
};