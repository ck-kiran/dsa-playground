import { Topic, DomainConfig } from '../types/domain';

// Import all domains
import { arraysTopic } from '../../domains/arrays';
import { stringsTopic } from '../../domains/strings';
import { linkedListsTopic } from '../../domains/linked-lists';
import { treesTopic } from '../../domains/trees';
import { hashMapsTopic } from '../../domains/hash-maps';

export class DomainRegistry {
  private static topics: Topic[] = [
    arraysTopic,
    stringsTopic,
    linkedListsTopic,
    treesTopic,
    hashMapsTopic,
  ];

  static getAllTopics(): Topic[] {
    return this.topics;
  }

  static getTopicById(id: string): Topic | undefined {
    return this.topics.find(topic => topic.id === id);
  }

  static getPatternById(topicId: string, patternId: string) {
    const topic = this.getTopicById(topicId);
    return topic?.patterns.find(pattern => pattern.id === patternId);
  }

  static getProblemById(topicId: string, patternId: string, problemId: string) {
    const pattern = this.getPatternById(topicId, patternId);
    return pattern?.problems.find(problem => problem.id === problemId);
  }

  static getAllProblems() {
    const allProblems: Array<{
      topic: Topic;
      pattern: any;
      problem: any;
      route: string;
    }> = [];

    this.topics.forEach(topic => {
      topic.patterns.forEach(pattern => {
        pattern.problems.forEach(problem => {
          allProblems.push({
            topic,
            pattern,
            problem,
            route: `/${topic.id}/${pattern.id}/${problem.id}`,
          });
        });
      });
    });

    return allProblems;
  }

  // For dynamic visualization loading
  static async getVisualizer(topicId: string, patternId: string, problemId: string) {
    try {
      const visualizerPath = `../../domains/${topicId}/${patternId}/${problemId}`;
      const module = await import(visualizerPath);
      return module;
    } catch (error) {
      console.warn(`Visualizer not found for ${topicId}/${patternId}/${problemId}`);
      return null;
    }
  }

  static async getAlgorithmSteps(topicId: string, patternId: string, problemId: string, ...args: any[]) {
    try {
      const algorithmPath = `../../domains/${topicId}/${patternId}/algorithm`;
      const module = await import(algorithmPath);

      // Find the step generator function
      const stepGeneratorName = this.getStepGeneratorName(problemId);
      const stepGenerator = module[stepGeneratorName];

      if (stepGenerator) {
        return stepGenerator(...args);
      }

      console.warn(`Step generator ${stepGeneratorName} not found`);
      return [];
    } catch (error) {
      console.warn(`Algorithm not found for ${topicId}/${patternId}/${problemId}`);
      return [];
    }
  }

  private static getStepGeneratorName(problemId: string): string {
    // Convert problemId to camelCase step generator function name
    const parts = problemId.split('-');
    const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return `generate${capitalizedParts.join('')}Steps`;
  }
}