import type { Step } from '../types/step';

export function generateStringSearchSteps(text: string, pattern: string): Step[] {
  const steps: Step[] = [];

  if (!text || !pattern) {
    steps.push({
      text,
      pattern,
      textIndex: -1,
      patternIndex: -1,
      matches: [],
      message: 'Invalid input: text or pattern is empty'
    });
    return steps;
  }

  const matches: number[] = [];

  // Initial step
  steps.push({
    text,
    pattern,
    textIndex: 0,
    patternIndex: 0,
    matches: [],
    message: `Starting naive string search. Looking for pattern "${pattern}" in text "${text}"`
  });

  // Naive string matching algorithm
  for (let i = 0; i <= text.length - pattern.length; i++) {
    // Start comparison at position i
    steps.push({
      text,
      pattern,
      textIndex: i,
      patternIndex: 0,
      matches: [...matches],
      message: `Checking position ${i}: comparing '${text[i]}' with '${pattern[0]}'`
    });

    let j = 0;
    // Compare characters
    while (j < pattern.length && text[i + j] === pattern[j]) {
      steps.push({
        text,
        pattern,
        textIndex: i + j,
        patternIndex: j,
        matches: [...matches],
        message: `Match found: '${text[i + j]}' === '${pattern[j]}' at position ${i + j}`
      });
      j++;
    }

    if (j === pattern.length) {
      // Full pattern match found
      matches.push(i);
      steps.push({
        text,
        pattern,
        textIndex: i + j - 1,
        patternIndex: j - 1,
        matches: [...matches],
        message: `Pattern found at position ${i}! Total matches: ${matches.length}`
      });
    } else if (j > 0) {
      // Partial match, then mismatch
      steps.push({
        text,
        pattern,
        textIndex: i + j,
        patternIndex: j,
        matches: [...matches],
        message: `Mismatch: '${text[i + j]}' !== '${pattern[j]}' at position ${i + j}`
      });
    }
  }

  // Final step
  steps.push({
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matches: [...matches],
    message: matches.length > 0
      ? `Search complete! Found ${matches.length} match${matches.length === 1 ? '' : 'es'} at position${matches.length === 1 ? '' : 's'}: ${matches.join(', ')}`
      : 'Search complete! No matches found'
  });

  return steps;
}