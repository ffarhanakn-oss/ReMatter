import React from 'react';
import { Menu, Sun, Moon, Sparkles, Activity } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ onOpenMobileSidebar, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 md:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile Drawer Trigger & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="w-full">
          <SearchBar placeholder="Search materials, waste exchanges, companies (Ctrl+K)..." />
        </div>
      </div>

      {/* Right: Network Status, Dark Mode Toggle, Notifications & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Network Status Pill (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="w-3.5 h-3.5" />
          <span>Network Live • 1.48k Tons Exchanged</span>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        {/* Notification Bell Dropdown */}
        <NotificationBell />

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* User Menu Dropdown */}
        <UserMenu onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Navbar;
