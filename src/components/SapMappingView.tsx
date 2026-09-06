import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  Code,
  Layers,
  Zap,
  Activity,
  Server
} from 'lucide-react';
import { Language, SapTableMapping } from '../types';
import { initialSapMappings } from '../data/mapnaParsData';

interface SapMappingViewProps {
  lang: Language;
}

export const SapMappingView: React.FC<SapMappingViewProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [selectedMapping, setSelectedMapping] = useState<SapTableMapping>(initialSapMappings[0]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'نگاشت داده‌ای کانونیکال و خط لوله جداول SAP S/4HANA' : 'SAP S/4HANA Enterprise Data Pipeline'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-mono font-black text-white tracking-wide">
            {isFa ? 'طرح یکپارچه‌سازی با SAP S/4HANA (سیستم ثبتی مپنا پارس)' : 'SAP S/4HANA System of Record Integration Blueprint'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans max-w-4xl">
            {isFa 
              ? 'معماری همگام‌سازی دوطرفه بین جداول عملیاتی، مهندسی، فروش و مالی SAP با گراف دانش و موتور شبیه‌سازی Mission Control.'
              : 'Bidirectional sync architecture mapping SAP PP, PM, PS, SD, and FI tables to the canonical Enterprise Graph.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-mono bg-[#070c16] px-4 py-2.5 rounded-xl border border-emerald-500/40 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          <span className="text-emerald-300 font-bold tracking-wider">RFC/OData Sync: ACTIVE</span>
        </div>
      </div>

      {/* Grid: Table List & Table Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: SAP Tables List */}
        <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-2">
          <span className="text-xs font-mono text-cyan-300 font-bold px-1 block pb-2.5 border-b border-slate-800 uppercase tracking-wider">
            {isFa ? 'جداول و ماژول‌های متصل SAP' : 'Connected SAP Tables & Modules'}
          </span>
          <div className="space-y-2 max-h-[520px] overflow-y-auto">
            {initialSapMappings.map((m) => (
              <div
                key={m.tableName}
                onClick={() => setSelectedMapping(m)}
                className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                  selectedMapping.tableName === m.tableName
                    ? 'bg-[#0c1628] border-cyan-400 text-slate-100 shadow-xl ring-1 ring-cyan-400/50 radar-glow-cyan'
                    : 'bg-[#070c16] border-slate-800 text-slate-300 hover:bg-[#0d1628] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="text-cyan-400">{m.tableName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#070d18] text-slate-300 border border-slate-700 font-mono">
                    {m.module}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1 truncate font-sans">
                  {m.canonicalEntity}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-800">
                  <span>{m.extractionSchedule}</span>
                  <span className="text-emerald-400 font-bold">{m.freshnessSLA}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Selected Mapping Deep-Dive */}
        <div className="lg:col-span-2 bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5 text-xs font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-cyan-400" />
                <h2 className="font-mono font-bold text-base text-slate-100">
                  {selectedMapping.tableName} • {selectedMapping.description}
                </h2>
              </div>
              <span className="text-slate-400 text-xs mt-1 block">
                {isFa ? 'موجودیت هدف در مدل کانونیکال: ' : 'Canonical Entity: '}
                <strong className="text-cyan-300 font-mono font-bold">{selectedMapping.canonicalEntity}</strong>
              </span>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0c1628] text-cyan-300 border border-cyan-500/30">
              Module: {selectedMapping.module}
            </span>
          </div>

          {/* Sync & Frequency Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800 font-mono">
              <span className="text-slate-400 block mb-1 text-[11px]">{isFa ? 'فرکانس استخراج:' : 'Extraction Schedule:'}</span>
              <span className="text-slate-200 font-bold">{selectedMapping.extractionSchedule}</span>
            </div>
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800 font-mono">
              <span className="text-slate-400 block mb-1 text-[11px]">{isFa ? 'شاخص تازگی داده (SLA):' : 'Freshness SLA:'}</span>
              <span className="text-emerald-400 font-bold">{selectedMapping.freshnessSLA}</span>
            </div>
            <div className="bg-[#070c16] p-3.5 rounded-xl border border-slate-800 font-mono">
              <span className="text-slate-400 block mb-1 text-[11px]">{isFa ? 'پروتکل ارتباطی:' : 'Interface Protocol:'}</span>
              <span className="text-cyan-300 font-bold">SAP RFC / OData v4</span>
            </div>
          </div>

          {/* Key Fields & Mapping Table */}
          <div className="space-y-2.5">
            <span className="font-mono font-bold text-slate-200 block text-xs sm:text-sm">
              {isFa ? 'نگاشت فیلدهای کلیدی SAP به ویژگی‌های مدل کانونیکال:' : 'SAP Fields to Canonical Attribute Mapping:'}
            </span>
            <div className="bg-[#070c16] rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-[#0a0f1a] text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">{isFa ? 'نام فیلد در SAP' : 'SAP Field Name'}</th>
                    <th className="p-3">{isFa ? 'شرح و نوع داده' : 'Description & Type'}</th>
                    <th className="p-3">{isFa ? 'فیلد در مدل کانونیکال' : 'Target Canonical Attribute'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {selectedMapping.keyFields.map((field, idx) => (
                    <tr key={idx} className="hover:bg-[#0c1628]/60 transition">
                      <td className="p-3 text-slate-500">{idx + 1}</td>
                      <td className="p-3 font-bold text-cyan-400">{field}</td>
                      <td className="p-3 text-slate-300 font-sans">VARCHAR / DECIMAL / DATE</td>
                      <td className="p-3 text-emerald-400 font-bold">{selectedMapping.canonicalEntity.toLowerCase()}.{field.toLowerCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Canonical Transformation Logic */}
          <div className="bg-[#070c16] p-4 sm:p-5 rounded-xl border border-slate-800 space-y-2">
            <span className="font-mono text-cyan-300 font-bold block flex items-center gap-1.5">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'قوانین تبدیل کانونیکال (ETL Transformation Rules):' : 'Transformation Logic:'}</span>
            </span>
            <p className="text-slate-300 text-xs leading-relaxed font-mono">
              {selectedMapping.transformationLogic}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
