import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect, useCallback, useState } from 'react';

import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, title, description, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-950',
    error: 'bg-red-50 dark:bg-red-950',
    info: 'bg-blue-50 dark:bg-blue-950',
    warning: 'bg-yellow-50 dark:bg-yellow-950',
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-start gap-3 max-w-sm transition-all',
        bgColors[type],
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      )}
    >
      {icons[type]}
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose(id);
        }}
        className="hover:bg-white/20 rounded p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Manager Hook
// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [
      ...prev,
      {
        ...props,
        id,
        onClose: (id: string) => {
          setToasts(prev => prev.filter(t => t.id !== id));
        },
      },
    ]);
  }, []);

  return { toasts, addToast };
}
