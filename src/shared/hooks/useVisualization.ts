import { useState, useCallback } from 'react';
import { DomainRegistry } from '../services/domainRegistry';
import { Step } from '../types/step';

interface UseVisualizationOptions {
  topicId: string;
  patternId: string;
  problemId: string;
}

export function useVisualization({ topicId, patternId, problemId }: UseVisualizationOptions) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizer, setVisualizer] = useState<React.ComponentType<any> | null>(null);

  const loadVisualization = useCallback(async () => {
    try {
      const module = await DomainRegistry.getVisualizer(topicId, patternId, problemId);
      if (module) {
        // Extract the visualizer component - it could have different names
        const VisualizerComponent =
          module.BinarySearchVisualizer ||
          module.TwoSumVisualizer ||
          module.TreeVisualizer ||
          module.default;

        setVisualizer(() => VisualizerComponent);
      }
    } catch (error) {
      console.error('Failed to load visualization:', error);
    }
  }, [topicId, patternId, problemId]);

  const generateSteps = useCallback(async (...args: any[]) => {
    try {
      const algorithmSteps = await DomainRegistry.getAlgorithmSteps(topicId, patternId, problemId, ...args);
      setSteps(algorithmSteps);
      setCurrentStep(0);
    } catch (error) {
      console.error('Failed to generate steps:', error);
    }
  }, [topicId, patternId, problemId]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((stepIndex: number) => {
    setCurrentStep(Math.max(0, Math.min(stepIndex, steps.length - 1)));
  }, [steps.length]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return {
    steps,
    currentStep,
    isPlaying,
    visualizer,
    totalSteps: steps.length,
    currentStepData: steps[currentStep],
    loadVisualization,
    generateSteps,
    nextStep,
    prevStep,
    goToStep,
    reset,
    setIsPlaying,
  };
}