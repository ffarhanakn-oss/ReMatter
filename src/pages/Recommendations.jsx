import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  GitMerge,
  MapPin,
  DollarSign,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  TrendingUp,
  Award,
  Factory,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Check,
  Flame,
  Search,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import FilterDropdown from '../components/common/FilterDropdown';

// --- AI Recommendation Mock Dataset ---
const MOCK_RECOMMENDATIONS = [
  {
    id: 'REC-001',
    company: 'EuroCem Infrastructure GmbH',
    industry: 'Cement & Construction',
    compatibilityScore: 98.6,
    distanceKm: 18.5,
    expectedSavings: '$185,000 / yr',
    co2Benefit: '4,850 tCO₂e / yr',
    reuseApplication: 'Direct supplementary cementitious material (SCM) replacing virgin Portland clinker',
    materialNeeded: 'Vitrified Calcium Aluminosilicate Slag (Purity >95%)',
    status: 'Pipeline Ready',
    badges: ['Best Match', 'Nearby', 'High Compatibility'],
    verifiedISO: true,
    transportCost: '$4.20 / Ton',
  },
  {
    id: 'REC-002',
    company: 'AgriFertilizer Organic Co.',
    industry: 'Agro-Chemicals',
    compatibilityScore: 96.4,
    distanceKm: 34.2,
    expectedSavings: '$112,000 / yr',
    co2Benefit: '2,900 tCO₂e / yr',
    reuseApplication: 'Soil conditioning agent & acidity neutralizer for agricultural crop production',
    materialNeeded: 'Synthetic Gypsum Residue (FGD Gypsum)',
    status: 'High Interest',
    badges: ['Highly Sustainable', 'Nearby'],
    verifiedISO: true,
    transportCost: '$6.80 / Ton',
  },
  {
    id: 'REC-003',
    company: 'AluRecycle Metal Hub',
    industry: 'Metallurgy',
    compatibilityScore: 94.8,
    distanceKm: 42.0,
    expectedSavings: '$240,000 / yr',
    co2Benefit: '6,100 tCO₂e / yr',
    reuseApplication: 'Deoxidizing flux & secondary refining reagent in aluminum furnace batching',
    materialNeeded: 'High-purity EAF Dust & Slag Shavings',
    status: 'Negotiating Contract',
    badges: ['High Compatibility', 'Highly Sustainable'],
    verifiedISO: true,
    transportCost: '$8.50 / Ton',
  },
  {
    id: 'REC-004',
    company: 'Rhine-Ruhr Asphalt Logistics',
    industry: 'Road Infrastructure',
    compatibilityScore: 92.1,
    distanceKm: 24.8,
    expectedSavings: '$130,000 / yr',
    co2Benefit: '3,400 tCO₂e / yr',
    reuseApplication: 'Polymer-modified bitumen binder additive for heavy-duty highway surfacing',
    materialNeeded: 'Ground Crumb Rubber (40 Mesh)',
    status: 'Pipeline Ready',
    badges: ['Nearby', 'High Compatibility'],
    verifiedISO: false,
    transportCost: '$5.10 / Ton',
  },
  {
    id: 'REC-005',
    company: 'PolyTech Insulation Solutions',
    industry: 'Building Materials',
    compatibilityScore: 89.5,
    distanceKm: 58.7,
    expectedSavings: '$95,000 / yr',
    co2Benefit: '1,750 tCO₂e / yr',
    reuseApplication: 'Thermal & acoustic non-woven insulation batts for green building construction',
    materialNeeded: 'Recycled Synthetic Polyester Fiber Scraps',
    status: 'Sample Testing',
    badges: ['Highly Sustainable'],
    verifiedISO: true,
    transportCost: '$11.20 / Ton',
  },
  {
    id: 'REC-006',
    company: 'BioEnergy Cogeneration Grid',
    industry: 'Energy & Utilities',
    compatibilityScore: 86.8,
    distanceKm: 12.3,
    expectedSavings: '$78,000 / yr',
    co2Benefit: '2,100 tCO₂e / yr',
    reuseApplication: 'Biomass co-firing fuel feed for high-efficiency district heating boilers',
    materialNeeded: 'Dry Hardwood Sawdust & Bagasse Residue',
    status: 'Match Accepted',
    badges: ['Nearby', 'Best Match'],
    verifiedISO: true,
    transportCost: '$2.90 / Ton',
  },
];

const STREAMS_LIST = [
  { id: 'MAT-001', name: 'Granulated Blast Furnace Slag (1,200 T/mo)', source: 'Apex Steel Corp' },
  { id: 'MAT-002', name: 'Post-Industrial PE Regrind (450 T/mo)', source: 'PolymerRecycle Corp' },
  { id: 'MAT-003', name: 'Kiln-Dried Hardwood Sawdust (850 T/mo)', source: 'TimberCraft Furniture' },
  { id: 'MAT-005', name: 'Flue Gas Gypsum (3,400 T/mo)', source: 'EuroCem Infrastructure' },
];

export const Recommendations = () => {
  const [searchParams] = useSearchParams();
  const initialStream = searchParams.get('stream') || 'MAT-001';

  const [selectedStreamId, setSelectedStreamId] = useState(initialStream);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Trigger loading sequence function
  const runAiMatchingScan = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 600);
    setTimeout(() => setAnalysisStep(3), 1200);
    setTimeout(() => setAnalysisStep(4), 1800);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 2400);
  };

  // Run initial scan animation on first load
  useEffect(() => {
    runAiMatchingScan();
  }, []);

  // Sorted recommendations from highest score to lowest
  const sortedRecommendations = [...MOCK_RECOMMENDATIONS].sort(
    (a, b) => b.compatibilityScore - a.compatibilityScore
  );

  const currentStream = STREAMS_LIST.find((s) => s.id === selectedStreamId) || STREAMS_LIST[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <PageHeader
        title="AI Symbiosis Recommendation Engine"
        description="Machine learning stoichiometric matching connects industrial waste streams with nearest compatible receiving manufacturing facilities."
        badgeText="AI Engine v3.2 Active"
        breadcrumbs={['Platform', 'Recommendations']}
      >
        <button
          onClick={runAiMatchingScan}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-md transition-all active:scale-98 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAnalyzing ? 'Scanning Grid...' : 'Run AI Matching Scan'}</span>
        </button>
      </PageHeader>

      {/* Stream Selector Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Selected Material Stream</span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">{currentStream.name}</span>
              <span className="text-xs text-slate-500 font-medium">({currentStream.source})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <label className="text-xs font-semibold text-slate-500 shrink-0">Switch Stream:</label>
          <select
            value={selectedStreamId}
            onChange={(e) => {
              setSelectedStreamId(e.target.value);
              runAiMatchingScan();
            }}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none font-medium cursor-pointer"
          >
            {STREAMS_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} - {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Top Match Score"
          value="98.6%"
          change="Optimal Chemical Fit"
          changeType="positive"
          icon={Sparkles}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
        />
        <StatCard
          title="Nearest Recipient Node"
          value="18.5 km"
          change="Logistics Optimized"
          changeType="positive"
          icon={MapPin}
          iconBg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
        />
        <StatCard
          title="Total Potential CO₂ Avoided"
          value="21,100 T"
          change="Verified Model"
          changeType="positive"
          icon={Leaf}
          iconBg="bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60"
        />
      </div>

      {/* --- AI SCANNING ANIMATED SEQUENCE CONTAINER --- */}
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="p-10 sm:p-16 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-blue-500/20 border-b-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold tracking-tight text-white">
                ReMatter Symbiosis Engine Active
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Matching {currentStream.name} against 620 regional facilities
              </p>
            </div>

            {/* 4-Step Animated Progress List */}
            <div className="w-full max-w-md space-y-2.5 pt-2">
              <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-300 ${analysisStep >= 1 ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
                <span className="flex items-center gap-2">
                  {analysisStep >= 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="w-4 h-4 rounded-full border border-slate-700" />}
                  Step 1: Analyzing waste material stoichiometry...
                </span>
                {analysisStep === 1 && <span className="text-[10px] animate-pulse font-bold">RUNNING</span>}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-300 ${analysisStep >= 2 ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
                <span className="flex items-center gap-2">
                  {analysisStep >= 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="w-4 h-4 rounded-full border border-slate-700" />}
                  Step 2: Checking industrial compatibility...
                </span>
                {analysisStep === 2 && <span className="text-[10px] animate-pulse font-bold">RUNNING</span>}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-300 ${analysisStep >= 3 ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
                <span className="flex items-center gap-2">
                  {analysisStep >= 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="w-4 h-4 rounded-full border border-slate-700" />}
                  Step 3: Finding nearby industries...
                </span>
                {analysisStep === 3 && <span className="text-[10px] animate-pulse font-bold">RUNNING</span>}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-300 ${analysisStep >= 4 ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
                <span className="flex items-center gap-2">
                  {analysisStep >= 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="w-4 h-4 rounded-full border border-slate-700" />}
                  Step 4: Ranking sustainability & CO₂ impact...
                </span>
                {analysisStep === 4 && <span className="text-[10px] animate-pulse font-bold">FINALIZING</span>}
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- RESULTS RECOMMENDATION CARDS --- */
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Ranked Industrial Matches ({sortedRecommendations.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sorted by highest compatibility score to lowest
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                Sorted: Highest Compatibility %
              </span>
            </div>

            {/* Recommendation Cards Grid */}
            <div className="space-y-4">
              {sortedRecommendations.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl transition-all duration-200 space-y-4"
                >
                  {/* Top Bar: Company Name, Badges & Compatibility Score */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {item.company}
                        </h3>
                        {item.verifiedISO && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/50">
                            <ShieldCheck className="w-3 h-3" /> ISO 14001
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{item.industry}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" /> {item.distanceKm} km away
                        </span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                          Freight: {item.transportCost}
                        </span>
                      </div>
                    </div>

                    {/* Compatibility Score Gauge / Progress Bar */}
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700 shrink-0">
                      <div className="space-y-1 w-32">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-500 dark:text-slate-400">Match Fit</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono">{item.compatibilityScore}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.compatibilityScore}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-black text-slate-900 dark:text-white font-mono leading-none">
                          {item.compatibilityScore}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase font-mono block">Score</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges Row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-2xs border ${
                          badge === 'Best Match'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : badge === 'Nearby'
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                            : badge === 'Highly Sustainable'
                            ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800'
                            : 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800'
                        }`}
                      >
                        ★ {badge}
                      </span>
                    ))}

                    <span className="ml-auto px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Status: {item.status}
                    </span>
                  </div>

                  {/* Key Metrics Grid: Reuse Application, Material Needed, Cost Savings, CO2 Benefit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Reuse Application</span>
                      <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">{item.reuseApplication}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Material Specs Needed</span>
                      <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">{item.materialNeeded}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block">Est. Cost Savings</span>
                      <p className="font-black text-emerald-700 dark:text-emerald-300 text-base font-mono">{item.expectedSavings}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 block">Environmental Benefit</span>
                      <p className="font-black text-blue-700 dark:text-blue-300 text-base font-mono">{item.co2Benefit}</p>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400 font-mono">
                      Symbiosis Pipeline ID: {item.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Initiating sample exchange with ${item.company}...`)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Request Sample Batch
                      </button>

                      <button
                        onClick={() => alert(`Launching contract negotiation with ${item.company}...`)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs transition-colors flex items-center gap-1.5 active:scale-98"
                      >
                        <span>Initiate Symbiosis Pipeline</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recommendations;
