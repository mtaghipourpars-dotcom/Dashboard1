export type Language = 'fa' | 'en';

export type StrategicProfile = 
  | 'BALANCED' 
  | 'CASH_CRISIS' 
  | 'DELIVERY_CRISIS' 
  | 'MARGIN_PROTECTION';

export type CostOfCapitalScenario = 
  | 'BASE_24' 
  | 'STRESS_35' 
  | 'CRISIS_45';

export type ResourceCategory = 
  | 'MACHINE' 
  | 'PEOPLE_SKILL' 
  | 'CAPITAL_CASH' 
  | 'TOOLING_FIXTURE' 
  | 'SUPPLIER_VENDOR' 
  | 'LOGISTICS_TRANSPORT';

export type CriticalityClass = 'A_CRITICAL' | 'B_IMPORTANT' | 'C_NORMAL';

export interface FinancialMetric {
  value: number; // in Billion IRR (B IRR)
  currency: 'B_IRR' | 'M_IRR' | 'IRR';
  timeBasis: string;
  source: string;
  confidencePct: number;
  calculationLineage: string; // Lineage formula explaining exactly how the number is derived
}

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
  operationalAvailability: number; // nominal
  usableAvailability: number; // real usable capacity accounting for setup, maintenance, shift rules
  maxWorkpieceWeightTon: number;
  toleranceMm: number;
  energyRestricted: boolean;
  currentStatus: 'OPERATIONAL' | 'DEGRADED' | 'DISRUPTED' | 'MAINTENANCE';
  
  // Rich Industrial Resource Model
  spindleState?: string;
  tableDimensions?: string;
  craneCapacityRequirementTon?: number; // e.g. 100t crane needed for 80t workpiece
  powerRatingKVa?: number;
  operatorSkillCertifications?: string[];
  maintenanceState?: 'HEALTHY' | 'DUE_PM' | 'ALARM' | 'CRITICAL_FAILURE';
  calibrationState?: string;
  setupTimeHours?: number;
  currentCommitmentLoad?: string[]; // Commitment IDs actively relying on this resource
  activeIoTAlerts?: string[];

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
  financialValueIRR: number; // in IRR
  dailyPenaltyIRR: number;
  penaltyClauseRef: string;
  gracePeriodDays: number;
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
  category: 'INVOICE_MILESTONE' | 'PENALTY' | 'WORKING_CAPITAL_FINANCING' | 'EMERGENCY_COST';
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
  resourceCategory?: ResourceCategory;
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
  
  // Provenance-rich financial metrics
  penaltyExposureBestCase: FinancialMetric;
  penaltyExposureBaseCase: FinancialMetric;
  penaltyExposureWorstCase: FinancialMetric;
  invoiceMilestoneAtRisk: FinancialMetric;
  workingCapitalFinancingCost: FinancialMetric;
  
  totalPenaltyRiskIRR: number;
  delayedCashInflowIRR: number;
  dailyPenaltyBurnRateIRR: number;
  maxProjectDelayDays: number;

  // Cross-project conflict warning
  cannibalizationDetected: boolean;
  cannibalizedCommitments?: {
    projectId: string;
    projectName: string;
    commitmentTitle: string;
    delayDaysIncurred: number;
    financialPenaltyIRR: number;
  }[];
}

export interface FeasibilityGateCheck {
  gateType?: 'CAPACITY' | 'QUALITY' | 'LABOR' | 'LOGISTICS' | 'CASH';
  constraintCategory: 'HARD' | 'SOFT'; // Hard: Binary disqualifier. Soft: Increases cost, risk, or lead time
  gateName?: string;
  gateNameEn?: string;
  criterion?: string;
  criterionEn?: string;
  passed: boolean;
  severity?: 'INFO' | 'WARNING' | 'HARD_VIOLATION';
  reason?: string;
  reasonEn?: string;
  rationale?: string;
  rationaleEn?: string;
  penaltyOrOverheadIRR?: number; // Soft constraint monetary overhead (e.g. overtime or escort fee)
  checkedByRole?: 'ENGINEERING' | 'PRODUCTION' | 'SUPPLY_CHAIN' | 'CHRO' | 'CFO' | 'DIGITAL';
}

export interface AlternativeOption {
  id: string;
  title: string;
  titleEn: string;
  strategy: 'REPAIR' | 'OUTSOURCE' | 'REALLOCATE' | 'RESEQUENCE';
  description: string;
  descriptionEn: string;
  
  // How the alternative was synthesized / discovered
  candidateDiscoveryMethod: string;
  candidateDiscoveryMethodEn: string;

  // Provenance-based cost & penalty metrics
  directCostMetric?: FinancialMetric;
  penaltyMetric?: FinancialMetric;
  netEconomicMetric?: FinancialMetric;

  directCostIRR: number;
  scheduleDelayDays: number;
  penaltiesIncurredIRR: number;
  cashImpactDeltaIRR: number;
  technicalRisk: number; // 1 to 5
  executionConfidence: number; // 0 to 100%
  compositeScore: number;
  
  // Two-Stage Decision Gates: Hard vs Soft
  isFeasible: boolean; // Stage 1 Feasibility
  hardConstraintsPassed: boolean;
  feasibilityGateChecks: FeasibilityGateCheck[];
  infeasibilityReason?: string;
  infeasibilityReasonEn?: string;
  softConstraintNotes?: string[] | string;
  softConstraintNotesEn?: string[] | string;

  // Cross-project cannibalization & Enterprise Opportunity Cost
  enterpriseOpportunityCostIRR: number; // Value stolen from secondary commitments
  netEnterpriseValueCreatedIRR: number; // (Avoided Penalties + Avoided Financing Cost) - Direct Cost - Enterprise Opportunity Cost
  secondaryProjectImpact?: {
    affectedProjectId: string;
    affectedProjectName: string;
    delayInducedDays: number;
    penaltyRiskIRR: number;
  };

  // Stage 2 Explainability & Confidence
  decisionConfidencePct: number;
  criticalMissingInformation?: {
    variable: string;
    impactOnChoice: string;
    collectionLeadTime: string;
    variableEn?: string;
    impactOnChoiceEn?: string;
    collectionLeadTimeEn?: string;
    flipThreshold?: string;
    flipThresholdEn?: string;
  };
  criticalMissingInformationEn?: {
    variable: string;
    impactOnChoice: string;
    collectionLeadTime: string;
    flipThreshold?: string;
    flipThresholdEn?: string;
  };

  decisionRationale?: string;
  decisionRationaleEn?: string;
  rejectionReasonIfOtherChosen?: string;
  rejectionReasonIfOtherChosenEn?: string;

  constraintFlags: string[];
  constraintFlagsEn: string[];
  actionSteps: string[];
  actionStepsEn: string[];
  sapExecutionInstructions: string[];
  recommended: boolean;
}

export interface CouncilMember {
  id: 'CEO' | 'CFO' | 'ENGINEERING' | 'PRODUCTION' | 'CHRO' | 'SUPPLY_CHAIN' | 'DIGITAL' | 'COMMITMENT_MGR';
  agentId: string; // e.g. "CEO Agent", "CFO Agent"
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
  costOfCapitalRatePct: number; // Parameterized: 24%, 35%, or 45%
  confidenceScore: number;
  valueOfInformation?: {
    criticalMissingVariable: string;
    variableEn: string;
    whyItMatters: string;
    whyItMattersEn: string;
    flipThreshold: string;
    flipThresholdEn: string;
  };
  hardStrategicConstraints?: string[];
  hardStrategicConstraintsEn?: string[];
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
  alternativeChosenEn?: string;
  
  // Closed-loop organizational learning pipeline
  baselineAssumption: string;
  baselineAssumptionEn: string;
  actionExecuted: string;
  actionExecutedEn: string;
  predictedDelayDays: number;
  actualDelayDays: number;
  predictedCostIRR: number;
  actualCostIRR: number;
  varianceReason: string;
  varianceReasonEn: string;
  rootCauseAnalysis: string;
  rootCauseAnalysisEn: string;
  lessonLearned: string;
  lessonLearnedEn: string;
  ruleOrParameterUpdate: string; // The concrete parameter or rule updated in the engine
  ruleOrParameterUpdateEn: string;
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
  businessObject: string;
  refreshFrequency?: string;
  extractionSchedule?: string;
  freshnessSLA?: string;
  module?: string;
  keyFields: string[];
  extractionMethod?: string;
  transformationLogic?: string;
}

export interface ArchitectureDecisionRecord {
  id: string; // e.g., 'ADR-001'
  title: string;
  titleEn: string;
  context: string;
  contextEn: string;
  optionsConsidered: {
    option: string;
    pros: string;
    cons: string;
  }[];
  decision: string;
  decisionEn: string;
  rationale: string;
  rationaleEn: string;
  consequences: string;
  consequencesEn: string;
  rejectedAlternatives: string;
  rejectedAlternativesEn: string;
  status: 'ACCEPTED' | 'PROPOSED' | 'DEPRECATED';
}

export interface PreMortemRisk {
  id: number;
  failureCause: string;
  failureCauseEn: string;
  probability: 'HIGH' | 'MEDIUM' | 'LOW';
  impact: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MEDIUM';
  earlyWarningSignal: string;
  earlyWarningSignalEn: string;
  preventiveAction: string;
  preventiveActionEn: string;
  contingencyPlan: string;
  contingencyPlanEn: string;
  owner: string;
  ownerEn: string;
}

export interface DeveloperTask {
  id: string; // e.g., 'TASK-01'
  task: string;
  taskEn: string;
  component: string;
  description: string;
  descriptionEn: string;
  input: string;
  output: string;
  dependencies: string[];
  acceptanceCriteria: string;
  acceptanceCriteriaEn: string;
  priority: 'P0' | 'P1' | 'P2';
}

export interface MasterSpecChapter {
  chapterNumber: number;
  titleFa: string;
  titleEn: string;
  domain: string;
  domainFa: string;
  factTag: 'FACT' | 'INFERENCE' | 'ASSUMPTION' | 'VALIDATION REQUIRED';
  summaryFa: string;
  summaryEn: string;
  keyDirectives: string[];
  technicalContentMarkdownFa: string;
  technicalContentMarkdownEn?: string;
  codeSnippet?: {
    language: 'sql' | 'typescript' | 'json' | 'python' | 'text';
    title: string;
    code: string;
  };
}

