import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DsaSidebar } from '@/features/dsa/components/sidebar/DsaSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DSA Playground',
  description: 'Interactive Data Structures and Algorithms Visualizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed inset-0 flex z-40 bg-background">
          <DsaSidebar />
          <main className="flex-1 w-full overflow-hidden relative">{children}</main>
        </div>
      </body>
    </html>
  );
}
