import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  X,
  ArrowUpDown,
  RotateCcw,
  CheckCircle2,
  FileText,
  Truck,
  Droplets,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import StatCard from '../components/common/StatCard';
import EmptyState from '../components/common/EmptyState';

// --- 20 Realistic Industrial Waste Listings ---
const INITIAL_LISTINGS = [
  {
    id: 'MAT-001',
    title: 'Granulated Blast Furnace Slag',
    company: 'Apex Steel & Metallurgy Corp',
    industry: 'Steel',
    materialCategory: 'Metals & Minerals',
    quantity: '1,200 Tons/mo',
    quantityNum: 1200,
    district: 'Duisburg',
    state: 'North Rhine-Westphalia',
    price: '$38 / Ton',
    priceNum: 38,
    availability: 'Available Now',
    postedDate: '2 hours ago',
    purity: '98.5%',
    moisture: '1.2%',
    description: 'High-calcium vitrified blast furnace slag suitable for Portland cement formulation, geopolymer concrete, and road base stabilization.',
    imageBg: 'from-emerald-900 to-slate-900',
    colorBadge: 'bg-emerald-500',
    verified: true,
  },
  {
    id: 'MAT-002',
    title: 'Post-Industrial PE Regrind Flakes',
    company: 'PolymerRecycle Corp',
    industry: 'Plastic',
    materialCategory: 'Polymers',
    quantity: '450 Tons/mo',
    quantityNum: 450,
    district: 'Houston',
    state: 'Texas',
    price: '$140 / Ton',
    priceNum: 140,
    availability: 'Available Now',
    postedDate: '3 hours ago',
    purity: '99.1%',
    moisture: '0.5%',
    description: 'Cleaned, washed, and shredded HDPE polymer flakes derived from automotive blow-molded containers.',
    imageBg: 'from-blue-900 to-slate-900',
    colorBadge: 'bg-blue-500',
    verified: true,
  },
  {
    id: 'MAT-003',
    title: 'Kiln-Dried Hardwood Sawdust',
    company: 'TimberCraft Furniture Ltd',
    industry: 'Furniture',
    materialCategory: 'Organics & Biomass',
    quantity: '850 Tons/mo',
    quantityNum: 850,
    district: 'Grand Rapids',
    state: 'Michigan',
    price: '$15 / Ton',
    priceNum: 15,
    availability: 'Periodic Batch',
    postedDate: '5 hours ago',
    purity: '96.0%',
    moisture: '8.5%',
    description: 'Untreated oak, maple, and walnut sawdust suitable for particleboard manufacturing, bio-pellet fuel, or animal bedding.',
    imageBg: 'from-amber-900 to-slate-900',
    colorBadge: 'bg-amber-500',
    verified: true,
  },
  {
    id: 'MAT-004',
    title: 'De-Inked Secondary Pulp Sludge',
    company: 'Nordic Paper & Pulp Co.',
    industry: 'Paper',
    materialCategory: 'Fiber & Textiles',
    quantity: '2,100 Tons/mo',
    quantityNum: 2100,
    district: 'Gothenburg',
    state: 'Västra Götaland',
    price: 'Free Collection',
    priceNum: 0,
    availability: 'Available Now',
    postedDate: '6 hours ago',
    purity: '89.0%',
    moisture: '42.0%',
    description: 'De-inked cellulose fiber sludge rich in calcium carbonate fillers, ideal for brick production or soil conditioning.',
    imageBg: 'from-teal-900 to-slate-900',
    colorBadge: 'bg-teal-500',
    verified: true,
  },
  {
    id: 'MAT-005',
    title: 'Flue Gas Gypsum (FGD Gypsum)',
    company: 'EuroCem Infrastructure',
    industry: 'Cement',
    materialCategory: 'Sludge & Chemicals',
    quantity: '3,400 Tons/mo',
    quantityNum: 3400,
    district: 'Frankfurt',
    state: 'Hesse',
    price: '$20 / Ton',
    priceNum: 20,
    availability: 'Available Now',
    postedDate: '8 hours ago',
    purity: '95.2%',
    moisture: '9.0%',
    description: 'High-purity synthetic dihydrate gypsum produced during flue gas desulfurization in power generation.',
    imageBg: 'from-slate-800 to-slate-950',
    colorBadge: 'bg-slate-400',
    verified: true,
  },
  {
    id: 'MAT-006',
    title: 'Recycled Clear Cullet Frit',
    company: 'Vetrum Glass Solutions',
    industry: 'Glass',
    materialCategory: 'Glass & Ceramics',
    quantity: '680 Tons',
    quantityNum: 680,
    district: 'Toledo',
    state: 'Ohio',
    price: '$65 / Ton',
    priceNum: 65,
    availability: 'Available Now',
    postedDate: '10 hours ago',
    purity: '99.5%',
    moisture: '0.1%',
    description: 'Crushed and magnetically separated flint container cullet sized between 5mm - 20mm for container glass remelting.',
    imageBg: 'from-cyan-900 to-slate-900',
    colorBadge: 'bg-cyan-500',
    verified: true,
  },
  {
    id: 'MAT-007',
    title: 'Vulcanized Crumb Rubber (40 Mesh)',
    company: 'ReRubber Solutions',
    industry: 'Rubber',
    materialCategory: 'Polymers',
    quantity: '310 Tons',
    quantityNum: 310,
    district: 'Akron',
    state: 'Ohio',
    price: '$110 / Ton',
    priceNum: 110,
    availability: 'Periodic Batch',
    postedDate: '12 hours ago',
    purity: '98.0%',
    moisture: '0.8%',
    description: 'Ambient ground tire rubber free of steel cord and fiber contamination, suitable for asphalt modification and molded goods.',
    imageBg: 'from-zinc-900 to-slate-950',
    colorBadge: 'bg-zinc-500',
    verified: true,
  },
  {
    id: 'MAT-008',
    title: 'Spent Brewery Grain Mash',
    company: 'CraftBrew Industrial Grid',
    industry: 'Food',
    materialCategory: 'Organics & Biomass',
    quantity: '520 Tons/mo',
    quantityNum: 520,
    district: 'Milwaukee',
    state: 'Wisconsin',
    price: '$30 / Ton',
    priceNum: 30,
    availability: 'Available Now',
    postedDate: '14 hours ago',
    purity: '92.4%',
    moisture: '65.0%',
    description: 'Protein-rich malt and barley grain residues ideal for livestock feed formulation or biogas digestion.',
    imageBg: 'from-amber-950 to-slate-900',
    colorBadge: 'bg-amber-600',
    verified: false,
  },
  {
    id: 'MAT-009',
    title: 'Recycled Synthetic Polyester Fiber',
    company: 'TexLoop Innovations',
    industry: 'Textile',
    materialCategory: 'Fiber & Textiles',
    quantity: '290 Tons',
    quantityNum: 290,
    district: 'Charlotte',
    state: 'North Carolina',
    price: '$95 / Ton',
    priceNum: 95,
    availability: 'Available Now',
    postedDate: '1 day ago',
    purity: '97.5%',
    moisture: '1.0%',
    description: 'Garnetted PET synthetic non-woven fiber scraps ready for insulation batts or acoustic panel manufacturing.',
    imageBg: 'from-purple-900 to-slate-900',
    colorBadge: 'bg-purple-500',
    verified: true,
  },
  {
    id: 'MAT-0010',
    title: 'Sugarcane Bagasse Biomass Residue',
    company: 'Sunshine Sugar Hub',
    industry: 'Agriculture',
    materialCategory: 'Organics & Biomass',
    quantity: '4,500 Tons/mo',
    quantityNum: 4500,
    district: 'Tampa',
    state: 'Florida',
    price: '$12 / Ton',
    priceNum: 12,
    availability: 'Available Now',
    postedDate: '1 day ago',
    purity: '90.0%',
    moisture: '48.0%',
    description: 'Fibrous residue remaining after sugarcane crushing, high hemicellulose content suitable for bioethanol or paper pulp.',
    imageBg: 'from-emerald-950 to-slate-900',
    colorBadge: 'bg-emerald-600',
    verified: true,
  },
  {
    id: 'MAT-011',
    title: 'Electric Arc Furnace Dust (EAF Dust)',
    company: 'Titan Steel Mill',
    industry: 'Steel',
    materialCategory: 'Metals & Minerals',
    quantity: '920 Tons/mo',
    quantityNum: 920,
    district: 'Pittsburgh',
    state: 'Pennsylvania',
    price: '$25 / Ton',
    priceNum: 25,
    availability: 'Contract Pending',
    postedDate: '1 day ago',
    purity: '85.4%',
    moisture: '0.4%',
    description: 'Zinc and iron oxide enriched flue dust captured during electric arc furnace scrap melting.',
    imageBg: 'from-slate-900 to-zinc-900',
    colorBadge: 'bg-slate-500',
    verified: true,
  },
  {
    id: 'MAT-012',
    title: 'Clean PET Plastic Flakes (Transparent)',
    company: 'ClearPlastic Global',
    industry: 'Plastic',
    materialCategory: 'Polymers',
    quantity: '600 Tons',
    quantityNum: 600,
    district: 'Akron',
    state: 'Ohio',
    price: '$180 / Ton',
    priceNum: 180,
    availability: 'Available Now',
    postedDate: '2 days ago',
    purity: '99.8%',
    moisture: '0.2%',
    description: 'Hot-washed clear PET bottle flakes certified food-contact compliant for bottle-to-bottle resin spinning.',
    imageBg: 'from-sky-900 to-slate-900',
    colorBadge: 'bg-sky-500',
    verified: true,
  },
  {
    id: 'MAT-013',
    title: 'Solid Oak & Maple Wood Shavings',
    company: 'Bavarian Woodcraft GmbH',
    industry: 'Furniture',
    materialCategory: 'Organics & Biomass',
    quantity: '340 Tons',
    quantityNum: 340,
    district: 'Munich',
    state: 'Bavaria',
    price: '$22 / Ton',
    priceNum: 22,
    availability: 'Periodic Batch',
    postedDate: '2 days ago',
    purity: '97.0%',
    moisture: '9.0%',
    description: 'Clean hardwood planner shavings without glue or synthetic resins, ideal for organic compost or bio-pelleting.',
    imageBg: 'from-amber-950 to-slate-900',
    colorBadge: 'bg-amber-500',
    verified: false,
  },
  {
    id: 'MAT-014',
    title: 'Cellulose Kraft Fiber Scrap',
    company: 'EcoKraft Packaging Hub',
    industry: 'Paper',
    materialCategory: 'Fiber & Textiles',
    quantity: '1,100 Tons/mo',
    quantityNum: 1100,
    district: 'Memphis',
    state: 'Tennessee',
    price: '$18 / Ton',
    priceNum: 18,
    availability: 'Available Now',
    postedDate: '2 days ago',
    purity: '94.0%',
    moisture: '12.0%',
    description: 'Unbleached kraft paper board trimmings and edge rolls suitable for hydrapulper reprocessing.',
    imageBg: 'from-amber-900 to-slate-950',
    colorBadge: 'bg-amber-700',
    verified: true,
  },
  {
    id: 'MAT-015',
    title: 'Cement Kiln Dust (CKD)',
    company: 'Atlas Cement Works',
    industry: 'Cement',
    materialCategory: 'Sludge & Chemicals',
    quantity: '1,800 Tons/mo',
    quantityNum: 1800,
    district: 'Dallas',
    state: 'Texas',
    price: '$16 / Ton',
    priceNum: 16,
    availability: 'Available Now',
    postedDate: '3 days ago',
    purity: '88.0%',
    moisture: '1.5%',
    description: 'Alkaline particulate byproduct captured from cement kiln exhaust gases, rich in reactive lime and alkalis.',
    imageBg: 'from-stone-800 to-slate-900',
    colorBadge: 'bg-stone-500',
    verified: true,
  },
  {
    id: 'MAT-016',
    title: 'Dried Citrus Peel & Seed Residue',
    company: 'Valencia Bio-Extracts',
    industry: 'Food',
    materialCategory: 'Organics & Biomass',
    quantity: '410 Tons/mo',
    quantityNum: 410,
    district: 'Orlando',
    state: 'Florida',
    price: '$28 / Ton',
    priceNum: 28,
    availability: 'Periodic Batch',
    postedDate: '3 days ago',
    purity: '91.5%',
    moisture: '14.0%',
    description: 'Pectin-rich orange and lemon press cake suitable for bio-pectin extraction or animal feed molasses.',
    imageBg: 'from-orange-950 to-slate-900',
    colorBadge: 'bg-orange-500',
    verified: true,
  },
  {
    id: 'MAT-017',
    title: 'Denim Cotton Fabric Scraps',
    company: 'Heritage Denim Mills',
    industry: 'Textile',
    materialCategory: 'Fiber & Textiles',
    quantity: '180 Tons',
    quantityNum: 180,
    district: 'Greensboro',
    state: 'North Carolina',
    price: '$40 / Ton',
    priceNum: 40,
    availability: 'Available Now',
    postedDate: '4 days ago',
    purity: '99.0%',
    moisture: '6.0%',
    description: '100% indigo cotton denim cutting clips shredded for thermal building insulation or paper manufacturing.',
    imageBg: 'from-indigo-950 to-slate-900',
    colorBadge: 'bg-indigo-500',
    verified: true,
  },
  {
    id: 'MAT-018',
    title: 'EPDM Rubber Granules (Black)',
    company: 'VeloTyre Manufacturing',
    industry: 'Rubber',
    materialCategory: 'Polymers',
    quantity: '220 Tons',
    quantityNum: 220,
    district: 'Stuttgart',
    state: 'Bavaria',
    price: '$85 / Ton',
    priceNum: 85,
    availability: 'Contract Pending',
    postedDate: '4 days ago',
    purity: '96.2%',
    moisture: '0.4%',
    description: 'Cross-linked synthetic weatherstrip rubber granules for athletic track surfacing or sound damping mats.',
    imageBg: 'from-neutral-900 to-slate-950',
    colorBadge: 'bg-neutral-500',
    verified: true,
  },
  {
    id: 'MAT-019',
    title: 'Amber Container Glass Cullet',
    company: 'CrystalGlass Industrial',
    industry: 'Glass',
    materialCategory: 'Glass & Ceramics',
    quantity: '510 Tons',
    quantityNum: 510,
    district: 'Sheffield',
    state: 'South Yorkshire',
    price: '$55 / Ton',
    priceNum: 55,
    availability: 'Available Now',
    postedDate: '5 days ago',
    purity: '98.8%',
    moisture: '0.2%',
    description: 'Crushed amber brewery bottle glass cullet, color sorted and furnace-ready.',
    imageBg: 'from-amber-950 to-slate-950',
    colorBadge: 'bg-amber-600',
    verified: true,
  },
  {
    id: 'MAT-020',
    title: 'Anaerobic Digestate Bio-Fertilizer',
    company: 'GreenValley BioAg Grid',
    industry: 'Agriculture',
    materialCategory: 'Organics & Biomass',
    quantity: '3,800 Tons/mo',
    quantityNum: 3800,
    district: 'Fresno',
    state: 'California',
    price: 'Free Collection',
    priceNum: 0,
    availability: 'Available Now',
    postedDate: '5 days ago',
    purity: '93.0%',
    moisture: '78.0%',
    description: 'Nutrient-rich liquid bio-fertilizer effluent high in ammonium nitrogen and potassium from farm manure digesters.',
    imageBg: 'from-emerald-950 to-slate-900',
    colorBadge: 'bg-emerald-500',
    verified: true,
  },
];

const INDUSTRIES = [
  'All',
  'Steel',
  'Plastic',
  'Furniture',
  'Paper',
  'Cement',
  'Glass',
  'Rubber',
  'Food',
  'Textile',
  'Agriculture',
];

const MATERIALS = [
  'All',
  'Metals & Minerals',
  'Polymers',
  'Organics & Biomass',
  'Sludge & Chemicals',
  'Glass & Ceramics',
  'Fiber & Textiles',
];

const STATES = [
  'All',
  'Texas',
  'Pennsylvania',
  'Michigan',
  'Ohio',
  'California',
  'Florida',
  'North Carolina',
  'Bavaria',
  'North Rhine-Westphalia',
];

const AVAILABILITIES = ['All', 'Available Now', 'Periodic Batch', 'Contract Pending'];

export const Marketplace = () => {
  const navigate = useNavigate();

  // --- Filter & Search States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'qty' | 'price' | 'purity'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modal State for "View Details"
  const [activeModalItem, setActiveModalItem] = useState(null);

  // --- Filter Logic ---
  const filteredListings = useMemo(() => {
    return INITIAL_LISTINGS.filter((item) => {
      // Search match
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.district.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.industry.toLowerCase().includes(query) ||
        item.materialCategory.toLowerCase().includes(query);

      // Category filters match
      const matchesIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;
      const matchesMaterial = selectedMaterial === 'All' || item.materialCategory === selectedMaterial;
      const matchesState = selectedState === 'All' || item.state === selectedState;
      const matchesAvailability = selectedAvailability === 'All' || item.availability === selectedAvailability;

      return matchesSearch && matchesIndustry && matchesMaterial && matchesState && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === 'qty') return b.quantityNum - a.quantityNum;
      if (sortBy === 'price') return a.priceNum - b.priceNum;
      if (sortBy === 'purity') return parseFloat(b.purity) - parseFloat(a.purity);
      return 0; // default newest
    });
  }, [searchTerm, selectedIndustry, selectedMaterial, selectedState, selectedAvailability, sortBy]);

  const activeFilterCount =
    (selectedIndustry !== 'All' ? 1 : 0) +
    (selectedMaterial !== 'All' ? 1 : 0) +
    (selectedState !== 'All' ? 1 : 0) +
    (selectedAvailability !== 'All' ? 1 : 0) +
    (searchTerm ? 1 : 0);

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('All');
    setSelectedMaterial('All');
    setSelectedState('All');
    setSelectedAvailability('All');
    setSortBy('newest');
  };

  const handleFindMatches = (listing) => {
    navigate(`/recommendations?stream=${listing.id}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Industrial Waste & Resource Marketplace"
        description="Connect directly with verified manufacturing plants, steel mills, and chemical complexes to exchange secondary raw materials."
        badgeText="20 Verified Listings"
        breadcrumbs={['Platform', 'Marketplace']}
      >
        <button
          onClick={() => alert('Opening listing creation wizard...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Post Waste Stream</span>
        </button>
      </PageHeader>

      {/* --- TOP CONTROLS & FILTER BAR --- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Search Bar + View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:flex-1">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={(val) => setSearchTerm(val)}
              placeholder="Search by material code, title, industry, district, or company..."
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="qty">Highest Quantity</option>
                <option value="price">Lowest Price</option>
                <option value="purity">Highest Purity %</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Interactive Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {/* Industry */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Material Category */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Material Category</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              {MATERIALS.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Region / State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              {STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              {AVAILABILITIES.map((av) => (
                <option key={av} value={av}>
                  {av}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Badges Bar */}
        {activeFilterCount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-semibold text-[11px]">Active Filters ({activeFilterCount}):</span>
              {selectedIndustry !== 'All' && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
                  Industry: {selectedIndustry}
                </span>
              )}
              {selectedMaterial !== 'All' && (
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-medium">
                  Material: {selectedMaterial}
                </span>
              )}
              {selectedState !== 'All' && (
                <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-medium">
                  State: {selectedState}
                </span>
              )}
              {selectedAvailability !== 'All' && (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium">
                  Status: {selectedAvailability}
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold text-xs"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* --- LISTINGS RESULTS (GRID VS LIST) --- */}
      {filteredListings.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <EmptyState
            icon={Store}
            title="No matching waste streams found"
            description="No industrial material streams match your search or filter criteria. Try expanding your location radius or clearing filters."
            actionLabel="Reset All Filters"
            onAction={resetAllFilters}
          />
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredListings.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                {/* Material Artwork Banner Placeholder */}
                <div className={`h-36 w-full bg-gradient-to-br ${item.imageBg} relative p-4 flex flex-col justify-between overflow-hidden`}>
                  {/* Background Material Graphic Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-xs border border-white/20">
                      {item.industry}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs ${item.colorBadge}`}>
                      {item.availability}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="relative z-10 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest">{item.id}</span>
                      <h4 className="text-sm font-extrabold tracking-tight drop-shadow-xs line-clamp-1">{item.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md rounded border border-white/30">
                      {item.purity} Pure
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 space-y-4">
                  {/* Company & Verification */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.company}</span>
                    </div>
                    {item.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/50 shrink-0">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Quantity & Location Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Available Qty</span>
                      <p className="font-extrabold font-mono text-slate-900 dark:text-white">{item.quantity}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                      <p className="font-extrabold text-slate-900 dark:text-white truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                        {item.district}, {item.state}
                      </p>
                    </div>
                  </div>

                  {/* Price & Posted Date */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">Offering Price</span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {item.price}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-slate-400 block">Listed</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.postedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => handleFindMatches(item)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs transition-colors flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Find Matches</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* LIST / TABLE VIEW */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-3.5 pl-4">Stream ID & Material</th>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Industry</th>
                  <th className="p-3.5">Quantity</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredListings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 pl-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.id}</span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{item.title}</h4>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                      {item.company}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {item.industry}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-extrabold text-slate-900 dark:text-white">
                      {item.quantity}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {item.district}, {item.state}
                    </td>
                    <td className="p-3.5 font-mono font-black text-emerald-600 dark:text-emerald-400">
                      {item.price}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full text-white ${item.colorBadge}`}>
                        {item.availability}
                      </span>
                    </td>
                    <td className="p-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleFindMatches(item)}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          Match
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL DETAILED VIEW FOR LISTING --- */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                      {activeModalItem.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Industry: {activeModalItem.industry}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {activeModalItem.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Offered by <span className="font-bold text-slate-800 dark:text-slate-200">{activeModalItem.company}</span>
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Quantity</span>
                  <span className="font-extrabold font-mono text-slate-900 dark:text-white text-sm">{activeModalItem.quantity}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Purity Grade</span>
                  <span className="font-extrabold font-mono text-emerald-600 dark:text-emerald-400 text-sm">{activeModalItem.purity}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Moisture Content</span>
                  <span className="font-extrabold font-mono text-slate-900 dark:text-white text-sm">{activeModalItem.moisture}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Price / Ton</span>
                  <span className="font-black font-mono text-emerald-600 dark:text-emerald-400 text-sm">{activeModalItem.price}</span>
                </div>
              </div>

              {/* Description & Transport Specs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Description</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {activeModalItem.description}
                </p>
              </div>

              {/* Location & Compliance */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Logistics Node: {activeModalItem.district}, {activeModalItem.state}
                  </span>
                </div>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">ISO 14001 Compliant</span>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = activeModalItem.id;
                    setActiveModalItem(null);
                    navigate(`/recommendations?stream=${id}`);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request AI Match Analysis</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
