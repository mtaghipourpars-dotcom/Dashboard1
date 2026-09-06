import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Globe2, 
  Sliders, 
  RotateCcw, 
  Cpu, 
  Layers, 
  GitBranch, 
  Users, 
  Database, 
  History,
  AlertTriangle,
  FileText,
  Download,
  BookOpen,
  Radio,
  Lock
} from 'lucide-react';
import { Language, StrategicProfile, ProjectEntity } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  strategicProfile: StrategicProfile;
  setStrategicProfile: (p: StrategicProfile) => void;
  activeProject: ProjectEntity;
  projects: ProjectEntity[];
  setActiveProjectId: (id: string) => void;
  onResetGoldenScenario: () => void;
  hasActiveDisruption: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  strategicProfile,
  setStrategicProfile,
  activeProject,
  projects,
  setActiveProjectId,
  onResetGoldenScenario,
  hasActiveDisruption
}) => {
  const isFa = lang === 'fa';

  const navItems = [
    { id: 'cockpit', num: '01', labelFa: 'میز فرماندهی', labelEn: 'Cockpit', icon: Activity },
    { id: 'decision', num: '02', labelFa: 'بسته تصمیم هیئت مدیره', labelEn: 'Decision Dossier', icon: ShieldCheck, badge: 'VERDICT' },
    { id: 'council', num: '03', labelFa: 'شورای عالی مدیران', labelEn: 'Executive Council', icon: Users },
    { id: 'graph', num: '04', labelFa: 'گراف انتشار اثرات', labelEn: 'Impact Topology', icon: GitBranch },
    { id: 'simulator', num: '05', labelFa: 'شبیه‌ساز شوک کارگاهی', labelEn: 'Shock Simulator', icon: Sliders },
    { id: 'projects', num: '06', labelFa: 'پروژه‌ها و ساختار شکست WBS', labelEn: 'Portfolio & WBS', icon: Layers },
    { id: 'sap', num: '07', labelFa: 'نگاشت معماری SAP S/4HANA', labelEn: 'SAP Blueprint', icon: Database },
    { id: 'learning', num: '08', labelFa: 'حافظه سازمانی و درس‌آموخته', labelEn: 'Corporate Memory', icon: History },
    { id: 'masterspec', num: '09', labelFa: 'سند مستر (۶۰ فصل، ۲۵ ADR)', labelEn: 'Master System Spec', icon: BookOpen, badge: '60 CH' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080d18]/95 backdrop-blur-xl border-b border-cyan-500/20 text-slate-100 shadow-2xl">
      {/* Top Tactical Status Stream */}
      <div className="bg-[#050810] border-b border-slate-800/80 px-4 py-1 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              MISSION CONTROL v1.0
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 hidden sm:inline">
              SYSTEM LEVEL: <span className="text-emerald-400 font-semibold">ENTERPRISE DECISION INTELLIGENCE</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-amber-400 hidden md:inline flex items-center gap-1">
              <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
              DEFCON 2: BOTTLENECK DISRUPTION ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <span className="hidden lg:inline flex items-center gap-1">
              <Lock className="w-3 h-3 text-cyan-500" />
              ENCRYPTED SAP CDS TUNNEL: <span className="text-slate-300">ONLINE (8ms)</span>
            </span>
            <span>
              AUTHORITY: <span className="text-cyan-300 font-bold">EXECUTIVE BOARD</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-800/60 gap-3">
          
          {/* Brand & Heavy Plant Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-950 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50">
              <Cpu className="w-5 h-5 text-cyan-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg text-white font-mono">
                  MAPNA PARS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 tracking-wider">
                  HIGH COMMAND
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="font-semibold text-slate-300">{isFa ? 'کارخانجات ساخت توربین و ژنراتور مپنا پارس' : 'MAPNA Heavy Generator Complex'}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isFa ? 'سالن ماشین‌کاری سنگین کرج' : 'Karaj Heavy Machining Hall'}
                </span>
              </p>
            </div>
          </div>

          {/* Tactical Center Telemetry Readout */}
          <div className="hidden xl:flex items-center gap-3 text-xs bg-[#0b1220] px-3.5 py-1.5 rounded-lg border border-cyan-500/20 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-400 font-bold">SAP S/4HANA:</span>
              <span className="text-emerald-300 font-bold">ACDOCA • AFKO • CRHD</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">SOLVER:</span>
              <span className="text-slate-200">{isFa ? 'بهینه‌ساز چندهدفه قطعی' : 'Deterministic Multi-Obj'}</span>
            </div>
          </div>

          {/* Right Controls: Project Picker, Golden Scenario Trigger, Strategy Profile & Lang */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Project Picker with Tactical Border */}
            <div className="hidden md:block text-xs font-mono">
              <select
                aria-label="Active Project"
                value={activeProject.projectId}
                onChange={e => setActiveProjectId(e.target.value)}
                className="bg-[#0b1322] border border-cyan-500/30 text-cyan-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-cyan-500 focus:outline-none shadow-inner hover:border-cyan-400 cursor-pointer"
              >
                {projects.map(p => (
                  <option key={p.projectId} value={p.projectId} className="bg-[#0b1322] text-slate-200">
                    [{p.sapProjectCode}] {isFa ? p.name : p.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Strategic Mode Selector */}
            <div className="text-xs font-mono">
              <select
                aria-label="Strategic Priority Profile"
                value={strategicProfile}
                onChange={e => setStrategicProfile(e.target.value as StrategicProfile)}
                className="bg-[#0c1a2e] border border-cyan-400/50 text-cyan-300 font-bold rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none shadow-inner cursor-pointer"
              >
                <option value="BALANCED" className="bg-[#0c1a2e] text-slate-100">{isFa ? '⚔️ پروفایل متوازن (Balanced)' : '⚔️ Balanced Readiness'}</option>
                <option value="CASH_CRISIS" className="bg-[#0c1a2e] text-slate-100">{isFa ? '🛡️ بحران نقدینگی (Cash Fortress)' : '🛡️ Cash Fortress Mode'}</option>
                <option value="DELIVERY_CRISIS" className="bg-[#0c1a2e] text-slate-100">{isFa ? '⚡ حیثیت تحویل (Delivery Crisis)' : '⚡ Delivery Supremacy'}</option>
                <option value="MARGIN_PROTECTION" className="bg-[#0c1a2e] text-slate-100">{isFa ? '💎 حفظ سود ناخالص (Margin)' : '💎 Margin Defense'}</option>
              </select>
            </div>

            {/* Golden Scenario Drill Trigger */}
            <button
              onClick={onResetGoldenScenario}
              title={isFa ? 'اجرای رزمایش شبیه‌سازی سناریوی طلایی خرابی بورینگ پاما (Golden Drill)' : 'Trigger PAMA Machine Golden Scenario Drill'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-md cursor-pointer ${
                hasActiveDisruption 
                  ? 'bg-gradient-to-r from-amber-600/30 to-rose-600/30 border border-amber-500/70 text-amber-200 hover:from-amber-600/40 hover:to-rose-600/40 radar-glow-amber' 
                  : 'bg-[#0e1626] border border-slate-700 text-slate-300 hover:bg-[#131e33] hover:border-slate-500'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span className="hidden sm:inline">{isFa ? 'رزمایش پاما (Golden Drill)' : 'Golden Drill'}</span>
            </button>

            {/* Comprehensive Dossier & Manual Download */}
            <a
              href="/MAPNA_Pars_Mission_Control_System_Manual.html"
              target="_blank"
              rel="noopener noreferrer"
              title={isFa ? 'مشاهده و چاپ سند دوسیه اجرایی، تحلیل ریاضی و دفترچه راهنما (PDF/HTML)' : 'Download Executive Board Dossier & System Manual (PDF/HTML)'}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 shadow-sm transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">{isFa ? 'دوسیه هیئت مدیره' : 'Executive Dossier'}</span>
              <Download className="w-3 h-3 text-cyan-400" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#0b1322] hover:bg-[#111c30] text-cyan-200 border border-cyan-500/30 shadow-inner transition cursor-pointer"
              title="Toggle Persian / English"
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>
          </div>
        </div>

        {/* Tactical Station Selector Tabs */}
        <nav className="flex items-center space-x-1.5 rtl:space-x-reverse overflow-x-auto py-2.5 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer relative ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 text-cyan-200 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {item.num}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
                <span className="font-sans text-xs">{isFa ? item.labelFa : item.labelEn}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold tracking-tight ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' 
                      : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-glow"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Disruption Alert Strip if Active */}
      {hasActiveDisruption && (
        <div className="bg-gradient-to-r from-rose-950/90 via-amber-950/80 to-rose-950/90 border-t border-b border-rose-500/40 px-4 py-2 text-xs text-rose-100 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5 max-w-7xl mx-auto w-full">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
            <span className="font-mono font-bold text-rose-300 tracking-wide">
              {isFa ? '[هشدار رخداد بحرانی کارخانه]' : '[CRITICAL BOTTLENECK ALERT]'}
            </span>
            <span className="truncate text-slate-200 font-medium">
              {isFa 
                ? 'مرکز کاری WC-MCH-BORING01 (بورینگ و فرز سنگین CNC پاما) • توقف ۲۰ روزه اسپیندل • انتشار اختلال به پروژه نیروگاهی جهرم (۱۶۰ مگاوات)' 
                : 'PAMA Speedram 2000 CNC Boring • 20-Day Hydraulic Spindle Failure • Critical Cascade into Jahrom 160MW Generator'}
            </span>
            <button
              onClick={() => setActiveTab('decision')}
              className="mr-auto rtl:mr-0 rtl:ml-auto underline font-mono font-bold text-cyan-300 hover:text-cyan-100 shrink-0 cursor-pointer flex items-center gap-1"
            >
              <span>{isFa ? 'احضار بسته تصمیم هیئت مدیره ←' : 'Summon Board Dossier →'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

