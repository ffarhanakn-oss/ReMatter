import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  Award,
  Recycle,
  Scale,
  GitMerge,
  FileText,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Clock,
  Plus,
  Share2,
  MessageSquare,
  Factory,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';

// --- Realistic Company Profile Dataset ---
const COMPANY_DATA = {
  id: 'COMP-101',
  name: 'Apex Steel & Metallurgy Corp',
  tagline: 'Leading Circular Metallurgy & Low-Carbon Steel Manufacturing',
  logoText: 'AS',
  industry: 'Metallurgy & Heavy Industry',
  established: '1984',
  facilitySize: '420,000 m²',
  employees: '1,450+',
  location: 'Duisburg Industrial Zone, North Rhine-Westphalia, Germany',
  coordinates: '51.4344° N, 6.7623° E',
  contact: {
    name: 'Dr. Aris Thorne',
    title: 'Chief Sustainability Officer',
    email: 'aris.thorne@greenmetal.io',
    phone: '+49 203 9942 018',
    website: 'https://apexsteel.io',
    address: 'Kaiser-Wilhelm-Straße 100, 47166 Duisburg, Germany',
  },
  sustainabilityMetrics: {
    wasteReused: '18,450 Tons',
    co2Saved: '48,200 tCO₂e',
    successfulExchanges: '142 Completed',
    landfillDiversion: '96.8%',
  },
  certifications: [
    { name: 'ISO 14001:2015', label: 'Environmental Management', verified: true, date: 'Exp 2028' },
    { name: 'ISO 50001', label: 'Energy Management System', verified: true, date: 'Exp 2027' },
    { name: 'Circular Economy Gold Accord', label: 'Verra Carbon Standard', verified: true, date: 'Exp 2029' },
    { name: 'EcoVadis Platinum', label: 'Top 1% Sustainability Rating', verified: true, date: 'Active 2026' },
  ],
  description: `Apex Steel & Metallurgy Corp operates one of Europe's most technologically advanced integrated steel works. We are committed to 100% circular economy integration by recycling 18,000+ tons of secondary blast furnace slag, mill scale, and electric arc furnace dust per year. Our facility serves as a primary anchor node in the Rhine-Ruhr Industrial Symbiosis Cluster.`,
  materialsRequired: [
    { name: 'High-Purity Lime Residue', spec: 'CaCO₃ > 92%', quantity: '800 Tons/mo', urgency: 'High' },
    { name: 'Recycled Aluminum Scrap', spec: 'Shavings / Sheet 6000 series', quantity: '450 Tons/mo', urgency: 'Medium' },
    { name: 'Refractory Brick Cullet', spec: 'Alumina-Magnesia slag', quantity: '300 Tons/mo', urgency: 'Normal' },
  ],
  wasteGenerated: [
    { name: 'Granulated Blast Furnace Slag', spec: 'Vitrified silicate (>95% glass)', volume: '1,200 Tons/mo', status: 'Available' },
    { name: 'Electric Arc Furnace Dust (EAF)', spec: 'Zinc oxide rich residue', volume: '920 Tons/mo', status: 'Available' },
    { name: 'Iron Oxide Mill Scale', spec: 'Fe content > 70%', volume: '650 Tons/mo', status: 'Contracted' },
  ],
  currentListings: [
    {
      id: 'MAT-001',
      title: 'Granulated Blast Furnace Slag',
      quantity: '1,200 Tons/mo',
      price: '$38 / Ton',
      purity: '98.5%',
      availability: 'Available Now',
    },
    {
      id: 'MAT-011',
      title: 'Electric Arc Furnace Dust (EAF Dust)',
      quantity: '920 Tons/mo',
      price: '$25 / Ton',
      purity: '85.4%',
      availability: 'Contract Pending',
    },
  ],
  timeline: [
    { date: 'Jul 18, 2026', title: 'Contract Finalized', desc: 'Agreed on 1,200 T/mo Slag exchange pipeline with EuroCem Infrastructure.' },
    { date: 'Jun 30, 2026', title: 'ISO 50001 Audit Completed', desc: 'Achieved 96.8% energy efficiency score certified by TÜV Rheinland.' },
    { date: 'May 14, 2026', title: 'EcoVadis Platinum Awarded', desc: 'Ranked in top 1% global sustainability benchmark for heavy industry.' },
    { date: 'Apr 02, 2026', title: 'Joined ReMatter Symbiosis Grid', desc: 'Registered 3 facility nodes and published initial byproduct catalog.' },
  ],
  documents: [
    { name: 'ISO_14001_Certificate_ApexSteel.pdf', size: '2.4 MB', date: 'Jan 2026', type: 'PDF' },
    { name: 'Granulated_Slag_SDS_Datasheet.pdf', size: '1.8 MB', date: 'Mar 2026', type: 'PDF' },
    { name: 'Annual_ESG_Circularity_Report_2025.pdf', size: '8.1 MB', date: 'May 2026', type: 'PDF' },
  ],
  gallery: [
    { title: 'Blast Furnace Granulator Plant', category: 'Sludge Recovery' },
    { title: 'Secondary Slag Storage Silos', category: 'Logistics' },
    { title: 'Automated Chemical Sampling Lab', category: 'Quality Control' },
    { title: 'Rail Logistics Terminal', category: 'Transport Hub' },
  ],
};

export const Companies = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'materials' | 'activity' | 'documents'

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Enterprise Facility Profile"
        description="Detailed verification parameters, material input requirements, waste byproduct catalog, and circularity credentials."
        badgeText="Verified Enterprise Node"
        breadcrumbs={['Platform', 'Companies', COMPANY_DATA.name]}
      >
        <button
          onClick={() => alert(`Initiating direct message to ${COMPANY_DATA.contact.name}...`)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Contact CSO</span>
        </button>

        <button
          onClick={() => alert(`Requesting joint symbiosis partnership with ${COMPANY_DATA.name}...`)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>Request Symbiosis Partnership</span>
        </button>
      </PageHeader>

      {/* --- HERO COMPANY PROFILE HEADER CARD --- */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Banner Graphic Header */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 relative p-6 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
          <span className="relative z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-600/80 backdrop-blur-md border border-emerald-400/40">
            Node ID: {COMPANY_DATA.id}
          </span>
        </div>

        {/* Company Avatar & Key Info Section */}
        <div className="p-6 sm:p-8 pt-0 relative space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-12 sm:-mt-16">
            <div className="flex items-end gap-4">
              {/* Company Logo Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-black text-3xl sm:text-4xl flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-2xl shrink-0">
                {COMPANY_DATA.logoText}
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {COMPANY_DATA.name}
                  </h1>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    <ShieldCheck className="w-3.5 h-3.5" /> ISO 14001 Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {COMPANY_DATA.tagline}
                </p>
              </div>
            </div>

            {/* Location & Sector Badge */}
            <div className="flex flex-col md:items-end space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200">{COMPANY_DATA.industry}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {COMPANY_DATA.location}
              </span>
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">CSO Lead</span>
                <span className="font-bold text-slate-900 dark:text-white">{COMPANY_DATA.contact.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Email</span>
                <a href={`mailto:${COMPANY_DATA.contact.email}`} className="font-bold text-emerald-600 hover:underline">
                  {COMPANY_DATA.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Phone</span>
                <span className="font-bold text-slate-900 dark:text-white">{COMPANY_DATA.contact.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Official Web</span>
                <a href={COMPANY_DATA.contact.website} target="_blank" rel="noreferrer" className="font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  apexsteel.io <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MONTHLY SUSTAINABILITY METRICS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Waste Reused (YTD)"
          value={COMPANY_DATA.sustainabilityMetrics.wasteReused}
          change="+18.4%"
          changeType="positive"
          changeLabel="vs 2025"
          icon={Recycle}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
        />

        <StatCard
          title="CO₂ Saved"
          value={COMPANY_DATA.sustainabilityMetrics.co2Saved}
          change="+24.1%"
          changeType="positive"
          changeLabel="Scope 3 offset"
          icon={Scale}
          badgeText="Verified"
          iconBg="bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60"
        />

        <StatCard
          title="Successful Exchanges"
          value={COMPANY_DATA.sustainabilityMetrics.successfulExchanges}
          change="+14 new"
          changeType="positive"
          changeLabel="this quarter"
          icon={GitMerge}
          iconBg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
        />

        <StatCard
          title="Landfill Diversion Rate"
          value={COMPANY_DATA.sustainabilityMetrics.landfillDiversion}
          change="Grade A+"
          changeType="positive"
          icon={Award}
          badgeText="Top 1%"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
        />
      </div>

      {/* --- PROFILE TABS NAVIGATION --- */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Company Overview & Marketplace
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'materials'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Material Inputs & Waste By-Products
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'activity'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Timeline & Facility Map
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'documents'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          ESG Compliance Documents & Gallery
        </button>
      </div>

      {/* --- TAB CONTENT SECTIONS --- */}

      {/* TAB 1: OVERVIEW & ACTIVE MARKETPLACE LISTINGS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Description & Certifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                About {COMPANY_DATA.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {COMPANY_DATA.description}
              </p>
              <div className="pt-3 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Established</span>
                  <span className="font-bold text-slate-900 dark:text-white">{COMPANY_DATA.established}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Facility Footprint</span>
                  <span className="font-bold text-slate-900 dark:text-white">{COMPANY_DATA.facilitySize}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Workforce</span>
                  <span className="font-bold text-slate-900 dark:text-white">{COMPANY_DATA.employees}</span>
                </div>
              </div>
            </div>

            {/* Active Marketplace Listings Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Active Waste Listings ({COMPANY_DATA.currentListings.length})
                  </h3>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Public Marketplace</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMPANY_DATA.currentListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {listing.id}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {listing.availability}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{listing.title}</h4>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/40 dark:border-slate-700/40">
                      <span>Qty: {listing.quantity}</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{listing.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Certifications Panel */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4 h-fit">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Verified Certifications
              </h3>
            </div>

            <div className="space-y-3">
              {COMPANY_DATA.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{cert.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 pl-5">{cert.label}</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MATERIALS REQUIRED & WASTE GENERATED */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Materials Required (Inputs sought) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-500 rotate-180" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Secondary Materials Required (Inputs Sought)
                </h3>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Seeking Suppliers</span>
            </div>

            <div className="space-y-3">
              {COMPANY_DATA.materialsRequired.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{mat.name}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                      Urgency: {mat.urgency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono">Specification: {mat.spec}</p>
                  <p className="text-[11px] text-slate-500 font-mono">Volume Target: {mat.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Generated (By-products produced) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Waste By-Products Generated (Outputs Offered)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Available Output</span>
            </div>

            <div className="space-y-3">
              {COMPANY_DATA.wasteGenerated.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{mat.name}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-600 text-white">
                      {mat.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono">Composition: {mat.spec}</p>
                  <p className="text-[11px] text-slate-500 font-mono">Monthly Output: {mat.volume}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TIMELINE & MAP PLACEHOLDER */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities Timeline */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Symbiosis Activity Timeline
              </h3>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {COMPANY_DATA.timeline.map((item, idx) => (
                <div key={idx} className="relative space-y-1">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.date}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Facility Map Placeholder */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Regional Facility Geo-Map
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{COMPANY_DATA.coordinates}</span>
            </div>

            <div className="h-64 rounded-xl bg-slate-950 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-extrabold text-white">{COMPANY_DATA.name}</h4>
                <p className="text-xs text-slate-400 max-w-xs">{COMPANY_DATA.location}</p>
                <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  Cluster Node Connected: Rhine-Ruhr Hub #04
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENTS & GALLERY PLACEHOLDER */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents Download List */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Verified ESG Compliance Documents
              </h3>
            </div>

            <div className="space-y-3">
              {COMPANY_DATA.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                      {doc.type}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400">{doc.size} • Uploaded {doc.date}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading ${doc.name}...`)}
                    className="p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Download document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Gallery Grid Placeholder */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Facility & Infrastructure Gallery
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {COMPANY_DATA.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="h-28 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 p-3 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                  <span className="text-[9px] uppercase font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded w-fit mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
