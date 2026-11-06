import React, { useState, useRef, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

const CHANNELS = [
  { id: 0, code: "01", label: "TECHNICAL", angle: -42, color: "#38bdf8" },
  { id: 1, code: "02", label: "NON-TECH", angle: 0, color: "#fbbf24" },
  { id: 2, code: "03", label: "SPECIAL", angle: 42, color: "#f43f5e" }
];

export default function ChannelKnob({ currentChannel, onChannelChange, isTvOn }) {
  const knobRef = useRef(null);
  const touchStartX = useRef(0);

  const activeChannelObj = CHANNELS[currentChannel] || CHANNELS[0];

  const handleChannelSelect = (idx) => {
    if (!isTvOn || idx === currentChannel) return;
    audioSystem.playKnobClick();
    onChannelChange(idx);
  };

  const handleStep = (delta) => {
    if (!isTvOn) return;
    const next = (currentChannel + delta + 3) % 3;
    handleChannelSelect(next);
  };

  // Touch Swipe for Mobile Phones
  const handleTouchStart = (e) => {
    if (!isTvOn) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!isTvOn) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 25) {
      handleStep(diff > 0 ? 1 : -1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isTvOn) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleStep(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleStep(-1);
      } else if (e.key === '1') {
        handleChannelSelect(0);
      } else if (e.key === '2') {
        handleChannelSelect(1);
      } else if (e.key === '3') {
        handleChannelSelect(2);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentChannel, isTvOn]);

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* Knob Label Header */}
      <div className="text-[9px] sm:text-[10px] tracking-widest font-mono text-amber-500/80 uppercase font-bold mb-1.5 flex items-center gap-1">
        <RotateCw className="w-3 h-3 animate-spin-slow opacity-70" />
        <span>CHANNEL TUNER</span>
      </div>

      {/* Main Rotary Dial Casing */}
      <div
        className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Outer Bezel with Etched Channel Tick Marks */}
        <div className="absolute inset-0 rounded-full border-2 border-neutral-700 bg-gradient-to-b from-neutral-800 to-neutral-950 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.8)]" />

        {/* Detent Marks & Clickable Channel Labels */}
        {CHANNELS.map((ch, idx) => {
          const isActive = isTvOn && currentChannel === idx;
          return (
            <button
              key={ch.id}
              disabled={!isTvOn}
              onClick={() => handleChannelSelect(idx)}
              className="absolute z-20 transition-all duration-200 group p-1"
              style={{
                top: idx === 0 ? '2px' : idx === 1 ? '0px' : '2px',
                left: idx === 0 ? '6px' : idx === 1 ? '50%' : 'auto',
                right: idx === 2 ? '6px' : 'auto',
                transform: idx === 1 ? 'translateX(-50%)' : 'none'
              }}
              title={`Switch to ${ch.label}`}
            >
              <div className="flex flex-col items-center cursor-pointer">
                <span
                  className={`text-[8px] sm:text-[9px] font-mono font-bold tracking-tight px-1 rounded transition-colors ${
                    isActive
                      ? 'text-amber-400 bg-amber-950/80 ring-1 ring-amber-500/50 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {ch.code}
                </span>
                <div
                  className={`w-1 h-1.5 sm:h-2 rounded-full mt-0.5 transition-colors ${
                    isActive ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]' : 'bg-neutral-700'
                  }`}
                />
              </div>
            </button>
          );
        })}

        {/* Rotating Central Knob */}
        <div
          ref={knobRef}
          onClick={() => handleStep(1)}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform duration-300 ease-out shadow-[0_6px_16px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-center justify-center border-2 border-neutral-600 ${
            isTvOn ? 'active:scale-95 hover:border-amber-500/70' : 'opacity-60 cursor-not-allowed'
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 35%, #404040 0%, #171717 70%, #0a0a0a 100%)',
            transform: `rotate(${isTvOn ? activeChannelObj.angle : 0}deg)`
          }}
        >
          {/* Knurled Gripping Rim */}
          <div className="absolute inset-1 rounded-full border border-dashed border-neutral-600/50" />

          {/* Indicator Needle / Notch */}
          <div className="absolute top-1 w-1.5 h-3.5 sm:h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-[0_0_8px_#fbbf24]" />

          {/* Center Metal Cap */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-neutral-700 via-neutral-900 to-black border border-neutral-600 flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-950 border border-neutral-700" />
          </div>
        </div>
      </div>

      {/* Manual Step Arrows for Accessible Interaction */}
      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
        <button
          disabled={!isTvOn}
          onClick={() => handleStep(-1)}
          className="p-1.5 sm:p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-amber-400 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-neutral-700/60 shadow-sm cursor-pointer"
          title="Previous Channel (Left Arrow / Swipe Left)"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <span className="text-[9px] sm:text-[10px] font-mono text-neutral-300 font-bold min-w-16 sm:min-w-20 text-center uppercase tracking-tight">
          {isTvOn ? activeChannelObj.label : 'OFFLINE'}
        </span>

        <button
          disabled={!isTvOn}
          onClick={() => handleStep(1)}
          className="p-1.5 sm:p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-amber-400 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-neutral-700/60 shadow-sm cursor-pointer"
          title="Next Channel (Right Arrow / Swipe Right)"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}