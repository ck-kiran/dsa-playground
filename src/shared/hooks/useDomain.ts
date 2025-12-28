import { useCallback, useMemo } from 'react';
import { DomainRegistry } from '../services/domainRegistry';

export function useDomain() {
  const topics = useMemo(() => DomainRegistry.getAllTopics(), []);

  const getTopicById = useCallback((id: string) => {
    return DomainRegistry.getTopicById(id);
  }, []);

  const getPatternById = useCallback((topicId: string, patternId: string) => {
    return DomainRegistry.getPatternById(topicId, patternId);
  }, []);

  const getProblemById = useCallback((topicId: string, patternId: string, problemId: string) => {
    return DomainRegistry.getProblemById(topicId, patternId, problemId);
  }, []);

  const getAllProblems = useCallback(() => {
    return DomainRegistry.getAllProblems();
  }, []);

  return {
    topics,
    getTopicById,
    getPatternById,
    getProblemById,
    getAllProblems,
  };
}