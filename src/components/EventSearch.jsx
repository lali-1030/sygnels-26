import React from 'react';
import { Search, Terminal, Filter, X } from 'lucide-react';
import { CATEGORIES } from '../data/eventsData';
import { audioSystem } from '../utils/audioSystem';

export default function EventSearch({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onCategoryFilterChange
}) {
  const filterOptions = [
    { id: 'all', label: 'ALL CHANNELS' },
    ...CATEGORIES.map((c) => ({
      id: c.id,
      label: c.shortName,
      code: c.code,
      color: c.accentColor
    }))
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-4 sm:mb-6 px-1 sm:px-2">
      <div className="bg-[#100f16] border border-neutral-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Terminal Command Input Field */}
        <div className="relative w-full md:w-80 flex items-center">
          <Terminal className="w-4 h-4 text-amber-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SCAN ARCHIVE: TITLE / CODE / KEY..."
            className="w-full pl-9 pr-8 py-2 bg-black/70 border border-neutral-700/80 rounded-xl font-mono text-xs text-amber-300 placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills for Categories */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-start sm:justify-center">
          <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1 hidden lg:flex mr-1">
            <Filter className="w-3 h-3 text-amber-500" />
            <span>CHANNEL:</span>
          </span>

          {filterOptions.map((opt) => {
            const isActive = selectedCategory === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  audioSystem.playButtonPress();
                  onCategoryFilterChange(opt.id);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-102'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}