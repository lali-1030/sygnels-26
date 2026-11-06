import React, { useState, useMemo } from 'react';
import FilmProjector from './FilmProjector';
import EventSearch from './EventSearch';
import FilmStrip from './FilmStrip';
import { CATEGORIES, EVENTS } from '../data/eventsData';

export default function FilmArchive({ selectedCategoryId, onBackToTV, onSelectEvent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState(selectedCategoryId || 'all');

  const activeCategoryObj = useMemo(() => {
    return (
      CATEGORIES.find((c) => c.id === filterCategory) ||
      CATEGORIES.find((c) => c.id === selectedCategoryId) ||
      CATEGORIES[0]
    );
  }, [filterCategory, selectedCategoryId]);

  // Filter events by selected category and search input
  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchCat = filterCategory === 'all' || event.category === filterCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        event.name.toLowerCase().includes(q) ||
        event.code.toLowerCase().includes(q) ||
        event.tagline.toLowerCase().includes(q) ||
        event.briefing.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [filterCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen px-4 py-8 flex flex-col items-center justify-start relative z-10 animate-fade-in">
      {/* Top 35mm Projector Machine Assembly */}
      <FilmProjector
        activeCategory={activeCategoryObj}
        onBackToTV={onBackToTV}
      />

      {/* Retro Computer Terminal Search Bar & Filter Tabs */}
      <EventSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={filterCategory}
        onCategoryFilterChange={setFilterCategory}
      />

      {/* Horizontal 35mm Film Reel Strip */}
      <FilmStrip
        events={filteredEvents}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
}