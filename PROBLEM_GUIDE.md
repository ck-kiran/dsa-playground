# Problem-as-a-Module Guide

This guide explains how to add new problems to the DSA Playground using the new modular architecture.

## 🎯 Overview

The new "Problem-as-a-Module" architecture with auto-discovery makes adding problems **truly drop-in**:

- **Before**: Required changes in 6+ files + manual registration
- **After**: Create 3 files + add 1 export line = Done!

**Key Innovation**: Auto-discovery eliminates the hidden global coupling of manual registration. No more merge conflicts, no more forgotten registration steps!

## 📁 File Structure

Each **pattern** contains multiple related **problems**:

```
src/domains/{topic}/{pattern}/
├── {problem-1}/
│   ├── algorithm.ts      # Step generation logic
│   ├── visualizer.tsx    # React visualization component
│   └── problem.ts        # Problem configuration and module export
├── {problem-2}/
│   ├── algorithm.ts
│   ├── visualizer.tsx
│   └── problem.ts
├── {problem-3}/
│   └── ...
└── index.ts              # Pattern definition listing all problems
```

**Example: Binary Search Pattern**
```
src/domains/arrays/binary-search/
├── basic-binary-search/
│   ├── algorithm.ts
│   ├── visualizer.tsx
│   └── problem.ts
├── search-insert-position/
│   ├── algorithm.ts
│   ├── visualizer.tsx
│   └── problem.ts
├── find-first-last/
│   └── ...
└── index.ts              # Lists all binary search problems
```

## 🚀 Adding a New Problem (TRUE Drop-in!)

Adding a new problem requires **two layers** of integration:

### **Layer 1: Problem Module (Auto-Discovery)**
1. **Create 3 files** in your domain folder
2. **Add 1 export line** to the domains index
3. **Auto-discovery handles the rest!**

### **Layer 2: Navigation Structure (Manual)**
4. **Create pattern structure** for website navigation
5. **Add pattern to topic** for discoverability

### Step 1: Create Problem Files

Create the three required files in your **pattern/problem** folder:

```bash
# Create problem folder within existing pattern
src/domains/{topic}/{pattern}/{your-problem}/
```

**OR** create new pattern if needed:

```bash
# Create new pattern with first problem
src/domains/{topic}/{new-pattern}/{first-problem}/
```

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

#### `problem.ts` - Problem Configuration (Both Layers!)

```typescript
import { Problem } from '@/shared/types/domain';
import type { ProblemModule } from '@/shared/types/problem';
import { YourVisualizerComponent } from './visualizer';
import { generateYourAlgorithmSteps } from './algorithm';

// Layer 2: Navigation structure problem definition
export const yourProblem: Problem = {
  id: 'your-algorithm-id',
  title: 'Your Algorithm Name',
  difficulty: 'Easy',
  description: 'Brief description for navigation.',
};

// Layer 1: Problem module for auto-discovery
export const yourProblemModule: ProblemModule = {
  config: {
    id: 'your-algorithm-id',
    title: 'Your Algorithm Name',
    difficulty: 'Easy', // Easy | Medium | Hard
    description: 'Detailed description of what your algorithm does...',
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

### Step 2: Export Your Problem (Auto-Discovery!)

Add your problem to the auto-discovery system in `src/domains/index.ts`:

```typescript
// Add one export line for your new problem:
export { yourProblemModule } from './your-topic/your-pattern/your-problem/problem';
```

**This enables Layer 1** - the problem will work in the playground, but won't show in navigation yet.

### Step 3: Update Pattern Structure (Navigation!)

**If adding to existing pattern:** Update `src/domains/{topic}/{pattern}/index.ts`:

```typescript
import { Pattern } from '@/shared/types/domain';
import { existingProblem1 } from './existing-problem-1/problem';
import { yourProblem } from './your-problem/problem'; // Add this line

export const yourPattern: Pattern = {
  id: 'existing-pattern-name',
  title: 'Existing Pattern',
  description: 'Pattern description...',
  problems: [
    existingProblem1,
    yourProblem, // Add this line
  ],
};

export * from './existing-problem-1/problem';
export * from './your-problem/problem'; // Add this line
```

**If creating new pattern:** Create `src/domains/{topic}/{new-pattern}/index.ts`:

```typescript
import { Pattern } from '@/shared/types/domain';
import { yourProblem } from './your-problem/problem';

export const yourPattern: Pattern = {
  id: 'your-pattern-name',
  title: 'Pattern Display Name',
  description: 'What this pattern teaches...',
  problems: [yourProblem],
};

export * from './your-problem/problem';
```

### Step 4: Add Pattern to Topic

Update `src/domains/{topic}/index.ts`:

```typescript
import { yourPattern } from './your-pattern';

export const yourTopic: Topic = {
  // ... existing properties
  patterns: [
    // ... existing patterns
    yourPattern,
  ],
};

export * from './your-pattern';
```

**This enables Layer 2** - now your problem appears in website navigation!

### Step 5: Add Input Controls (Optional)

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

### Step 6: Test Your Problem

1. **Start development server**: `npm run dev`
2. **Verify auto-discovery**: Check console for "🚀 Auto-discovered X problem modules"
3. **Check navigation**:
   - Visit `/your-topic` - should see your pattern listed
   - Visit `/your-topic/your-pattern` - should see your problem
4. **Test playground**: Visit `/your-topic/your-pattern/your-algorithm-id` - should work fully

## 🎯 **Why Two Layers?**

- **Layer 1 (Auto-Discovery)**: Handles the actual problem functionality - visualizer, steps, code execution
- **Layer 2 (Navigation)**: Handles the website structure - menus, breadcrumbs, topic organization

This separation allows:
- ✅ **Zero coupling** for functionality
- ✅ **Clear navigation** structure
- ✅ **Easy testing** (can test problems directly via URL)
- ✅ **Flexible organization** (same problem could appear in multiple topics)

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
2. **Auto-discovery**: No manual registration, zero hidden coupling
3. **Type-safe**: Full TypeScript support with proper interfaces
4. **Consistent**: All problems follow the same structure
5. **Two-layer design**: Separates functionality from navigation
6. **Maintainable**: Easy to understand and modify individual problems
7. **Scalable**: Can easily add hundreds of problems without complexity
8. **No merge conflicts**: Auto-discovery eliminates central registration points

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