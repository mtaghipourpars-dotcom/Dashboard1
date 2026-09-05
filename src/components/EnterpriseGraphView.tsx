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
  RefreshCw
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
      label: isFa ? 'بورینگ CNC پاما (Speedram)' : 'PAMA Boring CNC',
      sub: 'WC-MCH-BORING01',
      level: 1,
      type: 'RESOURCE' as GraphNodeType,
      status: 'DISRUPTED',
      isAffected: true,
      sap: 'CRHD / KAKO'
    },
    {
      id: 'RES-MCH-GANTRY-WALDRICH',
      label: isFa ? 'فرز دروازه‌ای والدریش کوبورگ' : 'Waldrich Coburg Gantry',
      sub: 'WC-MCH-GANTRY02',
      level: 1,
      type: 'RESOURCE' as GraphNodeType,
      status: 'OPERATIONAL',
      isAffected: false,
      sap: 'CRHD / KAKO'
    },
    {
      id: 'RES-VPI-AUTOCLAVE-01',
      label: isFa ? 'کلاوه اشباع رزین VPI استاتور' : 'VPI Autoclave Plant',
      sub: 'WC-WND-VPI01',
      level: 1,
      type: 'RESOURCE' as GraphNodeType,
      status: 'OPERATIONAL',
      isAffected: true,
      sap: 'CRHD / KAKO'
    },

    // Level 2: Operations
    {
      id: 'OP-ST-0030',
      label: isFa ? 'OP-0030: فرزکاری شیارهای ریل استاتور' : 'OP-0030: Stator Frame Slotting',
      sub: '140h • WC-MCH-BORING01',
      level: 2,
      type: 'OPERATION' as GraphNodeType,
      status: 'DISRUPTED',
      isAffected: true,
      sap: 'AFVC / AFVV'
    },
    {
      id: 'OP-ST-0040',
      label: isFa ? 'OP-0040: ماشین‌کاری نشیمنگاه ژورنال' : 'OP-0040: Journal Bearing Machining',
      sub: '95h • Predecessor: OP-0030',
      level: 2,
      type: 'OPERATION' as GraphNodeType,
      status: 'DELAYED',
      isAffected: true,
      sap: 'AFVC / AFVV'
    },
    {
      id: 'OP-ST-0050',
      label: isFa ? 'OP-0050: پرس و استکینگ هسته استاتور' : 'OP-0050: Core Stacking & Pressing',
      sub: '110h • Hydraulic Press',
      level: 2,
      type: 'OPERATION' as GraphNodeType,
      status: 'DELAYED',
      isAffected: true,
      sap: 'AFVC / AFVV'
    },

    // Level 3: Production Orders
    {
      id: 'PO-GEN-ST-1092',
      label: isFa ? 'سفارش ساخت پوسته و استاتور ۱۶۰ مگاوات' : 'PO-1092: 160MW Stator Assembly',
      sub: 'Qty: 1 • Project: MGT70-GEN-04',
      level: 3,
      type: 'PROD_ORDER' as GraphNodeType,
      status: 'DELAYED',
      isAffected: true,
      sap: 'AFKO / AUFK'
    },
    {
      id: 'PO-GEN-ST-1093',
      label: isFa ? 'سفارش روتور ژنراتور کلاس F' : 'PO-1093: Class F Rotor Slotting',
      sub: 'Qty: 1 • Project: CLS-F-324MW',
      level: 3,
      type: 'PROD_ORDER' as GraphNodeType,
      status: 'AT_RISK',
      isAffected: true,
      sap: 'AFKO / AUFK'
    },

    // Level 4: Project WBS
    {
      id: 'WBS-MGT70-STATOR-FRAME',
      label: isFa ? 'WBS: ساخت فریم و هسته استاتور' : 'WBS: Stator Core & Frame',
      sub: 'PRJ-MGT70-GEN-04',
      level: 4,
      type: 'WBS' as GraphNodeType,
      status: 'CRITICAL',
      isAffected: true,
      sap: 'PROJ / PRPS'
    },

    // Level 5: Commitments
    {
      id: 'COMM-MGT70-MS2-BILLING',
      label: isFa ? 'مایل‌استون مالی مرحله ۴ (استکینگ و VPI)' : 'Milestone 4 Billing Gate (42B IRR)',
      sub: 'Due: 2026-06-30 • Cash Gate',
      level: 5,
      type: 'COMMITMENT' as GraphNodeType,
      status: 'AT_RISK',
      isAffected: true,
      sap: 'VBAK / VBKD'
    },
    {
      id: 'COMM-MGT70-FINAL-DELIVERY',
      label: isFa ? 'تعهد تحویل ژنراتور به نیروگاه (برق حرارتی)' : 'Customer Delivery Commitment (TPPH)',
      sub: 'Penalty: 450M IRR/day • LD Gate',
      level: 5,
      type: 'COMMITMENT' as GraphNodeType,
      status: 'CRITICAL',
      isAffected: true,
      sap: 'VBAK / VBKD'
    },

    // Level 6: Cash Impact
    {
      id: 'CASH-DEFICIT-IMPACT',
      label: isFa ? 'کسری و تعویق جریان نقدینگی خزانه‌داری' : 'Cash Flow Shift & Penalty Deficit',
      sub: '-9.9B IRR Penalties • 42B Inflow Delayed',
      level: 6,
      type: 'CASH' as GraphNodeType,
      status: 'BREACHED',
      isAffected: true,
      sap: 'FAGLFLEXA / BSEG'
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
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'گراف دانش سازمانی (Enterprise Knowledge Graph)' : 'Enterprise Knowledge Graph'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isFa ? 'ردیابی زنجیره انتشار اثر: از منبع تا نقدینگی' : 'Impact Propagation: Resource → Operation → Commitment → Cash'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isFa 
              ? 'نمایش روابط علّی و معلولی چندلایه بین تجهیزات کارگاهی، سفارشات تولید، مایل‌استون‌های پروژه و تعهدات نقدینگی خزانه‌داری.'
              : 'Multi-tiered causal dependency tracing from machine work centers down to contractual milestones and cash liquidity.'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <label className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer text-slate-300 hover:text-white">
            <input 
              type="checkbox" 
              checked={filterAffectedOnly} 
              onChange={e => setFilterAffectedOnly(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>{isFa ? 'فقط گره‌های متاثر از شوک' : 'Impacted Nodes Only'}</span>
          </label>

          <button
            onClick={() => onNavigateTab('decision')}
            className="px-4 py-2 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 transition"
          >
            <span>{isFa ? 'مشاهده بسته تصمیم' : 'Decision Package'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Main Graph Canvas & Node Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Graph Flow */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
          
          {/* Layer Headers */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800/80">
            <span>{isFa ? 'لایه ۱: منابع (Resources)' : 'L1: Resources'}</span>
            <span>↓</span>
            <span>{isFa ? 'لایه ۲: عملیات‌ها (Operations)' : 'L2: Operations'}</span>
            <span>↓</span>
            <span>{isFa ? 'لایه ۳: سفارشات (Orders)' : 'L3: Orders'}</span>
            <span>↓</span>
            <span>{isFa ? 'لایه ۴: تعهدات (Commitments)' : 'L4: Commitments'}</span>
            <span>↓</span>
            <span className="text-cyan-400">{isFa ? 'لایه ۵: نقدینگی (Cash)' : 'L5: Cash'}</span>
          </div>

          {/* Visual Cascading Nodes */}
          <div className="space-y-4">
            {/* Step 1: Disrupted Resource */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-semibold">
                [1] {isFa ? 'منبع آسیب‌دیده کارگاهی (Disrupted Machine Work Center)' : 'Disrupted Machine Work Center'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredNodes.filter(n => n.type === 'RESOURCE').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-xs relative ${
                      selectedNode?.id === n.id
                        ? 'bg-rose-950/40 border-rose-400 ring-2 ring-rose-500/30'
                        : n.status === 'DISRUPTED'
                        ? 'bg-rose-950/20 border-rose-500/60 text-rose-200 hover:border-rose-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2">
                        <Cpu className={`w-4 h-4 ${n.status === 'DISRUPTED' ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
                        <span className="truncate">{n.label}</span>
                      </div>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400">
                        {n.sap}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between">
                      <span>{n.sub}</span>
                      <span className={`font-bold ${n.status === 'DISRUPTED' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {n.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Propagation Vector Arrow */}
            <div className="flex justify-center py-1 text-slate-600">
              <div className="w-0.5 h-6 bg-rose-500/60 animate-pulse"></div>
            </div>

            {/* Step 2: Affected Operations */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-semibold">
                [2] {isFa ? 'عملیات‌های معوق ساخت (Affected Operations Chain)' : 'Affected Operations Routing'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredNodes.filter(n => n.type === 'OPERATION').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs ${
                      selectedNode?.id === n.id
                        ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/30'
                        : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="font-semibold truncate">{n.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">{n.sap}</span>
                      <span className="text-amber-400 font-mono font-bold">{n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Propagation Vector Arrow */}
            <div className="flex justify-center py-1 text-slate-600">
              <div className="w-0.5 h-6 bg-amber-500/60 animate-pulse"></div>
            </div>

            {/* Step 3: Orders & WBS */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-semibold">
                [3] {isFa ? 'سفارشات تولید و ساختار شکست کار (Production Orders & WBS)' : 'Production Orders & Project WBS'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredNodes.filter(n => n.type === 'PROD_ORDER' || n.type === 'WBS').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs ${
                      selectedNode?.id === n.id
                        ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/30'
                        : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="font-semibold truncate">{n.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">{n.sap}</span>
                      <span className="text-cyan-400 font-mono font-bold">{n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Propagation Vector Arrow */}
            <div className="flex justify-center py-1 text-slate-600">
              <div className="w-0.5 h-6 bg-cyan-500/60 animate-pulse"></div>
            </div>

            {/* Step 4: Commitments & Cash */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-semibold">
                [4] {isFa ? 'تعهدات قراردادی و جریان نقدینگی خزانه‌داری (Commitments & Cash Impact)' : 'Commitments & Cash Impact'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredNodes.filter(n => n.type === 'COMMITMENT' || n.type === 'CASH').map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNode(n)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs ${
                      selectedNode?.id === n.id
                        ? 'bg-rose-950/40 border-rose-400 ring-2 ring-rose-500/30'
                        : n.type === 'CASH'
                        ? 'bg-slate-900 border-rose-500/40 text-rose-200'
                        : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-rose-500/40'
                    }`}
                  >
                    <div className="font-bold truncate text-slate-100">{n.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">{n.sub}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">{n.sap}</span>
                      <span className="text-rose-400 font-mono font-bold">{n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Node Inspector & SAP Blueprint Info */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <h2 className="font-bold text-sm text-white">
                {isFa ? 'شناسنامه گره گراف (Node Inspector)' : 'Node Inspector'}
              </h2>
            </div>
            {selectedNode && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                {selectedNode.type}
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-sm text-slate-100">{selectedNode.title}</h3>
                <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                  ID: {selectedNode.id}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] text-cyan-400 font-mono font-semibold block">
                  {isFa ? 'منبع داده در SAP S/4HANA:' : 'SAP S/4HANA Source:'}
                </span>
                <p className="font-mono text-slate-300 text-[11px]">
                  {selectedNode.sapSource}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-slate-300 block">
                  {isFa ? 'ویژگی‌های کانونیکال گره:' : 'Node Attributes:'}
                </span>
                <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  {Object.entries(selectedNode.details).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{key}:</span>
                      <span className="font-mono text-slate-200">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded-xl space-y-1">
                <span className="text-rose-400 font-bold block text-[11px]">
                  {isFa ? 'اثر انتشار رو به جلو (Downstream Impact):' : 'Downstream Impact:'}
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {selectedNode.downstreamImpact}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab('decision')}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md flex items-center justify-center gap-2 transition"
                >
                  <span>{isFa ? 'اقدامات اصلاحی برای این گره' : 'Mitigation Action Plan'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-center py-10">
              {isFa ? 'یک گره از گراف را جهت مشاهده جزئیات انتخاب فرمایید.' : 'Select a node in the graph to inspect properties.'}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
