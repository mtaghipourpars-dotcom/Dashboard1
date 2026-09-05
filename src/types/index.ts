export type Language = 'fa' | 'en';

export type StrategicProfile = 
  | 'BALANCED' 
  | 'CASH_CRISIS' 
  | 'DELIVERY_CRISIS' 
  | 'MARGIN_PROTECTION';

export type ResourceCategory = 'MACHINE' | 'WORK_CREW' | 'TOOLING' | 'FACILITY';
export type CriticalityClass = 'A_CRITICAL' | 'B_IMPORTANT' | 'C_NORMAL';

export interface ResourceNode {
  resourceId: string;
  sapWorkCenter: string;
  name: string;
  nameEn: string;
  category: ResourceCategory;
  criticality: CriticalityClass;
  isBottleneck: boolean;
  shop: string;
  shopEn: string;
  nominalHourlyCostIRR: number;
  overtimeHourlyCostIRR: number;
  mtbfHours: number;
  mttrHours: number;
  operationalAvailability: number;
  maxWorkpieceWeightTon: number;
  toleranceMm: number;
  energyRestricted: boolean;
  currentStatus: 'OPERATIONAL' | 'DEGRADED' | 'DISRUPTED' | 'MAINTENANCE';
  activeDisruption?: {
    cause: string;
    startDate: string;
    expectedDays: number;
  };
}

export interface ProductionOperation {
  operationId: string;
  sapProdOrder: string;
  sapOpCode: string;
  description: string;
  descriptionEn: string;
  allocatedResourceId: string;
  projectId: string;
  wbsElement: string;
  plannedSetupHours: number;
  plannedMachiningHours: number;
  sequenceNumber: number;
  status: 'PENDING' | 'RELEASED' | 'IN_PROGRESS' | 'CONFIRMED';
  predecessorOpId?: string;
  successorOpId?: string;
  currentProgressPct: number;
}

export interface ProductionOrder {
  orderId: string;
  projectId: string;
  componentName: string;
  componentNameEn: string;
  targetQty: number;
  status: 'OPEN' | 'RELEASED' | 'DELAYED' | 'COMPLETED';
  operations: string[];
}

export interface CommitmentNode {
  commitmentId: string;
  projectId: string;
  wbsElement: string;
  title: string;
  titleEn: string;
  type: 'CUSTOMER_DELIVERY' | 'BILLING_MILESTONE' | 'INTERNAL_SLA';
  baselineDate: string;
  criticalDeadline: string;
  financialValueIRR: number;
  dailyPenaltyIRR: number;
  status: 'SAFE' | 'AT_RISK' | 'BREACHED' | 'COMPLETED';
  cashInflowOnCompletionIRR: number;
  requiredOperationIds: string[];
}

export interface CashFlowEvent {
  eventId: string;
  projectId: string;
  commitmentRef: string;
  direction: 'INFLOW' | 'OUTFLOW';
  amountIRR: number;
  scheduledDate: string;
  actualDate?: string;
  description: string;
  descriptionEn: string;
  cleared: boolean;
}

export interface ProjectEntity {
  projectId: string;
  sapProjectCode: string;
  name: string;
  nameEn: string;
  client: string;
  clientEn: string;
  powerRatingMW: number;
  type: 'MGT-70_160MW' | 'CLASS_F_324MW' | 'HYDRO_OVERHAUL';
  contractValueIRR: number;
  baselineDeliveryDate: string;
  forecastDeliveryDate: string;
  status: 'ON_TRACK' | 'AT_RISK' | 'CRITICAL';
  commitments: CommitmentNode[];
  productionOrders: ProductionOrder[];
}

export interface DisruptionInput {
  resourceId: string;
  resourceName?: string;
  downtimeDays: number;
  cause: string;
  causeEn?: string;
  startDate?: string;
  estimatedResolutionDate?: string;
  startOffsetDays?: number;
  strategicProfile?: StrategicProfile;
}

export interface ImpactSummary {
  disruptedResource: ResourceNode;
  downtimeDays: number;
  affectedOperations: ProductionOperation[];
  affectedProductionOrders: ProductionOrder[];
  affectedProjects: ProjectEntity[];
  affectedCommitments: CommitmentNode[];
  rawDelayDays: number;
  totalPenaltyRiskIRR: number;
  delayedCashInflowIRR: number;
  dailyPenaltyBurnRateIRR: number;
  maxProjectDelayDays: number;
}

export interface AlternativeOption {
  id: string;
  title: string;
  titleEn: string;
  strategy: 'REPAIR' | 'OUTSOURCE' | 'REALLOCATE' | 'RESEQUENCE';
  description: string;
  descriptionEn: string;
  directCostIRR: number;
  scheduleDelayDays: number;
  penaltiesIncurredIRR: number;
  cashImpactDeltaIRR: number;
  technicalRisk: number; // 1 to 5
  executionConfidence: number; // 0 to 100%
  compositeScore: number;
  isFeasible: boolean;
  constraintFlags: string[];
  constraintFlagsEn: string[];
  actionSteps: string[];
  actionStepsEn: string[];
  sapExecutionInstructions: string[];
  recommended: boolean;
}

export interface CouncilMember {
  id: string;
  role: string;
  roleEn: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  stance: 'APPROVE' | 'CONDITIONAL' | 'OBJECT' | 'CAUTION';
  comment: string;
  commentEn: string;
  vetoTriggered?: boolean;
  keyQuestion: string;
  keyQuestionEn: string;
  avatarColor: string;
}

export interface DecisionPackage {
  decisionId: string;
  timestamp: string;
  disruption: DisruptionInput;
  impact: ImpactSummary;
  alternatives: AlternativeOption[];
  recommendedAlternative: AlternativeOption;
  verdict: 'GO' | 'CONDITIONAL_GO' | 'REJECT';
  verdictReason: string;
  verdictReasonEn: string;
  prerequisites: string[];
  prerequisitesEn: string[];
  councilDeliberation: CouncilMember[];
  strategicProfile: StrategicProfile;
  confidenceScore: number;
}

export interface HistoricalDecisionLog {
  logId: string;
  date: string;
  disruptionSummary: string;
  disruptionSummaryEn: string;
  selectedAlternative: string;
  rationale: string;
  rationaleEn: string;
  predictedOutcome: {
    delayDays: number;
    costIRR: number;
    cashDelayDays: number;
  };
  actualOutcome: {
    delayDays: number;
    costIRR: number;
    cashDelayDays: number;
  };
  learningLesson: string;
  learningLessonEn: string;
}

export interface LearningRecord {
  id: string;
  date: string;
  decisionRef: string;
  resourceId: string;
  alternativeChosen: string;
  predictedDelayDays: number;
  actualDelayDays: number;
  predictedCostIRR: number;
  actualCostIRR: number;
  varianceReason: string;
  varianceReasonEn: string;
  lessonLearned: string;
  lessonLearnedEn: string;
  modelAdjustmentMade: string;
}

export interface SapTableMapping {
  sapTable?: string;
  tableName?: string;
  sapDescription?: string;
  description?: string;
  cdsView: string;
  rfcOrBapi: string;
  canonicalEntity: string;
  refreshFrequency?: string;
  extractionSchedule?: string;
  freshnessSLA?: string;
  module?: string;
  keyFields: string[];
  extractionMethod?: string;
  transformationLogic?: string;
}
