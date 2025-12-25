export type Step = {
  array: number[];
  highlightIndices?: number[];
  pointers?: {
    left?: number;
    right?: number;
    mid?: number;
    curr?: number; // Added for iteration
  };
  hashMap?: Record<number, number>; // value -> index
  message: string;
};
