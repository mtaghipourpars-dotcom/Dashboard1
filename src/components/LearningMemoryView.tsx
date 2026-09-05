import React, { useState } from 'react';
import { 
  History, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  BookOpen, 
  RefreshCw,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Language, HistoricalDecisionLog } from '../types';
import { initialHistoricalLogs } from '../data/mapnaParsData';

interface LearningMemoryViewProps {
  lang: Language;
  onNavigateTab: (tab: string) => void;
}

export const LearningMemoryView: React.FC<LearningMemoryViewProps> = ({
  lang,
  onNavigateTab
}) => {
  const isFa = lang === 'fa';
  const [logs, setLogs] = useState<HistoricalDecisionLog[]>(initialHistoricalLogs);
  const [selectedLog, setSelectedLog] = useState<HistoricalDecisionLog>(initialHistoricalLogs[0]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'حلقه یادگیری و حافظه تصمیم‌گیری سازمانی' : 'Organizational Memory & Learning Loop'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isFa ? 'حافظه تصمیمات مپنا پارس و کالیبراسیون مدل' : 'MAPNA Pars Decision Memory & Model Calibration'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isFa 
              ? 'ثبت تصمیمات گذشته شورا، مقایسه پیش‌بینی شبیه‌ساز با عملکرد واقعی در SAP، و بازخورد آموخته‌ها به وزن‌های ریسک.'
              : 'Tracking past council verdicts, comparing predicted vs actual outcomes in SAP, and recalibrating risk coefficients.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">{logs.length} {isFa ? 'پرونده تصمیم ثبت‌شده' : 'Calibrated Decision Logs'}</span>
        </div>
      </div>

      {/* Grid of Past Cases and Case Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Past Cases List */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-2">
          <span className="text-xs font-mono text-slate-400 font-semibold px-2 block pb-2 border-b border-slate-800">
            {isFa ? 'سوابق تصمیمات و حوادث کارگاهی' : 'Historical Incident Decision Logs'}
          </span>
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.logId}
                onClick={() => setSelectedLog(log)}
                className={`p-3 rounded-xl border cursor-pointer text-xs transition ${
                  selectedLog.logId === log.logId
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold">{log.logId}</span>
                  <span className="text-[10px] text-slate-400">{log.date}</span>
                </div>
                <div className="font-semibold text-slate-200 mt-1 truncate">
                  {isFa ? log.disruptionSummary : log.disruptionSummaryEn}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span className="text-emerald-400">{log.selectedAlternative}</span>
                  <span>{isFa ? 'انحراف: ' : 'Variance: '}{log.actualOutcome.delayDays - log.predictedOutcome.delayDays}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Deep Dive Comparison */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block">{selectedLog.logId} • {selectedLog.date}</span>
              <h2 className="font-bold text-base text-white mt-0.5">
                {isFa ? selectedLog.disruptionSummary : selectedLog.disruptionSummaryEn}
              </h2>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {selectedLog.selectedAlternative}
            </span>
          </div>

          {/* Decision Rationale */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-semibold block">{isFa ? 'استدلال و توجیه شورا در زمان تصمیم‌گیری:' : 'Executive Decision Rationale:'}</span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {isFa ? selectedLog.rationale : selectedLog.rationaleEn}
            </p>
          </div>

          {/* Predicted vs Actual Table */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block">
              {isFa ? 'جدول مقایسه پیش‌بینی الگوریتم با ارقام محقق‌شده در SAP:' : 'Predicted vs Actual Performance in SAP:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Predicted Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-mono text-cyan-400 font-bold block">
                  [1] {isFa ? 'پیش‌بینی اولیه شبیه‌ساز' : 'Predicted Outcome'}
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isFa ? 'تاخیر تقویمی:' : 'Schedule Delay:'}</span>
                    <span className="text-slate-200 font-bold">+{selectedLog.predictedOutcome.delayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isFa ? 'هزینه کل اقدام:' : 'Total Cost:'}</span>
                    <span className="text-slate-200">{(selectedLog.predictedOutcome.costIRR / 1000000000).toFixed(1)}B IRR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isFa ? 'تاخیر وصول نقدینگی:' : 'Cash Shift:'}</span>
                    <span className="text-slate-200">+{selectedLog.predictedOutcome.cashDelayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                </div>
              </div>

              {/* Actual Outcome Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-mono text-emerald-400 font-bold block">
                  [2] {isFa ? 'عملکرد واقعی ثبت‌شده در SAP AFRU/FI' : 'Actual Recorded in SAP'}
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isFa ? 'تاخیر تقویمی محقق‌شده:' : 'Actual Delay:'}</span>
                    <span className="text-amber-400 font-bold">+{selectedLog.actualOutcome.delayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isFa ? 'هزینه قطعی تسویه‌شده:' : 'Actual Cost:'}</span>
                    <span className="text-slate-200">{(selectedLog.actualOutcome.costIRR / 1000000000).toFixed(1)}B IRR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isFa ? 'تاخیر وصول وجه:' : 'Actual Cash Shift:'}</span>
                    <span className="text-slate-200">+{selectedLog.actualOutcome.cashDelayDays} {isFa ? 'روز' : 'days'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Lessons Learned & Model Feedback */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl space-y-1.5">
            <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{isFa ? 'درس‌آموخته سازمانی و اصلاح ضرایب مدل:' : 'Organizational Lesson & Recalibrated Weights:'}</span>
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              {isFa ? selectedLog.learningLesson : selectedLog.learningLessonEn}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
