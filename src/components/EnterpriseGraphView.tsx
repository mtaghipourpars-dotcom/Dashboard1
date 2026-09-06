import React, { useState } from 'react';
import { 
  GitBranch, 
  Layers, 
  Cpu, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  Database,
  Filter,
  Shield,
  Activity,
  Zap
} from 'lucide-react';
import { 
  Language, 
  ImpactSummary, 
  ResourceNode, 
  ProductionOperation, 
  CommitmentNode,
  ProjectEntity
} from '../types';

interface EnterpriseGraphViewProps {
  lang: Language;
  impact: ImpactSummary;
  resources: ResourceNode[];
  operations: ProductionOperation[];
  commitments: CommitmentNode[];
  projects: ProjectEntity[];
  onNavigateTab: (tab: string) => void;
}

type GraphNodeType = 'RESOURCE' | 'OPERATION' | 'PROD_ORDER' | 'WBS' | 'COMMITMENT' | 'CASH';

interface SelectedNodeInfo {
  id: string;
  type: GraphNodeType;
  title: string;
  sapSource: string;
  status: string;
  details: Record<string, string | number | boolean>;
  downstreamImpact: string;
}

export const EnterpriseGraphView: React.FC<EnterpriseGraphViewProps> = ({
  lang,
  impact,
  resources,
  operations,
  commitments,
  projects,
  onNavigateTab
}) => {
  const isFa = lang === 'fa';
  const [filterAffectedOnly, setFilterAffectedOnly] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>({
    id: 'RES-MCH-BORING-PAMA',
    type: 'RESOURCE',
    title: isFa ? 'ماشین بورینگ و فرز سنگین CNC پاما (Speedram 2000)' : 'PAMA Speedram 2000 CNC Heavy Boring Machine',
    sapSource: 'SAP CRHD / KAKO (Work Center: WC-MCH-BORING01)',
    status: 'DISRUPTED',
    details: {
      'نوع منبع': 'MACHINE (کلاس دقت بالا)',
      'وضعیت عملیاتی': 'توقف اضطراری اسپیندل (۲۰ روز)',
      'نرخ ساعت کار': '۳۵,۰۰۰,۰۰۰ ریال/ساعت',
      'حداکثر وزن قطعه‌کار': '۱۲۰ تن',
      'تلرانس ماشین‌کاری': '۰.۰۱۲ میلی‌متر'
    },
    downstreamImpact: isFa 
      ? 'انتشار تاخیر ۲۲ روزه بر عملیات‌های ماشین‌کاری استاتور، تهدید مایل‌استون صورت‌وضعیت ۴۲ میلیارد ریالی و جریمه روزانه ۴۵۰ میلیون ریال.' 
      : 'Propagates 22 days delay onto stator milling, jeopardizing 42B IRR milestone collection and triggering 450M IRR/day penalties.'
  });

  // Nodes definition
  const nodes = [
    // Level 1: Resources
    {
      id: 'RES-MCH-BORING-PAMA',
      label: isFa ? 'بورینگ CNC پاما (Speedram 2000)' : 'PAMA Speedram 2000 CNC',
      sub: 'WC-MCH-BORING01',
      level: 1,
      type: 'RESOURCE' as GraphNodeType,
      status: 'DISRUPTED',
      isAffected: true,
      sap: 'CDS: I_WorkCenterCapacity'
    },
    {
      id: 'RES-MCH-LATHE-SKODA',
      label: isFa ? 'تراش سنگین اشکودا (Skoda Lathe)' : 'Skoda Heavy Lathe',
      sub: 'WC-MCH-LATHE01',
      level: 1,
      type: 'RESOURCE' as GraphNodeType,
      status: 'AVAILABLE',
      isAffected: false,
      sap: 'CDS: I_WorkCenterCapacity'
    },
    {
      id: 'RES-AUT-VPI-MICAMATION',
      label: isFa ? 'مخزن خلاء و اشباع VPI' : 'VPI Impregnation Tank',
      sub: 'WC-AUT-VPI01',
      level: 1,
      type: 'RESOURCE' as GraphNodeType,
      status: 'AVAILABLE',
      isAffected: false,
      sap: 'CDS: I_WorkCenterCapacity'
    },

    // Level 2: Operations
    {
      id: 'OP-JAH-020',
      label: isFa ? 'فرزکاری نشیمنگاه‌های استاتور (Milling Stator Footpads)' : 'Milling Stator Frame Footpads',
      sub: '160 Std Hrs • WC-MCH-BORING01',
      level: 2,
      type: 'OPERATION' as GraphNodeType,
      status: 'HALTED',
      isAffected: true,
      sap: 'CDS: I_ProductionOrderOperation'
    },
    {
      id: 'OP-JAH-025',
      label: isFa ? 'بورینگ محفظه یاتاقان‌ها و شیلدهای انتهایی' : 'Boring Bearing Housings & Endshields',
      sub: '120 Std Hrs • WC-MCH-BORING01',
      level: 2,
      type: 'OPERATION' as GraphNodeType,
      status: 'DELAYED',
      isAffected: true,
      sap: 'CDS: I_ProductionOrderOperation'
    },
    {
      id: 'OP-JAH-030',
      label: isFa ? 'ورق‌چینی و استکینگ هسته مغناطیسی' : 'Stator Core Stacking',
      sub: '240 Std Hrs • WC-MAN-STACK01',
      level: 2,
      type: 'OPERATION' as GraphNodeType,
      status: 'BLOCKED_BY_PRED',
      isAffected: true,
      sap: 'CDS: I_ProductionOrderOperation'
    },

    // Level 3: Production Orders & WBS
    {
      id: 'ORD-10084201',
      label: isFa ? 'سفارش ساخت استاتور ژنراتور ۱۶۰ مگاوات' : 'Production Order: Stator 160MW',
      sub: 'Order #10084201 • 80t Assembly',
      level: 3,
      type: 'PROD_ORDER' as GraphNodeType,
      status: 'CRITICAL_DELAY',
      isAffected: true,
      sap: 'CDS: I_ProductionOrder'
    },
    {
      id: 'WBS-PRJ-JAHROM-02',
      label: isFa ? 'عنصر WBS: ساخت استاتور ژنراتور جهرم' : 'WBS: Stator Manufacturing Jahrom',
      sub: 'WBS Level 3 • Cost Center CC-PRD-GEN',
      level: 4,
      type: 'WBS' as GraphNodeType,
      status: 'SCHEDULE_BREACH',
      isAffected: true,
      sap: 'CDS: I_EnterpriseProjectElement'
    },

    // Level 4: Contractual Commitments & Cash
    {
      id: 'CMT-JAH-01',
      label: isFa ? 'مایل‌استون تست کارخانه‌ای (FAT)' : 'Factory Acceptance Test (FAT)',
      sub: 'Contract Deadline: 1404/04/15',
      level: 5,
      type: 'COMMITMENT' as GraphNodeType,
      status: 'AT_RISK',
      isAffected: true,
      sap: 'Sales Contract Cl. 8.4'
    },
    {
      id: 'CMT-JAH-02',
      label: isFa ? 'تعهد تحویل سر کارگاه نیروگاه جهرم' : 'FOB Power Plant Site Delivery',
      sub: 'Penalties: 450M IRR / Day',
      level: 5,
      type: 'COMMITMENT' as GraphNodeType,
      status: 'AT_RISK',
      isAffected: true,
      sap: 'Contract Cl. 14.2'
    },
    {
      id: 'CASH-DEFICIT-IMPACT',
      label: isFa ? 'کسری و تعویق جریان نقدینگی خزانه‌داری' : 'Cash Flow Shift & Penalty Deficit',
      sub: '-9.9B IRR Penalties • 42B Inflow Delayed',
      level: 6,
      type: 'CASH' as GraphNodeType,
      status: 'BREACHED',
      isAffected: true,
      sap: 'Universal Journal (ACDOCA)'
    }
  ];

  const filteredNodes = filterAffectedOnly ? nodes.filter(n => n.isAffected) : nodes;

  const handleSelectNode = (node: typeof nodes[0]) => {
    let details: Record<string, string | number | boolean> = {};
    let impactText = '';

    if (node.type === 'RESOURCE') {
      details = {
        'کد مرکز کاری SAP': node.sub,
        'وضعیت': node.status,
        'سیستم مبدا': node.sap
      };
      impactText = isFa ? 'توقف اسپیندل، باعث تعلیق عملیات‌های ماشین‌کاری استاتور شده است.' : 'Spindle outage halts downstream milling operations.';
    } else if (node.type === 'OPERATION') {
      details = {
        'کد عملیات SAP': node.id,
        'مدت زمان استاندارد': node.sub,
        'جداول مرجع SAP': node.sap
      };
      impactText = isFa ? 'تاخیر ۲۲ روزه به عملیات بعدی (ورق‌چینی و استکینگ) منتقل می‌شود.' : 'Pushes a 22-day delay onto downstream core stacking.';
    } else if (node.type === 'COMMITMENT') {
      details = {
        'شناسه تعهد': node.id,
        'نوع تعهد': 'قراردادی صلب با کارفرمای دولتی (TPPH)',
        'نرخ جریمه': '۴۵۰ میلیون ریال روزانه'
      };
      impactText = isFa ? 'تخلف از موعد قرارداد موجب اعمال جریمه و تعویق دریافت نقدینگی خواهد شد.' : 'Breach triggers liquidated damages and delays inflow.';
    } else {
      details = {
        'شناسه گره': node.id,
        'جدول منبع SAP': node.sap,
        'وضعیت انتشار': node.status
      };
      impactText = isFa ? 'مشمول انتشار اثر چندبعدی در مدل نقدینگی و زمان‌بندی.' : 'Subject to multi-dimensional impact propagation.';
    }

    setSelectedNode({
      id: node.id,
      type: node.type,
      title: node.label,
      sapSource: node.sap,
      status: node.status,
      details,
      downstreamImpact: impactText
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Graph Overview */}
      <div className="bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'گراف دانش سازمانی و ردپای علت و معلولی' : 'Enterprise Causal Knowledge Graph'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-mono font-black text-white tracking-wide">
            {isFa ? 'ردیابی زنجیره انتشار اثر: از منبع تا نقدینگی' : 'Impact Propagation: Resource → Operation → Commitment → Cash'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans max-w-4xl">
            {isFa 
              ? 'نمایش روابط علّی و معلولی چندلایه بین تجهیزات کارگاهی، سفارشات تولید، مایل‌استون‌های پروژه و تعهدات نقدینگی خزانه‌داری.'
              : 'Multi-tiered causal dependency tracing from machine work centers down to contractual milestones and cash liquidity.'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
          <label className="flex items-center gap-2 bg-[#0c1628] px-3.5 py-2.5 rounded-xl border border-cyan-500/30 cursor-pointer text-cyan-200 hover:bg-[#12203a] font-medium transition">
            <input 
              type="checkbox" 
              checked={filterAffectedOnly} 
              onChange={e => setFilterAffectedOnly(e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            <span>{isFa ? 'فقط گره‌های متاثر از شوک' : 'Impacted Nodes Only'}</span>
          </label>

          <button
            onClick={() => onNavigateTab('decision')}
            className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white flex items-center gap-2 transition cursor-pointer shadow-lg border border-emerald-400/40 radar-glow-emerald"
          >
            <Shield className="w-4 h-4" />
            <span>{isFa ? 'بسته تصمیم' : 'Decision Package'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Main Graph Canvas & Node Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Graph Flow */}
        <div className="lg:col-span-2 bg-[#070c16] p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden cockpit-grid">
          
          {/* Layer Headers */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 pb-3 border-b border-slate-800">
            <span>{isFa ? 'لایه ۱: منابع' : 'L1: Resources'}</span>
            <span className="text-cyan-400">→</span>
            <span>{isFa ? 'لایه ۲: عملیات‌ها' : 'L2: Operations'}</span>
            <span className="text-cyan-400">→</span>
            <span>{isFa ? 'لایه ۳: سفارشات' : 'L3: Orders'}</span>
            <span className="text-cyan-400">→</span>
            <span>{isFa ? 'لایه ۴: تعهدات' : 'L4: Commitments'}</span>
            <span className="text-cyan-400">→</span>
            <span className="text-rose-400">{isFa ? 'لایه ۵: نقدینگی' : 'L5: Cash'}</span>
          </div>

          {/* Visual Cascading Nodes */}
          <div className="space-y-4">
            {/* Step 1: Disrupted Resource */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-300 block font-bold">
                [1] {isFa ? 'منبع آسیب‌دیده کارگاهی (Disrupted Machine Work Center)' : 'Disrupted Machine Work Center'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredNodes.filter(n => n.type === 'RESOURCE').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-4 rounded-xl border cursor-pointer transition text-xs relative ${
                      selectedNode?.id === n.id
                        ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/50 shadow-xl radar-glow-rose'
                        : n.status === 'DISRUPTED'
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-100 hover:border-rose-400'
                        : 'bg-[#0d1628] border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="truncate max-w-[180px] text-slate-100">{n.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        n.status === 'DISRUPTED' ? 'bg-rose-900 text-rose-200 border border-rose-500/50' : 'bg-emerald-900 text-emerald-200'
                      }`}>
                        {n.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-cyan-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{n.sap}</span>
                      <span className="text-cyan-300 font-bold">{isFa ? 'انتخاب' : 'Inspect'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downward Laser Conduit */}
            <div className="flex justify-center py-0.5">
              <div className="w-0.5 h-5 bg-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            </div>

            {/* Step 2: Operations Impacted */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-300 block font-bold">
                [2] {isFa ? 'عملیات‌های معلق و دارای انحراف (Affected Operations)' : 'Affected Operations'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredNodes.filter(n => n.type === 'OPERATION').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-xs ${
                      selectedNode?.id === n.id
                        ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl radar-glow-cyan'
                        : 'bg-[#0d1628] border-slate-800 text-slate-200 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="font-bold truncate text-slate-100">{n.label}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-500">{n.sap}</span>
                      <span className="text-amber-400 font-bold">{n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downward Laser Conduit */}
            <div className="flex justify-center py-0.5">
              <div className="w-0.5 h-5 bg-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            </div>

            {/* Step 3: Orders & WBS */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-300 block font-bold">
                [3] {isFa ? 'سفارشات ساخت و بسته‌های WBS (Orders & WBS Elements)' : 'Orders & WBS Elements'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredNodes.filter(n => n.type === 'PROD_ORDER' || n.type === 'WBS').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-xs ${
                      selectedNode?.id === n.id
                        ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl'
                        : 'bg-[#0d1628] border-slate-800 text-slate-200 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="font-bold truncate text-slate-100">{n.label}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-500">{n.sap}</span>
                      <span className="text-cyan-300 font-bold">{n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downward Laser Conduit */}
            <div className="flex justify-center py-0.5">
              <div className="w-0.5 h-5 bg-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            </div>

            {/* Step 4: Commitments & Cash */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-rose-300 block font-bold">
                [4] {isFa ? 'تعهدات قراردادی و جریان نقدینگی خزانه‌داری (Commitments & Cash Impact)' : 'Commitments & Cash Impact'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredNodes.filter(n => n.type === 'COMMITMENT' || n.type === 'CASH').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-xs ${
                      selectedNode?.id === n.id
                        ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/50 shadow-xl radar-glow-rose'
                        : n.type === 'CASH'
                        ? 'bg-[#150a10] border-rose-500/40 text-rose-200'
                        : 'bg-[#0d1628] border-slate-800 text-slate-200 hover:border-rose-500/40'
                    }`}
                  >
                    <div className="font-bold truncate text-slate-100">{n.label}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-500">{n.sap}</span>
                      <span className="text-rose-400 font-bold">{n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Node Inspector & SAP Blueprint Info */}
        <div className="bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" />
              <h2 className="font-mono font-bold text-base text-slate-100">
                {isFa ? 'شناسنامه گره گراف (Node Inspector)' : 'Node Inspector'}
              </h2>
            </div>
            {selectedNode && (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {selectedNode.type}
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs font-sans">
              <div>
                <h3 className="font-bold text-base text-slate-100 font-sans">{selectedNode.title}</h3>
                <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                  ID: {selectedNode.id}
                </span>
              </div>

              <div className="bg-[#070d18] p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                <span className="text-xs text-cyan-300 font-bold block">
                  {isFa ? 'منبع داده در SAP S/4HANA:' : 'SAP S/4HANA Source:'}
                </span>
                <p className="text-slate-300 text-xs">
                  {selectedNode.sapSource}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono font-bold text-slate-200 block">
                  {isFa ? 'ویژگی‌های کانونیکال گره:' : 'Node Attributes:'}
                </span>
                <div className="space-y-2 bg-[#070d18] p-3.5 rounded-xl border border-slate-800 font-mono">
                  {Object.entries(selectedNode.details).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{key}:</span>
                      <span className="font-semibold text-slate-200">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-950/40 border border-rose-500/40 p-3.5 rounded-xl space-y-1">
                <span className="text-rose-300 font-bold block text-xs font-mono">
                  {isFa ? 'اثر انتشار رو به جلو (Downstream Impact):' : 'Downstream Impact:'}
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedNode.downstreamImpact}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab('decision')}
                  className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg flex items-center justify-center gap-2 transition cursor-pointer border border-emerald-400/40"
                >
                  <Shield className="w-4 h-4" />
                  <span>{isFa ? 'اقدامات اصلاحی برای این گره' : 'Mitigation Action Plan'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-center py-10 font-mono">
              {isFa ? 'یک گره از گراف را جهت مشاهده جزئیات انتخاب فرمایید.' : 'Select a node in the graph to inspect properties.'}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
