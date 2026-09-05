import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  Code,
  Layers
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
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'نگاشت داده‌ای کانونیکال و جداول SAP S/4HANA' : 'SAP Data Blueprint & Canonical Model'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isFa ? 'طرح یکپارچه‌سازی با SAP S/4HANA (سیستم ثبتی مپنا)' : 'SAP S/4HANA System of Record Integration Blueprint'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isFa 
              ? 'معماری همگام‌سازی دوطرفه بین جداول عملیاتی، مهندسی، فروش و مالی SAP با گراف دانش و موتور شبیه‌سازی Mission Control.'
              : 'Bidirectional sync architecture mapping SAP PP, PM, PS, SD, and FI tables to the canonical Enterprise Graph.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">RFC/OData Sync: ACTIVE</span>
        </div>
      </div>

      {/* Grid: Table List & Table Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: SAP Tables List */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-2">
          <span className="text-xs font-mono text-slate-400 font-semibold px-2 block pb-2 border-b border-slate-800">
            {isFa ? 'جداول و ماژول‌های متصل SAP' : 'Connected SAP Tables & Modules'}
          </span>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {initialSapMappings.map((m) => (
              <div
                key={m.tableName}
                onClick={() => setSelectedMapping(m)}
                className={`p-3 rounded-xl border cursor-pointer text-xs transition ${
                  selectedMapping.tableName === m.tableName
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold">
                  <span>{m.tableName}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                    {m.module}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 truncate">
                  {m.canonicalEntity}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                  <span>{m.extractionSchedule}</span>
                  <span className="text-emerald-400">{m.freshnessSLA}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Selected Mapping Deep-Dive */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-cyan-400" />
                <h2 className="font-bold text-base text-white font-mono">
                  {selectedMapping.tableName} • {selectedMapping.description}
                </h2>
              </div>
              <span className="text-slate-400 text-xs mt-0.5 block">
                {isFa ? 'موجودیت هدف در مدل کانونیکال: ' : 'Canonical Entity: '}
                <strong className="text-cyan-300 font-mono">{selectedMapping.canonicalEntity}</strong>
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Module: {selectedMapping.module}
            </span>
          </div>

          {/* Sync & Frequency Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'فرکانس استخراج:' : 'Extraction Schedule:'}</span>
              <span className="font-mono text-slate-200 font-semibold">{selectedMapping.extractionSchedule}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'شاخص تازگی داده (SLA):' : 'Freshness SLA:'}</span>
              <span className="font-mono text-emerald-400 font-semibold">{selectedMapping.freshnessSLA}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">{isFa ? 'پروتکل ارتباطی:' : 'Interface Protocol:'}</span>
              <span className="font-mono text-cyan-300 font-semibold">SAP RFC / OData v4</span>
            </div>
          </div>

          {/* Key Fields & Mapping Table */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block">
              {isFa ? 'نگاشت فیلدهای کلیدی SAP به ویژگی‌های مدل کانونیکال:' : 'SAP Fields to Canonical Attribute Mapping:'}
            </span>
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">{isFa ? 'نام فیلد در SAP' : 'SAP Field Name'}</th>
                    <th className="p-3">{isFa ? 'شرح و نوع داده' : 'Description & Type'}</th>
                    <th className="p-3">{isFa ? 'فیلد در مدل کانونیکال' : 'Target Canonical Attribute'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {selectedMapping.keyFields.map((field, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-3 text-slate-500">{idx + 1}</td>
                      <td className="p-3 font-bold text-cyan-400">{field}</td>
                      <td className="p-3 text-slate-300">VARCHAR / DECIMAL / DATE</td>
                      <td className="p-3 text-emerald-300">{selectedMapping.canonicalEntity.toLowerCase()}.{field.toLowerCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Canonical Transformation Logic */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-mono text-cyan-400 font-semibold block flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" />
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
