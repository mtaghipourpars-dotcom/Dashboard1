import React from 'react';
import { 
  AlertOctagon, 
  Clock, 
  DollarSign, 
  TrendingDown, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Wrench, 
  AlertCircle,
  ExternalLink,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  Language, 
  ImpactSummary, 
  DecisionPackage, 
  ResourceNode, 
  ProjectEntity 
} from '../types';

interface CockpitViewProps {
  lang: Language;
  impact: ImpactSummary;
  decisionPackage: DecisionPackage;
  resources: ResourceNode[];
  projects: ProjectEntity[];
  onNavigateTab: (tab: string) => void;
  onResetGoldenScenario: () => void;
}

export const CockpitView: React.FC<CockpitViewProps> = ({
  lang,
  impact,
  decisionPackage,
  resources,
  projects,
  onNavigateTab,
  onResetGoldenScenario
}) => {
  const isFa = lang === 'fa';
  const rec = decisionPackage.recommendedAlternative;

  // Currency helper (formats IRR to Billion IRR / Million Tomans)
  const formatIRR = (amount: number) => {
    const billionIRR = (amount / 1000000000).toFixed(1);
    const millionToman = (amount / 10000000).toLocaleString('fa-IR');
    if (isFa) {
      return `${billionIRR} میلیارد ریال (${millionToman} م.تومان)`;
    }
    return `${billionIRR}B IRR (${(amount / 10000000).toLocaleString('en-US')}M Tomans)`;
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Headline & Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-800 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'سامانه شبیه‌سازی انتشار اثر و هوش تصمیم‌گیری' : 'Impact Simulation & Decision Cockpit'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isFa ? 'میز فرماندهی عملیات و پایش تعهدات پارس ژنراتور' : 'Operational Command & Commitment Cockpit'}
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl leading-relaxed">
              {isFa 
                ? 'پایش زنده اثرپذیری تعهدات پروژه‌های نیروگاهی از اختلالات منابع کارخانجات مپنا پارس، محاسبه انتشار اثر دومینویی بر زمان‌بندی و نقدینگی، و ارائه سناریوهای مهار بحران.'
                : 'Real-time propagation of resource bottlenecks onto utility power plant commitments, evaluating schedule drift, cash-flow risks, and executable mitigation paths.'}
            </p>
          </div>

          {/* Quick Action to Decision Package */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('decision')}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition"
            >
              <span>{isFa ? 'بررسی بسته تصمیم شورا' : 'Open Decision Package'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => onNavigateTab('graph')}
              className="px-4 py-3 rounded-xl font-medium text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'مشاهده گراف انتشار اثر' : 'Inspect Impact Graph'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Schedule Exposure */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isFa ? 'انحراف تقویم تحویل پروژه' : 'Schedule Delay Exposure'}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400 font-mono">
              +{impact.maxProjectDelayDays}
            </span>
            <span className="text-xs text-slate-400">{isFa ? 'روز تقویمی' : 'Days'}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">{isFa ? 'با سناریوی برون‌سپاری:' : 'With Outsourcing:'}</span>
            <span className="text-emerald-400 font-bold font-mono">+{rec.scheduleDelayDays} {isFa ? 'روز' : 'Days'}</span>
          </div>
        </div>

        {/* Card 2: Penalties at Risk */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isFa ? 'ریسک جریمه دیرکرد قراردادی' : 'Liquidated Damages at Risk'}</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-rose-400 font-mono">
              {(impact.totalPenaltyRiskIRR / 1000000000).toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">{isFa ? 'میلیارد ریال' : 'B IRR'}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">{isFa ? 'نرخ جریمه روزانه:' : 'Daily Burn Rate:'}</span>
            <span className="text-rose-300 font-mono">۴۵۰ {isFa ? 'م.ریال/روز' : 'M/day'}</span>
          </div>
        </div>

        {/* Card 3: Milestone Inflow at Risk */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isFa ? 'جریان نقدینگی در معرض تعویق' : 'Milestone Cash Inflow at Risk'}</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-cyan-400 font-mono">
              {(impact.delayedCashInflowIRR / 1000000000).toFixed(0)}
            </span>
            <span className="text-xs text-slate-400">{isFa ? 'میلیارد ریال' : 'B IRR'}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">{isFa ? 'مایل‌استون:' : 'Milestone:'}</span>
            <span className="text-slate-300 truncate max-w-[140px]">{isFa ? 'استکینگ و VPI استاتور' : 'Stacking & VPI'}</span>
          </div>
        </div>

        {/* Card 4: Bottleneck Resource Outage */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isFa ? 'توقف منبع گلوگاهی' : 'Bottleneck Machine Outage'}</span>
            <Wrench className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-300 font-mono">
              {impact.downtimeDays}
            </span>
            <span className="text-xs text-slate-400">{isFa ? 'روز توقف ماشین' : 'Downtime Days'}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">{isFa ? 'ماشین آسیب‌دیده:' : 'Machine:'}</span>
            <span className="text-amber-400 font-mono truncate max-w-[140px]">PAMA Speedram</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Disruption & Decision Card + Machine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Golden Scenario Active Impact Card */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <div>
                <h2 className="font-bold text-lg text-white">
                  {isFa ? 'تحلیل رخداد بحرانی جاری (Active Disruption Context)' : 'Active Disruption Profile'}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  {isFa ? 'کد منبع در SAP: ' : 'SAP Work Center: '} WC-MCH-BORING01 • PAMA Speedram 2000
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
              {isFa ? 'توقف غیرمنتظره اسپیندل' : 'Unplanned Outage'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 block mb-1">{isFa ? 'پروژه بحرانی در معرض خطر:' : 'Project at Risk:'}</span>
              <span className="font-bold text-slate-200">
                {isFa ? 'ژنراتور ۱۶۰ مگاوات جهرم / بوئین زهرا' : '160MW Turbogenerator Jahrom'}
              </span>
              <span className="text-slate-400 block mt-1">{isFa ? 'کارفرما: برق حرارتی TPPH' : 'Client: TPPH'}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 block mb-1">{isFa ? 'دامنه قطعات متاثر:' : 'Affected Components:'}</span>
              <span className="font-bold text-amber-300">
                {isFa ? 'پوسته استاتور (۸۰ تن) + شفت روتور' : 'Stator Frame (80t) + Rotor Shaft'}
              </span>
              <span className="text-slate-400 block mt-1">{impact.affectedOperations.length} {isFa ? 'عملیات کارگاهی معلق' : 'Operations on hold'}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 block mb-1">{isFa ? 'حکم شورای اجرایی مجازی:' : 'Council Verdict:'}</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{decisionPackage.verdict}</span>
              </span>
              <span className="text-slate-300 block mt-1">{isFa ? 'برون‌سپاری به ماشین‌سازی اراک' : 'Subcontract to Arak'}</span>
            </div>
          </div>

          {/* Quick Alternatives Preview Banner */}
          <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                {isFa ? 'مسیرهای جایگزین ارزیابی‌شده توسط موتور شبیه‌سازی:' : 'Evaluated Feasible Alternatives:'}
              </span>
              <span className="text-cyan-400 text-xs font-mono">
                {isFa ? 'پروفایل فعال: متوازن' : 'Profile: Balanced'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {decisionPackage.alternatives.slice(0, 2).map((alt, idx) => (
                <div 
                  key={alt.id}
                  className={`p-3 rounded-lg border transition ${
                    alt.recommended 
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="truncate">{isFa ? alt.title : alt.titleEn}</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800">
                      {alt.compositeScore} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{isFa ? 'تاخیر:' : 'Delay:'} +{alt.scheduleDelayDays} {isFa ? 'روز' : 'days'}</span>
                    <span>{isFa ? 'هزینه:' : 'Cost:'} {(alt.directCostIRR / 1000000000).toFixed(1)}B</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <button
              onClick={() => onNavigateTab('decision')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition"
            >
              <span>{isFa ? 'مشاهده ماتریس تفصیلی مقایسه ۴ سناریو و اقدامات SAP' : 'Inspect Full 4-Way Comparison & SAP Actions'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>

            <button
              onClick={onResetGoldenScenario}
              className="text-slate-400 hover:text-slate-300 flex items-center gap-1"
            >
              <span>{isFa ? 'بازنشانی سناریوی اولیه' : 'Reset Scenario'}</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Critical Work Centers Status Grid */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h2 className="font-bold text-sm text-white">
                {isFa ? 'ایستگاه‌های کاری گلوگاهی کارخانه' : 'Critical Work Centers'}
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('simulator')}
              className="text-xs text-cyan-400 hover:underline"
            >
              {isFa ? 'تغییر سناریو' : 'Simulate'}
            </button>
          </div>

          <div className="space-y-3">
            {resources.map(res => {
              const isDisrupted = res.currentStatus === 'DISRUPTED';
              return (
                <div 
                  key={res.resourceId}
                  className={`p-3 rounded-xl border text-xs transition ${
                    isDisrupted 
                      ? 'bg-rose-950/20 border-rose-500/50 text-rose-200' 
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold truncate max-w-[200px]">
                      {isFa ? res.name : res.nameEn}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isDisrupted 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {res.currentStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{res.sapWorkCenter}</span>
                    <span>{isFa ? 'آمادگی عملیاتی: ' : 'Avail: '}{(res.operationalAvailability * 100).toFixed(0)}%</span>
                  </div>

                  {isDisrupted && (
                    <div className="mt-2 pt-2 border-t border-rose-500/30 text-rose-300 text-[11px]">
                      ⚠️ {res.activeDisruption?.cause}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('graph')}
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'مشاهده ساختار شکست و گراف وابستگی‌ها' : 'Explore Enterprise Graph'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Projects Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-base text-white">
              {isFa ? 'سبد پروژه‌های نیروگاهی فعال مپنا پارس (Active Generator Projects)' : 'Active Generator Project Portfolio'}
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('projects')}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>{isFa ? 'جزئیات شکست کار (WBS)' : 'WBS Details'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="text-slate-400 bg-slate-950/60 uppercase font-mono text-[11px]">
              <tr>
                <th className="p-3">{isFa ? 'کد SAP و عنوان پروژه' : 'SAP Project & Title'}</th>
                <th className="p-3">{isFa ? 'کارفرما' : 'Client'}</th>
                <th className="p-3">{isFa ? 'ظرفیت' : 'Rating'}</th>
                <th className="p-3">{isFa ? 'ارزش قرارداد' : 'Contract Value'}</th>
                <th className="p-3">{isFa ? 'موعد تحویل تعهدشده' : 'Contract Deadline'}</th>
                <th className="p-3">{isFa ? 'پیش‌بینی فعلی' : 'Forecast Finish'}</th>
                <th className="p-3">{isFa ? 'وضعیت' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map(proj => {
                const isCrit = proj.status === 'CRITICAL';
                return (
                  <tr key={proj.projectId} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-semibold text-slate-200">
                      <div>{isFa ? proj.name : proj.nameEn}</div>
                      <span className="text-[11px] font-mono text-slate-400">{proj.sapProjectCode}</span>
                    </td>
                    <td className="p-3 text-slate-300">{isFa ? proj.client : proj.clientEn}</td>
                    <td className="p-3 font-mono text-cyan-300">{proj.powerRatingMW} MW</td>
                    <td className="p-3 font-mono text-slate-300">{(proj.contractValueIRR / 1000000000).toFixed(0)}B IRR</td>
                    <td className="p-3 font-mono text-slate-300">{proj.baselineDeliveryDate}</td>
                    <td className={`p-3 font-mono font-semibold ${isCrit ? 'text-rose-400' : 'text-slate-300'}`}>
                      {proj.forecastDeliveryDate}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        proj.status === 'CRITICAL' 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : proj.status === 'AT_RISK'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
