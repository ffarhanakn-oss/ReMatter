import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Check, RotateCcw } from 'lucide-react';

export const FilterDropdown = ({
  label = 'Filter',
  options = [
    { id: 'chemical', label: 'Chemicals & By-products', count: 42 },
    { id: 'metal', label: 'Metals & Alloys', count: 18 },
    { id: 'organic', label: 'Organic & Biomass', count: 29 },
    { id: 'plastic', label: 'Polymers & Plastics', count: 35 },
    { id: 'textile', label: 'Textiles & Fiber', count: 12 },
  ],
  selectedOptions = [],
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOptions);
  const containerRef = useRef(null);

  useEffect(() => {
    setSelected(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    setSelected(updated);
    if (onSelectionChange) onSelectionChange(updated);
  };

  const handleClear = () => {
    setSelected([]);
    if (onSelectionChange) onSelectionChange([]);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border transition-all duration-150 ${
          selected.length > 0
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
        }`}
      >
        <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-1 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2.5 space-y-2"
          >
            <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Filter Categories</span>
              {selected.length > 0 && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
              {options.map((option) => {
                const isChecked = selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm">
                        {option.label}
                      </span>
                    </div>
                    {option.count !== undefined && (
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {option.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
