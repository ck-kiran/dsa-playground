'use client';

import { Play } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { DataTable, DataTableColumn, DataTableFilter } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { useDomain } from '@/shared/hooks/useDomain';
import { Problem } from '@/shared/types/domain';
import { getVisualizerStatus } from '@/shared/utils/constants';

interface ExtendedProblem extends Problem {
  route: string;
  hasVisualizer: boolean;
  status: 'Available' | 'Coming Soon';
}

export default function PatternPage({
  params,
}: {
  params: Promise<{ topic: string; pattern: string }>;
}) {
  const resolvedParams = use(params);
  const { getTopicById, getPatternById } = useDomain();
  const topic = getTopicById(resolvedParams.topic);
  const pattern = getPatternById(resolvedParams.topic, resolvedParams.pattern);

  if (!topic || !pattern) {
    notFound();
  }

  // Transform problems data for the table
  const problemsData: ExtendedProblem[] = pattern.problems.map(problem => {
    const hasVisualizer = getVisualizerStatus(problem.id) === 'Available';
    return {
      ...problem,
      route: `/${topic.id}/${pattern.id}/${problem.id}`,
      hasVisualizer,
      status: hasVisualizer ? 'Available' : 'Coming Soon'
    };
  });

  // Define table columns
  const columns: DataTableColumn<ExtendedProblem>[] = [
    {
      key: 'title',
      header: 'Problem',
      sortable: true,
      width: '300px',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="font-semibold text-base">{value}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
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
          Easy: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400',
          Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
          Hard: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400',
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[value as keyof typeof difficultyColors]}`}>
            {value}
          </span>
        );
      },
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
      header: 'Action',
      width: '150px',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.hasVisualizer ? (
            <Button size="sm" asChild>
              <Link href={row.route}>
                <Play className="w-4 h-4 mr-1" />
                Solve
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Generate dynamic filters
  const uniqueDifficulties = [...new Set(problemsData.map(p => p.difficulty))].sort();
  const uniqueStatuses = [...new Set(problemsData.map(p => p.status))].sort();

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
      key: 'status',
      label: 'All Statuses',
      options: uniqueStatuses.map(status => ({
        value: status,
        label: status
      })),
    },
  ];

  // Calculate statistics
  const availableCount = problemsData.filter(p => p.hasVisualizer).length;
  const totalCount = problemsData.length;
  const difficultyStats = problemsData.reduce(
    (acc, problem) => {
      acc[problem.difficulty.toLowerCase()]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 } as Record<string, number>
  );

  return (
    <PageLayout
      title={pattern.title}
      description={pattern.description}
      breadcrumbs={[
        { label: 'DSA Dashboard', href: '/' },
        { label: topic.title, href: `/${topic.id}` },
        { label: pattern.title }
      ]}
    >

      {/* Problems Table */}
      <DataTable
        data={problemsData}
        columns={columns}
        filters={filters}
        searchable={true}
        searchPlaceholder="Search problems..."
        pagination={{
          enabled: false,
          pageSize: 10
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
