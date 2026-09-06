import React, { useState } from 'react';
import { 
  History, 
  CheckCircle2, 
  BookOpen,
  Shield,
  Activity,
  Zap,
  Clock
} from 'lucide-react';
import { Language, HistoricalDecisionLog } from '../types';
import { initialHistoricalLogs } from '../data/mapnaParsData';

interface LearningMemoryViewProps {
  lang: Language;
  onNavigateTab: (tab: string) => void;
}

export const LearningMemoryView: React.FC<LearningMemoryViewProps> = ({
  lang
}) => {
  const isFa = lang === 'fa';
  const [logs] = useState<HistoricalDecisionLog[]>(initialHistoricalLogs);
  const [selectedLog, setSelectedLog] = useState<HistoricalDecisionLog>(initialHistoricalLogs[0]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'حلقه یادگیری سازمانی و جعبه سیاه تصمیمات' : 'Organizational Decision Flight Recorder'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-mono font-black text-white tracking-wide">
            {isFa ? 'حافظه تصمیمات مپنا پارس و کالیبراسیون مدل' : 'MAPNA Pars Decision Memory & Model Calibration'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans max-w-4xl">
            {isFa 
              ? 'ثبت تصمیمات گذشته شورا، مقایسه پیش‌بینی شبیه‌ساز با عملکرد واقعی در SAP، و بازخورد آموخته‌ها به وزن‌های ریسک.'
              : 'Tracking past council verdicts, comparing predicted vs actual outcomes in SAP, and recalibrating risk coefficients.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#070c16] px-4 py-2.5 rounded-xl border border-cyan-500/30 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-200 font-bold tracking-wider">{logs.length} {isFa ? 'پرونده تصمیم کالیبره‌شده' : 'Calibrated Decision Logs'}</span>
        </div>
      </div>

      {/* Grid of Past Cases and Case Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Past Cases List */}
        <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-2">
          <span className="text-xs font-mono text-cyan-300 font-bold px-1 block pb-2.5 border-b border-slate-800 uppercase tracking-wider">
            {isFa ? 'سوابق تصمیمات و حوادث کارگاهی' : 'Historical Incident Decision Logs'}
          </span>
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.logId}
                onClick={() => setSelectedLog(log)}
                className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                  selectedLog.logId === log.logId
                    ? 'bg-[#0c1628] border-cyan-400 text-slate-100 shadow-xl ring-1 ring-cyan-400/50 radar-glow-cyan'
                    : 'bg-[#070c16] border-slate-800 text-slate-300 hover:bg-[#0d1628] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-cyan-400">{log.logId}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                </div>
                <div className="font-bold text-slate-100 mt-1 truncate font-sans">
                  {isFa ? log.disruptionSummary : log.disruptionSummaryEn}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono pt-1.5 border-t border-slate-800">
                  <span className="text-emerald-400 font-bold">{log.selectedAlternative}</span>
                  <span className="text-amber-300">{isFa ? 'انحراف: ' : 'Variance: '}{log.actualOutcome.delayDays - log.predictedOutcome.delayDays}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Deep Dive Comparison */}
        <div className="lg:col-span-2 bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5 text-xs font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block">{selectedLog.logId} • {selectedLog.date}</span>
              <h2 className="font-bold text-base sm:text-lg text-slate-100 mt-0.5 font-sans">
                {isFa ? selectedLog.disruptionSummary : selectedLog.disruptionSummaryEn}
              </h2>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              {selectedLog.selectedAlternative}
            </span>
          </div>

          {/* Decision Rationale */}
          <div className="bg-[#070c16] p-4 sm:p-5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-mono font-bold block text-[11px]">{isFa ? 'استدلال و توجیه شورا در زمان تصمیم‌گیری:' : 'Executive Decision Rationale:'}</span>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm font-medium">
              {isFa ? selectedLog.rationale : selectedLog.rationaleEn}
            </p>
          </div>

          {/* Predicted vs Actual Table */}
          <div className="space-y-2.5">
            <span className="font-mono font-bold text-slate-200 block text-xs sm:text-sm">
              {isFa ? 'جدول مقایسه پیش‌بینی الگوریتم با ارقام محقق‌شده در SAP:' : 'Predicted vs Actual Performance in SAP:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Predicted Box */}
              <div className="bg-[#070c16] p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3 font-mono">
                <span className="text-cyan-300 font-bold block text-xs">
                  [1] {isFa ? 'پیش‌بینی اولیه شبیه‌ساز' : 'Predicted Outcome'}
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">{isFa ? 'تاخیر تقویمی:' : 'Schedule Delay:'}</span>
                    <span className="text-cyan-300 font-bold">+{selectedLog.predictedOutcome.delayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">{isFa ? 'هزینه کل اقدام:' : 'Total Cost:'}</span>
                    <span className="text-slate-200 font-bold">{(selectedLog.predictedOutcome.costIRR / 1000000000).toFixed(1)}B IRR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">{isFa ? 'تاخیر وصول نقدینگی:' : 'Cash Shift:'}</span>
                    <span className="text-slate-200 font-bold">+{selectedLog.predictedOutcome.cashDelayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                </div>
              </div>

              {/* Actual Outcome Box */}
              <div className="bg-[#070c16] p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3 font-mono">
                <span className="text-emerald-300 font-bold block text-xs">
                  [2] {isFa ? 'عملکرد واقعی ثبت‌شده در SAP AFRU/FI' : 'Actual Recorded in SAP'}
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">{isFa ? 'تاخیر تقویمی محقق‌شده:' : 'Actual Delay:'}</span>
                    <span className="text-amber-400 font-black">+{selectedLog.actualOutcome.delayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">{isFa ? 'هزینه قطعی تسویه‌شده:' : 'Actual Cost:'}</span>
                    <span className="text-slate-200 font-bold">{(selectedLog.actualOutcome.costIRR / 1000000000).toFixed(1)}B IRR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">{isFa ? 'تاخیر وصول وجه:' : 'Actual Cash Shift:'}</span>
                    <span className="text-slate-200 font-bold">+{selectedLog.actualOutcome.cashDelayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Lessons Learned & Model Feedback */}
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 sm:p-5 rounded-xl space-y-1.5">
            <span className="text-emerald-300 font-bold block flex items-center gap-2 text-xs sm:text-sm font-mono">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'درس‌آموخته سازمانی و اصلاح ضرایب مدل:' : 'Organizational Lesson & Recalibrated Weights:'}</span>
            </span>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
              {isFa ? selectedLog.learningLesson : selectedLog.learningLessonEn}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
