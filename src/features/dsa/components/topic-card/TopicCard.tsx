import { LayoutList, Type, Link as LinkIcon, Network, Share2, Calculator } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import type { Topic } from '../../data/topics';

const icons: Record<string, React.ElementType> = {
  LayoutList,
  Type,
  Link: LinkIcon,
  Network,
  Share2,
  Calculator,
};

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const Icon = icons[topic.icon] || LayoutList;

  return (
    <Link
      href={`/${topic.id}`}
      className="block p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">{topic.title}</h3>
      </div>
      <p className="text-muted-foreground">{topic.description}</p>
      <div className="mt-4 text-sm text-primary font-medium">
        {topic.patterns.length} Patterns Available
      </div>
    </Link>
  );
}
