import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Sparkles,
  Store,
  Building2,
  GitMerge,
  Clock,
  ShieldCheck,
  Award,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  UserPlus,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';

// --- Complete 7 Notification Types Mock Dataset ---
const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-101',
    type: 'ai_recommendation',
    typeLabel: 'AI Recommendation Generated',
    title: 'New High-Confidence AI Symbiosis Match',
    description: 'EuroCem Infrastructure GmbH matched 98.6% with your Granulated Blast Furnace Slag stream. Est. annual savings: $185,000.',
    time: '10 minutes ago',
    read: false,
    badgeText: '98.6% Match',
    badgeStyle: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: Sparkles,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
    actionRoute: '/recommendations?stream=MAT-001',
  },
  {
    id: 'NOTIF-102',
    type: 'marketplace_listing',
    typeLabel: 'New Marketplace Listing',
    title: 'New Listing Posted: Post-Industrial HDPE Regrind',
    description: 'PolymerRecycle Corp listed 450 Tons/mo of HDPE Regrind Flakes in Houston, Texas at $140/Ton.',
    time: '35 minutes ago',
    read: false,
    badgeText: 'New Stream',
    badgeStyle: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: Store,
    iconBg: 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400',
    actionRoute: '/marketplace',
  },
  {
    id: 'NOTIF-103',
    type: 'company_follow',
    typeLabel: 'Company Follow Request',
    title: 'Holcim Circular Materials requested to connect',
    description: 'Holcim requested network access to view your facility’s monthly waste stream output and carbon audit reports.',
    time: '1 hour ago',
    read: false,
    badgeText: 'Follow Request',
    badgeStyle: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: UserPlus,
    iconBg: 'bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400',
    actionRoute: '/companies',
  },
  {
    id: 'NOTIF-104',
    type: 'successful_match',
    typeLabel: 'Successful Material Match',
    title: 'Contract Agreement Executed: EAF Dust Exchange',
    description: 'Titan Steel Mill and EuroCem finalized a 920 Ton/month secondary zinc recovery pipeline.',
    time: '3 hours ago',
    read: false,
    badgeText: 'Contract Signed',
    badgeStyle: 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    icon: GitMerge,
    iconBg: 'bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400',
    actionRoute: '/marketplace',
  },
  {
    id: 'NOTIF-105',
    type: 'listing_expired',
    typeLabel: 'Listing Expired',
    title: 'Listing Expired: Spent Platinum Catalyst (SL-7720)',
    description: 'Your 30-day listing for Spent Catalyst Slurry has reached its expiry date. Click to re-list or archive.',
    time: '6 hours ago',
    read: true,
    badgeText: 'Expired',
    badgeStyle: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: Clock,
    iconBg: 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
    actionRoute: '/marketplace',
  },
  {
    id: 'NOTIF-106',
    type: 'sustainability_milestone',
    typeLabel: 'Sustainability Milestones',
    title: 'Milestone Unlocked: 10,000 Tons Landfill Diverted',
    description: 'Congratulations! Your node has officially diverted over 10,000 Metric Tons of industrial byproducts this year.',
    time: '1 day ago',
    read: true,
    badgeText: 'Milestone 🏆',
    badgeStyle: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: Award,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
    actionRoute: '/analytics',
  },
  {
    id: 'NOTIF-107',
    type: 'system_update',
    typeLabel: 'System Updates',
    title: 'System Platform Update v2.4 Live',
    description: 'ReMatter OS upgraded with real-time stoichiometric AI matching v3.2 and ISO 14064 automated audit export.',
    time: '2 days ago',
    read: true,
    badgeText: 'System Update',
    badgeStyle: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
    icon: ShieldCheck,
    iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    actionRoute: '/settings',
  },
];

export const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.typeLabel.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [notifications, selectedFilter, searchTerm]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearReadNotifications = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Notification Center"
        description="Track real-time AI matches, marketplace listing updates, company follow requests, contract milestones, and system updates."
        badgeText={`${unreadCount} Unread Notifications`}
        breadcrumbs={['Management', 'Notifications']}
      >
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 transition-all shadow-2xs"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Mark All as Read</span>
          </button>
        )}

        <button
          onClick={clearReadNotifications}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear Read</span>
        </button>
      </PageHeader>

      {/* --- SEARCH & NOTIFICATION FILTER TABS --- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={(val) => setSearchTerm(val)}
          placeholder="Search notifications by keyword, title, or notification type..."
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All ({notifications.length})
          </button>

          <button
            onClick={() => setSelectedFilter('ai_recommendation')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'ai_recommendation'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> AI Recommendations
          </button>

          <button
            onClick={() => setSelectedFilter('marketplace_listing')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'marketplace_listing'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-blue-500" /> Marketplace Listings
          </button>

          <button
            onClick={() => setSelectedFilter('company_follow')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'company_follow'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-purple-500" /> Follow Requests
          </button>

          <button
            onClick={() => setSelectedFilter('successful_match')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'successful_match'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-teal-500" /> Matches Executed
          </button>

          <button
            onClick={() => setSelectedFilter('listing_expired')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'listing_expired'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" /> Expired Listings
          </button>

          <button
            onClick={() => setSelectedFilter('sustainability_milestone')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'sustainability_milestone'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-500" /> Milestones
          </button>

          <button
            onClick={() => setSelectedFilter('system_update')}
            className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedFilter === 'system_update'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> System Updates
          </button>
        </div>
      </div>

      {/* --- NOTIFICATIONS FEED LIST --- */}
      {filteredNotifications.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <EmptyState
            icon={Bell}
            title="No notifications found"
            description="There are currently no notifications in this category matching your search filter."
            actionLabel="Reset Notification Filters"
            onAction={() => {
              setSelectedFilter('all');
              setSearchTerm('');
            }}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence layout>
            {filteredNotifications.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    !item.read
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800/80 shadow-2xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 ${item.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                        )}
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${item.badgeStyle}`}>
                          {item.badgeText}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      <span className="text-[11px] text-slate-400 font-medium block pt-0.5">
                        {item.time} • <span className="font-mono">{item.typeLabel}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    {!item.read && (
                      <button
                        onClick={() => markAsRead(item.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => {
                        markAsRead(item.id);
                        navigate(item.actionRoute);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-2xs flex items-center gap-1 active:scale-98 transition-colors"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Notifications;
