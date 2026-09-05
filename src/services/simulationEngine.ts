import { 
  DisruptionInput, 
  ImpactSummary, 
  AlternativeOption, 
  StrategicProfile,
  ResourceNode,
  ProductionOperation,
  ProductionOrder,
  ProjectEntity,
  CommitmentNode
} from '../types';

export function calculateImpactPropagation(
  disruption: DisruptionInput,
  resources: ResourceNode[],
  operations: ProductionOperation[],
  orders: ProductionOrder[],
  projects: ProjectEntity[],
  commitments: CommitmentNode[]
): ImpactSummary {
  const targetResource = resources.find(r => r.resourceId === disruption.resourceId) || resources[0];

  // 1. Identify directly affected operations
  const directlyAffectedOps = operations.filter(
    op => op.allocatedResourceId === targetResource.resourceId && op.status !== 'CONFIRMED'
  );

  // 2. Cascade through predecessor/successor routing links
  const affectedOpIds = new Set<string>(directlyAffectedOps.map(op => op.operationId));
  
  let addedNew = true;
  while (addedNew) {
    addedNew = false;
    operations.forEach(op => {
      if (op.predecessorOpId && affectedOpIds.has(op.predecessorOpId) && !affectedOpIds.has(op.operationId)) {
        affectedOpIds.add(op.operationId);
        addedNew = true;
      }
    });
  }

  const allAffectedOps = operations.filter(op => affectedOpIds.has(op.operationId));

  // 3. Affected Production Orders
  const affectedOrderIds = new Set<string>(allAffectedOps.map(op => op.sapProdOrder));
  const affectedOrders = orders.filter(o => affectedOrderIds.has(o.orderId));

  // 4. Affected Projects
  const affectedProjectIds = new Set<string>(allAffectedOps.map(op => op.projectId));
  const affectedProjects = projects.filter(p => affectedProjectIds.has(p.projectId));

  // 5. Affected Commitments
  const affectedCommitments = commitments.filter(c => 
    c.requiredOperationIds.some(reqOpId => affectedOpIds.has(reqOpId))
  );

  // 6. Quantitative Schedule and Financial Cascade
  // Raw delay in calendar days incorporates setup buffer and shift loss
  const rawDelayDays = Math.round(disruption.downtimeDays * 1.1);

  let totalPenaltyRiskIRR = 0;
  let delayedCashInflowIRR = 0;
  let maxProjectDelayDays = rawDelayDays;

  affectedCommitments.forEach(comm => {
    if (comm.type === 'CUSTOMER_DELIVERY') {
      // In Iranian contracts, 10-day grace period is standard before daily liquidated damages apply
      const penaltyDays = Math.max(0, rawDelayDays);
      totalPenaltyRiskIRR += penaltyDays * comm.dailyPenaltyIRR;
    } else if (comm.type === 'BILLING_MILESTONE') {
      delayedCashInflowIRR += comm.cashInflowOnCompletionIRR;
      totalPenaltyRiskIRR += rawDelayDays * comm.dailyPenaltyIRR;
    }
  });

  const dailyPenaltyBurnRateIRR = affectedCommitments.reduce((acc, c) => acc + c.dailyPenaltyIRR, 0);

  return {
    disruptedResource: targetResource,
    downtimeDays: disruption.downtimeDays,
    affectedOperations: allAffectedOps,
    affectedProductionOrders: affectedOrders,
    affectedProjects,
    affectedCommitments,
    rawDelayDays,
    totalPenaltyRiskIRR,
    delayedCashInflowIRR,
    dailyPenaltyBurnRateIRR,
    maxProjectDelayDays
  };
}

export function generateAlternatives(
  disruption: DisruptionInput,
  impact: ImpactSummary,
  strategicProfile: StrategicProfile
): AlternativeOption[] {
  const dt = disruption.downtimeDays;

  // Alternative A: Expedited In-House Repair
  const altACost = 5800000000; // 5.8B IRR (580M Toman)
  const altADelay = Math.max(3, Math.round(dt * 0.4)); // e.g. 8 days for 20-day outage
  const altAPenalty = altADelay * impact.dailyPenaltyBurnRateIRR;

  // Alternative B: Qualified Outsourcing to Machine Sazi Arak
  const altBCost = 3400000000; // 3.4B IRR (340M Toman)
  const altBDelay = Math.max(2, Math.round(dt * 0.2)); // e.g. 4 days (2 days setup + 2 days transport)
  const altBPenalty = altBDelay * impact.dailyPenaltyBurnRateIRR;

  // Alternative C: Reallocate to Waldrich Coburg
  const altCCost = 1900000000; // 1.9B IRR (190M Toman)
  const altCDelay = Math.max(5, Math.round(dt * 0.55)); // e.g. 11 days (fixture setup + 15% lower speed)
  const altCPenalty = altCDelay * impact.dailyPenaltyBurnRateIRR;

  // Alternative D: Resequencing / Passive Acceptance
  const altDCost = 0;
  const altDDelay = impact.rawDelayDays;
  const altDPenalty = impact.totalPenaltyRiskIRR;

  const rawOptions: AlternativeOption[] = [
    {
      id: 'ALT-EXPEDITE-REPAIR',
      title: 'تعمیر اضطراری با تعویض کیت اسپیندل هوایی و ۳ شیفت نت',
      titleEn: 'Expedited In-House Repair via Airfreight Kit & 3-Shift Overhaul',
      strategy: 'REPAIR',
      description: 'تامین کیت شیرهای سروو و بلبرینگ‌های اسپیندل از انبار پشتیبان، فعال‌سازی تیم نگهداری و تعمیرات در ۳ شیفت کاری ۲۴ ساعته و کاهش مدت توقف از ۲۰ به ۷ روز تقویمی.',
      descriptionEn: 'Emergency overhaul using airfreighted spare bearings, activating 3 maintenance shifts 24/7, compressing downtime from 20 to 7 days.',
      directCostIRR: altACost,
      scheduleDelayDays: altADelay,
      penaltiesIncurredIRR: altAPenalty,
      cashImpactDeltaIRR: -altACost - altAPenalty,
      technicalRisk: 2.0,
      executionConfidence: 90,
      compositeScore: 0,
      isFeasible: true,
      constraintFlags: ['نیاز به تامین ارز فوری جهت ترخیص کیت یدکی', 'محدودیت سقف اضافه‌کاری پرسنل نت کارگاه'],
      constraintFlagsEn: ['Immediate foreign currency needed for customs clearance', 'Overtime limit on mechanical maintenance crew'],
      actionSteps: [
        'صدور سفارش خرید فوری قطعات یدکی در سیستم SAP PM (کد قطعه: SP-PAMA-SPN-88)',
        'تخصیص ۶ تکنسین ارشد مکانیک و هیدرولیک در قالب ۳ شیفت کاری ۸ ساعته',
        'کالیبراسیون لیزری و آزمون ارتعاش‌سنجی اسپیندل پیش از راه‌اندازی'
      ],
      actionStepsEn: [
        'Issue emergency spare parts PR in SAP PM (Part: SP-PAMA-SPN-88)',
        'Assign 6 senior mechanical/hydraulic technicians across three 8-hour shifts',
        'Perform laser calibration and vibration testing before handover'
      ],
      sapExecutionInstructions: [
        'SAP PM: Create Maintenance Order Type PM02 (Breakdown Maintenance)',
        'SAP MM: Create Urgent Purchase Order with Account Assignment F',
        'SAP PP: Reschedule Operation OP-ST-0030 Start Date to Day +7'
      ],
      recommended: false
    },
    {
      id: 'ALT-OUTSOURCE-ARAK',
      title: 'برون‌سپاری فرزکاری پوسته استاتور به ماشین‌سازی اراک',
      titleEn: 'Subcontracting Stator Machining to Machine Sazi Arak',
      strategy: 'OUTSOURCE',
      description: 'انتقال پوسته جوشکاری‌شده استاتور (۸۰ تن) با بوژی تریلر ویژه به کارخانه ماشین‌سازی اراک، اجرای عملیات فرزکاری روی بورینگ اسکوپ دروازه‌ای و بازگشت قطعه ظرف ۱۲ روز.',
      descriptionEn: 'Transfer 80-ton welded stator frame via multi-axle bogie to Machine Sazi Arak for machining on heavy ŠKODA boring mill, returning in 12 days.',
      directCostIRR: altBCost,
      scheduleDelayDays: altBDelay,
      penaltiesIncurredIRR: altBPenalty,
      cashImpactDeltaIRR: -altBCost - altBPenalty,
      technicalRisk: 3.2,
      executionConfidence: 85,
      compositeScore: 0,
      isFeasible: true,
      constraintFlags: ['اخذ مجوز تردد ترافیکی پلیس راهور برای محموله ترافیکی ۸۰ تن', 'الزام استقرار ناظر مقیم کنترل کیفیت مپنا پارس در اراک'],
      constraintFlagsEn: ['Heavy transport highway permit required for 80-ton load', 'Resident QA Inspector required at contractor facility'],
      actionSteps: [
        'انعقاد الحاقیه قرارداد پیمانکاری فرعی با شرکت ماشین‌سازی اراک طبق تعرفه مصوب',
        'هماهنگی شرکت باربری سنگین مپنا جهت اعزام بوژی و اسکورت جاده‌ای',
        'ارسال برنامه‌های CNC و فیکسچرهای زاویه‌گیر استاتور به کارگاه پیمانکار'
      ],
      actionStepsEn: [
        'Execute subcontract amendment with Machine Sazi Arak under approved rate sheet',
        'Dispatch multi-axle heavy hauler with highway police escort',
        'Deliver CNC part program and fixture jigs to partner shop'
      ],
      sapExecutionInstructions: [
        'SAP PP: Convert Operation OP-ST-0030 to External Processing (Control Key PP02)',
        'SAP MM: Auto-generate Subcontracting Purchase Order (Item Category L)',
        'SAP MM: Post Goods Movement 541 (Transfer stock to subcontractor)'
      ],
      recommended: false
    },
    {
      id: 'ALT-REALLOC-WALDRICH',
      title: 'بازتخصیص به فرز دروازه‌ای والدریش کوبورگ و بازچینی فیکسچر',
      titleEn: 'Capacity Reallocation to Waldrich Coburg Gantry Mill',
      strategy: 'REALLOCATE',
      description: 'جابجایی قطعه‌کار استاتور به ماشین مجاور (والدریش کوبورگ)، تعویض فیکسچر و کاهش راندمان زمانی به دلیل اشغال بودن با شفت هیدروژنراتور کارون و تاخیر دومینویی ثانویه.',
      descriptionEn: 'Reallocate stator machining to adjacent Waldrich Coburg mill, refitting fixtures; causes 18% lower run-rate and secondary 6-day delay on Karun hydro project.',
      directCostIRR: altCCost,
      scheduleDelayDays: altCDelay,
      penaltiesIncurredIRR: altCPenalty,
      cashImpactDeltaIRR: -altCCost - altCPenalty,
      technicalRisk: 2.2,
      executionConfidence: 88,
      compositeScore: 0,
      isFeasible: true,
      constraintFlags: ['ایجاد تاخیر ثانویه ۶ روزه روی پروژه هیدروژنراتور کارون', 'نیاز به ۲۴ ساعت توقف برای تعویض و تراز کردن فیکسچر میز'],
      constraintFlagsEn: ['Causes secondary 6-day ripple delay on Karun Hydro project', 'Requires 24h setup downtime for table fixture changeover'],
      actionSteps: [
        'توقف موقت عملیات OP-HYD-0015 روی ماشین والدریش کوبورگ',
        'تعویض بیس‌پلیت و فیکسچرهای نشیمنگاه فریم استاتور',
        'اجرای ماشین‌کاری با فیدریت محافظه‌کارانه جهت جلوگیری از انحراف گرمایی'
      ],
      actionStepsEn: [
        'Temporarily suspend OP-HYD-0015 on Waldrich Coburg',
        'Swap baseplate fixture to stator frame mounting configuration',
        'Run machining at conservative feed rate to avoid thermal drift'
      ],
      sapExecutionInstructions: [
        'SAP PP: Reassign Work Center in Operation OP-ST-0030 to WC-MCH-GANTRY02',
        'SAP PP: Shift Schedule for Order PO-GEN-HY-4401 by +7 days',
        'SAP CO: Re-calculate Activity Confirmation Rates for Cost Center 4210'
      ],
      recommended: false
    },
    {
      id: 'ALT-PASSIVE-DELAY',
      title: 'پذیرش تاخیر و شیفت تقویم تحویل پروژه (Resequencing / No Action)',
      titleEn: 'Passive Schedule Resequencing (Full Delay Acceptance)',
      strategy: 'RESEQUENCE',
      description: 'عدم انجام اقدام هزینه‌زا و پذیرش توقف ۲۰ روزه ماشین تا اتمام تعمیرات استاندارد، تحمیل تاخیر ۲۲ روزه به مایل‌استون تحویل و پرداخت جریمه دیرکرد سنگین قراردادی.',
      descriptionEn: 'No intervention; accept 20 days machine downtime until standard overhaul finishes; incurs 22 days delay and maximum contractual liquidated damages.',
      directCostIRR: altDCost,
      scheduleDelayDays: altDDelay,
      penaltiesIncurredIRR: altDPenalty,
      cashImpactDeltaIRR: -altDPenalty,
      technicalRisk: 1.0,
      executionConfidence: 99,
      compositeScore: 0,
      isFeasible: true,
      constraintFlags: ['نقض جدی تاریخ تعهد تحویل به شرکت برق حرارتی (TPPH)', 'تعویق ۴۲ میلیارد ریال وصول صورت‌وضعیت مالی مرحله‌ای'],
      constraintFlagsEn: ['Severe breach of contractual delivery to TPPH client', '42 Billion IRR billing milestone cash inflow delayed by 3+ weeks'],
      actionSteps: [
        'ارسال نامه رسمی به کارفرما و درخواست تمدید مجاز زمان تحویل (Force Majeure)',
        'تعدیل برنامه‌ریزی تفصیلی کارگاه در سیستم SAP S/4HANA',
        'آماده‌سازی ذخیره مالی در حساب‌های خزانه‌داری جهت پرداخت جرایم تاخیر'
      ],
      actionStepsEn: [
        'Issue formal request for contractual time extension to TPPH client',
        'Update detailed project schedule in SAP S/4HANA Project System',
        'Provision cash reserves for eventual liquidated damage deductions'
      ],
      sapExecutionInstructions: [
        'SAP PS: Update WBS Basic Finish Date to Day +22',
        'SAP PP: Mass Reschedule Orders via Transaction CM25',
        'SAP FI: Provision Contractual Penalty Liability in GL Account 841020'
      ],
      recommended: false
    }
  ];

  // Calculate Multi-Criteria Scores based on Strategic Profile
  const scoredOptions = rawOptions.map(opt => {
    const score = calculateObjectiveScore(opt, strategicProfile, impact);
    return { ...opt, compositeScore: score };
  });

  // Sort descending by score
  scoredOptions.sort((a, b) => b.compositeScore - a.compositeScore);

  // Mark the highest scoring option as recommended
  if (scoredOptions.length > 0) {
    scoredOptions[0].recommended = true;
  }

  return scoredOptions;
}

export function calculateObjectiveScore(
  alt: AlternativeOption,
  profile: StrategicProfile,
  impact: ImpactSummary
): number {
  // Weights configuration
  let wDelay = 0.30;
  let wCost = 0.20;
  let wCash = 0.30;
  let wRisk = 0.20;

  switch (profile) {
    case 'CASH_CRISIS':
      wDelay = 0.10;
      wCost = 0.15;
      wCash = 0.65;
      wRisk = 0.10;
      break;
    case 'DELIVERY_CRISIS':
      wDelay = 0.60;
      wCost = 0.10;
      wCash = 0.10;
      wRisk = 0.20;
      break;
    case 'MARGIN_PROTECTION':
      wDelay = 0.20;
      wCost = 0.50;
      wCash = 0.20;
      wRisk = 0.10;
      break;
    case 'BALANCED':
    default:
      wDelay = 0.30;
      wCost = 0.20;
      wCash = 0.30;
      wRisk = 0.20;
      break;
  }

  // Normalization baselines:
  // Max delay baseline: impact.rawDelayDays (e.g. 24 days) -> 0 score; 0 delay -> 100 score
  const maxDelay = Math.max(25, impact.rawDelayDays);
  const delayScore = Math.max(0, 100 - (alt.scheduleDelayDays / maxDelay) * 100);

  // Cost score: Max cost reference ~ 10 Billion IRR (10,000,000,000)
  const maxCost = 10000000000;
  const costScore = Math.max(0, 100 - ((alt.directCostIRR + alt.penaltiesIncurredIRR) / maxCost) * 100);

  // Cash score: measures liquidity preservation (direct cost + cash penalties avoided)
  const cashScore = Math.max(0, 100 - (Math.abs(alt.cashImpactDeltaIRR) / maxCost) * 100);

  // Technical Risk score: risk is 1 to 5. 1 is best (100), 5 is worst (0)
  const riskScore = Math.max(0, 100 - ((alt.technicalRisk - 1) / 4) * 100);

  const composite = (
    wDelay * delayScore +
    wCost * costScore +
    wCash * cashScore +
    wRisk * riskScore
  );

  return Math.round(composite * 10) / 10;
}
