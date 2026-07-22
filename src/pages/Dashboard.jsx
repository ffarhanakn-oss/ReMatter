import React, { useState, useEffect } from 'react';
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
} from 'recharts';
import {
  Building2,
  PackageCheck,
  GitMerge,
  Recycle,
  Scale,
  Sparkles,
  RefreshCw,
  MapPin,
  TrendingUp,
  Award,
  ArrowUpRight,
  ChevronRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Factory,
  Zap,
  Activity,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import FilterDropdown from '../components/common/FilterDropdown';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';

// --- Realistic Industrial Mock Data ---
const monthlyWasteData = [
  { month: 'Jan', listings: 340, matches: 210, diverted: 1850 },
  { month: 'Feb', listings: 410, matches: 260, diverted: 2100 },
  { month: 'Mar', listings: 480, matches: 310, diverted: 2450 },
  { month: 'Apr', listings: 520, matches: 340, diverted: 2800 },
  { month: 'May', listings: 590, matches: 390, diverted: 3200 },
  { month: 'Jun', listings: 642, matches: 428, diverted: 3650 },
  { month: 'Jul', listings: 710, matches: 484, diverted: 4100 },
];

const materialDistributionData = [
  { name: 'Sludge & Chemicals', value: 38, color: '#10b981' }, // Emerald
  { name: 'Metals & Alloys', value: 26, color: '#2563eb' }, // Blue
  { name: 'Polymers & Plastics', value: 18, color: '#06b6d4' }, // Cyan
  { name: 'Biomass & Organic', value: 12, color: '#8b5cf6' }, // Purple
  { name: 'Glass & Slag', value: 6, color: '#f59e0b' }, // Amber
];

const successfulMatchesData = [
  { month: 'Jan', completed: 180, pending: 30 },
  { month: 'Feb', completed: 230, pending: 40 },
  { month: 'Mar', completed: 280, pending: 45 },
  { month: 'Apr', completed: 310, pending: 50 },
  { month: 'May', completed: 360, pending: 55 },
  { month: 'Jun', completed: 410, pending: 62 },
  { month: 'Jul', completed: 460, pending: 70 },
];

const wasteCategoriesData = [
  { category: 'Hazardous Chem', volume: 4200, unit: 'Tons' },
  { category: 'Blast Slag', volume: 3800, unit: 'Tons' },
  { category: 'Bio Sludge', volume: 2900, unit: 'Tons' },
  { category: 'Recycled Fiber', volume: 2100, unit: 'Tons' },
  { category: 'Spent Catalyst', volume: 1820, unit: 'Tons' },
];

const topIndustriesData = [
  { industry: 'Steel & Metallurgy', volume: 5400, matches: 124 },
  { industry: 'Petrochemicals', volume: 4200, matches: 98 },
  { industry: 'Energy & Biofuels', volume: 3100, matches: 76 },
  { industry: 'Agro-processing', volume: 2400, matches: 58 },
  { industry: 'Packaging & Pulp', volume: 1800, matches: 42 },
];

const recentListingsData = [
  {
    id: 'SL-8841',
    title: 'High-Purity Gypsum Flue Dust',
    seller: 'Titan Cement Industries',
    volume: '450 Tons/mo',
    purity: '98.5%',
    location: 'Rhine-Ruhr Node',
    time: '14m ago',
    type: 'Inorganic',
  },
  {
    id: 'SL-8840',
    title: 'Spent Platinum Catalyst Slurry',
    seller: 'Apex Bio-Chem Corp',
    volume: '85 Tons',
    purity: '94.2%',
    location: 'Gulf Coast Hub',
    time: '42m ago',
    type: 'Precious Metals',
  },
  {
    id: 'SL-8839',
    title: 'Cellulose Bio-Sludge Residue',
    seller: 'Nordic Paper & Pulp Co.',
    volume: '1,200 Tons/mo',
    purity: '89.0%',
    location: 'Nordic EcoPark',
    time: '2h ago',
    type: 'Organic Biomass',
  },
  {
    id: 'SL-8838',
    title: 'Polyethylene Terephthalate Flakes',
    seller: 'PolyTech Packaging',
    volume: '320 Tons',
    purity: '99.1%',
    location: 'Bavaria Grid',
    time: '3h ago',
    type: 'Polymers',
  },
];

const recentRecommendationsData = [
  {
    id: 'REC-901',
    source: 'Steel Plant #4 (Blast Furnace)',
    target: 'EuroCem Infrastructure',
    matchScore: 98.4,
    material: 'Granulated Blast Slag',
    estSavings: '$145,000/yr',
    co2Reduction: '4,200 tCO₂e',
  },
  {
    id: 'REC-902',
    source: 'BioPharm Solutions',
    target: 'AgriFertilizer Organic Co.',
    matchScore: 96.1,
    material: 'Nitrogen Fermentation Broth',
    estSavings: '$82,000/yr',
    co2Reduction: '1,850 tCO₂e',
  },
  {
    id: 'REC-903',
    source: 'Bavaria Automotive Foundry',
    target: 'AluRecycle Metal Hub',
    matchScore: 94.8,
    material: 'Aluminum Scrap Shavings',
    estSavings: '$210,000/yr',
    co2Reduction: '6,100 tCO₂e',
  },
];

const recentCompaniesData = [
  {
    id: 'COMP-101',
    name: 'Holcim Circular Materials',
    sector: 'Building Materials',
    nodes: '12 Facilities',
    joined: '2h ago',
    status: 'Verified ISO 14001',
    location: 'Zurich, Switzerland',
  },
  {
    id: 'COMP-102',
    name: 'TotalEnergies Bio-Refining',
    sector: 'Energy & Chemicals',
    nodes: '8 Facilities',
    joined: '5h ago',
    status: 'Verified Scope 3',
    location: 'Paris, France',
  },
  {
    id: 'COMP-103',
    name: 'Nippon Steel Symbiosis',
    sector: 'Metallurgy',
    nodes: '18 Facilities',
    joined: '1d ago',
    status: 'Verified Enterprise',
    location: 'Tokyo, Japan',
  },
];

const industrialClustersData = [
  { name: 'Gulf Coast Petrochem Grid', region: 'Texas / Louisiana', nodes: 42, activeStreams: 184, volume: '4.8M Tons' },
  { name: 'Rhine-Ruhr EcoIndustrial Hub', region: 'Germany', nodes: 38, activeStreams: 162, volume: '3.9M Tons' },
  { name: 'Nordic Circular Forestry Park', region: 'Sweden / Finland', nodes: 29, activeStreams: 114, volume: '2.4M Tons' },
  { name: 'Tokyo Bay Industrial Symbiosis', region: 'Japan', nodes: 34, activeStreams: 148, volume: '3.1M Tons' },
];

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    // Simulate short initial data load for realistic feel
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <PageHeader
        title="Industrial Symbiosis Dashboard"
        description="Real-time circular material exchanges, AI match telemetry, and Scope 3 greenhouse gas mitigation metrics across your enterprise cluster."
        badgeText="Cluster Node #RM-9942"
        breadcrumbs={['Platform', 'Dashboard']}
      >
        <button
          onClick={triggerRefresh}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs"
          title="Refresh telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Sync Network</span>
        </button>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-98">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Export Telemetry</span>
        </button>
      </PageHeader>

      {/* --- SECTION 1: 5 TOP KPI CARDS --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <StatCard
              title="Total Companies"
              value="148"
              change="+12.4%"
              changeType="positive"
              changeLabel="vs last Q"
              icon={Building2}
              badgeText="Nodes"
              iconBg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <StatCard
              title="Active Waste Listings"
              value="642"
              change="+18.2%"
              changeType="positive"
              changeLabel="new streams"
              icon={PackageCheck}
              badgeText="Live"
              iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <StatCard
              title="Successful Matches"
              value="384"
              change="+24.5%"
              changeType="positive"
              changeLabel="match efficiency"
              icon={GitMerge}
              badgeText="AI Pipeline"
              iconBg="bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60"
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <StatCard
              title="Waste Diverted"
              value="14,820 T"
              change="+31.8%"
              changeType="positive"
              changeLabel="landfill avoided"
              icon={Recycle}
              badgeText="Landfill 0"
              iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <StatCard
              title="CO₂ Saved"
              value="42,900 T"
              change="+28.4%"
              changeType="positive"
              changeLabel="Scope 3 mitigated"
              icon={Scale}
              badgeText="tCO₂e"
              iconBg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
            />
          </motion.div>
        </motion.div>
      )}

      {/* --- SECTION 2: SUSTAINABILITY SCORE CARD & CLUSTER MAP --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sustainability Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-800/50 shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Symbiosis Health Score
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
              Grade A+
            </span>
          </div>

          <div className="my-6 flex items-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              {/* SVG Ring Progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray="94, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white leading-none">94</span>
                <span className="text-[9px] text-emerald-400 font-bold uppercase">/ 100</span>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Landfill Diversion Rate</span>
                  <span className="font-bold text-emerald-400">98%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Purity Match Rate</span>
                  <span className="font-bold text-teal-400">92%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-teal-400" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Logistics Optimization</span>
                  <span className="font-bold text-blue-400">95%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-blue-400" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ISO 50001 Certified Grid
            </span>
            <span className="text-emerald-400 font-medium">Updated 1h ago</span>
          </div>
        </motion.div>

        {/* Industrial Clusters Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Industrial Symbiosis Clusters
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Geo-spatial mapping of circular waste pipelines across partner enterprise hubs
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-fit">
              4 Regional Hubs Active
            </span>
          </div>

          {/* Interactive Stylized Grid Layout for Clusters */}
          <div className="relative h-44 rounded-xl bg-slate-950 p-4 overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Grid line effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-4 gap-3">
              {industrialClustersData.map((cluster, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{cluster.nodes} Nodes</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {cluster.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mb-1.5">{cluster.region}</p>
                  <div className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded text-center">
                    {cluster.volume}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> High Pipeline Velocity: Rhine-Ruhr Hub
            </span>
            <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              Explore Cluster Map <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- SECTION 3: RECHARTS ANALYTICS & CHARTS GRID --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Circular Economy Analytics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive waste volume trajectories, material category splits, and industry exchange volumes
            </p>
          </div>

          <FilterDropdown
            label="Sector View"
            options={[
              { id: 'all', label: 'All Industry Sectors' },
              { id: 'steel', label: 'Metallurgy' },
              { id: 'chemical', label: 'Chemicals' },
            ]}
          />
        </div>

        {/* Row 1 Charts: Monthly Waste Listings (Area Chart) & Material Distribution (Donut Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Waste Listings (Area Chart) */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Monthly Waste Stream Trajectory
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Volume of waste listings posted vs diverted tons (2026 YTD)
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                +24.8% YoY Growth
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyWasteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorListings" x1="0" y1="0" x2="0" y2="1">
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
                  <Area
                    type="monotone"
                    dataKey="listings"
                    name="Posted Streams"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorListings)"
                  />
                  <Area
                    type="monotone"
                    dataKey="diverted"
                    name="Diverted Volume (Tons)"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorDiverted)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Material Distribution (Donut Chart) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Material Share Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Percentage breakdown of secondary raw materials in circulation
              </p>
            </div>

            <div className="h-56 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={materialDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {materialDistributionData.map((entry, index) => (
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
                <span className="text-xl font-bold text-slate-900 dark:text-white">100%</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Circularity</span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              {materialDistributionData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 Charts: Successful Matches (Line Chart) & Waste Categories (Bar Chart) & Top Industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Successful Matches (Line Chart) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Symbiosis Match Pipeline
              </h3>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400">Completed vs Pending</span>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={successfulMatchesData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                  <Line type="monotone" dataKey="completed" name="Completed Exchanges" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="pending" name="Pending Contract" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waste Categories (Bar Chart) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Waste Volume by Category
              </h3>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400">Metric Tons</span>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteCategoriesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} tickLine={false} />
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
                  <Bar dataKey="volume" name="Tons Volume" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Industries Exchange Volume (Horizontal Bar Chart) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Top Exchanging Industries
              </h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">By Tonnage</span>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topIndustriesData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis dataKey="industry" type="category" stroke="#94a3b8" fontSize={9} tickLine={false} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="volume" name="Tons Exchanged" fill="#059669" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 4: RECENT ACTIVITY & LISTINGS FEEDS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Recent Waste Listings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Waste Streams</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Live Feed</span>
          </div>

          <div className="space-y-3">
            {recentListingsData.map((listing) => (
              <div
                key={listing.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/40 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    {listing.id}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {listing.time}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{listing.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{listing.seller} • {listing.location}</p>
                <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-600 dark:text-slate-300">
                  <span>Vol: {listing.volume}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Purity: {listing.purity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Recent AI Match Recommendations */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Symbiosis Pipeline</h3>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">High Match %</span>
          </div>

          <div className="space-y-3">
            {recentRecommendationsData.map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white">{rec.material}</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-600 text-white">
                    {rec.matchScore}% Match
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Source:</span>
                    <span className="font-medium">{rec.source}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target:</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">{rec.target}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono border-t border-blue-200/40 dark:border-blue-800/40 text-slate-500 dark:text-slate-400">
                  <span>Savings: {rec.estSavings}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{rec.co2Reduction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Recent Companies Joined */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">New Enterprise Nodes</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Directory</span>
          </div>

          <div className="space-y-3">
            {recentCompaniesData.map((comp) => (
              <div
                key={comp.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      {comp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{comp.name}</h4>
                      <p className="text-[10px] text-slate-400">{comp.sector} • {comp.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{comp.joined}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3 h-3" /> {comp.status}
                  </span>
                  <span>{comp.nodes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
