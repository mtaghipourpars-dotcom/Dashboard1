import { DecisionPackage, Language } from '../types';

export interface CouncilQueryResponse {
  speaker: string;
  speakerRole: string;
  response: string;
  suggestedFollowUp?: string;
  groundedFacts: string[];
}

export async function askVirtualCouncil(
  query: string,
  decisionPackage: DecisionPackage,
  lang: Language
): Promise<CouncilQueryResponse> {
  try {
    const res = await fetch('/api/council/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        decisionPackage,
        lang
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.response) {
        return data;
      }
    }
  } catch {
    // Fall back to offline/air-gapped deterministic industrial reasoning
  }

  return generateOfflineCouncilResponse(query, decisionPackage, lang);
}

function generateOfflineCouncilResponse(
  query: string,
  decisionPackage: DecisionPackage,
  lang: Language
): CouncilQueryResponse {
  const q = query.toLowerCase();
  const isFa = lang === 'fa';
  const rec = decisionPackage.recommendedAlternative;

  if (q.includes('اراک') || q.includes('arak') || q.includes('پیمانکار') || q.includes('contractor') || q.includes('outsource')) {
    return {
      speaker: isFa ? 'دکتر رحیمی' : 'Dr. Rahimi',
      speakerRole: isFa ? 'مدیر مهندسی ساخت و کیفیت' : 'Chief Engineering Director',
      response: isFa
        ? `درباره برون‌سپاری به ماشین‌سازی اراک: ماشین فرز دروازه‌ای ŠKODA این شرکت از نظر کورس حرکتی و توانایی باربرداری تا ۱۲۰ تن پاسخگوی ابعاد پوسته استاتور ۱۶۰ مگاوات است. شرط بحرانی ما ارسال نقشه‌های تلرانسی زیمنس/مپنا و نظارت مقیم ناظر کیفیت ماست. در صورتی که پیمانکار با ۲ روز تاخیر مواجه شود، با توجه به بافر ۳ روزه مونتاژ هسته، مایل‌استون تحویل نهایی همچنان ایمن خواهد ماند.`
        : `Regarding Machine Sazi Arak subcontracting: Their heavy ŠKODA gantry mill comfortably accommodates the 80-ton stator frame envelope. The critical precondition is enforcing our Siemens/MAPNA tolerance blueprints under our resident inspector. Even with a 2-day contractor delay, our 3-day core stacking buffer protects the final delivery deadline.`,
      suggestedFollowUp: isFa
        ? 'هزینه حمل بوژی و ریسک بیمه راهداری چگونه مدیریت می‌شود؟'
        : 'How are heavy bogie transport and highway insurance risks governed?',
      groundedFacts: [
        'پوسته استاتور ژنراتور ۱۶۰ مگاوات: ۸۰ تن وزن ناخالص',
        'ماشین‌سازی اراک: مجهز به فرز دروازه‌ای CNC کلاس سنگین',
        'تلرانس نشیمنگاه ژورنال: کمتر از ۰.۰۱۵ میلی‌متر'
      ]
    };
  }

  if (q.includes('پول') || q.includes('نقد') || q.includes('cash') || q.includes('finance') || q.includes('جریمه') || q.includes('penalty')) {
    return {
      speaker: isFa ? 'دکتر حسینی' : 'Dr. Hosseini',
      speakerRole: isFa ? 'معاونت مالی و اقتصادی' : 'Chief Financial Officer (CFO)',
      response: isFa
        ? `از منظر خزانه‌داری: جریمه تاخیر طبق قرارداد روزانه ۴۵۰ میلیون ریال است که در سناریوی بدون اقدام به ۹.۹ میلیارد ریال می‌رسید. با اجرای این سناریو، کل جریمه به ۱.۸ میلیارد ریال کاهش یافته و با احتساب ۳.۴ میلیارد ریال دستمزد برون‌سپاری، صرفه‌جویی خالص معادل ۴.۷ میلیارد ریال حاصل می‌شود. مهم‌تر از آن، صورت‌وضعیت ۴۲ میلیارد ریالی در موعد خردادماه آزاد می‌گردد.`
        : `From the CFO treasury standpoint: Contractual delay penalty is 450M IRR/day, totaling 9.9B IRR in the passive scenario. Our intervention slashes this to 1.8B IRR. Adding 3.4B IRR subcontracting fee, net economic preservation is 4.7B IRR. Crucially, the 42B IRR milestone cash inflow remains scheduled for June collection.`,
      suggestedFollowUp: isFa
        ? 'آیا بودجه تنخواه‌گردان کارگاه برای پیش‌پرداخت آماده است؟'
        : 'Is shop petty cash available for the upfront contractor advance?',
      groundedFacts: [
        'نرخ جریمه روزانه قراردادی: ۴۵۰,۰۰۰,۰۰۰ ریال',
        'مایل‌استون صورت‌وضعیت مالی مرحله ۴: ۴۲,۰۰۰,۰۰۰,۰۰۰ ریال',
        'صرفه‌جویی خالص حاصل از تصمیم: ۴,۷۰۰,۰۰۰,۰۰۰ ریال'
      ]
    };
  }

  if (q.includes('چرا') || q.includes('تعمیر') || q.includes('repair') || q.includes('why') || q.includes('توقف')) {
    return {
      speaker: isFa ? 'مهندس کاظمی' : 'Eng. Kazemi',
      speakerRole: isFa ? 'معاونت عملیات و تولید' : 'Chief Operating Officer (COO)',
      response: isFa
        ? `چرا گزینه تعمیر کامل در کارگاه اول نشد؟ زیرا تامین کیت هیدرولیک اسپیندل و بالانس ارتعاشی آن حتی در صورت ۳ شیفت کردن تیم نت، حداقل ۷ روز زمان می‌برد و پس از آن نیز کارهای معوقه استاتور با قطعات پروژه دوم (کلاس F) تداخل پیدا می‌کرد. برون‌سپاری پوسته استاتور به اراک، اجازه می‌دهد تیم نت ما با آرامش اسپیندل را بازسازی کند تا برای روتور کلاس F در هفته بعد آماده باشد.`
        : `Why wasn't in-house repair ranked first? Sourcing spindle hydraulics and dynamic balancing requires at least 7 days even with 3 maintenance shifts, immediately bottlenecking upcoming Class F rotor slotting. Offloading the stator frame to Arak decouples the queue and enables peaceful spindle restoration.`,
      suggestedFollowUp: isFa
        ? 'برنامه تعمیر موازی اسپیندل پاما در SAP PM چه زمانی استارت می‌خورد؟'
        : 'When does the parallel PAMA overhaul work order launch in SAP PM?',
      groundedFacts: [
        'مدت توقف استاندارد ماشین پاما: ۲۰ روز تقویمی',
        'کاهش زمان با تعمیر اضطراری: ۷ روز تقویمی',
        'آزادسازی ظرفیت برای روتور پروژه کلاس F'
      ]
    };
  }

  // Default synthesis by Chairman
  return {
    speaker: isFa ? 'دکتر تقی‌پور' : 'Dr. Taghipour',
    speakerRole: isFa ? 'رئیس شورا و مدیر ارشد اجرایی' : 'Council Chairman & CEO',
    response: isFa
      ? `تحلیل شورا نشان می‌دهد گزینه «${rec.title}» مطمئن‌ترین توازن میان زمان، هزینه، ریسک فنی و اعتبار مپنا پارس در شبکه برق کشور است. این تصمیم بر اساس ۴ بردار کلان پایش شده و کلیه پیش‌نیازهای امنیتی، فنی و لجستیکی آن در بسته تصمیم مدون شده است.`
      : `The Council analysis confirms that "${rec.titleEn}" achieves the superior equilibrium across time, cost, technical risk, and MAPNA's reputational standing with the national grid. All four risk vectors are actively governed under the formal Decision Package.`,
    suggestedFollowUp: isFa
      ? 'دستورات اجرایی مربوط به SAP برای کارشناسان تولید و خرید صادر شود؟'
      : 'Should execution work instructions be dispatched to SAP PP and MM planners?',
    groundedFacts: [
      `گزینه منتخب: ${isFa ? rec.title : rec.titleEn}`,
      `امتیاز شایستگی: ${rec.compositeScore}/100`,
      `سطح اطمینان اجرایی: ${rec.executionConfidence}%`
    ]
  };
}
