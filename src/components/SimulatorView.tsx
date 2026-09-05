import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Layers
} from 'lucide-react';
import { 
  Language, 
  DisruptionInput, 
  StrategicProfile, 
  ResourceNode, 
  ImpactSummary, 
  DecisionPackage 
} from '../types';

interface SimulatorViewProps {
  lang: Language;
  disruption: DisruptionInput;
  strategicProfile: StrategicProfile;
  resources: ResourceNode[];
  impact: ImpactSummary;
  decisionPackage: DecisionPackage;
  onRunSimulation: (input: DisruptionInput, profile: StrategicProfile) => void;
  onResetGoldenScenario: () => void;
  onNavigateTab: (tab: string) => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  lang,
  disruption,
  strategicProfile,
  resources,
  impact,
  decisionPackage,
  onRunSimulation,
  onResetGoldenScenario,
  onNavigateTab
}) => {
  const isFa = lang === 'fa';

  const [selectedResourceId, setSelectedResourceId] = useState<string>(disruption.resourceId);
  const [downtimeDays, setDowntimeDays] = useState<number>(disruption.downtimeDays);
  const [cause, setCause] = useState<string>(disruption.cause);
  const [selectedProfile, setSelectedProfile] = useState<StrategicProfile>(strategicProfile);

  const disruptionCauses = isFa ? [
    'خرابی هیدرولیک و بلبرینگ‌های دور بالای اسپیندل اصلی (توقف اضطراری نت)',
    'قطعی برنامه‌ریزی‌شده برق شبکه سراسری (پیک بار تابستانه وزارت نیرو)',
    'تاخیر در ترخیص گمرکی سیل‌های هیدرولیکی آلمانی به دلیل فرآیند تخصیص ارز',
    'آسیب‌دیدگی کابل‌کشی قدرت و خطای درایو زیمنس Sinumerik 840D',
    'تعمیرات پیشگیرانه اساسی سالانه (اورهال اساسی)'
  ] : [
    'Main Spindle Hydraulic & high-speed bearings failure (Emergency PM)',
    'Scheduled national grid power curtailment (Ministry of Energy summer peak)',
    'Customs clearance delay of German hydraulic seals due to FX allocation',
    'Power cabling failure & Siemens Sinumerik 840D drive alarm',
    'Annual scheduled major preventative overhaul'
  ];

  const handleSimulateClick = () => {
    const chosenResource = resources.find(r => r.resourceId === selectedResourceId);
    const newDisruption: DisruptionInput = {
      resourceId: selectedResourceId,
      resourceName: chosenResource ? chosenResource.name : 'Unknown Machine',
      downtimeDays,
      cause,
      startDate: new Date().toISOString().slice(0, 10),
      estimatedResolutionDate: new Date(Date.now() + downtimeDays * 86400000).toISOString().slice(0, 10)
    };

    onRunSimulation(newDisruption, selectedProfile);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'شبیه‌ساز شوک‌های صنعتی و سناریوهای مهار' : 'Industrial Disruption Simulator'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isFa ? 'میز آزمایش شوک عملیاتی و ارزیابی پاسخ سیستم' : 'Disruption Workbench & Stress-Testing'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isFa 
              ? 'تغییر متغیرهای خرابی ماشین‌آلات، طول مدت توقف، و اولویت استراتژیک جهت مشاهده بلادرنگ انتشار اثر و پاسخ شورای مجازی.'
              : 'Stress-test factory capacity by injecting machine breakdowns and observing real-time causal ripple effects.'}
          </p>
        </div>

        <button
          onClick={onResetGoldenScenario}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>{isFa ? 'بازنشانی سناریوی طلایی' : 'Reset Golden Scenario'}</span>
        </button>
      </div>

      {/* Simulator Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Simulation Parameters Input Form */}
        <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <h2 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>{isFa ? 'پارامترهای شوک وارده به کارخانه' : 'Shock Parameters & Context'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Resource Selector */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                {isFa ? 'منبع گلوگاهی آسیب‌دیده:' : 'Target Bottleneck Machine:'}
              </label>
              <select
                aria-label="Target Bottleneck Machine"
                value={selectedResourceId}
                onChange={e => setSelectedResourceId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              >
                {resources.map(r => (
                  <option key={r.resourceId} value={r.resourceId}>
                    {isFa ? r.name : r.nameEn} ({r.sapWorkCenter})
                  </option>
                ))}
              </select>
            </div>

            {/* Strategic Profile */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                {isFa ? 'پروفایل استراتژیک وزن‌دهی به اهداف:' : 'Strategic Priority Profile:'}
              </label>
              <select
                aria-label="Strategic Priority Profile"
                value={selectedProfile}
                onChange={e => setSelectedProfile(e.target.value as StrategicProfile)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-cyan-300 font-medium focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="BALANCED">{isFa ? 'متوازن (توازن هزینه و زمان)' : 'Balanced Delivery & Cost'}</option>
                <option value="CASH_CRISIS">{isFa ? 'بحران نقدینگی (حفظ جریان نقد و مایل‌استون)' : 'Cash Crisis Mode'}</option>
                <option value="DELIVERY_CRISIS">{isFa ? 'حیثیت تحویل (کمینه‌سازی تاخیر به هر قیمت)' : 'Delivery Crisis (Zero Delay)'}</option>
                <option value="MARGIN_PROTECTION">{isFa ? 'حفظ حاشیه سود (کمینه‌سازی هزینه مستقیم)' : 'Margin Protection'}</option>
              </select>
            </div>

            {/* Outage Duration Slider */}
            <div className="sm:col-span-2 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300">
                  {isFa ? 'طول مدت توقف ماشین (روز تقویمی):' : 'Outage Duration (Calendar Days):'}
                </label>
                <span className="font-mono text-base font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                  {downtimeDays} {isFa ? 'روز' : 'days'}
                </span>
              </div>
              <input
                aria-label="Outage Duration in Calendar Days"
                type="range"
                min="1"
                max="60"
                value={downtimeDays}
                onChange={e => setDowntimeDays(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 {isFa ? 'روز' : 'day'}</span>
                <span>20 {isFa ? 'روز (سناریوی طلایی)' : 'days (Golden)'}</span>
                <span>40 {isFa ? 'روز' : 'days'}</span>
                <span>60 {isFa ? 'روز' : 'days'}</span>
              </div>
            </div>

            {/* Disruption Cause */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                {isFa ? 'علت و ریشه فنی توقف:' : 'Technical Root Cause:'}
              </label>
              <select
                aria-label="Technical Root Cause"
                value={cause}
                onChange={e => setCause(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-xs"
              >
                {disruptionCauses.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSimulateClick}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-xl shadow-cyan-700/20 flex items-center justify-center gap-2 transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isFa ? 'محاسبه مجدد انتشار اثر و تشکیل شورای مجازی' : 'Run Discrete-Event Simulation & Re-assemble Council'}</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Projected Impact Delta Preview */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-xs">
          <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{isFa ? 'پیش‌نمایش ارقام شبیه‌سازی فعلی' : 'Current Simulation Results'}</span>
          </h2>

          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'انحراف تقویم بدون اقدام:' : 'Unmitigated Delay:'}</span>
              <span className="font-mono text-xl font-bold text-amber-400">+{impact.maxProjectDelayDays} {isFa ? 'روز' : 'days'}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'جریمه دیرکرد قراردادی:' : 'Liquidated Damages:'}</span>
              <span className="font-mono text-xl font-bold text-rose-400">
                {(impact.totalPenaltyRiskIRR / 1000000000).toFixed(1)}B IRR
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'گزینه منتخب بهینه‌ساز:' : 'Recommended Action:'}</span>
              <span className="font-bold text-emerald-400 block text-xs">
                {isFa ? decisionPackage.recommendedAlternative.title : decisionPackage.recommendedAlternative.titleEn}
              </span>
              <span className="font-mono text-[11px] text-slate-400 mt-1 block">
                {isFa ? 'کاهش تاخیر به: ' : 'Compresses delay to: '} +{decisionPackage.recommendedAlternative.scheduleDelayDays} {isFa ? 'روز' : 'days'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('decision')}
              className="w-full py-2.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition"
            >
              <span>{isFa ? 'مشاهده بسته تصمیم مصوب' : 'Open Decision Package'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
