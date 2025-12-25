'use client';

import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LayoutList,
  Type,
  Link as LinkIcon,
  Network,
  Calculator,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { dsaTopics } from '@/features/dsa/data/topics';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutList: LayoutList,
  Type: Type,
  Link: LinkIcon,
  Network: Network,
  Calculator: Calculator,
};

export function DsaSidebar() {
  const pathname = usePathname();
  const [expandedTopics, setExpandedTopics] = React.useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  // Auto-expand topic based on current path
  React.useEffect(() => {
    const currentTopic = dsaTopics.find(topic => pathname.startsWith(`/${topic.id}`));
    if (currentTopic && !expandedTopics.includes(currentTopic.id)) {
      setExpandedTopics(prev => [...prev, currentTopic.id]);
    }
  }, [pathname]);

  const toggleTopic = (topicId: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setExpandedTopics([topicId]);
      return;
    }
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  return (
    <aside
      className={cn(
        'border-r bg-card/30 h-full overflow-y-auto hidden md:flex flex-col transition-all duration-300 ease-in-out z-[60]',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div
        className={cn(
          'h-16 flex items-center px-3 border-b border-border/50 shrink-0',
          isCollapsed ? 'flex-col justify-center gap-2' : 'justify-between'
        )}
      >
        <Button variant="ghost" size="icon" asChild className="h-8 w-8" title="Back to Portfolio">
          <a href="/">
            <ArrowLeft className="w-4 h-4" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="p-3 space-y-4 flex-1">
        <div className="space-y-1">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              pathname === '/'
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground',
              isCollapsed && 'justify-center px-0'
            )}
            title={isCollapsed ? 'Dashboard' : undefined}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            href="/problems"
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              pathname === '/problems'
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground',
              isCollapsed && 'justify-center px-0'
            )}
            title={isCollapsed ? 'All Problems' : undefined}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>All Problems</span>}
          </Link>
        </div>

        <div className="space-y-1">
          {!isCollapsed && (
            <h4 className="px-3 text-xs font-semibold text-muted-foreground mb-2 mt-4 tracking-wider uppercase">
              Topics
            </h4>
          )}
          {dsaTopics.map(topic => {
            const isExpanded = expandedTopics.includes(topic.id);
            const TopicIcon = iconMap[topic.icon] || LayoutList;

            const isChildActive = topic.patterns.some(pattern =>
              pathname.startsWith(`/${topic.id}/${pattern.id}`)
            );
            const isTopicActive = pathname === `/${topic.id}`;

            return (
              <div key={topic.id} className="space-y-1">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors group',
                    isTopicActive || isChildActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                    isCollapsed && 'justify-center px-0'
                  )}
                  title={isCollapsed ? topic.title : undefined}
                >
                  <div className="flex items-center gap-3">
                    <TopicIcon className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                    {!isCollapsed && <span>{topic.title}</span>}
                  </div>
                  {!isCollapsed &&
                    (isExpanded ? (
                      <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                    ))}
                </button>

                {!isCollapsed && isExpanded && (
                  <div className="pl-4 space-y-1 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-border">
                    {topic.patterns.map(pattern => {
                      const patternPath = `/${topic.id}/${pattern.id}`;
                      const isPatternActive = pathname.startsWith(patternPath);
                      return (
                        <Link
                          key={pattern.id}
                          href={patternPath}
                          className={cn(
                            'block px-3 py-2 text-sm rounded-md transition-colors ml-3 relative',
                            isPatternActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                          )}
                        >
                          {pattern.title}
                        </Link>
                      );
                    })}
                    {topic.patterns.length === 0 && (
                      <div className="px-3 py-2 text-xs text-muted-foreground italic ml-3">
                        Coming soon
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
