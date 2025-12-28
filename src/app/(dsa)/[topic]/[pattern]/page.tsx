import { Play } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { dsaTopics } from '@/features/dsa/data/topics';

export async function generateStaticParams() {
  const params = [];
  for (const topic of dsaTopics) {
    for (const pattern of topic.patterns) {
      params.push({
        topic: topic.id,
        pattern: pattern.id,
      });
    }
  }
  return params;
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ topic: string; pattern: string }>;
}) {
  const resolvedParams = await params;
  const topic = dsaTopics.find(t => t.id === resolvedParams.topic);
  const pattern = topic?.patterns.find(p => p.id === resolvedParams.pattern);

  if (!topic || !pattern) {
    notFound();
  }

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
      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Problem</th>
                <th className="px-6 py-4 font-medium">Difficulty</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pattern.problems.length > 0 ? (
                pattern.problems.map(problem => (
                  <tr key={problem.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-base">{problem.title}</div>
                      <div className="text-muted-foreground line-clamp-1">
                        {problem.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                          ${problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                          ${problem.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                        `}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/${topic.id}/${pattern.id}/${problem.id}`}>
                          Solve <Play className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                    No problems added to this pattern yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
