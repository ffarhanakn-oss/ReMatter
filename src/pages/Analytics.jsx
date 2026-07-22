import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
} from 'recharts';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  TrendingUp,
  Leaf,
  PieChart as PieIcon,
  Activity,
  Layers,
  Sparkles,
  MapPin,
  ShieldCheck,
  Scale,
  Calendar,
  Filter,
  CheckCircle2,
  Zap,
  Globe,
  Award,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import SearchBar from '../components/common/SearchBar';

// --- Realistic Analytics Mock Datasets ---
const monthlyWasteTrendData = [
  { month: 'Jan', listed: 1850, diverted: 1620, co2Offset: 4200 },
  { month: 'Feb', listed: 2100, diverted: 1910, co2Offset: 5100 },
  { month: 'Mar', listed: 2450, diverted: 2280, co2Offset: 6300 },
  { month: 'Apr', listed: 2800, diverted: 2640, co2Offset: 7200 },
  { month: 'May', listed: 3200, diverted: 3050, co2Offset: 8400 },
  { month: 'Jun', listed: 3650, diverted: 3480, co2Offset: 9600 },
  { month: 'Jul', listed: 4100, diverted: 3950, co2Offset: 10800 },
];

const materialFlowData = [
  { category: 'Sludge & Chem', input: 4500, reused: 4200, efficiency: 93.3 },
  { category: 'Metals & Alloys', input: 3800, reused: 3650, efficiency: 96.0 },
  { category: 'Polymers', input: 2900, reused: 2750, efficiency: 94.8 },
  { category: 'Biomass', input: 2100, reused: 1950, efficiency: 92.8 },
  { category: 'Glass & Slag', input: 1500, reused: 1420, efficiency: 94.6 },
  { category: 'Textiles', input: 1200, reused: 1100, efficiency: 91.6 },
];

const monthlyMatchesData = [
  { month: 'Jan', completed: 180, pending: 30 },
  { month: 'Feb', completed: 230, pending: 40 },
  { month: 'Mar', completed: 280, pending: 45 },
  { month: 'Apr', completed: 310, pending: 50 },
  { month: 'May', completed: 360, pending: 55 },
  { month: 'Jun', completed: 410, pending: 62 },
  { month: 'Jul', completed: 460, pending: 70 },
];

const industryComparisonData = [
  { industry: 'Steel Works', diverted: 5400, co2Avoided: 14200 },
  { industry: 'Petrochemicals', diverted: 4200, co2Avoided: 11800 },
  { industry: 'Energy Grid', diverted: 3100, co2Avoided: 8900 },
  { industry: 'Agro-Chemicals', diverted: 2400, co2Avoided: 6400 },
  { industry: 'Paper & Pulp', diverted: 1800, co2Avoided: 4500 },
  { industry: 'Plastics Mfg', diverted: 1400, co2Avoided: 3800 },
];

const carbonReductionData = [
  { month: 'Jan', scope1: 1200, scope2: 800, scope3: 2200 },
  { month: 'Feb', scope1: 1500, scope2: 1000, scope3: 2600 },
  { month: 'Mar', scope1: 1800, scope2: 1200, scope3: 3300 },
  { month: 'Apr', scope1: 2100, scope2: 1400, scope3: 3700 },
  { month: 'May', scope1: 2400, scope2: 1600, scope3: 4400 },
  { month: 'Jun', scope1: 2700, scope2: 1800, scope3: 5100 },
  { month: 'Jul', scope1: 3000, scope2: 2000, scope3: 5800 },
];

const wasteDiversionDonut = [
  { name: 'Direct Industrial Reuse', value: 68, color: '#10b981' },
  { name: 'Secondary Reprocessing', value: 22, color: '#2563eb' },
  { name: 'Waste-to-Energy Recovery', value: 6, color: '#06b6d4' },
  { name: 'Controlled Residual Landfill', value: 4, color: '#f59e0b' },
];

const regionalHeatmapGrid = [
  { region: 'Rhine-Ruhr Cluster', metals: 'High (98%)', chems: 'High (94%)', polymers: 'Med (82%)', biomass: 'High (90%)' },
  { region: 'Gulf Coast Petrochem', metals: 'Med (84%)', chems: 'High (99%)', polymers: 'High (95%)', biomass: 'Med (78%)' },
  { region: 'Bavaria Industrial Park', metals: 'High (92%)', chems: 'Med (80%)', polymers: 'High (91%)', biomass: 'High (96%)' },
  { region: 'Nordic Circular Grid', metals: 'Med (76%)', chems: 'Med (79%)', polymers: 'Med (84%)', biomass: 'High (99%)' },
  { region: 'Tokyo Bay Symbiosis', metals: 'High (96%)', chems: 'High (91%)', polymers: 'High (93%)', biomass: 'Med (82%)' },
];

export const Analytics = () => {
  // Filter States
  const [dateRange, setDateRange] = useState('YTD 2026');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Raw Telemetry Dataset (CSV) downloaded successfully.');
    }, 600);
  };

  const handleDownloadPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('ESG Audit Executive Summary (PDF) generated successfully.');
    }, 800);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <PageHeader
        title="Circularity & ESG Analytics Engine"
        description="Enterprise-grade audit metrics on waste diversion rates, Scope 1-3 greenhouse gas offsets, material flow stoichiometry, and regional cluster heatmaps."
        badgeText="ISO 14064 Audit Compliant"
        breadcrumbs={['Platform', 'Analytics']}
      >
        <button
          onClick={handleExportCSV}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-98"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download ESG PDF Report</span>
        </button>
      </PageHeader>

      {/* --- ANALYTICS FILTER BAR --- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Telemetry Filters</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            Live Stream Connected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Date Range */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none font-medium cursor-pointer"
            >
              <option value="YTD 2026">YTD 2026</option>
              <option value="Q3 2026">Q3 2026</option>
              <option value="Last 12 Months">Last 12 Months</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>

          {/* Industry Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Industry Sector</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none font-medium cursor-pointer"
            >
              <option value="All">All Sectors</option>
              <option value="Steel">Steel & Metallurgy</option>
              <option value="Chemical">Petrochemicals</option>
              <option value="Plastics">Polymers</option>
              <option value="Paper">Paper & Pulp</option>
            </select>
          </div>

          {/* Material Category */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Material Category</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none font-medium cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Metals">Metals & Slag</option>
              <option value="Polymers">Polymers</option>
              <option value="Organics">Biomass & Organics</option>
              <option value="Sludge">Chemical Sludge</option>
            </select>
          </div>

          {/* State / Region */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Region / State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none font-medium cursor-pointer"
            >
              <option value="All">All Regions</option>
              <option value="North Rhine-Westphalia">Rhine-Ruhr Zone</option>
              <option value="Texas">Texas Gulf Coast</option>
              <option value="Bavaria">Bavaria Grid</option>
              <option value="Ohio">Ohio Valley</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- SECTION 1: CIRCULAR ECONOMY IMPACT METRIC CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Landfill Diversion Rate"
          value="96.8%"
          change="+4.2%"
          changeType="positive"
          changeLabel="vs 2025 target"
          icon={Leaf}
          badgeText="ISO 14001"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
        />

        <StatCard
          title="Cumulative Waste Diverted"
          value="22,890 Tons"
          change="+31.4%"
          changeType="positive"
          changeLabel="diverted from landfill"
          icon={BarChart3}
          badgeText="YTD 2026"
          iconBg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
        />

        <StatCard
          title="Total CO₂ Emissions Offset"
          value="51,600 tCO₂e"
          change="+28.9%"
          changeType="positive"
          changeLabel="Scope 1, 2, 3 mitigation"
          icon={Scale}
          badgeText="Verra Gold"
          iconBg="bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60"
        />

        <StatCard
          title="Circular Material Utilization"
          value="94.2%"
          change="+8.5%"
          changeType="positive"
          changeLabel="exchange efficiency"
          icon={PieIcon}
          badgeText="Grade A+"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
        />
      </div>

      {/* --- SECTION 2: VISUALLY IMPRESSIVE CHARTS GRID (ROW 1) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: Waste Stream Trajectory (Multi-Gradient Area Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Waste Volume Trajectory vs Diverted Tonnage
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly listed volume vs actual circular material diverted (2026 YTD)
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
              Area Chart
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyWasteTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorListed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDiverted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="listed" name="Listed Volume (T)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorListed)" />
                <Area type="monotone" dataKey="diverted" name="Diverted Volume (T)" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDiverted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CHART 2: Waste Diversion Breakdown (Donut/Pie Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Waste Diversion Methods
              </h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">Pie Chart</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Breakdown of how secondary raw materials are processed
            </p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteDiversionDonut}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {wasteDiversionDonut.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 dark:text-white">96.8%</span>
              <span className="text-[9px] text-emerald-500 font-mono font-bold uppercase">Diverted</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            {wasteDiversionDonut.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- SECTION 3: VISUALLY IMPRESSIVE CHARTS GRID (ROW 2) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CHART 3: Material Flow & Stoichiometric Efficiency (Composed Bar Chart) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Material Flow & Reuse</h3>
              <p className="text-[11px] text-slate-500">Input vs Reused Volume (Tons)</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">Bar Chart</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={materialFlowData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="input" name="Input Stream (T)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reused" name="Reused Output (T)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Carbon Reduction Breakdown (Scope 1, 2, 3 Stacked Area Chart) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Carbon Reduction (Scope 1-3)</h3>
              <p className="text-[11px] text-slate-500">tCO₂e Emissions Mitigation</p>
            </div>
            <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">Scope 3</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonReductionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="scope3" name="Scope 3 (Symbiosis)" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="scope1" name="Scope 1 (Direct)" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 5: Industry Comparison (Horizontal Bar Chart) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Industry Sector Comparison</h3>
              <p className="text-[11px] text-slate-500">Tons Diverted by Sector</p>
            </div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">Ranked</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryComparisonData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis dataKey="industry" type="category" stroke="#94a3b8" fontSize={9} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="diverted" name="Diverted Tons" fill="#059669" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- SECTION 4: REGIONAL HEATMAP MATRIX --- */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Regional Symbiosis Intensity Heatmap
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cross-cluster exchange density and efficiency index by geographic node
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
            Heatmap Matrix
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="p-3 pl-4">Industrial Region</th>
                <th className="p-3 text-center">Metals & Slag</th>
                <th className="p-3 text-center">Chemical Sludge</th>
                <th className="p-3 text-center">Polymers</th>
                <th className="p-3 text-center">Biomass & Organics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {regionalHeatmapGrid.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 pl-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    {row.region}
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-white shadow-2xs">
                      {row.metals}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-2xs">
                      {row.chems}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-600 text-white shadow-2xs">
                      {row.polymers}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-2xs">
                      {row.biomass}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
