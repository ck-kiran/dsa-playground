// Re-export types and data from the new domain system
export type { Problem, Pattern, Topic } from '@/shared/types/domain';
import { DomainRegistry } from '@/shared/services/domainRegistry';

// Backward compatibility export
export const dsaTopics = DomainRegistry.getAllTopics();

// Re-export the DomainRegistry for other components that might need it
export { DomainRegistry };
