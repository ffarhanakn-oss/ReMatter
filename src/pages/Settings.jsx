import React from 'react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { Settings, Shield, User, Building, Key, BellRing, Save } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform & Enterprise Settings"
        description="Manage your facility profile, material exchange preferences, team permissions, API integrations, and security keys."
        badgeText="Admin Access"
        breadcrumbs={['Management', 'Settings']}
      >
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Sub-navigation Tabs */}
        <div className="space-y-1 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 h-fit">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60">
            <Building className="w-4 h-4 text-emerald-600" /> Organization Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
            <User className="w-4 h-4" /> User Management
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Shield className="w-4 h-4" /> Security & Compliance
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Key className="w-4 h-4" /> API Keys & Webhooks
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
            <BellRing className="w-4 h-4" /> Alert Rules
          </button>
        </div>

        {/* Main Settings Panel */}
        <div className="md:col-span-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-2xs">
          <EmptyState
            icon={Settings}
            title="Settings Workspace Initialized"
            description="Facility node parameters, API keys, compliance certificates, and notification webhooks ready for configuration."
            actionLabel="Edit Facility Parameters"
            onAction={() => alert('Editing settings')}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
