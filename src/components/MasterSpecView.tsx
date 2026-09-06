import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle, 
  ListChecks, 
  GitBranch, 
  FileCode, 
  ChevronDown, 
  ChevronRight, 
  Award,
  AlertTriangle,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Tag,
  Shield,
  Activity
} from 'lucide-react';
import { Language, MasterSpecChapter } from '../types';
import { 
  ALL_MASTER_SPEC_CHAPTERS, 
  CHAPTER_DOMAINS, 
  searchChapters 
} from '../data/chaptersCatalog';
import { 
  ARCHITECTURE_DECISION_RECORDS, 
  PRE_MORTEM_RISKS, 
  FIRST_20_DEVELOPER_TASKS, 
  ARCHITECTURE_GAP_MATRIX, 
  FINAL_VERDICTS 
} from '../data/masterSpecData';

interface MasterSpecViewProps {
  lang: Language;
  onNavigateTab?: (tab: string) => void;
}

type SpecSubTab = 'chapters' | 'adrs' | 'premortems' | 'tasks' | 'gaps' | 'verdicts';

export const MasterSpecView: React.FC<MasterSpecViewProps> = ({ lang, onNavigateTab }) => {
  const isFa = lang === 'fa';
  const [activeSubTab, setActiveSubTab] = useState<SpecSubTab>('chapters');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);
  const [adrSearch, setAdrSearch] = useState<string>('');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<string>('ALL');
  const [preMortemImpactFilter, setPreMortemImpactFilter] = useState<string>('ALL');

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return searchChapters(searchQuery, selectedDomain);
  }, [searchQuery, selectedDomain]);

  // Selected chapter
  const selectedChapter = useMemo(() => {
    return ALL_MASTER_SPEC_CHAPTERS.find(c => c.chapterNumber === selectedChapterNumber) || ALL_MASTER_SPEC_CHAPTERS[0];
  }, [selectedChapterNumber]);

  // Filtered ADRs
  const filteredAdrs = useMemo(() => {
    const q = adrSearch.trim().toLowerCase();
    if (!q) return ARCHITECTURE_DECISION_RECORDS;
    return ARCHITECTURE_DECISION_RECORDS.filter(adr => 
      adr.id.toLowerCase().includes(q) ||
      adr.title.toLowerCase().includes(q) ||
      adr.titleEn.toLowerCase().includes(q) ||
      adr.decision.toLowerCase().includes(q) ||
      adr.decisionEn.toLowerCase().includes(q) ||
      adr.context.toLowerCase().includes(q)
    );
  }, [adrSearch]);

  // Filtered Pre-Mortems
  const filteredPreMortems = useMemo(() => {
    if (preMortemImpactFilter === 'ALL') return PRE_MORTEM_RISKS;
    return PRE_MORTEM_RISKS.filter(r => r.impact === preMortemImpactFilter);
  }, [preMortemImpactFilter]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    if (taskPriorityFilter === 'ALL') return FIRST_20_DEVELOPER_TASKS;
    return FIRST_20_DEVELOPER_TASKS.filter(t => t.priority === taskPriorityFilter);
  }, [taskPriorityFilter]);

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner: Master Specification & Governance Header */}
      <div className="bg-[#0a0f1a]/95 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>SPECIFICATION v1.0 • 60 CHAPTERS</span>
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                25 ADRs ACCEPTED
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30">
                20 PRE-MORTEMS
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30">
                ZERO AMBIGUITY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-mono font-black tracking-wide text-white">
              {isFa ? 'سند جامع معماری و حاکمیت سیستم مپنا پارس' : 'MAPNA Pars Master Architecture & Governance Spec'}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-4xl leading-relaxed font-sans">
              {isFa 
                ? 'مرجع کامل ۶۰ فصل مشخصات فنی، ۲۵ سند تصمیم معماری (ADR)، ۲۰ سناریوی پیش‌مرگ سیستم، کاتالوگ وظایف فنی، ماتریس تحول و احکام نهایی استقرار پایلوت در کارخانجات ژنراتور مپنا.'
                : 'Exhaustive 60-chapter technical specification, 25 ADRs, 20 Pre-Mortem failure analyses, developer task catalog, transformation matrix, and final pilot authorization verdicts.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/MAPNA_Pars_Mission_Control_System_Manual.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 shadow-lg flex items-center gap-2 transition border border-cyan-400/40 radar-glow-cyan"
            >
              <span>{isFa ? 'مشاهده سند چاپی رسمی' : 'Official System Manual'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-[#0a0f1a]/95 rounded-xl p-1.5 border border-slate-800 shadow-xl flex flex-wrap gap-1 font-mono text-xs">
        <button
          onClick={() => setActiveSubTab('chapters')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
            activeSubTab === 'chapters'
              ? 'bg-cyan-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1628]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isFa ? 'فصل‌های ۶۰‌گانه معماری' : '60 Architecture Chapters'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('adrs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
            activeSubTab === 'adrs'
              ? 'bg-cyan-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1628]'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>{isFa ? 'اسناد تصمیم معماری (25 ADRs)' : '25 Architecture Decisions (ADRs)'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('premortems')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
            activeSubTab === 'premortems'
              ? 'bg-cyan-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1628]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{isFa ? 'تحلیل پیش‌مرگ سیستم (20 Pre-Mortems)' : '20 Pre-Mortem Risks'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
            activeSubTab === 'tasks'
              ? 'bg-cyan-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1628]'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>{isFa ? 'کاتالوگ تسک‌های مهندسی' : 'Developer Tasks (20)'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('gaps')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
            activeSubTab === 'gaps'
              ? 'bg-cyan-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1628]'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>{isFa ? 'ماتریس شکاف و تحول' : 'Gap & Transformation Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('verdicts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
            activeSubTab === 'verdicts'
              ? 'bg-cyan-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1628]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{isFa ? 'احکام نهایی و بیانیه تاییدیه' : 'Final Verdicts & Sign-off'}</span>
        </button>
      </div>

      {/* VIEW 1: 60 CHAPTERS EXPLORER */}
      {activeSubTab === 'chapters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Chapter Selector & Filters (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Search and Domain Filter */}
            <div className="bg-[#0a0f1a]/95 p-4 rounded-xl border border-slate-800 shadow-xl space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-500" />
                <input
                  type="text"
                  placeholder={isFa ? 'جستجو در ۶۰ فصل...' : 'Search 60 chapters...'}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#070c16] border border-slate-700 rounded-lg px-9 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-sans"
                />
              </div>

              <div className="text-xs">
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  {isFa ? 'فیلتر بر اساس دامنه تخصصی:' : 'Filter by Architectural Domain:'}
                </label>
                <select
                  value={selectedDomain}
                  onChange={e => setSelectedDomain(e.target.value)}
                  className="w-full bg-[#070c16] border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none cursor-pointer"
                >
                  {CHAPTER_DOMAINS.map(d => (
                    <option key={d.id} value={d.id} className="bg-[#070c16] text-slate-200">
                      {isFa ? d.nameFa : d.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                <span>{filteredChapters.length} {isFa ? 'فصل منطبق' : 'chapters matching'}</span>
                <span>{isFa ? 'مجموع ۶۰ فصل' : 'Total 60 chapters'}</span>
              </div>
            </div>

            {/* Chapters List */}
            <div className="bg-[#0a0f1a]/95 rounded-xl border border-slate-800 shadow-xl overflow-hidden max-h-[650px] overflow-y-auto divide-y divide-slate-800/80">
              {filteredChapters.map(chapter => {
                const isSelected = chapter.chapterNumber === selectedChapter.chapterNumber;
                return (
                  <button
                    key={chapter.chapterNumber}
                    onClick={() => setSelectedChapterNumber(chapter.chapterNumber)}
                    className={`w-full text-right rtl:text-right ltr:text-left p-3.5 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#0c1628] border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-cyan-400' 
                        : 'hover:bg-[#070c16]'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {chapter.chapterNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-mono font-semibold text-cyan-400 truncate">
                          {isFa ? chapter.domainFa : chapter.domain}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                          chapter.factTag === 'FACT' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {chapter.factTag}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold truncate ${
                        isSelected ? 'text-cyan-200' : 'text-slate-200'
                      }`}>
                        {isFa ? chapter.titleFa : chapter.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-normal font-sans">
                        {isFa ? chapter.summaryFa : chapter.summaryEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Chapter Content Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-xl border border-slate-800 shadow-2xl space-y-6 font-sans">
            
            {/* Chapter Header */}
            <div className="border-b border-slate-800 pb-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    فصل {selectedChapter.chapterNumber} از ۶۰
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#070c16] text-slate-300 border border-slate-700">
                    {isFa ? selectedChapter.domainFa : selectedChapter.domain}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                  selectedChapter.factTag === 'FACT'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                }`}>
                  ESTABLISHED {selectedChapter.factTag}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-wide font-sans">
                {isFa ? selectedChapter.titleFa : selectedChapter.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-[#070c16] p-4 rounded-xl border border-slate-800">
                {isFa ? selectedChapter.summaryFa : selectedChapter.summaryEn}
              </p>
            </div>

            {/* Key Directives */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{isFa ? 'دستورالعمل‌ها و اصول حاکم بر این فصل:' : 'Key Architectural Directives:'}</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {selectedChapter.keyDirectives.map((directive, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-[#070c16] p-3 rounded-lg border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{directive}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Markdown Body */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{isFa ? 'شرح تفصیلی و مستندات فنی معماری:' : 'Detailed Technical Documentation:'}</span>
              </h4>
              <div className="bg-[#070c16] p-4 sm:p-5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {selectedChapter.technicalContentMarkdownFa}
              </div>
            </div>

            {/* Code Snippet if exists */}
            {selectedChapter.codeSnippet && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>{selectedChapter.codeSnippet.title}</span>
                  </span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-cyan-300 text-[10px] font-bold">
                    {selectedChapter.codeSnippet.language.toUpperCase()}
                  </span>
                </div>
                <pre className="bg-[#050810] text-cyan-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 dir-ltr text-left">
                  <code>{selectedChapter.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: 25 ARCHITECTURE DECISION RECORDS (ADRs) */}
      {activeSubTab === 'adrs' && (
        <div className="space-y-4">
          
          {/* ADR Search & Quick Stats */}
          <div className="bg-[#0a0f1a]/95 p-4 rounded-xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-500" />
              <input
                type="text"
                placeholder={isFa ? 'جستجو در ۲۵ سند ADR...' : 'Search 25 Architecture Decision Records...'}
                value={adrSearch}
                onChange={e => setAdrSearch(e.target.value)}
                className="w-full bg-[#070c16] border border-slate-700 rounded-lg px-9 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-sans"
              />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>25 ACCEPTED</span>
              </span>
              <span>•</span>
              <span>SLA: &lt; 2000ms</span>
              <span>•</span>
              <span>DETERMINISTIC GROUNDING</span>
            </div>
          </div>

          {/* ADR Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAdrs.map(adr => (
              <div 
                key={adr.id}
                className="bg-[#0a0f1a]/95 p-5 rounded-xl border border-slate-800 shadow-xl hover:border-cyan-500/40 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
                      {adr.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-[10px]">
                      {adr.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    ADR SPEC
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 font-sans">
                  {isFa ? adr.title : adr.titleEn}
                </h3>

                <div className="space-y-2 text-xs text-slate-300 bg-[#070c16] p-3.5 rounded-lg border border-slate-800 font-sans">
                  <div>
                    <span className="font-bold text-cyan-300 block mb-0.5 font-mono">
                      {isFa ? 'تصمیم مصوب:' : 'Decision:'}
                    </span>
                    <p className="leading-relaxed">{isFa ? adr.decision : adr.decisionEn}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="font-bold text-slate-300 block mb-0.5 font-mono">
                      {isFa ? 'پیامدها و آثار سازمانی:' : 'Consequences:'}
                    </span>
                    <p className="leading-relaxed text-slate-400">{isFa ? adr.consequences : adr.consequencesEn}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="font-bold text-slate-300 block mb-0.5 font-mono">
                      {isFa ? 'دلیل و منطق معماری:' : 'Rationale:'}
                    </span>
                    <p className="leading-relaxed text-slate-400">{isFa ? adr.rationale : adr.rationaleEn}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>{isFa ? 'گزینه‌های رد شده:' : 'Rejected:'}</span>
                  <span className="text-slate-500 truncate max-w-[220px]" title={isFa ? adr.rejectedAlternatives : adr.rejectedAlternativesEn}>
                    {isFa ? adr.rejectedAlternatives : adr.rejectedAlternativesEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: 20 PRE-MORTEM RISKS */}
      {activeSubTab === 'premortems' && (
        <div className="space-y-4">
          
          {/* Pre-Mortem Filter Header */}
          <div className="bg-[#0a0f1a]/95 p-4 rounded-xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
                  {isFa ? 'تحلیل پیش‌مرگ سیستم (Pre-Mortem Failure Analysis): ۲۰ ریسک شکست' : 'System Pre-Mortem: 20 Failure Risks'}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  {isFa ? 'بررسی فرضی علل شکست سامانه در ۶ ماه آینده و تعیین اقدامات پیشگیرانه قطعی' : 'Hypothetical 6-month failure simulation with early warnings and contingencies.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 font-semibold">{isFa ? 'فیلتر شدت اثر:' : 'Impact Filter:'}</span>
              <select
                value={preMortemImpactFilter}
                onChange={e => setPreMortemImpactFilter(e.target.value)}
                className="bg-[#070c16] border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-[#070c16] text-slate-200">{isFa ? 'همه شدت‌ها (۲۰ ریسک)' : 'All Impacts (20)'}</option>
                <option value="CRITICAL" className="bg-[#070c16] text-slate-200">{isFa ? 'بحرانی (CRITICAL)' : 'Critical Only'}</option>
                <option value="HIGH" className="bg-[#070c16] text-slate-200">{isFa ? 'بالا (HIGH)' : 'High Only'}</option>
                <option value="MODERATE" className="bg-[#070c16] text-slate-200">{isFa ? 'متوسط (MODERATE)' : 'Moderate Only'}</option>
              </select>
            </div>
          </div>

          {/* Pre-Mortems Table / Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPreMortems.map(risk => (
              <div 
                key={risk.id}
                className="bg-[#0a0f1a]/95 p-5 rounded-xl border border-slate-800 shadow-xl space-y-3 font-sans"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/40 font-mono font-bold text-xs flex items-center justify-center">
                      #{risk.id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 font-sans">
                      {isFa ? risk.failureCause : risk.failureCauseEn}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      risk.impact === 'CRITICAL' 
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/50' 
                        : risk.impact === 'HIGH' 
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/50' 
                          : 'bg-blue-950 text-blue-300 border border-blue-500/50'
                    }`}>
                      IMPACT: {risk.impact}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#070c16] text-slate-300 border border-slate-700 font-semibold">
                      PROB: {risk.probability}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-semibold">
                      OWNER: {isFa ? risk.owner : risk.ownerEn}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#070c16] p-3 rounded-lg border border-amber-500/30 space-y-1">
                    <span className="font-bold text-amber-300 block text-[11px] flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isFa ? 'سیگنال هشدار زودهنگام:' : 'Early Warning Signal:'}</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{isFa ? risk.earlyWarningSignal : risk.earlyWarningSignalEn}</p>
                  </div>

                  <div className="bg-[#070c16] p-3 rounded-lg border border-emerald-500/30 space-y-1">
                    <span className="font-bold text-emerald-300 block text-[11px] flex items-center gap-1 font-mono">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isFa ? 'اقدام پیشگیرانه الزامی:' : 'Preventive Action:'}</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{isFa ? risk.preventiveAction : risk.preventiveActionEn}</p>
                  </div>

                  <div className="bg-[#070c16] p-3 rounded-lg border border-cyan-500/30 space-y-1">
                    <span className="font-bold text-cyan-300 block text-[11px] flex items-center gap-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isFa ? 'طرح اضطراری و مقابله:' : 'Contingency Plan:'}</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{isFa ? risk.contingencyPlan : risk.contingencyPlanEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: 20 DEVELOPER TASKS */}
      {activeSubTab === 'tasks' && (
        <div className="space-y-4">
          
          {/* Tasks Filter Header */}
          <div className="bg-[#0a0f1a]/95 p-4 rounded-xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
                  {isFa ? 'کاتالوگ وظایف فنی توسعه‌دهندگان (Developer Tasks): ۲۰ تسک مهندسی' : 'Master Developer Task Catalog: 20 Engineering Tasks'}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  {isFa ? 'وظایف دقیق پیاده‌سازی با ورودی/خروجی صریح و معیارهای پذیرش (DoD)' : 'Strict task breakdown with inputs, outputs, and explicit Definition of Done.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 font-semibold">{isFa ? 'فیلتر اولویت:' : 'Priority Filter:'}</span>
              <select
                value={taskPriorityFilter}
                onChange={e => setTaskPriorityFilter(e.target.value)}
                className="bg-[#070c16] border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-[#070c16] text-slate-200">{isFa ? 'همه اولویت‌ها (۲۰ تسک)' : 'All Priorities (20)'}</option>
                <option value="P0" className="bg-[#070c16] text-slate-200">{isFa ? 'بحرانی P0 (فوری)' : 'P0 Critical'}</option>
                <option value="P1" className="bg-[#070c16] text-slate-200">{isFa ? 'اولویت P1' : 'P1 High'}</option>
                <option value="P2" className="bg-[#070c16] text-slate-200">{isFa ? 'اولویت P2' : 'P2 Medium'}</option>
              </select>
            </div>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                className="bg-[#0a0f1a]/95 p-5 rounded-xl border border-slate-800 shadow-xl space-y-3 flex flex-col justify-between font-sans"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#070c16] text-cyan-300 border border-cyan-500/40 font-mono font-bold text-xs rounded">
                        {task.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        task.priority === 'P0' 
                           ? 'bg-rose-950 text-rose-300 border border-rose-500/50' 
                          : task.priority === 'P1' 
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/50' 
                            : 'bg-blue-950 text-blue-300 border border-blue-500/50'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {task.component}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 font-sans">
                    {isFa ? task.task : task.taskEn}
                  </h4>

                  <p className="text-xs text-slate-400 font-sans">
                    {isFa ? task.description : task.descriptionEn}
                  </p>

                  <div className="text-xs text-slate-300 bg-[#070c16] p-3 rounded-lg border border-slate-800 space-y-1.5 font-normal">
                    <div>
                      <span className="font-bold text-cyan-300 font-mono">{isFa ? 'ورودی‌ها:' : 'Inputs:'} </span>
                      <span>{task.input}</span>
                    </div>
                    <div>
                      <span className="font-bold text-cyan-300 font-mono">{isFa ? 'خروجی‌ها:' : 'Outputs:'} </span>
                      <span>{task.output}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-emerald-300 font-medium">
                      <span className="font-bold text-emerald-400 font-mono">{isFa ? 'معیار پذیرش (DoD):' : 'Definition of Done:'} </span>
                      <span>{isFa ? task.acceptanceCriteria : task.acceptanceCriteriaEn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                  <span>{isFa ? 'وابستگی‌ها:' : 'Dependencies:'} {task.dependencies.length > 0 ? task.dependencies.join(', ') : 'None'}</span>
                  <span className="px-2 py-0.5 bg-[#070c16] rounded text-slate-400 border border-slate-800">
                    {task.component}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: GAP & TRANSFORMATION MATRIX */}
      {activeSubTab === 'gaps' && (
        <div className="space-y-4">
          <div className="bg-[#0a0f1a]/95 p-5 rounded-xl border border-slate-800 shadow-xl space-y-4 font-sans">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 font-mono">
                {isFa ? 'ماتریس شکاف معماری و تحول به نسخه 1.0 (Architecture Gap & Transformation Matrix)' : 'Architecture Gap & Transformation Matrix'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isFa 
                  ? 'بررسی تطبیقی وضعیت سند پیشین نسبت به نیازمندی‌های نسخه 1.0 با برچسب‌های KEEP, MODIFY, REPLACE, REMOVE, ADD, VALIDATE.'
                  : 'Systematic transformation mapping legacy assumptions into production-ready specifications.'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right rtl:text-right ltr:text-left border-collapse font-sans">
                <thead>
                  <tr className="bg-[#070c16] text-slate-300 font-bold border-b border-slate-800 font-mono">
                    <th className="p-3 w-16">#</th>
                    <th className="p-3">{isFa ? 'بخش / بعد معماری' : 'Domain / Section'}</th>
                    <th className="p-3">{isFa ? 'وضعیت در سند قبلی' : 'Legacy State'}</th>
                    <th className="p-3">{isFa ? 'اقدام تحول' : 'Action'}</th>
                    <th className="p-3">{isFa ? 'وضعیت نهایی در نسخه 1.0' : 'State in v1.0'}</th>
                    <th className="p-3">{isFa ? 'دلیل و توجیه مهندسی' : 'Engineering Justification'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ARCHITECTURE_GAP_MATRIX.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#0c1628]/60 transition">
                      <td className="p-3 font-mono font-bold text-cyan-400">GAP-{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-100">{item.section}</td>
                      <td className="p-3 text-slate-400">{item.baselineStatus}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          item.status === 'REPLACE' 
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/50' 
                            : item.status === 'ADD' 
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' 
                              : item.status === 'KEEP'
                                ? 'bg-blue-950 text-blue-300 border border-blue-500/50'
                                : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-emerald-300 font-medium">{item.transformationSummaryFa}</td>
                      <td className="p-3 text-slate-400">{item.implementationAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: FINAL VERDICTS & SIGN-OFF */}
      {activeSubTab === 'verdicts' && (
        <div className="space-y-6">
          <div className="bg-[#0a0f1a]/95 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 font-sans">
            
            <div className="border-b border-slate-800 pb-5 space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>OFFICIAL VERDICTS & AUTHORIZATION</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-mono font-black text-white">
                {isFa ? 'احکام نهایی معماری و بیانیه آمادگی استقرار پایلوت' : 'Definitive Architectural Verdicts & Pilot Authorization'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                {isFa 
                  ? 'مصوبات قطعی حوزه‌های کلیدی سیستم جهت آغاز رسمی فاز اجرایی در سالن ماشین‌کاری کارخانجات مپنا پارس.'
                  : 'Official authorization verdicts across critical domains approving industrial pilot execution in Karaj plant.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FINAL_VERDICTS.map((v, idx) => (
                <div key={idx} className="bg-[#070c16] p-5 rounded-xl border border-slate-800 shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {isFa ? v.dimensionFa : v.dimension}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                      v.verdict === 'GO' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                        : v.verdict === 'CONDITIONAL_GO' 
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40' 
                          : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}>
                      {v.verdict}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 leading-relaxed font-sans">
                    {v.rationaleFa}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1 border-t border-slate-800 font-sans">
                    <span className="font-mono font-bold text-slate-300">{isFa ? 'پیش‌نیاز اجرا:' : 'Prerequisite:'} </span>
                    {v.prerequisite}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#050810] text-white p-5 rounded-xl text-xs space-y-2 font-mono border border-slate-800">
              <div className="flex items-center justify-between text-cyan-400 font-bold">
                <span>AUTHORITY: EXECUTIVE BOARD OF DIRECTORS</span>
                <span>STATUS: SIGNED & SEALED</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {isFa 
                  ? 'این سند مبنای غیرقابل تغییر معماری سامانه Mission Control مپنا پارس است. هرگونه انحراف از اصول قطعی (تفکیک ریاضی از هوش مصنوعی، رعایت حاکمیت انسانی و نگهداری حسابرسی‌پذیری مالی) نقض الزامات کیفی خواهد بود.'
                  : 'This master specification serves as the immutable architectural foundation of MAPNA Pars Mission Control. Any deviation from deterministic calculations, human authority, or financial lineage violates system governance.'}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
