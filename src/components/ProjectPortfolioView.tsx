import React, { useState } from 'react';
import { 
  Layers, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Building,
  Zap,
  Tag
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
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'سبد پروژه‌های نیروگاهی و ساختار شکست کار' : 'Project Portfolio & WBS Master'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isFa ? 'مدیریت پروژه‌های ساخت ژنراتورهای سنگین مپنا پارس' : 'MAPNA Pars Heavy Generator Projects & WBS'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isFa 
              ? 'پایش پروژه‌های ژنراتور توربین گازی، بخاری و برق‌آبی، مایل‌استون‌های مالی و وضعیت قطعات بحرانی در کارگاه.'
              : 'Tracking utility gas, steam, and hydro turbine generator projects against contractual WBS milestones.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('decision')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition self-start md:self-auto"
        >
          <span>{isFa ? 'بررسی بسته تصمیم مهار بحران' : 'Decision Package'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

      {/* Grid: Project Selection & Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Project Selector Cards */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3">
          <span className="text-xs font-mono text-slate-400 font-semibold px-2 block pb-2 border-b border-slate-800">
            {isFa ? 'پروژه‌های فعال در کارخانجات' : 'Active Shop Projects'}
          </span>
          <div className="space-y-2">
            {projects.map(proj => {
              const isSelected = selectedProject.projectId === proj.projectId;
              return (
                <div
                  key={proj.projectId}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-xs transition ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate">{isFa ? proj.name : proj.nameEn}</span>
                    <span className="font-mono text-cyan-400 text-[11px]">{proj.powerRatingMW} MW</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{proj.sapProjectCode}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      proj.status === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : proj.status === 'AT_RISK'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
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
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="font-mono text-cyan-400 font-bold text-xs">{selectedProject.sapProjectCode}</span>
              <h2 className="font-bold text-base text-white mt-0.5">
                {isFa ? selectedProject.name : selectedProject.nameEn}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-slate-400 text-[11px] block">{isFa ? 'ارزش کل قرارداد:' : 'Contract Value:'}</span>
              <span className="font-mono font-bold text-slate-200 text-sm">
                {(selectedProject.contractValueIRR / 1000000000).toFixed(0)} Billion IRR
              </span>
            </div>
          </div>

          {/* Project Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'کارفرما:' : 'Client:'}</span>
              <span className="font-semibold text-slate-200">{isFa ? selectedProject.client : selectedProject.clientEn}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'نوع خنک‌کاری:' : 'Cooling:'}</span>
              <span className="font-semibold text-slate-200">{selectedProject.coolingType}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'موعد تحویل:' : 'Baseline Finish:'}</span>
              <span className="font-mono text-slate-200">{selectedProject.baselineDeliveryDate}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'جریمه دیرکرد:' : 'Daily Penalty:'}</span>
              <span className="font-mono text-rose-400 font-bold">{(selectedProject.dailyPenaltyRateIRR / 1000000).toFixed(0)}M / day</span>
            </div>
          </div>

          {/* Operations within this Project */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block">
              {isFa ? 'عملیات‌های ساخت کارگاهی مرتبط با این پروژه:' : 'Shop Floor Manufacturing Operations:'}
            </span>
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">{isFa ? 'کد عملیات' : 'Operation'}</th>
                    <th className="p-3">{isFa ? 'شرح فعالیت' : 'Description'}</th>
                    <th className="p-3">{isFa ? 'مرکز کاری SAP' : 'Work Center'}</th>
                    <th className="p-3">{isFa ? 'مدت (ساعت)' : 'Duration'}</th>
                    <th className="p-3">{isFa ? 'وضعیت' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {projectOps.map(op => (
                    <tr key={op.operationId} className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-cyan-400">{op.operationId}</td>
                      <td className="p-3 text-slate-200 font-sans">{isFa ? op.name : op.nameEn}</td>
                      <td className="p-3 text-slate-400">{op.assignedWorkCenter}</td>
                      <td className="p-3 text-slate-300">{op.standardDurationHours}h</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          op.status === 'DISRUPTED'
                            ? 'bg-rose-500/20 text-rose-400'
                            : op.status === 'DELAYED'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-800 text-slate-400'
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
