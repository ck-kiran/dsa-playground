'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  breadcrumbs = [],
  children,
  className = ""
}: PageLayoutProps) {
  const allBreadcrumbs = [
    { label: 'Home', href: '/' },
    ...breadcrumbs
  ];

  return (
    <div className={`max-w-7xl mx-auto space-y-8 p-8 overflow-y-auto h-full ${className}`}>
      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {allBreadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index === 0 && <Home className="w-4 h-4" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
              {index < allBreadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="max-w-3xl text-muted-foreground text-lg">
            {description}
          </p>
        )}
      </div>

      {/* Page Content */}
      <div className="pb-20">
        {children}
      </div>
    </div>
  );
}