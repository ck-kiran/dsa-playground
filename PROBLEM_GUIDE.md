# Problem-as-a-Module Guide

This guide explains how to add new problems to the DSA Playground using the new modular architecture.

## 🎯 Overview

The new "Problem-as-a-Module" architecture makes adding problems much simpler:

- **Before**: Required changes in 6+ files across the codebase
- **After**: Only need to create/modify 3 files and register the problem

## 📁 File Structure

Each problem is completely self-contained in its domain folder:

```
src/domains/{topic}/{pattern}/
├── algorithm.ts          # Step generation logic
├── visualizer.tsx        # React visualization component
├── problem.ts           # Problem configuration and module export
└── index.ts             # Pattern exports (auto-generated)
```

## 🚀 Adding a New Problem

### Step 1: Create Problem Files

Create the three required files in your domain folder:

#### `algorithm.ts` - Step Generation Logic

```typescript
import type { Step } from '@/shared/types/step';

export function generateYourAlgorithmSteps(input: any): Step[] {
  const steps: Step[] = [];

  // Add your step generation logic here
  steps.push({
    array: [1, 2, 3],
    message: 'Starting algorithm...',
    pointers: {},
  });

  return steps;
}
```

#### `visualizer.tsx` - Visualization Component

```typescript
import React from 'react';
import type { Step } from '@/shared/types/step';

export function YourVisualizerComponent({ step }: { step: Step }) {
  const { array, message, pointers } = step;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Your visualization JSX here */}
      <div className="flex gap-2">
        {array?.map((value, index) => (
          <div key={index} className="w-12 h-12 border rounded flex items-center justify-center">
            {value}
          </div>
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
}
```

#### `problem.ts` - Problem Configuration

```typescript
import type { ProblemModule } from '@/shared/types/problem';
import { YourVisualizerComponent } from './visualizer';
import { generateYourAlgorithmSteps } from './algorithm';

export const yourProblemModule: ProblemModule = {
  config: {
    id: 'your-algorithm-id',
    title: 'Your Algorithm Name',
    difficulty: 'Easy', // Easy | Medium | Hard
    description: 'Description of what your algorithm does...',
    constraints: [
      'Time Complexity: O(N)',
      'Space Complexity: O(1)',
    ],
    defaultCode: `function yourAlgorithm(input) {
      // Default implementation
      return result;
    }`,
    defaultInputs: {
      array: [1, 2, 3, 4, 5],
      // Add other default inputs your algorithm needs
    },
  },
  generateSteps: (inputs) => {
    // Extract the inputs your algorithm needs
    const { array } = inputs as { array: number[] };
    return generateYourAlgorithmSteps(array);
  },
  Visualizer: YourVisualizerComponent,
};
```

### Step 2: Register the Problem

Add your problem to the registry in `src/shared/services/problemLoader.ts`:

```typescript
// Add import
import { yourProblemModule } from '@/domains/{topic}/{pattern}/problem';

// Add registration in loadAllProblems()
export function loadAllProblems() {
  if (problemsLoaded) return;

  // ... existing registrations
  registerProblem('your-algorithm-id', yourProblemModule);

  problemsLoaded = true;
}
```

### Step 3: Add Input Controls (Optional)

If your problem needs custom input controls, add them to `src/shared/components/ProblemInputControls.tsx`:

```typescript
// Add case for your problem
case 'your-algorithm-id':
  return (
    <div className="flex items-center gap-2 mr-2">
      <Label className="text-xs text-muted-foreground whitespace-nowrap">
        Your Input:
      </Label>
      <Input
        type="text"
        value={inputs.yourInput as string || ''}
        onChange={(e) => onChange({ ...inputs, yourInput: e.target.value })}
        className="h-7 w-20 text-xs bg-background"
      />
    </div>
  );
```

### Step 4: Update Domain Index (if needed)

If you're adding to an existing domain, update the pattern's index file:

```typescript
// In src/domains/{topic}/{pattern}/index.ts
export { yourProblemModule } from './problem';
```

## 📝 Step Object Interface

Your `generateSteps` function should return an array of `Step` objects:

```typescript
interface Step {
  array?: number[];           // Array being processed
  pointers?: Record<string, number>; // Pointer positions (left, right, current, etc.)
  highlightIndices?: number[]; // Indices to highlight
  message?: string;           // Description of current step
  hashMap?: Record<number, number>; // For hash-based algorithms
  linkedList?: any[];         // For linked list algorithms
  tree?: any;                 // For tree algorithms
  // Add other properties as needed
}
```

## 🎨 Styling Guidelines

Use consistent Tailwind classes for visualizations:

- **Normal elements**: `border-gray-300 bg-white`
- **Highlighted elements**: `border-blue-500 bg-blue-100`
- **Active pointers**: `border-red-500 bg-red-100`
- **Success/found**: `border-green-500 bg-green-100`

## 🔍 Example: Complete Binary Search Problem

Here's a complete example for reference:

```typescript
// domains/arrays/binary-search/problem.ts
export const binarySearchModule: ProblemModule = {
  config: {
    id: 'binary-search-visualizer',
    title: 'Binary Search',
    difficulty: 'Easy',
    description: 'Find target element in sorted array by repeatedly dividing search space.',
    constraints: [
      'Array must be sorted',
      'Time Complexity: O(log N)',
      'Space Complexity: O(1)',
    ],
    defaultCode: `function binarySearch(arr, target) {
      let left = 0;
      let right = arr.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
          return mid;
        } else if (arr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      return -1;
    }`,
    defaultInputs: {
      array: [1, 3, 5, 7, 9, 11, 13],
      target: 7,
    },
  },
  generateSteps: (inputs) => {
    const { array, target } = inputs as { array: number[]; target: number };
    return generateBinarySearchSteps(array, target);
  },
  Visualizer: BinarySearchVisualizer,
};
```

## ✅ Benefits of the New Architecture

1. **Self-contained**: Each problem is in its own module
2. **No cross-cutting changes**: Adding problems doesn't require modifying core files
3. **Type-safe**: Full TypeScript support with proper interfaces
4. **Consistent**: All problems follow the same structure
5. **Maintainable**: Easy to understand and modify individual problems
6. **Scalable**: Can easily add hundreds of problems without complexity

## 🚀 Testing Your Problem

1. Add your problem files
2. Register it in `problemLoader.ts`
3. Start the dev server: `npm run dev`
4. Navigate to your problem URL
5. Test the visualization and controls

Your problem should now work seamlessly with the existing infrastructure!

## 🔗 Need Help?

- Check existing problems in `src/domains/` for examples
- Look at the template in `src/shared/templates/problemTemplate.ts`
- Review the type definitions in `src/shared/types/problem.ts`