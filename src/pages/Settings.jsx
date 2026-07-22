import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building,
  Shield,
  Key,
  BellRing,
  Globe,
  Sun,
  Moon,
  Lock,
  Save,
  Check,
  QrCode,
  Smartphone,
  Eye,
  EyeOff,
  Copy,
  Plus,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Clock,
  Laptop,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import { useTheme } from '../context/ThemeContext';

export const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'account' | 'preferences' | 'notifications' | 'api'
  const [isSaved, setIsSaved] = useState(false);

  // Profile Form States
  const [companyName, setCompanyName] = useState('Apex Steel & Metallurgy Corp');
  const [industry, setIndustry] = useState('Metallurgy & Heavy Industry');
  const [location, setLocation] = useState('Duisburg Industrial Zone, North Rhine-Westphalia, Germany');
  const [contactName, setContactName] = useState('Dr. Aris Thorne');
  const [contactEmail, setContactEmail] = useState('aris.thorne@greenmetal.io');
  const [contactPhone, setContactPhone] = useState('+49 203 9942 018');
  const [website, setWebsite] = useState('https://apexsteel.io');

  // Account & Security States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Preferences States
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [units, setUnits] = useState('metric_tons');

  // Notification Preferences States
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketplaceAlerts, setMarketplaceAlerts] = useState(true);
  const [recommendationAlerts, setRecommendationAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // API Key States
  const [apiKey, setApiKey] = useState('rm_live_9942a78f31b84e09c2d1');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const generateNewKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 12);
    setApiKey(`rm_live_9942_${randomHex}`);
    alert('New API Key generated successfully.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Enterprise Settings & Preferences"
        description="Manage your facility node parameters, team roles, security credentials, notification triggers, and API integrations."
        badgeText="Admin Access"
        breadcrumbs={['Management', 'Settings']}
      >
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-98"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Changes Saved!' : 'Save Settings'}</span>
        </button>
      </PageHeader>

      {/* --- SETTINGS TAB NAVIGATION --- */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Profile & Company</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'account'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Account & Security (2FA)</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'preferences'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Preferences & Theme</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'notifications'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BellRing className="w-3.5 h-3.5" />
          <span>Notification Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'api'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>API & Integration</span>
        </button>
      </div>

      {/* --- TAB CONTENT PANELS --- */}
      <AnimatePresence mode="wait">
        {/* TAB 1: PROFILE & COMPANY INFORMATION */}
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Company & Facility Information
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Primary facility parameters visible to partner enterprise nodes across the ReMatter network
              </p>
            </div>

            {/* Logo Upload & Avatar Box */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-black text-2xl flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 shadow-md">
                AS
              </div>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => alert('Logo upload dialog')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                >
                  Upload New Logo
                </button>
                <p className="text-[11px] text-slate-400">PNG, SVG or JPG. Max 2MB.</p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Industry Sector</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Facility Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">CSO Primary Contact Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Contact Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Official Website URL</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ACCOUNT SETTINGS, SECURITY & 2FA */}
        {activeTab === 'account' && (
          <motion.div
            key="account"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Password Change Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Password & Credentials
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update your security key for enterprise authentication
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      defaultValue="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter new strong password"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication (2FA UI) Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Two-Factor Authentication (2FA)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add an extra layer of security using Authenticator App (TOTP)
                    </p>
                  </div>
                </div>

                {/* 2FA Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    twoFactorEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-2xs" />
                </button>
              </div>

              {twoFactorEnabled && (
                <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center gap-4 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shrink-0">
                    <QrCode className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div className="space-y-1 flex-1 text-center sm:text-left">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900 dark:text-white">2FA Active (Google Authenticator)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Scan QR code or use backup secret key: <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">RM-2FA-9942-X7</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: PREFERENCES & DARK/LIGHT MODE */}
        {activeTab === 'preferences' && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Application Preferences & Theme
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize workspace theme mode, regional units, and language preferences
              </p>
            </div>

            {/* Dark Mode / Light Mode Live Toggle Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Theme Appearance ({isDark ? 'Dark Mode' : 'Light Mode'})
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Seamless smooth transition across all dashboard components
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all active:scale-98 shadow-2xs"
              >
                Switch to {isDark ? 'Light' : 'Dark'} Mode
              </button>
            </div>

            {/* Regional Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  <option value="en">English (US / UK)</option>
                  <option value="de">Deutsch (German)</option>
                  <option value="fr">Français (French)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="ja">日本語 (Japanese)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  <option value="Europe/Berlin">UTC+01:00 Berlin / Frankfurt</option>
                  <option value="America/New_York">UTC-05:00 Eastern Time</option>
                  <option value="Asia/Tokyo">UTC+09:00 Tokyo</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Measurement Units</label>
                <select
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  <option value="metric_tons">Metric Tons (Tons / tCO₂e)</option>
                  <option value="kilograms">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: NOTIFICATION PREFERENCES */}
        {activeTab === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Notification Triggers & Alerts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose which notifications you wish to receive via Email or Push
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Notifications</h4>
                  <p className="text-slate-500">Receive email alerts for high-priority symbiosis matches</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={() => setEmailNotifs(!emailNotifs)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Push Notifications</h4>
                  <p className="text-slate-500">Real-time browser notifications for incoming offers</p>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotifs}
                  onChange={() => setPushNotifs(!pushNotifs)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Marketplace Listing Bids</h4>
                  <p className="text-slate-500">Alerts when enterprise partners submit quotes on your streams</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketplaceAlerts}
                  onChange={() => setMarketplaceAlerts(!marketplaceAlerts)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">AI Recommendation Threshold (90%+)</h4>
                  <p className="text-slate-500">Only notify when AI match confidence exceeds 90%</p>
                </div>
                <input
                  type="checkbox"
                  checked={recommendationAlerts}
                  onChange={() => setRecommendationAlerts(!recommendationAlerts)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Weekly ESG Sustainability Summary</h4>
                  <p className="text-slate-500">Receive a weekly PDF breakdown of CO₂ offset metrics</p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={() => setWeeklyDigest(!weeklyDigest)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: API INTEGRATION PLACEHOLDER */}
        {activeTab === 'api' && (
          <motion.div
            key="api"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Developer API & Integration Sandbox
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connect your facility's ERP, SAP, or IoT sensor telemetry directly via REST API and Webhooks
              </p>
            </div>

            {/* API Key Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Live Production API Key
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none"
                />
                <button
                  onClick={copyApiKey}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={generateNewKey}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Roll Key</span>
                </button>
              </div>
            </div>

            {/* Webhook Endpoint Configuration */}
            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Webhook Event Destination URL
              </label>
              <input
                type="text"
                defaultValue="https://api.greenmetal.io/webhooks/rematter"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none font-mono"
              />
            </div>

            {/* API Health & Integration Banner Placeholder */}
            <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-mono font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> API Health: 100% Operational
                </span>
                <span className="text-[10px] font-mono text-slate-400">1,000 req/min limit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                This section is ready for direct backend integration. Connect endpoints to sync ERP inventory, automated IoT weighbridge logs, and stoichiometry models.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
