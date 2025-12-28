import type { ProblemModule } from '@/shared/types/problem';
import * as domains from '@/domains';

// Auto-discovery: Extract all problem modules from domains barrel export
const allProblemModules = Object.values(domains).filter(
  (module): module is ProblemModule =>
    module != null && typeof module === 'object' && 'config' in module && 'generateSteps' in module && 'Visualizer' in module
);

// Build registry from auto-discovered modules
const problemModules = new Map<string, ProblemModule>();

allProblemModules.forEach(module => {
  if (module?.config?.id) {
    problemModules.set(module.config.id, module);
  }
});

// Problem registry with auto-discovered modules
export const problemRegistry = {
  get(problemId: string): ProblemModule | undefined {
    return problemModules.get(problemId);
  },

  getAll(): Array<[string, ProblemModule]> {
    return Array.from(problemModules.entries());
  },

  getAllIds(): string[] {
    return Array.from(problemModules.keys());
  },

  has(problemId: string): boolean {
    return problemModules.has(problemId);
  }
};