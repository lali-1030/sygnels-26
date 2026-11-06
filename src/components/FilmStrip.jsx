import React, { useRef, useState } from 'react';
import EventFrame from './EventFrame';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function FilmStrip({ events, onSelectEvent }) {
  const scrollRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollByAmount = (amount) => {
    if (!scrollRef.current) return;
    audioSystem.playProjectorTick();
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll for Desktops
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsMouseDown(false);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (e) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!events || events.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto py-12 sm:py-16 text-center border-2 border-dashed border-neutral-800 rounded-2xl sm:rounded-3xl bg-neutral-900/40 px-4">
        <Film className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-600 mx-auto mb-3" />
        <h3 className="font-mono text-sm sm:text-base font-bold text-neutral-300">
          NO ARCHIVAL FRAMES FOUND IN THIS REEL
        </h3>
        <p className="font-mono text-xs text-neutral-500 mt-1">
          Adjust your terminal search query or switch channels.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto my-2 sm:my-4 select-none px-1 sm:px-2">
      {/* Scroll Controls Navigation Bar */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-neutral-400">
          <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
          <span>REEL: {events.length} TRANSMISSIONS</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => scrollByAmount(-340)}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-amber-400 transition-colors shadow cursor-pointer active:scale-95"
            title="Rewind Film Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollByAmount(340)}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-amber-400 transition-colors shadow cursor-pointer active:scale-95"
            title="Advance Film Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable 35mm Film Strip with Native Touch Snapping */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-2 sm:px-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth touch-pan-x"
        style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
      >
        {events.map((event) => (
          <div key={event.id} className="snap-center flex-shrink-0">
            <EventFrame
              event={event}
              onSelectEvent={onSelectEvent}
            />
          </div>
        ))}
      </div>
    </div>
  );
}