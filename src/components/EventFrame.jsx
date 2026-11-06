import React from 'react';
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function EventFrame({ event, onSelectEvent }) {
  const handleSelect = () => {
    audioSystem.playProjectorTick();
    onSelectEvent(event);
  };

  return (
    <div
      onClick={handleSelect}
      onMouseEnter={() => audioSystem.playProjectorTick()}
      className="group relative w-[82vw] max-w-[320px] sm:w-80 md:w-96 bg-[#0a0a0e] border-2 border-neutral-700/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex flex-col justify-between"
    >
      {/* TOP 35MM SPROCKET PERFORATION STRIP */}
      <div className="h-6 sm:h-7 bg-[#121118] border-b border-neutral-800 flex items-center justify-around px-2 select-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-black rounded-sm border border-neutral-800/90 shadow-inner"
          />
        ))}
      </div>

      {/* FILM FRAME METADATA HEADER */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#17151f] border-b border-neutral-800 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-400">
        <div className="flex items-center gap-1.5 font-bold tracking-wider text-amber-400">
          <span>KODAK 5222</span>
          <span>•</span>
          <span>{event.filmFrame}</span>
        </div>
        <span
          className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase"
          style={{
            backgroundColor: `${event.accentColor}20`,
            color: event.accentColor,
            border: `1px solid ${event.accentColor}40`
          }}
        >
          {event.categoryName}
        </span>
      </div>

      {/* CENTER EXPOSURE APERTURE */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#111016] via-[#0d0c12] to-[#08080c] relative">
        {/* Subtle Film Grain Texture */}
        <div className="absolute inset-0 film-grain-texture pointer-events-none opacity-40" />

        {/* Event Code & Name */}
        <div className="relative z-10">
          <div className="font-mono text-[10px] sm:text-xs font-bold text-neutral-500 mb-0.5">
            DOSSIER REF: {event.code}
          </div>
          <h3 className="text-lg sm:text-2xl font-black font-mono tracking-tight text-neutral-100 group-hover:text-amber-300 transition-colors">
            {event.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-mono italic mt-1 leading-snug line-clamp-2">
            "{event.tagline}"
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="relative z-10 my-3 space-y-1.5 font-mono text-[10px] sm:text-[11px] text-neutral-400 border-t border-b border-neutral-800/80 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>DATE</span>
            </span>
            <span className="text-neutral-300 font-bold truncate ml-2">{event.date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>CREW</span>
            </span>
            <span className="text-neutral-300 font-bold">{event.teamSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>PRIZE</span>
            </span>
            <span className="text-amber-400 font-bold truncate ml-2">{event.prizePool}</span>
          </div>
        </div>

        {/* View Dossier Action Link */}
        <div className="relative z-10 flex items-center justify-between pt-1">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest hidden xs:inline">
            35MM CELL
          </span>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform ml-auto">
            <span>UNFOLD DOSSIER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* BOTTOM 35MM SPROCKET PERFORATION STRIP */}
      <div className="h-6 sm:h-7 bg-[#121118] border-t border-neutral-800 flex items-center justify-around px-2 select-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-black rounded-sm border border-neutral-800/90 shadow-inner"
          />
        ))}
      </div>
    </div>
  );
}