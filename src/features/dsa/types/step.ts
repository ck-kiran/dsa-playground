export type Step = {
  array?: number[];
  highlightIndices?: number[];
  pointers?: {
    left?: number;
    right?: number;
    mid?: number;
    curr?: number; // Added for iteration
    prev?: number;
    next?: number;
  };
  hashMap?: Record<number, number>; // value -> index
  message: string;

  // For string search
  text?: string;
  pattern?: string;
  textIndex?: number;
  patternIndex?: number;
  matches?: number[];

  // For linked list
  linkedList?: Array<{ value: number; next: number | null; id: number }>;
  listPointers?: {
    prev: number | null;
    current: number | null;
    next: number | null;
  };

  // For tree traversal
  tree?: any;
  visitedNodes?: string[];
  currentNode?: string | null;
  traversalOrder?: number[];
  traversalType?: 'inorder' | 'preorder' | 'postorder';
};
