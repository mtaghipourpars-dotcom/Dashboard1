import { 
  CouncilMember, 
  AlternativeOption, 
  ImpactSummary, 
  DisruptionInput, 
  DecisionPackage, 
  StrategicProfile 
} from '../types';

export function assembleExecutiveCouncil(
  disruption: DisruptionInput,
  impact: ImpactSummary,
  recommendedAlt: AlternativeOption,
  strategicProfile: StrategicProfile
): CouncilMember[] {
  const isOutsource = recommendedAlt.strategy === 'OUTSOURCE';
  const isRepair = recommendedAlt.strategy === 'REPAIR';

  return [
    {
      id: 'COO',
      role: 'معاونت عملیات و تولید',
      roleEn: 'Chief Operating Officer (COO)',
      name: 'مهندس کاظمی',
      nameEn: 'Eng. Kazemi',
      title: 'مدیر ارشد تولید و کارخانجات مپنا پارس',
      titleEn: 'Senior VP of Manufacturing & Operations',
      stance: isOutsource ? 'CONDITIONAL' : 'APPROVE',
      comment: isOutsource
        ? `برون‌سپاری فرزکاری پوسته ۸۰ تنی به ماشین‌سازی اراک گلوگاه زمانی کارگاه را مهار می‌کند، اما مشروط به اینکه فیکسچرهای اصلی مپنا پارس ارسال شده و ناظر مقیم کنترل کیفیت ما تا آخرین پاس ماشین‌کاری در محل حضور داشته باشد.`
        : `تعمیر اضطراری و سه شیفت کردن تیم نگهداری و تعمیرات، کنترل کامل فرآیند را در داخل سالن حفظ می‌کند و از خطرات جابجایی قطعه سنگین در جاده جلوگیری می‌نماید.`,
      commentEn: isOutsource
        ? `Outsourcing the 80-ton stator frame to Machine Sazi Arak relieves the shop bottleneck, but is strictly conditional on using our proprietary fixtures and embedding our resident QA inspector at their facility.`
        : `Expedited in-house repair preserves full process sovereignty inside our shop and eliminates hazardous heavy road haulage risks.`,
      keyQuestion: 'آیا ماشین‌سازی اراک تضمین کتبی برای تحویل در ۱۲ روز با تلرانس ۰.۰۱۵ میلی‌متر ارائه داده است؟',
      keyQuestionEn: 'Has Machine Sazi Arak committed in writing to a 12-day turnaround with 0.015mm tolerance?',
      avatarColor: 'bg-amber-600'
    },
    {
      id: 'CFO',
      role: 'معاونت مالی و اقتصادی',
      roleEn: 'Chief Financial Officer (CFO)',
      name: 'دکتر حسینی',
      nameEn: 'Dr. Hosseini',
      title: 'مدیر ارشد امور مالی و سرمایه‌گذاری',
      titleEn: 'Senior VP of Finance & Treasury',
      stance: 'APPROVE',
      comment: `از منظر مدیریت نقدینگی، پرداخت ۳.۴ میلیارد ریال هزینه برون‌سپاری یا ۵.۸ میلیارد ریال هزینه اورهال، در مقایسه با جریمه دیرکرد ۹.۹ میلیارد ریالی و تاخیر در وصول صورت‌وضعیت ۴۲ میلیارد ریالی، از نظر اقتصادی ۱۰۰٪ قابل دفاع است و از فرسایش سرمایه در گردش جلوگیری می‌کند.`,
      commentEn: `From a cash-flow perspective, spending 3.4B IRR on subcontracting is overwhelmingly justified against 9.9B IRR in liquidated damages and an overdue 42B IRR milestone collection. It firmly safeguards our working capital.`,
      keyQuestion: 'چگونه پیش‌پرداخت ارزی یا ریالی پیمانکار بدون اختلال در حساب تنخواه‌گردان کارگاه تسویه خواهد شد؟',
      keyQuestionEn: 'How will the upfront contractor payment be cleared without disrupting shop petty cash liquidity?',
      avatarColor: 'bg-emerald-600'
    },
    {
      id: 'CHIEF_ENG',
      role: 'مدیر مهندسی ساخت و کیفیت',
      roleEn: 'Chief Engineering & QA Director',
      name: 'دکتر رحیمی',
      nameEn: 'Dr. Rahimi',
      title: 'مدیر مهندسی فرآیند و استانداردهای زیمنس/مپنا',
      titleEn: 'Director of Process Engineering & QA (Siemens/MAPNA Standards)',
      stance: isOutsource ? 'CONDITIONAL' : 'APPROVE',
      comment: isOutsource
        ? `تلرانس نشیمنگاه بلبرینگ پوسته استاتور ژنراتور ۱۶۰ مگاوات کمتر از ۰.۰۱۵ میلی‌متر است. هرگونه انحراف ابعادی در کارگاه پیمانکار منجر به رد قطعه در آزمون مونتاژ روتور خواهد شد. انجام آزمون التراسونیک (UT) و کنترل ابعادی با دستگاه لیزرتراکر قبل از بارگیری به سمت کرج الزامی است.`
        : `تعمیر داخلی اسپیندل باید همراه با کالیبراسیون کامل ران‌اوت شفت در دور ۳۰۰۰ و آزمون حرارتی بلبرینگ‌ها باشد تا دقت سطح ماشین‌کاری حفظ شود.`,
      commentEn: isOutsource
        ? `The stator frame journal bearing seat tolerance is tighter than 0.015mm. Any contractor drift will fail our rotor assembly test. Ultrasonic testing (UT) and laser-tracker dimensional verification are non-negotiable before dispatching back to Karaj.`
        : `In-house spindle overhaul requires full laser run-out calibration at 3000 RPM to preserve cutting surface precision.`,
      keyQuestion: 'آیا تکنسین‌های ماشین‌سازی اراک گواهینامه معتبر کار با استانداردهای تلرانسی توربوژنراتور را دارند؟',
      keyQuestionEn: 'Do the contractor technicians hold validated credentials for turbogenerator tolerance standards?',
      avatarColor: 'bg-cyan-600'
    },
    {
      id: 'SUPPLY_CHAIN',
      role: 'مدیر زنجیره تامین و بازرگانی',
      roleEn: 'Supply Chain Director',
      name: 'مهندس مرادی',
      nameEn: 'Eng. Moradi',
      title: 'مدیر تدارکات پروژه‌ها و حمل و نقل سنگین',
      titleEn: 'Procurement & Heavy Logistics Director',
      stance: 'CONDITIONAL',
      comment: `مجوز تردد محموله ترافیکی ۸۰ تن با اسکورت پلیس در محور تهران-اراک در روزهای پایانی هفته با محدودیت مواجه است. شرکت باربری مپنا باید از امروز صبح فرآیند اخذ بارنامه و مجوز بار ترافیکی را استارت بزند تا بافر زمانی ۴ روزه حمل نقض نگردد.`,
      commentEn: `Heavy 80-ton oversize transport road permits with highway police escort face weekend restrictions. MAPNA heavy logistics must initiate paperwork this morning to guarantee the 4-day transport buffer.`,
      keyQuestion: 'آیا بوژی چندمحوره ۱۶ محوره مپنا در حال حاضر در سایت کارخانه آزاد و آماده بارگیری است؟',
      keyQuestionEn: 'Is our 16-axle multi-axle heavy hauler currently free and positioned at the Karaj factory?',
      avatarColor: 'bg-indigo-600'
    },
    {
      id: 'IRAN_REALITY',
      role: 'مشاور ارشد شرایط عملیاتی و اقتصادی ایران',
      roleEn: 'Iran Operating Reality Officer',
      name: 'دکتر توکلی',
      nameEn: 'Dr. Tavakoli',
      title: 'مشاور ریسک‌های سیستمی و فضای کلان صنعت برق',
      titleEn: 'Senior Advisor on Systemic Risks & Iranian Industrial Reality',
      stance: 'CAUTION',
      comment: `توجه شود که کارفرمای دولتی (برق حرارتی) مطالبات را با اسناد خزانه اسلامی (اخزا) تسویه می‌کند، لذا تعویق فاکتور اثر مرکب بر هزینه تنزیل اوراق دارد. همچنین باید ریسک قطعی برق تابستانه در تیرماه لحاظ شود؛ بنابراین جبران این تاخیر ۴ روزه در فروردین و اردیبهشت بسیار ارزان‌تر از جبران آن در فصل بحران بار شبکه خواهد بود.`,
      commentEn: `Note that the state utility settles invoices via Islamic Treasury Bills (Akhza); milestone delays amplify bond discounting costs. Furthermore, summer power curtailments in July mean recovering 4 days now is far cheaper than in peak season.`,
      keyQuestion: 'آیا ریسک قطعی احتمالی برق شهرک صنعتی اراک در تقویم کاری پیمانکار استعلام شده است؟',
      keyQuestionEn: 'Has the local grid outage schedule in Arak industrial zone been vetted with local dispatching?',
      avatarColor: 'bg-rose-600'
    },
    {
      id: 'DEVILS_ADVOCATE',
      role: 'وکیل مدافع شیطان (تحلیلگر سناریوهای فاجعه‌بار)',
      roleEn: "Devil's Advocate & Risk Officer",
      name: 'مهندس قاسمی',
      nameEn: 'Eng. Ghasemi',
      title: 'تحلیلگر ریسک‌های نامتقارن و شکست پنهان',
      titleEn: 'Asymmetric Risk & Failure Mode Analyst',
      stance: 'OBJECT',
      comment: `فرض اینکه ماشین‌سازی اراک کار را دقیقاً در ۱۲ روز تمام کند خوش‌بینانه است. داده‌های تاریخی ما در سال گذشته نشان داد که برون‌سپاری شفت به دلیل تاخیر راهداری و معطلی جرثقیل سنگین کارگاه با ۳ روز انحراف مواجه شد. اگر کارگاه اراک قطعه را با انحراف ابعادی تحویل دهد، اصلاح آن ۳۰ روز طول می‌کشد و کل پروژه منهدم می‌شود!`,
      commentEn: `Assuming Machine Sazi Arak finishes in exactly 12 days is naive. Historical data from last year proved that outsourced shafts ran 3 days late due to heavy crane availability. If their mill introduces angular distortion, rework will take 30 days and destroy the project!`,
      keyQuestion: 'اگر قطعه در حین حمل جاده‌ای یا لیفتینگ جرثقیل کارگاه ثانویه آسیب ببیند، بیمه مهندسی تمام‌خطر فعال است؟',
      keyQuestionEn: 'Is our Contractor All-Risks (CAR) transit policy active and validated for the full 480B IRR component value?',
      avatarColor: 'bg-red-700'
    },
    {
      id: 'CHAIRMAN',
      role: 'رئیس شورا و مدیر ارشد اجرایی',
      roleEn: 'Council Chairman & Managing Director',
      name: 'دکتر تقی‌پور',
      nameEn: 'Dr. Taghipour',
      title: 'مدیرعامل و رئیس هیئت تصمیم‌گیری سازمانی',
      titleEn: 'CEO & Chair of Mission Control Decision Council',
      stance: 'CONDITIONAL',
      comment: `پس از استماع نظرات تخصصی و با عنایت به برتری مطلق گزینه برون‌سپاری تحت پروفایل متوازن و تعهد حیثیتی تحویل به شبکه برق سراسری، حکم شورا «اجرای مشروط (CONDITIONAL GO)» است؛ مشروط به اجرای بی‌درنگ الزامات ناظر مقیم کیفیت، بیمه ترانزیت و نظارت بر بارنامه ترافیکی.`,
      commentEn: `Having weighed all executive arguments and given the clear superiority of the outsourcing option under our balanced delivery commitment to the national grid, the verdict is CONDITIONAL GO, subject to immediate resident QA deployment and verified transit insurance.`,
      keyQuestion: 'آیا پیش‌نویس الحاقیه قرارداد پیمانکار و احکام ماموریت ناظران کیفیت ظرف ۲ ساعت آینده آماده امضاست؟',
      keyQuestionEn: 'Are the draft contract amendment and QA mission orders ready for sign-off within 2 hours?',
      avatarColor: 'bg-purple-700'
    }
  ];
}

export function synthesizeDecisionPackage(
  disruption: DisruptionInput,
  impact: ImpactSummary,
  alternatives: AlternativeOption[],
  strategicProfile: StrategicProfile
): DecisionPackage {
  const recommendedAlt = alternatives.find(a => a.recommended) || alternatives[0];
  const council = assembleExecutiveCouncil(disruption, impact, recommendedAlt, strategicProfile);

  const prerequisites = [
    'استقرار ناظر مقیم کنترل کیفیت مپنا پارس در محل کارخانه ماشین‌سازی اراک همراه با دستگاه لیزرتراکر',
    'بررسی پوشش بیمه تمام‌خطر باربری و محموله ترافیکی سنگین برای ارزش قطعه‌کار (۴۸۰ میلیارد ریال)',
    'صدور هم‌زمان سفارش کار اضطراری در SAP PM برای تعمیر موازی اسپیندل ماشین پاما جهت آزاد شدن برای پروژه کلاس F',
    'اخذ مجوز تردد شبانه محموله ترافیکی ۸۰ تن از پلیس راهور محور استان مرکزی - البرز'
  ];

  const prerequisitesEn = [
    'Deploy resident MAPNA Pars QA inspector with laser-tracker to Machine Sazi Arak factory',
    'Verify active Contractor All-Risks (CAR) transit insurance covering 480 Billion IRR workpiece replacement value',
    'Simultaneously issue SAP PM emergency work order for parallel repair of PAMA spindle to secure Class F project',
    'Secure nocturnal heavy transport clearance permit from highway traffic police'
  ];

  return {
    decisionId: `DEC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-098`,
    timestamp: new Date().toISOString(),
    disruption,
    impact,
    alternatives,
    recommendedAlternative: recommendedAlt,
    verdict: 'CONDITIONAL_GO',
    verdictReason: `گزینه «${recommendedAlt.title}» با امتیاز مرکب ${recommendedAlt.compositeScore} از ۱۰۰ به عنوان بهترین مسیر اجرایی انتخاب شد. این تصمیم تاخیر نهایی پروژه را از ۲۲ روز به ۴ روز و جریمه دیرکرد را از ۹.۹ میلیارد ریال به ۱.۸ میلیارد ریال تقلیل داده و از بلوکه شدن ۴۲ میلیارد ریال صورت‌وضعیت مالی جلوگیری می‌نماید.`,
    verdictReasonEn: `Alternative "${recommendedAlt.titleEn}" with composite score ${recommendedAlt.compositeScore}/100 selected as optimal. It compresses project delay from 22 to 4 days, slashes contractual penalty from 9.9B to 1.8B IRR, and protects the 42B IRR milestone cash inflow.`,
    prerequisites,
    prerequisitesEn,
    councilDeliberation: council,
    strategicProfile,
    confidenceScore: recommendedAlt.executionConfidence
  };
}
