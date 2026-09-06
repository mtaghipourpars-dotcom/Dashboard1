import { MasterSpecChapter } from '../types';

export const CHAPTERS_16_TO_30: MasterSpecChapter[] = [
  {
    chapterNumber: 16,
    titleFa: 'معماری اتصال به SAP S/4HANA و استراتژی یکپارچه‌سازی (SAP Architecture)',
    titleEn: 'SAP S/4HANA Architecture & Released Interfaces',
    domain: 'Integration & Graph Architecture',
    domainFa: 'معماری یکپارچه‌سازی و گراف',
    factTag: 'FACT',
    summaryFa: 'اتصال قانونی و پایدار به SAP S/4HANA بر مبنای دیدگاه‌های Core Data Services (CDS) و BAPIهای رسمی به جای کوئری روی جداول خام.',
    summaryEn: 'Architectural mandate enforcing standard released CDS Views and enterprise BAPIs over direct raw database access.',
    keyDirectives: [
      'اصل حاکمیت: Clean Core Protocol؛ جداول خام دیتابیس هرگز کوئری مستقیم نمی‌شوند.',
      'استفاده از Standard Released CDS Views با دسترسی Read-Only.',
      'تخصیص حساب کاربری فنی مجزا (Technical User) با ممیزی کامل در SAP.'
    ],
    technicalContentMarkdownFa: `### ۱۶. معماری اتصال به SAP S/4HANA

در کارخانجات مپنا، یکپارچه‌سازی با سامانه ERP بر اساس دیدگاه‌های معنایی لایه دیتابیس SAP HANA صورت می‌پذیرد:
1. **سطح ۱ (اولویت اول):** دیدگاه‌های معنایی استاندارد **Released CDS Views** (نظیر \`I_WorkCenterCapacity\`, \`I_ProductionOrderItem\`, \`I_EnterpriseProject\`).
2. **سطح ۲:** وب‌سرویس‌های استاندارد **OData Services** جهت استخراج ناهمگام.
3. **سطح ۳:** استفاده از توابع رسمی **BAPI / RFC** (نظیر \`BAPI_PRODORD_GET_DETAIL\`) برای دریافت جزییات عمیق عملیات.
4. **سطح ۴:** دیدگاه‌های سفارشی **Custom CDS Views** با پیشوند \`Z\` در صورت عدم وجود فیلدهای خاص در دیدگاه‌های استاندارد.
دسترسی مستقیم به جداول دیتابیس (مانند MARA, MARC, AFKO) اکیداً ممنوع است.`
  },
  {
    chapterNumber: 17,
    titleFa: 'نگاشت فیلدهای داده‌ای با موجودیت‌های SAP (SAP Data Mapping)',
    titleEn: 'SAP Source Mapping & Field Lineage',
    domain: 'Integration & Graph Architecture',
    domainFa: 'معماری یکپارچه‌سازی و گراف',
    factTag: 'FACT',
    summaryFa: 'جدول کامل نگاشت هر موجودیت کاننیکال به CDS View، فیلدهای مبدأ، منطق تبدیل و بازه تازه‌سازی داده.',
    summaryEn: 'Exhaustive mapping specification translating SAP CDS entities to canonical domain models.',
    keyDirectives: [
      'نگاشت دقیق مرکز کاری به I_WorkCenterCapacity.',
      'نگاشت سفارش ساخت و عملیات به I_ProductionOrderOperation.',
      'نگاشت هزینه‌های واقعی به ACDOCA / I_ActualCost.',
      'پایش دوره به‌روزرسانی (Hourly Sync برای وضعیت ماشین‌آلات و شیفت‌ها).'
    ],
    technicalContentMarkdownFa: `### ۱۷. جدول نگاشت داده‌های SAP به مدل کاننیکال

| موجودیت کاننیکال | شیء متناظر در SAP | CDS View / BAPI | فیلدهای کلیدی مبدأ | فرکانس استخراج |
|---|---|---|---|---|
| **Resource** | Work Center / Capacity | \`I_WorkCenterCapacity\` | \`WorkCenter\`, \`CapacityInternalID\`, \`CapacityNumberOfCapacities\` | هر ۳۰ دقیقه |
| **ProductionOrder** | Production Order Header | \`I_ProductionOrderItem\` | \`ProductionOrder\`, \`Material\`, \`PlannedStartDate\`, \`OrderStatus\` | هر ۱۵ دقیقه |
| **Operation** | Routing & Order Operations | \`I_ProductionOrderOperation\` | \`ProductionOrder\`, \`Sequence\`, \`Operation\`, \`WorkCenter\`, \`StandardWork\` | هر ۱۵ دقیقه |
| **Project & WBS** | Enterprise Project / WBS | \`I_EnterpriseProject\` | \`Project\`, \`WBSElement\`, \`ProjectDescription\`, \`PlannedEndDate\` | روزانه |
| **Financial Event** | Universal Journal Entry | \`I_ActualCost\` (ACDOCA) | \`CompanyCode\`, \`FiscalYear\`, \`Ledger\`, \`AmountInCompanyCodeCurrency\` | روزانه |`
  },
  {
    chapterNumber: 18,
    titleFa: 'خط لوله استخراج، اعتبارسنجی و تبدیل داده (Data Pipeline & ETL)',
    titleEn: 'Data Pipeline, Staging & Quality Gates',
    domain: 'Integration & Graph Architecture',
    domainFa: 'معماری یکپارچه‌سازی و گراف',
    factTag: 'FACT',
    summaryFa: 'معماری خط لوله استخراج، لایه Staging، گیت‌های اعتبارسنجی کیفیت داده و کنترل خطاهای ارتباطی با SAP.',
    summaryEn: 'Architecture of asynchronous ETL pipeline, staging schemas, data cleansing, and error-handling failover.',
    keyDirectives: [
      'استخراج از طریق کلاینت ناهمگام (Asynchronous Consumer) بدون ایجاد بار روی تراکنش‌های زنده کارخانه.',
      'اعمال گیت‌های کیفیت داده (تکمیل بودن زمان‌های استاندارد، وجود منبع تخصیص‌یافته).',
      'ذخیره آخرین تصویر معتبر پایدار (Last Consistent Snapshot) برای کارکرد در شرایط قطعی شبکه.'
    ],
    technicalContentMarkdownFa: `### ۱۸. خط لوله استخراج و اعتبارسنجی داده (Data Pipeline)

جریان داده‌ای از SAP تا گراف شبیه‌سازی:
\`\`\`text
SAP S/4HANA (CDS OData)
        ↓ (HTTPS / TLS 1.3 - Service Account)
Staging Database (Raw Ingestion)
        ↓
Data Quality Validation Gate (بررسی صحت زمان‌ها و روابط)
        ↓
Canonical Transformation Layer (تبدیل به موجودیت‌های mc_*)
        ↓
In-Memory Graph Hydration (بارگذاری در گراف رم)
        ↓
Simulation Read Model
\`\`\``
  },
  {
    chapterNumber: 19,
    titleFa: 'مدل گراف وابستگی‌های سازمانی (Enterprise Dependency Graph)',
    titleEn: 'Enterprise Dependency Graph Specification',
    domain: 'Integration & Graph Architecture',
    domainFa: 'معماری یکپارچه‌سازی و گراف',
    factTag: 'FACT',
    summaryFa: 'طراحی گره‌ها و ۱۴ نوع یال جهت‌دار گراف وابستگی کارخانه شامل روابط REQUIRES, USES, PRECEDES, ALLOCATED_TO, COMMITTED_TO.',
    summaryEn: 'Graph schema defining node taxonomies and 14 directional edge relationships with temporal weights.',
    keyDirectives: [
      'انواع گره‌ها: Resource, Operation, ProductionOrder, Project, Milestone, Commitment, CashEvent.',
      'انواع یال‌ها: REQUIRES, USES, PRECEDES, ALLOCATED_TO, COMMITTED_TO, DELIVERS, IMPACTS.',
      'پشتیبانی از وزن زمانی (Duration Hours) و بافرهای پیش‌نیازی روی یال‌ها.'
    ],
    technicalContentMarkdownFa: `### ۱۹. ساختار گراف وابستگی‌های سازمانی (Enterprise Graph)

گراف به صورت مستقیم (Directed Acyclic Graph در بخش تولید و تعهدات) مدل می‌شود:
- **گره مرکز کاری (Machine Node):** مرکز کاری پاما (\`RES-MAPNA-PAMA-01\`).
- **یال ALLOCATED_TO:** اتصال منبع به عملیات ماشین‌کاری پوسته استاتور (\`OP-JHRM-102\`).
- **یال PRECEDES:** اتصال عملیات ماشین‌کاری به عملیات سیم‌پیچی (\`OP-JHRM-103\`).
- **یال DELIVERS:** اتصال سفارش ساخت به مایل‌استون تحویل پروژه جهرم (\`MLS-JHRM-DELIVERY\`).
- **یال COMMITTED_TO:** اتصال مایل‌استون به تعهد قراردادی وزارت نیرو (\`CMT-JHRM-01\`).
- **یال IMPACTS:** انتشار مستقیم جریمه تاخیر به متغیر نقدینگی و جریان وجوه.`
  },
  {
    chapterNumber: 20,
    titleFa: 'الگوریتم ساخت گراف و بررسی سازگاری (Graph Construction Algorithm)',
    titleEn: 'Graph Construction & Consistency Validation Algorithm',
    domain: 'Integration & Graph Architecture',
    domainFa: 'معماری یکپارچه‌سازی و گراف',
    factTag: 'FACT',
    summaryFa: 'الگوریتم ساخت گراف در حافظه، شناسایی گره‌های بدون والد، کشف حلقه‌های غیرمجاز و انتشار نسخه گراف.',
    summaryEn: 'Deterministic graph hydration algorithm with topological sorting, cycle detection, and snapshot publication.',
    keyDirectives: [
      'پیاده‌سازی الگوریتم مرتب‌سازی توپولوژیک (Topological Sort) و DFS Cycle Detection.',
      'زمان ساخت کل گراف کارخانه مپنا پارس در حافظه باید کمتر از ۵۰ میلی‌ثانیه باشد.',
      'رد قطعی هرگونه سناریوی دارای وابستگی دایره‌ای در عملیات تولید.'
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Graph Construction & Cycle Detection Pseudo-code',
      code: `export class EnterpriseGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private adjacencyList: Map<string, GraphEdge[]> = new Map();

  public buildFromCanonical(entities: CanonicalDataset): void {
    this.clear();
    // 1. Hydrate Nodes
    entities.resources.forEach(r => this.addNode({ id: r.resourceId, type: 'RESOURCE', data: r }));
    entities.operations.forEach(o => this.addNode({ id: o.operationId, type: 'OPERATION', data: o }));
    entities.commitments.forEach(c => this.addNode({ id: c.commitmentId, type: 'COMMITMENT', data: c }));

    // 2. Hydrate Edges
    entities.operations.forEach(op => {
      if (op.allocatedResourceId) {
        this.addEdge({ source: op.allocatedResourceId, target: op.operationId, type: 'ALLOCATED_TO' });
      }
      if (op.successorOpId) {
        this.addEdge({ source: op.operationId, target: op.successorOpId, type: 'PRECEDES' });
      }
    });

    // 3. Validate Consistency & No Invalid Cycles
    const cycle = this.detectCycles();
    if (cycle.hasCycle) {
      throw new Error(\`Graph Consistency Violation: Circular dependency detected in \${cycle.nodeId}\`);
    }
  }
}`
    },
    technicalContentMarkdownFa: `### ۲۰. الگوریتم ساخت و اعتبارسنجی گراف

مراحل الگوریتم بارگذاری گراف:
1. بارگذاری گره‌های مراکز کاری و تخصیص تقویم ظرفیت.
2. بارگذاری عملیات ساخت و استقرار یال‌های تقدم و تاخر (\`PRECEDES\`).
3. ایجاد یال‌های تخصیص منابع به عملیات (\`ALLOCATED_TO\`).
4. اتصال عملیات نهایی به سفارش ساخت و مایل‌استون‌های WBS پروژه.
5. اتصال مایل‌استون‌ها به تعهدات قراردادی و رویدادهای مالی.
6. اجرای اعتبارسنجی عدم وجود گره یتیم و کشف حلقه‌های ناسازگار.`
  },
  {
    chapterNumber: 21,
    titleFa: 'موتور انتشار اثرات در گراف (Impact Propagation Engine)',
    titleEn: 'Impact Propagation Engine & Cascade Simulation',
    domain: 'Simulation & Optimization',
    domainFa: 'شبیه‌سازی و بهینه‌سازی',
    factTag: 'FACT',
    summaryFa: 'الگوریتم رسمی پیمایش گراف و محاسبه شیفت زمانی عملیات، روزهای تاخیر در تحویل، خسارات جریمه و مسدود شدن نقدینگی.',
    summaryEn: 'Algorithmic specification traversing forward dependency subgraphs to calculate schedule slips and cash drag.',
    keyDirectives: [
      'ورودی: شناسه منبع آسیب‌دیده، تاریخ شروع و طول مدت توقف (Downtime Days).',
      'محاسبه بافرهای شناوری (Float Buffers) روی مسیرهای پیش از تحویل.',
      'محاسبه جریمه روزانه ناشی از تجاوز از مهلت مجاز تعهد.'
    ],
    technicalContentMarkdownFa: `### ۲۱. الگوریتم انتشار اثرات در گراف (Impact Propagation)

فرمول‌های اصلی محاسبات انتشار:
1. **شیفت زمانی عملیات جاری:**
   $$\\Delta t_{\\text{op}} = \\max(0, \\text{DowntimeDays} - \\text{RemainingBuffer})$$
2. **تاخیر مایل‌استون تحویل:**
   $$\\text{MilestoneSlip} = \\Delta t_{\\text{critical-path}}$$
3. **جریمه قراردادی تحمیل‌شده (خسارت تاخیر عدم اقدام):**
   $$\\text{PenaltyAvoidable} = \\text{DelayDays} \\times \\text{PenaltyRatePerDay}$$
در خرابی ۲۰ روزه پاما، با وجود ۲ روز بافر در خط، تاخیر نهایی **۲۲ روز تقویمی** و جریمه تجمیعی **۹.۹ میلیارد ریال** محاسبه می‌شود.`
  },
  {
    chapterNumber: 22,
    titleFa: 'موتور سناریوسازی و مدیریت حالت‌های What-If (Scenario Engine)',
    titleEn: 'Scenario Engine & What-If Branching',
    domain: 'Simulation & Optimization',
    domainFa: 'شبیه‌سازی و بهینه‌سازی',
    factTag: 'FACT',
    summaryFa: 'مدیریت شاخه‌های فرضیه شبیه‌سازی، جداسازی خط مبنا از سناریوها و مدیریت نسخه‌های شبیه‌سازی.',
    summaryEn: 'Branching and immutable state isolation enabling parallel what-if simulation runs without polluting baselines.',
    keyDirectives: [
      'خط مبنا (Baseline) غیرقابل دستکاری و قفل شده است.',
      'هر سناریو یک کپی سبک این‌مموری از زیرگراف آسیب‌دیده با شناسه نسخه یکتا دریافت می‌کند.',
      'پشتیبانی از بازگشت فوری به سناریوی طلایی مپنا پارس با یک کلیک.'
    ],
    technicalContentMarkdownFa: `### ۲۲. موتور سناریوسازی What-If

ساختار هر سناریو به صورت زیر ذخیره و شبیه‌سازی می‌شود:
- **Baseline State:** آخرین داده‌های معتبر استخراج‌شده از SAP S/4HANA.
- **Disruption Parameters:** متغیرهای شوک (منبع، قطعه، مدت توقف، شدت).
- **Alternative Branches:** شاخه‌های موازی ارزیابی گزینه‌های اقدام.
- **Sensitivity Delta:** ضریب تغییرات نرخ تنزیل سرمایه یا نرخ تسعیر ارز.`
  },
  {
    chapterNumber: 23,
    titleFa: 'موتور شبیه‌سازی قطعی رخداد-گسسته ۱۵ مرحله‌ای (Simulation Engine)',
    titleEn: '15-Step Deterministic Simulation Engine',
    domain: 'Simulation & Optimization',
    domainFa: 'شبیه‌سازی و بهینه‌سازی',
    factTag: 'FACT',
    summaryFa: 'الگوریتم قطعی ۱۵ مرحله‌ای شبیه‌سازی با تضمین صحت محاسباتی ۱۰۰٪ بدون دخالت احتمالی مدل‌های زبانی.',
    summaryEn: 'Rigorous 15-step discrete-event simulation algorithm executing deterministic schedule and financial modeling.',
    keyDirectives: [
      'ممنوعیت دخالت هوش مصنوعی در محاسبات ریاضی.',
      'تکرارپذیری ۱۰۰٪: ورودی یکسان دقیقاً خروجی عددی یکسان تولید می‌کند.',
      'زمان اجرای تمامی ۱۵ مرحله باید کمتر از ۱۰۰۰ میلی‌ثانیه باشد.'
    ],
    technicalContentMarkdownFa: `### ۲۳. الگوریتم قطعی ۱۵ مرحله‌ای شبیه‌سازی (15-Step Simulation)

1. **دریافت و اعتبارسنجی شوک (Receive Disruption):** اعتبارسنجی شناسه منبع و تاریخ‌ها.
2. **انجماد خط مبنا (Freeze Baseline):** ثبت وضعیت فعلی سفارشات و تعهدات.
3. **شناسایی زیرگراف آسیب‌دیده (Identify Subgraph):** جداسازی عملیات مرتبط با منبع.
4. **محاسبه اثر مستقیم (Calculate Direct Impact):** کسر ظرفیت ساعتی منبع توقف‌یافته.
5. **انتشار وابستگی‌ها (Propagate Dependencies):** انتقال تاخیر به عملیات پس‌نیاز.
6. **ساخت زمان‌بندی متاثرشده (Build Affected Schedule):** محاسبه تقویم جدید تحویل.
7. **محاسبه اثرات مالی عدم اقدام (Inaction Financials):** جریمه دیرکرد، هزینه تامین مالی نقدینگی.
8. **شناسایی آلترناتیوهای کاندید (Identify Alternatives):** تعمیر، تسریع، برون‌سپاری، بازتخصیص.
9. **ارزیابی گیت‌های امکان‌سنجی سخت (Apply Hard Gates):** حذف گزینه‌های ناقض تلرانس یا تناژ.
10. **شبیه‌سازی رفتاری آلترناتیوها (Simulate Alternatives):** محاسبه زمان و هزینه هر گزینه.
11. **محاسبه هزینه فرصت سازمانی (Calculate Opportunity Cost):** زیان پروژه‌های قربانی‌شده.
12. **نرمال‌سازی شاخص‌ها (Normalize KPIs):** مقیاس‌بندی ۰ الی ۱۰۰.
13. **رتبه‌بندی وزنی (Rank Alternatives):** اعمال ماتریس پروفایل استراتژیک.
14. **تحلیل حساسیت و Flip Threshold (Run Sensitivity):** شناسایی متغیر حیاتی ناقص.
15. **تولید بسته تصمیم (Generate Recommendation Package):** صدور پیش‌نویس برای هیئت مدیره.`
  },
  {
    chapterNumber: 24,
    titleFa: 'موتور بهینه‌سازی و گیت‌های امکان‌سنجی سخت (Optimization Engine & Hard Gates)',
    titleEn: 'Optimization Engine & Feasibility Hard Gates',
    domain: 'Simulation & Optimization',
    domainFa: 'شبیه‌سازی و بهینه‌سازی',
    factTag: 'FACT',
    summaryFa: 'طراحی گیت‌های سخت فنی (تلرانس ابعادی، تناژ جرثقیل، ظرفیت) و تفکیک آنها از شروط نرم.',
    summaryEn: 'Mathematical formulation of non-negotiable boolean feasibility gates filtering out unviable technical options.',
    keyDirectives: [
      'گیت سخت (Hard Gate): شرط بولی غیرقابل مذاکره (تخلف از آن به منزله مردودی مطلق است).',
      'گیت تلرانس: تلرانس ماشین جایگزین باید ≤ 0.015mm باشد.',
      'گیت تناژ: جرثقیل سالن مقصد باید توانایی حمل قطعه ۸۰ تنی استاتور را داشته باشد.'
    ],
    technicalContentMarkdownFa: `### ۲۴. گیت‌های امکان‌سنجی سخت (Hard Feasibility Gates)

هر گزینه قبل از ورود به ارزیابی مالی و امتیازدهی، باید از ۵ گیت سخت عبور کند:
1. **گیت دقت ابعادی و تلرانس (Machining Tolerance Gate):** 
   $$\\text{Tolerance}_{\\text{target}} \\le 0.015 \\text{ mm}$$
2. **گیت توان حمل جرثقیل (Crane Tonnage Gate):**
   $$\\text{CraneCapacity}_{\\text{shop}} \\ge \\text{WorkpieceWeight} \\times 1.25$$
3. **گیت سازگاری ابعادی میز و کارگیر (Bed Dimensions Gate):**
   $$\\text{TableLength} \\ge 12,000 \\text{ mm} \\quad \\& \\quad \\text{Height} \\ge 4,500 \\text{ mm}$$
4. **گیت صلاحیت کیفی و فرآیندی (Process Qualification Gate):** داشتن تاییدیه معتبر مپنا پارس.
5. **گیت محرمانگی و حاکمیت قرارداد (Contract Compliance Gate):** عدم منع کارفرما از خروج قطعه.`
  },
  {
    chapterNumber: 25,
    titleFa: 'موتور تصمیم‌گیری دوسطحی و تابع ارزش اقتصادی (Two-Stage Decision Engine)',
    titleEn: 'Two-Stage Decision Engine & Economic Objective Function',
    domain: 'Simulation & Optimization',
    domainFa: 'شبیه‌سازی و بهینه‌سازی',
    factTag: 'FACT',
    summaryFa: 'معماری موتور تصمیم دوسطحی: مرحله اول غربالگری امکان‌پذیری و مرحله دوم بهینه‌سازی ارزش اقتصادی و امتیاز مرکب.',
    summaryEn: 'Two-stage architecture executing boolean feasibility gating followed by multi-objective economic value optimization.',
    keyDirectives: [
      'مرحله اول: غربالگری سخت بدون توجه به هزینه.',
      'مرحله دوم: بیشینه‌سازی ارزش اقتصادی خالص قابل‌تحقق (Net Realizable Enterprise Value).',
      'فرمول ارزش خالص: صرفه‌جویی در جرایم - هزینه مستقیم - هزینه فرصت - هزینه تامین مالی.'
    ],
    technicalContentMarkdownFa: `### ۲۵. موتور تصمیم‌گیری دوسطحی (Two-Stage Engine)

فرمول محاسبه ارزش خالص اقتصادی گزینه برگزیده:
$$\\text{Net Enterprise Value} = \\Delta \\text{Penalties Avoided} - \\text{Direct Cost} - \\text{Opportunity Cost} - \\text{Financing Drag}$$
در سناریوی طلایی مپنا پارس برای گزینه **برون‌سپاری به اراک**:
- **جریمه پیشگیری‌شده:** \`8,100,000,000 IRR\`.
- **هزینه مستقیم قرارداد و حمل:** \`3,400,000,000 IRR\`.
- **هزینه فرصت سازمانی:** \`0 IRR\` (هیچ پروژه‌ای قربانی نمی‌شود).
- **هزینه تامین مالی نقدینگی:** \`1,350,000,000 IRR\`.
- **ارزش خالص خلق‌شده:** **\`+5,200,000,000 IRR\`** سود خالص سازمانی همراه با حفظ مایل‌استون شبکه.`
  },
  {
    chapterNumber: 26,
    titleFa: 'شورای مجازی مدیران اجرایی مپنا پارس (Virtual Executive Council)',
    titleEn: 'Virtual Executive Council Specification',
    domain: 'Executive Governance & AI Layer',
    domainFa: 'حاکمیت مدیران ارشد و هوش مصنوعی',
    factTag: 'FACT',
    summaryFa: 'طراحی شورا با ۸ نقش اجرایی، نقش چالشگر بی‌طرف (Devil’s Advocate) و رئیس شورا جهت نقد تصمیمات.',
    summaryEn: 'Eight executive persona agents augmented with Devil’s Advocate to rigorously challenge top alternatives.',
    keyDirectives: [
      'عامل‌ها دارای سوگیری، ریسک‌پذیری و داده‌های مجاز تفکیک‌شده هستند.',
      'نقش چالشگر بی‌طرف مکلف به زیر سوال بردن فرضیات شکننده گزینه برتر است.',
      'شورا ابزار شبیه‌سازی نیست، بلکه لایه تفسیر و چالشگری برای بسته تصمیم است.'
    ],
    technicalContentMarkdownFa: `### ۲۶. مشخصات شورای مجازی مدیران ارشد (Virtual Council)

اعضای شورا و مسئولیت‌های ارزیابی:
1. **عامل مدیرعامل (CEO Agent):** ارزیابی ارزش کلان اقتصادی و اعتبار استراتژیک در برابر سهامداران.
2. **عامل معاونت مالی (CFO Agent):** کنترل جریان نقدینگی، هزینه فرصت و اعتبارات اسنادی.
3. **عامل معاونت مهندسی (CTO Agent):** بررسی گیت‌های فنی، تلرانس‌های ابعادی و انطباق استاندارد ساخت.
4. **عامل معاونت تولید (COO Agent):** صیانت از ظرفیت ماشین‌آلات و تعادل خطوط سالن ماشین‌کاری.
5. **عامل زنجیره تامین (CSCO Agent):** استعلام ظرفیت پیمانکاران اراک و اسکورت ترافیکی محموله‌های فوق‌سنگین.
6. **عامل پایش تعهدات (Commitment Governance Agent):** اخطار صریح نسبت به پدیده قربانی‌سازی پروژه‌ها.
7. **چالشگر بی‌طرف (Devil’s Advocate):** حمله به فرضیات شکننده تصمیم و طرح سناریوهای بدترین حالت.`
  },
  {
    chapterNumber: 27,
    titleFa: 'حاکمیت هوش مصنوعی و اتصال به فکت‌های اثبات‌شده (AI Governance & Grounding)',
    titleEn: 'AI Governance & Deterministic Grounding Protocol',
    domain: 'Executive Governance & AI Layer',
    domainFa: 'حاکمیت مدیران ارشد و هوش مصنوعی',
    factTag: 'FACT',
    summaryFa: 'مقررات حاکم بر استفاده از LLM: ممنوعیت محاسبه، الزام به استناد به فکت‌های عددی و کنترل توهم.',
    summaryEn: 'Strict protocol constraining LLMs to narrative explanation and reasoning over pre-computed deterministic facts.',
    keyDirectives: [
      'اصل غیرقابل مذاکره: LLM ≠ Calculator؛ تمام ارقام از موتور ریاضی دریافت می‌شوند.',
      'ارسال کانتکست ساختاریافته (Strict JSON Context) به مدل هوش مصنوعی.',
      'الزام خروجی به فرمت JSON معتبر با اعتبارسنجی اسکیمای Zod.'
    ],
    technicalContentMarkdownFa: `### ۲۷. حاکمیت هوش مصنوعی (AI Governance)

قوانین جلوگیری از توهم عددی:
1. **تزریق فکت‌های سخت:** هوش مصنوعی فقط مجاز است از متغیرهای خروجی \`ImpactSummary\` و \`AlternativeOption\` استفاده کند.
2. **اعتبارسنجی خروجی با اسکیمای Zod:** اگر هوش مصنوعی در متن خود عددی متناقض با خروجی حل‌کننده تولید کند، لایه فیلتر خروجی آن را رد می‌کند.
3. **پایش مداوم:** هر پاسخ دارای برچسب‌های تفکیک‌شده فکت (Fact)، فرضیه (Assumption) و ضریب اطمینان است.`
  },
  {
    chapterNumber: 28,
    titleFa: 'اقتدار مدیر انسانی و مدیریت تغییرات دستی (Human-in-the-Loop & Overrides)',
    titleEn: 'Human-in-the-Loop & Executive Override Management',
    domain: 'Executive Governance & AI Layer',
    domainFa: 'حاکمیت مدیران ارشد و هوش مصنوعی',
    factTag: 'FACT',
    summaryFa: 'مدیرعامل تنها مرجع قانونی تصمیم است؛ ثبت الزامی دلایل تغییر تصمیم و حفظ تاریخچه ابدی حسابرسی.',
    summaryEn: 'System of Authority remains strictly human; every manual override is logged with mandatory executive justification.',
    keyDirectives: [
      'سیستم هرگز تصمیمی را خودکار اجرا نمی‌کند.',
      'مدیر حق دارد هر گزینه‌ای را تایید کند، فرضیات را تغییر دهد یا گزینه دیگری را برگزیند.',
      'ثبت نام مدیر، تاریخ و دلیل بازنویسی در جدول mc_decisions.'
    ],
    technicalContentMarkdownFa: `### ۲۸. اختیارات و حاکمیت تصمیم‌گیرنده انسانی

وضعیت‌های رسمی تصمیم در سیستم:
- **GO:** تایید بدون قید و شرط مسیر پیشنهادی.
- **CONDITIONAL_GO:** تایید مشروط به احراز یک متغیر حیاتی (پیش‌فرض سیستم برای برون‌سپاری اراک).
- **DEFER:** تعویق تصمیم تا دریافت تاییدیه‌های فنی یا آزمایشگاهی تکمیلی.
- **NO_GO:** رد کامل گزینه‌های جاری و درخواست بازنگری مهندسی.
- **OVERRIDDEN:** انتخاب گزینه‌ای غیر از پیشنهاد سیستم توسط مدیرعامل با ثبت دلیل مکتوب.`
  },
  {
    chapterNumber: 29,
    titleFa: 'ساختار و اسکیمای بسته تصمیم مدیرعامل (Decision Package JSON Schema)',
    titleEn: 'Decision Package Data Specification & JSON Schema',
    domain: 'Executive Governance & AI Layer',
    domainFa: 'حاکمیت مدیران ارشد و هوش مصنوعی',
    factTag: 'FACT',
    summaryFa: 'تعریف دقیق خروجی نهایی سیستم در قالب سند استاندارد بسته تصمیم مدیرعامل همراه با JSON Schema.',
    summaryEn: 'Formal JSON schema defining executive decision packages delivered to the CEO and Board of Directors.',
    keyDirectives: [
      'شامل مشخصات شوک، پروژه‌های متاثر، جدول مقایسه گزینه‌ها و ارزش اطلاعات.',
      'شامل احکام شورا، نظر Devil’s Advocate و تبارشناسی فرمول‌های مالی.',
      'قابلیت خروجی به صورت PDF رسمی و نمایش وب.'
    ],
    codeSnippet: {
      language: 'json',
      title: 'Decision Package JSON Schema Specification',
      code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "DecisionPackage",
  "type": "object",
  "properties": {
    "decisionId": { "type": "string" },
    "disruptionId": { "type": "string" },
    "plant": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "strategicProfile": { "type": "string", "enum": ["BALANCED", "CASH_CRISIS", "DELIVERY_CRISIS", "MARGIN_PROTECTION"] },
    "verdict": { "type": "string", "enum": ["GO", "CONDITIONAL_GO", "DEFER", "NO_GO"] },
    "recommendedAlternative": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "title": { "type": "string" },
        "costIRR": { "type": "number" },
        "compositeScore": { "type": "number" },
        "netEnterpriseValueCreatedIRR": { "type": "number" }
      },
      "required": ["id", "title", "costIRR", "compositeScore"]
    },
    "calculationLineage": { "type": "string" },
    "criticalMissingInformation": {
      "type": "object",
      "properties": {
        "variable": { "type": "string" },
        "impactOnChoice": { "type": "string" },
        "flipThreshold": { "type": "string" }
      }
    }
  },
  "required": ["decisionId", "verdict", "recommendedAlternative", "calculationLineage"]
}`
    },
    technicalContentMarkdownFa: `### ۲۹. مشخصات فنی بسته تصمیم هیئت‌مدیره

بسته تصمیم (Decision Package) تنها خروجی رسمی سامانه برای اتخاذ تصمیم نهایی است که تمامی ابعاد زیر را در یک سند یکپارچه گردآوری می‌نماید:
- شناسنامه شوک کارگاهی و قطعات بحرانی.
- تحلیل انتشار اثر بر تعهدات نیروگاهی کشور.
- ماتریس مقایسه‌ای گزینه‌ها به همراه هزینه فرصت و نتایج گیت‌های فنی.
- نظرات شورای مجازی، چالش‌های منتقدانه و دستورالعمل اجرایی برای SAP.`
  },
  {
    chapterNumber: 30,
    titleFa: 'تبارشناسی و ره‌گیری داده‌های مالی (Financial Provenance & Lineage)',
    titleEn: 'Financial Provenance, Tracing & Audit Lineage',
    domain: 'Executive Governance & AI Layer',
    domainFa: 'حاکمیت مدیران ارشد و هوش مصنوعی',
    factTag: 'FACT',
    summaryFa: 'قابلیت حسابرسی و ره‌گیری ۱۰۰٪ کلیه ارقام مالی تا قراردادهای مبدأ، صورت‌وضعیت‌ها و فرمول‌های تنزیل زمانی.',
    summaryEn: 'Complete financial traceability connecting high-level metrics back to SAP contract lines and billing milestones.',
    keyDirectives: [
      'هیچ عدد مالی بدون نمایش فرمول و ریشه استخراج نمایش داده نمی‌شود.',
      'پشتیبانی از شفافیت کامل در برابر حسابرسان سازمان بازرسی و سهامداران هلدینگ مپنا.',
      'ارائه فرمول متنی صریح برای ارزش خالص هر گزینه.'
    ],
    technicalContentMarkdownFa: `### ۳۰. تبارشناسی محاسبات مالی (Financial Lineage)

رشته رسمی تبارشناسی برای گزینه برگزیده برون‌سپاری:
\`\`\`text
Net Enterprise Value = (Penalties Avoided [8.10B IRR]) 
                     - (Direct Outsource Cost [3.40B IRR]) 
                     - (Enterprise Opportunity Cost [0.00B IRR]) 
                     - (Financing Drag of Working Capital [1.35B IRR])
                     = +5.20B IRR (خلق خالص ثروت سازمانی)
\`\`\`
این رشته تضمین می‌کند که هیچ مدیر یا حسابرسی با ارقام جعبه سیاه مواجه نشود.`
  }
];
