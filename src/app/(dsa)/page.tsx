import { PageLayout } from '@/components/layout/PageLayout';
import { TopicCard } from '@/features/dsa/components/topic-card/TopicCard';
import { dsaTopics } from '@/features/dsa/data/topics';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DSA Dashboard',
  description: 'Master Data Structures and Algorithms with interactive visualizations.',
};

export default function DsaPage() {
  return (
    <PageLayout
      title="DSA Dashboard"
      description="Welcome to the DSA Playground. Select a topic from the sidebar or from the list below to start exploring interactive visualizations and practice problems."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {dsaTopics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </PageLayout>
  );
}
