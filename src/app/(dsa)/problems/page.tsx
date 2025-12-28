'use client';

import Link from 'next/link';
import { ExternalLink, PlayCircle } from 'lucide-react';

import { PageLayout } from '@/components/layout/PageLayout';
import { DataTable, DataTableColumn, DataTableFilter } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { useDomain } from '@/shared/hooks/useDomain';
import { Problem } from '@/shared/types/domain';
import { getVisualizerStatus } from '@/shared/utils/constants';

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
  const { topics } = useDomain();

  // Flatten all problems from all topics and patterns
  const allProblems: ExtendedProblem[] = topics.flatMap((topic) =>
    topic.patterns.flatMap((pattern) =>
      pattern.problems.map((problem) => {
        const hasVisualizer = getVisualizerStatus(problem.id) === 'Available';

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

  const allProblemsData = allProblems;

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

  // Generate dynamic filters based on actual data
  const uniqueTopics = [...new Set(allProblemsData.map(p => p.topicTitle))].sort();
  const uniqueDifficulties = [...new Set(allProblemsData.map(p => p.difficulty))].sort();
  const uniqueStatuses = [...new Set(allProblemsData.map(p => p.status))].sort();

  const filters: DataTableFilter[] = [
    {
      key: 'difficulty',
      label: 'All Difficulties',
      options: uniqueDifficulties.map(difficulty => ({
        value: difficulty,
        label: difficulty
      })),
    },
    {
      key: 'topicTitle',
      label: 'All Topics',
      options: uniqueTopics.map(topic => ({
        value: topic,
        label: topic
      })),
    },
    {
      key: 'status',
      label: 'All Statuses',
      options: uniqueStatuses.map(status => ({
        value: status,
        label: status
      })),
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
    <PageLayout
      title="DSA Problems"
      description="Browse and practice Data Structures & Algorithms problems with interactive visualizations."
      breadcrumbs={[
        { label: 'DSA Dashboard', href: '/' },
        { label: 'Problems' }
      ]}
    >
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
    </PageLayout>
  );
}