import { MasterSpecChapter } from '../types';

export const CHAPTERS_31_TO_45: MasterSpecChapter[] = [
  {
    chapterNumber: 31,
    titleFa: 'مدل شرایط واقعی عملیات در ایران (Iran Operating Reality Model)',
    titleEn: 'Iran Operating Reality Simulation Model',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'مدل‌سازی رسمی تکانه‌های اقتصادی ایران شامل نوسان نرخ ارز، تورم، قطعی برق تابستان و نرخ تامین مالی ۲۴٪ در زنجیره محاسبات.',
    summaryEn: 'Formal mathematical models embedding domestic macroeconomic realities: FX swings, summer energy curtailments, and 24% WACC.',
    keyDirectives: [
      'نرخ پایه تامین مالی سرمایه در گردش: ۲۴٪ سالانه (با سناریوی تنش ۳۵٪ و بحران ۴۵٪).',
      'مدل‌سازی محدودیت انرژی برق کارخانجات در تیر و مرداد با بازتخصیص به شیفت شب.',
      'مدل‌سازی تاخیر ترخیص قطعات یدکی وارداتی (حداقل ۴۵ روز برای ثبت کوتاژ گمرکی).'
    ],
    technicalContentMarkdownFa: `### ۳۱. مدل واقعیت‌های عملیاتی ایران (Iran Reality Model)

انتشار ریسک‌های بومی در توابع محاسباتی:
\`\`\`text
جهش ۳۰٪ نرخ ارز آزاد
        ↓
افزایش هزینه قطعات یدکی و ابزار برشی وارداتی (+X%)
        ↓
افزایش هزینه مستقیم تعمیرات اساسی کارگاهی (+Y)
        ↓
کاهش حاشیه سود پروژه (-Z)
        ↓
نیاز فوری به تزریق سرمایه در گردش با هزینه مالی ۲۴٪ سالانه
\`\`\`
Mission Control این تکانه‌ها را در تحلیل حساسیت تمام گزینه‌ها لحاظ می‌نماید.`
  },
  {
    chapterNumber: 32,
    titleFa: 'ماتریس انتخاب سناریوی پایلوت مپنا پارس (MVP Scenario Selection)',
    titleEn: 'MVP Golden Scenario Selection Matrix',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'مقایسه سناریوهای خرابی ماشین، تاخیر مواد وارداتی و قطعی برق؛ توجیه انتخاب سناریوی خرابی اسپیندل پاما.',
    summaryEn: 'Multi-criteria evaluation selecting the PAMA Speedram spindle failure as the definitive pilot scenario.',
    keyDirectives: [
      'معیارها: ارزش تجاری، دسترسی به داده در SAP، پوشش فرآیندی، سادگی اندازه‌گیری و ریسک پایلوت.',
      'سناریوی خرابی پاما بالاترین امتیاز (۹۲ از ۱۰۰) را کسب نمود.',
      'تصمیم قطعی: Pilot Golden Scenario خرابی ۲۰ روزه پاما است.'
    ],
    technicalContentMarkdownFa: `### ۳۲. ماتریس ارزیابی و گزینش سناریوی طلایی پایلوت

| سناریوی کاندید | ارزش تجاری | پوشش داده در SAP | پیچیدگی پیاده‌سازی | ریسک پایلوت | امتیاز نهایی | وضعیت |
|---|---|---|---|---|---|---|
| **۱. خرابی اسپیندل ماشین بورینگ پاما (PAMA)** | **بسیار بالا (95)** | **کامل (90)** | **متوسط (85)** | **پایین (90)** | **۹۲ / ۱۰۰** | **گزینه برگزیده (RECOMMENDED)** |
| ۲. تاخیر شمش فورج روتور ژنراتور | بالا (85) | ناقص (60) | بالا (65) | بالا (60) | ۶۸ / ۱۰۰ | موکول به فاز ۲ |
| ۳. قطعی برق تابستانه سالن‌ها | بالا (80) | متوسط (70) | بالا (60) | بالا (65) | ۶۹ / ۱۰۰ | موکول به فاز ۲ |
| ۴. عدم وصول مطالبات از توانیر | بسیار بالا (90) | محدود (55) | بسیار بالا (50) | بالا (55) | ۶۴ / ۱۰۰ | موکول به فاز ۲ |`
  },
  {
    chapterNumber: 33,
    titleFa: 'مشخصات پایلوت در کارخانجات ژنراتور مپنا (MAPNA Pars Pilot Blueprint)',
    titleEn: 'MAPNA Pars Generator Pilot Implementation Blueprint',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'نقشه راه استقرار پایلوت در سالن ماشین‌کاری سنگین کارخانجات مپنا پارس در کرج (فردیس) با پروژه ژنراتور ۱۶۰ مگاوات جهرم.',
    summaryEn: 'Field deployment blueprint in Karaj heavy plant targeting the 160MW Jahrom CCPP generator line.',
    keyDirectives: [
      'مکان استقرار: کارخانجات کرج، سالن ماشین‌کاری سنگین ژنراتور.',
      'پروژه هدف پایلوت: ساخت استاتور ژنراتور ۱۶۰ مگاوات کلاس MGT-70 نیروگاه سیکل ترکیبی جهرم.',
      'تجهیزات گلوگاهی متصل: ماشین بورینگ PAMA Speedram 2000، والدریش کوبورگ و کارخانه ماشین‌سازی اراک.'
    ],
    technicalContentMarkdownFa: `### ۳۳. مشخصات استقرار پایلوت در مپنا پارس

- **شرکت پایلوت:** شرکت مهندسی و ساخت ژنراتور مپنا (پارس).
- **کارخانه:** کارخانجات سنگین کرج / فردیس.
- **ایستگاه کاری گلوگاه:** \`WC-PAMA-2000\` (ماشین فرز و بورینگ CNC پاما).
- **پروژه پایلوت:** پروژه نیروگاه جهرم (\`PRJ-MGT70-GEN-04\`).
- **تعهد حاکمیتی:** تحویل پوسته استاتور به سالن سیم‌پیچی تا تاریخ مقرر جهت سنکرون شبکه قبل از پیک تابستان.`
  },
  {
    chapterNumber: 34,
    titleFa: 'مرزهای فاز MVP و تفکیک فازها (MVP Scope Phasing)',
    titleEn: 'MVP Phasing: Core, Plus, and Enterprise Roadmap',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'تفکیک دقیق فازهای MVP-Core (تک‌منبع، ۳ پروژه)، MVP-Plus (کل سالن ماشین‌کاری)، و نسخه Enterprise (کل گروه مپنا).',
    summaryEn: 'Clear boundaries separating MVP-Core (single bottleneck, 3 projects) from enterprise rollouts.',
    keyDirectives: [
      'فاز MVP-Core: تمرکز منحصربه‌فرد بر منبع پاما و پروژه‌های درگیر (جهرم، کارون، خرم‌آباد).',
      'فاز MVP-Plus: اضافه شدن شبیه‌سازی زنجیره تامین و تامین‌کنندگان قطعات عایقی.',
      'فاز Enterprise: استقرار در سراسر شرکت‌های گروه مپنا (مپنا بویلر، مپنا توگا، مپنا لکوموتیو).'
    ],
    technicalContentMarkdownFa: `### ۳۴. فازبندی توسعه سامانه

- **MVP-Core (ماه ۱ تا ۳):** تمرکز بر ماشین پاما، استاتور جهرم، گراف محلی و بسته تصمیم مدیرعامل.
- **MVP-Plus (ماه ۴ تا ۶):** پوشش تمام سالن‌های ماشین‌کاری سنگین و ماشین‌های تراش کاروسل و روتور.
- **نسخه تجاری هلدینگ (V1.0 Enterprise):** یکپارچگی کامل با کل سبد مپنا و هماهنگی برون‌سپاری میان شرکت‌های تابعه.`
  },
  {
    chapterNumber: 35,
    titleFa: 'نیازمندی‌های دادگان پایلوت و مجموعه تست (MVP Data Set)',
    titleEn: 'Pilot Data Requirements & Synthetic Dataset',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'تعریف دو مجموعه دادگان تستی: داده‌های مصنوعی ساختاریافته (Synthetic) و داده‌های پالایش‌شده واقعی کارخانه (Sanitized Real).',
    summaryEn: 'Dual dataset definition: clean synthetic benchmark fixtures and sanitized production data from SAP.',
    keyDirectives: [
      'مجموعه دادگان Synthetic برای تست‌های CI/CD خودکار بدون وابستگی به داده‌های محرمانه کارخانه.',
      'مجموعه دادگان Sanitized Real برای ارزیابی پذیرش توسط مدیران ارشد مپنا پارس.',
      'حفظ محرمانگی مبالغ واقعی قراردادها در محیط‌های توسعه خارجی.'
    ],
    technicalContentMarkdownFa: `### ۳۵. ساختار دادگان پایلوت (MVP Dataset)

دادگان ورودی شامل موجودیت‌های زیر است:
- **منابع:** پاما، والدریش، اشکودا، بورینگ اراک (۴ رکورد).
- **پروژه‌ها:** جهرم، سد کارون، خرم‌آباد (۳ رکورد).
- **عملیات تولیدی:** ماشین‌کاری پوسته، فیسینگ نشیمنگاه، ماشین‌کاری شفت (۸ رکورد).
- **تعهدات قراردادی:** مایل‌استون‌های تحویل و جریمه‌های روزانه (۳ رکورد).`
  },
  {
    chapterNumber: 36,
    titleFa: 'پشته فناوری قطعی سامانه (Definitive Tech Stack)',
    titleEn: 'Definitive Technology Stack Selection',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'انتخاب قطعی ابزارها: TypeScript, React 19, Tailwind CSS, Node/Express, PostgreSQL 16, Motion, Docker.',
    summaryEn: 'Strict technology selection eliminating developer ambiguity and vendor lock-in.',
    keyDirectives: [
      'فرانت‌اند: React 19 با تایپ‌اسکریپت و Tailwind CSS (بدون فریم‌ورک‌های سنگین تحریم‌پذیر).',
      'بک‌اند: Node.js 22 LTS / Express با ماژولار مونولیت.',
      'دیتابیس: PostgreSQL 16 با اکستنشن‌های استاندارد.',
      'کانتینر: Docker کانتینری بهینه برای استقرار On-Premise.'
    ],
    technicalContentMarkdownFa: `### ۳۶. ماتریس پشته فناوری سامانه (Technology Stack)

| لایه سیستم | فناوری انتخاب‌شده | دلیل انتخاب و مزیت |
|---|---|---|
| **Frontend Framework** | **React 19 + TypeScript** | رابط کاربری مدرن، تایپ‌سیف و سرعت رندرینگ بالا |
| **Styling & Design** | **Tailwind CSS + Lucide Icons** | طراحی صنعتی واکنش‌گرا و کنتراست بالا مطابق هویت مپنا |
| **Animation Engine** | **Motion (motion/react)** | انیمیشن‌های روان و انتقال حالات بدون سربار پردازشی |
| **Backend Runtime** | **Node.js 22 LTS + Express** | کارایی بالا در I/O ناهمگام و سادگی ساختار ماژولار مونولیت |
| **Canonical Database** | **PostgreSQL 16** | دیتابیس صنعتی باز، بدون هزینه لایسنس و پشتیبانی قوی از JSONB |
| **Simulation Core** | **In-Memory Graph + Discrete Event** | پیمایش فوق‌سریع زیر ۵ میلی‌ثانیه بدون تاخیر شبکه |
| **Packaging & Deploy** | **Docker Multi-Stage Build** | ایمیج ایزوله خودکفا آماده استقرار در شبکه داخلی مپنا |`
  },
  {
    chapterNumber: 37,
    titleFa: 'طراحی پایگاه‌داده، ایندکس‌ها و کارایی (Database Architecture)',
    titleEn: 'Database Architecture, Indexes & Tuning',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'طراحی استراتژی ایندکس‌گذاری B-Tree روی کلیدهای خارجی و فیلدهای تاریخ، پیکربندی Connection Pool و Vacuum.',
    summaryEn: 'Detailed indexing strategy, connection pooling limits, and JSONB gin indexes for high-concurrency read models.',
    keyDirectives: [
      'ایندکس B-Tree روی فیلدهای resource_id, project_id, due_date.',
      'ایندکس GIN روی ستون‌های JSONB مربوط به فیلدهای تصمیم و متغیرهای ناقص.',
      'پیکربندی Connection Pool حداکثر ۵۰ ارتباط همزمان برای سرور محلی کارخانه.'
    ],
    technicalContentMarkdownFa: `### ۳۷. معماری پایگاه‌داده و استراتژی ایندکس‌گذاری

برای تضمین زمان پاسخگویی زیر ۱۰۰ میلی‌ثانیه در استخراج داده‌ها:
\`\`\`sql
CREATE INDEX idx_operations_resource ON mc_operations(allocated_resource_id);
CREATE INDEX idx_operations_project ON mc_operations(project_id);
CREATE INDEX idx_commitments_status ON mc_commitments(status);
CREATE INDEX idx_decisions_timestamp ON mc_decisions(created_at DESC);
CREATE INDEX idx_audit_logs_entity ON mc_audit_logs(entity_name, entity_id);
\`\`\``
  },
  {
    chapterNumber: 38,
    titleFa: 'معماری و قراردادهای وب‌سرویس (REST API Architecture)',
    titleEn: 'REST API Architecture, Contracts & Endpoints',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'مستندات کامل اندپوینت‌های REST API برای شبیه‌سازی، سناریوها، تصمیمات و گراف همراه با اسکیمای خطا.',
    summaryEn: 'Comprehensive OpenAPI-compliant endpoint contracts with standard error structures and status codes.',
    keyDirectives: [
      'پروتکل استاندارد RESTful با پیشوند /api/v1.',
      'اعتبارسنجی کلیه Request Bodyها با Zod قبل از رسیدن به لاجیک دامنه.',
      'کدهای وضعیت استاندارد: 200 OK, 201 Created, 400 Bad Request, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity.'
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Simulation REST API Contract (TypeScript Interfaces)',
      code: `// POST /api/v1/simulations
export interface CreateSimulationRequest {
  disruption: {
    resourceId: string;
    downtimeDays: number;
    severity: 'DEGRADED' | 'CRITICAL_STOP';
    componentAffected: string;
  };
  strategicProfile: 'BALANCED' | 'CASH_CRISIS' | 'DELIVERY_CRISIS' | 'MARGIN_PROTECTION';
  costOfCapitalRatePct?: number; // defaults to 24%
}

export interface CreateSimulationResponse {
  simulationId: string;
  timestamp: string;
  impactSummary: ImpactSummary;
  alternatives: AlternativeOption[];
  recommendedAlternativeId: string;
  executionTimeMs: number;
}`
    },
    technicalContentMarkdownFa: `### ۳۸. مشخصات وب‌سرویس‌های اصلی سامانه

- \`POST /api/v1/disruptions\`: ثبت شوک یا رویداد خرابی جدید.
- \`POST /api/v1/simulations\`: اجرای شبیه‌سازی قطعی و محاسبه اثرات.
- \`GET  /api/v1/impacts/:id\`: دریافت نتایج انتشار اثرات و تاخیرها.
- \`GET  /api/v1/decisions/:id\`: دریافت بسته تصمیم مدیرعامل.
- \`POST /api/v1/decisions/:id/approve\`: امضا و تایید مصوبه توسط مدیرعامل.
- \`POST /api/v1/decisions/:id/override\`: تغییر دستی گزینه با ثبت مکتوب دلیل.`
  },
  {
    chapterNumber: 39,
    titleFa: 'معماری رویدادهای دامنه (Domain Event Architecture)',
    titleEn: 'Domain Event Architecture & State Invalidation',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'مدل‌سازی رویدادهای دامنه نظیر RESOURCE_UNAVAILABLE, ORDER_DELAYED, DECISION_APPROVED و مدیریت چرخه حیات کش.',
    summaryEn: 'Event-driven domain event schemas orchestrating cache invalidation and operational state shifts.',
    keyDirectives: [
      '۱۲ رویداد رسمی دامنه با پی‌لودهای استاندارد.',
      'استفاده از رویدادها جهت باطل‌سازی کش گراف این‌مموری.',
      'ثبت تمام رویدادها در لاگ وقایع حسابرسی برای بازتولید تاریخچه.'
    ],
    technicalContentMarkdownFa: `### ۳۹. رویدادهای استاندارد دامنه سیستم

| شناسه رویداد | نام رویداد | ماشه‌چکان (Trigger) | اثر رویداد |
|---|---|---|---|
| **EVT-01** | \`RESOURCE_UNAVAILABLE\` | اعلام خرابی ماشین پاما | ابطال کش گراف و آغاز شبیه‌سازی انتشار |
| **EVT-02** | \`RESOURCE_RECOVERED\` | اتمام تعمیرات و تحویل PM | بازگردانی ظرفیت اسمی ماشین به خط مبنا |
| **EVT-03** | \`ORDER_CONFIRMED\` | ثبت تاییدیه پیشرفت در SAP | به‌روزرسانی درصد پیشرفت عملیات در گراف |
| **EVT-04** | \`COMMITMENT_AT_RISK\` | عبور تاخیر از بافر مجاز | فعال‌سازی هشدار بحرانی در میز فرماندهی |
| **EVT-05** | \`DECISION_APPROVED\` | امضای بسته توسط مدیرعامل | ایجاد دستور کار در SAP و قفل ویرایش |`
  },
  {
    chapterNumber: 40,
    titleFa: 'نقشه راه رابط کاربری و تجربه کاربری (UI/UX Blueprint)',
    titleEn: 'UI/UX Blueprint, Views & Interactive Workflows',
    domain: 'Operating Context & Tech Stack',
    domainFa: 'بافت عملیاتی و پشته فناوری',
    factTag: 'FACT',
    summaryFa: 'طراحی ویوهای اصلی سیستم (میز فرماندهی، گراف، شورا، بسته تصمیم، نقشه SAP و حافظه) با کنتراست بالا و بدون المان‌های تزئینی بیهوده.',
    summaryEn: 'Industrial UX design blueprint delivering high-contrast executive cockpits, visual graph tracing, and decision dossier cards.',
    keyDirectives: [
      'طراحی بر مبنای اصل Action-Oriented: پرهیز از داشبوردهای نمایشی منفعل.',
      'رعایت استانداردهای کنتراست رنگی WCAG AA جهت خوانایی در اتاق‌های جلسات مدیران.',
      'پشتیبانی بی‌نقص از فونت ایران‌سنس و زبان‌های فارسی و انگلیسی.'
    ],
    technicalContentMarkdownFa: `### ۴۰. صفحات و ویوهای اصلی سامانه

1. **میز فرماندهی (Cockpit View):** هشدارهای فوری اختلال، کارت خلاصه اثرات و شاخص‌های کلیدی.
2. **بسته تصمیم هیئت‌مدیره (Decision Package View):** جدول مقایسه‌ای ۴گانه، کارت VOI، پنل هزینه فرصت و دکمه‌های تایید/تغییر.
3. **شورای مجازی مدیران (Virtual Council View):** تحلیل ۸ نقش اجرایی، آراء تفکیک‌شده و نقد Devil’s Advocate.
4. **گراف انتشار اثرات (Enterprise Graph View):** نمایش تعاملی شبکه روابط از ماشین تا تعهدات مالی.
5. **شبیه‌ساز شوک کارگاهی (Disruption Simulator):** تنظیم پارامترهای توقف، نرخ تنزیل و مشاهده فوری پاسخ.
6. **سبد پروژه‌ها و WBS:** رصد پروژه‌های موازی و تضادهای ناشی از بازتخصیص.
7. **نقشه معماری SAP:** جدول شفاف نگاشت CDS Views و وضعیت همگام‌سازی.
8. **حافظه سازمانی و یادگیری:** بایگانی تصمیمات گذشته و پایش دقت مدل.`
  },
  {
    chapterNumber: 41,
    titleFa: 'معماری امنیت، احراز هویت و سطوح دسترسی (Security Architecture & RBAC)',
    titleEn: 'Enterprise Security Architecture & Role-Based Access',
    domain: 'Security & Operations',
    domainFa: 'امنیت و بهره‌برداری',
    factTag: 'FACT',
    summaryFa: 'معماری امنیت ۴ لایه، کنترل دسترسی مبتنی بر نقش (RBAC)، محافظت از ارقام محرمانه جرایم و احراز هویت با JWT.',
    summaryEn: 'Four-tier RBAC architecture enforcing least-privilege access, field-level financial encryption, and JWT authentication.',
    keyDirectives: [
      'نقش‌های سیستم: ناظر (Viewer)، برنامه‌ریز (Planner)، عضو شورا (Council Member)، مدیرعامل (Executive).',
      'فیلتر کردن ارقام محرمانه جرایم و ضررهای مالی برای کاربران فاقد سطح دسترسی مناسب.',
      'رمزنگاری ارتباطات شبکه با پروتکل TLS 1.3.'
    ],
    technicalContentMarkdownFa: `### ۴۱. ماتریس دسترسی‌های امنیتی (RBAC Matrix)

| قابلیت / اندپوینت سیستم | نقش ناظر (Viewer) | نقش برنامه‌ریز (Planner) | نقش عضو شورا (Council) | نقش مدیرعامل (Executive) |
|---|---|---|---|---|
| مشاهده وضعیت کارخانه و گراف | مجاز | مجاز | مجاز | مجاز |
| اجرای شبیه‌سازی What-If | غیرمجاز | مجاز | مجاز | مجاز |
| مشاهده ارقام جرایم و هزینه فرصت | ماسک‌شده (***) | مجاز | مجاز | مجاز |
| ثبت نظر و رای در شورا | غیرمجاز | غیرمجاز | مجاز | مجاز |
| تصویب یا تغییر دستی تصمیم (Override) | غیرمجاز | غیرمجاز | غیرمجاز | **انحصاری مجاز** |`
  },
  {
    chapterNumber: 42,
    titleFa: 'معماری استقرار در محیط‌های محلی و ایزوله کارخانه (Deployment Architecture)',
    titleEn: 'On-Premise & Air-Gapped Deployment Architecture',
    domain: 'Security & Operations',
    domainFa: 'امنیت و بهره‌برداری',
    factTag: 'FACT',
    summaryFa: 'استقرار On-Premise در سرورهای محلی کارخانجات مپنا پارس در کرج به صورت کانتینرهای داکر مستقل از شبکه خارجی.',
    summaryEn: 'Air-gapped on-premise container deployment within the Karaj factory intranet without public cloud dependency.',
    keyDirectives: [
      'معماری کانتینری تک‌دستوری بر بستر Docker و Docker Compose.',
      'عدم نیاز به اتصال به اینترنت بین‌الملل جهت اجرای پایدار هسته محاسبات.',
      'اتصال مستقیم به سوئیچ‌های شبکه داخلی کارخانه و پورت‌های حفاظت‌شده.'
    ],
    technicalContentMarkdownFa: `### ۴۲. معماری استقرار محلی (On-Premise Deployment)

توپولوژی استقرار در کارخانجات مپنا پارس:
\`\`\`text
شبکه محلی کارخانه کرج (Factory LAN)
        │
┌───────▼────────────────────────────────────────────────────────┐
│ سرور اختصاصی Mission Control Appliance                        │
│ ┌──────────────────────┐   ┌─────────────────────────────────┐ │
│ │ کانتینر Frontend & API│   │ کانتینر PostgreSQL 16           │ │
│ │ (Node 22 / Express)  │   │ (Canonical Database)            │ │
│ └──────────┬───────────┘   └───────────────┬─────────────────┘ │
│            │                               │                   │
│ ┌──────────▼───────────────────────────────▼─────────────────┐ │
│ │ پایپ‌لاین همگام‌سازی محلی با سرور SAP S/4HANA کارخانه      │ │
│ └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
\`\`\``
  },
  {
    chapterNumber: 43,
    titleFa: 'قابلیت کار در وضعیت تخفیف‌یافته و قطع شبکه (Offline & Degraded Mode)',
    titleEn: 'Air-Gapped & Degraded Mode Execution Protocol',
    domain: 'Security & Operations',
    domainFa: 'امنیت و بهره‌برداری',
    factTag: 'FACT',
    summaryFa: 'رفتار سیستم هنگام قطع ارتباط با SAP یا مدل زبانی خارجی: تداوم ۱۰۰٪ محاسبات با داده‌های کش‌شده و قالب‌های متنی معین.',
    summaryEn: 'Graceful degradation protocol sustaining 100% calculation continuity during network severance.',
    keyDirectives: [
      'قطع اینترنت بین‌الملل: سوئیچ به قالب‌های استدلالی معین (Deterministic Templates) بدون افت کارایی محاسباتی.',
      'قطع ارتباط موقت با SAP: سوئیچ به آخرین تصویر کش‌شده پایدار (Last Consistent Snapshot).',
      'نمایش بنر شفاف وضعیت در بالای میز فرماندهی جهت آگاهی کاربران.'
    ],
    technicalContentMarkdownFa: `### ۴۳. پروتکل وضعیت تخفیف‌یافته (Degraded Mode)

سطوح عملیاتی سامانه در شرایط بحران:
1. **حالت عادی (NORMAL):** ارتباط زنده با SAP، پایگاه‌داده عملیاتی، تحلیل کامل شورای مجازی.
2. **حالت بدون اینترنت (AIR-GAPPED):** قطع مدل‌های خارجی؛ تولید متون استدلالی توسط موتور قالب‌های فرموله؛ قطعیت عددی ۱۰۰٪ برقرار است.
3. **حالت قطع اتصال ERP (SAP-OFFLINE):** اجرای شبیه‌سازی بر اساس آخرین عکس معتبر دیتابیس با الصاق برچسب \`CACHED DATA\` به گزارش‌ها.`
  },
  {
    chapterNumber: 44,
    titleFa: 'مشاهده‌پذیری، لاگ‌برداری و تله‌متری (Observability & Telemetry)',
    titleEn: 'Observability, Structured Logging & Metrics',
    domain: 'Security & Operations',
    domainFa: 'امنیت و بهره‌برداری',
    factTag: 'FACT',
    summaryFa: 'معماری لاگ‌های ساختاریافته JSON، پایش تاخیر شبیه‌سازی (SLA زیر ۲ ثانیه) و متریک‌های سازگار با Prometheus.',
    summaryEn: 'OpenTelemetry instrumentation monitoring graph traversal latency, simulation durations, and data pipeline throughput.',
    keyDirectives: [
      'تفکیک فایل‌های لاگ: application.log, security.log, simulation.log, audit.log.',
      'انتشار متریک‌های کلیدی بر روی اندپوینت استاندارد /metrics.',
      'هشدار خودکار در صورت عبور زمان پاسخ شبیه‌سازی از مرز ۲ ثانیه.'
    ],
    technicalContentMarkdownFa: `### ۴۴. شاخص‌های مشاهده‌پذیری و پایش سیستم

- \`sim_execution_time_ms\`: زمان اجرای الگوریتم شبیه‌سازی (هدف: < 200ms).
- \`graph_hydration_time_ms\`: زمان بارگذاری گراف از دیتابیس (هدف: < 50ms).
- \`sap_extraction_duration_seconds\`: مدت زمان استخراج دوره‌ای از CDS Views.
- \`active_disruptions_count\`: تعداد شوک‌های فعال در مراکز کاری کارخانه.`
  },
  {
    chapterNumber: 45,
    titleFa: 'راهبرد پشتیبان‌گیری و بازیابی از فاجعه (Backup & Disaster Recovery)',
    titleEn: 'Backup Strategy & Disaster Recovery Runbook',
    domain: 'Security & Operations',
    domainFa: 'امنیت و بهره‌برداری',
    factTag: 'FACT',
    summaryFa: 'اهداف بازیابی ساعتی RPO کمتر از ۱ ساعت و RTO کمتر از ۲ ساعت، بایگانی مداوم WAL و استوریج‌های ایزوله.',
    summaryEn: 'Disaster recovery runbook guaranteeing RPO ≤ 1 hour and RTO ≤ 2 hours via continuous WAL archiving.',
    keyDirectives: [
      'هدف نقطه بازیابی (RPO): حداکثر ۶۰ دقیقه از دست رفتن داده در بدترین حالت.',
      'هدف زمان بازیابی (RTO): حداکثر ۱۲۰ دقیقه تا بازگشت سیستم به وضعیت عملیاتی کامل.',
      'پشتیبان‌گیری خودکار ساعتی روی استوریج مجزای شبکه کارخانجات مپنا.'
    ],
    technicalContentMarkdownFa: `### ۴۵. راهبرد بازیابی پس از فاجعه (Disaster Recovery)

روال‌های بازیابی اضطراری:
1. **بکاپ خودکار پایگاه داده:** اجرای اسکریپت روزانه \`pg_dump\` در ساعت ۰۲:۰۰ بامداد به همراه بایگانی مداوم WAL Files.
2. **استوریج ایزوله:** انتقال فایل‌های پشتیبان به سرور فایل پشتیبان شرکت مپنا پارس.
3. **مانور بازیابی:** اجرای تست فصلی بازیابی کامل کانتینر روی ماشین آزمایشی در کمتر از ۲ ساعت.`
  }
];
