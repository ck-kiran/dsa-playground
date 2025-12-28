import { RotateCcw, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ControlsProps {
  onNext: () => void;
  onReset: () => void;
  canNext: boolean;
  currentStepIndex: number;
  totalSteps: number;
}

export function Controls({
  onNext,
  onReset,
  canNext,
  currentStepIndex,
  totalSteps,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg border">
      <div className="text-sm font-medium text-muted-foreground">
        Step {currentStepIndex + 1} of {totalSteps}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset} size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button onClick={onNext} disabled={!canNext} size="sm">
          Next Step
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}