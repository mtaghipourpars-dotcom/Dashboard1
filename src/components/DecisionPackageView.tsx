import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Layers, 
  CheckSquare, 
  Square, 
  UserCheck, 
  ArrowRight,
  Zap,
  HelpCircle,
  Scale,
  TrendingUp,
  Calculator,
  Shield,
  Sliders
} from 'lucide-react';
import { 
  Language, 
  DecisionPackage, 
  AlternativeOption, 
  StrategicProfile 
} from '../types';

interface DecisionPackageViewProps {
  lang: Language;
  decisionPackage: DecisionPackage;
  strategicProfile: StrategicProfile;
  onSelectStrategicProfile: (p: StrategicProfile) => void;
  onNavigateTab: (tab: string) => void;
  onApproveDecision: (notes: string) => void;
  onOverrideAlternative: (altId: string, reason: string) => void;
}

export const DecisionPackageView: React.FC<DecisionPackageViewProps> = ({
  lang,
  decisionPackage,
  strategicProfile,
  onSelectStrategicProfile,
  onNavigateTab,
  onApproveDecision,
  onOverrideAlternative
}) => {
  const isFa = lang === 'fa';
  const rec = decisionPackage.recommendedAlternative;
  const [selectedAlt, setSelectedAlt] = useState<AlternativeOption>(rec);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [overrideModalOpen, setOverrideModalOpen] = useState<boolean>(false);
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [selectedAltForOverride, setSelectedAltForOverride] = useState<string>('ALT-EXPEDITE-REPAIR');
  const [checkedPreconditions, setCheckedPreconditions] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false
  });

  const togglePrecondition = (idx: number) => {
    setCheckedPreconditions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleApprove = () => {
    setIsApproved(true);
    onApproveDecision(
      isFa 
        ? 'تایید رسمی مدیرعامل بر اساس حکم مشروط شورای اجرایی مجازی و تضمین رعایت پیش‌نیازهای کیفی.' 
        : 'Official CEO executive sign-off approving CONDITIONAL GO with enforced QA preconditions.'
    );
  };

  const handleOverrideSubmit = () => {
    if (!overrideReason.trim()) return;
    onOverrideAlternative(selectedAltForOverride, overrideReason);
    setOverrideModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Formal Executive Verdict Plaque */}
      <div className="bg-gradient-to-r from-[#071d17] via-[#092b23] to-[#0a1b2d] p-6 sm:p-7 rounded-2xl border-2 border-emerald-500/60 shadow-2xl relative overflow-hidden radar-glow-emerald">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500 text-slate-950 shadow-md flex items-center gap-1.5 tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>EXECUTIVE VERDICT: {decisionPackage.verdict}</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-[#071322] px-2.5 py-1 rounded border border-cyan-500/30">
                DOSSIER ID: {decisionPackage.decisionId}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-200 border border-cyan-400/30">
                {isFa ? 'ضریب اطمینان مدل:' : 'Model Confidence:'} {decisionPackage.confidenceScore}%
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{isFa ? 'بسته تصمیم هیئت مدیره: ' : 'Executive Decision Package: '}</span>
              <span className="text-emerald-300">
                {isFa ? rec.title : rec.titleEn}
              </span>
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm max-w-4xl leading-relaxed font-medium">
              {isFa ? decisionPackage.verdictReason : decisionPackage.verdictReasonEn}
            </p>
          </div>

          {/* Action Approval Command Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {isApproved ? (
              <div className="px-5 py-3.5 rounded-xl font-bold font-mono text-sm bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 flex items-center gap-2 shadow-xl">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>{isFa ? 'تصمیم تایید و در SAP ثبت شد' : 'Decision Approved & Enacted'}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={handleApprove}
                  className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition cursor-pointer border border-emerald-400/40"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{isFa ? 'تایید و ابلاغ تصمیم (Sign-Off)' : 'Approve Decision'}</span>
                </button>

                <button
                  onClick={() => setOverrideModalOpen(true)}
                  className="px-4 py-3.5 rounded-xl font-bold font-mono text-xs bg-[#0b1424] hover:bg-[#12203a] text-amber-300 border border-amber-500/40 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>{isFa ? 'تغییر دستی تصمیم (Override)' : 'Override'}</span>
                </button>

                <a
                  href="/MAPNA_Pars_Mission_Control_System_Manual.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl font-bold font-mono text-xs bg-[#0b1424] hover:bg-[#12203a] text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  title={isFa ? 'مشاهده و دانلود سند جامع راهنما، معماری و مصوبه هیئت مدیره (PDF/HTML)' : 'Download/Print Comprehensive System Manual & Dossier PDF'}
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? 'سند جامع (PDF)' : 'Dossier (PDF)'}</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Disruption Context Summary Bar */}
      <div className="bg-[#0a0f1a]/95 p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-200">
              {isFa ? 'خلاصه ردپای شوک عملیاتی در زنجیره ارزش:' : 'Disruption Impact Footprint:'}
            </span>
            <span className="text-cyan-300 font-mono font-bold bg-[#0c1628] px-2.5 py-0.5 rounded border border-cyan-500/30">
              PAMA Boring CNC • 20 Days Unavailable
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-400">{isFa ? 'عملیات‌های معلق:' : 'Affected Ops:'} <strong className="text-amber-400 font-bold">{decisionPackage.impact.affectedOperations.length}</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{isFa ? 'سفارشات ساخت:' : 'Orders:'} <strong className="text-amber-400 font-bold">{decisionPackage.impact.affectedProductionOrders.length}</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{isFa ? 'مایل‌استون‌ها:' : 'Milestones:'} <strong className="text-rose-400 font-bold">2</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{isFa ? 'تعهدات قراردادی:' : 'Commitments:'} <strong className="text-rose-400 font-bold">3</strong></span>
          </div>
        </div>

        {/* Strategic Profile Sensitivity Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-mono font-bold">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>{isFa ? 'پروفایل اولویت‌های استراتژیک هیئت مدیره:' : 'Active Strategic Objective Profile:'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'BALANCED', labelFa: 'متوازن (Balanced)', labelEn: 'Balanced' },
              { id: 'CASH_CRISIS', labelFa: 'بحران نقدینگی (Cash Crisis)', labelEn: 'Cash Crisis' },
              { id: 'DELIVERY_CRISIS', labelFa: 'حیثیت تحویل (Delivery Crisis)', labelEn: 'Delivery Crisis' },
              { id: 'MARGIN_PROTECTION', labelFa: 'حفظ سود (Margin)', labelEn: 'Margin Protection' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => onSelectStrategicProfile(p.id as StrategicProfile)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  strategicProfile === p.id 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg border border-cyan-400/50 radar-glow-cyan'
                    : 'bg-[#0d1524] text-slate-300 hover:bg-[#131f36] border border-slate-800'
                }`}
              >
                {isFa ? p.labelFa : p.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Way Alternatives Comparative Scorecard Table */}
      <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="font-mono font-bold text-base text-slate-100 tracking-wide">
                {isFa ? 'موتور ارزیابی دومرحله‌ای گزینه‌ها (Two-Stage Decision Engine)' : 'Two-Stage Alternative Evaluation Engine'}
              </h2>
              <span className="text-xs text-slate-400">
                {isFa 
                  ? 'مرحله ۱: گیت‌های امکان‌سنجی قطعی (ظرفیت، تلرانس کیفی، کار و لجستیک) ← مرحله ۲: بهینه‌سازی اقتصادی ارزش خالص' 
                  : 'Stage 1: Feasibility Hard Gates (Capacity, Quality, Labor, Logistics) → Stage 2: Net Economic Value Optimization'}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 bg-[#0c1628] px-2.5 py-1 rounded border border-cyan-500/30 shrink-0">
            {isFa ? 'اعتبارسنجی قطعی گیت‌ها' : 'Deterministic Gate Verification'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="text-slate-400 bg-[#0c1424] font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">{isFa ? 'گزینه اقدام جایگزین' : 'Alternative Action'}</th>
                <th className="p-3">{isFa ? 'گیت امکان‌سنجی' : 'Feasibility Gate'}</th>
                <th className="p-3">{isFa ? 'هزینه مستقیم' : 'Direct Cost'}</th>
                <th className="p-3">{isFa ? 'تاخیر' : 'Delay'}</th>
                <th className="p-3">{isFa ? 'جریمه تاخیر' : 'Penalty'}</th>
                <th className="p-3">{isFa ? 'هزینه فرصت سازمانی' : 'Opportunity Cost'}</th>
                <th className="p-3">{isFa ? 'ارزش خالص خلق‌شده' : 'Net Value Created'}</th>
                <th className="p-3">{isFa ? 'امتیاز' : 'Score'}</th>
                <th className="p-3">{isFa ? 'حکم موتور' : 'Verdict'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {decisionPackage.alternatives.map((alt) => {
                const isRec = alt.recommended;
                const isFeasible = alt.isFeasible !== false;
                const oppCostBillion = ((alt.enterpriseOpportunityCostIRR ?? 0) / 1000000000).toFixed(1);
                const netValueBillion = ((alt.netEnterpriseValueCreatedIRR ?? 0) / 1000000000).toFixed(1);
                const isNetPositive = (alt.netEnterpriseValueCreatedIRR ?? 0) > 0;

                return (
                  <tr 
                    key={alt.id}
                    onClick={() => setSelectedAlt(alt)}
                    className={`cursor-pointer transition ${
                      !isFeasible
                        ? 'bg-rose-950/20 hover:bg-rose-950/40 text-slate-400'
                        : isRec 
                        ? 'bg-emerald-950/30 hover:bg-emerald-950/50 font-semibold' 
                        : selectedAlt.id === alt.id
                        ? 'bg-cyan-950/40'
                        : 'hover:bg-[#0e172a]'
                    }`}
                  >
                    <td className="p-3 text-slate-100 max-w-[240px]">
                      <div className="flex items-center gap-2">
                        {isRec && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {!isFeasible && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                        <span className={`font-bold ${!isFeasible ? 'text-rose-300' : 'text-slate-100'}`}>
                          {isFa ? alt.title : alt.titleEn}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 block mt-0.5">{alt.id}</span>
                    </td>
                    <td className="p-3">
                      {isFeasible ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                          {isFa ? 'پاس ۵ گیت ✓' : '5 Gates Passed ✓'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
                          {isFa ? 'رد در گیت ✕' : 'Disqualified ✕'}
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-200 font-bold">
                      {(alt.directCostIRR / 1000000000).toFixed(1)}B
                    </td>
                    <td className="p-3 font-mono font-black">
                      <span className={alt.scheduleDelayDays <= 5 ? 'text-emerald-400' : 'text-rose-400'}>
                        +{alt.scheduleDelayDays} {isFa ? 'روز' : 'd'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-rose-400 font-semibold">
                      {(alt.penaltiesIncurredIRR / 1000000000).toFixed(1)}B
                    </td>
                    <td className="p-3 font-mono font-bold">
                      {isFeasible ? (
                        <span className={(alt.enterpriseOpportunityCostIRR ?? 0) > 0 ? 'text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40' : 'text-emerald-400 font-medium'}>
                          {oppCostBillion}B
                        </span>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </td>
                    <td className="p-3 font-mono font-black">
                      {isFeasible ? (
                        <span className={`inline-flex items-center gap-0.5 ${isNetPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isNetPositive ? '+' : ''}{netValueBillion}B IRR
                        </span>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </td>
                    <td className="p-3 font-mono font-black text-sm">
                      {isFeasible ? (
                        <span className={isRec ? 'text-emerald-400 font-black text-base' : 'text-slate-200'}>
                          {alt.compositeScore}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-normal">0</span>
                      )}
                    </td>
                    <td className="p-3">
                      {!isFeasible ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-rose-900 text-rose-200 border border-rose-500/50">
                          DISQ
                        </span>
                      ) : isRec ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-emerald-600 text-slate-950 font-black tracking-wider shadow-md">
                          RECOMMENDED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 text-slate-400 border border-slate-700">
                          FEASIBLE
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Alternative Deep-Dive Feasibility Panel */}
        {selectedAlt && (
          <div className="mt-4 p-4.5 rounded-xl bg-[#0d1628] border border-cyan-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-slate-200">
                  {isFa ? 'جزئیات گیت‌های امکان‌سنجی برای گزینه انتخابی:' : 'Feasibility Gate Breakdown for Selected Alternative:'}
                </span>
                <span className="font-mono text-xs font-bold text-cyan-300">
                  {isFa ? selectedAlt.title : selectedAlt.titleEn}
                </span>
              </div>
              {selectedAlt.isFeasible === false && (
                <span className="text-xs font-mono text-rose-300 font-bold bg-rose-950/80 px-2.5 py-0.5 rounded border border-rose-500/40">
                  {isFa ? 'این گزینه به دلیل نقض خط قرمز فنی واجد شرایط نیست' : 'Disqualified on Technical Redlines'}
                </span>
              )}
            </div>

            {selectedAlt.feasibilityGateChecks && selectedAlt.feasibilityGateChecks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                {selectedAlt.feasibilityGateChecks.map((gate, gIdx) => (
                  <div 
                    key={gIdx} 
                    className={`p-3 rounded-lg border ${
                      !gate.passed 
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' 
                        : gate.severity === 'WARNING'
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                        : 'bg-[#080d18] border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 font-bold text-[11px] font-mono">
                      <span>{isFa ? gate.gateName : gate.gateNameEn}</span>
                      <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                        !gate.passed ? 'bg-rose-900 text-rose-200' : 'bg-emerald-900 text-emerald-200'
                      }`}>
                        {gate.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                      {isFa ? gate.rationale : gate.rationaleEn}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-mono">{isFa ? 'گیت‌های اعتبارسنجی پاس شده است.' : 'Standard operational gates passed.'}</p>
            )}
          </div>
        )}
      </div>

      {/* CEO & CFO Strategic Decision Intelligence Terminal */}
      <div className="bg-[#0a0f1a]/95 text-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-mono font-bold tracking-tight text-white flex items-center gap-2">
                <span>{isFa ? 'هوش راهبردی تصمیم مدیرعامل و معاونت مالی (CEO/CFO Decision Intelligence)' : 'CEO/CFO Executive Decision Intelligence'}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  VOI & Opportunity Cost Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">
                {isFa 
                  ? 'پاسخ به سوال محوری: چه مسیرهایی وجود دارد، چه تعهدات دیگری را تحت تاثیر قرار می‌دهد و کدام مسیر بیشترین ارزش اقتصادی خالص را خلق می‌کند؟' 
                  : 'Answers: Available paths, ripple commitments affected, and the pathway maximizing net realizable economic value.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0d1628] text-cyan-300 border border-cyan-500/30">
              {isFa ? 'نرخ تنزیل سرمایه: ۲۴٪ سالانه' : 'Cost of Capital: 24%'}
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Critical Missing Info vs Opportunity Cost Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Critical Missing Information & Value of Information (VOI) */}
          <div className="bg-[#080d18] rounded-xl p-5 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-amber-400">
                <HelpCircle className="w-4 h-4" />
                <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-100">
                  {isFa ? 'ارزش اطلاعات ناقص و متغیرهای حیاتی (Value of Information)' : 'Critical Missing Information & Sensitivity'}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                {isFa ? 'ضریب قطعیت:' : 'Confidence:'} {selectedAlt.decisionConfidencePct ?? 92}%
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="bg-[#0b1322] p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-sans">
                  {isFa ? 'متغیر ناقص کلیدی (Critical Missing Variable):' : 'Key Information Gap:'}
                </span>
                <span className="font-mono text-xs font-bold text-amber-300">
                  {isFa 
                    ? (selectedAlt.criticalMissingInformation?.variable ?? 'تاییدیه قطعی بازه زمانی خالی ماشین‌کاری در کارخانه پیمانکار (اراک)')
                    : (selectedAlt.criticalMissingInformation?.variableEn ?? 'Contractor open machining window confirmation')}
                </span>
              </div>

              <div className="space-y-1 font-sans">
                <span className="text-[11px] text-slate-400 block font-mono">
                  {isFa ? 'اثر بر انتخاب مسیر (Impact on Decision):' : 'Decision Impact:'}
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {isFa 
                    ? (selectedAlt.criticalMissingInformation?.impactOnChoice ?? 'در صورت عدم هماهنگی شیفت‌های آزاد پیمانکار، برتری برون‌سپاری از بین رفته و تعمیر اضطراری داخلی در اولویت قرار می‌گیرد.')
                    : (selectedAlt.criticalMissingInformation?.impactOnChoiceEn ?? 'If free machining capacity is unconfirmed, decision priority switches to in-house overhaul.')}
                </p>
              </div>

              <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-lg space-y-1">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isFa ? 'آستانه تغییر تصمیم (Decision Flip Threshold):' : 'Decision Flip Threshold:'}</span>
                </span>
                <p className="text-amber-100 text-[11px] leading-relaxed font-sans">
                  {isFa 
                    ? (selectedAlt.criticalMissingInformation?.flipThreshold ?? 'ظرفیت خالی کمتر از ۷۰ ساعت یا تاخیر ترخیص ترافیکی جاده‌ای بیش از ۵ روز')
                    : (selectedAlt.criticalMissingInformation?.flipThresholdEn ?? 'Free window < 70 hours or road transit clearance delay > 5 days')}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Enterprise Opportunity Cost & Cannibalization Analysis */}
          <div className="bg-[#080d18] rounded-xl p-5 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <TrendingUp className="w-4 h-4" />
                <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-100">
                  {isFa ? 'هزینه فرصت سازمانی و عدم آسیب به پروژه‌ها (Opportunity Cost)' : 'Enterprise Opportunity Cost & Cannibalization'}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                Multi-Project Defense
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="bg-[#0b1322] p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{isFa ? 'هزینه فرصت گزینه جاری:' : 'Selected Alt Opportunity Cost:'}</span>
                  <span className="font-mono text-sm font-black text-amber-400">
                    {((selectedAlt.enterpriseOpportunityCostIRR ?? 0) / 1000000000).toFixed(2)}B IRR
                  </span>
                </div>

                <div className="bg-[#0b1322] p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{isFa ? 'ارزش خالص خلق‌شده:' : 'Net Value Created:'}</span>
                  <span className={`font-mono text-sm font-black ${(selectedAlt.netEnterpriseValueCreatedIRR ?? 0) > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {(selectedAlt.netEnterpriseValueCreatedIRR ?? 0) > 0 ? '+' : ''}
                    {((selectedAlt.netEnterpriseValueCreatedIRR ?? 0) / 1000000000).toFixed(2)}B IRR
                  </span>
                </div>
              </div>

              {/* Comparative Cannibalization Insight */}
              <div className="p-3 rounded-lg bg-[#0b1322] border border-slate-800 space-y-1.5 text-[11px] text-slate-300 leading-relaxed font-sans">
                <span className="font-mono font-bold text-slate-100 block">
                  {isFa ? 'مقایسه هزینه فرصت گزینه‌ها در کل سبد تعهدات مپنا پارس:' : 'Portfolio Cannibalization Comparison:'}
                </span>
                <ul className="space-y-1 list-disc list-inside text-slate-300">
                  <li>
                    <strong className="text-emerald-300 font-mono">{isFa ? 'برون‌سپاری به اراک:' : 'Outsource Arak:'}</strong> {isFa ? 'هزینه فرصت صفر (۰ ریال). هیچ پروژه‌ای قربانی نمی‌شود.' : 'Zero opportunity cost. Zero project cannibalization.'}
                  </li>
                  <li>
                    <strong className="text-rose-300 font-mono">{isFa ? 'بازتخصیص به والدریش:' : 'Reallocate Waldrich:'}</strong> {isFa ? 'هزینه فرصت ۳.۱۵ میلیارد ریالی ناشی از ۶ روز تاخیر روی شفت سد کارون (ارزش خالص منفی ۰.۱۰B ریال - تخریب ثروت).' : '3.15B IRR opportunity cost via 6-day delay on Karun Dam Hydro shaft (Negative net value -0.10B IRR).'}
                  </li>
                  <li>
                    <strong className="text-amber-300 font-mono">{isFa ? 'تعمیر داخلی فشرده:' : 'Expedited In-House:'}</strong> {isFa ? 'هزینه فرصت ۰.۹ میلیارد ریالی با اشغال ظرفیت روتور کلاس F خرم‌آباد.' : '0.90B IRR opportunity cost impacting Class F Khorramabad rotor.'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Financial Calculation Lineage & Provenance Bar */}
        <div className="p-4 rounded-xl bg-[#060a12] border border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px]">
            <Calculator className="w-3.5 h-3.5" />
            <span className="font-bold text-slate-200">{isFa ? 'تبارشناسی فرمول محاسبات مالی (Calculation Lineage):' : 'Financial Calculation Lineage:'}</span>
          </div>
          <p className="font-mono text-[11px] text-cyan-300/90 leading-relaxed bg-[#0a1120] p-2.5 rounded-lg border border-cyan-500/20">
            {selectedAlt.calculationLineage ?? 'Net Value = (Penalties Avoided [8.10B]) - (Direct Cost [3.40B]) - (Opportunity Cost [0.00B]) - (Financing Cost of Capital [1.35B]) = +5.20B IRR'}
          </p>
        </div>
      </div>

      {/* Two-Column Deep-Dive: Preconditions & SAP Work Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Preconditions Checklist */}
        <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="font-mono font-bold text-base text-slate-100">
                {isFa ? 'پیش‌نیازهای اجرایی حکم مشروط (Preconditions Checklist)' : 'Enforced Preconditions Checklist'}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-500/40">
              {Object.values(checkedPreconditions).filter(Boolean).length} / {decisionPackage.prerequisites.length} {isFa ? 'محقق‌شده' : 'Fulfilled'}
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            {isFa 
              ? 'حکم شورا منوط به تحقق و تایید موارد زیر پیش از شروع بارگیری قطعه استاتور به سمت اراک است:'
              : 'The Council verdict is strictly contingent upon fulfilling these operational conditions:'}
          </p>

          <div className="space-y-2.5">
            {(isFa ? decisionPackage.prerequisites : decisionPackage.prerequisitesEn).map((prereq, idx) => {
              const isChecked = checkedPreconditions[idx] || false;
              return (
                <div
                  key={idx}
                  onClick={() => togglePrecondition(idx)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-start gap-3 transition-all ${
                    isChecked 
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-medium' 
                      : 'bg-[#0e1626] border-slate-800 text-slate-300 hover:bg-[#131f36]'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <span className="leading-relaxed font-sans">{prereq}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>{isFa ? 'مسئول پیگیری: مهندس کاظمی (معاونت تولید و عملیات)' : 'Owner: COO Eng. Kazemi'}</span>
            <button
              onClick={() => onNavigateTab('council')}
              className="text-cyan-400 hover:text-cyan-200 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>{isFa ? 'مشاهده چالش‌های شورای مدیران' : 'View Council Deliberation'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Right Col: Actionable SAP Execution Instructions */}
        <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono font-bold text-base text-slate-100">
                {isFa ? 'دستورالعمل‌های مستقیم به سیستم SAP S/4HANA' : 'SAP S/4HANA Execution Work Instructions'}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
              Ready for Export
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            {isFa 
              ? 'دستورات تراکنشی استاندارد جهت ثبت تغییرات توسط کارشناسان برنامه‌ریزی تولید، خرید و مالی در SAP:'
              : 'Standard system transactions to be executed by SAP PP/MM/PS key users:'}
          </p>

          <div className="space-y-2.5 font-mono text-xs">
            {selectedAlt.sapExecutionInstructions.map((step, idx) => (
              <div key={idx} className="bg-[#0e1626] p-3.5 rounded-xl border border-slate-800 text-slate-200 flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                <span className="text-[11px] leading-relaxed font-sans font-medium text-slate-300">{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>{isFa ? 'سیستم مبدا: SAP S/4HANA On-Premise' : 'Source: SAP S/4HANA'}</span>
            <button
              onClick={() => onNavigateTab('sap')}
              className="text-cyan-400 hover:text-cyan-200 font-bold cursor-pointer"
            >
              {isFa ? 'مشاهده ساختار جداول و نگاشت کانونیکال ←' : 'Inspect SAP Blueprint →'}
            </button>
          </div>
        </div>

      </div>

      {/* Human Override Modal */}
      {overrideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border-2 border-amber-500/50 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 radar-glow-amber">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-mono font-bold text-lg text-white">
                  {isFa ? 'تغییر دستی تصمیم توسط مدیر (Human Override)' : 'Executive Decision Override'}
                </h3>
              </div>
              <button 
                onClick={() => setOverrideModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              {isFa 
                ? 'مطابق اصل حاکمیت انسانی (System of Authority)، مدیر حق رد تصمیم پیشنهادی سامانه و انتخاب سناریوی دیگر را دارد. این اقدام در تاریخچه ممیزی (Audit Log) همراه با ادله ثبت خواهد شد.'
                : 'As the System of Authority, management can override the AI recommendation. All overrides require mandatory justification recorded in the Audit Log.'}
            </p>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-200 font-mono font-bold mb-1.5">
                  {isFa ? 'انتخاب سناریوی جایگزین مورد نظر:' : 'Select Desired Alternative:'}
                </label>
                <select
                  aria-label="Alternative Selection"
                  value={selectedAltForOverride}
                  onChange={e => setSelectedAltForOverride(e.target.value)}
                  className="w-full bg-[#070c16] border border-slate-700 rounded-xl p-3 text-slate-100 font-mono font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  {decisionPackage.alternatives.map(a => (
                    <option key={a.id} value={a.id}>
                      {isFa ? a.title : a.titleEn} (Delay: +{a.scheduleDelayDays}d)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-200 font-mono font-bold mb-1.5">
                  {isFa ? 'دلایل مدیریتی و فنی رد تصمیم پیشنهادی (الزامی):' : 'Executive Justification (Mandatory):'}
                </label>
                <textarea
                  rows={3}
                  value={overrideReason}
                  onChange={e => setOverrideReason(e.target.value)}
                  placeholder={isFa ? 'مثلاً: ریسک حمل جاده‌ای بوژی سنگین غیرقابل‌قبول است و تسریع تعمیرات داخلی ترجیح داده می‌شود...' : 'e.g. Heavy road transit risk is intolerable; internal overhaul preferred...'}
                  className="w-full bg-[#070c16] border border-slate-700 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800">
              <button
                onClick={() => setOverrideModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                {isFa ? 'انصراف' : 'Cancel'}
              </button>
              <button
                onClick={handleOverrideSubmit}
                disabled={!overrideReason.trim()}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 cursor-pointer shadow-md transition"
              >
                {isFa ? 'ثبت و اعمال تغییر (Save Override)' : 'Confirm Override'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
