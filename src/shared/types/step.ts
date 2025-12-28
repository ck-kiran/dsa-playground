export interface Step {
  array?: number[];
  highlightIndices?: number[];
  pointers?: Record<string, number>;
  message?: string;

  // For trees
  tree?: any;
  visitedNodes?: string[];
  currentNode?: string | null;
  traversalOrder?: number[];
  traversalType?: string;

  // For linked lists
  list?: any;
  linkedList?: any[];
  listPointers?: Record<string, number | null>;

  // For hash maps
  hashMap?: Record<string, any>;
  keys?: string[];

  // For strings
  text?: string;
  pattern?: string;
  matches?: number[];
  textIndex?: number;
  patternIndex?: number;

  // General purpose
  data?: any;
  action?: string;
  description?: string;
}