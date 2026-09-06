import { 
  ResourceNode, 
  ProductionOperation, 
  ProductionOrder, 
  ProjectEntity, 
  CommitmentNode, 
  CashFlowEvent, 
  SapTableMapping,
  LearningRecord,
  DisruptionInput
} from '../types';

export const INITIAL_RESOURCES: ResourceNode[] = [
  {
    resourceId: 'RES-MCH-BORING-PAMA',
    sapWorkCenter: 'WC-MCH-BORING01',
    name: 'بورینگ و فرز سنگین دروازه‌ای CNC پاما (PAMA Speedram 2000)',
    nameEn: 'PAMA Speedram 2000 CNC Heavy Boring & Milling Machine',
    category: 'MACHINE',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'سالن ماشین‌کاری سنگین و سازه',
    shopEn: 'Heavy Machining & Structure Shop',
    nominalHourlyCostIRR: 35000000,
    overtimeHourlyCostIRR: 52500000,
    mtbfHours: 720,
    mttrHours: 48,
    operationalAvailability: 0.88,
    usableAvailability: 0.72, // Usable OEE accounting for setup, alignment & shift warmup
    maxWorkpieceWeightTon: 120,
    toleranceMm: 0.012,
    energyRestricted: true,
    currentStatus: 'DISRUPTED', // Golden scenario active!
    
    // Rich Industrial Resource Model
    spindleState: 'ISO 50 Taper, 160mm Spindle Ram, Bearing Hydro-dynamic Run-out Error',
    tableDimensions: 'Rotary Table 4000x4000mm, Travel X=10m, Y=4.5m, Z=1.5m, W=1.2m',
    craneCapacityRequirementTon: 100, // Stator workpiece (80t) requires 100t bay crane
    powerRatingKVa: 120,
    operatorSkillCertifications: ['Siemens Sinumerik 840D SL Level 3', 'Heavy Large-Bore Boring', 'Laser Tracker Alignment'],
    maintenanceState: 'CRITICAL_FAILURE',
    calibrationState: 'Dynamic calibration overdue post-vibration surge',
    setupTimeHours: 18,
    currentCommitmentLoad: ['COMM-JAHROM-STATOR-DELIVERY', 'COMM-CLSF-ROTOR-SLOT-DELIVERY'],
    activeIoTAlerts: [
      'Spindle Bearing Vibration: 7.4 mm/s RMS (ISO 10816 Zone D Critical)',
      'Lube Pressure: 1.9 bar (Below threshold 2.5 bar)'
    ],

    activeDisruption: {
      cause: 'خرابی یونیت هیدرولیک اسپیندل و بلبرینگ‌های دوربالا (Spindle Hydraulic Failure)',
      startDate: '2026-04-10',
      expectedDays: 20
    }
  },
  {
    resourceId: 'RES-MCH-GANTRY-WALDRICH',
    sapWorkCenter: 'WC-MCH-GANTRY02',
    name: 'فرز دروازه‌ای دو ستونه CNC والدریش کوبورگ (Waldrich Coburg)',
    nameEn: 'Waldrich Coburg Double-Housing CNC Gantry Milling Machine',
    category: 'MACHINE',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'سالن ماشین‌کاری سنگین و سازه',
    shopEn: 'Heavy Machining & Structure Shop',
    nominalHourlyCostIRR: 42000000,
    overtimeHourlyCostIRR: 63000000,
    mtbfHours: 850,
    mttrHours: 36,
    operationalAvailability: 0.92,
    usableAvailability: 0.78,
    maxWorkpieceWeightTon: 150,
    toleranceMm: 0.008,
    energyRestricted: true,
    currentStatus: 'OPERATIONAL',

    spindleState: 'High-torque Gantry Spindle, 6000 RPM, Optimal Dynamic Balance',
    tableDimensions: 'Bed 12000x4500mm, Portal Clearance 4200mm',
    craneCapacityRequirementTon: 120,
    powerRatingKVa: 160,
    operatorSkillCertifications: ['Heidenhain TNC 640', 'Hydro-generator Rotor Rim Machining'],
    maintenanceState: 'HEALTHY',
    calibrationState: 'Laser calibrated via Renishaw XL-80 (2026-03-02)',
    setupTimeHours: 14,
    currentCommitmentLoad: ['COMM-HYDRO-SHAFT-DELIVERY'], // Actively committed to Karun Dam Hydro project!
    activeIoTAlerts: ['Nominal telemetry - 1.2 mm/s RMS']
  },
  {
    resourceId: 'RES-SKILL-CNC-MASTERS',
    sapWorkCenter: 'WC-HR-CNC-EXP',
    name: 'تیم ماشین‌کاران ارشد و برنامه‌نویسان CNC توربین (Master Machinists & CAM)',
    nameEn: 'Certified Master 5-Axis Machinists & Heavy Turbine CAM Programmers',
    category: 'PEOPLE_SKILL',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'معاونت تولید و مهندسی ساخت',
    shopEn: 'Production & Manufacturing Engineering Dept',
    nominalHourlyCostIRR: 12000000,
    overtimeHourlyCostIRR: 24000000,
    mtbfHours: 2000,
    mttrHours: 120,
    operationalAvailability: 0.95,
    usableAvailability: 0.80, // Constrained by legal weekly overtime limit (12 hrs/wk)
    maxWorkpieceWeightTon: 0,
    toleranceMm: 0.005,
    energyRestricted: false,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-FIN-FX-CAPITAL',
    sapWorkCenter: 'WC-TR-FX-NIMA',
    name: 'تخصیص ارز تجاری و خط اعتباری خزانه‌داری ارزی (Forex Allocation & LC)',
    nameEn: 'Commercial Foreign Exchange Quota & Central Bank LC Facility',
    category: 'CAPITAL_CASH',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'معاونت مالی و اقتصادی (خزانه‌داری)',
    shopEn: 'Finance & Treasury Department',
    nominalHourlyCostIRR: 0,
    overtimeHourlyCostIRR: 0,
    mtbfHours: 5000,
    mttrHours: 300,
    operationalAvailability: 0.90,
    usableAvailability: 0.75, // Working capital liquidity buffer
    maxWorkpieceWeightTon: 0,
    toleranceMm: 0,
    energyRestricted: false,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-TOOL-STATOR-CLAMP',
    sapWorkCenter: 'WC-TL-STATOR01',
    name: 'فیکسچر هیدرولیک کلمپینگ و تراز نشیمنگاه فریم ۱۶۰ مگاوات (Stator Jigs)',
    nameEn: 'Custom 160MW Stator Frame Hydraulic Clamping & Alignment Fixture',
    category: 'TOOLING_FIXTURE',
    criticality: 'B_IMPORTANT',
    isBottleneck: false,
    shop: 'انبار ابزار مخصوص و فیکسچرسازی',
    shopEn: 'Special Tooling & Fixture Crib',
    nominalHourlyCostIRR: 5000000,
    overtimeHourlyCostIRR: 7500000,
    mtbfHours: 1800,
    mttrHours: 24,
    operationalAvailability: 0.98,
    usableAvailability: 0.90,
    maxWorkpieceWeightTon: 90,
    toleranceMm: 0.01,
    energyRestricted: false,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-LOG-HEAVY-BOGIE',
    sapWorkCenter: 'WC-LOG-BOGIE16',
    name: 'بوژی چندمحوره ۱۶ محوره حمل محموله ترافیکی سنگین (16-Axle Heavy Hauler)',
    nameEn: '16-Axle Heavy Road Hauler Bogie & Police Escort Logistics Fleet',
    category: 'LOGISTICS_TRANSPORT',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'شرکت حمل و نقل چندوجهی مپنا',
    shopEn: 'MAPNA Multimodal Heavy Logistics',
    nominalHourlyCostIRR: 22000000,
    overtimeHourlyCostIRR: 35000000,
    mtbfHours: 1200,
    mttrHours: 72,
    operationalAvailability: 0.85,
    usableAvailability: 0.65, // Regulated by road traffic police weekend bans & night transit
    maxWorkpieceWeightTon: 160,
    toleranceMm: 0,
    energyRestricted: false,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-VPI-AUTOCLAVE-01',
    sapWorkCenter: 'WC-WND-VPI01',
    name: 'تاسیسات اشباع رزین تحت خلأ و فشار استاتور (VPI Autoclave)',
    nameEn: 'Stator Vacuum Pressure Impregnation (VPI) Autoclave Plant',
    category: 'MACHINE',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'سالن سیم‌پیچی و عایق‌کاری فشار قوی',
    shopEn: 'High-Voltage Winding & Insulation Shop',
    nominalHourlyCostIRR: 28000000,
    overtimeHourlyCostIRR: 45000000,
    mtbfHours: 1200,
    mttrHours: 24,
    operationalAvailability: 0.95,
    usableAvailability: 0.82,
    maxWorkpieceWeightTon: 90,
    toleranceMm: 0.05,
    energyRestricted: false,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-STACK-PRESS-HYD',
    sapWorkCenter: 'WC-ASY-STACK01',
    name: 'پرس هیدرولیک استکینگ و ورق‌چینی هسته استاتور ۱۶۰ مگاوات',
    nameEn: 'Stator Core Hydraulic Stacking & Clamping Press',
    category: 'MACHINE',
    criticality: 'B_IMPORTANT',
    isBottleneck: false,
    shop: 'سالن مونتاژ هسته و سازه ژنراتور',
    shopEn: 'Core Assembly & Stacking Shop',
    nominalHourlyCostIRR: 18000000,
    overtimeHourlyCostIRR: 27000000,
    mtbfHours: 900,
    mttrHours: 18,
    operationalAvailability: 0.96,
    usableAvailability: 0.85,
    maxWorkpieceWeightTon: 110,
    toleranceMm: 0.05,
    energyRestricted: false,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-BALANCE-BUNKER',
    sapWorkCenter: 'WC-TST-BLNC01',
    name: 'تونل بالانس دینامیکی و تست بیش‌سرعت روتور ژنراتور (Balance Bunker)',
    nameEn: 'Rotor Dynamic Balancing & Overspeed Test Tunnel (3600 RPM)',
    category: 'MACHINE',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'سالن آزمون نهایی و بالانس',
    shopEn: 'Final Testing & Balance Pit',
    nominalHourlyCostIRR: 55000000,
    overtimeHourlyCostIRR: 82000000,
    mtbfHours: 1500,
    mttrHours: 30,
    operationalAvailability: 0.97,
    usableAvailability: 0.88,
    maxWorkpieceWeightTon: 80,
    toleranceMm: 0.002,
    energyRestricted: true,
    currentStatus: 'OPERATIONAL'
  }
];

export const INITIAL_OPERATIONS: ProductionOperation[] = [
  {
    operationId: 'OP-ST-0030',
    sapProdOrder: 'PO-GEN-ST-1092',
    sapOpCode: '0030',
    description: 'ماشین‌کاری اولیه شیارهای نشیمنگاه فریم و ریل استاتور',
    descriptionEn: 'Initial Boring of Stator Frame Keybars & Lamination Clamps',
    allocatedResourceId: 'RES-MCH-BORING-PAMA',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-STATOR-FRAME',
    plannedSetupHours: 24,
    plannedMachiningHours: 140,
    sequenceNumber: 30,
    status: 'IN_PROGRESS',
    successorOpId: 'OP-ST-0040',
    currentProgressPct: 35
  },
  {
    operationId: 'OP-ST-0040',
    sapProdOrder: 'PO-GEN-ST-1092',
    sapOpCode: '0040',
    description: 'فرزکاری دقیق نشیمنگاه بیرینگ ژورنال و شیلدهای یاتاقان استاتور',
    descriptionEn: 'Precision Milling of Journal Bearing Seat & Endshields',
    allocatedResourceId: 'RES-MCH-BORING-PAMA',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-STATOR-FRAME',
    plannedSetupHours: 16,
    plannedMachiningHours: 95,
    sequenceNumber: 40,
    status: 'PENDING',
    predecessorOpId: 'OP-ST-0030',
    successorOpId: 'OP-ST-0050',
    currentProgressPct: 0
  },
  {
    operationId: 'OP-ST-0050',
    sapProdOrder: 'PO-GEN-ST-1092',
    sapOpCode: '0050',
    description: 'ورق‌چینی، استکینگ و پرس هیدرولیک هسته استاتور ۱۶۰ مگاوات',
    descriptionEn: 'Silicon Steel Lamination Stacking & Core Hydraulic Pressing',
    allocatedResourceId: 'RES-STACK-PRESS-HYD',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-CORE-STACK',
    plannedSetupHours: 20,
    plannedMachiningHours: 110,
    sequenceNumber: 50,
    status: 'PENDING',
    predecessorOpId: 'OP-ST-0040',
    successorOpId: 'OP-ST-0060',
    currentProgressPct: 0
  },
  {
    operationId: 'OP-ST-0060',
    sapProdOrder: 'PO-GEN-ST-1092',
    sapOpCode: '0060',
    description: 'سیم‌پیچی شمش‌های مسی، کلاف‌پیچی و عایق‌کاری VPI پوسته استاتور',
    descriptionEn: 'Stator Bar Winding Insertion, Wedging & VPI Resin Impregnation',
    allocatedResourceId: 'RES-VPI-AUTOCLAVE-01',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-STATOR-VPI',
    plannedSetupHours: 36,
    plannedMachiningHours: 160,
    sequenceNumber: 60,
    status: 'PENDING',
    predecessorOpId: 'OP-ST-0050',
    successorOpId: 'OP-ST-0070',
    currentProgressPct: 0
  },
  {
    operationId: 'OP-ST-0070',
    sapProdOrder: 'PO-GEN-ST-1092',
    sapOpCode: '0070',
    description: 'مونتاژ نهایی روتور و استاتور، آزمون الکتریکی و تست بالانس دینامیک',
    descriptionEn: 'Final Assembly, Electrical High-Pot Tests & Dynamic Balance Run',
    allocatedResourceId: 'RES-BALANCE-BUNKER',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-FINAL-TEST',
    plannedSetupHours: 40,
    plannedMachiningHours: 80,
    sequenceNumber: 70,
    status: 'PENDING',
    predecessorOpId: 'OP-ST-0060',
    currentProgressPct: 0
  },
  // Operations on project 2 (Class F) competing for PAMA machine
  {
    operationId: 'OP-CLSF-0025',
    sapProdOrder: 'PO-GEN-ST-1093',
    sapOpCode: '0025',
    description: 'فرزکاری نشیمنگاه هدر و شیرینگ روتور ژنراتور کلاس F (۳۲۴ مگاوات)',
    descriptionEn: 'Milling of Rotor Winding Slot End-zones for Class F 324MW Generator',
    allocatedResourceId: 'RES-MCH-BORING-PAMA',
    projectId: 'PRJ-CLS-F-324MW',
    wbsElement: 'WBS-CLSF-ROTOR-MACH',
    plannedSetupHours: 30,
    plannedMachiningHours: 120,
    sequenceNumber: 25,
    status: 'PENDING',
    currentProgressPct: 0
  },
  {
    operationId: 'OP-HYD-0015',
    sapProdOrder: 'PO-GEN-HY-4401',
    sapOpCode: '0015',
    description: 'بورینگ شفت توربین و قطب‌های روتور هیدروژنراتور سد کارون',
    descriptionEn: 'Boring of Hydro-generator Rotor Hub & Pole Seats (Karun Dam)',
    allocatedResourceId: 'RES-MCH-GANTRY-WALDRICH',
    projectId: 'PRJ-HYDRO-250MW',
    wbsElement: 'WBS-HYDRO-ROTOR-REHAB',
    plannedSetupHours: 28,
    plannedMachiningHours: 135,
    sequenceNumber: 15,
    status: 'IN_PROGRESS',
    currentProgressPct: 60
  }
];

export const INITIAL_PRODUCTION_ORDERS: ProductionOrder[] = [
  {
    orderId: 'PO-GEN-ST-1092',
    projectId: 'PRJ-MGT70-GEN-04',
    componentName: 'مجموعه کامل پوسته و هسته استاتور ژنراتور ۱۶۰ مگاوات',
    componentNameEn: '160MW Stator Frame & Core Stacking Assembly',
    targetQty: 1,
    status: 'DELAYED',
    operations: ['OP-ST-0030', 'OP-ST-0040', 'OP-ST-0050', 'OP-ST-0060', 'OP-ST-0070']
  },
  {
    orderId: 'PO-GEN-ST-1093',
    projectId: 'PRJ-CLS-F-324MW',
    componentName: 'روتور فورج‌شده و شفت ژنراتور کلاس F (پروژه خرم‌آباد)',
    componentNameEn: 'Class F 324MW Generator Monoblock Forged Rotor',
    targetQty: 1,
    status: 'OPEN',
    operations: ['OP-CLSF-0025']
  },
  {
    orderId: 'PO-GEN-HY-4401',
    projectId: 'PRJ-HYDRO-250MW',
    componentName: 'بازسازی قطب‌ها و اسپایدر روتور هیدروژنراتور کارون',
    componentNameEn: 'Hydro-Generator Rotor Spider & Poles Rehabilitation',
    targetQty: 1,
    status: 'OPEN',
    operations: ['OP-HYD-0015']
  }
];

export const INITIAL_COMMITMENTS: CommitmentNode[] = [
  {
    commitmentId: 'COMM-MGT70-MS1',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-STATOR-FRAME',
    title: 'تکمیل و بازرسی کیفیت ماشین‌کاری پوسته استاتور (Milling Inspection Gate)',
    titleEn: 'Stator Frame Machining Quality Clearance & Gate 1',
    type: 'INTERNAL_SLA',
    baselineDate: '2026-05-02',
    criticalDeadline: '2026-05-10',
    financialValueIRR: 12000000000,
    dailyPenaltyIRR: 0,
    penaltyClauseRef: 'MAPNA-QA-STD-G1',
    gracePeriodDays: 2,
    status: 'AT_RISK',
    cashInflowOnCompletionIRR: 0,
    requiredOperationIds: ['OP-ST-0030', 'OP-ST-0040']
  },
  {
    commitmentId: 'COMM-MGT70-MS2-BILLING',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-STATOR-VPI',
    title: 'تکمیل عملیات استکینگ و تست عایقی VPI استاتور (صدور صورت‌وضعیت مرحله ۴)',
    titleEn: 'Stator Stacking & VPI Completion (Milestone 4 Invoicing Approval)',
    type: 'BILLING_MILESTONE',
    baselineDate: '2026-06-20',
    criticalDeadline: '2026-06-30',
    financialValueIRR: 42000000000, // 42 Billion IRR (4.2 Billion Tomans)
    dailyPenaltyIRR: 150000000,
    penaltyClauseRef: 'TPPH-JAHROM Contract Cl. 8.4',
    gracePeriodDays: 0,
    status: 'AT_RISK',
    cashInflowOnCompletionIRR: 42000000000,
    requiredOperationIds: ['OP-ST-0050', 'OP-ST-0060']
  },
  {
    commitmentId: 'COMM-MGT70-FINAL-DELIVERY',
    projectId: 'PRJ-MGT70-GEN-04',
    wbsElement: 'WBS-MGT70-DELIVERY',
    title: 'تحویل نهایی ژنراتور ۱۶۰ مگاوات در محل سایت نیروگاه به شرکت مادرتخصصی برق حرارتی',
    titleEn: 'Final Generator Factory Acceptance Test & Dispatch to Site (TPPH Client)',
    type: 'CUSTOMER_DELIVERY',
    baselineDate: '2026-08-15',
    criticalDeadline: '2026-08-25',
    financialValueIRR: 480000000000, // 480 Billion IRR (48 Billion Tomans)
    dailyPenaltyIRR: 450000000, // 450M IRR/day (45M Toman/day Liquidated Damages)
    penaltyClauseRef: 'TPPH-JAHROM Contract Cl. 14.2 (Liquidated Damages)',
    gracePeriodDays: 5,
    status: 'AT_RISK',
    cashInflowOnCompletionIRR: 120000000000, // Final 25% retention release
    requiredOperationIds: ['OP-ST-0070']
  },
  {
    commitmentId: 'COMM-CLSF-ROTOR-SLOT',
    projectId: 'PRJ-CLS-F-324MW',
    wbsElement: 'WBS-CLSF-ROTOR-MACH',
    title: 'تکمیل شیارزنی و ارسال روتور ژنراتور کلاس F به سالن سیم‌پیچی',
    titleEn: 'Rotor Slotting & Transfer to Winding Shop (Class F Generator)',
    type: 'INTERNAL_SLA',
    baselineDate: '2026-06-05',
    criticalDeadline: '2026-06-18',
    financialValueIRR: 35000000000,
    dailyPenaltyIRR: 200000000,
    penaltyClauseRef: 'MD1-KHORRAM-SLA-03',
    gracePeriodDays: 3,
    status: 'SAFE',
    cashInflowOnCompletionIRR: 0,
    requiredOperationIds: ['OP-CLSF-0025']
  },
  {
    commitmentId: 'COMM-HYDRO-SHAFT-DELIVERY',
    projectId: 'PRJ-HYDRO-250MW',
    wbsElement: 'WBS-HYDRO-ROTOR-REHAB',
    title: 'تحویل شفت و قطب‌های بازسازی‌شده هیدروژنراتور سد کارون به کارفرما',
    titleEn: 'Delivery of Rehabilitated Rotor Spider & Hub to KWPA Site',
    type: 'CUSTOMER_DELIVERY',
    baselineDate: '2026-07-20',
    criticalDeadline: '2026-07-28',
    financialValueIRR: 210000000000,
    dailyPenaltyIRR: 280000000, // 280M IRR/day
    penaltyClauseRef: 'KWPA-KARUN-CONTRACT Cl. 11',
    gracePeriodDays: 4,
    status: 'SAFE',
    cashInflowOnCompletionIRR: 52500000000,
    requiredOperationIds: ['OP-HYD-0015']
  }
];

export const INITIAL_PROJECTS: ProjectEntity[] = [
  {
    projectId: 'PRJ-MGT70-GEN-04',
    sapProjectCode: 'P-GEN-160-2025-04',
    name: 'ساخت ژنراتور ۱۶۰ مگاوات هیدروژنی نیروگاه سیکل ترکیبی جهرم / بوئین زهرا',
    nameEn: '160MW Hydrogen-Cooled Turbogenerator (Jahrom / Boin Zahra CCPP)',
    client: 'شرکت مادرتخصصی تولید نیروی برق حرارتی (TPPH)',
    clientEn: 'Thermal Power Plant Holding (TPPH)',
    powerRatingMW: 160,
    type: 'MGT-70_160MW',
    contractValueIRR: 480000000000,
    baselineDeliveryDate: '2026-08-15',
    forecastDeliveryDate: '2026-09-06', // 22 days delayed without mitigation
    status: 'CRITICAL',
    commitments: INITIAL_COMMITMENTS.filter(c => c.projectId === 'PRJ-MGT70-GEN-04'),
    productionOrders: INITIAL_PRODUCTION_ORDERS.filter(po => po.projectId === 'PRJ-MGT70-GEN-04')
  },
  {
    projectId: 'PRJ-CLS-F-324MW',
    sapProjectCode: 'P-GEN-324-2025-01',
    name: 'ساخت ژنراتور کلاس F با ظرفیت ۳۲۴ مگاوات - نیروگاه خرم‌آباد',
    nameEn: 'Class F 324MW High-Efficiency Turbogenerator (Khorramabad CCPP)',
    client: 'مپنا توسعه یک / شرکت تولید برق صبا',
    clientEn: 'MAPNA MD1 / Saba Power Gen',
    powerRatingMW: 324,
    type: 'CLASS_F_324MW',
    contractValueIRR: 890000000000,
    baselineDeliveryDate: '2026-11-30',
    forecastDeliveryDate: '2026-12-05',
    status: 'AT_RISK',
    commitments: INITIAL_COMMITMENTS.filter(c => c.projectId === 'PRJ-CLS-F-324MW'),
    productionOrders: INITIAL_PRODUCTION_ORDERS.filter(po => po.projectId === 'PRJ-CLS-F-324MW')
  },
  {
    projectId: 'PRJ-HYDRO-250MW',
    sapProjectCode: 'P-GEN-HYD-2024-03',
    name: 'بازسازی و نوسازی هسته و سیم‌پیچی هیدروژنراتور ۲۵۰ مگاوات سد کارون',
    nameEn: '250MW Hydro-Generator Stator Core & Rotor Rewinding (Karun Dam)',
    client: 'سازمان آب و برق خوزستان (KWPA)',
    clientEn: 'Khuzestan Water & Power Authority (KWPA)',
    powerRatingMW: 250,
    type: 'HYDRO_OVERHAUL',
    contractValueIRR: 210000000000,
    baselineDeliveryDate: '2026-07-20',
    forecastDeliveryDate: '2026-07-20',
    status: 'ON_TRACK',
    commitments: INITIAL_COMMITMENTS.filter(c => c.projectId === 'PRJ-HYDRO-250MW'),
    productionOrders: INITIAL_PRODUCTION_ORDERS.filter(po => po.projectId === 'PRJ-HYDRO-250MW')
  }
];

export const INITIAL_CASH_EVENTS: CashFlowEvent[] = [
  {
    eventId: 'CF-MGT70-IN-04',
    projectId: 'PRJ-MGT70-GEN-04',
    commitmentRef: 'COMM-MGT70-MS2-BILLING',
    direction: 'INFLOW',
    amountIRR: 42000000000,
    scheduledDate: '2026-06-30',
    description: 'وصول صورت‌وضعیت تاییدشده اتمام استکینگ و تست VPI پوسته استاتور',
    descriptionEn: 'Milestone 4 Stacking & VPI Inflow Collection',
    cleared: false,
    category: 'INVOICE_MILESTONE'
  },
  {
    eventId: 'CF-MGT70-IN-FINAL',
    projectId: 'PRJ-MGT70-GEN-04',
    commitmentRef: 'COMM-MGT70-FINAL-DELIVERY',
    direction: 'INFLOW',
    amountIRR: 120000000000,
    scheduledDate: '2026-08-25',
    description: 'تسویه نهایی پس از تحویل در سایت و تایید صورت‌جلسه FAT',
    descriptionEn: 'Final Retention Release upon Site FAT Protocol Signing',
    cleared: false,
    category: 'INVOICE_MILESTONE'
  },
  {
    eventId: 'CF-MCH-OUT-SPARE',
    projectId: 'PRJ-MGT70-GEN-04',
    commitmentRef: 'COMM-MGT70-MS1',
    direction: 'OUTFLOW',
    amountIRR: 5800000000,
    scheduledDate: '2026-04-18',
    description: 'پیش‌پرداخت خرید کیت هیدرولیک اسپیندل و بلبرینگ از انبار استراتژیک',
    descriptionEn: 'Emergency Purchase Outflow for PAMA Spindle Spare Kit',
    cleared: false,
    category: 'EMERGENCY_COST'
  },
  {
    eventId: 'CF-MGT70-WC-FINANCE',
    projectId: 'PRJ-MGT70-GEN-04',
    commitmentRef: 'COMM-MGT70-MS2-BILLING',
    direction: 'OUTFLOW',
    amountIRR: 1800000000,
    scheduledDate: '2026-07-22',
    description: 'هزینه تامین مالی سرمایه در گردش ناشی از تعویق ۲۲ روزه وصول صورت‌وضعیت (نرخ ۲۴٪ سالانه)',
    descriptionEn: 'Working Capital Financing Cost from 22-day billing delay (24% annual cost of capital)',
    cleared: false,
    category: 'WORKING_CAPITAL_FINANCING'
  }
];

export const enterpriseShockPresets: DisruptionInput[] = [
  {
    resourceId: 'RES-MCH-BORING-PAMA',
    resourceCategory: 'MACHINE',
    resourceName: 'بورینگ و فرز CNC پاما (PAMA Speedram 2000)',
    downtimeDays: 20,
    cause: 'خرابی یونیت هیدرولیک اسپیندل و بلبرینگ‌های دوربالا (Spindle Breakdown)',
    causeEn: 'Main Spindle Hydraulic & high-speed bearings failure',
    startDate: '2026-04-10',
    estimatedResolutionDate: '2026-04-30',
    startOffsetDays: 0,
    strategicProfile: 'BALANCED'
  },
  {
    resourceId: 'RES-SKILL-CNC-MASTERS',
    resourceCategory: 'PEOPLE_SKILL',
    resourceName: 'تیم ماشین‌کاران ارشد و برنامه‌نویسان CNC توربین (Master Machinists)',
    downtimeDays: 14,
    cause: 'عدم دسترسی به تکنسین‌های ارشد ۵ محوره و برخورد با سقف قانونی اضافه‌کاری (Skill Constraint)',
    causeEn: 'Certified Master 5-Axis Machinists unavailable / legal overtime ceiling hit',
    startDate: '2026-04-12',
    estimatedResolutionDate: '2026-04-26',
    startOffsetDays: 0,
    strategicProfile: 'DELIVERY_CRISIS'
  },
  {
    resourceId: 'RES-FIN-FX-CAPITAL',
    resourceCategory: 'CAPITAL_CASH',
    resourceName: 'تخصیص ارز تجاری و خط اعتباری خزانه‌داری (Forex Allocation & LC)',
    downtimeDays: 25,
    cause: 'تعلیق تخصیص ارز نیما و تاخیر در گشایش اعتبار اسنادی (LC) جهت ترخیص قطعات یدکی',
    causeEn: 'Central Bank FX allocation delay freezing LC clearance for imported seal kits',
    startDate: '2026-04-05',
    estimatedResolutionDate: '2026-04-30',
    startOffsetDays: 0,
    strategicProfile: 'CASH_CRISIS'
  },
  {
    resourceId: 'RES-TOOL-STATOR-CLAMP',
    resourceCategory: 'TOOLING_FIXTURE',
    resourceName: 'فیکسچر هیدرولیک کلمپینگ فریم استاتور (Custom Fixture)',
    downtimeDays: 18,
    cause: 'دفرمگی و انحراف هندسی پین‌های زاویه‌گیر فیکسچر کلمپینگ پوسته استاتور',
    causeEn: 'Angular distortion on stator frame custom clamping fixture requiring re-machining',
    startDate: '2026-04-15',
    estimatedResolutionDate: '2026-05-03',
    startOffsetDays: 0,
    strategicProfile: 'MARGIN_PROTECTION'
  },
  {
    resourceId: 'RES-LOG-HEAVY-BOGIE',
    resourceCategory: 'LOGISTICS_TRANSPORT',
    resourceName: 'بوژی ۱۶ محوره حمل محموله ترافیکی سنگین (16-Axle Heavy Hauler)',
    downtimeDays: 12,
    cause: 'توقف صدور مجوز بار ترافیکی ۸۰ تن توسط پلیس راهور به دلیل محدودیت تردد تعطیلات',
    causeEn: 'Heavy 80t oversize road transit permit held by highway authority during holiday bans',
    startDate: '2026-04-18',
    estimatedResolutionDate: '2026-04-30',
    startOffsetDays: 0,
    strategicProfile: 'BALANCED'
  }
];

export const SAP_TABLE_MAPPINGS: SapTableMapping[] = [
  {
    sapTable: 'CRHD + KAKO',
    businessObject: 'WorkCenterCapacity',
    sapDescription: 'Work Center Header & Capacity Definition',
    cdsView: 'I_WorkCenterCapacity',
    rfcOrBapi: 'BAPI_WORKCENTER_GETDETAIL',
    canonicalEntity: 'canonical.resource_node',
    refreshFrequency: 'Daily (24h Batch)',
    keyFields: ['ARBPL', 'WERKS', 'KAPID'],
    extractionMethod: 'CDC on AEDAT / OData Core'
  },
  {
    sapTable: 'AFKO + AUFK',
    businessObject: 'ProductionOrder',
    sapDescription: 'Production Order Header & Master',
    cdsView: 'I_ProductionOrder',
    rfcOrBapi: 'BAPI_PRODORD_GET_DETAIL',
    canonicalEntity: 'canonical.production_order',
    refreshFrequency: 'Hourly (1h)',
    keyFields: ['AUFNR', 'PLNBEZ', 'GLTRS'],
    extractionMethod: 'OData Service / Status Change Event'
  },
  {
    sapTable: 'AFVC + AFVV',
    businessObject: 'ProductionRouting',
    sapDescription: 'Production Operations & Standard Values',
    cdsView: 'I_ProductionOperation',
    rfcOrBapi: 'RFC_READ_TABLE',
    canonicalEntity: 'canonical.production_operation',
    refreshFrequency: 'Every 4 Hours',
    keyFields: ['AUFPL', 'APLZL', 'VORNR', 'VGW01', 'VGW02'],
    extractionMethod: 'Incremental CDS View'
  },
  {
    sapTable: 'AFRU',
    businessObject: 'ProductionConfirmation',
    sapDescription: 'Shop Floor Order Confirmations',
    cdsView: 'I_ProdOrderConfirmation',
    rfcOrBapi: 'BAPI_PRODORDCONF_CREATE_TT',
    canonicalEntity: 'canonical.operation_progress',
    refreshFrequency: 'Real-time (15 min)',
    keyFields: ['RUECK', 'RMZHL', 'ISMNW_2'],
    extractionMethod: 'RFC Polling / WebSocket Listener'
  },
  {
    sapTable: 'PROJ + PRPS',
    businessObject: 'EnterpriseProject',
    sapDescription: 'Project Definition & WBS Hierarchy',
    cdsView: 'I_EnterpriseProject',
    rfcOrBapi: 'BAPI_PROJECT_GETINFO',
    canonicalEntity: 'canonical.project_entity + commitment_node',
    refreshFrequency: 'Daily (24h)',
    keyFields: ['PSPID', 'POSID', 'POST1'],
    extractionMethod: 'OData Project System'
  },
  {
    sapTable: 'VBAK + VBKD',
    businessObject: 'CustomerContract',
    sapDescription: 'Sales Orders & Contractual Milestones',
    cdsView: 'I_SalesContractItem',
    rfcOrBapi: 'BAPI_SALESORDER_GETDETAIL',
    canonicalEntity: 'canonical.commitment_node',
    refreshFrequency: 'Daily (24h)',
    keyFields: ['VBELN', 'VALDT', 'BSTNK'],
    extractionMethod: 'CDS View Delta Load'
  },
  {
    sapTable: 'ACDOCA (Universal Journal)',
    businessObject: 'JournalEntry',
    sapDescription: 'General Ledger Line Items & Financial Receivables',
    cdsView: 'I_UniversalJournalEntryItem',
    rfcOrBapi: 'BAPI_ACC_DOCUMENT_RECORD',
    canonicalEntity: 'canonical.cash_flow_event',
    refreshFrequency: 'Real-time Delta (5 min)',
    keyFields: ['RBUKRS', 'GJAHR', 'BELNR', 'DOCLN'],
    extractionMethod: 'OData Event Mesh / S/4HANA CDS View'
  }
];

export const INITIAL_LEARNING_RECORDS: LearningRecord[] = [
  {
    id: 'LR-2025-01',
    date: '2025-08-14',
    decisionRef: 'DEC-20250814-04',
    resourceId: 'RES-MCH-BORING-PAMA',
    alternativeChosen: 'برون‌سپاری فرزکاری پوسته استاتور به ماشین‌سازی اراک',
    alternativeChosenEn: 'Outsource Stator Machining to Machine Sazi Arak',
    baselineAssumption: 'زمان صدور مجوز ترافیکی راهداری و هماهنگی پلیس راهور برای بوژی ۱۶ محوره حداکثر ۲ روز است.',
    baselineAssumptionEn: 'Highway police nocturnal transit escort permit lead time assumed at ≤ 2 calendar days.',
    actionExecuted: 'عقد قرارداد الحاقیه، اعزام بوژی و استقرار ۲ ناظر مقیم مپنا پارس با لیزرتراکر در اراک.',
    actionExecutedEn: 'Subcontract amendment executed, 16-axle bogie mobilized, 2 MAPNA QA inspectors dispatched.',
    predictedDelayDays: 6,
    actualDelayDays: 9,
    predictedCostIRR: 2800000000,
    actualCostIRR: 3350000000,
    varianceReason: 'تاخیر در صدور مجوز حمل ترافیکی بوژی ۸۰ تنی توسط راهداری در محور تهران-اراک (+۳ روز انحراف)',
    varianceReasonEn: 'Heavy 80-ton bogie transport road permit delayed by 3 days by highway authority (+3 days variance)',
    rootCauseAnalysis: 'عدم ثبت الکترونیکی باربرگ ترافیکی و وابستگی به تاییدیه دستی فرمانداری‌های مسیر عبور.',
    rootCauseAnalysisEn: 'Manual non-electronic clearance through regional prefecture checkpoints during road repaving.',
    lessonLearned: 'در مدل‌سازی برون‌سپاری قطعات بالای ۵۰ تن، زمان حمل باید حداقل ۵ روز با توزیع لاگ‌نرمال فرض شود.',
    lessonLearnedEn: 'For outsourced parts >50 tons, minimum 5 days transport buffer must be calibrated into model.',
    ruleOrParameterUpdate: 'HEAVY_LOGISTICS_MIN_BUFFER_DAYS: 2 -> 5 Days (بروزرسانی پارامتر زمان لجستیک فوق‌سنگین در موتور تصمیم)',
    ruleOrParameterUpdateEn: 'HEAVY_LOGISTICS_MIN_BUFFER_DAYS: 2 -> 5 Days (Lead time parameter auto-calibrated)',
    modelAdjustmentMade: 'افزایش ضریب بافر حمل و نقل سنگین از ۲ به ۵ روز تقویمی در موتور شبیه‌سازی'
  },
  {
    id: 'LR-2025-02',
    date: '2025-11-20',
    decisionRef: 'DEC-20251120-11',
    resourceId: 'RES-VPI-AUTOCLAVE-01',
    alternativeChosen: '۳ شیفت کردن سالن سیم‌پیچی در ایام پیک پاییز',
    alternativeChosenEn: '3-Shift Operation in Winding Shop during Autumn Peak',
    baselineAssumption: 'تامین پیوسته گاز طبیعی کارخانه جهت پیش‌گرم محفظه رزین وکیوم VPI با دبی نامی.',
    baselineAssumptionEn: 'Continuous natural gas supply to pre-heat VPI autoclave at rated flow rate.',
    actionExecuted: 'افزایش شیفت‌های تکنسین‌ها به صورت ۲۴ ساعته و اجرای چرخه تزریق رزین اپوکسی.',
    actionExecutedEn: 'Around-the-clock 3-shift technician deployment for epoxy resin impregnation cycle.',
    predictedDelayDays: 2,
    actualDelayDays: 3,
    predictedCostIRR: 1200000000,
    actualCostIRR: 1250000000,
    varianceReason: 'افت فشار گاز کارخانه در آذرماه و تاخیر در پیش‌گرم کلاوه عایق (+۱ روز انحراف)',
    varianceReasonEn: 'Winter factory gas pressure curtailment causing 18-hour delay in autoclave pre-heating (+1 day)',
    rootCauseAnalysis: 'سهمیه‌بندی فصلی گاز صنعتی توسط شرکت ملی گاز و تاخیر در فعال‌سازی مشعل‌های دوگانه‌سوز گازوئیلی.',
    rootCauseAnalysisEn: 'Seasonal industrial gas curtailment by national utility before dual-fuel burners kicked in.',
    lessonLearned: 'اعمال فیلتر افت انرژی فصلی برای فرآیند پخت رزین VPI در بازه ۱۵ آبان تا ۱۵ بهمن ضروری است.',
    lessonLearnedEn: 'Seasonal thermal energy restriction filter must be activated for VPI from Nov 5 to Feb 5.',
    ruleOrParameterUpdate: 'VPI_THERMAL_SEASONAL_RESTRICTION_FLAG: True [Nov 5 - Feb 5] (تعدیل راندمان حرارتی کلاوه)',
    ruleOrParameterUpdateEn: 'VPI_THERMAL_SEASONAL_RESTRICTION_FLAG: True [Nov 5 - Feb 5] (Thermal de-rating applied)',
    modelAdjustmentMade: 'اضافه شدن برچسب محدودیت گاز به پروفایل زمستانه کلاوه VPI'
  }
];

// Aliases for mission control modules
export const initialResources = INITIAL_RESOURCES;
export const initialOperations = INITIAL_OPERATIONS;
export const initialOrders = INITIAL_PRODUCTION_ORDERS;
export const initialProjects = INITIAL_PROJECTS;
export const initialCommitments = INITIAL_COMMITMENTS;
export const initialCashFlowEvents = INITIAL_CASH_EVENTS;

export const goldenScenarioDisruption = {
  resourceId: 'RES-MCH-BORING-PAMA',
  resourceName: 'بورینگ CNC پاما (PAMA Speedram 2000)',
  downtimeDays: 20,
  cause: 'خرابی یونیت هیدرولیک اسپیندل و بلبرینگ‌های دوربالا (Spindle Hydraulic Failure)',
  causeEn: 'Main Spindle Hydraulic & high-speed bearings failure',
  startDate: '2026-04-10',
  estimatedResolutionDate: '2026-04-30',
  startOffsetDays: 0,
  strategicProfile: 'BALANCED' as const
};

export const initialHistoricalLogs = [
  {
    logId: 'DEC-20250814-04',
    date: '2025-08-14',
    disruptionSummary: 'توقف ۱۸ روزه فرز دروازه‌ای پاما به دلیل سوختن درایو زیمنس',
    disruptionSummaryEn: '18-day PAMA gantry outage due to Siemens drive failure',
    selectedAlternative: 'برون‌سپاری به ماشین‌سازی اراک',
    rationale: 'جلوگیری از برخورد با مایل‌استون تحویل نیروگاه سیکل ترکیبی جهرم',
    rationaleEn: 'Protecting critical Jahrom milestone from liquidated damages',
    predictedOutcome: {
      delayDays: 6,
      costIRR: 2800000000,
      cashDelayDays: 14
    },
    actualOutcome: {
      delayDays: 9,
      costIRR: 3350000000,
      cashDelayDays: 20
    },
    learningLesson: 'تاخیر ۳ روزه راهداری در صدور مجوز بار ترافیکی بوژی ۸۰ تنی در محور تهران-اراک نشان داد بافر ترانزیت باید از ۲ به ۵ روز افزایش یابد.',
    learningLessonEn: 'Road transit police permit delayed the 80t hauler by 3 days; calibrated transport buffer from 2 to 5 days.'
  },
  {
    logId: 'DEC-20251120-11',
    date: '2025-11-20',
    disruptionSummary: 'افت فشار گاز و محدودیت حرارتی کلاوه عایق‌بندی VPI استاتور',
    disruptionSummaryEn: 'Factory gas pressure drop during winter peak impacting VPI resin cure',
    selectedAlternative: 'فعال‌سازی شیفت شب و گرمایش الکتریکی کمکی',
    rationale: 'تکمیل فرآیند اشباع رزین پیش از سرد شدن هسته استاتور',
    rationaleEn: 'Ensuring continuous resin impregnating cycle before core cooling',
    predictedOutcome: {
      delayDays: 2,
      costIRR: 1200000000,
      cashDelayDays: 5
    },
    actualOutcome: {
      delayDays: 3,
      costIRR: 1250000000,
      cashDelayDays: 7
    },
    learningLesson: 'در بازه ۱۵ آبان تا ۱۵ بهمن ضریب افت حرارتی زمستانه به پروفایل سالن سیم‌پیچی اعمال شد.',
    learningLessonEn: 'Seasonal thermal energy restrictions calibrated into VPI schedule profile from Nov to Feb.'
  }
];

export const initialSapMappings: any[] = [
  {
    tableName: 'CRHD + KAKO',
    description: 'Work Center Header & Capacity Definition',
    cdsView: 'I_WorkCenterCapacity',
    rfcOrBapi: 'BAPI_WORKCENTER_GETDETAIL',
    canonicalEntity: 'canonical.resource_node',
    extractionSchedule: 'Daily (24h Batch)',
    freshnessSLA: '< 24 Hours',
    module: 'PP / PM',
    keyFields: ['ARBPL', 'WERKS', 'KAPID'],
    transformationLogic: 'Map ARBPL to resourceId, KAKO capacity to nominal capacity and MTBF/MTTR history.'
  },
  {
    tableName: 'AFKO + AUFK',
    description: 'Production Order Master & Scheduling Dates',
    cdsView: 'I_ProductionOrder',
    rfcOrBapi: 'BAPI_PRODORD_GET_DETAIL',
    canonicalEntity: 'canonical.production_order',
    extractionSchedule: 'Hourly (1h Delta)',
    freshnessSLA: '< 60 Minutes',
    module: 'PP',
    keyFields: ['AUFNR', 'PLNBEZ', 'GLTRS'],
    transformationLogic: 'Map AUFNR to production order, linking component BOM to turbine generator WBS.'
  },
  {
    tableName: 'AFVC + AFVV',
    description: 'Routing Operations & Work Center Assignments',
    cdsView: 'I_ProductionOperation',
    rfcOrBapi: 'RFC_READ_TABLE',
    canonicalEntity: 'canonical.production_operation',
    extractionSchedule: 'Every 4 Hours',
    freshnessSLA: '< 4 Hours',
    module: 'PP',
    keyFields: ['AUFPL', 'APLZL', 'VORNR', 'VGW01', 'VGW02'],
    transformationLogic: 'Extract operation sequence, standard hours (VGW01/02), setup time, and predecessor links.'
  },
  {
    tableName: 'AFRU',
    description: 'Shop Floor Order Confirmations & Time Events',
    cdsView: 'I_ProdOrderConfirmation',
    rfcOrBapi: 'BAPI_PRODORDCONF_CREATE_TT',
    canonicalEntity: 'canonical.operation_progress',
    extractionSchedule: 'Real-time (15 min)',
    freshnessSLA: '< 15 Minutes',
    module: 'PP',
    keyFields: ['RUECK', 'RMZHL', 'ISMNW_2'],
    transformationLogic: 'Real-time progress percentage ingestion to detect active operational stalls.'
  },
  {
    tableName: 'PROJ + PRPS',
    description: 'Project Definition & WBS Hierarchy',
    cdsView: 'I_EnterpriseProject',
    rfcOrBapi: 'BAPI_PROJECT_GETINFO',
    canonicalEntity: 'canonical.project_entity',
    extractionSchedule: 'Daily (24h)',
    freshnessSLA: '< 24 Hours',
    module: 'PS',
    keyFields: ['PSPID', 'POSID', 'POST1'],
    transformationLogic: 'Build WBS tree linking stator, rotor, excitation, and final assembly.'
  },
  {
    tableName: 'VBAK + VBKD',
    businessObject: 'CustomerContract',
    description: 'Sales Contracts & Billing Milestones',
    cdsView: 'I_SalesContractItem',
    rfcOrBapi: 'BAPI_SALESORDER_GETDETAIL',
    canonicalEntity: 'canonical.commitment_node',
    extractionSchedule: 'Daily (24h)',
    freshnessSLA: '< 24 Hours',
    module: 'SD',
    keyFields: ['VBELN', 'VALDT', 'BSTNK'],
    transformationLogic: 'Map customer delivery dates, LD penalty terms, and payment release conditions.'
  },
  {
    tableName: 'ACDOCA (Universal Journal)',
    businessObject: 'JournalEntry',
    description: 'General Ledger Line Items & Financial Receivables',
    cdsView: 'I_UniversalJournalEntryItem',
    rfcOrBapi: 'BAPI_ACC_DOCUMENT_RECORD',
    canonicalEntity: 'canonical.cash_flow_event',
    extractionSchedule: 'Real-time Delta (5 min)',
    freshnessSLA: '< 15 Minutes',
    module: 'FI / CO',
    keyFields: ['RBUKRS', 'GJAHR', 'BELNR', 'DOCLN'],
    transformationLogic: 'Compute net cash flow exposure and working capital financing impacts from delayed billings.'
  }
];

