import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProblemInputControlsProps {
  problemId: string;
  inputs: Record<string, unknown>;
  onChange: (inputs: Record<string, unknown>) => void;
}

export function ProblemInputControls({ problemId, inputs, onChange }: ProblemInputControlsProps) {
  const handleTargetChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      onChange({ ...inputs, target: numValue });
    }
  };

  const handleTextChange = (value: string) => {
    onChange({ ...inputs, text: value });
  };

  const handlePatternChange = (value: string) => {
    onChange({ ...inputs, pattern: value });
  };

  const handleTraversalTypeChange = (value: string) => {
    onChange({ ...inputs, traversalType: value });
  };

  switch (problemId) {
    case 'binary-search-visualizer':
    case 'two-sum-visualizer':
      return (
        <div className="flex items-center gap-2 mr-2">
          <Label
            htmlFor="visualizer-target"
            className="text-xs text-muted-foreground whitespace-nowrap"
          >
            Target Value:
          </Label>
          <Input
            type="number"
            id="visualizer-target"
            value={inputs.target as number || 0}
            onChange={(e) => handleTargetChange(e.target.value)}
            className="h-7 w-20 text-xs bg-background"
          />
        </div>
      );

    case 'string-search-visualizer':
      return (
        <>
          <div className="flex items-center gap-2 mr-2">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">
              Text:
            </Label>
            <Input
              type="text"
              value={inputs.text as string || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              className="h-7 w-32 text-xs bg-background"
            />
          </div>
          <div className="flex items-center gap-2 mr-2">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">
              Pattern:
            </Label>
            <Input
              type="text"
              value={inputs.pattern as string || ''}
              onChange={(e) => handlePatternChange(e.target.value)}
              className="h-7 w-20 text-xs bg-background"
            />
          </div>
        </>
      );

    case 'tree-traversal-visualizer':
      return (
        <div className="flex items-center gap-2 mr-2">
          <Label className="text-xs text-muted-foreground whitespace-nowrap">
            Type:
          </Label>
          <select
            value={inputs.traversalType as string || 'inorder'}
            onChange={(e) => handleTraversalTypeChange(e.target.value)}
            className="h-7 text-xs bg-background border border-input rounded-md px-2"
          >
            <option value="inorder">Inorder</option>
            <option value="preorder">Preorder</option>
            <option value="postorder">Postorder</option>
          </select>
        </div>
      );

    default:
      return null;
  }
}