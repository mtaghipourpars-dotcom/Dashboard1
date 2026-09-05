import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CockpitView } from './components/CockpitView';
import { EnterpriseGraphView } from './components/EnterpriseGraphView';
import { DecisionPackageView } from './components/DecisionPackageView';
import { VirtualCouncilView } from './components/VirtualCouncilView';
import { SimulatorView } from './components/SimulatorView';
import { SapMappingView } from './components/SapMappingView';
import { LearningMemoryView } from './components/LearningMemoryView';
import { ProjectPortfolioView } from './components/ProjectPortfolioView';

import { 
  Language, 
  StrategicProfile, 
  DisruptionInput, 
  DecisionPackage, 
  ImpactSummary, 
  AlternativeOption 
} from './types';
import { 
  initialProjects, 
  initialResources, 
  initialOperations, 
  initialOrders,
  initialCommitments,
  goldenScenarioDisruption 
} from './data/mapnaParsData';
import { calculateImpactPropagation, generateAlternatives } from './services/simulationEngine';
import { synthesizeDecisionPackage } from './services/councilEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('cockpit');
  const [lang, setLang] = useState<Language>('fa');
  const [strategicProfile, setStrategicProfile] = useState<StrategicProfile>('BALANCED');
  const [activeProjectId, setActiveProjectId] = useState<string>('PRJ-MGT70-GEN-04');
  
  // Disruption state (defaults to the Golden Scenario)
  const [disruption, setDisruption] = useState<DisruptionInput>(goldenScenarioDisruption);
  const [overriddenAltId, setOverriddenAltId] = useState<string | null>(null);

  // Recompute simulation results deterministically
  const impactSummary: ImpactSummary = useMemo(() => {
    return calculateImpactPropagation(
      disruption,
      initialResources,
      initialOperations,
      initialOrders,
      initialProjects,
      initialCommitments
    );
  }, [disruption]);

  const alternatives: AlternativeOption[] = useMemo(() => {
    const alts = generateAlternatives(
      disruption,
      impactSummary,
      strategicProfile
    );

    if (overriddenAltId) {
      return alts.map(a => ({
        ...a,
        recommended: a.id === overriddenAltId
      }));
    }
    return alts;
  }, [disruption, impactSummary, strategicProfile, overriddenAltId]);

  const decisionPackage: DecisionPackage = useMemo(() => {
    const pkg = synthesizeDecisionPackage(
      disruption,
      impactSummary,
      alternatives,
      strategicProfile
    );
    if (overriddenAltId) {
      const chosen = alternatives.find(a => a.id === overriddenAltId);
      if (chosen) {
        pkg.recommendedAlternative = chosen;
        pkg.verdict = 'CONDITIONAL_GO';
        pkg.verdictReason = `تصمیم به صورت دستی توسط مدیرعامل به گزینه «${chosen.title}» تغییر یافت.`;
        pkg.verdictReasonEn = `Recommendation manually overridden by CEO to option "${chosen.titleEn}".`;
      }
    }
    return pkg;
  }, [disruption, impactSummary, alternatives, strategicProfile, overriddenAltId]);

  const activeProject = useMemo(() => {
    return initialProjects.find(p => p.projectId === activeProjectId) || initialProjects[0];
  }, [activeProjectId]);

  const handleRunSimulation = (newDisruption: DisruptionInput, profile: StrategicProfile) => {
    setOverriddenAltId(null);
    setDisruption(newDisruption);
    setStrategicProfile(profile);
  };

  const handleResetGoldenScenario = () => {
    setOverriddenAltId(null);
    setDisruption(goldenScenarioDisruption);
    setStrategicProfile('BALANCED');
  };

  const handleApproveDecision = (notes: string) => {
    console.log('Executive decision approved:', notes);
  };

  const handleOverrideAlternative = (altId: string, reason: string) => {
    setOverriddenAltId(altId);
    console.log('Executive override logged:', { altId, reason });
  };

  const isFa = lang === 'fa';

  return (
    <div 
      dir={isFa ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white ${isFa ? 'font-sans' : 'font-sans'}`}
    >
      {/* Top Application Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        strategicProfile={strategicProfile}
        setStrategicProfile={setStrategicProfile}
        activeProject={activeProject}
        projects={initialProjects}
        setActiveProjectId={setActiveProjectId}
        onResetGoldenScenario={handleResetGoldenScenario}
        hasActiveDisruption={disruption.downtimeDays > 0}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'cockpit' && (
          <CockpitView
            lang={lang}
            impact={impactSummary}
            decisionPackage={decisionPackage}
            resources={initialResources}
            projects={initialProjects}
            onNavigateTab={setActiveTab}
            onResetGoldenScenario={handleResetGoldenScenario}
          />
        )}

        {activeTab === 'decision' && (
          <DecisionPackageView
            lang={lang}
            decisionPackage={decisionPackage}
            strategicProfile={strategicProfile}
            onSelectStrategicProfile={setStrategicProfile}
            onNavigateTab={setActiveTab}
            onApproveDecision={handleApproveDecision}
            onOverrideAlternative={handleOverrideAlternative}
          />
        )}

        {activeTab === 'council' && (
          <VirtualCouncilView
            lang={lang}
            decisionPackage={decisionPackage}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'graph' && (
          <EnterpriseGraphView
            lang={lang}
            impact={impactSummary}
            resources={initialResources}
            operations={initialOperations}
            commitments={initialCommitments}
            projects={initialProjects}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'simulator' && (
          <SimulatorView
            lang={lang}
            disruption={disruption}
            strategicProfile={strategicProfile}
            resources={initialResources}
            impact={impactSummary}
            decisionPackage={decisionPackage}
            onRunSimulation={handleRunSimulation}
            onResetGoldenScenario={handleResetGoldenScenario}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectPortfolioView
            lang={lang}
            projects={initialProjects}
            operations={initialOperations}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'sap' && (
          <SapMappingView lang={lang} />
        )}

        {activeTab === 'learning' && (
          <LearningMemoryView 
            lang={lang}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer / System Status Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>MAPNA Pars Generator Co. • Mission Control v1.0</span>
            <span>|</span>
            <span>S/4HANA System of Record Connected</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Algorithm: Discrete-Event Sim + SimPy Queue</span>
            <span>Solver: Deterministic Multi-Objective</span>
            <span>Authority: Executive Board</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
