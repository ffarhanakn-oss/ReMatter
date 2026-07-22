import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';

export const SearchBar = ({
  placeholder = 'Search materials, listings, companies...',
  onSearch,
  value,
  onChange,
  className = '',
  shortcut = '⌘K',
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(e);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setInternalValue('');
    if (onSearch) onSearch('');
    if (onChange) {
      const syntheticEvent = { target: { value: '' } };
      onChange(syntheticEvent);
    }
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3 pointer-events-none text-slate-400 dark:text-slate-500">
        <Search className="w-4 h-4" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-16 py-2 text-sm rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200/80 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-150"
      />

      <div className="absolute right-2.5 flex items-center gap-1.5">
        {internalValue ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          shortcut && (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-2xs">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </kbd>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
