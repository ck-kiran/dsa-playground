'use client';

import { DsaPlaygroundPage } from '@/features/dsa/pages/DsaPlaygroundPage';

interface DsaPlaygroundExportProps {
  problemId?: string;
}

export function DsaPlaygroundExport({ problemId = 'binary-search-visualizer' }: DsaPlaygroundExportProps) {
  return <DsaPlaygroundPage problemId={problemId} />;
}

export default DsaPlaygroundExport;