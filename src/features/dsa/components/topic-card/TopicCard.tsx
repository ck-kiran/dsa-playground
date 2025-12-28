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
    <Link href={`/${topic.id}`} className="block h-full">
      <div className="group relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:-translate-y-1 h-full">
        <div className="flex flex-col h-full">
          {/* Mock browser window */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6 h-32 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-primary/30 dark:bg-primary/40 rounded w-3/4"></div>
              <div className="h-2 bg-primary/30 dark:bg-primary/40 rounded w-1/2"></div>
              <div className="h-2 bg-primary/30 dark:bg-primary/40 rounded w-2/3"></div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-2xl font-bold mb-4 text-primary">
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {topic.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {topic.description}
            </p>
            <div className="text-sm text-primary font-medium">
              {topic.patterns.length} Patterns Available
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
