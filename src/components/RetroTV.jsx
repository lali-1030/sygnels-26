import React, { useState } from 'react';
import TVScreen from './TVScreen';
import ChannelKnob from './ChannelKnob';
import { Power, Volume2, VolumeX, Sun, Radio, Disc, Sparkles } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function RetroTV({
  isTvOn,
  onTogglePower,
  isStartingUp,
  currentChannel,
  onChannelChange,
  isGlitching,
  currentCategory,
  onEnterChannel
}) {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(1);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioSystem.setVolume(val);
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioSystem.setMuted(nextMuted);
  };

  const handleBrightnessChange = (e) => {
    setBrightness(parseFloat(e.target.value));
  };

  const handlePowerPress = () => {
    if (isTvOn) {
      audioSystem.playPowerOff();
    } else {
      audioSystem.playPowerOn();
    }
    onTogglePower();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center px-1 sm:px-4">
      {/* Vintage Telescoping Antenna Assembly on Top of Cabinet */}
      <div className="relative w-44 sm:w-64 md:w-72 h-10 sm:h-12 md:h-14 flex justify-between px-6 sm:px-10 items-end pointer-events-none -mb-2 sm:-mb-3 z-0">
        {/* Left Antenna Rod */}
        <div
          className="w-1 sm:w-1.5 h-12 sm:h-16 bg-gradient-to-t from-neutral-600 via-neutral-400 to-neutral-200 rounded-t origin-bottom shadow-md"
          style={{ transform: 'rotate(-28deg)' }}
        >
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-400 -mt-1 -ml-0.5 sm:-mt-1.5 sm:-ml-0.75 shadow-sm" />
        </div>

        {/* Center Antenna Mount Bracket */}
        <div className="w-12 sm:w-16 h-2.5 sm:h-3 bg-neutral-800 rounded-t-lg border-t border-neutral-600 mx-auto" />

        {/* Right Antenna Rod */}
        <div
          className="w-1 sm:w-1.5 h-12 sm:h-16 bg-gradient-to-t from-neutral-600 via-neutral-400 to-neutral-200 rounded-t origin-bottom shadow-md"
          style={{ transform: 'rotate(28deg)' }}
        >
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-400 -mt-1 -ml-0.5 sm:-mt-1.5 sm:-ml-0.75 shadow-sm" />
        </div>
      </div>

      {/* Main Vintage CRT TV Cabinet Housing */}
      <div className="relative z-10 w-full rounded-[1.75rem] sm:rounded-[2.5rem] p-3 sm:p-6 md:p-7 bg-[#1a1411] border-4 border-[#2c2018] shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.15)] flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch">
        {/* Woodgrain & Walnut Side Laminate Accent Strip */}
        <div className="absolute inset-1.5 sm:inset-2 rounded-[1.5rem] sm:rounded-[2rem] pointer-events-none border border-amber-900/30 opacity-70" />

        {/* LEFT COLUMN: Large CRT Bezel & Screen */}
        <div className="flex-1 min-h-[280px] sm:min-h-[360px] md:min-h-[420px] rounded-2xl sm:rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-[#18181b] via-[#0d0d10] to-[#09090b] border-2 border-neutral-700/80 shadow-[inset_0_4px_16px_rgba(0,0,0,0.9),0_2px_4px_rgba(255,255,255,0.05)] relative flex items-center justify-center">
          <TVScreen
            isTvOn={isTvOn}
            isStartingUp={isStartingUp}
            currentCategory={currentCategory}
            isGlitching={isGlitching}
            brightness={brightness}
            onEnterChannel={onEnterChannel}
          />
        </div>

        {/* RIGHT COLUMN: Analog Physical Control Panel */}
        <div className="w-full md:w-64 bg-gradient-to-b from-[#1f1b18] to-[#13110f] rounded-2xl p-3 sm:p-4 border border-neutral-800 flex flex-col justify-between shadow-inner relative">
          {/* Top Panel Brand Badge */}
          <div className="border-b border-neutral-700/60 pb-2.5 flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] sm:text-xs font-black tracking-widest text-amber-500 uppercase block">
                TRINITRON ’26
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-neutral-500 tracking-tight">
                COLOR TELEVISION RECEIVER
              </span>
            </div>

            {/* Red LED Pilot Status Indicator */}
            <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded border border-neutral-800">
              <div
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  isTvOn
                    ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                    : 'bg-neutral-800 border border-neutral-700'
                }`}
              />
              <span className="text-[8px] font-mono font-bold text-neutral-400">
                {isTvOn ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Central Channel Selector Knob */}
          <div className="my-2 py-2 border-b border-neutral-800/80 flex justify-center">
            <ChannelKnob
              currentChannel={currentChannel}
              onChannelChange={onChannelChange}
              isTvOn={isTvOn}
            />
          </div>

          {/* Sliders: Volume & Screen Brightness */}
          <div className="space-y-2.5 my-2">
            {/* Volume Slider */}
            <div>
              <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 mb-1">
                <span className="flex items-center gap-1">
                  <button onClick={handleMuteToggle} className="hover:text-amber-400 cursor-pointer">
                    {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                  <span>VOLUME</span>
                </span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Brightness Slider */}
            <div>
              <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 mb-1">
                <span className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>BRIGHTNESS</span>
                </span>
                <span>{Math.round(brightness * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={brightness}
                onChange={handleBrightnessChange}
                disabled={!isTvOn}
                className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded cursor-pointer disabled:opacity-40"
              />
            </div>
          </div>

          {/* Acoustic Grille Slots */}
          <div className="py-2 border-t border-neutral-800 flex flex-col gap-1 items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full h-1 bg-black/80 rounded-full border-t border-neutral-900 shadow-inner"
              />
            ))}
          </div>

          {/* ============================================================ */}
          {/* PRIMARY MASTER POWER BUTTON IN TV BOTTOM RIGHT CORNER       */}
          {/* ============================================================ */}
          <div className="pt-3 border-t-2 border-neutral-800 flex items-center justify-between gap-3 mt-auto">
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11px] font-mono font-black text-neutral-300 tracking-wider">
                MAIN POWER
              </span>
              <span className="text-[8px] font-mono text-neutral-500">
                {isTvOn ? 'CIRCUIT ENERGIZED' : 'PRESS TO IGNITE CRT'}
              </span>
            </div>

            {/* Tactile Vintage Push Button in Bottom Right Corner */}
            <div className="relative">
              {!isTvOn && (
                <div className="absolute -inset-1.5 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
              )}
              <button
                onClick={handlePowerPress}
                aria-label="Master Power Button"
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform active:scale-90 border-2 shadow-[0_6px_16px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.2)] ${
                  isTvOn
                    ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    : 'bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-950 border-neutral-600 text-neutral-300 hover:border-red-500 hover:text-white'
                }`}
                title={isTvOn ? "Turn TV Off" : "Turn TV On"}
              >
                {/* Knurled Metal Rim Effect */}
                <div className="absolute inset-1 rounded-full border border-neutral-500/40 pointer-events-none" />

                {/* Power Icon */}
                <Power className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isTvOn ? 'text-white scale-105' : 'text-red-400'}`} />

                {/* Micro Label */}
                <span className="text-[7px] font-mono font-bold tracking-tight uppercase mt-0.5">
                  {isTvOn ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Physical TV Cabinet Wooden Legs Base */}
      <div className="w-full max-w-2xl flex justify-between px-8 sm:px-12 z-0 -mt-2">
        <div className="w-8 sm:w-10 h-5 sm:h-7 bg-[#1a1411] rounded-b-xl border-x-2 border-b-2 border-neutral-800 shadow-xl" />
        <div className="w-8 sm:w-10 h-5 sm:h-7 bg-[#1a1411] rounded-b-xl border-x-2 border-b-2 border-neutral-800 shadow-xl" />
      </div>
    </div>
  );
}