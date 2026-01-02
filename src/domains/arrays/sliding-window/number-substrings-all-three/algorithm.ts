import type { Step } from '@/shared/types/step';

export const generateNumberOfSubstringsContainingAllThreeSteps = (s: string): Step[] => {
  const steps: Step[] = [];
  const count = { a: 0, b: 0, c: 0 };
  let left = 0;
  let result = 0;

  steps.push({
    text: s,
    message: 'Count substrings containing all three characters (a, b, c)',
    data: { count, result }
  });

  for (let right = 0; right < s.length; right++) {
    count[s[right] as 'a' | 'b' | 'c']++;

    while (count.a > 0 && count.b > 0 && count.c > 0) {
      result += s.length - right;

      steps.push({
        text: s,
        pointers: { left, right },
        message: `Valid! Add ${s.length - right} substrings starting at ${left}`,
        highlightIndices: [left, right],
        data: { count: { ...count }, result }
      });

      count[s[left] as 'a' | 'b' | 'c']--;
      left++;
    }
  }

  steps.push({
    text: s,
    message: `Total substrings: ${result}`,
    isComplete: true,
    data: { result }
  });

  return steps;
};
