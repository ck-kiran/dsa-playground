'use client';

import Link from 'next/link';
import { ExternalLink, PlayCircle } from 'lucide-react';

import { DataTable, DataTableColumn, DataTableFilter } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { dsaTopics, Problem } from '@/features/dsa/data/topics';

// Extended Problem interface with additional metadata
interface ExtendedProblem extends Problem {
  topic: string;
  topicTitle: string;
  pattern: string;
  patternTitle: string;
  hasVisualizer: boolean;
  route: string;
  status: 'Available' | 'Coming Soon';
}

export default function ProblemsPage() {
  // Flatten all problems from all topics and patterns
  const allProblems: ExtendedProblem[] = dsaTopics.flatMap((topic) =>
    topic.patterns.flatMap((pattern) =>
      pattern.problems.map((problem) => {
        // Check if visualizer is available
        const availableVisualizers = [
          'binary-search-visualizer',
          'two-sum-visualizer',
          'string-search-visualizer',
          'reverse-list-visualizer',
          'tree-traversal-visualizer'
        ];

        const hasVisualizer = availableVisualizers.includes(problem.id);

        return {
          ...problem,
          topic: topic.id,
          topicTitle: topic.title,
          pattern: pattern.id,
          patternTitle: pattern.title,
          hasVisualizer,
          route: `/${topic.id}/${pattern.id}/${problem.id}`,
          status: hasVisualizer ? 'Available' : 'Coming Soon'
        } as ExtendedProblem;
      })
    )
  );

  // Add some mock problems to demonstrate pagination
  const mockProblems: ExtendedProblem[] = [
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: 'Determine if the input string is valid with properly matched parentheses.',
      topic: 'strings',
      topicTitle: 'Strings',
      pattern: 'pattern-matching',
      patternTitle: 'Pattern Matching',
      hasVisualizer: false,
      route: '/strings/pattern-matching/valid-parentheses',
      status: 'Coming Soon'
    },
    {
      id: 'longest-substring',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      description: 'Find the length of the longest substring without repeating characters.',
      topic: 'strings',
      topicTitle: 'Strings',
      pattern: 'pattern-matching',
      patternTitle: 'Pattern Matching',
      hasVisualizer: false,
      route: '/strings/pattern-matching/longest-substring',
      status: 'Coming Soon'
    },
    {
      id: 'merge-intervals',
      title: 'Merge Intervals',
      difficulty: 'Medium',
      description: 'Given an array of intervals, merge all overlapping intervals.',
      topic: 'arrays',
      topicTitle: 'Arrays',
      pattern: 'two-pointers',
      patternTitle: 'Two Pointers',
      hasVisualizer: false,
      route: '/arrays/two-pointers/merge-intervals',
      status: 'Coming Soon'
    },
    {
      id: 'container-most-water',
      title: 'Container With Most Water',
      difficulty: 'Medium',
      description: 'Find two lines that together with the x-axis forms a container.',
      topic: 'arrays',
      topicTitle: 'Arrays',
      pattern: 'two-pointers',
      patternTitle: 'Two Pointers',
      hasVisualizer: false,
      route: '/arrays/two-pointers/container-most-water',
      status: 'Coming Soon'
    },
    {
      id: 'linked-list-cycle',
      title: 'Linked List Cycle',
      difficulty: 'Easy',
      description: 'Determine if a linked list has a cycle in it.',
      topic: 'linked-lists',
      topicTitle: 'Linked Lists',
      pattern: 'list-manipulation',
      patternTitle: 'List Manipulation',
      hasVisualizer: false,
      route: '/linked-lists/list-manipulation/linked-list-cycle',
      status: 'Coming Soon'
    },
    {
      id: 'merge-two-sorted-lists',
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      description: 'Merge two sorted linked lists and return it as a new sorted list.',
      topic: 'linked-lists',
      topicTitle: 'Linked Lists',
      pattern: 'list-manipulation',
      patternTitle: 'List Manipulation',
      hasVisualizer: false,
      route: '/linked-lists/list-manipulation/merge-two-sorted-lists',
      status: 'Coming Soon'
    },
    {
      id: 'maximum-depth-binary-tree',
      title: 'Maximum Depth of Binary Tree',
      difficulty: 'Easy',
      description: 'Find the maximum depth of a binary tree.',
      topic: 'trees',
      topicTitle: 'Trees',
      pattern: 'tree-traversal',
      patternTitle: 'Tree Traversal',
      hasVisualizer: false,
      route: '/trees/tree-traversal/maximum-depth-binary-tree',
      status: 'Coming Soon'
    },
    {
      id: 'validate-binary-search-tree',
      title: 'Validate Binary Search Tree',
      difficulty: 'Medium',
      description: 'Determine if a given binary tree is a valid binary search tree.',
      topic: 'trees',
      topicTitle: 'Trees',
      pattern: 'tree-traversal',
      patternTitle: 'Tree Traversal',
      hasVisualizer: false,
      route: '/trees/tree-traversal/validate-binary-search-tree',
      status: 'Coming Soon'
    },
    {
      id: 'group-anagrams',
      title: 'Group Anagrams',
      difficulty: 'Medium',
      description: 'Given an array of strings, group the anagrams together.',
      topic: 'hash-maps',
      topicTitle: 'Hash Maps',
      pattern: 'basic-hashing',
      patternTitle: 'Basic Hashing',
      hasVisualizer: false,
      route: '/hash-maps/basic-hashing/group-anagrams',
      status: 'Coming Soon'
    },
    {
      id: 'top-k-frequent-elements',
      title: 'Top K Frequent Elements',
      difficulty: 'Medium',
      description: 'Given an integer array, return the k most frequent elements.',
      topic: 'hash-maps',
      topicTitle: 'Hash Maps',
      pattern: 'basic-hashing',
      patternTitle: 'Basic Hashing',
      hasVisualizer: false,
      route: '/hash-maps/basic-hashing/top-k-frequent-elements',
      status: 'Coming Soon'
    },
  ];

  const allProblemsData = [...allProblems, ...mockProblems];

  // Define table columns
  const columns: DataTableColumn<ExtendedProblem>[] = [
    {
      key: 'title',
      header: 'Problem',
      sortable: true,
      width: '300px',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="font-semibold">{value}</div>
          <div className="text-xs text-muted-foreground line-clamp-2">
            {row.description}
          </div>
        </div>
      ),
    },
    {
      key: 'difficulty',
      header: 'Difficulty',
      sortable: true,
      filterable: true,
      width: '120px',
      render: (value) => {
        const difficultyColors = {
          Easy: 'bg-green-100 text-green-700 border-green-200',
          Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          Hard: 'bg-red-100 text-red-700 border-red-200',
        };
        return (
          <span className={`px-2 py-1 rounded text-xs border ${difficultyColors[value as keyof typeof difficultyColors]}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'topicTitle',
      header: 'Topic',
      sortable: true,
      filterable: true,
      width: '120px',
      render: (value) => (
        <span className="text-sm text-muted-foreground">{value}</span>
      ),
    },
    {
      key: 'patternTitle',
      header: 'Pattern',
      sortable: true,
      filterable: true,
      width: '150px',
      render: (value) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      width: '120px',
      render: (value) => {
        const statusColors = {
          'Available': 'bg-green-100 text-green-700 border-green-200',
          'Coming Soon': 'bg-gray-100 text-gray-700 border-gray-200',
        };
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${value === 'Available' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className={`px-2 py-1 rounded text-xs border ${statusColors[value as keyof typeof statusColors]}`}>
              {value}
            </span>
          </div>
        );
      },
    },
    {
      key: 'hasVisualizer',
      header: 'Actions',
      width: '150px',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.hasVisualizer ? (
            <Button size="sm" asChild>
              <Link href={row.route}>
                <PlayCircle className="w-4 h-4 mr-1" />
                Practice
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              <ExternalLink className="w-4 h-4 mr-1" />
              Soon
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Define filters
  const filters: DataTableFilter[] = [
    {
      key: 'difficulty',
      label: 'All Difficulties',
      options: [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
      ],
    },
    {
      key: 'topicTitle',
      label: 'All Topics',
      options: [
        { value: 'Arrays', label: 'Arrays' },
        { value: 'Strings', label: 'Strings' },
        { value: 'Linked Lists', label: 'Linked Lists' },
        { value: 'Trees', label: 'Trees' },
        { value: 'Hash Maps', label: 'Hash Maps' },
      ],
    },
    {
      key: 'status',
      label: 'All Statuses',
      options: [
        { value: 'Available', label: 'Available' },
        { value: 'Coming Soon', label: 'Coming Soon' },
      ],
    },
  ];

  // Calculate statistics
  const availableCount = allProblemsData.filter(p => p.hasVisualizer).length;
  const totalCount = allProblemsData.length;
  const difficultyStats = allProblemsData.reduce(
    (acc, problem) => {
      acc[problem.difficulty.toLowerCase()]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 } as Record<string, number>
  );

  return (
    <div className="container mx-auto p-6 space-y-6 max-h-screen overflow-y-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">DSA Problems</h1>
        <p className="text-muted-foreground">
          Browse and practice Data Structures & Algorithms problems with interactive visualizations.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
          <div className="text-sm text-muted-foreground">Total Problems</div>
        </div>
        <div className="p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-green-600">{availableCount}</div>
          <div className="text-sm text-muted-foreground">Available Now</div>
        </div>
        <div className="p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-green-500">{difficultyStats.easy}</div>
          <div className="text-sm text-muted-foreground">Easy</div>
        </div>
        <div className="p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-yellow-500">{difficultyStats.medium}</div>
          <div className="text-sm text-muted-foreground">Medium</div>
        </div>
        <div className="p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-red-500">{difficultyStats.hard}</div>
          <div className="text-sm text-muted-foreground">Hard</div>
        </div>
      </div>

      {/* Problems Table */}
      <DataTable
        data={allProblemsData}
        columns={columns}
        filters={filters}
        searchable={true}
        searchPlaceholder="Search problems..."
        pagination={{
          enabled: true,
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50]
        }}
        statusIndicator={{
          total: totalCount,
          active: availableCount,
          label: 'Available'
        }}
        className="w-full"
      />
    </div>
  );
}