'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';

import { useDomain } from '@/shared/hooks/useDomain';
import { getVisualizerStatus } from '@/shared/utils/constants';
import { DsaPlaygroundPage } from '@/shared/pages/DsaPlaygroundPage';

export default function ProblemPage({
  params,
}: {
  params: Promise<{ topic: string; pattern: string; problemId: string }>;
}) {
  const resolvedParams = use(params);
  const { getProblemById, getTopicById, getPatternById } = useDomain();

  const topic = getTopicById(resolvedParams.topic);
  if (!topic) return notFound();

  const pattern = getPatternById(resolvedParams.topic, resolvedParams.pattern);
  if (!pattern) return notFound();

  const problem = getProblemById(resolvedParams.topic, resolvedParams.pattern, resolvedParams.problemId);
  if (!problem) return notFound();

  // Check if we have a visualizer for this problem
  const isVisualizerAvailable = getVisualizerStatus(problem.id) === 'Available';

  if (isVisualizerAvailable) {
    return <DsaPlaygroundPage problemId={problem.id} topicId={resolvedParams.topic} patternId={resolvedParams.pattern} />;
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
