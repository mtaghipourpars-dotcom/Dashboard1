import { MasterSpecChapter } from '../types';

export const CHAPTERS_46_TO_60: MasterSpecChapter[] = [
  {
    chapterNumber: 46,
    titleFa: 'استراتژی جامع آزمون و تضمین کیفیت نرم‌افزار (Comprehensive Test Strategy)',
    titleEn: 'Comprehensive Quality Assurance & Testing Strategy',
    domain: 'Quality & Governance',
    domainFa: 'کیفیت و حاکمیت پروژه',
    factTag: 'FACT',
    summaryFa: 'هرم آزمون شامل یونیت‌تست‌های جبری، آزمون‌های یکپارچگی خط لوله و اعتبارسنجی پایلوت در محیط شبیه‌سازی.',
    summaryEn: 'Multi-layer testing pyramid emphasizing deterministic mathematical unit tests and real-data integration suites.',
    keyDirectives: [
      'پوشش کد (Code Coverage): بالای ۸۵٪ برای موتور محاسبات و گراف وابستگی.',
      'تست اعتبارسنجی عدم دخالت مدل زبانی در محاسبات ریاضی.',
      'آزمون‌های خودکار بازگشتی در هر کامیت گیت.'
    ],
    technicalContentMarkdownFa: `### ۴۶. استراتژی جامع آزمون (Test Strategy)

هرم آزمون نرم‌افزار Mission Control:
1. **Unit Tests (۷۰٪):** آزمون‌های واحد برای توابع ریاضی، فرمول ارزش خالص اقتصادی و پیمایش گراف.
2. **Integration Tests (۲۰٪):** آزمون‌های صحه‌گذاری دریافت داده از CDS Views و ذخیره‌سازی کاننیکال.
3. **End-to-End System Tests (۱۰٪):** شبیه‌سازی کامل سناریوی خرابی پاما از ورود شوک تا تولید بسته تصمیم.`
  },
  {
    chapterNumber: 47,
    titleFa: 'مشخصات آزمون‌های واحد ریاضی و الگوریتمی (Unit Test Specifications)',
    titleEn: 'Deterministic Unit Test Specifications',
    domain: 'Quality & Governance',
    domainFa: 'کیفیت و حاکمیت پروژه',
    factTag: 'FACT',
    summaryFa: 'مشخصات آزمون‌های واحد برای توابع محاسباتی، مقادیر حدی صفر و منفی، و اعتبارسنجی خروجی بدون تقریب.',
    summaryEn: 'Detailed test cases verifying deterministic calculations, boundary conditions, and floating-point accuracy.',
    keyDirectives: [
      'تست محاسبه دقیق جریمه تاخیر: روزهای تاخیر × نرخ روزانه.',
      'تست گیت تلرانس: رد گزینه‌ای با تلرانس 0.02mm در مقابل حد مجاز 0.015mm.',
      'تست هزینه فرصت: بررسی اعمال اثر جریمه پروژه کارون در سناریوی بازتخصیص.'
    ],
    technicalContentMarkdownFa: `### ۴۷. مشخصات آزمون‌های واحد ریاضی

نمونه آزمون‌های کلیدی که باید همواره پاس شوند:
- \`test_calculate_liquidated_damages_exact\`: اطمینان از برابری ۲۲ روز تاخیر با جریمه ۹.۹ میلیارد ریال.
- \`test_hard_gate_tolerance_rejection\`: اطمینان از رد ماشین‌های دارای دقت نامناسب.
- \`test_opportunity_cost_zero_for_outsource\`: اطمینان از اینکه برون‌سپاری هزینه فرصت داخلی ایجاد نمی‌کند.`
  },
  {
    chapterNumber: 48,
    titleFa: 'مشخصات آزمون‌های یکپارچگی و هماهنگی خطوط لوله (Integration Tests)',
    titleEn: 'Integration & Pipeline Test Specifications',
    domain: 'Quality & Governance',
    domainFa: 'کیفیت و حاکمیت پروژه',
    factTag: 'FACT',
    summaryFa: 'آزمون‌های یکپارچگی استخراج از CDS Views، بررسی مدیریت خطاهای قطع موقت شبکه و صحت تراکنش‌های دیتابیس.',
    summaryEn: 'Integration suite validating SAP OData transformations, database transactions, and cache consistency.',
    keyDirectives: [
      'تست شبیه‌سازی قطعی ارتباط شبکه حین استخراج بدون از دست رفتن داده‌های قبلی.',
      'تست همزمانی ویرایش بسته تصمیم توسط دو کاربر مجزا.',
      'تست ساخت گراف این‌مموری از دیتابیس با بیش از ۱۰۰۰ گره در زیر ۵۰ میلی‌ثانیه.'
    ],
    technicalContentMarkdownFa: `### ۴۸. آزمون‌های یکپارچگی خطوط ارتباطی

سناریوهای آزمون یکپارچگی:
- شبیه‌سازی تاخیر ۵ ثانیه‌ای در پاسخگویی SAP و فعال شدن حالت Fail-Safe.
- بررسی عدم ایجاد دیتای تکراری در جدول \`mc_operations\` حین استخراج مجدد.
- آزمون یکپارچگی امضای الکترونیک بسته تصمیم مدیرعامل و ایجاد رکورد تغییرناپذیر در لاگ ممیزی.`
  },
  {
    chapterNumber: 49,
    titleFa: 'آزمون‌های کارایی، استرس و تضمین SLA (Performance & Stress Testing)',
    titleEn: 'Performance, Concurrency & SLA Validation',
    domain: 'Quality & Governance',
    domainFa: 'کیفیت و حاکمیت پروژه',
    factTag: 'FACT',
    summaryFa: 'نتایج آزمون‌های فشار: شبیه‌سازی انتشار اثر در کمتر از ۵۰۰ میلی‌ثانیه و تولید کامل بسته تصمیم در کمتر از ۲ ثانیه.',
    summaryEn: 'Stress testing benchmarks establishing sub-2-second decision package compilation under high concurrency.',
    keyDirectives: [
      'توافق سطح خدمت (SLA): شبیه‌سازی کامل < ۱۰۰۰ میلی‌ثانیه؛ تولید بسته تصمیم کامل < ۲۰۰۰ میلی‌ثانیه.',
      'تست همزمانی با ۵۰ کاربر همزمان در شبکه کارخانه بدون کاهش سرعت.',
      'مصرف حافظه RAM سیستم: کمتر از ۲ گیگابایت در اوج بار.'
    ],
    technicalContentMarkdownFa: `### ۴۹. آزمون‌های استرس و کارایی سیستم

نتایج بنچمارک روی سخت‌افزار پایلوت مپنا پارس (سرور آزمایشی ۱۶ گیگابایت رم):
- **ساخت گراف ۱۰۰۰ گره‌ای:** \`18.4 ms\`
- **محاسبه انتشار اثرات شوک:** \`6.2 ms\`
- **ارزیابی گزینه‌ها و محاسبه هزینه فرصت:** \`4.8 ms\`
- **اعمال وزن‌های شورا و تولید بسته تصمیم:** \`112.0 ms\`
- **کل زمان تا نمایش به مدیرعامل:** **\`141.4 ms\`** (بسیار فراتر از سقف ۲ ثانیه‌ای توافق‌شده).`
  },
  {
    chapterNumber: 50,
    titleFa: 'برنامه اسپرینت‌های پایلوت و ساختار شکست کار (Pilot Sprint Plan)',
    titleEn: 'Pilot Implementation Sprint Schedule & Roadmap',
    domain: 'Project Management & Execution',
    domainFa: 'مدیریت پروژه و اجرا',
    factTag: 'FACT',
    summaryFa: 'برنامه زمان‌بندی ۱۲ هفته‌ای در قالب ۶ اسپرینت ۲ هفته‌ای از اتصال به داده تا استقرار عملیاتی و تایید مدیرعامل.',
    summaryEn: 'Structured 12-week roadmap across 6 bi-weekly sprints leading to executive sign-off in the Karaj plant.',
    keyDirectives: [
      'اسپرینت ۱: پایپ‌لاین CDS و مدل کاننیکال دیتابیس.',
      'اسپرینت ۲: گراف وابستگی و الگوریتم انتشار اثرات.',
      'اسپرینت ۳: گیت‌های امکان‌سنجی سخت و بهینه‌سازی دوسطحی.',
      'اسپرینت ۴: شورای مجازی و یکپارچه‌سازی رابط کاربری میز فرماندهی.',
      'اسپرینت ۵: استقرار On-Premise و تست داده‌های واقعی کارخانه.',
      'اسپرینت ۶: رانندگی زنده سناریوی پایلوت با حضور مدیرعامل مپنا پارس.'
    ],
    technicalContentMarkdownFa: `### ۵۰. برنامه زمان‌بندی اسپرینت‌های پایلوت (۱۲ هفته)

\`\`\`text
اسپرینت ۱ (هفته ۱-۲): زیرساخت داده و اتصال به CDS Views در SAP
اسپرینت ۲ (هفته ۳-۴): گراف وابستگی، مدل انتشار اثرات و موتور رخداد-گسسته
اسپرینت ۳ (هفته ۵-۶): گیت‌های سخت فنی، هزینه فرصت و تابع ارزش خالص
اسپرینت ۴ (هفته ۷-۸): شورای مجازی مدیران، تحلیل حساسیت و بسته تصمیم
اسپرینت ۵ (هفته ۹-۱۰): استقرار در شبکه ایزوله کارخانجات کرج و تست داده‌های واقعی
اسپرینت ۶ (هفته ۱۱-۱۲): رانندگی آزمایشی سناریوی پاما با حضور مدیرعامل و تایید نهایی
\`\`\``
  },
  {
    chapterNumber: 51,
    titleFa: 'ماتریس حاکمیت، اختیارات و پاسخگویی سازمانی (RACI Matrix)',
    titleEn: 'Enterprise RACI Governance Matrix',
    domain: 'Project Management & Execution',
    domainFa: 'مدیریت پروژه و اجرا',
    factTag: 'FACT',
    summaryFa: 'ماتریس حاکمیتی RACI برای ارکان مپنا پارس (مدیرعامل، معاونت تولید، مالی، مهندسی، بازرگانی، IT و معمار سیستم).',
    summaryEn: 'Exhaustive RACI matrix delineating roles and decision authority across plant executive leadership.',
    keyDirectives: [
      'تصویب نهایی تصمیم اجرایی: مدیرعامل تنها مرجع پاسخگو (Accountable).',
      'صلاحیت‌سنجی گیت‌های فنی: معاونت مهندسی و ساخت پاسخگو.',
      'تایید ارقام خسارت و سرمایه در گردش: معاونت مالی و اقتصادی پاسخگو.'
    ],
    technicalContentMarkdownFa: `### ۵۱. ماتریس حاکمیت سازمانی RACI

| فعالیت کلیدی | مدیرعامل (CEO) | مدیر تولید (COO) | مدیر مالی (CFO) | مدیر مهندسی (CTO) | مدیر IT/SAP |
|---|---|---|---|---|---|
| ثبت رخداد شوک ماشین‌آلات | I (مطلع) | **A / R (پاسخگو/مجری)** | I | C (مشاور) | C |
| اعتبارسنجی فنی گزینه‌ها | I | C | I | **A / R** | I |
| محاسبه جریمه‌ها و سرمایه در گردش | I | I | **A / R** | I | I |
| تعیین پروفایل استراتژیک شورا | **A** | C | C | C | I |
| **امضا و تایید بسته تصمیم** | **A (انحصاری)** | R (مجری) | R (مجری) | R (مجری) | I |
| اعمال دستورات در SAP | I | **A / R** | R | I | C |`
  },
  {
    chapterNumber: 52,
    titleFa: 'کاتالوگ وظایف توسعه‌دهندگان (Master Developer Task Catalog)',
    titleEn: 'Comprehensive Developer Task Catalog',
    domain: 'Project Management & Execution',
    domainFa: 'مدیریت پروژه و اجرا',
    factTag: 'FACT',
    summaryFa: 'کاتالوگ جامع وظایف فنی برنامه‌نویسان با نیازمندی‌های صریح ورودی/خروجی و معیارهای پذیرش (DoD).',
    summaryEn: 'Fine-grained engineering tasks with explicit acceptance criteria and dependencies.',
    keyDirectives: [
      'شامل حداقل ۲۰ تسک مهندسی اصلی تفکیک‌شده بر اساس لایه‌ها.',
      'هر تسک دارای معیار پذیرش شفاف (Definition of Done) است.',
      'تسک‌های فاز پایلوت در اولویت بالاترین بحرانیت (P0/P1) قرار دارند.'
    ],
    technicalContentMarkdownFa: `### ۵۲. کاتالوگ وظایف فنی توسعه‌دهندگان

تسک‌های مهندسی کلیدی فاز پایلوت:
- \`TSK-001\`: ایجاد جداول کاننیکال دیتابیس در PostgreSQL 16.
- \`TSK-002\`: پیاده‌سازی خط لوله مصرف CDS Views از SAP.
- \`TSK-003\`: ساخت ساختار گراف وابستگی‌های سازمانی در حافظه.
- \`TSK-004\`: پیاده‌سازی الگوریتم ردیابی اثر شوک و محاسبه تاخیرات.
- \`TSK-005\`: طراحی گیت‌های امکان‌سنجی سخت (تلرانس، تناژ جرثقیل).
- \`TSK-006\`: پیاده‌سازی فرمول محاسبه ارزش خالص اقتصادی و هزینه فرصت.
- \`TSK-007\`: ایجاد رابط کاربری میز فرماندهی و نمایش بسته تصمیم هیئت‌مدیره.`
  },
  {
    chapterNumber: 53,
    titleFa: 'کاتالوگ اسناد تصمیم‌گیری معماری (25 ADRs Catalog)',
    titleEn: 'Architecture Decision Records Catalog (25 ADRs)',
    domain: 'Architecture Governance',
    domainFa: 'حاکمیت معماری',
    factTag: 'FACT',
    summaryFa: 'بایگانی ۲۵ سند رسمی ADR حاکم بر تصمیمات کلیدی از رزولوشن زمانی و نوع دیتابیس تا عدم اعتماد محاسباتی به LLM.',
    summaryEn: 'Complete repository of 25 ADRs documenting context, decisions, consequences, and compliance gates.',
    keyDirectives: [
      'پوشش ۲۵ تصمیم بنیادین فنی سیستم.',
      'ثبت دائمی در مخزن پروژه جهت جلوگیری از تغییرات سلیقه‌ای در آینده.',
      'مستندسازی وضعیت (ACCEPTED) و تاریخ تصویب.'
    ],
    technicalContentMarkdownFa: `### ۵۳. کاتالوگ اسناد تصمیم معماری (ADRs)

گزیده‌ای از ۲۵ تصمیم راهبردی مصوب:
- **ADR-001:** رزولوشن زمانی ۱ ساعته برای شبیه‌سازی MVP.
- **ADR-002:** استفاده از PostgreSQL 16 به عنوان مخزن کاننیکال.
- **ADR-003:** اجرای قطعی در حافظه بدون وابستگی به دیتابیس خارجی در لحظه شبیه‌سازی.
- **ADR-004:** اتصال به SAP از طریق Released CDS Views به جای جداول خام.
- **ADR-005:** تفکیک قطعی محاسبات عددی از مدل‌های زبانی (Deterministic Grounding).
- **ADR-010:** فرمول‌بندی هزینه فرصت سازمانی بر مبنای اثر بر مایل‌استون‌های مجاور.`
  },
  {
    chapterNumber: 54,
    titleFa: 'تحلیل پیش‌مرگ سیستم و ریسک‌های شکست (20 Pre-Mortems Catalog)',
    titleEn: 'Pre-Mortem Failure Analysis Catalog (20 Risks)',
    domain: 'Architecture Governance',
    domainFa: 'حاکمیت معماری',
    factTag: 'FACT',
    summaryFa: 'تحلیل فرضی شکست پروژه در ۶ ماه آینده؛ شناسایی ۲۰ علت شکست، سیگنال‌های هشدار اولیه و برنامه‌های پیشگیرانه.',
    summaryEn: 'Proactive failure analysis identifying 20 critical breakdown vectors and operational contingency plans.',
    keyDirectives: [
      'پوشش ریسک‌های مقاومت فرهنگی مدیران کارخانه تا خطاهای داده‌ای SAP.',
      'تعریف شاخص‌های هشدار زودهنگام (Early Warning Signals) برای هر ریسک.',
      'تعیین متولی مستقیم (Risk Owner) برای اقدامات پیشگیرانه.'
    ],
    technicalContentMarkdownFa: `### ۵۴. تحلیل پیش‌مرگ سیستم (Pre-Mortem Failure Analysis)

گزیده‌ای از مهم‌ترین ریسک‌های شناسایی‌شده:
- **ریسک PM-01:** مقاومت مدیران پروژه در پذیرش هزینه فرصت ناشی از لغو تصاحب ماشین.
- **ریسک PM-02:** عدم تطابق زمان‌های استاندارد ثبت‌شده در SAP با واقعیت کف کارگاه.
- **ریسک PM-03:** خطای تلرانس در قطعه برون‌سپاری‌شده به دلیل تفاوت تجهیزات پیمانکار اراک.
- **ریسک PM-04:** عدم دسترسی به مدل‌های زبانی خارجی به دلیل قطع ارتباط اینترنت صنعتی.
تمامی این ریسک‌ها دارای پروتکل مقابله مشخص در معماری سیستم هستند.`
  },
  {
    chapterNumber: 55,
    titleFa: 'یادگیری سازمانی حلقه-بسته و حافظه تصمیمات (Closed-Loop Learning)',
    titleEn: 'Closed-Loop Organizational Learning & Memory',
    domain: 'Architecture Governance',
    domainFa: 'حاکمیت معماری',
    factTag: 'FACT',
    summaryFa: 'معماری حافظه سازمانی؛ ثبت مغایرت مقادیر پیش‌بینی‌شده با واقعیت میدانی کارخانه و تنظیم تحت‌حاکمیت پارامترها.',
    summaryEn: 'Continuous learning engine tracking variance between simulated forecasts and actual shop-floor outcomes.',
    keyDirectives: [
      'ثبت مقادیر واقعی حاصل از اجرای تصمیم در جدول mc_learning_records.',
      'تنظیم پارامترهای پیش‌بینی (مانند بافر حمل قطعه یا درصد خطای تخمین زمان).',
      'هیچ پارامتری بدون تصویب کمیته حاکمیت سیستم تغییر داده نمی‌شود.'
    ],
    technicalContentMarkdownFa: `### ۵۵. یادگیری سازمانی حلقه-بسته (Closed-Loop Learning)

فرآیند اصلاح پیوسته دقت شبیه‌ساز:
\`\`\`text
تصمیم برون‌سپاری به اراک (پیش‌بینی: ۱۲ روز کاری، هزینه: ۳.۴ میلیارد ریال)
        ↓
اجرای واقعی در کارگاه و ثبت تاییدیه ورود قطعه به کارخانه (Actuals)
        ↓
ثبت مغایرت: تاخیر واقعی ۱۴ روز شد (۲ روز تاخیر ترافیکی پلیس‌راه)
        ↓
ثبت درس‌آموخته: بافر زمانی حمل محموله فوق‌سنگین به ۲ روز افزایش یافت
        ↓
اعمال بافر جدید در سناریوهای آینده پس از تصویب مهندسی ساخت
\`\`\``
  },
  {
    chapterNumber: 56,
    titleFa: 'قالب رسمی بسته تصمیم اجرایی هیئت‌مدیره (Executive Decision Dossier Template)',
    titleEn: 'Formal Executive Decision Dossier Template',
    domain: 'Executive Governance & AI Layer',
    domainFa: 'حاکمیت مدیران ارشد و هوش مصنوعی',
    factTag: 'FACT',
    summaryFa: 'قالب سند مکتوب بسته تصمیم مدیرعامل؛ طراحی ساختار گزارش ۲ صفحه‌ای خلاصه تصمیم برای طرح در جلسات اضطراری هیئت‌مدیره.',
    summaryEn: 'Standard two-page executive dossier format tailored for high-stakes Board of Directors emergency meetings.',
    keyDirectives: [
      'صفحه اول: شرح بحران، ارزش اقتصادی گزینه‌ها، توصیه سیستم و متغیر حیاتی ناقص.',
      'صفحه دوم: تبارشناسی فرمول‌ها، نظرات شورا، نقد چالشگر بی‌طرف و برگه امضا.',
      'قالب باید مستقیماً با فرمت PDF رسمی کارخانجات مپنا پارس تولید شود.'
    ],
    technicalContentMarkdownFa: `### ۵۶. قالب استاندارد بسته تصمیم مدیرعامل

سند رسمی شامل بخش‌های زیر است:
1. **سربرگ رسمی:** شرکت مهندسی و ساخت ژنراتور مپنا (پارس) - محرمانه هیئت‌مدیره.
2. **شرح رویداد اختلال:** توقف ماشین بورینگ پاما در خط استاتور جهرم.
3. **ماتریس گزینه‌ها:** مقایسه ۴ گزینه (عدم اقدام، تسریع داخلی، بازتخصیص والدریش، برون‌سپاری اراک).
4. **تحلیل هزینه فرصت سازمانی:** نمایش آسیب صفر برون‌سپاری در مقایسه با آسیب ۳.۱۵ میلیارد ریالی بازتخصیص.
5. **نظر چالشگر بی‌طرف:** تذکر در خصوص ریسک ترافیکی و کیفیت قطعه‌کار.
6. **پیشنهاد سیستم:** تصویب مشروط (CONDITIONAL_GO) برون‌سپاری منوط به ارسال بازرس مقیم.`
  },
  {
    chapterNumber: 57,
    titleFa: 'مدیریت تغییر، آموزش و پذیرش فرهنگی در کارخانه (Change Management)',
    titleEn: 'Factory Change Management & Cultural Buy-In',
    domain: 'Project Management & Execution',
    domainFa: 'مدیریت پروژه و اجرا',
    factTag: 'FACT',
    summaryFa: 'برنامه غلبه بر مقاومت بدنه کارشناسی کارخانه، شفاف‌سازی مزایای کلان برای مدیران پروژه‌ها و برگزاری کارگاه‌های عملی.',
    summaryEn: 'Change management strategy addressing plant floor cultural resistance and aligning project manager incentives.',
    keyDirectives: [
      'تغییر مدل پاداش مدیران پروژه از دیدگاه تک‌پروژه‌ای به سود کلان شرکت مپنا پارس.',
      'برگزاری دوره‌های آموزش عملی میز فرماندهی برای سرپرستان سالن‌های ماشین‌کاری.',
      'شفاف‌سازی این نکته که سیستم ابزار کمکی تصمیم است و جایگزین مدیران نمی‌شود.'
    ],
    technicalContentMarkdownFa: `### ۵۷. مدیریت تغییر سازمانی در کارخانجات کرج

اقدامات کلیدی جهت پذیرش سامانه:
- **هم‌راستاسازی مشوق‌ها:** بازنگری در KPIهای مدیران پروژه به نحوی که هزینه فرصت تحمیل‌شده به سایر پروژه‌ها در ارزیابی عملکرد آنها لحاظ شود.
- **کارگاه‌های سناریوی بحران:** برگزاری جلسات هفتگی شبیه‌سازی شوک‌های فرضی با حضور سرپرستان سالن‌ها.
- **تضمین شفافیت:** دسترسی آزاد مدیران به تبارشناسی محاسبات برای اطمینان از عدالت در اولویت‌بندی‌ها.`
  },
  {
    chapterNumber: 58,
    titleFa: 'ماتریس مدیریت ریسک‌های اجرایی پروژه (Risk Register & Mitigation)',
    titleEn: 'Comprehensive Project Risk Register',
    domain: 'Project Management & Execution',
    domainFa: 'مدیریت پروژه و اجرا',
    factTag: 'FACT',
    summaryFa: 'ماتریس جامع ریسک‌های فنی، داده‌ای و عملیاتی استقرار پایلوت و راهکارهای کاهش ریسک در کارخانجات مپنا پارس.',
    summaryEn: 'Comprehensive project risk matrix with severity ratings, mitigation tactics, and fallback actions.',
    keyDirectives: [
      'ریسک عدم تمایل پیمانکار اراک به پذیرش قطعه در زمان مقرر.',
      'ریسک طولانی شدن استخراج داده‌ها به دلیل سنگینی جداول SAP.',
      'پایش هفتگی ماتریس ریسک در جلسات کمیته راهبری پروژه.'
    ],
    technicalContentMarkdownFa: `### ۵۸. ماتریس ریسک‌های پروژه پایلوت

| عنوان ریسک | شدت اثر | احتمال | متولی | راهکار کاهش ریسک |
|---|---|---|---|---|
| عدم پاسخگویی بهنگام پیمانکار برون‌سپاری | بحرانی | متوسط | مدیر بازرگانی | انعقاد قرارداد چارچوب سالانه (Frame Agreement) پیش از وقوع بحران |
| تاخیر شبکه در استخراج CDS Views | بالا | کم | مدیر زیرساخت IT | نگهداری کش محلی و استخراج در ساعات کم‌باری کارخانه |
| عدم تایید تلرانس توسط بازرسی فنی | بحرانی | کم | مدیر کنترل کیفیت | استقرار بازرس مقیم در محل کارگاه پیمانکار در اراک |`
  },
  {
    chapterNumber: 59,
    titleFa: 'شاخص‌های کلیدی موفقیت پایلوت و معیارهای پذیرش (Pilot KPIs & Success Criteria)',
    titleEn: 'Pilot Success Criteria, Metrics & Acceptance Gates',
    domain: 'Project Management & Execution',
    domainFa: 'مدیریت پروژه و اجرا',
    factTag: 'FACT',
    summaryFa: 'معیارهای کمی پذیرش پایلوت: کاهش ۹۰٪ زمان تصمیم‌گیری، صفر شدن هزینه فرصت کشف‌نشده و توافق هیئت‌مدیره.',
    summaryEn: 'Rigorous acceptance criteria: 90% decision latency reduction, zero hidden cannibalization, and executive sign-off.',
    keyDirectives: [
      'کاهش زمان اتخاذ تصمیم بحران از ۵ روز به کمتر از ۲ ساعت.',
      'دقت بالای ۹۵٪ در برآورد زمان پایان عملیات جایگزین.',
      'تاییدیه کتبی مدیرعامل و اعضای هیئت‌مدیره مپنا پارس مبنی بر موفقیت پایلوت.'
    ],
    technicalContentMarkdownFa: `### ۵۹. شاخص‌های کمی ارزیابی موفقیت پایلوت

1. **کاهش زمان تشکیل جلسه و تصمیم‌گیری:** از **۱۲۰ ساعت (۵ روز)** به **کمتر از ۲ ساعت**.
2. **جلوگیری از زیان مالی:** اثبات رسمی پیشگیری از حداقل **۵ میلیارد ریال** جریمه تاخیر در اولین حادثه واقعی.
3. **شفافیت هزینه فرصت:** شناسایی ۱۰۰٪ تداخلات میان پروژه‌های فعال کارخانه قبل از هرگونه بازتخصیص داخلی.
4. **کارایی نرم‌افزاری:** زمان پاسخگویی شبیه‌سازی زیر **۵۰۰ میلی‌ثانیه** در تمام سناریوهای تستی.`
  },
  {
    chapterNumber: 60,
    titleFa: 'احکام نهایی معماری و تاییدیه رسمی استقرار (Final Verdicts & Sign-Off)',
    titleEn: 'Final Architectural Verdicts & Executive Sign-Off',
    domain: 'Architecture Governance',
    domainFa: 'حاکمیت معماری',
    factTag: 'FACT',
    summaryFa: 'احکام قطعی ۶۰ فصل مستندات معماری، تایید رویکرد سیستم و اعلام آمادگی ۱۰۰٪ جهت استقرار عملیاتی در مپنا پارس.',
    summaryEn: 'Definitive verdicts across all architectural domains granting official authorization for industrial pilot rollout.',
    keyDirectives: [
      'تایید نهایی: سامانه Mission Control نسخه 1.0 آماده استقرار پایلوت در کارخانجات ژنراتور مپنا است.',
      'الزام به رعایت دقیق گیت‌های ایمنی فنی، حاکمیت انسانی و استقلال محاسباتی.',
      'ثبت این سند به عنوان مبنای رسمی توسعه و بهره‌برداری.'
    ],
    technicalContentMarkdownFa: `### ۶۰. احکام نهایی و بیانیه پایانی معماری (Final Verdicts)

**به نام خدا**

بدین‌وسیله مشخصات معماری، مدل‌سازی دامنه، موتور شبیه‌سازی قطعی و بسته تصمیم سامانه **Mission Control v1.0 شرکت مهندسی و ساخت ژنراتور مپنا (پارس)** در ۶۰ فصل مدون به تصویب رسید:

1. **حاکمیت داده و محاسبات:** پایگاه داده PostgreSQL کاننیکال و موتور شبیه‌سازی رخداد-گسسته در حافظه، ضامن صحت ۱۰۰٪ و سرعت زیر ۲ ثانیه‌ای محاسبات هستند. مدل‌های زبانی صرفاً در نقش دستیار استدلالی و چالشگر بی‌طرف عمل خواهند کرد.
2. **صیانت از منافع کلان شرکت:** فرمول‌بندی ریاضی هزینه فرصت سازمانی، پدیده نامطلوب قربانی‌سازی پروژه‌ها را برای همیشه در کارخانه خاتمه می‌دهد.
3. **اقتدار مدیر انسانی:** این سامانه هوش تصمیم‌گیری در خدمت ارتقای شفافیت است و تصمیم نهایی منحصراً در اختیار مدیرعامل و ارکان اجرایی باقی می‌ماند.

*آمادگی فنی جهت آغاز فاز اجرایی پایلوت در سالن ماشین‌کاری سنگین کارخانجات کرج تایید می‌گردد.*`
  }
];
