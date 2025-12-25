import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { dsaTopics } from '@/features/dsa/data/topics';

export async function generateStaticParams() {
  return dsaTopics.map(topic => ({
    topic: topic.id,
  }));
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const topic = dsaTopics.find(t => t.id === resolvedParams.topic);

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-8 overflow-y-auto h-full">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 capitalize">{topic.title}</h1>
        <p className="text-xl text-muted-foreground">{topic.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {topic.patterns.length > 0 ? (
          topic.patterns.map(pattern => (
            <Link
              key={pattern.id}
              href={`/dsa/${topic.id}/${pattern.id}`}
              className="group p-6 bg-card border rounded-xl hover:border-primary transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                {pattern.title}
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h2>
              <p className="text-muted-foreground mb-4">{pattern.description}</p>
              <div className="text-sm font-medium text-primary">
                {pattern.problems.length} Problems
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 border border-dashed rounded-xl">
            <p className="text-muted-foreground text-lg">More patterns coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
