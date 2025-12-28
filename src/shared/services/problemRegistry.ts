import type { ProblemModule } from '@/shared/types/problem';

// Problem registry to manage all problems dynamically
class ProblemRegistry {
  private problems = new Map<string, ProblemModule>();

  register(problemId: string, module: ProblemModule) {
    this.problems.set(problemId, module);
  }

  get(problemId: string): ProblemModule | undefined {
    return this.problems.get(problemId);
  }

  getAll(): Array<[string, ProblemModule]> {
    return Array.from(this.problems.entries());
  }

  getAllIds(): string[] {
    return Array.from(this.problems.keys());
  }

  has(problemId: string): boolean {
    return this.problems.has(problemId);
  }
}

// Global registry instance
export const problemRegistry = new ProblemRegistry();

// Helper to register problems
export function registerProblem(problemId: string, module: ProblemModule) {
  problemRegistry.register(problemId, module);
}