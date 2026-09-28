export type DarkPatternType =
  | 'hidden_button'
  | 'phone_gate'
  | 'retention_maze'
  | 'delay_tactic';

export type ServiceCategory =
  | 'Streaming'
  | 'Gyms'
  | 'SaaS'
  | 'Cloud'
  | 'News Media';

export interface ServiceRecord {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  darkPatternType: DarkPatternType;
  directBypassUrl: string;
  standardUrl: string;
  bypassSteps: string[];
  retentionOfferWorkaround: string;
  legalStatuteReference: string;
  averageCancellationTimeMinutes: number;
  phoneContactFallback?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface LegalDemandData {
  userName: string;
  userEmail: string;
  serviceName: string;
  accountIdentifier: string;
  billingDate: string;
  lastFourDigits?: string;
  userAddress?: string;
  effectiveDate: string;
  statutoryBasis: 'CARL_BPC_17600' | 'ROSCA_FTC_RULE' | 'COMBINED_FEDERAL_STATE';
}

export interface DarkPatternReport {
  id: string;
  serviceName: string;
  serviceUrl: string;
  patternType: DarkPatternType;
  description: string;
  stepsEncountered: string;
  submittedAt: string;
}
