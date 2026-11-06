import React from 'react';
import { ArrowLeft, Film, Gauge, Sparkles, Disc } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function FilmProjector({ activeCategory, onBackToTV }) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-6 sm:mb-8 bg-gradient-to-b from-[#141218] via-[#0f0e13] to-[#0a090e] border border-amber-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background Projector Light Cone Atmosphere */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Return Switch */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-800 pb-3 sm:pb-5">
        <button
          onClick={() => {
            audioSystem.playButtonPress();
            onBackToTV();
          }}
          className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-amber-400 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-amber-500/50 shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO RETRO TV TUNER</span>
        </button>

        {/* Projector Operational Status */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-800/60 rounded-full text-amber-400 font-mono text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>35MM PROJECTOR: ROLLING (24 FPS)</span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-neutral-500 hidden md:inline">
            OPTICAL SOUNDTRACK ACTIVE
          </span>
        </div>
      </div>

      {/* Central Visual: Dual 35mm Spinning Projector Spools & Lens Beam */}
      <div className="my-4 sm:my-6 flex items-center justify-center md:justify-around gap-4 sm:gap-6 py-2 sm:py-4">
        {/* Left Film Spool (Feed Reel) */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 sm:border-4 border-neutral-600 bg-neutral-900 flex items-center justify-center animate-spin-slow shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-0.5 sm:h-1 bg-neutral-700 origin-center"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-neutral-950 border sm:border-2 border-amber-600/60 flex items-center justify-center z-10">
              <Disc className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-500" />
            </div>
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono text-neutral-500 mt-1 sm:mt-2 tracking-wider">
            FEED REEL
          </span>
        </div>

        {/* Center: Vintage Optical Projector Head with Illuminated Light Beam */}
        <div className="flex flex-col items-center text-center max-w-xs sm:max-w-md px-1">
          {/* Glowing Projector Lens */}
          <div className="relative mb-2 sm:mb-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-white shadow-[0_0_30px_#f59e0b,0_0_60px_rgba(245,158,11,0.4)] flex items-center justify-center border-2 sm:border-4 border-amber-800 animate-pulse">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white shadow-inner" />
            </div>
            {/* Projector Light Beam Cone Graphic */}
            <div
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-32 sm:w-48 h-14 sm:h-20 bg-gradient-to-r from-amber-400/20 via-amber-300/5 to-transparent pointer-events-none"
              style={{ clipPath: 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)' }}
            />
          </div>

          <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>ARCHIVAL PROJECTION ROOM</span>
          </div>

          <h1
            className="text-lg sm:text-2xl md:text-3xl font-extrabold font-mono tracking-tight uppercase"
            style={{ color: activeCategory?.accentColor || '#fbbf24' }}
          >
            {activeCategory?.name || 'ALL SYGNELS CHANNELS'}
          </h1>
          <p className="text-[11px] sm:text-xs font-mono text-neutral-400 mt-1 max-w-sm line-clamp-2">
            {activeCategory?.tagline || 'Explore verified symposium transmissions recorded on 35mm film stock.'}
          </p>

          <div className="mt-2 sm:mt-3 px-2 sm:px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-[9px] sm:text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
            <Gauge className="w-3 h-3 text-amber-500" />
            <span>SWIPE OR DRAG FILM FRAMES BELOW</span>
          </div>
        </div>

        {/* Right Film Spool (Take-up Reel) */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 sm:border-4 border-neutral-600 bg-neutral-900 flex items-center justify-center animate-spin-reverse shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-0.5 sm:h-1 bg-neutral-700 origin-center"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-neutral-950 border sm:border-2 border-amber-600/60 flex items-center justify-center z-10">
              <Disc className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-500" />
            </div>
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono text-neutral-500 mt-1 sm:mt-2 tracking-wider">
            TAKE-UP REEL
          </span>
        </div>
      </div>
    </div>
  );
}