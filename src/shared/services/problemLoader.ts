import { problemRegistry, registerProblem } from './problemRegistry';

import { binarySearchModule } from '@/domains/arrays/binary-search/problem';
import { twoSumModule } from '@/domains/hash-maps/basic-hashing/problem';
import { stringSearchModule } from '@/domains/strings/pattern-matching/problem';
import { reverseListModule } from '@/domains/linked-lists/list-manipulation/problem';
import { treeTraversalModule } from '@/domains/trees/tree-traversal/problem';

let problemsLoaded = false;

export function loadAllProblems() {
  if (problemsLoaded) return;

  registerProblem('binary-search-visualizer', binarySearchModule);
  registerProblem('two-sum-visualizer', twoSumModule);
  registerProblem('string-search-visualizer', stringSearchModule);
  registerProblem('reverse-list-visualizer', reverseListModule);
  registerProblem('tree-traversal-visualizer', treeTraversalModule);

  problemsLoaded = true;
}

export function getProblemModule(problemId: string) {
  loadAllProblems();
  return problemRegistry.get(problemId);
}

export function getAllProblemIds() {
  loadAllProblems();
  return problemRegistry.getAllIds();
}

export function getAllProblems() {
  loadAllProblems();
  return problemRegistry.getAll();
}