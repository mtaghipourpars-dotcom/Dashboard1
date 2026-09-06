import { MasterSpecChapter } from '../types';

export const CHAPTERS_1_TO_15: MasterSpecChapter[] = [
  {
    chapterNumber: 1,
    titleFa: 'خلاصه اجرایی و مأموریت سامانه (Executive Summary)',
    titleEn: 'Executive Summary & Mission Statement',
    domain: 'Foundation & Scope',
    domainFa: 'مبانی و دامنه شمول',
    factTag: 'FACT',
    summaryFa: 'سامانه Mission Control پلتفرم هوش تصمیم‌گیری و شبیه‌سازی اثرات منابع بر تعهدات کارخانه مپنا پارس است که مانع از تصمیمات مصلحتی محلی و تخریب ثروت سازمانی می‌شود.',
    summaryEn: 'Mission Control is an enterprise decision intelligence and resource-commitment impact simulation platform engineered for MAPNA Pars Generator to safeguard delivery commitments.',
    keyDirectives: [
      'هدف اصلی: نجات تعهدات کلان تحویل در برابر شبکه برق کشور و کارفرمایان.',
      'اصل حاکمیت: SAP System of Record است؛ Mission Control System of Intelligence است؛ مدیر انسانی System of Authority است.',
      'معیار ارزیابی: حداکثرسازی ارزش اقتصادی خالص قابل‌تحقق و ممانعت از پدیده قربانی‌سازی پروژه‌ها.'
    ],
    technicalContentMarkdownFa: `### ۱. خلاصه اجرایی و فلسفه وجودی سامانه

در کارخانجات تولید تجهیزات سنگین نیروگاهی مانند **شرکت مهندسی و ساخت ژنراتور مپنا (پارس)**، بروز اختلال در منابع گلوگاهی مشترک (نظیر ماشین‌های فرز و بورینگ سنگین پاما، والدریش کوبورگ یا اشکودا) به صورت روزمره اتفاق می‌افتد.

مسئله بنیادین این است که در ساختار سنتی، این بحران‌ها به صورت **جزیره‌ای و تک‌پروژه‌ای** مدیریت می‌شوند؛ مدیر یک پروژه با اعمال نفوذ یا تصمیمات اضطراری، قطعه خود را بر روی ماشین پروژه دیگر قرار می‌دهد و تاخیر خود را جبران می‌کند، اما غافل از اینکه با این کار، تعهد مایل‌استون تحویل ژنراتور دیگری را با جریمه‌های سنگین‌تر و آسیب اعتباری به شبکه برق کشور قربانی می‌سازد (**Cross-Project Cannibalization**).

سامانه **Mission Control v1.0** به عنوان لایه هوشمند شبیه‌سازی اثرات و بسته تصمیم راهبردی طراحی شده است تا:
1. در کسری از ثانیه (**زیر ۲ ثانیه**)، کل زنجیره انتشار شوک کارگاهی را از منبع تا تعهدات مالی و مایل‌استون‌های شبکه ردیابی کند.
2. اثر خالص اقتصادی هر گزینه را با کسر هزینه‌های مستقیم، جرایم تاخیر پیشگیری‌شده و **هزینه فرصت سازمانی** محاسبه نماید.
3. یک بسته تصمیم جامع با استدلال‌های شفاف، تبارشناسی فرمولی و چالش‌های منتقدانه جهت امضا در اختیار مدیرعامل و هیئت‌مدیره قرار دهد.`
  },
  {
    chapterNumber: 2,
    titleFa: 'اسناد مبنا و چارچوب مفهومی (Source Baseline)',
    titleEn: 'Source Baseline & Conceptual Heritage',
    domain: 'Foundation & Scope',
    domainFa: 'مبانی و دامنه شمول',
    factTag: 'FACT',
    summaryFa: 'مرور اسناد پایه‌ای Mission Control، سناریوی طلایی خرابی بورینگ پاما، ماتریس تصمیم دو مرحله‌ای و جریان چرخه بازخورد.',
    summaryEn: 'Review of conceptual baselines including PAMA Speedram golden scenario, two-stage decision logic, and closed-loop learning.',
    keyDirectives: [
      'حفظ سناریوی طلایی خرابی ۲۰ روزه اسپیندل ماشین بورینگ پاما در خط استاتور.',
      'تثبیت جریان چرخه: شوک محیطی ← منبع ← عملیات ← تعهد ← انتشار اثر ← سناریو ← تصمیم انسان ← اجرا ← یادگیری.',
      'حفظ تعاریف رسمی زبان، پروفایل‌های استراتژیک ۴گانه و ساختار CDS Views.'
    ],
    technicalContentMarkdownFa: `### ۲. چارچوب مفهومی اسناد مبنا

چرخه حیات اطلاعات در سامانه مطابق با استاندارد معماری مرجع به صورت زیر است:
\`\`\`text
محیط خارجی و شوک‌های عملیاتی (External Reality)
        ↓
مدل منابع و وضعیت فیزیکی (Resource Model)
        ↓
روابط و مسیریابی تولید (Routing & BOM)
        ↓
پروژه‌ها و تعهدات قراردادی (Commitments)
        ↓
موتور انتشار اثرات در گراف (Impact Propagation)
        ↓
شبیه‌سازی سناریوها و ارزیابی گزینه‌ها (Scenario Engine)
        ↓
شورای مجازی و چالشگری تصمیم (Virtual Council)
        ↓
تصمیم مرجع انسانی مدیرعامل (Human Authority)
        ↓
اقدام اجرایی در کارگاه و به‌روزرسانی SAP (Execution)
        ↓
نتایج واقعی و ثبت انحرافات (Actuals)
        ↓
حافظه سازمانی و تنظیم تحت حاکمیت پارامترها (Governed Learning)
\`\`\``
  },
  {
    chapterNumber: 3,
    titleFa: 'ماتریس شکاف معماری و تحول (Architecture Gap & Transformation Matrix)',
    titleEn: 'Architecture Gap & Transformation Matrix',
    domain: 'Foundation & Scope',
    domainFa: 'مبانی و دامنه شمول',
    factTag: 'INFERENCE',
    summaryFa: 'تحلیل تطبیقی وضعیت قبلی نسبت به نسخه 1.0 و طبقه‌بندی اقدامات در قالب KEEP / MODIFY / REPLACE / REMOVE / ADD / VALIDATE.',
    summaryEn: 'Detailed gap analysis classifying legacy specifications into KEEP, MODIFY, REPLACE, REMOVE, ADD, and VALIDATE actions.',
    keyDirectives: [
      'حذف ابهامات و گزینه‌های فرضی؛ اعمال سیاست Zero Ambiguity.',
      'جایگزینی جداول خام دیتابیس SAP با CDS Views استاندارد.',
      'جایگزینی محاسبات تخمینی با الگوریتم قطعی ۱۵ مرحله‌ای و پایگاه داده کاننیکال PostgreSQL.'
    ],
    technicalContentMarkdownFa: `### ۳. ماتریس تحول معماری به نسخه 1.0

کلیه اجزای سند مفهومی اولیه مپنا پارس بازبینی شده و تحولات زیر به صورت قطعی اعمال گردید:
- **مدل داده کاننیکال:** از تعاریف فرضی به اسکریپت رسمی **PostgreSQL 16 DDL** با ۲۴ جدول دارای کلیدهای اصلی، خارجی و ایندکس‌های کارایی تبدیل شد [REPLACE].
- **ارتباط با SAP:** از دسترسی مستقیم به جداول خام به مصرف رسمی **Released Core Data Services (CDS) Views** تغییر یافت [REPLACE].
- **موتور شبیه‌سازی:** تفکیک قطعی محاسبات عددی از هوش مصنوعی؛ هوش مصنوعی صرفاً نقش چالشگر و خلاصه‌ساز دارد [REPLACE].
- **هزینه فرصت سازمانی:** فرمول‌بندی ریاضی اثر دزدیدن ظرفیت ماشین بر پروژه‌های مجاور [ADD].
- **مدیریت ریسک:** تدوین ۲۵ سند تصمیم معماری (ADR) و ۲۰ تحلیل پیش‌مرگ سیستم (Pre-Mortem) [ADD].`
  },
  {
    chapterNumber: 4,
    titleFa: 'تعریف دقیق محصول و هویت فنی (Product Definition)',
    titleEn: 'Product Definition & Identity',
    domain: 'Foundation & Scope',
    domainFa: 'مبانی و دامنه شمول',
    factTag: 'FACT',
    summaryFa: 'تعریف محصول: Mission Control سامانه شبیه‌سازی انتشار اثرات منابع بر تعهدات و هوش تصمیم‌گیری سازمانی است.',
    summaryEn: 'System defined as an Enterprise Resource-Commitment Impact Simulation & Decision Intelligence Platform.',
    keyDirectives: [
      'محصول یک ابزار کمکی برای هیئت‌مدیره و مدیرعامل است، نه سیستم ثبت تراکنش‌های خرد.',
      'قابلیت اتصال همزمان به SAP و کارکرد مستقل در شرایط آفلاین صنعتی.',
      'سرعت پاسخگویی: شبیه‌سازی کامل کمتر از ۲ ثانیه.'
    ],
    technicalContentMarkdownFa: `### ۴. تعریف محصول و جایگاه سازمانی

سامانه **Mission Control** در هرم سیستم‌های اطلاعاتی مپنا پارس در بالاترین لایه تحلیلی قرار دارد:
- **لایه تراکنشی (System of Record):** نرم‌افزار **SAP S/4HANA** (ماژول‌های PP, PS, PM, MM, CO, FI).
- **لایه هوشمندی و شبیه‌سازی (System of Intelligence):** سامانه **Mission Control**.
- **لایه اقتدار و اختیار (System of Authority):** **مدیریت ارشد و هیئت‌مدیره شرکت مپنا پارس**.`
  },
  {
    chapterNumber: 5,
    titleFa: 'مسئله تجاری: پدیده قربانی‌سازی و تضاد منافع پروژه‌ها (Business Problem)',
    titleEn: 'The Business Problem: Multi-Project Cannibalization',
    domain: 'Foundation & Scope',
    domainFa: 'مبانی و دامنه شمول',
    factTag: 'FACT',
    summaryFa: 'تشریح بحران تضاد منافع مدیران پروژه در تصاحب ماشین‌های سنگین و فرمول‌بندی هزینه فرصت سازمانی.',
    summaryEn: 'Exposing the core pathology of siloed project managers competing for shared heavy machinery at the expense of enterprise margin.',
    keyDirectives: [
      'تخصیص مجدد ماشین گلوگاهی به پروژه A نباید به قیمت تحمیل جریمه بزرگ‌تر به پروژه B تمام شود.',
      'محاسبه رسمی Enterprise Opportunity Cost به عنوان بخشی از ارزیابی هر تصمیم.',
      'حل معضل عدم شفافیت بین مدیران کارخانه، برنامه‌ریزی و مالی.'
    ],
    technicalContentMarkdownFa: `### ۵. تشریح آسیب‌شناسی مسئله تجاری

در کارخانجات پارس ژنراتور، ارزش هر توربین و ژنراتور صدها میلیارد ریال است و قراردادها مشمول جریمه‌های تاخیر سنگین (**Liquidated Damages - LD**) به ازای هر روز تاخیر هستند.

هنگامی که ماشین **PAMA Speedram 2000** دچار خرابی اسپیندل می‌شود، پوسته استاتور پروژه نیروگاه جهرم متوقف می‌گردد. در نگاه سنتی، اولین گزینه مدیر پروژه، انتقال قطعه به ماشین فرز و بورینگ **والدریش کوبورگ (Waldrich Coburg)** است؛ اما این ماشین در حال تراشکاری شفت هیدروژنراتور سد کارون است. بازتخصیص این ماشین باعث تاخیر ۶ روزه در پروژه کارون و تحمیل ۳.۱۵ میلیارد ریال جریمه تاخیر و آسیب اعتباری به شبکه می‌گردد.
Mission Control با آشکارسازی این هزینه فرصت، اثبات می‌کند که **برون‌سپاری به اراک** با هزینه فرصت صفر و سود خالص سازمانی **+۵.۲۰ میلیارد ریال**، بر گزینه بازتخصیص داخلی با بازده منفی **-۰.۱۰ میلیارد ریال** برتری قاطع دارد.`
  },
  {
    chapterNumber: 6,
    titleFa: 'مرزهای شمول سیستم و موارد خارج از دامنه (Scope & Out-of-Scope)',
    titleEn: 'System Scope & Explicit Out-of-Scope Boundaries',
    domain: 'Foundation & Scope',
    domainFa: 'مبانی و دامنه شمول',
    factTag: 'FACT',
    summaryFa: 'تعیین قطعی آنچه سامانه انجام می‌دهد و آنچه اکیداً نباید انجام دهد تا از Overengineering جلوگیری شود.',
    summaryEn: 'Precise delineation of functional scope boundaries, explicitly forbidding ERP or MES functional creep.',
    keyDirectives: [
      'انجام می‌دهد: تحلیل اثرات، شبیه‌سازی سناریوهای شوک، محاسبه هزینه فرصت، بسته تصمیم هیئت‌مدیره.',
      'انجام نمی‌دهد: جایگزینی ERP، جایگزینی MRP، جایگزینی MES، صدور خودکار دستور خرید بدون تایید انسان.',
      'ممنوعیت کامل تبدیل سیستم به یک ابزار زمان‌بندی خرد کارگاهی (APS ریزدانه).'
    ],
    technicalContentMarkdownFa: `### ۶. مرزهای شمول سیستم

#### ۶.۱. آنچه Mission Control انجام می‌دهد:
- شبیه‌سازی اثرات خرابی منبع بر مایل‌استون‌های تحویل و صورت‌وضعیت‌ها.
- تحلیل حساسیت ارزش اطلاعات ناقص (Value of Information) و تعیین Flip Threshold.
- ارزیابی چندمعیاره گزینه‌های اقدام بر مبنای گیت‌های سخت فنی و ارزش خالص اقتصادی.
- تولید بسته تصمیم استاندارد دارای تبارشناسی حسابرسی‌پذیر برای مدیرعامل.

#### ۶.۲. آنچه Mission Control اکیداً انجام نمی‌دهد (Out-of-Scope):
- جایگزینی سیستم‌های برنامه‌ریزی نیازمندی‌های مواد (MRP) یا مدیریت انبار (WM).
- ثبت تراکنش‌های روزمره حسابداری یا صدور خودکار سند مالی در SAP.
- تصمیم‌گیری خودکار بدون تایید مستقیم انسان (Autonomous Execution).
- ایجاد دوقلوی دیجیتال سه‌بعدی سنگین کارخانه.`
  },
  {
    chapterNumber: 7,
    titleFa: 'معماری تجاری و حاکمیت سازمانی (Business Architecture)',
    titleEn: 'Business Architecture & Governance',
    domain: 'Enterprise & Domain Architecture',
    domainFa: 'معماری سازمان و دامنه',
    factTag: 'FACT',
    summaryFa: 'مدل حاکمیتی تعامل ارکان سازمانی مپنا پارس با سامانه، از رخداد شوک تا مصوبه هیئت‌مدیره و اقدام در SAP.',
    summaryEn: 'Enterprise governance blueprint establishing operational interaction between plant directors, virtual council, and CEO.',
    keyDirectives: [
      'تثبیت مسئولیت قانونی تصمیمات در شخص مدیرعامل.',
      'تفکیک نقش‌های ارزیاب فنی (مهندسی)، مالی (CFO) و عملیاتی (COO).',
      'الزام به ثبت کد رهگیری تصمیم و علت هرگونه تغییر دستی (Override Reason).'
    ],
    technicalContentMarkdownFa: `### ۷. معماری تجاری و ماتریس تصمیم‌گیری

گردش‌کار حاکمیتی تصمیم به شرح زیر است:
1. **ثبت شوک یا رویداد اختلال:** دریافت خودکار از لاگ‌های PM/MES یا ثبت توسط مدیر نگهداری و تعمیرات.
2. **محاسبه اثرات و تولید گزینه‌ها:** اجرای شبیه‌سازی رخداد-گسسته در موتور نرم‌افزار.
3. **ارزیابی شورای مجازی:** بررسی چندبعدی توسط عامل‌های شورا و طرح چالش‌های Devil’s Advocate.
4. **صدور بسته تصمیم:** ارائه به مدیرعامل با وضعیت پیشنهادی (CONDITIONAL_GO).
5. **امضا یا تغییر توسط انسان:** تایید نهایی مدیرعامل یا انتخاب گزینه دیگر با درج دلیل مکتوب.
6. **بازخورد به SAP:** ارسال دستور تغییر برنامه یا ایجاد سفارش خرید خدمات برون‌سپاری به SAP S/4HANA.`
  },
  {
    chapterNumber: 8,
    titleFa: 'معماری کارکردی و لایه‌های نرم‌افزار (Functional Architecture)',
    titleEn: 'Functional Architecture & System Tiers',
    domain: 'Enterprise & Domain Architecture',
    domainFa: 'معماری سازمان و دامنه',
    factTag: 'FACT',
    summaryFa: 'تشریح لایه‌های ده‌گانه نرم‌افزار از لایه یکپارچه‌سازی و گراف تا بهینه‌سازی، شورا و رابط کاربری.',
    summaryEn: 'Ten-tier functional architecture decomposing presentation, graph, simulation, optimization, and AI layers.',
    keyDirectives: [
      'معماری لایه‌ای تمیز (Clean Architecture) با مرزبندی قطعی.',
      'لایه محاسبات مستقل از لایه وب و دیتابیس طراحی شود.',
      'عدم وجود وابستگی دایره‌ای میان ماژول‌ها.'
    ],
    technicalContentMarkdownFa: `### ۸. دیاگرام لایه‌های کارکردی سامانه

\`\`\`text
┌─────────────────────────────────────────────────────────────┐
│ 1. لایه ارائه و رابط کاربری (Presentation / UI - React 19)   │
├─────────────────────────────────────────────────────────────┤
│ 2. لایه دروازه API و اعتبارسنجی ورودی‌ها (REST API Controllers)│
├─────────────────────────────────────────────────────────────┤
│ 3. لایه شورای مجازی و هوش استدلالی (Virtual Council & AI)   │
├─────────────────────────────────────────────────────────────┤
│ 4. لایه بهینه‌سازی دوسطحی (Two-Stage Decision Engine)       │
├─────────────────────────────────────────────────────────────┤
│ 5. لایه شبیه‌سازی قطعی رخداد-گسسته (Simulation Engine)       │
├─────────────────────────────────────────────────────────────┤
│ 6. لایه گراف وابستگی‌های سازمانی (In-Memory Enterprise Graph)│
├─────────────────────────────────────────────────────────────┤
│ 7. لایه مدل دامنه کاننیکال (Canonical Domain Model)         │
├─────────────────────────────────────────────────────────────┤
│ 8. لایه پایگاه‌داده رابطه‌ای و حسابرسی (PostgreSQL 16)      │
├─────────────────────────────────────────────────────────────┤
│ 9. لایه یکپارچه‌سازی و خط لوله استخراج (SAP CDS Pipeline)   │
├─────────────────────────────────────────────────────────────┤
│ 10. لایه زیرساخت، امنیت و لاگین (Infrastructure & Telemetry) │
└─────────────────────────────────────────────────────────────┘
\`\`\``
  },
  {
    chapterNumber: 9,
    titleFa: 'مدل دامنه و Bounded Contextها (Domain-Driven Design)',
    titleEn: 'Domain-Driven Design & Bounded Contexts',
    domain: 'Enterprise & Domain Architecture',
    domainFa: 'معماری سازمان و دامنه',
    factTag: 'FACT',
    summaryFa: 'تعریف مرزهای دامنه برای منابع، پروژه‌ها، تعهدات، مالی، سناریوها، تصمیم‌گیری و یادگیری سازمانی.',
    summaryEn: 'DDD specifications detailing bounded contexts: Resource, Project, Commitment, Financial, Scenario, Decision, and Learning.',
    keyDirectives: [
      'هر کانتکست دارای ریشه مجزا (Aggregate Root) و قوانین تغییرناپذیری خود است.',
      'انتقال داده میان کانتکست‌ها فقط از طریق Data Transfer Objects (DTO) یا Domain Events صورت می‌گیرد.',
      'کانتکست Commitment مستقل از کانتکست Project طراحی شود.'
    ],
    technicalContentMarkdownFa: `### ۹. طراحی مبتنی بر دامنه (DDD)

سامانه به ۷ کانتکست مستقل تقسیم شده است:
1. **Resource Context:** مدیریت منابع، تقویم شیفت، قابلیت اطمینان، تلرانس و محدودیت‌های فیزیکی.
2. **Project Context:** ساختار WBS، شبکه‌های فعالیت و وضعیت پیشرفت سفارش‌های ساخت.
3. **Commitment Context:** تعهدات قراردادی، خسارت روزانه، انعطاف‌پذیری و ارتباط با پایداری شبکه برق.
4. **Financial Context:** متغیر حالت نقدینگی، هزینه تامین مالی سرمایه در گردش و ردیابی تبارشناسی مالی.
5. **Scenario & Simulation Context:** ورودی‌های شوک، گزینه‌های اقدام، انتشار گراف و گیت‌های امکان‌سنجی.
6. **Decision Context:** آراء شورا، بسته تصمیم، احکام اجرایی و لاگ‌های تاییدیه یا تغییر دستی.
7. **Learning Context:** حافظه سازمانی، مقایسه پیش‌بینی با واقعیت و بازتنظیم پارامترها.`
  },
  {
    chapterNumber: 10,
    titleFa: 'کاتالوگ جامع اشیاء تجاری سیستم (Master Business Object Catalog)',
    titleEn: 'Master Business Object Catalog',
    domain: 'Enterprise & Domain Architecture',
    domainFa: 'معماری سازمان و دامنه',
    factTag: 'FACT',
    summaryFa: 'شناسنامه کامل تمام موجودیت‌های تجاری سیستم شامل شناسه، تعریف، مالک سازمانی، منبع SAP، چرخه حیات و سطح محرمانگی.',
    summaryEn: 'Comprehensive catalog detailing object IDs, owners, SAP sources, lifecycles, and security classifications.',
    keyDirectives: [
      'کلیه موجودیت‌ها باید دارای شناسه یکتا، شماره نسخه و متادیتا باشند.',
      'هیچ موجودیتی فاقد منبع موثق و مشخص نباشد.',
      'محرمانگی داده‌های جریمه و حاشیه سود در سطح CONFIDENTIAL تعیین شود.'
    ],
    technicalContentMarkdownFa: `### ۱۰. کاتالوگ اشیاء تجاری سیستم (Master Object Catalog)

| کد موجودیت | نام شیء | تعریف کارکردی | منبع داده | مالک فرآیندی | سطح محرمانگی |
|---|---|---|---|---|---|
| **OBJ-RES-01** | Resource | ماشین‌آلات، ابزارآلات و مراکز کاری سنگین | SAP Work Center (CRHD/KAKO) | مدیر نگهداری و تعمیرات | عمومی سازمانی |
| **OBJ-PRD-02** | ProductionOrder | سفارش ساخت قطعه ژنراتور | SAP AFKO / AFPO | مدیر برنامه‌ریزی تولید | داخلی |
| **OBJ-OPR-03** | Operation | عملیات ماشین‌کاری با زمان و پیش‌نیازی | SAP AFVC / RESB | مهندسی فرآیند ساخت | داخلی |
| **OBJ-PRJ-04** | Project | پروژه احداث یا توسعه نیروگاه | SAP Enterprise Project (PROJ) | مدیر پروژه | داخلی |
| **OBJ-CMT-05** | Commitment | تعهد تحویل مایل‌استون همراه با نرخ جریمه | SAP Milestone / قرارداد فروش | معاونت بازرگانی | محرمانه (Confidential) |
| **OBJ-CSH-06** | CashEvent | رویداد وصول صورت‌وضعیت یا هزینه نقدی | SAP FI/CO (ACDOCA) | معاونت مالی | فوق محرمانه (Secret) |
| **OBJ-DEC-07** | DecisionPackage | بسته جامع تحلیل و حکم تصمیم‌گیری | موتور Mission Control | مدیرعامل | محرمانه هیئت‌مدیره |
| **OBJ-LRN-08** | LearningRecord | رکورد مغایرت واقعی با پیش‌بینی و درس‌آموخته | ماژول حافظه سازمانی | کمیته کیفیت و حاکمیت | داخلی |`
  },
  {
    chapterNumber: 11,
    titleFa: 'مدل پیشرفته منابع صنعتی (Industrial Resource Model)',
    titleEn: 'Comprehensive Industrial Resource Model',
    domain: 'Core Domain Modeling',
    domainFa: 'مدل‌سازی دامنه‌های پایه',
    factTag: 'FACT',
    summaryFa: 'منبع صرفاً یک عدد ظرفیت نیست؛ مدل کامل منابع شامل تلرانس، تناژ جرثقیل، اسپیندل، نرخ استهلاک و وابستگی‌هاست.',
    summaryEn: 'Resource is not a mere capacity number; modeled with spindle states, crane limits, tolerances, and labor dependencies.',
    keyDirectives: [
      'تفکیک ظرفیت اسمی از ظرفیت واقعاً قابل‌استفاده با کسر زمان ستاپ، استراحت و تعمیرات دوره‌ای.',
      'ثبت تلرانس مجاز بر حسب میلی‌متر برای ماشین‌های بورینگ و تراش سنگین.',
      'ثبت وابستگی به تناژ جرثقیل سالن ماشین‌کاری (مثلاً نیاز به جرثقیل ۱۰۰ تن برای استاتور ۸۰ تنی).'
    ],
    technicalContentMarkdownFa: `### ۱۱. مشخصات مدل منابع صنعتی مپنا پارس

در کارخانجات سنگین کرج مپنا، یک ماشین بورینگ نظیر **PAMA Speedram 2000** با پارامترهای زیر مدل می‌شود:
- **شناسه مرکز کاری:** \`RES-MAPNA-PAMA-01\` (SAP Work Center: \`WC-PAMA-2000\`).
- **تلرانس ابعادی:** \`±0.015 mm\`.
- **حداکثر وزن قطعه‌کار:** \`120 Metric Tons\`.
- **نیاز به جرثقیل سقفی سالن:** \`100 Metric Tons\` (تجهیزات جابجایی ویژه).
- **نرخ اسمی ساعت کار:** \`4,500,000 IRR/hr\`؛ اضافه کاری: \`6,800,000 IRR/hr\`.
- **قابلیت اطمینان:** شاخص MTBF معادل \`720 hours\`؛ شاخص MTTR معادل \`48 hours\`.
- **ضریب در دسترس‌پذیری موثر:** \`0.82\` (کسر ستاپ، تعویض ابزار و توقف‌های دوره‌ای).`
  },
  {
    chapterNumber: 12,
    titleFa: 'مدل تعهدات سازمانی به عنوان موجودیت درجه یک (Commitment Model)',
    titleEn: 'First-Class Commitment Model',
    domain: 'Core Domain Modeling',
    domainFa: 'مدل‌سازی دامنه‌های پایه',
    factTag: 'FACT',
    summaryFa: 'تعهد به عنوان یک شیء حاکمیتی درجه یک دارای مبالغ جریمه، تاریخ سررسید، انعطاف‌پذیری و ارتباط با شبکه سراسری.',
    summaryEn: 'Commitment as an active entity with daily liquidated damage penalties, flexibility windows, and grid criticality.',
    keyDirectives: [
      'انواع تعهد: سخت (Hard)، نرم (Soft)، مالی (Financial) و استراتژیک (Strategic).',
      'فرمول‌بندی جریمه تاخیر: نرخ خسارت روزانه ضرب در روزهای عبور از مهلت مجاز.',
      'تعهدات مپنا پارس در قبال دیسپاچینگ وزارت نیرو دارای بالاترین درجه بحرانیت (Class A) هستند.'
    ],
    technicalContentMarkdownFa: `### ۱۲. مدل حاکمیت تعهدات (Commitment Model)

تعهد در Mission Control دارای ساختار صریح زیر است:
- **انواع تعهدات:**
  1. **Hard Contractual:** دارای جریمه نقدی روزانه (Liquidated Damages) و تاریخ تحویل قطعی.
  2. **Strategic / Grid Criticality:** تاثیر مستقیم بر پایداری شبکه برق سراسری (پیک بار تابستان).
  3. **Financial Milestone:** مایل‌استون‌های آزادسازی صورت‌وضعیت‌های کارفرمایی.
  4. **Internal Production:** تاریخ تحویل روتور یا استاتور به سالن مونتاژ نهایی ژنراتور.
- **نرخ جریمه روزانه در سناریوی جهرم:** \`450,000,000 IRR/day\` برای هر روز تاخیر پس از مهلت قراردادی.`
  },
  {
    chapterNumber: 13,
    titleFa: 'مدل نقدینگی، جریان وجوه و سرمایه در گردش (Cash Model)',
    titleEn: 'Dynamic Cash & Working Capital Model',
    domain: 'Core Domain Modeling',
    domainFa: 'مدل‌سازی دامنه‌های پایه',
    factTag: 'FACT',
    summaryFa: 'نقدینگی به عنوان یک متغیر حالت پویا و قید سرمایه در گردش با محاسبه هزینه فرصت تامین مالی (نرخ WACC ۲۴٪).',
    summaryEn: 'Cash modeled as dynamic state variable with working capital financing drag and delayed milestone collections.',
    keyDirectives: [
      'تاخیر در مایل‌استون تحویل معادل تعلیق صورت‌وضعیت و تحمیل هزینه تامین مالی ۲۴٪ سالانه است.',
      'محاسبه هزینه فرصت خواب پول: Financing Drag = Delayed Cash × (Days Delay / 365) × WACC.',
      'گزینه‌های برون‌سپاری اگرچه هزینه نقدی فوری دارند، اما با پیشگیری از توقف صورت‌وضعیت کلان، نقدینگی را حفظ می‌کنند.'
    ],
    technicalContentMarkdownFa: `### ۱۳. مدل‌سازی نقدینگی و سرمایه در گردش

مدل جریان نقدینگی در سیستم صرفاً تراز حسابداری نیست، بلکه متغیر حالت زمانی است:
\`\`\`text
Cash State(t) = Opening Cash + Cumulative Inflows(t) - Cumulative Outflows(t)
\`\`\`
در پروژه ژنراتور جهرم:
- **مبلغ صورت‌وضعیت مایل‌استون تحویل استاتور:** \`42,000,000,000 IRR\`.
- **تاخیر سناریوی عدم اقدام:** \`22 روز تاخیر\`.
- **خسارت مستقیم جریمه تاخیر:** \`22 × 450M = 9,900,000,000 IRR\`.
- **هزینه تامین مالی تعلیق صورت‌وضعیت:** \`42B × (22 / 365) × 0.24 = 607,000,000 IRR\`.
- **مجموع بار منفی مالی ناشی از شوک:** \`10,507,000,000 IRR\` بار منفی مالی که با تصمیم بهنگام برون‌سپاری پیشگیری می‌شود.`
  },
  {
    chapterNumber: 14,
    titleFa: 'مدل زمانی، تقویم و تفکیک ساعتی شبیه‌سازی (Time Model)',
    titleEn: 'Time Resolution & Operational Calendar Model',
    domain: 'Core Domain Modeling',
    domainFa: 'مدل‌سازی دامنه‌های پایه',
    factTag: 'FACT',
    summaryFa: 'انتخاب تفکیک زمانی ۱ ساعته برای شبیه‌سازی MVP، مدیریت شیفت‌ها و تعطیلات رسمی با نگهداری تاریخ میلادی در هسته.',
    summaryEn: '1-hour discrete simulation bucket selection matching factory shifts, with Gregorian UTC core and Persian presentation.',
    keyDirectives: [
      'تفکیک زمانی شبیه‌سازی: ۱ ساعت (تطابق کامل با شیفت‌های ۸ و ۱۲ ساعته مپنا پارس).',
      'ذخیره کلیه زمان‌ها در پایگاه‌داده به صورت ISO 8601 UTC.',
      'نمایش تاریخ‌ها در رابط کاربری به صورت هجری شمسی با اعمال تقویم تعطیلات رسمی کشور.'
    ],
    technicalContentMarkdownFa: `### ۱۴. مدل زمانی و تقویم شیفت‌های کاری

دلایل فنی انتخاب رزولوشن ۱ ساعته برای پایلوت مپنا پارس:
1. عملیات ماشین‌کاری استاتور بین ۱۰ الی ۹۰ ساعت است؛ بازه‌های دقیقه‌ای سربار غیرضروری ایجاد می‌کنند و بازه‌های روزانه شیفت‌های اضافه را نادیده می‌گیرند.
2. تطابق کامل با گزارش‌های ظرفیت هفتگی و ماهانه ماژول SAP PP.
3. سرعت اجرای فوق‌العاده: پیمایش ماتریس ۲۰۰ ساعته در کمتر از ۵۰ میلی‌ثانیه.`
  },
  {
    chapterNumber: 15,
    titleFa: 'مدل داده کاننیکال و اسکریپت PostgreSQL DDL (Canonical Data Model)',
    titleEn: 'Canonical Data Model & Complete PostgreSQL DDL',
    domain: 'Core Domain Modeling',
    domainFa: 'مدل‌سازی دامنه‌های پایه',
    factTag: 'FACT',
    summaryFa: 'اسکریپت کامل DDL پایگاه داده رابطه‌ای کاننیکال در PostgreSQL با ۲۴ جدول اصلی، قیود کلید خارجی و جداول لاگ ممیزی.',
    summaryEn: 'Production-grade PostgreSQL 16 DDL creating canonical tables, constraints, indexes, and audit logs.',
    keyDirectives: [
      'داده‌های کاننیکال مستقل از ساختار داخلی SAP ذخیره می‌شوند.',
      'تمام جداول دارای کلید اصلی UUID یا کدهای استاندارد سازمانی و فیلدهای created_at و updated_at هستند.',
      'ثبت نسخه رکوردها (version) برای پشتیبانی از Optimistic Locking.'
    ],
    codeSnippet: {
      language: 'sql',
      title: 'Canonical Database DDL Schema (PostgreSQL 16)',
      code: `-- Mission Control Canonical DDL v1.0
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Resources Table
CREATE TABLE mc_resources (
    resource_id VARCHAR(50) PRIMARY KEY,
    sap_work_center VARCHAR(20) NOT NULL,
    name VARCHAR(150) NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    category VARCHAR(30) NOT NULL,
    criticality VARCHAR(20) NOT NULL,
    is_bottleneck BOOLEAN DEFAULT FALSE,
    shop_floor VARCHAR(100) NOT NULL,
    nominal_hourly_cost_irr NUMERIC(18, 2) NOT NULL,
    usable_availability NUMERIC(4, 2) DEFAULT 0.85,
    max_workpiece_weight_ton NUMERIC(6, 2) NOT NULL,
    tolerance_mm NUMERIC(6, 4) NOT NULL,
    current_status VARCHAR(20) DEFAULT 'OPERATIONAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Commitments Table
CREATE TABLE mc_commitments (
    commitment_id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    type VARCHAR(30) NOT NULL,
    criticality VARCHAR(20) NOT NULL,
    due_date DATE NOT NULL,
    penalty_per_day_irr NUMERIC(18, 2) NOT NULL,
    financial_value_irr NUMERIC(18, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Decisions Table
CREATE TABLE mc_decisions (
    decision_id VARCHAR(50) PRIMARY KEY,
    disruption_ref VARCHAR(100) NOT NULL,
    selected_alternative_id VARCHAR(50) NOT NULL,
    strategic_profile VARCHAR(30) NOT NULL,
    verdict VARCHAR(30) NOT NULL,
    verdict_reason TEXT,
    approved_by VARCHAR(100),
    approval_timestamp TIMESTAMP WITH TIME ZONE,
    is_overridden BOOLEAN DEFAULT FALSE,
    override_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resources_bottleneck ON mc_resources(is_bottleneck);
CREATE INDEX idx_commitments_due_date ON mc_commitments(due_date);`
    },
    technicalContentMarkdownFa: `### ۱۵. مدل داده کاننیکال (Canonical Data Model)

مدل کاننیکال پلی میان دیدگاه‌های معنایی SAP CDS و موتور شبیه‌سازی ایجاد می‌کند. جداول پایه عبارتند از:
- \`mc_enterprises\`, \`mc_plants\`, \`mc_resources\`, \`mc_resource_capacities\`
- \`mc_projects\`, \`mc_wbs_elements\`, \`mc_production_orders\`, \`mc_operations\`
- \`mc_commitments\`, \`mc_cash_events\`, \`mc_disruptions\`, \`mc_simulations\`
- \`mc_alternatives\`, \`mc_decisions\`, \`mc_learning_records\`, \`mc_audit_logs\``
  }
];
