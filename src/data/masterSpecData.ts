import { 
  MasterSpecChapter, 
  ArchitectureDecisionRecord, 
  PreMortemRisk, 
  DeveloperTask 
} from '../types';

export interface ArchitectureGapItem {
  section: string;
  baselineStatus: string;
  status: 'KEEP' | 'MODIFY' | 'REPLACE' | 'REMOVE' | 'ADD' | 'VALIDATE';
  transformationSummaryFa: string;
  implementationAction: string;
}

export interface FinalVerdictItem {
  dimension: string;
  dimensionFa: string;
  verdict: 'GO' | 'CONDITIONAL_GO' | 'NO_GO' | 'BLOCKED';
  rationaleFa: string;
  prerequisite: string;
}

export const ARCHITECTURE_GAP_MATRIX: ArchitectureGapItem[] = [
  {
    section: '01. Business Problem & Objective',
    baselineStatus: 'مفاهیم کلی اختلال کارگاهی و تصمیم‌گیری مدیریتی',
    status: 'MODIFY',
    transformationSummaryFa: 'تمرکز مطلق بر حل مسئله «قربانی‌سازی چندپروژه‌ای (Cross-Project Cannibalization)»، حفظ جریان نقدینگی ناشی از مایل‌استون‌های تحویل و محاسبه هزینه فرصت سازمانی در کارخانه پارس ژنراتور.',
    implementationAction: 'تعریف فرمول رسمی ارزش اقتصادی خالص و جلوگیری از تصمیم‌گیری تک‌پروژه‌ای.'
  },
  {
    section: '02. System Boundaries (System of Record vs Intelligence)',
    baselineStatus: 'ابهام در تفکیک وظایف SAP S/4HANA و سامانه Mission Control',
    status: 'MODIFY',
    transformationSummaryFa: 'تثبیت اصل معماری: SAP صرفاً System of Record است؛ Mission Control منحصراً System of Intelligence و شبیه‌ساز وابستگی‌هاست؛ مدیر انسانی System of Authority است.',
    implementationAction: 'ممنوعیت کامل تبدیل Mission Control به جایگزین ERP، MRP، MES یا سیستم سندزنی مالی.'
  },
  {
    section: '03. Canonical Data Model & Database',
    baselineStatus: 'مدل داده‌ای فرضی و تعاریف این‌مموری پراکنده',
    status: 'REPLACE',
    transformationSummaryFa: 'ارائه مدل داده‌ای رابطه کاننیکال مبتنی بر استاندارد صنعتی و تولید اسکریپت واقعی PostgreSQL DDL با رعایت ایندکس‌ها، قیود کلید خارجی و جداول ثبت تاریخچه حسابرسی.',
    implementationAction: 'توسعه اسکریپت DDL برای ۲۴ موجودیت کاننیکال با شناسه یکتا و نسخه داده.'
  },
  {
    section: '04. SAP Integration Architecture',
    baselineStatus: 'اشاره عمومی به جداول خام SAP نظیر AFKO, RESB',
    status: 'REPLACE',
    transformationSummaryFa: 'حذف وابستگی به جداول خام دیتابیس؛ استقرار یکپارچه‌سازی رسمی مبتنی بر SAP S/4HANA CDS Views استاندارد (I_WorkCenterCapacity, I_ProductionOrderItem, I_EnterpriseProject, ACDOCA) و BAPIهای رسمی.',
    implementationAction: 'طراحی خط لوله ETL با لایه Staging، اعتبارسنجی کیفیت داده و کنترل تاخیر (Latency SLA).'
  },
  {
    section: '05. Enterprise Dependency Graph',
    baselineStatus: 'گراف مفهومی ساده',
    status: 'MODIFY',
    transformationSummaryFa: 'تبدیل گراف به ستون فقرات مدل انتشار اثرات؛ تعریف ۱۴ نوع یال جهت‌دار (REQUIRES, USES, PRECEDES, ALLOCATED_TO, COMMITTED_TO, DELIVERS, IMPACTS) با وزن زمانی و مکانیزم کش این‌مموری.',
    implementationAction: 'پیاده‌سازی الگوریتم ساخت گراف و شناسایی حلقه‌های وابستگی نامعتبر (Cycle Detection).'
  },
  {
    section: '06. Simulation & Optimization Engine',
    baselineStatus: 'فرمول‌های متفرقه و ابهام در تفکیک هوش مصنوعی و حل‌کننده عددی',
    status: 'REPLACE',
    transformationSummaryFa: 'استقرار الگوریتم قطعی ۱۵ مرحله‌ای (15-Step Deterministic Simulation) مبتنی بر Discrete-Event Simulation با قطعیت عددی ۱۰۰٪ بدون دخالت LLM در محاسبات مالی و زمانی.',
    implementationAction: 'اجرای مدل بهینه‌سازی دوسطحی: مرحله اول ارزیابی گیت‌های امکان‌سنجی سخت، مرحله دوم بیشینه‌سازی ارزش اقتصادی.'
  },
  {
    section: '07. Virtual Executive Council & AI Layer',
    baselineStatus: 'عامل‌های هوش مصنوعی با نقش تصمیم‌گیرنده مستقیم',
    status: 'REPLACE',
    transformationSummaryFa: 'تنظیم موقعیت هوش مصنوعی صرفاً به عنوان لایه «تفسیر، پرسشگری نقادانه (Devil’s Advocate) و تهیه پیش‌نویس تصمیم»؛ قطع دسترسی LLM به محاسبات ریاضی و ملزم‌سازی به استناد منحصربه‌فرد بر فکت‌های عددی.',
    implementationAction: 'تعریف ساختار داده خروجی دارای شواهد، فرضیات، متغیرهای کلیدی و تایید گیت‌های ریسک.'
  },
  {
    section: '08. Iran Operating Reality',
    baselineStatus: 'لیست عمومی از ریسک‌های کشور بدون فرمول‌بندی اثر',
    status: 'ADD',
    transformationSummaryFa: 'تبدیل تکانه‌های اقتصاد ایران (نوسان ارز، نرخ تامین مالی سرمایه در گردش ۲۴٪، تاخیر ترخیص گمرکی، قطعی برق تابستان، تاخیر وصول مطالبات توانیر) به توابع ریاضی انتشار در گراف.',
    implementationAction: 'مدل‌سازی انتشار اثر نرخ ارز و نقدینگی در فرمول ارزش اقتصادی گزینه‌ها.'
  },
  {
    section: '09. Architectural Decision Records (ADRs)',
    baselineStatus: 'فاقد ثبت رسمی تصمیمات معماری (ADR)',
    status: 'ADD',
    transformationSummaryFa: 'تدوین ۲۵ سند تصمیم‌گیری معماری (ADR-001 الی ADR-025) با تشریح بافت مسئله، گزینه‌های بررسی‌شده، علت گزینش و عواقب فنی.',
    implementationAction: 'ایجاد مخزن رسمی ADRها در ساختار سند و سیستم.'
  },
  {
    section: '10. Pre-Mortem & Implementation Readiness',
    baselineStatus: 'عدم تحلیل سناریوی شکست سیستم',
    status: 'ADD',
    transformationSummaryFa: 'تحلیل پیش‌دستانه شکست سیستم (Pre-Mortem) در ۲۰ بعد کلیدی به همراه نشانه‌های هشدار اولیه، راهکارهای پیشگیرانه و برنامه اضطراری (Contingency).',
    implementationAction: 'تنظیم نقشه راه اسپرینت‌ها و لیست ۲۰ وظیفه نخست تیم توسعه برای استقرار پایلوت.'
  }
];

export const ARCHITECTURE_DECISION_RECORDS: ArchitectureDecisionRecord[] = [
  {
    id: 'ADR-001',
    title: 'تفکیک صریح مأموریت SAP (System of Record) و Mission Control (System of Intelligence)',
    titleEn: 'Decoupling System of Record from System of Intelligence',
    status: 'ACCEPTED',
    context: 'سامانه SAP S/4HANA در شرکت مپنا پارس وظیفه ثبت رویدادهای مالی، انبار و دستورهای ساخت تاییدشده را بر عهده دارد. اجرای شبیه‌سازی‌های متعدد What-If، تغییرات سناریو و تحلیل شاخه‌های تصمیم‌گیری روی پایگاه‌داده عملیاتی SAP باعث کندی و ریسک انطباق فرآیندی می‌شود.',
    contextEn: 'SAP S/4HANA serves as the single transactional source of truth. Running exploratory what-if simulations directly against production SAP risks locking tables, performance degradation, and transaction audit pollution.',
    optionsConsidered: [
      { option: 'پیاده‌سازی تمام شبیه‌سازی‌ها داخل کد ABAP/HANA در SAP', pros: 'دسترسی بی‌واسطه به داده‌ها', cons: 'هزینه سرسام‌آور توسعه ABAP، کندی سیستم تولید و قفل جداول' },
      { option: 'استقرار Mission Control به عنوان لایه هوشمند برون‌سپاری‌شده با مدل داده کاننیکال', pros: 'شبیه‌سازی سریع این‌مموری، عدم ایجاد بار روی تراکنش‌های SAP، معماری ماژولار', cons: 'نیاز به پایپ‌لاین همگام‌سازی دوره‌ای' },
      { option: 'جایگزینی کامل ماژول‌های تولیدی SAP با یک سیستم سفارشی', pros: 'یکپارچگی صفر تا صد', cons: 'مردود و غیرممکن به لحاظ حاکمیت سازمانی گروه مپنا' }
    ],
    decision: 'سامانه Mission Control صرفاً به عنوان System of Intelligence عمل می‌کند. پایگاه داده SAP دست‌نخورده باقی مانده و Mission Control مدل داده کاننیکال خود را از طریق CDS Views استخراج و شبیه‌سازی می‌کند.',
    decisionEn: 'Mission Control is strictly designated as the System of Intelligence, consuming SAP data through semantic CDS Views while keeping SAP as the inviolable System of Record.',
    rationale: 'این تصمیم امنیت پایگاه‌داده SAP را تضمین کرده و امکان ارزیابی ۱۰۰ سناریوی موازی در کمتر از ۲ ثانیه را بدون هرگونه ریسک برای عملیات جاری کارخانه فراهم می‌آورد.',
    rationaleEn: 'Guarantees operational stability of ERP while unlocking sub-second scenario evaluation in an isolated, high-performance simulation domain.',
    consequences: 'تیم توسعه باید خط لوله ETL قابل‌اتکا، پایدار و مقاوم در برابر قطعی با لایه Staging پیاده‌سازی کند.',
    consequencesEn: 'Requires robust CDC and staging data pipelines with guaranteed data freshness SLAs.',
    rejectedAlternatives: 'توسعه داخل هسته SAP به دلیل پیچیدگی سرسام‌آور ABAP و خطرات تداخل با عملیات جاری کارخانه مپنا پارس رد شد.',
    rejectedAlternativesEn: 'In-SAP ABAP development rejected due to prohibitive custom code maintenance and production lock risks.'
  },
  {
    id: 'ADR-002',
    title: 'انتخاب پایگاه‌داده PostgreSQL به عنوان مخزن اصلی داده‌های کاننیکال',
    titleEn: 'PostgreSQL as the Canonical Data Store',
    status: 'ACCEPTED',
    context: 'برای ذخیره‌سازی موجودیت‌های کاننیکال، تعهدات، پروژه‌ها، نسخه‌های سناریو و لاگ تصمیمات، نیاز به یک پایگاه‌داده قدرتمند با قابلیت پشتیبانی از تراکنش‌های ACID، ساختار JSONB و سازگاری کامل با استقرار On-Premise در ایران است.',
    contextEn: 'The system requires ACID compliance, advanced JSONB indexing, high concurrency, and zero license encumbrance for on-premise Iranian deployment.',
    optionsConsidered: [
      { option: 'PostgreSQL 16+', pros: 'متن‌باز، بدون هزینه لایسنس، پشتیبانی عالی از JSONB، سازگار با محیط‌های ایزوله ایران', cons: 'نیاز به پیکربندی دقیق ایندکس‌ها' },
      { option: 'Oracle Enterprise', pros: 'قدرتمند در سازمان‌های سنتی', cons: 'تحریم، هزینه گزاف لایسنس، ریسک عدم پشتیبانی' },
      { option: 'Microsoft SQL Server', pros: 'رایج در برخی سامانه‌های اداری', cons: 'لایسنس غیررسمی و محدودیت در استقرار مدرن لینوکسی' }
    ],
    decision: 'انتخاب قطعی PostgreSQL نسخه ۱۶ به عنوان پایگاه داده رسمی لایه کاننیکال و حافظه سازمانی.',
    decisionEn: 'Selected PostgreSQL 16+ as the production canonical relational and document database.',
    rationale: 'انعطاف‌پذیری فوق‌العاده در ترکیب ساختارهای جدولی با فیلدهای JSONB برای بسته‌های تصمیم‌گیری و توانایی اجرای پایدار در سرورهای محلی داخل کارخانجات مپنا.',
    rationaleEn: 'Provides optimal balance of relational consistency and semi-structured flexibility for decision packages in air-gapped environments.',
    consequences: 'نیاز به طراحی دقیق اسکریپت‌های Migration (Liquibase/Flyway) و پایش مداوم کارایی.',
    consequencesEn: 'Demands formal migration management and performance monitoring for complex dependency queries.',
    rejectedAlternatives: 'اوراکل و اس‌کیوال سرور به دلیل وابستگی‌های لایسنس و عدم انطباق با زیرساخت مدرن ابری/کانتینری رد شدند.',
    rejectedAlternativesEn: 'Proprietary enterprise RDBMS options rejected due to licensing risks and container friction.'
  },
  {
    id: 'ADR-003',
    title: 'الگوی گراف تلفیقی رابطه/این‌مموری (Relational + Graph In-Memory Abstraction)',
    titleEn: 'Hybrid Relational + In-Memory Graph Architecture',
    status: 'ACCEPTED',
    context: 'انتشار اثرات خرابی ماشین بر عملیات، سفارش‌ها، مایل‌استون‌ها و تعهدات مستلزم پیمایش عمیق گراف وابستگی‌هاست. آیا باید از یک Native Graph Database نظیر Neo4j استفاده کرد یا ساختار رابطه‌ای همراه با بارگذاری این‌مموری؟',
    contextEn: 'Impact propagation requires traversing complex multi-echelon dependency chains. Evaluating dedicated graph engines vs. memory-mapped relational graphs.',
    optionsConsidered: [
      { option: 'استقرار پایگاه داده گراف مستقل (Neo4j Enterprise)', pros: 'پرس‌وجوهای سریع Cypher', cons: 'سربار نگهداری یک دیتابیس دوم در کارخانه، مهارت کم نیروها در ایران، ریسک مغایرت داده با دیتابیس رابطه‌ای' },
      { option: 'ذخیره جداول گره و یال در PostgreSQL + کش و پیمایش گراف در حافظه سرور شبیه‌ساز (In-Memory Graph Engine)', pros: 'یکتایی پایگاه‌داده، سادگی Backup/Restore، سرعت خیره‌کننده پیمایش در رم (زیر ۵ میلی‌ثانیه)', cons: 'نیاز به مدیریت انقضای کش هنگام تغییر داده' },
      { option: 'استفاده صرف از Recursive CTE در پایگاه‌داده رابطه', pros: 'بدون نیاز به ساختار خاص', cons: 'کندی در سناریوهای بازگشتی عمیق و بارگذاری مداوم روی دیسک' }
    ],
    decision: 'انتخاب گزینه دوم: گره‌ها و یال‌ها در جداول رابطه‌ای PostgreSQL ذخیره شده و توسط ماژول گراف هسته سرور به صورت ساختار این‌مموری بارگذاری و با هر تغییر کش نامعتبرسازی می‌شود.',
    decisionEn: 'Adopted hybrid architecture: Graph nodes and edges are persisted in PostgreSQL tables and hydrated into memory graphs for sub-second propagation.',
    rationale: 'تعداد گره‌های فعال کارخانه مپنا پارس در محدوده ۱۰ الی ۵۰ هزار گره است؛ بارگذاری کل این گراف در رم کمتر از ۵۰ مگابایت حافظه مصرف کرده و سرعت پیمایش آن ۱۰۰ برابر سریع‌تر از هر دیتابیس خارجی است.',
    rationaleEn: 'Graph scale (10k-50k nodes) easily fits in-memory (<50MB), delivering 100x faster traversal than external network roundtrips.',
    consequences: 'باید مکانیزم ابطال کش (Cache Invalidation) مبتنی بر رویدادهای تغییر وضعیت سفارشات پیاده‌سازی شود.',
    consequencesEn: 'Requires robust event-driven cache invalidation upon any production confirmation or schedule update.',
    rejectedAlternatives: 'Neo4j به دلیل پیچیدگی عملیاتی استقرار در کارخانه و ایجاد نقطه شکست اضافه رد شد.',
    rejectedAlternativesEn: 'Neo4j rejected due to added infrastructure footprint and operational overhead.'
  },
  {
    id: 'ADR-004',
    title: 'ارتباط معنایی با SAP از طریق CDS Views استاندارد نه جداول خام دیتابیس',
    titleEn: 'Standard CDS Views & OData APIs over Raw SAP Tables',
    status: 'ACCEPTED',
    context: 'دسترسی مستقیم به جداول دیتابیس SAP (نظیر MARA, MARC, AFKO, AFPO, RESB) توسط شرکت SAP در معماری S/4HANA منع شده و منطق فیلدهای محاسباتی، دسترسی‌های امنیتی و تغییرات اسکیمای نسخه‌های بعدی را نادیده می‌گیرد.',
    contextEn: 'Direct table queries against S/4HANA violate SAP clean core guidelines and bypass vital authorization filters and calculated fields.',
    optionsConsidered: [
      { option: 'کوئری مستقیم به دیتابیس HANA زیرساخت SAP', pros: 'سرعت استخراج اولیه در تست‌های محدود', cons: 'نقض پروتکل‌های SAP، دور زدن لاگین و امنیت، ریسک شکست پس از ارتقای سیستم' },
      { option: 'استفاده از Standard Released CDS Views از طریق پروتکل OData / RFC BAPI', pros: 'پایداری با تغییر نسخه SAP، محاسبه خودکار ظرفیت‌ها، سازگاری ۱۰۰٪ با سیاست‌های حاکمیتی مپنا', cons: 'نیاز به تعریف ارتباط فنی پایدار' }
    ],
    decision: 'ارتباط منحصراً از طریق Core Data Services (CDS Views) استاندارد نظیر I_WorkCenterCapacity، I_ProductionOrderItem، I_EnterpriseProject و BAPIهای رسمی نظیر BAPI_PRODORD_GET_DETAIL برقرار می‌گردد.',
    decisionEn: 'Integration contract strictly uses standard released CDS Views and enterprise BAPIs, ensuring future-proof SAP S/4HANA compatibility.',
    rationale: 'دیدگاه‌های CDS داده‌ها را در لایه معنایی پالایش کرده و فیلدهای محاسباتی کارکردی (مانند ظرفیت در دسترس بدون نیاز به محاسبه تقویم شیفت) را بدون خطا تحویل می‌دهند.',
    rationaleEn: 'CDS views encapsulate enterprise business logic, shift calendars, and working patterns natively at database layer.',
    consequences: 'نیازمند ایجاد حساب کاربری فنی (Technical Communication User) با اختیارات Read-Only محدود در سامانه SAP مپنا.',
    consequencesEn: 'Demands provisioning dedicated SAP technical users with minimal read-only scope.',
    rejectedAlternatives: 'دسترسی به جداول خام به دلیل نقض قراردادهای حاکمیتی و ریسک عدم انطباق نسخه‌های بعدی رد شد.',
    rejectedAlternativesEn: 'Raw table access rejected due to compliance and operational fragility.'
  },
  {
    id: 'ADR-005',
    title: 'تفکیک وظایف موتور محاسباتی قطعی (Deterministic Engine) از لایه استدلال زبانی (LLM)',
    titleEn: 'Deterministic Numerical Engine vs. LLM Reasoning Layer',
    status: 'ACCEPTED',
    context: 'مدل‌های زبانی بزرگ (LLM) به دلیل ماهیت احتمالی (Probabilistic) مستعد توهم عددی (Numerical Hallucination) هستند و نباید تحت هیچ شرایطی محاسبات جریمه دیرکرد، تاخیر زمانی، هزینه تامین مالی و ضرایب ریسک را محاسبه کنند.',
    contextEn: 'Large Language Models are probabilistic and non-deterministic; they must never be entrusted with calculating penalties, dates, or financial bottom lines.',
    optionsConsidered: [
      { option: 'واگذاری کل ارزیابی و استخراج گزینه‌ها به پرامپت هوش مصنوعی', pros: 'توسعه سریع ظاهری', cons: 'فاجعه‌بار؛ نتایج غیرقابل تکرار، خطاهای فاحش محاسباتی و بی‌اعتباری کامل نزد مدیران مالی' },
      { option: 'موتور شبیه‌سازی قطعی عددی در بک‌اند + استفاده از LLM صرفاً جهت تبیین استدلال و پرسشگری نقادانه', pros: 'قطعیت عددی ۱۰۰٪ قابل حسابرسی، توضیح‌پذیری درخشان، قابلیت کار در شرایط قطعی کامل اینترنت', cons: 'نیاز به کدنویسی دقیق منطق محاسباتی' }
    ],
    decision: 'تمام محاسبات انتشار اثر، تاخیر، هزینه، جریمه و اولویت‌بندی گزینه‌ها به صورت قطعی و ریاضی ۱۰۰٪ در کد Backend محاسبه می‌شود. هوش مصنوعی فقط وظیفه خلاصه پژوهشی و چالشگری تصمیم (Devil’s Advocate) را دارد.',
    decisionEn: 'All mathematical and temporal evaluations execute in a deterministic backend engine. LLM is strictly confined to explanatory synthesis and Devil’s Advocate challenges.',
    rationale: 'مدیرعامل و معاونت مالی مپنا به تصمیماتی اعتماد می‌کنند که فرمول‌های ریاضی و ردپای حسابرسی آن‌ها قابل دفاع و یکتا باشد.',
    rationaleEn: 'Executive leadership demands mathematical reproducibility and auditable provenance.',
    consequences: 'سیستم شبیه‌سازی حتی با خاموش بودن کامل هوش مصنوعی یا قطع اینترنت خارجی به صورت کامل به کار خود ادامه می‌دهد.',
    consequencesEn: 'Core mission control functionality remains 100% operational in air-gapped conditions.',
    rejectedAlternatives: 'واگذاری تصمیم یا محاسبه به مدل‌های زبانی به دلیل عدم قطعیت و توهم رد شد.',
    rejectedAlternativesEn: 'Agentic LLM calculation rejected due to hallucination risks.'
  },
  {
    id: 'ADR-006',
    title: 'تفکیک زمانی شبیه‌سازی در مقیاس ۱ ساعته برای فاز MVP',
    titleEn: '1-Hour Time Bucket Resolution for MVP Simulation',
    status: 'ACCEPTED',
    context: 'دقت زمانی شبیه‌سازی می‌تواند ثانیه‌ای، دقیقه‌ای، ساعتی یا روزانه باشد. دقت‌های ریز نیازمند داده‌های سنگین MES و دقت‌های روزانه باعث نادیده گرفتن شیفت‌های کاری می‌گردد.',
    contextEn: 'Evaluating simulation time granularity between minute-level scheduling and coarse daily buckets.',
    optionsConsidered: [
      { option: 'دقت ثانیه‌ای / دقیقه‌ای (Real-time MES Tick)', pros: 'دقت تئوریک بالا', cons: 'سربار پردازشی بسیار بالا، عدم وجود داده‌های ثانیه‌ای در تمام ایستگاه‌های مپنا پارس' },
      { option: 'بازه ساعتی (1-Hour Work Center Buckets)', pros: 'تطابق کامل با شیفت‌های کاری مپنا (۸ و ۱۲ ساعته)، زمان پردازش زیر ۵۰۰ میلی‌ثانیه، سازگاری با داده‌های ظرفیت SAP', cons: 'عدم نمایش توقف‌های چنددقیقه‌ای که تاثیری در تصمیم استراتژیک ندارند' },
      { option: 'بازه روزانه (Daily Buckets)', pros: 'محاسبه فوق‌العاده سریع', cons: 'نادیده گرفتن اضافه کاری شبانه و شیفت سوم' }
    ],
    decision: 'تفکیک زمانی شبیه‌سازی برای نسخه MVP برابر با ۱ ساعت تعیین می‌گردد.',
    decisionEn: 'Selected 1-hour time buckets as the optimal operational granularity for MVP.',
    rationale: 'عملیات ماشین‌کاری سنگین استاتور و روتور در مپنا پارس بین ۱۰ الی ۱۰۰ ساعت به طول می‌انجامد؛ تفکیک ساعتی دقیق‌ترین بازنمایی را با کمترین سربار پردازشی ارائه می‌دهد.',
    rationaleEn: 'Heavy machining operations span 10 to 100+ hours; 1-hour resolution matches factory reality without computational overhead.',
    consequences: 'تقویم کاری کارخانه باید به صورت ماتریس‌های ساعتی شیفت ذخیره شود.',
    consequencesEn: 'Shop calendars must be structured with hourly shift-break awareness.',
    rejectedAlternatives: 'دقت‌های ثانیه‌ای و روزانه به دلیل افراط در پیچیدگی یا تقلیل‌گرایی ناصحیح رد شدند.',
    rejectedAlternativesEn: 'Sub-minute and daily resolutions rejected as impractical extremes.'
  },
  {
    id: 'ADR-007',
    title: 'معماری ماژولار مونولیت (Modular Monolith) به جای میکروسرویس‌های توزیع‌شده برای پایلوت',
    titleEn: 'Modular Monolith Architecture for Pilot Implementation',
    status: 'ACCEPTED',
    context: 'پیچیدگی عملیاتی استقرار میکروسرویس‌ها در محیط سرورهای داخلی کارخانه مپنا (با پروتکل‌های سخت‌گیرانه شبکه و پایش) بالاست.',
    contextEn: 'Weighing microservices distributed complexity against maintainability in on-premise industrial hosting environments.',
    optionsConsidered: [
      { option: 'میکروسرویس‌های توزیع‌شده با Kubernetes و Kafka', pros: 'مقیاس‌پذیری مستقل اجزا', cons: 'سربار غیرضروری برای یک پایلوت تک‌کارخانه‌ای، نیاز به تیم دونده DevOps، دشواری ره‌گیری خطا' },
      { option: 'مونولیت ماژولار (Modular Monolith) با جداسازی سفت و سخت Bounded Contextها', pros: 'سادگی در استقرار و دیپلوی (یک کانتینر)، کارایی بالاتر به دلیل حافظه اشتراکی، توسعه سریع، قابلیت تبدیل آتی به میکروسرویس', cons: 'نیاز به انضباط تیمی در عدم دستکاری دامنه‌های دیگر' }
    ],
    decision: 'سیستم Mission Control v1.0 به عنوان یک Modular Monolith در قالب یک سرویس کانتینری Docker پیاده‌سازی می‌گردد.',
    decisionEn: 'Mission Control v1.0 is engineered as a strictly decoupled Modular Monolith deployed via a single container.',
    rationale: 'کاهش نقاط شکست، سادگی خیره‌کننده در راه‌اندازی روی سرورهای داخلی مپنا و عملکرد بی‌نقص برای تعداد کاربران همزمان هدف (۲۰ الی ۵۰ مدیر ارشد).',
    rationaleEn: 'Minimizes deployment friction and maximizes local execution velocity for 20-50 executive users.',
    consequences: 'تیم توسعه باید مرزبندی ماژول‌های Domain، Simulation و Graph را بدون وابستگی دایره‌ای حفظ کند.',
    consequencesEn: 'Architects must enforce boundary discipline to avoid tight domain coupling.',
    rejectedAlternatives: 'معماری میکروسرویس چندگانه به عنوان Overengineering در فاز پایلوت مردود شد.',
    rejectedAlternativesEn: 'Distributed microservices rejected as unnecessary operational bloat for MVP.'
  },
  {
    id: 'ADR-008',
    title: 'موتور تصمیم‌گیری دو مرحله‌ای (Two-Stage Decision Engine)',
    titleEn: 'Two-Stage Decision Engine Architecture',
    status: 'ACCEPTED',
    context: 'در تصمیم‌گیری صنعتی، نمی‌توان گزینه‌هایی را که استانداردهای غیرقابل مذاکره کیفیت، ایمنی یا ابعادی را نقض می‌کنند صرفاً به دلیل هزینه کمتر با سایر گزینه‌ها میانگین‌گیری کرد.',
    contextEn: 'Engineering decisions cannot average out fatal technical, safety, or quality violations with low costs.',
    optionsConsidered: [
      { option: 'امتیازدهی وزنی تکی (Single-Stage Weighted Scoring)', pros: 'فرمول ساده', cons: 'امکان انتخاب گزینه‌ای خطرناک با تلرانس فاجعه‌بار به دلیل ارزان بودن هزینه' },
      { option: 'فیلترینگ دو مرحله‌ای: مرحله اول گیت‌های سخت امکان‌سنجی (Hard Gates) و مرحله دوم بهینه‌سازی چندمعیاره اقتصادی', pros: 'حذف ۱۰۰٪ گزینه‌های ناامن و غیرمجاز، تمرکز ارزیابی مالی فقط بر گزینه‌های واقعاً عملیاتی', cons: 'نیاز به تعریف گیت‌های صریح' }
    ],
    decision: 'موتور تصمیم‌گیری الزاماً دو مرحله‌ای است: مرحله ۱ گزینه‌ها را از ۵ گیت سخت رد کرده و گزینه‌های مردود را DISQUALIFIED می‌زند. مرحله ۲ گزینه‌های مجاز را بر اساس ارزش اقتصادی و شاخص‌های راهبردی رتبه‌بندی می‌کند.',
    decisionEn: 'Strict two-stage architecture: Stage 1 executes deterministic boolean feasibility gates; Stage 2 optimizes economic value on surviving candidates.',
    rationale: 'تضمین می‌کند که هیچ گزینه ناقض تلرانس ساخت، تناژ جرثقیل یا استانداردهای کیفی هرگز به عنوان توصیه به مدیرعامل پیشنهاد نشود.',
    rationaleEn: 'Guarantees that quality-violating or unsafe workarounds can never reach executive desks.',
    consequences: 'تعریف دقیق شرایط قبولی در هر ۵ گیت (کیفی، تناژ، ظرفیت، قرارداد، حقوقی).',
    consequencesEn: 'Explicit gate rules must be maintained by quality and engineering domain leads.',
    rejectedAlternatives: 'امتیازدهی تک‌مرحله‌ای به دلیل ریسک پیشنهاد گزینه‌های غیرفنی مردود شد.',
    rejectedAlternativesEn: 'Single-stage multi-criteria scoring rejected as dangerously permissive.'
  },
  {
    id: 'ADR-009',
    title: 'تعبیه نقش چالشگر بی‌طرف (Devil’s Advocate) در شورای مجازی مدیران',
    titleEn: 'Mandatory Devil’s Advocate Role in Virtual Executive Council',
    status: 'ACCEPTED',
    context: 'سوگیری تایید (Confirmation Bias) و تمایل مدیران به گزینه‌های ظاهراً سریع معمولاً ریسک‌های مرتبه دوم (نظیر تاخیر روی سایر پروژه‌ها) را پنهان می‌سازد.',
    contextEn: 'Groupthink and confirmation bias in executive committees routinely mask second-order ripple disruptions.',
    optionsConsidered: [
      { option: 'ایجاد شورا با نقش‌های فقط موافق و تاییدکننده', pros: 'کاهش اصطکاک ظاهری', cons: 'نداشتن عمق تحلیلی و عدم آمادگی برای سناریوهای بحران' },
      { option: 'تعبیه عامل تخصصی Devil’s Advocate با دستور کار سیستمی جهت به چالش کشیدن گزینه‌های برتر', pros: 'افشای فرضیات آسیب‌پذیر، مشخص‌سازی نقطه شکست شکننده، آمادگی برای بدترین شرایط', cons: 'افزایش حجم خروجی شورا' }
    ],
    decision: 'نقش Devil’s Advocate به صورت اجباری در تمام بسته‌های تصمیم تعبیه شده و مکلف است با پرسش‌های ساختاریافته فرضیات شکننده را بازخواست کند.',
    decisionEn: 'The Devil’s Advocate agent is permanently integrated into all council deliberations to systematically stress-test assumptions.',
    rationale: 'مدیران ارشد مپنا پارس با دیدن انتقادات بی‌رحمانه این عامل، متوجه می‌شوند که چه شرایطی می‌تواند تصمیم را به فاجعه تبدیل کند.',
    rationaleEn: 'Exposes fragile assumptions before committing real capital and machinery.',
    consequences: 'خروجی بسته تصمیم دارای بخشی صریح برای پاسخ به سوالات این نقش خواهد بود.',
    consequencesEn: 'Decision packages must explicitly address vulnerabilities raised by the advocate.',
    rejectedAlternatives: 'شورای بدون صدای منتقد رد شد زیرا ارزش تشخیصی ندارد.',
    rejectedAlternativesEn: 'Unanimous council workflows rejected as structurally blind to tail risks.'
  },
  {
    id: 'ADR-010',
    title: 'استقلال کامل از اینترنت خارجی و قابلیت کار در وضعیت تخفیف‌یافته (Degraded Mode)',
    titleEn: 'Internet Independence & Air-Gapped Degraded Execution',
    status: 'ACCEPTED',
    context: 'شرایط زیرساخت ارتباطی صنعتی در ایران و احتمال قطعی اینترنت بین‌الملل نباید باعث توقف تصمیم‌گیری در کارخانه نیروگاهی مپنا پارس شود.',
    contextEn: 'Operational continuity demands uninterrupted execution during international internet blockades or plant network isolation.',
    optionsConsidered: [
      { option: 'وابستگی کامل سیستم به APIهای خارجی OpenAI یا Google Gemini', pros: 'راه‌اندازی آسان هوش مصنوعی', cons: 'توقف کامل کار با قطعی اینترنت، نقض مقررات امنیتی مپنا برای داده‌های محرمانه' },
      { option: 'طراحی معماری چندلایه: هسته بدون وابستگی اینترنتی + امکان اتصال به مدل‌های بومی/لوکال (Ollama/Local vLLM) + حالت Degraded با موتور قطعی', pros: 'تداوم ۱۰۰٪ عملیات شبیه‌سازی و تصمیم‌گیری تحت هر شرایطی از قطعی شبکه', cons: 'نیاز به پیاده‌سازی تمپلیت‌های ساختاریافته استدلالی در صورت نبود LLM' }
    ],
    decision: 'هسته شبیه‌سازی، الگوریتم تصمیم‌گیری و دیتابیس کاننیکال کاملاً مستقل از اینترنت هستند. در نبود LLM، سیستم به صورت خودکار به وضعیت Degraded رفته و متون استدلالی را با الگوهای فرموله تولید می‌کند.',
    decisionEn: 'Core calculation, graph, and deterministic reasoning are 100% self-contained on-premise, gracefully falling back to deterministic templates if external AI is cut.',
    rationale: 'پایداری دفاعی و عملیاتی کارخانه اولویت مطلق است.',
    rationaleEn: 'Industrial defense and operational uptime are absolute constraints.',
    consequences: 'تمام کتابخانه‌ها و پکیج‌های جاوااسکریپت و پایتون باید در قالب ایمیج‌های داکر آفلاین بسته‌بندی شوند.',
    consequencesEn: 'All runtime dependencies must be vendored inside self-contained offline images.',
    rejectedAlternatives: 'طراحی وابسته به کلود عمومی خارجی به عنوان خطای غیرقابل گذشت امنیتی رد شد.',
    rejectedAlternativesEn: 'Cloud-only SaaS architecture rejected due to severe compliance and uptime risks.'
  },
  {
    id: 'ADR-011',
    title: 'سیاست قطعیت و حذف عبارات مبهم از مشخصات سیستم (Zero Ambiguity Policy)',
    titleEn: 'Zero Ambiguity Engineering Policy',
    status: 'ACCEPTED',
    context: 'اسناد توسعه نرم‌افزار معمولاً با عباراتی چون «در صورت لزوم» یا «بسته به شرایط» باعث سردرگمی برنامه‌نویسان و تاخیر در تحویل می‌شوند.',
    contextEn: 'Vague specifications produce divergent implementations and derail industrial deployment timelines.',
    optionsConsidered: [
      { option: 'استفاده از عبارات باز برای انعطاف آینده', pros: 'آسان‌نویسی سند', cons: 'شکست پروژه در مرحله کدنویسی و عدم توافق مهندسان' },
      { option: 'الزام به اتخاذ یک تصمیم پیشنهادی قاطع (RECOMMENDED DECISION) برای هر مسئله', pros: 'شفافیت مطلق، امکان پیاده‌سازی مستقیم توسط تیم بدون جلسه توجیهی', cons: 'نیاز به جسارت و دقت مهندسی بالا' }
    ],
    decision: 'هیچ ابهامی در سند و کد مجاز نیست. در تمام دوراهی‌ها، یک گزینه مشخص انتخاب و دلیل آن مستند گردیده است.',
    decisionEn: 'Zero ambiguity policy enforced: Every architecture dilemma has an explicit recommended decision and implementation contract.',
    rationale: 'تیم نرم‌افزاری مپنا پارس باید بتواند بدون جلسات مداوم تفسیری، کل سیستم را بسازد.',
    rationaleEn: 'Enables rapid execution without endless architectural alignment meetings.',
    consequences: 'هر تغییر در تصمیمات پیشنهادی مستلزم ثبت ADR جدید است.',
    consequencesEn: 'Modifications require formal ADR supersession.',
    rejectedAlternatives: 'اسناد بدون تصمیم‌گیری قاطع به عنوان پیش‌نویس‌های بی‌فایده رد شدند.',
    rejectedAlternativesEn: 'Vague RFC-style specifications rejected.'
  },
  {
    id: 'ADR-012',
    title: 'تعهد (Commitment) به عنوان موجودیت درجه یک در مدل داده',
    titleEn: 'Commitment as a First-Class Citizen in Domain Model',
    status: 'ACCEPTED',
    context: 'در سیستم‌های متداول ERP، تعهد صرفاً تاریخ تحویل یک پروژه یا یک ردیف در سفارش فروش است و رابطه آن با منابع به صورت زنده مدل نمی‌شود.',
    contextEn: 'Conventional ERP models treat delivery dates as passive deadline fields rather than active governance commitments tied to operational dependencies.',
    optionsConsidered: [
      { option: 'استفاده از تاریخ پایان پروژه در ماژول SAP PS به عنوان تعهد', pros: 'عدم نیاز به موجودیت جدید', cons: 'عدم قابلیت مدل‌سازی تعهدات چندگانه، خسارت روزانه، انعطاف‌پذیری و ارتباط با شبکه سراسری' },
      { option: 'تعریف شیء مستقل Commitment با انواع هارد و سافت، اولویت، نرخ جریمه و اثر اعتباری', pros: 'امکان سنجش دقیق آسیب به تعهد در صورت تاخیر منبع، رصد تعهدات متقاطع پروژه‌ها', cons: 'ایجاد یک موجودیت جدید در مدل داده' }
    ],
    decision: 'تعهد به عنوان یک موجودیت درجه یک (First-Class Domain Entity) تعریف می‌شود و هر رویداد اختلال منبع مستقیماً به سمت گره‌های تعهد منتشر می‌گردد.',
    decisionEn: 'Commitment is engineered as a first-class domain entity with explicit financial penalties, flexibility thresholds, and network stability criticality.',
    rationale: 'هدف اصلی Mission Control نجات تعهدات کلان سازمان در برابر شبکه برق و کارفرمایان است.',
    rationaleEn: 'Mission Control exists fundamentally to preserve enterprise commitments against cascading grid failures.',
    consequences: 'تمام پروژه‌ها باید تعهدات مرتبط با مایل‌استون‌های صورت‌وضعیت و تحویل خود را ثبت کنند.',
    consequencesEn: 'All projects must link their key milestones to formal commitment objects.',
    rejectedAlternatives: 'مدل‌سازی تعهد به عنوان فیلد متنی ساده رد شد.',
    rejectedAlternativesEn: 'Passive text-based deadline fields rejected as analytically impotent.'
  },
  {
    id: 'ADR-013',
    title: 'مدل‌سازی نقدینگی (Cash) به عنوان متغیر حالت پویا و قید سرمایه در گردش',
    titleEn: 'Cash as a Dynamic State Variable & Working Capital Constraint',
    status: 'ACCEPTED',
    context: 'پول نقد صرفاً یک دارایی نیست، بلکه تاخیر در وصول صورت‌وضعیت‌ها در مپنا پارس باعث بحران پرداخت حقوق و خرید مواد اولیه خارجی می‌شود.',
    contextEn: 'Cash flow delays inflict severe borrowing costs and liquidity squeezes on turbine manufacturing lines.',
    optionsConsidered: [
      { option: 'نادیده گرفتن اثر زمانی پول و بررسی صرف سود حسابداری', pros: 'محاسبات آسان سود', cons: 'گمراه‌کننده؛ نادیده گرفتن هزینه فرصت پول و هزینه تسهیلات بانکی ۲۴ درصدی' },
      { option: 'مدل‌سازی روزانه جریان نقد و محاسبه هزینه تامین مالی سرمایه در گردش ناشی از تاخیر صورت‌وضعیت', pros: 'ارزیابی واقعی تصمیمات از منظر خزانه‌داری و مدیرعامل، نجات نقدینگی شرکت', cons: 'نیاز به فرمول تنزیل زمانی' }
    ],
    decision: 'نقدینگی به عنوان یک متغیر حالت پویا با نرخ هزینه تامین مالی سرمایه در گردش (پیش‌فرض ۲۴٪ سالانه) در تمام ارزیابی‌های اقتصادی لحاظ می‌شود.',
    decisionEn: 'Cash is modeled as a dynamic time-dependent state variable incorporating working capital financing burn rates (24% annual baseline).',
    rationale: 'یک روز تاخیر در وصول صورت‌وضعیت ۴۲ میلیارد ریالی در شرایط نرخ بهره ایران معادل ۲۸ میلیون ریال خسارت تامین مالی روزانه به شرکت است.',
    rationaleEn: 'Accounts for the severe real-world cost of capital in high-inflation environments.',
    consequences: 'تمام آلترناتیوها فاکتور Financing Cost ناشی از تاخیر را در تبارشناسی مالی خود نشان می‌دهند.',
    consequencesEn: 'All alternatives must trace financial carrying costs in their lineage logs.',
    rejectedAlternatives: 'سود حسابداری سنتی بدون در نظر گرفتن ارزش زمانی پول رد شد.',
    rejectedAlternativesEn: 'Static accrual margin models rejected for operational decision making.'
  },
  {
    id: 'ADR-014',
    title: 'محاسبه رسمی پدیده قربانی‌سازی پروژه‌ها و هزینه فرصت سازمانی (Cross-Project Cannibalization)',
    titleEn: 'Formal Tracking of Cross-Project Cannibalization & Opportunity Cost',
    status: 'ACCEPTED',
    context: 'در تصمیم‌گیری‌های سنتی کارخانه‌ای، مدیر پروژه با اعمال نفوذ، قطعه خود را روی ماشین یک پروژه دیگر می‌گذارد و بدون محاسبه خسارت، تعهد دیگران را نابود می‌کند.',
    contextEn: 'Siloed project managers routinely steal shared machine slots, solving local delays by inflicting catastrophic delays on neighboring projects.',
    optionsConsidered: [
      { option: 'بهینه‌سازی ایزوله فقط برای پروژه‌ای که دچار اختلال شده است', pros: 'سادگی مدل', cons: 'فاجعه قربانی‌سازی (Cannibalization)؛ نجات جهرم به قیمت نابودی پروژه سد کارون' },
      { option: 'محاسبه هزینه فرصت سازمانی تحمیل‌شده بر سایر پروژه‌ها در ماتریس شبیه‌سازی', pros: 'دید سراسری هلدینگ، ممانعت از تصمیمات مصلحتی محلی، حفظ بیشترین ارزش کلان', cons: 'نیاز به رصد کل سبد پروژه‌ها' }
    ],
    decision: 'هر گزینه که ظرفیت مشترک را بازتخصیص دهد، الزاماً جریمه تاخیر و آسیب‌های پروژه‌های دوم را به عنوان Enterprise Opportunity Cost در فرمول ارزش خالص محاسبه و کسر می‌کند.',
    decisionEn: 'Every capacity reallocation must explicitly compute and subtract the Enterprise Opportunity Cost inflicted on cannibalized secondary projects.',
    rationale: 'جلوگیری از این خطای شناختی که نجات پروژه جهرم با ایجاد تاخیر روی شفت کارون یک پیروزی است.',
    rationaleEn: 'Prevents false local optima where saving one turbine destroys a hydro project.',
    consequences: 'گزینه بازتخصیص داخلی به ماشین والدریش به دلیل ارزش خالص منفی رد می‌شود.',
    consequencesEn: 'Exposes in-house machine reallocation as wealth-destructive when opportunity costs exceed direct savings.',
    rejectedAlternatives: 'تصمیم‌گیری جزیره‌ای و تک‌پروژه‌ای رسماً در مپنا پارس ممنوع شد.',
    rejectedAlternativesEn: 'Isolated single-project optimization strictly banned.'
  },
  {
    id: 'ADR-015',
    title: 'مدل‌سازی ارزش اطلاعات ناقص و آستانه تغییر تصمیم (Value of Information & Flip Threshold)',
    titleEn: 'Value of Information (VOI) & Decision Flip Threshold Modeling',
    status: 'ACCEPTED',
    context: 'مدیران هرگز با اطلاعات کامل تصمیم نمی‌گیرند؛ مجهولاتی نظیر ظرفیت واقعی خالی پیمانکار یا زمان ترخیص گمرکی وجود دارد.',
    contextEn: 'Industrial decisions occur under incomplete information regarding contractor machining windows and customs clearance dates.',
    optionsConsidered: [
      { option: 'توقف شبیه‌سازی تا زمان قطعیت ۱۰۰٪ تمام داده‌ها', pros: 'دقت ظاهری', cons: 'فلج تصمیم‌گیری و تشدید تاخیرها' },
      { option: 'شناسایی حساس‌ترین متغیر نامعلوم (Critical Missing Information) و تعیین آستانه تغییر تصمیم (Flip Threshold)', pros: 'راهنمایی تیم برای جمع‌آوری متمرکز فقط اطلاعات حیاتی، امکان تصمیم‌گیری سریع با درک ریسک', cons: 'نیاز به تحلیل حساسیت' }
    ],
    decision: 'بسته تصمیم باید متغیر نامعلوم حیاتی، زمان لازم برای جمع‌آوری آن و مقداری که در آن تصمیم عوض می‌شود (Flip Threshold) را گزارش کند.',
    decisionEn: 'Every decision package must articulate the primary missing variable, lead time to verify, and the exact mathematical flip threshold that would reverse the choice.',
    rationale: 'مدیرعامل می‌داند اگر پیمانکار ظرفیت زیر ۷۰ ساعت خالی داشته باشد، مسیر فوراً به تعمیر داخلی تغییر می‌کند.',
    rationaleEn: 'Gives executives actionable contingency triggers rather than false certainty.',
    consequences: 'تعبیه کارت هوش تصمیم در پنل بسته تصمیم مدیرعامل.',
    consequencesEn: 'Dedicated VOI intelligence cards integrated into the executive cockpit.',
    rejectedAlternatives: 'صبر منفعلانه برای تکمیل تمام اطلاعات کارگاهی رد شد.',
    rejectedAlternativesEn: 'Passive waiting for perfect data rejected.'
  },
  {
    id: 'ADR-016',
    title: 'تبارشناسی و ردپای فرمولی محاسبات مالی (Financial Calculation Lineage)',
    titleEn: 'Auditable Financial Calculation Lineage & Provenance',
    status: 'ACCEPTED',
    context: 'هیئت‌مدیره و بازرسان مالی به اعدادی که منبع و فرمول استخراج آنها مشخص نیست اعتماد نمی‌کنند.',
    contextEn: 'Executive boards and state auditors dismiss black-box financial metrics lacking clear mathematical lineage.',
    optionsConsidered: [
      { option: 'نمایش صرف عدد خالص نهایی (مثلاً +5.20B ریال)', pros: 'صفحه تمیز و خلوت', cons: 'بی‌اعتمادی مدیران و عدم امکان اعتبارسنجی' },
      { option: 'ذخیره و نمایش رشته فرمول دقیق تبارشناسی به همراه منبع داده، نرخ تنزیل و سوابق قراردادی', pros: 'شفافیت ۱۰۰٪، دفاع‌پذیری در مراجع بازرسی و اعتماد کامل هیئت‌مدیره', cons: 'پیاده‌سازی متغیر رشته‌ای در ساختار داده' }
    ],
    decision: 'تمام شاخص‌های مالی کلیدی دارای فیلد calculationLineage هستند که فرمول دقیق تفریق هزینه‌ها، جرایم پیشگیری‌شده و هزینه‌های فرصت را نمایش می‌دهد.',
    decisionEn: 'Every financial metric is coupled with an auditable provenance string tracing input variables, penalty formulas, and discount rates.',
    rationale: 'حسابرسی دقیق، شرط اول تصمیم‌گیری در شرکت‌های تابعه مپنا است.',
    rationaleEn: 'Establishes unimpeachable auditability for corporate governance.',
    consequences: 'سیستم شبیه‌سازی باید در هر دور این فرمول را با اعداد به‌روز بسازد.',
    consequencesEn: 'Engines must dynamically compose lineage equations on every run.',
    rejectedAlternatives: 'ارقام جعبه سیاه (Black Box) بدون فرمول محاسبه به عنوان ضدالگو رد شدند.',
    rejectedAlternativesEn: 'Opaque metrics without trace lineage banned.'
  },
  {
    id: 'ADR-017',
    title: 'تابع هدف چندمعیاره و نرمال‌سازی شاخص‌ها در مقیاس ۰ الی ۱۰۰',
    titleEn: 'Normalized Multi-Objective Composite Scoring Function',
    status: 'ACCEPTED',
    context: 'شاخص‌های تصمیم با مقیاس‌های متناقض هستند: روزهای تاخیر (۰ الی ۳۰ روز)، هزینه (میلیارد ریال)، ریسک اجرایی (۰ الی ۱) و تعهد به شبکه (۰ الی ۱۰۰).',
    contextEn: 'Decision objectives possess conflicting units: calendar days, billion rials, probability bounds, and strategic categorical rankings.',
    optionsConsidered: [
      { option: 'جمع غیرنرمال با ضرایب تصادفی', pros: 'کدنویسی ابتدایی', cons: 'سلطه یک فاکتور مالی بر تمام عوامل ایمنی و استراتژیک' },
      { option: 'نرمال‌سازی خطی با حدود بدترین/بهترین مقدار و اعمال ماتریس اوزان پروفایل استراتژیک', pros: 'قابلیت مقایسه عادلانه، شفافیت اوزان و پاسخگویی به تغییر اولویت‌های هیئت مدیره', cons: 'نیاز به تعیین کران‌های نرمال‌سازی' }
    ],
    decision: 'استفاده از فرمول نرمال‌سازی مینی‌ماکس (Min-Max) معکوس برای ضررها و مستقیم برای دستاوردها و محاسبه امتیاز مرکب نهایی بین ۰ تا ۱۰۰ بر اساس اوزان پروفایل فعال.',
    decisionEn: 'Enforces Min-Max linear normalization into [0, 100] domain with explicit weighting matrices driven by active strategic profiles.',
    rationale: 'امکان تطبیق فوری تصمیمات سامانه با سیاست اعلامی مپنا (پروفایل بحران نقدینگی در برابر بحران حیثیت تحویل).',
    rationaleEn: 'Allows instantaneous recalibration across Balanced, Cash Crisis, and Delivery Crisis postures.',
    consequences: 'امکان مشاهده ریز امتیاز هر بعد در جدول مقایسه‌ای گزینه‌ها.',
    consequencesEn: 'Sub-metric scores must be exposed in comparative analytics tables.',
    rejectedAlternatives: 'امتیازدهی بدون نرمال‌سازی آماری به دلیل اعوجاج ریاضی رد شد.',
    rejectedAlternativesEn: 'Raw summation without normalization rejected.'
  },
  {
    id: 'ADR-018',
    title: 'حفظ مطلق اختیارات تصمیم‌گیرنده انسانی و ثبت تفصیلی Overrideها',
    titleEn: 'Absolute Human Decision Authority & Mandatory Override Auditing',
    status: 'ACCEPTED',
    context: 'آیا سامانه Mission Control می‌تواند تصمیمی را خودکار تصویب و به SAP ارسال کند؟',
    contextEn: 'Evaluating whether Mission Control should ever autonomously dispatch procurement or scheduling mutations to SAP without human sign-off.',
    optionsConsidered: [
      { option: 'تصویب خودکار بدون دخالت انسان (Autonomous AI)', pros: 'سرعت ظاهری', cons: 'خطرناک، غیرقانونی به لحاظ مسئولیت حقوقی و باطل در مدیریت صنعتی تجهیزات فوق‌سنگین' },
      { option: 'مدیرعامل / هیئت مدیره مرجع مطلق تصمیم (System of Authority)؛ ثبت هرگونه تغییر دستی با ذکر دلیل در ردپای حسابرسی', pros: 'حفظ مسئولیت‌پذیری قانونی، تطبیق با پروتکل‌های سازمانی، اعتماد مدیران به عدم جایگزینی انسان', cons: 'نیازمند ثبت امضا و تاییدیه' }
    ],
    decision: 'انسان مرجع مطلق تصمیم است. سامانه صرفاً بسته تحلیل و توصیه ارائه می‌دهد. مدیرعامل می‌تواند تصمیم را تایید، رد یا با گزینه دیگری Override کند و دلیل آن ثبت ابدی می‌گردد.',
    decisionEn: 'Human management retains exclusive decision authority. System only prepares actionable packages. Overrides are permanently audited with logged justifications.',
    rationale: 'هیچ الگوریتمی مسئولیت قانونی خسارت چند صد میلیاردی توقف توربین نیروگاهی را بر عهده نخواهد گرفت.',
    rationaleEn: 'Legal and financial liability for grid-scale equipment lies strictly with executive leadership.',
    consequences: 'طراحی دکمه‌های تایید، تغییر مسیر و فرم ثبت توضیحات در صفحه بسته تصمیم.',
    consequencesEn: 'Interactive approval and override dialogs implemented in executive views.',
    rejectedAlternatives: 'مدیریت کامپیوتر-محور و خودکارسازی بدون نظارت رد شد.',
    rejectedAlternativesEn: 'Autonomous unmonitored decision execution rejected as hazardous.'
  },
  {
    id: 'ADR-019',
    title: 'موتور یادگیری سازمان و تصحیح تحت حاکمیت پارامترها (Governed Organizational Memory)',
    titleEn: 'Governed Organizational Memory & Parameter Tuning Pipeline',
    status: 'ACCEPTED',
    context: 'هنگامی که نتایج واقعی با پیش‌بینی شبیه‌سازی مغایرت پیدا می‌کند، چگونه مدل شبیه‌سازی باید اصلاح شود؟',
    contextEn: 'Addressing simulation parameter drift and feedback loops between projected vs. actual shop-floor outcomes.',
    optionsConsidered: [
      { option: 'یادگیری خودکار پنهان در پس‌زمینه (Online Black-Box Learning)', pros: 'بدون زحمت انسان', cons: 'تغییر غیرمنتظره رفتار موتور، عدم امکان ریشه‌یابی و خطای دومینویی در محاسبات آینده' },
      { option: 'ثبت رکورد یادگیری بسته، تحلیل علت ریشه‌ای (Root Cause) و اصلاح پارامتر با تایید کمیته مهندسی و ثبت شماره نسخه مدل', pros: 'قابلیت ردیابی کامل، ارتقای شفاف دانش کارخانه و جلوگیری از اعوجاج مدل', cons: 'نیازمند فرآیند کنترل تغییرات' }
    ],
    decision: 'اصلاح پارامترهای موتور شبیه‌سازی (نظیر نرخ استهلاک یا روزهای ترانزیت جاده‌ای) تنها از طریق چرخه بسته بازخورد و با ثبت نسخه جدید مدل (Model Versioning) انجام می‌شود.',
    decisionEn: 'Model calibrations follow a governed closed-loop: Variances trigger root-cause analysis, and parameter shifts require formal engineering review and semantic model versioning.',
    rationale: 'پایداری و تکرارپذیری شبیه‌سازی در گذر زمان حفظ می‌شود.',
    rationaleEn: 'Maintains long-term analytical reproducibility and audit confidence.',
    consequences: 'طراحی ماژول تاریخچه حافظه سازمانی با ثبت مقادیر پیش‌بینی، واقعی و انحرافات.',
    consequencesEn: 'Dedicated organizational memory component logging baseline, actuals, and variance causes.',
    rejectedAlternatives: 'تغییرات خودکار و اعلام‌نشده در مدل شبیه‌سازی اکیداً ممنوع گردید.',
    rejectedAlternativesEn: 'Ungoverned online model adaptation strictly prohibited.'
  },
  {
    id: 'ADR-020',
    title: 'انتخاب سناریوی خرابی ماشین بورینگ پاما به عنوان سناریوی طلایی پایلوت (Pilot Golden Scenario)',
    titleEn: 'Selection of PAMA Speedram Boring Mill Breakdown as Golden Pilot',
    status: 'ACCEPTED',
    context: 'برای اثبات کارآمدی سامانه در فاز پایلوت، نیاز به یک سناریوی صنعتی پرتکرار، حیاتی، با بار مالی سنگین و پوشش کامل در داده‌های SAP است.',
    contextEn: 'Selecting the definitive pilot disruption balancing business impact, SAP coverage, and verifiable ROI for MAPNA Pars.',
    optionsConsidered: [
      { option: 'تاخیر در تامین مواد خام وارداتی (شمش‌های فورج روتور)', pros: 'بحران واقعی شرکت', cons: 'وابستگی شدید به شرکای خارجی و داده‌های نامطمئن گمرکی در شروع کار' },
      { option: 'خرابی اسپیندل ماشین بورینگ CNC سنگین پاما (PAMA Speedram 2000) در کارخانه پارس', pros: 'منبع انحصاری و گلوگاه پوسته استاتور ژنراتور، پوشش کامل در SAP، جریمه روزانه ۴۵۰ میلیون ریالی، قابلیت آزمون گزینه‌های برون‌سپاری و بازتخصیص داخلی', cons: 'نیاز به هماهنگی با تیم نگهداری و تعمیرات' },
      { option: 'افت فشار گاز یا قطعی برق کارخانه', pros: 'ریسک واقعی فصلی', cons: 'تاثیر بر همه خطوط و عدم امکان ارزیابی ظریف آلترناتیوهای ماشین‌کاری' }
    ],
    decision: 'سناریوی خرابی ۲۰ روزه اسپیندل ماشین پاما در خط استاتور پروژه نیروگاه جهرم به عنوان Pilot Golden Scenario انتخاب گردید.',
    decisionEn: 'Adopted the 20-day hydraulic spindle failure on PAMA Speedram 2000 as the definitive golden pilot scenario.',
    rationale: 'دارای بالاترین ارزش تجاری، داده‌های ثبت‌شده واقعی در SAP و قابلیت تفکیک شفاف بین گزینه‌های برون‌سپاری، بازتخصیص و تعمیر داخلی.',
    rationaleEn: 'Delivers maximum business impact, pristine SAP master data alignment, and crystal-clear alternative trade-offs.',
    consequences: 'آماده‌سازی داده‌های واقعی این ماشین و پروژه‌های درگیر در دیتابیس کاننیکال.',
    consequencesEn: 'Full synthetic and sanitized datasets constructed around PAMA work center capacity.',
    rejectedAlternatives: 'سایر سناریوها برای فازهای MVP-Plus و پایلوت ۲ موکول شدند.',
    rejectedAlternativesEn: 'Alternative disruptions deferred to subsequent roadmap phases.'
  },
  {
    id: 'ADR-021',
    title: 'مدل کنترل دسترسی مبتنی بر نقش (RBAC) با تفکیک وظایف مالی و عملیاتی',
    titleEn: 'Role-Based Access Control (RBAC) with Operational Segregation of Duties',
    status: 'ACCEPTED',
    context: 'داده‌های قراردادها، نرخ جرایم تاخیر، مبالغ صورت‌وضعیت‌ها و احکام تصمیم‌گیری فوق‌العاده حساس هستند.',
    contextEn: 'Project penalties, billing milestones, and strategic veto powers require strict confidentiality and privilege boundaries.',
    optionsConsidered: [
      { option: 'یک سطح دسترسی کلی برای تمام کاربران کارخانه', pros: 'سادگی در توسعه', cons: 'نقض پروتکل‌های محرمانگی تجاری مپنا' },
      { option: 'مدل ۴ سطحی: ناظر عملیات (View Only)، مهندس فرآیند (Simulator Runner)، عضو شورا (Council Member)، مدیرعامل/هیئت مدیره (Executive Authority)', pros: 'انطباق ۱۰۰٪ با ساختار سازمانی و حفظ حریم داده‌های مالی', cons: 'نیاز به کنترل توکن‌ها در APIها' }
    ],
    decision: 'استقرار مدل RBAC چهار سطحی و محافظت از کلیه اندپوینت‌های تصمیم با توکن‌های امنیتی JWT.',
    decisionEn: 'Enforces a 4-tier hierarchical RBAC scheme with granular endpoint-level JWT claims.',
    rationale: 'تنها کاربران دارای نقش EXECUTIVE حق ثبت مصوبه یا تغییر دستی تصمیم را دارند.',
    rationaleEn: 'Only authenticated executive tokens can issue binding decision packages.',
    consequences: 'اعتبارسنجی نقش در لایه API Gateway و فیلتر کردن مقادیر محرمانه برای کاربران عمومی.',
    consequencesEn: 'API layer strictly strips confidential financial fields for lower-tier roles.',
    rejectedAlternatives: 'دسترسی سراسری ادمین رد شد.',
    rejectedAlternativesEn: 'Generic administrative access flatly rejected.'
  },
  {
    id: 'ADR-022',
    title: 'معماری ابطال مبتنی بر رویداد (Event-Driven State Invalidation)',
    titleEn: 'Domain Event-Driven State & Graph Cache Invalidation',
    status: 'ACCEPTED',
    context: 'هنگامی که یک تاییدیه ساخت (Order Confirmation) در SAP ثبت می‌شود یا رخداد خرابی رخ می‌دهد، گراف حافظه باید سریعاً به‌روز شود.',
    contextEn: 'Ensuring in-memory graph models remain strictly coherent with real-time operational state shifts.',
    optionsConsidered: [
      { option: 'پولینگ مداوم دیتابیس در بازه‌های ۱۰ ثانیه‌ای', pros: 'کدنویسی آسان', cons: 'هدررفت منابع پردازشی و شبکه' },
      { option: 'انتشار Domain Event در سیستم (نظیر RESOURCE_UNAVAILABLE یا ORDER_CONFIRMED) و بازسازی انتخابی زیرگراف آسیب‌دیده', pros: 'سرعت واکنش آنی، مصرف بهینه منابع، حفظ پایداری سیستم', cons: 'نیاز به پیاده‌سازی Event Bus داخلی' }
    ],
    decision: 'استفاده از Event Bus درون‌برنامه‌ای برای انتشار رویدادهای دامنه و ابطال گره‌های مربوطه در گراف حافظه.',
    decisionEn: 'Internal in-memory domain event bus orchestrates granular cache eviction and graph mutation on demand.',
    rationale: 'پاسخگویی به شوک‌های کارگاهی در کسری از ثانیه بدون ایجاد ترافیک هرز روی دیتابیس.',
    rationaleEn: 'Instantaneous shock propagation without polling overhead.',
    consequences: 'تعریف اسکیماهای استاندارد برای تمام ۱۲ رویداد اصلی سیستم.',
    consequencesEn: 'Standardized schemas formalized for all core domain events.',
    rejectedAlternatives: 'پولینگ دوره‌ای به دلیل ناکارآمدی رد شد.',
    rejectedAlternativesEn: 'Periodic polling loops rejected.'
  },
  {
    id: 'ADR-023',
    title: 'پایش و مشاهده‌پذیری سیستم با استفاده از استانداردهای OpenTelemetry و لاگ ساختاریافته',
    titleEn: 'Observability Stack via OpenTelemetry & Structured JSON Logging',
    status: 'ACCEPTED',
    context: 'برای تضمین پایداری در محیط On-Premise مپنا، باید وضعیت سلامت گراف، زمان پاسخ شبیه‌سازی و نرخ خطای ارتباط با SAP به دقت رصد شود.',
    contextEn: 'Industrial operations require deep telemetry over graph traversal times, memory pressure, and CDS ingestion latency.',
    optionsConsidered: [
      { option: 'لاگ‌های متنی ساده بدون فرمت در فایل کنسول', pros: 'بدون سربار اولیه', cons: 'عدم امکان جستجو، تحلیل یا اتصال به سامانه‌های پایش مرکزی مپنا' },
      { option: 'فرمت استاندارد Structured JSON Logging و متغیرهای متریک OpenTelemetry سازگار با Prometheus/Grafana', pros: 'امکان رصد دقیق سلامت سیستم، هشدارهای خودکار پیش از توقف و سازگاری با IT هلدینگ', cons: 'نیاز به تنظیم کتابخانه‌های تله‌متری' }
    ],
    decision: 'پیاده‌سازی لاگ‌های ساختاریافته JSON به تفکیک لایه‌های اپلیکیشن، امنیت، حسابرسی و شبیه‌سازی همراه با اندپوینت استاندارد /metrics.',
    decisionEn: 'Standardized structured JSON logging coupled with Prometheus-compatible /metrics instrumentation across all core subsystems.',
    rationale: 'امکان اثبات توافق‌نامه سطح خدمت (SLA زیر ۲ ثانیه برای شبیه‌سازی) در محیط واقعی پایلوت.',
    rationaleEn: 'Empirically verifies sub-2-second simulation latency SLAs for enterprise acceptance.',
    consequences: 'تعبیه لاگرهای تخصصی در تمام ماژول‌های شبیه‌سازی و ارتباط با SAP.',
    consequencesEn: 'Structured logging decorators integrated into critical pipeline stages.',
    rejectedAlternatives: 'لاگ‌های متنی ساده رد شدند.',
    rejectedAlternativesEn: 'Unstructured console stdout rejected.'
  },
  {
    id: 'ADR-024',
    title: 'طراحی راهبرد بازیابی پس از فاجعه با اهداف RPO کمتر از ۱ ساعت و RTO کمتر از ۲ ساعت',
    titleEn: 'Disaster Recovery Strategy with RPO ≤ 1h and RTO ≤ 2h',
    status: 'ACCEPTED',
    context: 'در صورت از کار افتادگی سرور محلی کارخانه، زمان بازیابی سیستم و میزان داده‌های از دست‌رفته باید در حداقل ممکن باشد.',
    contextEn: 'Establishing concrete recovery time and data loss targets for industrial plant hosting contingencies.',
    optionsConsidered: [
      { option: 'پشتیبان‌گیری هفتگی دستی', pros: 'عدم نیاز به ابزار خاص', cons: 'خطر از دست رفتن تصمیمات یک هفته و عدم آمادگی در بحران' },
      { option: 'پشتیبان‌گیری ساعتی خودکار از تراکنش‌ها (PostgreSQL WAL Archiving) و ذخیره ایزوله روی استوریج ثانویه شبکه مپنا', pros: 'تحقق RPO کمتر از ۱ ساعت و بازگردانی فوری در کمتر از ۲ ساعت در سرور پشتیبان', cons: 'نیاز به اسکریپت‌نویسی پشتیبان‌گیری' }
    ],
    decision: 'پیاده‌سازی خودکار Snapshot و بایگانی تراکنش‌ها با تضمین RPO حداکثر ۶۰ دقیقه و RTO حداکثر ۱۲۰ دقیقه.',
    decisionEn: 'Automated continuous WAL archiving and configuration snapshotting meeting RPO ≤ 1 hour and RTO ≤ 2 hours.',
    rationale: 'تضمین حفظ کلیه بسته‌های تصمیم تاییدشده توسط مدیرعامل و سوابق حافظه سازمانی.',
    rationaleEn: 'Ensures absolute persistence of executive decisions and historical learning datasets.',
    consequences: 'اجرای تست بازیابی ماهانه در محیط آزمایش کارخانه.',
    consequencesEn: 'Mandatory monthly recovery drill in staging environments.',
    rejectedAlternatives: 'بکاپ‌های نامنظم دستی به عنوان نقض اصول پایه‌ای نرم‌افزار رد شدند.',
    rejectedAlternativesEn: 'Irregular manual backups rejected.'
  },
  {
    id: 'ADR-025',
    title: 'بومی‌سازی کامل محیط کاربری با پشتیبانی از تقویم خورشیدی و نگهداری تاریخ میلادی در هسته',
    titleEn: 'Full Persian Localization with Gregorian Engine Core',
    status: 'ACCEPTED',
    context: 'کاربران، مدیران و برنامه‌ریزان مپنا پارس با تقویم هجری شمسی و زبان فارسی کار می‌کنند؛ در حالی که SAP به طور پیش‌فرض تاریخ‌ها را به میلادی ذخیره می‌کند.',
    contextEn: 'Shop engineers operate on Persian solar calendars, while SAP S/4HANA stores UTC Gregorian timestamps natively.',
    optionsConsidered: [
      { option: 'تبدیل هسته دیتابیس به تاریخ شمسی', pros: 'همخوانی ظاهری با کاربر', cons: 'تداخل شدید در ارتباط با وب‌سرویس‌های خارجی، کتابخانه‌ها و دیتابیس PostgreSQL' },
      { option: 'جداسازی صریح: کلیه تاریخ‌ها در پایگاه‌داده و هسته محاسباتی منحصراً UTC Gregorian ذخیره شده و صرفاً در لایه Presenter/UI با پشتیبانی از تعطیلات رسمی ایران به تقویم شمسی تبدیل می‌شوند', pros: 'معماری پاک، جلوگیری از باگ‌های محاسباتی زمان، تجربه کاربری بی‌نقص فارسی همراه با قابلیت تغییر به انگلیسی', cons: 'نیاز به ماژول تبدیل دقیق تاریخ' }
    ],
    decision: 'هسته محاسباتی ۱۰۰٪ بر مبنای تاریخ استاندارد ISO 8601 میلادی کار می‌کند؛ لایه رابط کاربری تبدیل دوطرفه خورشیدی/میلادی و تقویم شیفت‌های رسمی کارخانجات مپنا پارس را انجام می‌دهد.',
    decisionEn: 'Core engine exclusively operates on ISO 8601 UTC timestamps; presentation layer handles bidirectional Persian Solar / Gregorian rendering and Iranian official working calendars.',
    rationale: 'این تصمیم علاوه بر بی‌نقص ساختن کاربری مدیران ایرانی، استانداردهای بین‌المللی نرم‌افزارهای تجاری را حفظ می‌کند.',
    rationaleEn: 'Combines seamless domestic executive usability with rock-solid internal date arithmetic.',
    consequences: 'عدم ذخیره تاریخ رشته‌ای شمسی در جداول دیتابیس کاننیکال.',
    consequencesEn: 'Solar Persian dates are strictly forbidden in persistence layers.',
    rejectedAlternatives: 'نگهداری تاریخ شمسی در دیتابیس به دلیل فساد محاسبات تفاضل زمانی رد شد.',
    rejectedAlternativesEn: 'Native solar date persistence rejected.'
  }
];

export const PRE_MORTEM_RISKS: PreMortemRisk[] = [
  {
    id: 1,
    failureCause: 'کیفیت پایین یا ناقص بودن داده‌های ثبت‌شده در SAP (عدم انطباق مستندات با کارگاه)',
    failureCauseEn: 'Poor Data Quality & Incomplete Work Center Confirmation in SAP S/4HANA',
    probability: 'HIGH',
    impact: 'CRITICAL',
    earlyWarningSignal: 'بیش از ۱۵٪ عملیات فاقد زمان استاندارد ثبت‌شده یا مقادیر ثبت‌شده صفر در لاگ تاییدیه هستند.',
    earlyWarningSignalEn: '>15% operations missing standard routing runtimes or zero confirmation hours.',
    preventiveAction: 'اجرای خط لوله اعتبارسنجی کیفیت داده (Data Quality Gate) قبل از ورود به گراف و رد داده‌های دارای نقض اعتبارسنجی.',
    preventiveActionEn: 'Automated ingestion data quality filters halting ingestion of unverified routings.',
    contingencyPlan: 'استفاده از مقادیر پیش‌فرض کالیبره‌شده مهندسی مپنا پارس (Fallback Engineering Norms) با درج برچسب فرضیه (ASSUMPTION).',
    contingencyPlanEn: 'Fallback to historical engineering norm baseline with explicit ASSUMPTION tags.',
    owner: 'مدیر مهندسی صنایع و سیستم‌های مپنا پارس',
    ownerEn: 'Industrial Engineering Lead'
  },
  {
    id: 2,
    failureCause: 'مقاومت مدیران میانی و رؤسای کارگاه‌ها در پذیرش توصیه‌های سیستمی',
    failureCauseEn: 'Middle Management & Shop Superintendent Adoption Resistance',
    probability: 'HIGH',
    impact: 'HIGH',
    earlyWarningSignal: 'نادیده گرفتن بسته‌های تصمیم و اصرار بر تصمیم‌گیری شفاهی در جلسات بحران کارگاهی.',
    earlyWarningSignalEn: 'Decision packages left unreviewed during crisis coordination meetings.',
    preventiveAction: 'مشارکت رؤسای کارخانجات در تدوین گیت‌های امکان‌سنجی سخت و نشان دادن منافع رهایی آنها از اضافه‌کاری‌های فرساینده.',
    preventiveActionEn: 'Engage plant superintendents in defining feasibility gates and highlighting overtime fatigue relief.',
    contingencyPlan: 'دستور مدیرعامل مبنی بر الصاق تحلیل Mission Control به هرگونه مصوبه برون‌سپاری یا بازتخصیص.',
    contingencyPlanEn: 'Executive decree requiring Mission Control analysis attachment for any subcontracting sign-off.',
    owner: 'مدیرعامل مپنا پارس',
    ownerEn: 'Managing Director & CEO'
  },
  {
    id: 3,
    failureCause: 'توهم عددی مدل زبانی و تولید پیش‌بینی‌های اشتباه مالی یا فنی',
    failureCauseEn: 'LLM Numerical Hallucination in Cost or Schedule Projection',
    probability: 'MEDIUM',
    impact: 'CRITICAL',
    earlyWarningSignal: 'مغایرت ارقام متن گزارش هوش مصنوعی با جدول خروجی موتور محاسباتی در بازرسی تصادفی.',
    earlyWarningSignalEn: 'Discrepancy detected between narrative text figures and deterministic solver outputs.',
    preventiveAction: 'قطع مطلق ارتباط LLM با محاسبات؛ اعداد فقط از متغیرهای از پیش‌محاسبه‌شده موتور استخراج و جایگذاری شوند.',
    preventiveActionEn: 'Strict architecture enforcement: LLM never calculates, strictly receives verified JSON context.',
    contingencyPlan: 'غیرفعال‌سازی آنی لایه زبانی و سوئیچ به قالب‌های متنی ثابت حسابرسی‌شده (Deterministic Template Engine).',
    contingencyPlanEn: 'Instant fallback to pre-compiled deterministic text templates.',
    owner: 'معمار ارشد نرم‌افزار',
    ownerEn: 'Lead Software Architect'
  },
  {
    id: 4,
    failureCause: 'تاخیر در برقراری ارتباط وب‌سرویس با SAP یا مسدود شدن شبکه کارخانه',
    failureCauseEn: 'SAP S/4HANA CDS Extraction Latency or Network Port Blockades',
    probability: 'MEDIUM',
    impact: 'HIGH',
    earlyWarningSignal: 'زمان پاسخگویی OData بیش از ۵ ثانیه یا قطع شدن ارتباط فنی در ساعات شلوغ کارگاه.',
    earlyWarningSignalEn: 'OData response latency exceeding 5 seconds or connection timeouts during peak shifts.',
    preventiveAction: 'طراحی خط لوله با کش پایدار در لایه Staging و استخراج ناهمگام در فواصل زمانی نیم‌ساعته.',
    preventiveActionEn: 'Asynchronous staging ingest pipeline with Redis/PostgreSQL read-model buffering.',
    contingencyPlan: 'فعال‌سازی حالت آفلاین (Degraded Mode) با استفاده از آخرین داده‌های موفق کش‌شده.',
    contingencyPlanEn: 'Seamless degraded mode operation on last known consistent snapshot.',
    owner: 'مدیر فناوری اطلاعات (IT) مپنا پارس',
    ownerEn: 'IT Infrastructure Director'
  },
  {
    id: 5,
    failureCause: 'خطای مدلسازی هزینه فرصت و عدم کشف تداخل یک مایل‌استون حیاتی در پروژه‌ای دیگر',
    failureCauseEn: 'Opportunity Cost Modeling Flaw Missing Hidden Multi-Project Collision',
    probability: 'LOW',
    impact: 'CRITICAL',
    earlyWarningSignal: 'اعتراض مدیر پروژه سد کارون به غافلگیری در زمان‌بندی شفت هیدروژنراتور.',
    earlyWarningSignalEn: 'Project manager alerts of unexpected clash after resource reallocation.',
    preventiveAction: 'تست جامع اعتبارسنجی گراف (Cycle & Dependency Check) و آزمون بر روی سناریوهای مصنوعی چندپروژه‌ای.',
    preventiveActionEn: 'Graph edge validation and mandatory cross-project conflict verification before score publish.',
    contingencyPlan: 'اعمال فوری گیت وتوی تعهدات (Commitment Veto) توسط عامل مدیر سبد پروژه‌ها در شورا.',
    contingencyPlanEn: 'Trigger emergency commitment veto by Portfolio Governance Agent.',
    owner: 'مدیر برنامه‌ریزی و کنترل پروژه مپنا پارس',
    ownerEn: 'PMO & Project Controls Lead'
  },
  {
    id: 6,
    failureCause: 'تحریم‌های جدید یا جهش ناگهانی ۵۰ درصدی نرخ ارز آزاد و شوک به هزینه‌های قطعات یدکی',
    failureCauseEn: 'Extreme FX Shock (+50%) or Sanctions Escalation Impacting Spare Parts',
    probability: 'HIGH',
    impact: 'HIGH',
    earlyWarningSignal: 'نوسان بیش از ۱۰٪ در بازار ارز ظرف یک هفته یا توقف صدور حواله ارزی بانک مرکزی.',
    earlyWarningSignalEn: '>10% weekly currency devaluation or foreign exchange allocation halts.',
    preventiveAction: 'تعبیه پارامتر حساسیت نرخ ارز (FX Multiplier) در مدل ارزش خالص و ارزیابی سناریوهای تنش.',
    preventiveActionEn: 'Dynamic FX multiplier parameters embedded in economic alternative models.',
    contingencyPlan: 'تغییر اولویت استراتژیک به حالت «بحران نقدینگی» و ارجحیت تعمیر داخلی با قطعات ساخت داخل.',
    contingencyPlanEn: 'Automatic shift to Cash Crisis profile prioritizing domestic overhaul workarounds.',
    owner: 'معاونت مالی و اقتصادی مپنا پارس',
    ownerEn: 'Chief Financial Officer'
  },
  {
    id: 7,
    failureCause: 'توقف ترانزیت محموله ۸۰ تنی به دلیل عدم هماهنگی با پلیس راهور و راهداری',
    failureCauseEn: 'Heavy Logistics Transport Bottleneck (80-Ton Workpiece Road Escort Delay)',
    probability: 'MEDIUM',
    impact: 'HIGH',
    earlyWarningSignal: 'تاخیر در صدور بارنامه ترافیکی یا شرایط نامساعد جوی در گردنه‌های کوهستانی البرز.',
    earlyWarningSignalEn: 'Highway traffic permit delays or severe weather transit advisories.',
    preventiveAction: 'لحاظ بافر زمانی واقع‌بینانه ۵ روزه رفت و برگشت به اراک و الزام به استعلام رزرو بوژی قبل از صدور حکم.',
    preventiveActionEn: '5-day conservative transit buffer hardcoded with mandatory prior road escort booking gate.',
    contingencyPlan: 'تغییر مسیر به نزدیک‌ترین پیمانکار دارای دستگاه مورد تایید در استان البرز یا تسریع تعمیر داخلی.',
    contingencyPlanEn: 'Rerouting workpiece to secondary qualified machining shop in Alborz province.',
    owner: 'مدیر زنجیره تامین و لجستیک مپنا پارس',
    ownerEn: 'Supply Chain & Heavy Logistics Director'
  },
  {
    id: 8,
    failureCause: 'انحراف ابعادی در کارخانه پیمانکار و رد قطعه در کنترل کیفیت نهایی',
    failureCauseEn: 'Contractor Machining Tolerance Failure Exceeding 0.015mm Precision',
    probability: 'LOW',
    impact: 'CRITICAL',
    earlyWarningSignal: 'گزارش ناظر مقیم از لرزش اسپیندل یا دمای بالای محیط ماشین‌کاری پیمانکار.',
    earlyWarningSignalEn: 'Resident QA alerts of machine thermal drift or vibration during roughing passes.',
    preventiveAction: 'اجباری کردن حضور ناظر مقیم مپنا با دستگاه لیزرتراکر و ثبت تاییدیه قبل از عملیات پرداخت نهایی.',
    preventiveActionEn: 'Mandatory resident inspector deployment with calibrated laser tracker equipment.',
    contingencyPlan: 'استفاده از بیمه تمام‌خطر پیمانکاری و اعزام تیم بازسازی تخصصی فرآیند مپنا برای اصلاح نشیمنگاه.',
    contingencyPlanEn: 'Contractor All-Risk insurance activation and in-situ corrective micro-machining.',
    owner: 'مدیر تضمین کیفیت و مهندسی ساخت',
    ownerEn: 'Quality Assurance & Process Engineering Lead'
  },
  {
    id: 9,
    failureCause: 'قطعی برق تابستان و توقف خطوط ماشین‌کاری سنگین در ساعات اوج بار',
    failureCauseEn: 'Summer Grid Energy Disruptions Halting Heavy Machine Centers',
    probability: 'HIGH',
    impact: 'HIGH',
    earlyWarningSignal: 'ابلاغ برنامه دیسپاچینگ وزارت نیرو برای مدیریت مصرف کارخانجات صنعتی.',
    earlyWarningSignalEn: 'National electricity grid dispatching advisory mandating industrial load curtailment.',
    preventiveAction: 'مدل‌سازی ساعات محدودیت انرژی در تقویم کاری ماشین پاما و والدریش در ماه‌های تیر و مرداد.',
    preventiveActionEn: 'Energy restriction hours baked into summer shift calendars for high-draw work centers.',
    contingencyPlan: 'برنامه‌ریزی شیفت‌های شبانه (۲۳:۰۰ الی ۰۷:۰۰) و به‌کارگیری دیزل‌ژنراتورهای اضطراری کارخانه.',
    contingencyPlanEn: 'Rescheduling heavy machining to graveyard shifts (23:00-07:00) with auxiliary generation.',
    owner: 'معاونت بهره‌برداری و تولید مپنا پارس',
    ownerEn: 'Chief Operating Officer'
  },
  {
    id: 10,
    failureCause: 'ناتوانی در اثبات بازگشت سرمایه (ROI) سامانه در جلسات هیئت‌مدیره گروه مپنا',
    failureCauseEn: 'Failure to Empirically Prove Measurable Business Value & ROI to Group Board',
    probability: 'LOW',
    impact: 'HIGH',
    earlyWarningSignal: 'پرسش اعضای هیئت‌مدیره درباره اینکه سیستم عملاً چقدر ریال برای مپنا صرفه‌جویی کرده است.',
    earlyWarningSignalEn: 'Board inquiries regarding concrete realized financial savings vs implementation costs.',
    preventiveAction: 'تعبیه داشبورد ملموس صرفه‌جویی تجمعی (Cost Avoidance & Penalty Reduction) با ارقام حسابرسی‌شده.',
    preventiveActionEn: 'Dedicated realized cost avoidance metric tracking net penalty and financing savings per decision.',
    contingencyPlan: 'ارائه گزارش مستند مقایسه ضرر سناریوی عدم اقدام (۹.۹ میلیارد ریال) با هزینه گزینه مصوب (۳.۴ میلیارد ریال).',
    contingencyPlanEn: 'Audit dossier contrasting 9.9B inaction penalty against 3.4B optimized execution.',
    owner: 'مدیر محصول Mission Control',
    ownerEn: 'Product Owner'
  },
  {
    id: 11,
    failureCause: 'خطای شناختی مدیران و تلقی سیستم به عنوان یک داشبورد ساده BI نه اتاق فرماندهی تصمیم',
    failureCauseEn: 'System Misperceived as Passive BI Dashboard Rather than Decision Mission Control',
    probability: 'MEDIUM',
    impact: 'MEDIUM',
    earlyWarningSignal: 'کاربران صرفاً به نمودارها نگاه کنند بدون آنکه دکمه‌های شبیه‌سازی یا بسته تصمیم را استفاده نمایند.',
    earlyWarningSignalEn: 'Users passively viewing graphs without triggering simulations or evaluating packages.',
    preventiveAction: 'طراحی گردش‌کار حول محور چرخه Action-Oriented (مشاهده شوک، تحلیل گزینه‌ها، تصویب مشروط، ثبت در SAP).',
    preventiveActionEn: 'Strict action-oriented UX centering around Shock → Alternatives → Verdict → Sync.',
    contingencyPlan: 'برگزاری کارگاه عملیاتی هدایت‌شده با سناریوی طلایی خرابی پاما برای مدیران ارشد.',
    contingencyPlanEn: 'Executive crisis simulation workshop using real historical incidents.',
    owner: 'طراح ارشد تجربه کاربری (Lead UX Designer)',
    ownerEn: 'Lead UX Designer'
  },
  {
    id: 12,
    failureCause: 'پیچیدگی بیش از حد معماری نرم‌افزار و دشواری نگهداری توسط تیم بومی کارخانه',
    failureCauseEn: 'Architectural Overengineering Causing Local Maintenance Paralysis',
    probability: 'MEDIUM',
    impact: 'HIGH',
    earlyWarningSignal: 'وابستگی تمام تغییرات به برنامه‌نویس اصلی و عدم توانایی سایر مهندسان در دیباگ سیستم.',
    earlyWarningSignalEn: 'Single-point-of-failure reliance on external consultants for system bugs.',
    preventiveAction: 'انتخاب ساختار Modular Monolith، حذف فریم‌ورک‌های اضافه و کامنت‌گذاری کامل کدهای شبیه‌سازی.',
    preventiveActionEn: 'Modular monolith selection with zero esoteric dependencies and pristine code documentation.',
    contingencyPlan: 'برگزاری دوره آموزشی کدنویسی و نگهداری برای تیم توسعه داخلی انفورماتیک مپنا پارس.',
    contingencyPlanEn: 'Knowledge transfer bootcamp for internal MAPNA software maintenance engineers.',
    owner: 'معمار سیستم',
    ownerEn: 'Enterprise System Architect'
  },
  {
    id: 13,
    failureCause: 'نقض امنیت داده‌ها و دسترسی افراد غیرمجاز به ارقام جرایم و حاشیه سود پروژه‌ها',
    failureCauseEn: 'Data Breach Leaking Confidential Contractual Penalties & Project Margins',
    probability: 'LOW',
    impact: 'CRITICAL',
    earlyWarningSignal: 'مشاهده درخواست‌های فاقد توکن یا لاگین‌های ناموفق مکرر از IPهای مشکوک شبکه داخلی.',
    earlyWarningSignalEn: 'Repeated unauthorized access attempts logged against financial endpoints.',
    preventiveAction: 'اجرای کنترل سفت و سخت دسترسی در سطح اندپوینت، رمزنگاری پایگاه‌داده در حالت سکون و لاگ ممیزی کامل.',
    preventiveActionEn: 'Strict RBAC enforcement with field-level redaction and encrypted audit trails.',
    contingencyPlan: 'تعلیق آنی نشست‌های فعال، چرخش کلیدهای امنیتی و اطلاع‌رسانی به حراست فناوری اطلاعات مپنا.',
    contingencyPlanEn: 'Immediate session revocation, secret rotation, and enterprise security escalation.',
    owner: 'افسر امنیت سایبری مپنا',
    ownerEn: 'Cybersecurity Officer'
  },
  {
    id: 14,
    failureCause: 'فرسودگی شغلی و مقاومت اپراتورهای ماشین در برابر ثبت دقیق لاگ توقفات کارگاهی',
    failureCauseEn: 'Shop Floor Operator Fatigue & Inaccurate Downtime Reporting',
    probability: 'HIGH',
    impact: 'MEDIUM',
    earlyWarningSignal: 'ثبت علت کلی «توقف فنی» برای تمام خرابی‌ها بدون ذکر دقیق پمپ هیدرولیک یا بلبرینگ اسپیندل.',
    earlyWarningSignalEn: 'Generic downtime reasons recorded without component-level granularity.',
    preventiveAction: 'ساده‌سازی فرم‌های ثبت توقف به کمتر از ۳ کلیک در تبلت‌های صنعتی کارگاه و اتصال به حسگرهای ارتعاش‌سنج.',
    preventiveActionEn: 'Ultra-simplified 3-click shop tablet forms augmented with machine IoT vibration alarms.',
    contingencyPlan: 'بازرسی روزانه سرپرست سالن ماشین‌کاری سنگین و ثبت لاگ کالیبره‌شده توسط تکنسین شیفت.',
    contingencyPlanEn: 'Daily supervisor audit and verified technical shift logs.',
    owner: 'مدیر تولید مپنا پارس',
    ownerEn: 'Plant Production Director'
  },
  {
    id: 15,
    failureCause: 'ناهماهنگی میان تیم بازرگانی و کارگاه در ترخیص بهنگام بیرینگ‌های یدکی وارداتی',
    failureCauseEn: 'Procurement Sourcing Bottleneck for Critical Replacement Bearings',
    probability: 'HIGH',
    impact: 'HIGH',
    earlyWarningSignal: 'سپری شدن بیش از ۴۵ روز از ثبت سفارش خرید خارجی (PR) بدون تخصیص کد کوتاژ گمرکی.',
    earlyWarningSignalEn: '>45 days on foreign spare purchase requisition without customs clearance number.',
    preventiveAction: 'لحاظ کردن زمان واقعی تامین قطعات یدکی در گیت امکان‌سنجی گزینه تعمیر داخلی.',
    preventiveActionEn: 'Empirical procurement lead-times embedded into the In-House Repair feasibility gate.',
    contingencyPlan: 'استفاده از شبکه انبارهای هلدینگ مپنا و استقراض قطعه از انبار مپنا بویلر یا توگا.',
    contingencyPlanEn: 'Inter-company spare part borrowing across MAPNA Group subsidiaries (TUGA / Boiler).',
    owner: 'معاونت بازرگانی و تدارکات مپنا پارس',
    ownerEn: 'Head of Procurement & Commercial Affairs'
  },
  {
    id: 16,
    failureCause: 'فراموشی ثبت اقدامات اصلاحی در حافظه سازمانی پس از رفع بحران',
    failureCauseEn: 'Failure to Complete Closed-Loop Learning Records Post-Crisis Resolution',
    probability: 'MEDIUM',
    impact: 'MEDIUM',
    earlyWarningSignal: 'ثبت نشدن مقادیر واقعی تاخیر و هزینه پس از گذشت یک ماه از اتمام پروژه جهرم.',
    earlyWarningSignalEn: 'Unpopulated actual delay and cost fields 30 days after project delivery.',
    preventiveAction: 'ارسال هشدار خودکار سیستمی به مسئول تضمین کیفیت برای ثبت گزارش انحرافات پیش از بستن پرونده.',
    preventiveActionEn: 'Automated workflow notification prompting project controller to close learning dossier.',
    contingencyPlan: 'برگزاری جلسه ارزیابی نهایی (Post-Mortem Review) پیش از آزادسازی صورت‌وضعیت نهایی.',
    contingencyPlanEn: 'Mandatory post-mortem sign-off required prior to project commercial close-out.',
    owner: 'کارشناس ارشد حاکمیت داده و حافظه سازمانی',
    ownerEn: 'Data Governance Lead'
  },
  {
    id: 17,
    failureCause: 'تغییر ناگهانی اولویت‌های کلان سهامداران (توانیر و مپنا) و لغو قراردادها',
    failureCauseEn: 'Sudden Strategic Priority Shift by State Utility (TPPH / Tavanir)',
    probability: 'LOW',
    impact: 'CRITICAL',
    earlyWarningSignal: 'نامه رسمی وزارت نیرو مبنی بر اولویت دادن به یک پروژه نیروگاهی دیگر در جنوب کشور.',
    earlyWarningSignalEn: 'Official ministry directive shifting immediate grid commissioning priorities.',
    preventiveAction: 'انعطاف‌پذیری موتور در بارگذاری مجدد وزن‌های استراتژیک در کمتر از ۱ دقیقه.',
    preventiveActionEn: 'Dynamic strategic profile weights switchable in real-time via executive settings.',
    contingencyPlan: 'تغییر مشخصات بسته تصمیم به پروفایل متناسب با دستور حاکمیتی جدید.',
    contingencyPlanEn: 'Instant regeneration of decision packages under new national priority constraints.',
    owner: 'معاونت بازاریابی و امور مشتریان مپنا پارس',
    ownerEn: 'Commercial & Customer Relations VP'
  },
  {
    id: 18,
    failureCause: 'سردرگمی تیم نرم‌افزاری در خصوص تعاریف و منطق فرمول‌های مالی و زمانی',
    failureCauseEn: 'Developer Confusion on Complex Multi-Echelon Propagation Logic',
    probability: 'MEDIUM',
    impact: 'HIGH',
    earlyWarningSignal: 'سوالات مکرر توسعه‌دهندگان درباره نحوه محاسبه هزینه فرصت یا انتشار وابستگی‌ها.',
    earlyWarningSignalEn: 'Frequent developer ambiguities raised regarding opportunity cost formulas.',
    preventiveAction: 'ارائه شبه‌کد دقیق، فرمول‌های ریاضی کاملاً تصریح‌شده و سند ۶۰ فصلی بدون ابهام.',
    preventiveActionEn: 'Pristine 60-chapter specification with explicit pseudo-code and zero ambiguity directives.',
    contingencyPlan: 'استفاده از سورس‌کدهای مرجع این پیاده‌سازی به عنوان الگوی استاندارد پیاده‌سازی.',
    contingencyPlanEn: 'Referencing validated production codebases as canonical reference implementation.',
    owner: 'رهبر فنی پروژه (Technical Lead)',
    ownerEn: 'Technical Lead'
  },
  {
    id: 19,
    failureCause: 'عدم تطابق ساعت و تاریخ در سرورهای محلی کارخانه با سرور دیتابیس',
    failureCauseEn: 'NTP Time Drift Between Shop Floor Terminals and Canonical Database',
    probability: 'LOW',
    impact: 'MEDIUM',
    earlyWarningSignal: 'ثبت وقایع با ساعت‌های متناقض یا تاخیر منفی در رویدادهای شبیه‌سازی.',
    earlyWarningSignalEn: 'Negative timestamps or out-of-sequence confirmation logs.',
    preventiveAction: 'تنظیم سرویس هماهنگ‌سازی زمانی NTP روی سرورهای محلی کارخانه.',
    preventiveActionEn: 'Enforced enterprise Network Time Protocol (NTP) synchronization.',
    contingencyPlan: 'اعتبارسنجی تقدم زمانی داده‌ها در خط لوله ورودی و تصحیح خودکار انحرافات جزئی.',
    contingencyPlanEn: 'Input pipeline validation enforcing chronological sequence integrity.',
    owner: 'مدیر زیرساخت شبکه IT مپنا',
    ownerEn: 'Network Infrastructure Lead'
  },
  {
    id: 20,
    failureCause: 'از دست رفتن داده‌های کلیدی شبیه‌سازی به دلیل خرابی دیسک یا باج‌افزار در شبکه صنعتی',
    failureCauseEn: 'Storage Failure or Industrial Ransomware Incident',
    probability: 'LOW',
    impact: 'CRITICAL',
    earlyWarningSignal: 'هشدارهای RAID دیسک یا کندی نامعمول در خواندن جداول دیتابیس.',
    earlyWarningSignalEn: 'Storage controller alerts or unusual I/O read latencies.',
    preventiveAction: 'پشتیبان‌گیری ایزوله آفلاین روی استوریج‌های غیرقابل بازنویسی (WORM Storage).',
    preventiveActionEn: 'Air-gapped immutable backups on isolated enterprise NAS appliances.',
    contingencyPlan: 'بازیابی فوری سیستم از آخرین ایمیج در سرور پشتیبان ظرف حداکثر ۲ ساعت مطابق با RTO.',
    contingencyPlanEn: 'Immediate container restoration on hot standby node within 2-hour RTO envelope.',
    owner: 'مدیر بحران و پدافند غیرعامل مپنا پارس',
    ownerEn: 'Disaster Recovery & Industrial Defense Officer'
  }
];

export const FIRST_20_DEVELOPER_TASKS: DeveloperTask[] = [
  {
    id: 'TASK-01',
    task: 'راه‌اندازی ساختار دیتابیس PostgreSQL و اعمال اسکریپت کاننیکال DDL',
    taskEn: 'Provision PostgreSQL Database & Deploy Canonical DDL Schema',
    component: 'Database Layer',
    description: 'ایجاد دیتابیس mission_control، نصب اکستنشن‌های pgcrypto و اجرای اسکریپت جداول پایه، تعهدات، پروژه‌ها، سفارش‌ها و رکوردهای حسابرسی.',
    descriptionEn: 'Create mission_control database, apply extensions, execute canonical schema creating resources, orders, commitments, and audit tables.',
    input: 'فایل اسکریپت migration V1__canonical_schema.sql',
    output: 'پایگاه داده عملیاتی آماده با ۲۴ جدول و کلیدهای خارجی اعتبارسنجی‌شده',
    dependencies: ['PostgreSQL 16 Engine Instance'],
    acceptanceCriteria: 'اجرای بدون خطای اسکریپت و عبور موفق از تست درج رکورد آزمایشی در جداول mc_resources و mc_commitments.',
    acceptanceCriteriaEn: 'Zero DDL errors; successful CRUD integration test on core resource and commitment entities.',
    priority: 'P0'
  },
  {
    id: 'TASK-02',
    task: 'پیاده‌سازی لایه دسترسی به داده (Repository Layer) برای منابع و عملیات',
    taskEn: 'Implement Repository Layer for Resources & Operations',
    component: 'Domain Data Layer',
    description: 'ایجاد کدهای دسترسی به پایگاه‌داده (ResourceRepository, OperationRepository) با استفاده از کوئری‌های تایپ‌سیف و متدهای بارگذاری گراف.',
    descriptionEn: 'Develop type-safe repositories for resources and production operations with connection pooling.',
    input: 'موجودیت‌های تایپ‌اسکریپت در src/types/index.ts',
    output: 'ماژول‌های ریپازیتوری با پشتیبانی از کش درون حافظه‌ای',
    dependencies: ['TASK-01'],
    acceptanceCriteria: 'زمان اجرای کوئری بارگذاری تمامی منابع گلوگاهی کارخانه کمتر از ۱۰ میلی‌ثانیه باشد.',
    acceptanceCriteriaEn: 'Query retrieval latency for all plant bottleneck work centers strictly under 10ms.',
    priority: 'P0'
  },
  {
    id: 'TASK-03',
    task: 'پیاده‌سازی ماژول ساخت گراف وابستگی‌های سازمانی در حافظه (In-Memory Graph Builder)',
    taskEn: 'Build In-Memory Enterprise Dependency Graph Constructor',
    component: 'Graph Engine',
    description: 'کدگذاری الگوریتم ساخت گراف: تبدیل منابع، عملیات، سفارش‌ها، پروژه‌ها، مایل‌استون‌ها و تعهدات به گره‌ها و اتصال آنها با یال‌های ۱۴گانه.',
    descriptionEn: 'Implement graph builder hydrating nodes and directional edges (REQUIRES, PRECEDES, ALLOCATED_TO, COMMITTED_TO) into memory.',
    input: 'داده‌های استخراج‌شده از جداول کاننیکال',
    output: 'کلاس EnterpriseGraph با متدهای getSuccessors, getAffectedCommitments و detectCycles',
    dependencies: ['TASK-02'],
    acceptanceCriteria: 'پیمایش کامل مسیر بحرانی از ماشین پاما تا تعهد تحویل پروژه جهرم در کمتر از ۵ میلی‌ثانیه.',
    acceptanceCriteriaEn: 'Sub-5ms complete traversal from PAMA work center to Jahrom CCPP commitment node.',
    priority: 'P0'
  },
  {
    id: 'TASK-04',
    task: 'پیاده‌سازی موتور اعتبارسنجی سلامت گراف (Graph Consistency & Cycle Detector)',
    taskEn: 'Implement Graph Consistency & Cycle Detection Engine',
    component: 'Graph Engine',
    description: 'توسعه متدهای کشف وابستگی‌های دایره‌ای نامعتبر، گره‌های بدون والد (Orphan Nodes) و سفارش‌های فاقد منبع تخصیص‌یافته.',
    descriptionEn: 'Code DFS algorithms to detect invalid circular dependencies and disconnected orphan nodes.',
    input: 'نمونه گراف ایجادشده در حافظه',
    output: 'گزارش خطاهای ساختاری گراف در قالب شیء GraphHealthReport',
    dependencies: ['TASK-03'],
    acceptanceCriteria: 'کشف قطعی حلقه‌های تستی ایجادشده در یونیت‌تست بدون کرش کردن سرور.',
    acceptanceCriteriaEn: '100% deterministic detection of injected synthetic circular dependency loops.',
    priority: 'P1'
  },
  {
    id: 'TASK-05',
    task: 'توسعه الگوریتم ۱۵ مرحله‌ای شبیه‌سازی انتشار اثرات (Impact Propagation Engine)',
    taskEn: 'Develop 15-Step Deterministic Impact Propagation Engine',
    component: 'Simulation Engine',
    description: 'پیاده‌سازی منطق ریاضی گام‌به‌گام انتشار شوک از منبع آسیب‌دیده به عملیات، مایل‌استون‌های صورت‌وضعیت و جریمه‌های قراردادی.',
    descriptionEn: 'Code deterministic step-by-step impact propagation calculating schedule shifts, penalty burns, and cash milestone freezes.',
    input: 'شیء DisruptionInput و گراف وابستگی‌ها',
    output: 'خروجی یکپارچه ImpactSummary شامل تاخیر کل، مبالغ جریمه و ضررهای مالی ناشی از توقف',
    dependencies: ['TASK-03'],
    acceptanceCriteria: 'تطابق کامل خروجی با سناریوی طلایی خرابی ۲۰ روزه پاما: تاخیر ۲۲ روز، جریمه ۹.۹ میلیارد ریال و تعلیق ۴۲ میلیارد ریال صورت‌وضعیت.',
    acceptanceCriteriaEn: '100% mathematical match with golden scenario baseline: +22 days, 9.9B IRR penalty, 42B IRR cash freeze.',
    priority: 'P0'
  },
  {
    id: 'TASK-06',
    task: 'پیاده‌سازی گیت‌های امکان‌سنجی سخت (Hard Feasibility Gates Engine)',
    taskEn: 'Implement Hard Feasibility Gates Engine',
    component: 'Decision Engine',
    description: 'توسعه ۵ گیت سخت: ۱. تلرانس کیفی (≤ 0.015mm)، ۲. تناژ باربرداری جرثقیل، ۳. ظرفیت ماشین جایگزین، ۴. شروط قراردادی، ۵. ظرفیت نیروی انسانی.',
    descriptionEn: 'Code 5 hard feasibility gates disallowing options violating machining tolerances, crane capacities, or contracts.',
    input: 'گزینه‌های اقدام پیشنهادی و مشخصات فنی منابع',
    output: 'ماتریس اعتبارسنجی گیت‌ها با وضعیت Boolean و دلیل صریح رد شدن گزینه',
    dependencies: ['TASK-05'],
    acceptanceCriteria: 'رد خودکار هر گزینه با خطای ابعادی بیش از ۰.۰۱۵ میلی‌متر و برچسب‌گذاری به عنوان DISQUALIFIED.',
    acceptanceCriteriaEn: 'Instant automated disqualification of any option exceeding 0.015mm tolerance.',
    priority: 'P0'
  },
  {
    id: 'TASK-07',
    task: 'توسعه ماژول تولید خودکار و بازتولید گزینه‌های اقدام (Alternative Generator)',
    taskEn: 'Develop Reproducible Alternative Option Generator',
    component: 'Simulation Engine',
    description: 'تولید سیستماتیک گزینه‌های: تعمیر داخلی عادی، تعمیر تسریع‌شده، برون‌سپاری به ماشین شوکودا اراک و بازتخصیص به ماشین والدریش.',
    descriptionEn: 'Systematic generation of repair, expedited overhaul, outsource, and internal reallocation alternatives.',
    input: 'خلاصه اثرات اختلال و لیست منابع سازگار',
    output: 'آرایه‌ای از گزینه‌های AlternativeOption با هزینه‌ها، تاخیرها و اعتبارسنجی گیت‌ها',
    dependencies: ['TASK-06'],
    acceptanceCriteria: 'تولید حداقل ۴ گزینه استاندارد برای هر سناریوی اختلال منبع گلوگاهی.',
    acceptanceCriteriaEn: 'Minimum of 4 distinct alternatives synthesized per critical resource outage event.',
    priority: 'P0'
  },
  {
    id: 'TASK-08',
    task: 'پیاده‌سازی فرمول محاسبه هزینه فرصت و پدیده قربانی‌سازی (Opportunity Cost Calculator)',
    taskEn: 'Implement Enterprise Opportunity Cost & Cannibalization Calculator',
    component: 'Financial Simulation',
    description: 'محاسبه خسارات وارده به پروژه‌های ثانویه در صورت دزدیدن ظرفیت ماشین‌های مشترک (نظیر آسیب به شفت هیدروژنراتور کارون در صورت اشغال والدریش).',
    descriptionEn: 'Calculate secondary project delay and penalty costs inflicted by capacity stealing on shared bottleneck assets.',
    input: 'گزینه بازتخصیص و لیست پروژه‌های مشترک روی منبع مقصد',
    output: 'مقدار ریالی دقیق enterpriseOpportunityCostIRR و netEnterpriseValueCreatedIRR',
    dependencies: ['TASK-07'],
    acceptanceCriteria: 'محاسبه دقیق ۳.۱۵ میلیارد ریال هزینه فرصت برای گزینه بازتخصیص به والدریش و منفی شدن ارزش خالص آن.',
    acceptanceCriteriaEn: 'Exact calculation of 3.15B IRR opportunity cost on Waldrich reallocation yielding negative net value.',
    priority: 'P0'
  },
  {
    id: 'TASK-09',
    task: 'پیاده‌سازی تابع هدف چندمعیاره و پروفایل‌های وزنی استراتژیک',
    taskEn: 'Code Multi-Objective Scoring & Strategic Priority Profiles',
    component: 'Optimization Engine',
    description: 'برنامه‌نویسی فرمول نرمال‌سازی شاخص‌های تاخیر، هزینه، سود، ریسک و تعهد و ضرب در ماتریس اوزان پروفایل‌های ۴گانه.',
    descriptionEn: 'Program Min-Max score normalization and weight matrix application across Balanced, Cash Crisis, and Delivery Crisis profiles.',
    input: 'گزینه‌های تاییدشده در مرحله اول و نوع پروفایل انتخابی کاربر',
    output: 'امتیاز مرکب نهایی (Composite Score) بین ۰ تا ۱۰۰ و تعیین رتبه یکتای هر گزینه',
    dependencies: ['TASK-08'],
    acceptanceCriteria: 'انتخاب گزینه برون‌سپاری با امتیاز ۹۴ در حالت Balanced و تغییر دینامیک امتیازات در تغییر پروفایل.',
    acceptanceCriteriaEn: 'Outsourcing scores 94/100 under Balanced profile; scores recalibrate dynamically on profile change.',
    priority: 'P1'
  },
  {
    id: 'TASK-10',
    task: 'پیاده‌سازی شورای مجازی عامل‌محور با ۸ نقش اجرایی مپنا پارس',
    taskEn: 'Build 8-Executive Agent Virtual Council Engine',
    component: 'Council Engine',
    description: 'توسعه موتور تصمیم‌گیری شورا شامل نقش‌های مدیرعامل، معاونت مالی، مهندسی، تولید، منابع انسانی، بازرگانی، داده و تعهدات با منطق عامل‌محور.',
    descriptionEn: 'Construct executive agent deliberation logic for CEO, CFO, Engineering, Production, HR, Supply Chain, CDO, and Commitment Manager.',
    input: 'گزینه برگزیده، خلاصه اثرات و پارامترهای هزینه فرصت',
    output: 'آرایه نظرات شورا با وضعیت رای، استدلال، پرسش کلیدی و کارت هوش تصمیم مدیرعامل',
    dependencies: ['TASK-09'],
    acceptanceCriteria: 'تولید رای CONDITIONAL GO برای مدیرعامل و اعتراض صریح مدیر تعهدات به گزینه بازتخصیص والدریش.',
    acceptanceCriteriaEn: 'CEO delivers CONDITIONAL GO; Commitment Manager explicitly objects to Waldrich reallocation.',
    priority: 'P0'
  },
  {
    id: 'TASK-11',
    task: 'پیاده‌سازی لایه چالشگر بی‌طرف (Devil’s Advocate Agent)',
    taskEn: 'Implement Devil’s Advocate Critical Reasoning Agent',
    component: 'AI Reasoning Layer',
    description: 'طراحی پرامپت مهندسی‌شده و کدهای اعتبارسنجی برای افشای فرضیات شکننده گزینه برتر (نظیر آسیب به کیفیت یا تاخیر پلیس راهور).',
    descriptionEn: 'Construct structured prompt and heuristic pipeline identifying vulnerable assumptions in top-ranked alternatives.',
    input: 'بسته تصمیم تولیدشده و متغیرهای نامعلوم کلیدی',
    output: 'بخش چالش‌های حیاتی و نقاط شکست شکننده در بسته تصمیم',
    dependencies: ['TASK-10'],
    acceptanceCriteria: 'طرح حداقل ۳ سوال بحرانی درباره ریسک‌های پنهان گزینه برتر بدون استفاده از عبارات مبهم.',
    acceptanceCriteriaEn: 'Synthesis of 3 concrete vulnerability stress-tests addressing transport and QA risks.',
    priority: 'P1'
  },
  {
    id: 'TASK-12',
    task: 'پیاده‌سازی مدل تبارشناسی مالی و تولید رشته Provenance فرمول‌ها',
    taskEn: 'Code Financial Calculation Lineage & Provenance Formatter',
    component: 'Financial Provenance',
    description: 'فرموله‌سازی رشته ریاضی محاسبه ارزش خالص اقتصادی برای شفافیت کامل نزد بازرسان مالی.',
    descriptionEn: 'Develop equation builder tracing net value derivation across penalties, direct costs, and opportunity costs.',
    input: 'ماتریس هزینه‌ها و جرایم گزینه برگزیده',
    output: 'رشته متنی فرمول تبارشناسی نظیر Net Value = (Penalties Avoided) - (Direct Cost) - (Opportunity Cost)',
    dependencies: ['TASK-08'],
    acceptanceCriteria: 'نمایش شفاف تبارشناسی فرمول در بسته تصمیم مدیرعامل با انطباق عددی ۱۰۰٪.',
    acceptanceCriteriaEn: 'Lineage equation matches final reported net financial delta down to exact decimal precision.',
    priority: 'P1'
  },
  {
    id: 'TASK-13',
    task: 'توسعه وب‌سرویس‌های REST API برای سناریو، اختلال و شبیه‌سازی',
    taskEn: 'Develop REST API Endpoints for Disruptions & Simulations',
    component: 'API Layer',
    description: 'پیاده‌سازی مسیرهای POST /api/v1/simulations، GET /api/v1/impacts/:id و POST /api/v1/disruptions همراه با اعتبارسنجی ورودی Zod.',
    descriptionEn: 'Implement core REST endpoints with Zod request validation and standard error response schemas.',
    input: 'اسپک API در سند معماری',
    output: 'کنترلرهای Express/Fastify با کدهای وضعیت HTTP استاندارد و مستندات OpenAPI',
    dependencies: ['TASK-05', 'TASK-09'],
    acceptanceCriteria: 'پاسخگویی اندپوینت شبیه‌سازی در کمتر از ۲۰۰ میلی‌ثانیه برای ورودی سناریوی پاما.',
    acceptanceCriteriaEn: 'Simulation execution endpoint responds in strictly <200ms for standard disruption payload.',
    priority: 'P0'
  },
  {
    id: 'TASK-14',
    task: 'توسعه وب‌سرویس‌های تصویب و ثبت تغییر دستی تصمیم (Decision Override APIs)',
    taskEn: 'Implement Decision Approval & Manual Override REST Endpoints',
    component: 'API Layer',
    description: 'پیاده‌سازی POST /api/v1/decisions/:id/approve و POST /api/v1/decisions/:id/override همراه با ثبت ردپای حسابرسی در دیتابیس.',
    descriptionEn: 'Code decision sign-off and override endpoints persisting user identity, timestamp, and justification.',
    input: 'شناسه بسته تصمیم، شناسه گزینه انتخابی و متن دلیل مدیر',
    output: 'کد وضعیت ۲۰۰ و به‌روزرسانی وضعیت رکورد در جدول mc_decisions',
    dependencies: ['TASK-13'],
    acceptanceCriteria: 'ثبت بدون نقص رویداد DECISION_OVERRIDDEN و قفل شدن ویرایش مجدد رکورد.',
    acceptanceCriteriaEn: 'Audit log persistence and immutable record state locking upon decision sign-off.',
    priority: 'P0'
  },
  {
    id: 'TASK-15',
    task: 'پیاده‌سازی ماژول استخراج داده‌های CDS استاندارد SAP S/4HANA (Mock & Live)',
    taskEn: 'Build SAP S/4HANA CDS Extraction Client (Live & Mock Modes)',
    component: 'Integration Layer',
    description: 'توسعه کلاینت ارتباط با SAP CDS Views (I_WorkCenterCapacity, I_ProductionOrderItem) با قابلیت سوئیچ به دادگان شبیه‌سازی در غیاب سرور SAP.',
    descriptionEn: 'Develop resilient SAP CDS OData consumer with built-in mock fallback provider.',
    input: 'اطلاعات اتصال فنی SAP مپنا یا فایل‌های Seed تستی',
    output: 'اشیاء کاننیکال آماده بارگذاری در لایه Staging',
    dependencies: ['TASK-01'],
    acceptanceCriteria: 'استخراج بی‌خطای ۱۰۰ رکورد سفارش ساخت و ظرفیت ماشین پاما در حالت تست محلی.',
    acceptanceCriteriaEn: 'Zero-error ingestion and normalization of 100 benchmark production orders.',
    priority: 'P1'
  },
  {
    id: 'TASK-16',
    task: 'پیاده‌سازی رابط کاربری میز فرماندهی (Cockpit View UI)',
    taskEn: 'Implement Executive Cockpit View in React & Tailwind CSS',
    component: 'Frontend UI',
    description: 'توسعه داشبورد مدیریتی شامل ویجت هشدار شوک فعال، مقایسه گزینه‌ها، نمودار جریان نقدینگی و کارت‌های وضعیت کارخانه.',
    descriptionEn: 'Build high-contrast executive cockpit presenting live disruption badges, cash flows, and key KPI cards.',
    input: 'خروجی داده‌های Simulation و Decision Package',
    output: 'کامپوننت ریسپانسیو CockpitView با پشتیبانی کامل از زبان فارسی و انگلیسی',
    dependencies: ['TASK-10', 'TASK-13'],
    acceptanceCriteria: 'رندرینگ بی‌نقص المان‌ها در رزولوشن‌های موبایل و دسکتاپ و بارگذاری زیر ۱ ثانیه.',
    acceptanceCriteriaEn: 'Sub-second paint time with responsive layout across mobile, tablet, and ultra-wide screens.',
    priority: 'P0'
  },
  {
    id: 'TASK-17',
    task: 'پیاده‌سازی رابط کاربری بسته تصمیم هیئت‌مدیره (Decision Package View UI)',
    taskEn: 'Develop Decision Package View UI with Action Controls',
    component: 'Frontend UI',
    description: 'توسعه صفحه جامع بسته تصمیم شامل جدول مقایسه‌ای ۴ گزینه، کارت ارزش اطلاعات (VOI)، پنل هزینه فرصت و دکمه‌های تایید/تغییر مسیر.',
    descriptionEn: 'Construct executive decision package view featuring comparison matrices, VOI sensitivity, and approval modals.',
    input: 'موجودیت DecisionPackage',
    output: 'کامپوننت DecisionPackageView با اینترفیس تصویب تصمیم و دانلود مستندات',
    dependencies: ['TASK-14', 'TASK-16'],
    acceptanceCriteria: 'امکان انتخاب دستی گزینه دیگر توسط مدیرعامل و تغییر آنی حکم به همراه لاگ تغییرات.',
    acceptanceCriteriaEn: 'Interactive option override immediately reflects in state with visual audit confirmation.',
    priority: 'P0'
  },
  {
    id: 'TASK-18',
    task: 'توسعه کامپوننت بصری‌سازی تعاملی گراف انتشار اثرات (Enterprise Graph View UI)',
    taskEn: 'Build Interactive Enterprise Graph Visualization Component',
    component: 'Frontend UI',
    description: 'پیاده‌سازی گراف بصری ارتباط منبع به عملیات، پروژه، مایل‌استون و تعهدات به همراه فیلترهای لایه‌ای و برجسته‌سازی مسیر بحرانی.',
    descriptionEn: 'Develop interactive SVG/Canvas graph viewer tracing cascade paths from machine to cash commitments.',
    input: 'داده‌های گره‌ها و یال‌های گراف',
    output: 'کامپوننت EnterpriseGraphView با امکان زوم، پن و کلیک روی گره‌ها برای ره‌گیری وابستگی',
    dependencies: ['TASK-03'],
    acceptanceCriteria: 'نمایش زنجیره قرمز بحرانی از ماشین پاما تا مایل‌استون نیروگاه جهرم با کلیک روی گره پاما.',
    acceptanceCriteriaEn: 'Clicking PAMA node dynamically illuminates the end-to-end critical disruption path to Jahrom.',
    priority: 'P1'
  },
  {
    id: 'TASK-19',
    task: 'پیاده‌سازی تست طلایی انتهای‌به‌انتها (End-to-End Golden Test Suite)',
    taskEn: 'Implement End-to-End Golden Scenario Automated Test Suite',
    component: 'Testing & QA',
    description: 'نوشتن تست‌های یکپارچه اتوماتیک برای اعتبارسنجی سناریوی طلایی: از اعمال توقف ۲۰ روزه پاما تا تولید بسته تصمیم با برگزیده شدن برون‌سپاری.',
    descriptionEn: 'Author deterministic automated test suite verifying golden scenario propagation and decision ranking.',
    input: 'دادگان تست طلایی PAMA_BREAKDOWN_20D',
    output: 'گزارش تست Jest/Vitest با پوشش ۱۰۰٪ روی منطق شبیه‌سازی و تصمیم',
    dependencies: ['TASK-05', 'TASK-09', 'TASK-10'],
    acceptanceCriteria: 'پاس شدن ۱۰۰٪ تست‌های محاسباتی تاخیر، هزینه و انتخاب بدون قید و شرط گزینه برون‌سپاری با امتیاز ۹۴.',
    acceptanceCriteriaEn: '100% test pass rate with strict assertions on delays, costs, and optimal alternative ranking.',
    priority: 'P0'
  },
  {
    id: 'TASK-20',
    task: 'کانتینری‌سازی و پیکربندی داکر استقرار در حالت ایزوله (Air-Gapped Docker Bundle)',
    taskEn: 'Containerize Solution for Air-Gapped On-Premise Factory Deployment',
    component: 'DevOps & Infra',
    description: 'تولید Dockerfile چندمرحله‌ای بهینه، docker-compose.yml برای اجرای لوکال در کارخانجات کرج مپنا بدون وابستگی به اینترنت.',
    descriptionEn: 'Create multi-stage Docker build and compose orchestration bundling PostgreSQL and web services for offline deployment.',
    input: 'سورس‌کد کامل بک‌اند، فرانت‌اند و اسکریپت‌های DDL',
    output: 'ایمیج کانتینری تک‌دستوری آماده بارگذاری روی سرورهای داخلی مپنا',
    dependencies: ['TASK-01', 'TASK-16', 'TASK-19'],
    acceptanceCriteria: 'اجرای دستور docker compose up و راه‌اندازی کامل سیستم در پورت ۳۰۰۰ ظرف کمتر از ۳۰ ثانیه بدون دسترسی به اینترنت.',
    acceptanceCriteriaEn: 'Zero-internet boot via docker compose up reaching healthy status in <30 seconds on port 3000.',
    priority: 'P0'
  }
];

export const FINAL_VERDICTS: FinalVerdictItem[] = [
  {
    dimension: 'PRODUCT CONCEPT',
    dimensionFa: 'مفهوم محصول و مرزبندی تجاری',
    verdict: 'GO',
    rationaleFa: 'تعریف شفاف Mission Control به عنوان سامانه هوش تصمیم‌گیری (System of Intelligence) نه جایگزین ERP، حل معضل استراتژیک قربانی‌سازی چندپروژه‌ای را ممکن ساخته است.',
    prerequisite: 'حفظ مرزبندی اعلام‌شده و عدم گسترش اسکوپ به سمت MES/APS سنتی.'
  },
  {
    dimension: 'ARCHITECTURE',
    dimensionFa: 'معماری کلان سیستم و مدل داده کاننیکال',
    verdict: 'GO',
    rationaleFa: 'معماری ماژولار مونولیت همراه با مدل رابطه کاننیکال در PostgreSQL و گراف حافظه‌ای، بالاترین قابلیت اطمینان را با کمترین اصطکاک نگهداری فراهم می‌سازد.',
    prerequisite: 'اعمال دقیق ۲۴ جدول DDL و حفظ انضباط مرز دامنه‌ها.'
  },
  {
    dimension: 'TECHNOLOGY',
    dimensionFa: 'پشته فناوری و انتخاب ابزارها',
    verdict: 'GO',
    rationaleFa: 'ترکیب TypeScript، React 19، Tailwind CSS، Node/Express و PostgreSQL مدرن‌ترین، پایدارترین و دردسترس‌ترین پشته مهارتی در ایران است.',
    prerequisite: 'پرهیز از کتابخانه‌های ناشناخته یا فریم‌ورک‌های سنگین تحریم‌پذیر.'
  },
  {
    dimension: 'SAP INTEGRATION',
    dimensionFa: 'معماری اتصال و لایه معنایی با SAP S/4HANA',
    verdict: 'CONDITIONAL_GO',
    rationaleFa: 'استفاده از Standard Released CDS Views (نظیر I_WorkCenterCapacity و I_ProductionOrderItem) راهکار رسمی SAP است و پایداری بلندمدت را تضمین می‌کند.',
    prerequisite: 'اخذ دسترسی فنی Technical Communication User در سامانه SAP کارخانجات مپنا پارس.'
  },
  {
    dimension: 'GRAPH ENGINE',
    dimensionFa: 'موتور گراف انتشار وابستگی‌های سازمانی',
    verdict: 'GO',
    rationaleFa: 'مدل تلفیقی رابطه‌ای به همراه کش و پیمایش این‌مموری با ثبت ۱۴ نوع یال جهت‌دار، پیمایش زیر ۵ میلی‌ثانیه‌ای کل مسیر بحرانی کارخانه را به اثبات رسانده است.',
    prerequisite: 'پیاده‌سازی مکانیزم ابطال کش مبتنی بر رویدادهای تایید سفارش.'
  },
  {
    dimension: 'SIMULATION ENGINE',
    dimensionFa: 'موتور شبیه‌سازی قطعی عددی (Deterministic Engine)',
    verdict: 'GO',
    rationaleFa: 'الگوریتم ۱۵ مرحله‌ای شبیه‌سازی رخداد-گسسته با فرمول‌های ریاضی مدون، قطعیت ۱۰۰٪ را تضمین کرده و مانع از توهمات ناشی از سپردن محاسبات به LLM می‌شود.',
    prerequisite: 'پایش مستمر نرخ تنزیل سرمایه (WACC) مطابق با شرایط واقعی خزانه‌داری.'
  },
  {
    dimension: 'OPTIMIZATION ENGINE',
    dimensionFa: 'موتور بهینه‌سازی دوسطحی و تابع هدف چندمعیاره',
    verdict: 'GO',
    rationaleFa: 'فیلتر مرحله اول با گیت‌های سخت امکان‌سنجی مانع ورود گزینه‌های ناقض تلرانس ساخت می‌شود و مرحله دوم ارزش خالص را به دقت بیشینه‌سازی می‌کند.',
    prerequisite: 'تایید مقادیر مجاز تلرانسی توسط مدیر مهندسی فرآیند ساخت.'
  },
  {
    dimension: 'VIRTUAL COUNCIL',
    dimensionFa: 'شورای مجازی مدیران و هوش استدلالی',
    verdict: 'GO',
    rationaleFa: 'استقرار شورا به عنوان لایه چالشگری، استدلال و نقد (شامل Devil’s Advocate) نه محاسب، اعتماد مدیران ارشد مپنا پارس به تصمیمات را جلب می‌نماید.',
    prerequisite: 'محدودسازی داده‌های ورودی به عامل‌ها منحصراً به فکت‌های اثبات‌شده عددی.'
  },
  {
    dimension: 'MVP IMPLEMENTATION',
    dimensionFa: 'قابلیت پیاده‌سازی و استقرار سریع MVP',
    verdict: 'GO',
    rationaleFa: 'اسپک کامل ۶۰ فصلی، ۲۵ سند تصمیم معماری (ADR)، ۲۰ سناریوی Pre-Mortem و تفکیک ۲۰ وظیفه نخست تیم، هرگونه ابهام را برای ساخت فوری سیستم مرتفع کرده است.',
    prerequisite: 'تکمیل اسپرینت‌های ۱ الی ۶ مطابق برنامه زمان‌بندی.'
  },
  {
    dimension: 'MAPNA PARS PILOT',
    dimensionFa: 'آمادگی پایلوت در کارخانجات پارس ژنراتور',
    verdict: 'GO',
    rationaleFa: 'سناریوی طلایی خرابی ۲۰ روزه ماشین بورینگ پاما در خط پوسته استاتور نیروگاه جهرم، بهترین نقطه ورود با بازده اقتصادی اثبات‌شده ۵.۲ میلیارد ریالی است.',
    prerequisite: 'استقرار اولیه در سالن ماشین‌کاری سنگین و اتصال به ایستگاه پاما.'
  }
];
