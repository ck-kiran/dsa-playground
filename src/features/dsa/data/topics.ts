export type Problem = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
};

export type Pattern = {
  id: string;
  title: string;
  description: string;
  problems: Problem[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  icon: string; // We can use lucide icon names or similar
  patterns: Pattern[];
};

export const dsaTopics: Topic[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Fundamental data structure storing elements in contiguous memory.',
    icon: 'LayoutList',
    patterns: [
      {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Efficiently find an element in a sorted array.',
        problems: [
          {
            id: 'binary-search-visualizer',
            title: 'Binary Search',
            difficulty: 'Easy',
            description: 'Visualize how binary search divides the search space.',
          },
        ],
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        description: 'Use two pointers to iterate through the array.',
        problems: [],
      },
    ],
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'Sequence of characters.',
    icon: 'Type',
    patterns: [],
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description:
      'Linear data structure where elements are not stored at contiguous memory locations.',
    icon: 'Link',
    patterns: [],
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical data structure.',
    icon: 'Network',
    patterns: [],
  },
  {
    id: 'hash-maps',
    title: 'Hash Maps',
    description: 'Data structure that implements an associative array abstract data type.',
    icon: 'Calculator',
    patterns: [
      {
        id: 'basic-hashing',
        title: 'Basic Hashing',
        description: 'Using hash maps to store and retrieve data efficiently.',
        problems: [
          {
            id: 'two-sum-visualizer',
            title: 'Two Sum',
            difficulty: 'Easy',
            description: 'Find two numbers that add up to a specific target.',
          },
        ],
      },
    ],
  },
];
