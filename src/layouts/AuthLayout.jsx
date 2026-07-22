import React from 'react';
import { Outlet } from 'react-router-dom';
import { Recycle, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AuthLayout = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Left Column: Industrial Symbiosis Showcase Hero */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white relative overflow-hidden">
        {/* Background Overlay Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Recycle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">ReMatter</h1>
            <p className="text-xs text-emerald-400 font-mono">Symbiosis Network</p>
          </div>
        </div>

        {/* Testimonial / Value prop */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Waste & Resource Matching
          </div>

          <h2 className="text-3xl font-extrabold leading-tight">
            Turn your industry's waste into high-value raw material for partner enterprise nodes.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            ReMatter connects steel, chemical, textile, and agricultural hubs in a real-time circular economy grid. Reduce landfill costs by 84% while cutting carbon footprints.
          </p>

          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold text-emerald-400">1.48M</div>
              <div className="text-xs text-slate-400">Tons Exchanged</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">620+</div>
              <div className="text-xs text-slate-400">Industrial Nodes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400">$42M</div>
              <div className="text-xs text-slate-400">Cost Savings</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 14001 & ISO 50001 Symbiosis Standard Verified</span>
          </div>
          <span>v2.4 Enterprise</span>
        </div>
      </div>

      {/* Right Column: Auth Outlet Container */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
