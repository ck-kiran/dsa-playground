/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const BINARY_SEARCH_CODE = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`;

interface CodeEditorProps {
  initialCode?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export function CodeEditor({ initialCode, onChange, readOnly = false }: CodeEditorProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] w-full border rounded-md overflow-hidden shadow-sm bg-muted animate-pulse" />
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const editorTheme = currentTheme === 'dark' ? 'vs-dark' : 'light';

  return (
    <div className="h-full w-full border rounded-md overflow-hidden shadow-sm">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={initialCode || BINARY_SEARCH_CODE}
        theme={editorTheme}
        onChange={onChange}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}