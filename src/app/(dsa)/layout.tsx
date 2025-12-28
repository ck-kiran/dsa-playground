import { DsaSidebar } from '@/shared/components/DsaSidebar';

export default function DsaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex z-40 bg-background">
      <DsaSidebar />
      <main className="flex-1 w-full overflow-hidden relative">{children}</main>
    </div>
  );
}