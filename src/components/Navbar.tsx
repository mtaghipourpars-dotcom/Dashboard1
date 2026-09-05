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
  FileText, 
  Database, 
  History,
  AlertTriangle
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
    { id: 'cockpit', labelFa: 'میز فرماندهی (Cockpit)', labelEn: 'Cockpit', icon: Activity },
    { id: 'decision', labelFa: 'بسته تصمیم (Decision)', labelEn: 'Decision Package', icon: ShieldCheck, badge: 'VERDICT' },
    { id: 'council', labelFa: 'شورای مجازی (Council)', labelEn: 'Virtual Council', icon: Users },
    { id: 'graph', labelFa: 'گراف سازمانی (Graph)', labelEn: 'Enterprise Graph', icon: GitBranch },
    { id: 'simulator', labelFa: 'شبیه‌ساز شوک (Simulator)', labelEn: 'Disruption Simulator', icon: Sliders },
    { id: 'projects', labelFa: 'سبد پروژه‌ها (Projects)', labelEn: 'Projects & WBS', icon: Layers },
    { id: 'sap', labelFa: 'نقشه SAP (Data Blueprint)', labelEn: 'SAP Blueprint', icon: Database },
    { id: 'learning', labelFa: 'حافظه سازمانی (Learning)', labelEn: 'Learning Memory', icon: History }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Bar: Brand, Plant, SAP Link, Profile & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-800/80 gap-4">
          
          {/* Logo & System Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wide text-lg text-white">
                  MISSION CONTROL
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  v1.0-PROD
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>{isFa ? 'شرکت مهندسی و ساخت ژنراتور مپنا (پارس)' : 'MAPNA Pars Generator Co.'}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isFa ? 'کارخانه کرج / فردیس' : 'Karaj Heavy Plant'}
                </span>
              </p>
            </div>
          </div>

          {/* Center: System of Record vs Intelligence status chip */}
          <div className="hidden lg:flex items-center gap-3 text-xs bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-400">SAP S/4HANA:</span>
              <span className="text-slate-200">PP/PS/CO Synced</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">Core Engine:</span>
              <span className="text-slate-200">{isFa ? 'شبیه‌سازی قطعی رخداد-گسسته' : 'Discrete-Event Sim'}</span>
            </div>
          </div>

          {/* Right Controls: Project Picker, Golden Scenario Trigger, Strategy Profile & Lang */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Project Picker */}
            <div className="hidden sm:block text-xs">
              <select
                aria-label="Active Project"
                value={activeProject.projectId}
                onChange={e => setActiveProjectId(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              >
                {projects.map(p => (
                  <option key={p.projectId} value={p.projectId}>
                    {isFa ? p.name : p.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Strategic Mode Selector */}
            <div className="text-xs">
              <select
                aria-label="Strategic Priority Profile"
                value={strategicProfile}
                onChange={e => setStrategicProfile(e.target.value as StrategicProfile)}
                className="bg-slate-800 border border-slate-700 text-cyan-300 font-medium rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="BALANCED">{isFa ? 'پروفایل متوازن (Balanced)' : 'Balanced Delivery'}</option>
                <option value="CASH_CRISIS">{isFa ? 'بحران نقدینگی (Cash Crisis)' : 'Cash Crisis Mode'}</option>
                <option value="DELIVERY_CRISIS">{isFa ? 'حیثیت تحویل (Delivery Crisis)' : 'Delivery Crisis Mode'}</option>
                <option value="MARGIN_PROTECTION">{isFa ? 'حفظ سود (Margin Protection)' : 'Margin Protection'}</option>
              </select>
            </div>

            {/* Golden Scenario One-Click Reset */}
            <button
              onClick={onResetGoldenScenario}
              title={isFa ? 'اجرای سناریوی طلایی خرابی بورینگ پاما (Golden Scenario)' : 'Trigger PAMA Machine Golden Scenario'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                hasActiveDisruption 
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25' 
                  : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{isFa ? 'سناریوی طلایی' : 'Golden Scenario'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Toggle Persian / English"
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{isFa ? item.labelFa : item.labelEn}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Disruption Alert Strip if Active */}
      {hasActiveDisruption && (
        <div className="bg-amber-950/70 border-b border-amber-800/60 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
            <span className="font-semibold text-amber-300">
              {isFa ? 'هشدار اختلال فعال در منبع گلوگاهی:' : 'Active Disruption on Critical Resource:'}
            </span>
            <span className="truncate text-amber-100">
              {isFa 
                ? 'ماشین بورینگ پاما (PAMA Speedram) • توقف ۲۰ روزه اسپیندل هیدرولیک • اثر بر پروژه ژنراتور ۱۶۰ مگاوات' 
                : 'PAMA Speedram Boring CNC • 20-Day Hydraulic Spindle Outage • Impacting 160MW Generator Project'}
            </span>
            <button
              onClick={() => setActiveTab('decision')}
              className="ml-auto underline text-amber-300 hover:text-white font-medium shrink-0"
            >
              {isFa ? 'مشاهده بسته تصمیم شورای مجازی ←' : 'View Decision Package →'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
