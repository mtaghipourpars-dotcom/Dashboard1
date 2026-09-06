import { 
  CouncilMember, 
  AlternativeOption, 
  ImpactSummary, 
  DisruptionInput, 
  DecisionPackage, 
  StrategicProfile 
} from '../types';

export interface OrganizationalExecutive {
  agentId: string;
  roleKey: 'CEO' | 'CFO' | 'ENGINEERING' | 'PRODUCTION' | 'CHRO' | 'SUPPLY_CHAIN' | 'DIGITAL' | 'COMMITMENT_MGR';
  agentName: string;
  agentNameEn: string;
  currentOfficeHolder: string;
  currentOfficeHolderEn: string;
  officialTitle: string;
  officialTitleEn: string;
  avatarColor: string;
}

export const MAPNA_EXECUTIVE_STRUCTURE: Record<string, OrganizationalExecutive> = {
  CEO: {
    agentId: 'AGENT-EXEC-CEO-01',
    roleKey: 'CEO',
    agentName: 'عامل هوشمند مدیرعامل (CEO Agent)',
    agentNameEn: 'Managing Director & CEO Agent',
    currentOfficeHolder: 'دکتر تقی‌پور',
    currentOfficeHolderEn: 'Dr. Taghipour',
    officialTitle: 'مدیرعامل و رئیس هیئت تصمیم‌گیری سازمانی مپنا پارس',
    officialTitleEn: 'CEO & Chair of Enterprise Decision Council',
    avatarColor: 'bg-purple-700'
  },
  CFO: {
    agentId: 'AGENT-EXEC-CFO-02',
    roleKey: 'CFO',
    agentName: 'عامل هوشمند معاونت مالی و خزانه‌داری (CFO Agent)',
    agentNameEn: 'Chief Financial Officer Agent',
    currentOfficeHolder: 'دکتر حسینی',
    currentOfficeHolderEn: 'Dr. Hosseini',
    officialTitle: 'معاونت مالی، اقتصادی و امور مجامع',
    officialTitleEn: 'Senior VP of Finance, Treasury & Commercial Affairs',
    avatarColor: 'bg-emerald-600'
  },
  ENGINEERING: {
    agentId: 'AGENT-EXEC-CTO-03',
    roleKey: 'ENGINEERING',
    agentName: 'عامل هوشمند مهندسی و تضمین کیفیت (CTO/QA Agent)',
    agentNameEn: 'Chief Technology & Quality Assurance Agent',
    currentOfficeHolder: 'دکتر رحیمی',
    currentOfficeHolderEn: 'Dr. Rahimi',
    officialTitle: 'مدیر مهندسی محصول، فرآیند ساخت و استانداردهای کیفی',
    officialTitleEn: 'Director of Process Engineering & Quality Assurance',
    avatarColor: 'bg-cyan-600'
  },
  PRODUCTION: {
    agentId: 'AGENT-EXEC-COO-04',
    roleKey: 'PRODUCTION',
    agentName: 'عامل هوشمند تولید و بهره‌برداری (COO Agent)',
    agentNameEn: 'Chief Operating Officer Agent',
    currentOfficeHolder: 'مهندس کاظمی',
    currentOfficeHolderEn: 'Eng. Kazemi',
    officialTitle: 'معاونت بهره‌برداری و کارخانجات ساخت توربین و ژنراتور',
    officialTitleEn: 'Senior VP of Manufacturing & Operations',
    avatarColor: 'bg-amber-600'
  },
  CHRO: {
    agentId: 'AGENT-EXEC-CHRO-05',
    roleKey: 'CHRO',
    agentName: 'عامل هوشمند سرمایه انسانی (CHRO Agent)',
    agentNameEn: 'Chief Human Resources Officer Agent',
    currentOfficeHolder: 'دکتر صابری',
    currentOfficeHolderEn: 'Dr. Saberi',
    officialTitle: 'معاونت سرمایه انسانی و سازماندهی مهارت‌های تخصصی',
    officialTitleEn: 'VP of Human Resources & Specialist Workforce Governance',
    avatarColor: 'bg-teal-600'
  },
  SUPPLY_CHAIN: {
    agentId: 'AGENT-EXEC-CSCO-06',
    roleKey: 'SUPPLY_CHAIN',
    agentName: 'عامل هوشمند زنجیره تأمین و لجستیک سنگین (CSCO Agent)',
    agentNameEn: 'Chief Supply Chain & Heavy Logistics Agent',
    currentOfficeHolder: 'مهندس مرادی',
    currentOfficeHolderEn: 'Eng. Moradi',
    officialTitle: 'مدیر ارشد تدارکات پروژه‌ها، خرید خارجی و حمل‌ونقل فوق‌سنگین',
    officialTitleEn: 'Director of Procurement, Global Sourcing & Heavy Logistics',
    avatarColor: 'bg-indigo-600'
  },
  DIGITAL: {
    agentId: 'AGENT-EXEC-CDO-07',
    roleKey: 'DIGITAL',
    agentName: 'عامل هوشمند معماری داده و یکپارچگی سامانه‌ها (CDO Agent)',
    agentNameEn: 'Chief Digital & Enterprise Systems Agent',
    currentOfficeHolder: 'مهندس اکبری',
    currentOfficeHolderEn: 'Eng. Akbari',
    officialTitle: 'مدیر ارشد تحول دیجیتال و لایه معنایی داده‌های سازمانی',
    officialTitleEn: 'Enterprise Data Architect & Semantic Integration Lead',
    avatarColor: 'bg-blue-700'
  },
  COMMITMENT_MGR: {
    agentId: 'AGENT-EXEC-CPGO-08',
    roleKey: 'COMMITMENT_MGR',
    agentName: 'عامل هوشمند سبد تعهدات و حاکمیت پروژه‌ها (Portfolio Governance Agent)',
    agentNameEn: 'Enterprise Commitments & Portfolio Governance Agent',
    currentOfficeHolder: 'دکتر انصاری',
    currentOfficeHolderEn: 'Dr. Ansari',
    officialTitle: 'مدیر نظارت بر سبد تعهدات راهبردی و مایل‌استون‌های مپنا پارس',
    officialTitleEn: 'Director of Strategic Portfolio Commitments & Cross-Project Governance',
    avatarColor: 'bg-rose-700'
  }
};

export function assembleExecutiveCouncil(
  disruption: DisruptionInput,
  impact: ImpactSummary,
  recommendedAlt: AlternativeOption,
  strategicProfile: StrategicProfile
): CouncilMember[] {
  const isOutsource = recommendedAlt.strategy === 'OUTSOURCE';
  const isRealloc = recommendedAlt.strategy === 'REALLOCATE';
  const isRepair = recommendedAlt.strategy === 'REPAIR';

  const opportunityCostBillion = ((recommendedAlt.enterpriseOpportunityCostIRR ?? 0) / 1000000000).toFixed(1);
  const netValueBillion = ((recommendedAlt.netEnterpriseValueCreatedIRR ?? 0) / 1000000000).toFixed(1);

  const exec = MAPNA_EXECUTIVE_STRUCTURE;

  return [
    {
      id: 'CEO',
      agentId: exec.CEO.agentId,
      role: exec.CEO.agentName,
      roleEn: exec.CEO.agentNameEn,
      name: exec.CEO.currentOfficeHolder,
      nameEn: exec.CEO.currentOfficeHolderEn,
      title: exec.CEO.officialTitle,
      titleEn: exec.CEO.officialTitleEn,
      stance: 'CONDITIONAL',
      comment: `سؤال محوری من از موتور هوش سازمانی این است: «کدام مسیر بیشترین ارزش اقتصادی خالص قابل‌تحقق را با کمترین هزینه فرصت سازمانی خلق می‌کند؟» گزینه «${recommendedAlt.title}» با خلق ${netValueBillion} میلیارد ریال ارزش خالص و هزینه فرصت سازمانی ${opportunityCostBillion} میلیارد ریال، مسیر مصوب شورا است؛ مشروط به تامین ضمانت‌های کیفی و مجوزهای جاده‌ای.`,
      commentEn: `The core executive inquiry: "Which operational pathway creates maximum net realizable economic value while minimizing enterprise opportunity cost?" Alternative "${recommendedAlt.titleEn}" generates ${netValueBillion} B IRR net value with ${opportunityCostBillion} B IRR opportunity cost. Approved as CONDITIONAL GO pending QA and logistics clearance.`,
      keyQuestion: 'آیا احکام ماموریت ناظران کیفیت و تاییدیه پیش‌نویس الحاقیه ظرف ۲ ساعت آینده آماده تنفیذ است؟',
      keyQuestionEn: 'Are QA resident mission orders and the contract amendment ready for execution within 2 hours?',
      avatarColor: exec.CEO.avatarColor
    },
    {
      id: 'CFO',
      agentId: exec.CFO.agentId,
      role: exec.CFO.agentName,
      roleEn: exec.CFO.agentNameEn,
      name: exec.CFO.currentOfficeHolder,
      nameEn: exec.CFO.currentOfficeHolderEn,
      title: exec.CFO.officialTitle,
      titleEn: exec.CFO.officialTitleEn,
      stance: 'APPROVE',
      comment: `تحلیل مالی چندلایه: صرف ۳.۴ میلیارد ریال هزینه برون‌سپاری، از بروز ۹.۹ میلیارد ریال جریمه تاخیر جلوگیری کرده و از توقف صورت‌وضعیت ۴۲ میلیارد ریالی جهرم ممانعت می‌کند. مهم‌تر از آن، برون‌سپاری هزینه فرصت صفر دارد؛ در حالی که بازتخصیص داخلی (والدریش کوبورگ) به دلیل تاخیر روی شفت کارون، ۳.۱۵ میلیارد ریال هزینه فرصت تحمیل کرده و ارزش خالص آن منفی می‌شود.`,
      commentEn: `Multi-layer financial lineage: Spending 3.4 B IRR prevents 9.9 B IRR in liquidated damages and unfreezes the 42 B IRR billing milestone. Crucially, outsourcing bears ZERO opportunity cost, whereas internal reallocation to Waldrich Coburg inflicts 3.15 B IRR in collateral penalty on Karun Hydro, yielding negative net value.`,
      keyQuestion: 'چگونه پیش‌پرداخت ارزی یا ریالی پیمانکار بدون اختلال در حساب تنخواه‌گردان کارگاه تسویه خواهد شد؟',
      keyQuestionEn: 'How will the contractor advance payment be settled without disrupting factory petty cash liquidity?',
      avatarColor: exec.CFO.avatarColor
    },
    {
      id: 'ENGINEERING',
      agentId: exec.ENGINEERING.agentId,
      role: exec.ENGINEERING.agentName,
      roleEn: exec.ENGINEERING.agentNameEn,
      name: exec.ENGINEERING.currentOfficeHolder,
      nameEn: exec.ENGINEERING.currentOfficeHolderEn,
      title: exec.ENGINEERING.officialTitle,
      titleEn: exec.ENGINEERING.officialTitleEn,
      stance: isOutsource ? 'CONDITIONAL' : 'APPROVE',
      comment: isOutsource
        ? `تلرانس نشیمنگاه ژورنال و رینگ‌های هدر استاتور کمتر از ۰.۰۱۵ میلی‌متر است. ماشین ŠKODA اراک قابلیت تامین این دقت را دارد اما اعزام ناظر مقیم مپنا پارس با دستگاه لیزرتراکر و تست التراسونیک (UT) پیش از ترخیص الزامی است. گزینه‌های غیرمعتبر محلی به دلیل ریسک خارج از مرکز شدن روتور مردود شدند.`
        : `در صورت تعمیر اسپیندل در داخل، کالیبراسیون دینامیکی در دور ۳۰۰۰ و آزمون ارتعاشی و حرارتی کامل پیش از بارگذاری مجدد قطعه الزامی است.`,
      commentEn: isOutsource
        ? `Stator journal bearing seat tolerance is tighter than 0.015mm. Machine Sazi Arak's ŠKODA mill can maintain this, but dispatching our resident QA inspector with laser-tracker and ultrasonic testing (UT) is non-negotiable. Uncertified local options were rightly rejected.`
        : `In-house spindle overhaul requires full dynamic run-out calibration at 3000 RPM before workpiece mounting.`,
      keyQuestion: 'آیا نقشه‌های تلرانسی به‌روزشده و چک‌لیست بازرسی ابعادی پیوست قرارداد پیمانکار شده است؟',
      keyQuestionEn: 'Are updated tolerance blueprints and dimensional checklists attached to the subcontract agreement?',
      avatarColor: exec.ENGINEERING.avatarColor
    },
    {
      id: 'PRODUCTION',
      agentId: exec.PRODUCTION.agentId,
      role: exec.PRODUCTION.agentName,
      roleEn: exec.PRODUCTION.agentNameEn,
      name: exec.PRODUCTION.currentOfficeHolder,
      nameEn: exec.PRODUCTION.currentOfficeHolderEn,
      title: exec.PRODUCTION.officialTitle,
      titleEn: exec.PRODUCTION.officialTitleEn,
      stance: isOutsource ? 'APPROVE' : 'CONDITIONAL',
      comment: isOutsource
        ? `برون‌سپاری پوسته استاتور به اراک، گلوگاه ماشین پاما را آزاد نموده و به تیم نت ما اجازه می‌دهد بدون تعجیل و در آرامش، اسپیندل را اورهال کنند تا برای عملیات بحرانی روتور کلاس F خرم‌آباد در هفته آینده آماده باشد.`
        : `تعمیر داخلی اسپیندل حتی با ۳ شیفت فشرده حداقل ۷ روز طول می‌کشد و انباشت کارهای معوقه، خط تولید روتور کلاس F را دچار توقف زنجیره‌ای می‌کند.`,
      commentEn: isOutsource
        ? `Outsourcing the stator frame unblocks the PAMA bottleneck, permitting our maintenance crew to overhaul the spindle thoroughly and prepare it for next week's critical Class F Khorramabad rotor operation.`
        : `Expedited in-house repair still consumes at least 7 days under 3 compressed shifts, causing an unavoidable backlog collision on the Class F line.`,
      keyQuestion: 'آیا فیکسچرهای زاویه‌گیر و برنامه‌های CNC تست‌شده آماده بارگیری به کارخانه اراک هستند؟',
      keyQuestionEn: 'Are the alignment fixture jigs and validated CNC programs ready for immediate transfer to Arak?',
      avatarColor: exec.PRODUCTION.avatarColor
    },
    {
      id: 'CHRO',
      agentId: exec.CHRO.agentId,
      role: exec.CHRO.agentName,
      roleEn: exec.CHRO.agentNameEn,
      name: exec.CHRO.currentOfficeHolder,
      nameEn: exec.CHRO.currentOfficeHolderEn,
      title: exec.CHRO.officialTitle,
      titleEn: exec.CHRO.officialTitleEn,
      stance: 'APPROVE',
      comment: `در سناریوی تعمیر اضطراری، تیم ۶ نفره تکنسین‌های ارشد مکانیک و هیدرولیک با سقف قانونی ۱۲ ساعت اضافه‌کاری هفتگی و خستگی مفرط مواجه می‌شدند. برون‌سپاری، فشار فیزیکی را از تکنسین‌های کلیدی برداشته و تنها به اعزام ۲ ناظر ارشد کیفیت در قالب ماموریت فنی نیاز دارد که کاملاً منطبق بر ضوابط است.`,
      commentEn: `Under emergency in-house repair, our 6 certified master technicians would breach the 12h/week statutory overtime ceiling and face severe fatigue. Subcontracting relieves operational stress, requiring only 2 resident QA officers on technical field mission.`,
      keyQuestion: 'آیا احکام ماموریت و حق‌الزحمه نظارت شبانه‌روزی ناظران اعزامی به اراک صادر شده است؟',
      keyQuestionEn: 'Have formal field travel orders and 24/7 technical supervision stipends been released for the Arak team?',
      avatarColor: exec.CHRO.avatarColor
    },
    {
      id: 'SUPPLY_CHAIN',
      agentId: exec.SUPPLY_CHAIN.agentId,
      role: exec.SUPPLY_CHAIN.agentName,
      roleEn: exec.SUPPLY_CHAIN.agentNameEn,
      name: exec.SUPPLY_CHAIN.currentOfficeHolder,
      nameEn: exec.SUPPLY_CHAIN.currentOfficeHolderEn,
      title: exec.SUPPLY_CHAIN.officialTitle,
      titleEn: exec.SUPPLY_CHAIN.officialTitleEn,
      stance: 'CONDITIONAL',
      comment: `پوسته استاتور ۸۰ تن وزن ناخالص دارد. جابجایی آن نیازمند بوژی ۱۶ محوره مپنا و مجوز تردد ترافیکی شبانه پلیس راهور در محور البرز-مرکزی است. بافر ۵ روزه برای رفت و برگشت کاملاً واقع‌بینانه است. هماهنگی با راهداری از ساعت ۸ صبح آغاز شده و اسکورت جاده‌ای رزرو گردیده است.`,
      commentEn: `The 80-ton welded stator requires our 16-axle multi-axle bogie and highway police night escort permit on the Karaj-Arak transit corridor. A 5-day round-trip buffer is realistic and road escort reservations are already queued.`,
      keyQuestion: 'آیا بیمه‌نامه تمام‌خطر مهندسی (CAR) برای ارزش ۴۸۰ میلیارد ریالی قطعه‌کار تاییدیه کتبی صادر کرده است؟',
      keyQuestionEn: 'Has the Contractor All-Risks (CAR) transit insurer officially endorsed the 480 Billion IRR workpiece value?',
      avatarColor: exec.SUPPLY_CHAIN.avatarColor
    },
    {
      id: 'DIGITAL',
      agentId: exec.DIGITAL.agentId,
      role: exec.DIGITAL.agentName,
      roleEn: exec.DIGITAL.agentNameEn,
      name: exec.DIGITAL.currentOfficeHolder,
      nameEn: exec.DIGITAL.currentOfficeHolderEn,
      title: exec.DIGITAL.officialTitle,
      titleEn: exec.DIGITAL.officialTitleEn,
      stance: 'APPROVE',
      comment: `معماری ارتباطی Mission Control مبتنی بر لایه معنایی داده‌های یکپارچه (Enterprise Semantic Layer) است که داده‌های SAP S/4HANA (از طریق CDS Views نظیر I_WorkCenterCapacity و I_ProductionOrder) را با تلرانس‌های سیستم PLM و لاگ‌های MES تلفیق می‌کند. تغییر وضعیت عملیات OP-ST-0030 به برون‌سپاری با کنترل‌کی PP02 ظرف چند دقیقه از طریق API سازمانی همگام خواهد شد.`,
      commentEn: `Mission Control communicates via an Enterprise Semantic Layer harmonizing SAP S/4HANA CDS Views with PLM CAD/CAM tolerance models and MES shop-floor telemetry. Converting OP-ST-0030 to subcontracting (Control Key PP02) with automatic Item Category L purchase order syncs via Enterprise Service APIs within minutes.`,
      keyQuestion: 'آیا تغییر تاریخ‌ها در SAP PS با WBS پروژه جهرم بدون تناقض با زنجیره بحرانی سایر پروژه‌ها سینک شده است؟',
      keyQuestionEn: 'Are SAP PS WBS milestone adjustments harmonized with multi-project critical chains without data collisions?',
      avatarColor: exec.DIGITAL.avatarColor
    },
    {
      id: 'COMMITMENT_MGR',
      agentId: exec.COMMITMENT_MGR.agentId,
      role: exec.COMMITMENT_MGR.agentName,
      roleEn: exec.COMMITMENT_MGR.agentNameEn,
      name: exec.COMMITMENT_MGR.currentOfficeHolder,
      nameEn: exec.COMMITMENT_MGR.currentOfficeHolderEn,
      title: exec.COMMITMENT_MGR.officialTitle,
      titleEn: exec.COMMITMENT_MGR.officialTitleEn,
      stance: isRealloc ? 'OBJECT' : 'APPROVE',
      comment: isRealloc
        ? `من با بازتخصیص به ماشین والدریش کوبورگ به دلیل هزینه فرصت ۳.۱۵ میلیارد ریالی به شدت مخالفم! جابجایی قطعه باعث تاخیر ۶ روزه روی روتور هیدروژنراتور سد کارون (COMM-HYDRO-SHAFT-DELIVERY) شده و تعهد دیگری را قربانی می‌کند (Cannibalization). برون‌سپاری به اراک هزینه فرصت صفر دارد و هر دو تعهد را بدون اصطکاک حفظ می‌کند.`
        : `گزینه برون‌سپاری به اراک بهترین تصمیم برای کل سبد تعهدات است؛ زیرا با هزینه فرصت صفر سازمانی، بدون ایجاد تاخیر دومینویی روی روتور کارون در ماشین والدریش یا اشغال ظرفیت روتور کلاس F خرم‌آباد، تعهد تحویل جهرم را ایمن می‌سازد.`,
      commentEn: isRealloc
        ? `I strongly OBJECT to reallocating to Waldrich Coburg due to its 3.15 B IRR opportunity cost! Stealing Waldrich capacity imposes a 6-day ripple delay on the Karun Hydro-generator shaft (cannibalization). Outsourcing carries ZERO opportunity cost and protects both commitments concurrently.`
        : `Subcontracting to Arak is optimal for the entire portfolio: with zero enterprise opportunity cost, it completely prevents project cannibalization, securing Jahrom without compromising Karun Hydro or Class F Khorramabad.`,
      keyQuestion: 'آیا تعهد تحویل روتور خرم‌آباد با آزادسازی بهنگام ماشین پاما در تاریخ مقرر حفظ خواهد شد؟',
      keyQuestionEn: 'Is the Class F Khorramabad rotor delivery commitment fully protected by releasing PAMA on schedule?',
      avatarColor: exec.COMMITMENT_MGR.avatarColor
    }
  ];
}

export function synthesizeDecisionPackage(
  disruption: DisruptionInput,
  impact: ImpactSummary,
  alternatives: AlternativeOption[],
  strategicProfile: StrategicProfile,
  costOfCapitalRatePct: number = 24
): DecisionPackage {
  const recommendedAlt = alternatives.find(a => a.recommended) || alternatives[0];
  const council = assembleExecutiveCouncil(disruption, impact, recommendedAlt, strategicProfile);

  const prerequisites = [
    'استقرار ناظر مقیم کنترل کیفیت مپنا پارس در محل کارخانه ماشین‌سازی اراک همراه با دستگاه لیزرتراکر و تجهیزات UT',
    'بررسی پوشش بیمه تمام‌خطر باربری و محموله ترافیکی سنگین برای ارزش قطعه‌کار (۴۸۰ میلیارد ریال)',
    'صدور هم‌زمان سفارش کار اضطراری در SAP PM برای تعمیر موازی اسپیندل ماشین پاما جهت آزاد شدن برای روتور کلاس F',
    'اخذ مجوز تردد شبانه محموله ترافیکی ۸۰ تن از پلیس راهور محور استان مرکزی - البرز با اسکورت ویژه'
  ];

  const prerequisitesEn = [
    'Deploy resident MAPNA Pars QA inspector with laser-tracker and UT equipment to Machine Sazi Arak factory',
    'Verify active Contractor All-Risks (CAR) transit insurance covering 480 Billion IRR workpiece replacement value',
    'Simultaneously issue SAP PM emergency work order for parallel repair of PAMA spindle to secure Class F project',
    'Secure nocturnal heavy transport clearance permit from highway traffic police with dedicated escort'
  ];

  const criticalInfo = recommendedAlt.criticalMissingInformation;

  return {
    decisionId: `DEC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-098`,
    timestamp: new Date().toISOString(),
    disruption,
    impact,
    alternatives,
    recommendedAlternative: recommendedAlt,
    verdict: 'CONDITIONAL_GO',
    verdictReason: `گزینه «${recommendedAlt.title}» با امتیاز مرکب ${recommendedAlt.compositeScore} از ۱۰۰ به عنوان مسیر بهینه اجرایی برگزیده شد. این تصمیم تاخیر نهایی پروژه را از ۲۲ روز به ۴ روز و جریمه دیرکرد را از ۹.۹ میلیارد ریال به ۱.۸ میلیارد ریال تقلیل داده، از بلوکه شدن ۴۲ میلیارد ریال صورت‌وضعیت مالی جلوگیری می‌نماید و با هزینه فرصت صفر سازمانی، مانع قربانی شدن سایر پروژه‌ها (عدم Cannibalization تعهدات سد کارون و خرم‌آباد) می‌گردد.`,
    verdictReasonEn: `Alternative "${recommendedAlt.titleEn}" with composite score ${recommendedAlt.compositeScore}/100 selected as optimal. It compresses project delay from 22 to 4 days, slashes contractual penalty from 9.9B to 1.8B IRR, protects 42B IRR milestone cash inflow, and avoids cross-project cannibalization with 0 IRR opportunity cost.`,
    prerequisites,
    prerequisitesEn,
    councilDeliberation: council,
    strategicProfile,
    costOfCapitalRatePct,
    confidenceScore: recommendedAlt.executionConfidence,
    valueOfInformation: {
      criticalMissingVariable: criticalInfo?.variable ?? 'تاییدیه قطعی بازه خالی ماشین‌کاری در کارخانه پیمانکار',
      variableEn: criticalInfo?.variableEn ?? 'Contractor open machining window confirmation',
      whyItMatters: criticalInfo?.impactOnChoice ?? 'در صورت عدم تطابق زمان‌بندی آزاد پیمانکار، مسیر تصمیم از برون‌سپاری به تعمیر داخلی سوئیچ خواهد شد.',
      whyItMattersEn: criticalInfo?.impactOnChoiceEn ?? 'If free capacity is unavailable, decision flips to expedited in-house overhaul.',
      flipThreshold: 'ظرفیت خالی کمتر از ۷۰ ساعت یا تاخیر ترانزیت جاده‌ای بیش از ۵ روز',
      flipThresholdEn: 'Free capacity < 70 hours or transit delay > 5 days'
    },
    hardStrategicConstraints: [
      'عدم انحراف تلرانس نشیمنگاه ژورنال بیش از ۰.۰۱۵ میلی‌متر (گیت سخت کیفیت QA)',
      'عدم بارگذاری محموله بیش از تناژ اسمی جرثقیل‌های کارگاه (گیت سخت ایمنی و تجهیزات)',
      'حفظ پایداری شبکه سراسری برق و تحویل ژنراتور جهرم پیش از پیک بار تابستان'
    ],
    hardStrategicConstraintsEn: [
      'Journal bearing seat precision strictly ≤ 0.015mm (Hard QA Gate)',
      'Crane payload within certified safety limits (Hard Capacity Gate)',
      'National power grid reliability and delivery before summer peak demand'
    ]
  };
}
