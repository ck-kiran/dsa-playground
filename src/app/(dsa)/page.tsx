import { TopicCard } from '@/features/dsa/components/topic-card/TopicCard';
import { dsaTopics } from '@/features/dsa/data/topics';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DSA Dashboard',
  description: 'Master Data Structures and Algorithms with interactive visualizations.',
};

export default function DsaPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 p-8 overflow-y-auto h-full">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">DSA Dashboard</h1>
        <p className="max-w-3xl text-muted-foreground text-lg">
          Welcome to the DSA Playground. Select a topic from the sidebar or from the list below to
          start exploring interactive visualizations and practice problems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {dsaTopics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
