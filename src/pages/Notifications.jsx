import React from 'react';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import EmptyState from '../components/common/EmptyState';
import { Bell, CheckCheck, SlidersHorizontal, ShieldAlert } from 'lucide-react';

export const Notifications = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity & Notification Center"
        description="Track all real-time alerts, match notifications, offer updates, compliance verifications, and contract events."
        badgeText="3 Unread"
        breadcrumbs={['Management', 'Notifications']}
      >
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <CheckCheck className="w-4 h-4 text-emerald-600" />
          <span>Mark All as Read</span>
        </button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="w-full sm:w-80">
          <SearchBar placeholder="Search notification history..." />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <FilterDropdown label="Type" options={[{ id: 'matches', label: 'AI Matches' }, { id: 'offers', label: 'Listing Offers' }, { id: 'compliance', label: 'Compliance' }]} />
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-2xs">
        <EmptyState
          icon={Bell}
          title="Notification Feed Shell Ready"
          description="Detailed timeline list of system and industrial match notifications is structured and integrated."
          actionLabel="Notification Settings"
          onAction={() => alert('Manage alert preferences')}
        />
      </div>
    </div>
  );
};

export default Notifications;
