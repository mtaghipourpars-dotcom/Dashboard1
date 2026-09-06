import React, { useState } from 'react';
import { 
  Layers, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Building,
  Zap,
  Tag,
  Shield,
  Activity
} from 'lucide-react';
import { Language, ProjectEntity, ProductionOperation } from '../types';

interface ProjectPortfolioViewProps {
  lang: Language;
  projects: ProjectEntity[];
  operations: ProductionOperation[];
  onNavigateTab: (tab: string) => void;
}

export const ProjectPortfolioView: React.FC<ProjectPortfolioViewProps> = ({
  lang,
  projects,
  operations,
  onNavigateTab
}) => {
  const isFa = lang === 'fa';
  const [selectedProject, setSelectedProject] = useState<ProjectEntity>(projects[0]);

  const projectOps = operations.filter(op => op.projectId === selectedProject.projectId);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'سبد پروژه‌های نیروگاهی و ساختار شکست کار WBS' : 'Power Generation Project Portfolio & WBS'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-mono font-black text-white tracking-wide">
            {isFa ? 'مدیریت پروژه‌های ساخت ژنراتورهای سنگین مپنا پارس' : 'MAPNA Pars Heavy Generator Projects & WBS'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans max-w-4xl">
            {isFa 
              ? 'پایش پروژه‌های ژنراتور توربین گازی، بخاری و برق‌آبی، مایل‌استون‌های مالی و وضعیت قطعات بحرانی در کارگاه.'
              : 'Tracking utility gas, steam, and hydro turbine generator projects against contractual WBS milestones.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('decision')}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white flex items-center gap-2 transition self-start md:self-auto cursor-pointer shadow-lg border border-emerald-400/40 radar-glow-emerald"
        >
          <Shield className="w-4 h-4" />
          <span>{isFa ? 'بررسی بسته تصمیم مهار بحران' : 'Decision Package'}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>

      {/* Grid: Project Selection & Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Project Selector Cards */}
        <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-3">
          <span className="text-xs font-mono text-cyan-300 font-bold px-1 block pb-2.5 border-b border-slate-800 uppercase tracking-wider">
            {isFa ? 'پروژه‌های فعال در کارخانجات' : 'Active Shop Projects'}
          </span>
          <div className="space-y-2">
            {projects.map(proj => {
              const isSelected = selectedProject.projectId === proj.projectId;
              return (
                <div
                  key={proj.projectId}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                    isSelected
                      ? 'bg-[#0c1628] border-cyan-400 text-slate-100 shadow-xl ring-1 ring-cyan-400/50 radar-glow-cyan'
                      : 'bg-[#070c16] border-slate-800 text-slate-300 hover:bg-[#0d1628] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate max-w-[170px] text-slate-100 font-sans">{isFa ? proj.name : proj.nameEn}</span>
                    <span className="font-mono text-cyan-400 text-xs font-bold">{proj.powerRatingMW} MW</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span className="font-semibold text-slate-300">{proj.sapProjectCode}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      proj.status === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                        : proj.status === 'AT_RISK'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Selected Project Details & Operations */}
        <div className="lg:col-span-2 bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5 text-xs font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="font-mono text-cyan-300 font-bold text-xs bg-[#0c1628] px-2.5 py-1 rounded border border-cyan-500/30">{selectedProject.sapProjectCode}</span>
              <h2 className="font-bold text-lg text-slate-100 mt-1 font-sans">
                {isFa ? selectedProject.name : selectedProject.nameEn}
              </h2>
            </div>

            <div className="text-right font-mono">
              <span className="text-slate-400 text-xs block">{isFa ? 'ارزش کل قرارداد:' : 'Contract Value:'}</span>
              <span className="font-black text-cyan-400 text-base">
                {(selectedProject.contractValueIRR / 1000000000).toFixed(0)} میلیارد ریال
              </span>
            </div>
          </div>

          {/* Project Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono text-[11px]">{isFa ? 'کارفرما:' : 'Client:'}</span>
              <span className="font-bold text-slate-200">{isFa ? selectedProject.client : selectedProject.clientEn}</span>
            </div>
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono text-[11px]">{isFa ? 'نوع خنک‌کاری:' : 'Cooling:'}</span>
              <span className="font-bold text-slate-200">{selectedProject.coolingType}</span>
            </div>
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono text-[11px]">{isFa ? 'موعد تحویل تعهدشده:' : 'Baseline Finish:'}</span>
              <span className="font-mono font-bold text-slate-200">{selectedProject.baselineDeliveryDate}</span>
            </div>
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono text-[11px]">{isFa ? 'جریمه دیرکرد روزانه:' : 'Daily Penalty:'}</span>
              <span className="font-mono text-rose-400 font-black">{(selectedProject.dailyPenaltyRateIRR / 1000000).toFixed(0)} م.ریال/روز</span>
            </div>
          </div>

          {/* Operations within this Project */}
          <div className="space-y-2.5">
            <span className="font-mono font-bold text-slate-200 block text-xs sm:text-sm">
              {isFa ? 'عملیات‌های ساخت کارگاهی مرتبط با این پروژه (WBS Operations):' : 'Shop Floor Manufacturing Operations:'}
            </span>
            <div className="bg-[#070c16] rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-[#0a0f1a] text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">{isFa ? 'کد عملیات' : 'Operation'}</th>
                    <th className="p-3.5">{isFa ? 'شرح فعالیت ساخت' : 'Description'}</th>
                    <th className="p-3.5">{isFa ? 'مرکز کاری SAP' : 'Work Center'}</th>
                    <th className="p-3.5">{isFa ? 'مدت استاندارد' : 'Duration'}</th>
                    <th className="p-3.5">{isFa ? 'وضعیت' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {projectOps.map(op => (
                    <tr key={op.operationId} className="hover:bg-[#0c1628]/60 transition">
                      <td className="p-3.5 font-bold text-cyan-400">{op.operationId}</td>
                      <td className="p-3.5 text-slate-200 font-sans font-medium">{isFa ? op.name : op.nameEn}</td>
                      <td className="p-3.5 text-slate-400">{op.assignedWorkCenter}</td>
                      <td className="p-3.5 text-slate-300 font-bold">{op.standardDurationHours} ساعت</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          op.status === 'DISRUPTED'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                            : op.status === 'DELAYED'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {op.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
