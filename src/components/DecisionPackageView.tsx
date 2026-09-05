import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Send, 
  Layers, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Cpu,
  UserCheck,
  CheckSquare,
  Square,
  HelpCircle,
  ExternalLink
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
      
      {/* Top Banner: Formal Executive Verdict */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>VERDICT: {decisionPackage.verdict}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                ID: {decisionPackage.decisionId}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Confidence: {decisionPackage.confidenceScore}%
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isFa ? 'بسته تصمیم اجرایی: ' : 'Executive Decision Package: '}
              <span className="text-emerald-400">
                {isFa ? rec.title : rec.titleEn}
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-4xl leading-relaxed">
              {isFa ? decisionPackage.verdictReason : decisionPackage.verdictReasonEn}
            </p>
          </div>

          {/* Action Approval Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {isApproved ? (
              <div className="px-5 py-3 rounded-xl font-bold text-sm bg-emerald-600/20 border border-emerald-500 text-emerald-300 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>{isFa ? 'تصمیم تایید و ثبت شد' : 'Decision Approved & Logged'}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={handleApprove}
                  className="px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isFa ? 'تایید و ابلاغ تصمیم (Sign-Off)' : 'Approve Decision'}</span>
                </button>

                <button
                  onClick={() => setOverrideModalOpen(true)}
                  className="px-4 py-3 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isFa ? 'تغییر دستی تصمیم (Override)' : 'Override'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Disruption Context Summary Box */}
      <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">
              {isFa ? 'خلاصه انتشار شوک عملیاتی در سیستم:' : 'Disruption Impact Footprint:'}
            </span>
            <span className="text-slate-400 font-mono">
              PAMA Boring CNC • 20 Days Unavailable
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <span className="text-slate-400">{isFa ? 'عملیات‌های معلق:' : 'Affected Ops:'} <strong className="text-amber-400">{decisionPackage.impact.affectedOperations.length}</strong></span>
            <span>•</span>
            <span className="text-slate-400">{isFa ? 'سفارشات ساخت:' : 'Orders:'} <strong className="text-amber-400">{decisionPackage.impact.affectedProductionOrders.length}</strong></span>
            <span>•</span>
            <span className="text-slate-400">{isFa ? 'مایل‌استون‌ها:' : 'Milestones:'} <strong className="text-rose-400">2</strong></span>
            <span>•</span>
            <span className="text-slate-400">{isFa ? 'تعهدات قراردادی:' : 'Commitments:'} <strong className="text-rose-400">3</strong></span>
          </div>
        </div>

        {/* Strategic Profile Sensitivity Switcher */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-300 font-semibold">
            {isFa ? 'پروفایل استراتژیک شبیه‌سازی وزن‌ها (Strategic Profile):' : 'Active Strategic Objective Profile:'}
          </span>
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  strategicProfile === p.id 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {isFa ? p.labelFa : p.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Way Alternatives Comparative Scorecard Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-base text-white">
              {isFa ? 'ماتریس مقایسه سناریوهای ۴ گانه مهار بحران' : '4-Way Mitigation Alternatives Comparative Scorecard'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {isFa ? 'الگوریتم بهینه‌سازی: OR-Tools + تئوری صف' : 'Solver: Google OR-Tools + SimPy'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="text-slate-400 bg-slate-950/70 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3">{isFa ? 'گزینه اقدام جایگزین' : 'Alternative Action'}</th>
                <th className="p-3">{isFa ? 'استراتژی' : 'Strategy'}</th>
                <th className="p-3">{isFa ? 'هزینه مستقیم' : 'Direct Cost'}</th>
                <th className="p-3">{isFa ? 'تاخیر پروژه' : 'Schedule Delay'}</th>
                <th className="p-3">{isFa ? 'جریمه دیرکرد' : 'Penalty Incurred'}</th>
                <th className="p-3">{isFa ? 'اثر بر نقدینگی' : 'Cash Flow Impact'}</th>
                <th className="p-3">{isFa ? 'ریسک فنی' : 'Technical Risk'}</th>
                <th className="p-3">{isFa ? 'امتیاز شایستگی' : 'Composite Score'}</th>
                <th className="p-3">{isFa ? 'وضعیت' : 'Verdict'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {decisionPackage.alternatives.map((alt) => {
                const isRec = alt.recommended;
                return (
                  <tr 
                    key={alt.id}
                    onClick={() => setSelectedAlt(alt)}
                    className={`cursor-pointer transition ${
                      isRec 
                        ? 'bg-emerald-950/20 hover:bg-emerald-950/30' 
                        : selectedAlt.id === alt.id
                        ? 'bg-cyan-950/20'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-3 font-semibold text-slate-200 max-w-[240px]">
                      <div className="flex items-center gap-2">
                        {isRec && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        <span className="truncate">{isFa ? alt.title : alt.titleEn}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{alt.id}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-300">{alt.strategy}</td>
                    <td className="p-3 font-mono text-slate-200">
                      {(alt.directCostIRR / 1000000000).toFixed(1)}B IRR
                    </td>
                    <td className="p-3 font-mono font-bold">
                      <span className={alt.scheduleDelayDays <= 5 ? 'text-emerald-400' : 'text-rose-400'}>
                        +{alt.scheduleDelayDays} {isFa ? 'روز' : 'days'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-rose-300">
                      {(alt.penaltiesIncurredIRR / 1000000000).toFixed(1)}B IRR
                    </td>
                    <td className="p-3 font-mono text-slate-300">
                      {(alt.cashImpactDeltaIRR / 1000000000).toFixed(1)}B IRR
                    </td>
                    <td className="p-3 font-mono text-slate-300">
                      {alt.technicalRisk} / 5.0
                    </td>
                    <td className="p-3 font-mono font-bold text-sm">
                      <span className={isRec ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}>
                        {alt.compositeScore}
                      </span>
                    </td>
                    <td className="p-3">
                      {isRec ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          RECOMMENDED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
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
      </div>

      {/* Two-Column Deep-Dive: Preconditions & SAP Work Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Preconditions Checklist */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">
                {isFa ? 'پیش‌نیازهای اجرایی حکم مشروط (Preconditions Checklist)' : 'Enforced Preconditions Checklist'}
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-400">
              {Object.values(checkedPreconditions).filter(Boolean).length} / {decisionPackage.prerequisites.length} {isFa ? 'محقق‌شده' : 'Fulfilled'}
            </span>
          </div>

          <p className="text-slate-400 text-xs">
            {isFa 
              ? 'حکم شورا منوط به تحقق و تایید موارد زیر پیش از شروع بارگیری قطعه استاتور به سمت اراک است:'
              : 'The Council verdict is strictly contingent upon fulfilling these operational conditions:'}
          </p>

          <div className="space-y-3">
            {(isFa ? decisionPackage.prerequisites : decisionPackage.prerequisitesEn).map((prereq, idx) => {
              const isChecked = checkedPreconditions[idx] || false;
              return (
                <div
                  key={idx}
                  onClick={() => togglePrecondition(idx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start gap-3 transition ${
                    isChecked 
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <span className="leading-relaxed">{prereq}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
            <span>{isFa ? 'مسئول پیگیری: مهندس کاظمی (معاونت تولید)' : 'Owner: COO Eng. Kazemi'}</span>
            <button
              onClick={() => onNavigateTab('council')}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>{isFa ? 'مشاهده چالش‌های شورای مجازی' : 'View Council Deliberation'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Right Col: Actionable SAP Execution Instructions */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-sm text-white">
                {isFa ? 'دستورالعمل‌های مستقیم به سیستم SAP S/4HANA' : 'SAP S/4HANA Execution Work Instructions'}
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
              Ready for Export
            </span>
          </div>

          <p className="text-slate-400 text-xs">
            {isFa 
              ? 'دستورات تراکنشی استاندارد جهت ثبت تغییرات توسط کارشناسان برنامه‌ریزی تولید و خرید در SAP:'
              : 'Standard system transactions to be executed by SAP PP/MM/PS key users:'}
          </p>

          <div className="space-y-3 font-mono text-xs">
            {selectedAlt.sapExecutionInstructions.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-slate-200 flex items-start gap-2">
                <span className="text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                <span className="text-[11px] leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">{isFa ? 'سیستم مبدا: SAP S/4HANA On-Premise' : 'Source: SAP S/4HANA'}</span>
            <button
              onClick={() => onNavigateTab('sap')}
              className="text-cyan-400 hover:underline"
            >
              {isFa ? 'مشاهده ساختار جداول و نگاشت کانونیکال ←' : 'Inspect SAP Blueprint →'}
            </button>
          </div>
        </div>

      </div>

      {/* Human Override Modal */}
      {overrideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-bold text-base text-white">
                  {isFa ? 'تغییر دستی تصمیم توسط مدیر (Human Override)' : 'Executive Decision Override'}
                </h3>
              </div>
              <button 
                onClick={() => setOverrideModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {isFa 
                ? 'مطابق اصل حاکمیت انسانی (System of Authority)، مدیر حق رد تصمیم پیشنهادی سامانه و انتخاب سناریوی دیگر را دارد. این اقدام در تاریخچه ممیزی (Audit Log) همراه با ادله ثبت خواهد شد.'
                : 'As the System of Authority, management can override the AI recommendation. All overrides require mandatory justification recorded in the Audit Log.'}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isFa ? 'انتخاب سناریوی جایگزین مورد نظر:' : 'Select Desired Alternative:'}
                </label>
                <select
                  aria-label="Alternative Selection"
                  value={selectedAltForOverride}
                  onChange={e => setSelectedAltForOverride(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                >
                  {decisionPackage.alternatives.map(a => (
                    <option key={a.id} value={a.id}>
                      {isFa ? a.title : a.titleEn} (Delay: +{a.scheduleDelayDays}d)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isFa ? 'دلایل مدیریتی و فنی رد تصمیم پیشنهادی (الزامی):' : 'Executive Justification (Mandatory):'}
                </label>
                <textarea
                  rows={3}
                  value={overrideReason}
                  onChange={e => setOverrideReason(e.target.value)}
                  placeholder={isFa ? 'مثلاً: ریسک حمل جاده‌ای قطعه ۸۰ تنی غیرقابل‌قبول است و تعمیرات داخلی ترجیح داده می‌شود...' : 'e.g. Heavy road transit risk is intolerable; internal overhaul preferred...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setOverrideModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                {isFa ? 'انصراف' : 'Cancel'}
              </button>
              <button
                onClick={handleOverrideSubmit}
                disabled={!overrideReason.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50"
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
