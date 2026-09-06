import React from 'react';
import { 
  AlertOctagon, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  Wrench, 
  Zap,
  Layers,
  ArrowUpRight,
  Shield,
  Activity,
  Radio
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

  return (
    <div className="space-y-6">
      
      {/* High-Command Bridge Header Banner */}
      <div className="bg-gradient-to-r from-[#0a1120] via-[#0d172e] to-[#070d1a] p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Tactical scanning grid line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono mb-3 shadow-inner">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{isFa ? 'مرکز فرماندهی یکپارچه منابع و تعهدات مپنا پارس • نسخه صنعتی ۱.۰' : 'MAPNA Pars Integrated Resource & Commitment Cockpit • v1.0'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>{isFa ? 'میز فرماندهی عملیات و شبیه‌سازی شوک‌های کارگاهی' : 'Operational Command Bridge & Shock Simulator'}</span>
              <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2.5 leading-relaxed font-sans">
              {isFa 
                ? 'پایش بلادرنگ وابستگی‌های زنجیره تولید ژنراتورهای حرارتی و بخار، شبیه‌سازی قطعی انتشار شوک و جلوگیری از پدیده مخرب قربانی‌سازی چندپروژه‌ای (Cross-Project Cannibalization).'
                : 'Real-time propagation of resource bottlenecks onto utility power plant commitments, evaluating schedule drift, cash-flow risks, and executable mitigation paths.'}
            </p>
          </div>

          {/* Direct Tactical Command Actions */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('decision')}
              className="px-5 py-3 rounded-xl font-bold font-mono text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-cyan-700 hover:from-emerald-500 hover:to-cyan-600 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition cursor-pointer border border-emerald-400/40 radar-glow-emerald"
            >
              <Shield className="w-4 h-4 text-emerald-200" />
              <span>{isFa ? 'احضار بسته تصمیم هیئت مدیره' : 'Summon Board Dossier'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => onNavigateTab('graph')}
              className="px-4 py-3 rounded-xl font-semibold font-mono text-xs sm:text-sm bg-[#0c1628]/80 hover:bg-[#12203a] text-cyan-200 border border-cyan-500/30 flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'گراف انتشار دومینویی' : 'Cascade Topology'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Project Cannibalization Threat Panel */}
      {impact.cannibalizationDetected && (
        <div className="bg-gradient-to-r from-amber-950/70 via-rose-950/60 to-amber-950/70 border border-amber-500/50 p-4.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl radar-glow-amber">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 shrink-0 mt-0.5 sm:mt-0 shadow-inner">
              <AlertOctagon className="w-5 h-5 animate-pulse text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-black text-sm text-amber-300 tracking-wide">
                  {isFa ? '[هشدار تهدید قطعی: تداخل دومینویی منابع مشترک]' : '[CRITICAL THREAT: CROSS-PROJECT CANNIBALIZATION]'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  {impact.cannibalizedCommitments?.length ?? 1} {isFa ? 'تعهد بحرانی در خطر' : 'Commitments Threatened'}
                </span>
              </div>
              <p className="text-xs text-amber-100/90 mt-1.5 leading-relaxed">
                {isFa 
                  ? 'این شوک تنها متوجه پروژه جهرم نیست؛ انحراف یا توقف ماشین پاما، تعهد شیارزنی روتور کلاس F خرم‌آباد (COMM-CLSF-ROTOR-SLOT) را نیز با انباشت تاخیر غیرخطی مواجه می‌سازد.'
                  : 'This shock does not only impact Jahrom; holding or misallocating PAMA will cascade directly into Class F Khorramabad rotor slotting.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('decision')}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shrink-0 cursor-pointer shadow-md transition"
          >
            {isFa ? 'بررسی تدابیر پیشگیرانه ←' : 'Inspect Mitigations →'}
          </button>
        </div>
      )}

      {/* Top Impact Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Schedule Exposure */}
        <div className="bg-[#0b1220]/90 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              {isFa ? 'انحراف تقویم تحویل' : 'Schedule Exposure'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              +{impact.maxProjectDelayDays}
            </span>
            <span className="text-xs font-mono text-slate-400">{isFa ? 'روز تقویمی' : 'Days'}</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">{isFa ? 'با برون‌سپاری اراک:' : 'With Subcontract:'}</span>
            <span className="text-emerald-300 font-bold bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
              +{rec.scheduleDelayDays} {isFa ? 'روز' : 'Days'}
            </span>
          </div>
        </div>

        {/* Card 2: Liquidated Damages at Risk */}
        <div className="bg-[#0b1220]/90 p-5 rounded-2xl border border-slate-800 hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              {isFa ? 'ریسک خسارت دیرکرد' : 'Penalty Exposure'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-rose-400 font-mono tracking-tight">
              {impact.penaltyExposureBaseCase?.value ?? (impact.totalPenaltyRiskIRR / 1000000000).toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-400">{isFa ? 'میلیارد ریال' : 'B IRR'}</span>
          </div>
          
          {/* Range Provenance */}
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between font-mono bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
            <span>{isFa ? 'بازه سناریویی:' : 'Range:'}</span>
            <span className="font-bold text-slate-200">
              {impact.penaltyExposureBestCase?.value ?? 5.9}B - {impact.penaltyExposureWorstCase?.value ?? 14.3}B IRR
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 truncate">{isFa ? 'بند ۱۴.۲ قرارداد TPPH' : 'Cl. 14.2 TPPH'}</span>
            <span className="text-rose-300 font-bold bg-rose-950/80 border border-rose-500/40 px-1.5 py-0.5 rounded">
              ۴۵۰ {isFa ? 'م.ریال/روز' : 'M/d'}
            </span>
          </div>
        </div>

        {/* Card 3: Milestone Cash Inflow at Risk */}
        <div className="bg-[#0b1220]/90 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              {isFa ? 'صورت‌وضعیت در معرض تعلیق' : 'Milestone Inflow at Risk'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono tracking-tight">
              {impact.invoiceMilestoneAtRisk?.value ?? (impact.delayedCashInflowIRR / 1000000000).toFixed(0)}
            </span>
            <span className="text-xs font-mono text-slate-400">{isFa ? 'میلیارد ریال' : 'B IRR'}</span>
          </div>

          {/* Working Capital Burn */}
          <div className="mt-2 text-[10px] text-cyan-300 flex items-center justify-between font-mono bg-cyan-950/50 px-2 py-1 rounded border border-cyan-500/30">
            <span>{isFa ? 'هزینه تامین مالی (۲۴٪):' : 'Financing Burn:'}</span>
            <span className="font-bold text-cyan-200">
              {impact.workingCapitalFinancingCost?.value ?? 1.8}B IRR
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 truncate">{isFa ? 'مرحله ۴: استکینگ و VPI' : 'M4: VPI & Stacking'}</span>
            <span className="text-cyan-300 font-bold">{isFa ? 'خرداد ۱۴۰۵' : 'June 2026'}</span>
          </div>
        </div>

        {/* Card 4: Bottleneck Machine Outage */}
        <div className="bg-[#0b1220]/90 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              {isFa ? 'توقف منبع گلوگاهی' : 'Bottleneck Machine'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              {impact.downtimeDays}
            </span>
            <span className="text-xs font-mono text-slate-400">{isFa ? 'روز توقف خط' : 'Downtime Days'}</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">{isFa ? 'ماشین آسیب‌دیده:' : 'Machine:'}</span>
            <span className="text-amber-300 font-bold truncate max-w-[140px]">PAMA Speedram 2000</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Disruption & Alternative Matrix + Critical Machine Monitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Golden Scenario Active Impact Card */}
        <div className="lg:col-span-2 bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <div>
                <h2 className="font-mono font-bold text-base sm:text-lg text-white tracking-wide">
                  {isFa ? 'تحلیل رخداد بحرانی جاری کارخانجات مپنا پارس' : 'Active Disruption Telemetry Profile'}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {isFa ? 'شناسه مرکز کاری SAP: ' : 'SAP Work Center: '} 
                  <span className="text-cyan-300 font-semibold">WC-MCH-BORING01</span> • PAMA Speedram 2000
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-rose-950/80 text-rose-300 border border-rose-500/40">
              {isFa ? 'توقف اضطراری اسپیندل' : 'Unplanned Outage'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#0e1626] p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1.5">{isFa ? 'پروژه بحرانی در خطر:' : 'Project at Risk:'}</span>
              <span className="font-bold text-slate-100 text-sm">
                {isFa ? 'ژنراتور ۱۶۰ مگاوات جهرم' : '160MW Generator Jahrom'}
              </span>
              <span className="text-slate-400 block mt-1">{isFa ? 'کارفرما: شرکت مادرتخصصی TPPH' : 'Client: TPPH'}</span>
            </div>

            <div className="bg-[#0e1626] p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1.5">{isFa ? 'قطعات سنگین متاثر:' : 'Affected Heavy Parts:'}</span>
              <span className="font-bold text-amber-300 text-sm">
                {isFa ? 'پوسته استاتور (۸۰ تن) + شفت' : 'Stator Frame (80t) + Shaft'}
              </span>
              <span className="text-slate-400 block mt-1 font-mono">{impact.affectedOperations.length} {isFa ? 'عملیات معلق' : 'Ops on hold'}</span>
            </div>

            <div className="bg-[#0e1626] p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1.5">{isFa ? 'حکم پیشنهادی شورا:' : 'Council Verdict:'}</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{decisionPackage.verdict}</span>
              </span>
              <span className="text-slate-300 font-semibold block mt-1">{isFa ? 'برون‌سپاری به ماشین‌سازی اراک' : 'Subcontract to Arak'}</span>
            </div>
          </div>

          {/* Evaluated Alternatives Quick Radar */}
          <div className="bg-[#0b1322] border border-cyan-500/20 p-4 sm:p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-slate-200 uppercase tracking-wider">
                {isFa ? 'گزینه‌های جایگزین ارزیابی‌شده توسط حل‌کننده ریاضی:' : 'Evaluated Feasible Alternatives:'}
              </span>
              <span className="text-cyan-300 text-xs font-mono font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                {isFa ? 'پروفایل استراتژیک: متوازن' : 'Profile: Balanced'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {decisionPackage.alternatives.slice(0, 2).map(alt => (
                <div 
                  key={alt.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alt.recommended 
                      ? 'bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border-emerald-400/50 text-emerald-100 shadow-md radar-glow-emerald' 
                      : 'bg-[#0e1626] border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate">{isFa ? alt.title : alt.titleEn}</span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
                      {alt.compositeScore} PTS
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{isFa ? 'تاخیر:' : 'Delay:'} +{alt.scheduleDelayDays} {isFa ? 'روز' : 'days'}</span>
                    <span className="font-bold text-slate-200">{isFa ? 'هزینه:' : 'Cost:'} {(alt.directCostIRR / 1000000000).toFixed(1)}B</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono">
            <button
              onClick={() => onNavigateTab('decision')}
              className="text-cyan-400 hover:text-cyan-200 font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>{isFa ? 'مشاهده ماتریس تفصیلی مقایسه ۴ سناریو و فرامین اجرایی SAP' : 'Inspect Full 4-Way Comparison & SAP Commands'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              onClick={onResetGoldenScenario}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>{isFa ? 'بازنشانی سناریوی اولیه' : 'Reset Scenario'}</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Critical Work Centers Telemetry Monitor */}
        <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h2 className="font-mono font-bold text-sm text-slate-100 tracking-wide">
                {isFa ? 'ایستگاه‌های کاری گلوگاهی کارخانه' : 'Critical Work Centers'}
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('simulator')}
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-200 cursor-pointer"
            >
              {isFa ? 'تغییر سناریو' : 'Simulate'}
            </button>
          </div>

          <div className="space-y-2.5">
            {resources.map(res => {
              const isDisrupted = res.currentStatus === 'DISRUPTED';
              return (
                <div 
                  key={res.resourceId}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isDisrupted 
                      ? 'bg-rose-950/50 border-rose-500/50 text-rose-100 radar-glow-rose' 
                      : 'bg-[#0e1626]/80 border-slate-800 text-slate-200 hover:bg-[#121c30]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold truncate max-w-[200px] text-slate-100">
                      {isFa ? res.name : res.nameEn}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isDisrupted 
                        ? 'bg-rose-900/70 text-rose-200 border border-rose-500/40' 
                        : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {res.currentStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span className="font-semibold text-cyan-300">{res.sapWorkCenter}</span>
                    <span>{isFa ? 'آمادگی عملیاتی: ' : 'Avail: '}{(res.operationalAvailability * 100).toFixed(0)}%</span>
                  </div>

                  {isDisrupted && (
                    <div className="mt-2 pt-2 border-t border-rose-500/30 text-rose-300 text-[11px] font-mono leading-relaxed">
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
              className="w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-[#0c1628] hover:bg-[#12203a] text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'مشاهده ساختار شکست و گراف وابستگی‌ها' : 'Explore Enterprise Graph'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Generator Project Portfolio Tactical Grid */}
      <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="font-mono font-bold text-base text-slate-100 tracking-wide">
              {isFa ? 'سبد پروژه‌های نیروگاهی فعال مپنا پارس' : 'Active Generator Project Portfolio'}
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('projects')}
            className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
          >
            <span>{isFa ? 'جزئیات ساختار شکست کار (WBS)' : 'WBS Details'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="text-slate-400 bg-[#0c1424] uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">{isFa ? 'کد SAP و عنوان پروژه' : 'SAP Project & Title'}</th>
                <th className="p-3.5">{isFa ? 'کارفرما' : 'Client'}</th>
                <th className="p-3.5">{isFa ? 'ظرفیت' : 'Rating'}</th>
                <th className="p-3.5">{isFa ? 'ارزش قرارداد' : 'Contract Value'}</th>
                <th className="p-3.5">{isFa ? 'موعد تحویل تعهدشده' : 'Contract Deadline'}</th>
                <th className="p-3.5">{isFa ? 'پیش‌بینی فعلی' : 'Forecast Finish'}</th>
                <th className="p-3.5">{isFa ? 'وضعیت' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {projects.map(proj => {
                const isCrit = proj.status === 'CRITICAL';
                return (
                  <tr key={proj.projectId} className="hover:bg-[#0e172a] transition">
                    <td className="p-3.5 font-bold text-slate-100">
                      <div>{isFa ? proj.name : proj.nameEn}</div>
                      <span className="text-[11px] font-mono font-medium text-cyan-400">{proj.sapProjectCode}</span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-medium">{isFa ? proj.client : proj.clientEn}</td>
                    <td className="p-3.5 font-mono font-bold text-cyan-300">{proj.powerRatingMW} MW</td>
                    <td className="p-3.5 font-mono text-slate-300">{(proj.contractValueIRR / 1000000000).toFixed(0)}B IRR</td>
                    <td className="p-3.5 font-mono text-slate-400">{proj.baselineDeliveryDate}</td>
                    <td className={`p-3.5 font-mono font-bold ${isCrit ? 'text-rose-400' : 'text-slate-200'}`}>
                      {proj.forecastDeliveryDate}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono ${
                        proj.status === 'CRITICAL' 
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                          : proj.status === 'AT_RISK'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
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
