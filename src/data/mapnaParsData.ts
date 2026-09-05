import { 
  ResourceNode, 
  ProductionOperation, 
  ProductionOrder, 
  ProjectEntity, 
  CommitmentNode, 
  CashFlowEvent, 
  SapTableMapping,
  LearningRecord
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
    nominalHourlyCostIRR: 35000000, // 35M IRR/hr (3.5M Toman/hr)
    overtimeHourlyCostIRR: 52500000,
    mtbfHours: 720,
    mttrHours: 48,
    operationalAvailability: 0.88,
    maxWorkpieceWeightTon: 120,
    toleranceMm: 0.012,
    energyRestricted: true,
    currentStatus: 'DISRUPTED', // Golden scenario active!
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
    maxWorkpieceWeightTon: 150,
    toleranceMm: 0.008,
    energyRestricted: true,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-VPI-AUTOCLAVE-01',
    sapWorkCenter: 'WC-WND-VPI01',
    name: 'تاسیسات اشباع رزین تحت خلأ و فشار استاتور (VPI Autoclave)',
    nameEn: 'Stator Vacuum Pressure Impregnation (VPI) Autoclave Plant',
    category: 'FACILITY',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'سالن سیم‌پیچی و عایق‌کاری فشار قوی',
    shopEn: 'High-Voltage Winding & Insulation Shop',
    nominalHourlyCostIRR: 28000000,
    overtimeHourlyCostIRR: 45000000,
    mtbfHours: 1200,
    mttrHours: 24,
    operationalAvailability: 0.95,
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
    category: 'FACILITY',
    criticality: 'A_CRITICAL',
    isBottleneck: true,
    shop: 'سالن آزمون نهایی و بالانس',
    shopEn: 'Final Testing & Balance Pit',
    nominalHourlyCostIRR: 55000000,
    overtimeHourlyCostIRR: 82000000,
    mtbfHours: 1500,
    mttrHours: 30,
    operationalAvailability: 0.97,
    maxWorkpieceWeightTon: 80,
    toleranceMm: 0.002,
    energyRestricted: true,
    currentStatus: 'OPERATIONAL'
  },
  {
    resourceId: 'RES-WINDING-FORM-01',
    sapWorkCenter: 'WC-WND-FORM01',
    name: 'خط فرمینگ، نوارپیچی میکا و تست شمش‌های مسی روتور و استاتور',
    nameEn: 'Copper Bar Forming, Mica Taping & Surge Testing Line',
    category: 'MACHINE',
    criticality: 'B_IMPORTANT',
    isBottleneck: false,
    shop: 'سالن سیم‌پیچی و عایق‌کاری فشار قوی',
    shopEn: 'High-Voltage Winding & Insulation Shop',
    nominalHourlyCostIRR: 15000000,
    overtimeHourlyCostIRR: 22500000,
    mtbfHours: 650,
    mttrHours: 12,
    operationalAvailability: 0.91,
    maxWorkpieceWeightTon: 5,
    toleranceMm: 0.02,
    energyRestricted: false,
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
    status: 'SAFE',
    cashInflowOnCompletionIRR: 0,
    requiredOperationIds: ['OP-CLSF-0025']
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
    commitments: [],
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
    description: 'وصول صورت‌وضعیت تاییدشده اتمام استکینگ و تست VPI پوسته',
    descriptionEn: 'Milestone 4 Stacking & VPI Inflow Collection',
    cleared: false
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
    cleared: false
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
    cleared: false
  }
];

export const SAP_TABLE_MAPPINGS: SapTableMapping[] = [
  {
    sapTable: 'CRHD + KAKO',
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
    sapDescription: 'Sales Orders & Contractual Milestones',
    cdsView: 'I_SalesContractItem',
    rfcOrBapi: 'BAPI_SALESORDER_GETDETAIL',
    canonicalEntity: 'canonical.commitment_node',
    refreshFrequency: 'Daily (24h)',
    keyFields: ['VBELN', 'VALDT', 'BSTNK'],
    extractionMethod: 'CDS View Delta Load'
  },
  {
    sapTable: 'FAGLFLEXA + BSEG',
    sapDescription: 'General Ledger Line Items & Receivables',
    cdsView: 'C_OperationalAccountsPayable',
    rfcOrBapi: 'BAPI_ACC_DOCUMENT_RECORD',
    canonicalEntity: 'canonical.cash_flow_event',
    refreshFrequency: 'Daily (Nightly)',
    keyFields: ['BELNR', 'GJAHR', 'WRBTR', 'ZUONR'],
    extractionMethod: 'Read-only CDS View'
  }
];

export const INITIAL_LEARNING_RECORDS: LearningRecord[] = [
  {
    id: 'LR-2025-01',
    date: '2025-08-14',
    decisionRef: 'DEC-20250814-04',
    resourceId: 'RES-MCH-BORING-PAMA',
    alternativeChosen: 'برون‌سپاری فرزکاری پوسته استاتور به ماشین‌سازی اراک',
    predictedDelayDays: 6,
    actualDelayDays: 9,
    predictedCostIRR: 2800000000,
    actualCostIRR: 3350000000,
    varianceReason: 'تاخیر در صدور مجوز حمل ترافیکی بوژی ۸۰ تنی توسط راهداری در محور تهران-اراک',
    varianceReasonEn: 'Heavy 80-ton bogie transport road permit delayed by 3 days by highway authority',
    lessonLearned: 'در مدل‌سازی برون‌سپاری قطعات بالای ۵۰ تن، زمان حمل باید حداقل ۵ روز با توزیع لاگ‌نرمال فرض شود.',
    lessonLearnedEn: 'For outsourced parts >50 tons, minimum 5 days transport buffer must be calibrated into model.',
    modelAdjustmentMade: 'افزایش ضریب بافر حمل و نقل سنگین از ۲ به ۵ روز تقویمی در موتور شبیه‌سازی'
  },
  {
    id: 'LR-2025-02',
    date: '2025-11-20',
    decisionRef: 'DEC-20251120-11',
    resourceId: 'RES-VPI-AUTOCLAVE-01',
    alternativeChosen: '۳ شیفت کردن سالن سیم‌پیچی در ایام پیک پاییز',
    predictedDelayDays: 2,
    actualDelayDays: 3,
    predictedCostIRR: 1200000000,
    actualCostIRR: 1250000000,
    varianceReason: 'افت فشار گاز کارخانه در آذرماه و تاخیر در پیش‌گرم کلاوه عایق',
    varianceReasonEn: 'Winter factory gas pressure curtailment causing 18-hour delay in autoclave pre-heating',
    lessonLearned: 'اعمال فیلتر افت انرژی فصلی برای فرآیند پخت رزین VPI در بازه ۱۵ آبان تا ۱۵ بهمن ضروری است.',
    lessonLearnedEn: 'Seasonal thermal energy restriction filter must be activated for VPI from Nov 5 to Feb 5.',
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
    tableName: 'FAGLFLEXA + BSEG',
    description: 'General Ledger Line Items & Receivables',
    cdsView: 'C_OperationalAccountsPayable',
    rfcOrBapi: 'BAPI_ACC_DOCUMENT_RECORD',
    canonicalEntity: 'canonical.cash_flow_event',
    extractionSchedule: 'Daily (Nightly)',
    freshnessSLA: '< 24 Hours',
    module: 'FI / CO',
    keyFields: ['BELNR', 'GJAHR', 'WRBTR', 'ZUONR'],
    transformationLogic: 'Compute net cash flow exposure and working capital impacts from delayed billings.'
  }
];

