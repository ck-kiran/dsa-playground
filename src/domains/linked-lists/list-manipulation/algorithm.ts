import type { Step } from '../../../shared/types/step';

export function generateReverseListSteps(initialList: number[]): Step[] {
  const steps: Step[] = [];

  if (initialList.length === 0) {
    steps.push({
      linkedList: [],
      listPointers: { prev: null, current: null, next: null },
      message: 'Empty list - nothing to reverse'
    });
    return steps;
  }

  // Create initial linked list structure
  const list = initialList.map((value, index) => ({
    value,
    next: index < initialList.length - 1 ? index + 1 : null,
    id: index
  }));

  let prev: number | null = null;
  let current: number | null = 0;
  let next: number | null = initialList.length > 1 ? 1 : null;

  // Initial step - show original list
  steps.push({
    linkedList: [...list],
    listPointers: { prev, current, next },
    message: `Original list: [${initialList.join(' -> ')}]. Starting reversal with prev=null, current=0`
  });

  let stepCount = 1;
  while (current !== null) {
    // Store next before we lose it
    const nextNode: number | null = list[current].next;

    // Show the step before reversing
    steps.push({
      linkedList: [...list],
      listPointers: { prev, current, next: nextNode },
      message: `Step ${stepCount}: About to reverse node ${list[current].value}'s pointer from ${nextNode !== null ? list[nextNode].value : 'null'} to ${prev !== null ? list[prev].value : 'null'}`
    });

    // Reverse the current node's pointer
    list[current].next = prev;

    // Show the result of reversing
    steps.push({
      linkedList: [...list],
      listPointers: { prev, current, next: nextNode },
      message: `Step ${stepCount}: Reversed! Node ${list[current].value} now points to ${prev !== null ? list[prev].value : 'null'}`
    });

    // Move pointers forward
    prev = current;
    current = nextNode;
    next = nextNode !== null ? list[nextNode]?.next || null : null;

    // Show pointer movement
    if (current !== null) {
      steps.push({
        linkedList: [...list],
        listPointers: { prev, current, next },
        message: `Step ${stepCount}: Moving pointers - prev=${list[prev].value}, current=${list[current].value}, next=${next !== null ? list[next].value : 'null'}`
      });
    }

    stepCount++;
  }

  // Final step - show completed reversal
  steps.push({
    linkedList: [...list],
    listPointers: { prev, current, next },
    message: `Reversal complete! New head is node ${prev !== null ? list[prev].value : 'null'}. List is now reversed.`
  });

  return steps;
}