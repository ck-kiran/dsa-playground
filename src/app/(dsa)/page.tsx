'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import { TopicCard } from '@/shared/components/TopicCard';
import { useDomain } from '@/shared/hooks/useDomain';

export default function DsaPage() {
  const { topics } = useDomain();

  return (
    <PageLayout
      title="DSA Dashboard"
      description="Welcome to the DSA Playground. Select a topic from the sidebar or from the list below to start exploring interactive visualizations and practice problems."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </PageLayout>
  );
}
