import { notFound } from 'next/navigation';

import { dsaTopics } from '@/features/dsa/data/topics';
import { DsaPlaygroundPage } from '@/features/dsa/pages/DsaPlaygroundPage';

export async function generateStaticParams() {
  const params = [];
  for (const topic of dsaTopics) {
    for (const pattern of topic.patterns) {
      for (const problem of pattern.problems) {
        params.push({
          topic: topic.id,
          pattern: pattern.id,
          problemId: problem.id,
        });
      }
    }
  }
  return params;
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ topic: string; pattern: string; problemId: string }>;
}) {
  const resolvedParams = await params;
  const topic = dsaTopics.find(t => t.id === resolvedParams.topic);
  if (!topic) return notFound();

  const pattern = topic.patterns.find(p => p.id === resolvedParams.pattern);
  if (!pattern) return notFound();

  const problem = pattern.problems.find(p => p.id === resolvedParams.problemId);
  if (!problem) return notFound();

  // Check if we have a visualizer for this problem
  const availableVisualizers = [
    'binary-search-visualizer',
    'two-sum-visualizer',
    'string-search-visualizer',
    'reverse-list-visualizer',
    'tree-traversal-visualizer'
  ];

  if (availableVisualizers.includes(problem.id)) {
    return <DsaPlaygroundPage problemId={problem.id} />;
  }

  return (
    <div className="max-w-7xl mx-auto py-20 text-center">
      <h1 className="text-2xl font-bold">{problem.title}</h1>
      <p className="text-muted-foreground mt-4">
        Visualizer for this problem is under construction.
      </p>
    </div>
  );
}
