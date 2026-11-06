import React, { useRef, useEffect } from 'react';
import { Radio, Activity, Zap, Play, Sparkles, CornerDownRight } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function TVScreen({
  isTvOn,
  isStartingUp,
  currentCategory,
  isGlitching,
  brightness = 1,
  onEnterChannel
}) {
  const staticCanvasRef = useRef(null);
  const waveCanvasRef = useRef(null);

  // Procedural White Noise on TV Screen during channel change or startup
  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas || !isTvOn) return;

    const ctx = canvas.getContext('2d');
    let animId;

    const renderNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      // Draw random grayscale noise
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = isGlitching ? 160 : 16;
      }
      ctx.putImageData(imgData, 0, 0);

      animId = requestAnimationFrame(renderNoise);
    };

    renderNoise();
    return () => cancelAnimationFrame(animId);
  }, [isTvOn, isGlitching]);

  // Procedural Oscilloscope / Signal Waveform Canvas
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas || !isTvOn) return;

    const ctx = canvas.getContext('2d');
    let step = 0;
    let animId;

    const renderWave = () => {
      step += 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = currentCategory?.accentColor || '#38bdf8';
      ctx.shadowBlur = 6;
      ctx.shadowColor = currentCategory?.accentColor || '#38bdf8';

      const h = canvas.height;
      const w = canvas.width;
      const mid = h / 2;

      for (let x = 0; x < w; x++) {
        const freq = (currentCategory?.channelIndex + 1) * 0.04;
        const y = mid + Math.sin(x * freq + step) * 12 * Math.sin(step * 0.3) + (Math.random() - 0.5) * 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isTvOn, currentCategory]);

  // 1. TV OFF STATE: Pitch Black Glass with Dark Room Ambiance & Bottom-Right Power Hint
  if (!isTvOn) {
    return (
      <div className="relative w-full h-full bg-[#030305] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 select-none shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
        {/* Curved Glass Reflection Overlay */}
        <div className="absolute inset-0 crt-glare pointer-events-none opacity-40" />

        {/* Standby Message */}
        <div className="text-center z-10 max-w-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 mx-auto mb-2 border border-neutral-700 animate-pulse" />
          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
            CATHODE RAY TUBE: OFFLINE
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-neutral-600 mt-2 bg-neutral-900/60 py-1.5 px-3 rounded-lg border border-neutral-800">
            <span>PRESS POWER IN BOTTOM RIGHT CORNER</span>
            <CornerDownRight className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  // 2. TV STARTUP STATE: CRT Phosphor Expansion Animation
  if (isStartingUp) {
    return (
      <div className="relative w-full h-full bg-black rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center select-none">
        <div className="w-full h-1 bg-white shadow-[0_0_30px_#ffffff,0_0_60px_#38bdf8] animate-pulse" />
        <div className="absolute inset-0 bg-white/10 animate-ping pointer-events-none" />
      </div>
    );
  }

  // 3. TV ON STATE: Responsive Phosphor CRT Display
  return (
    <div
      className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070b10] flex flex-col justify-between p-3.5 sm:p-6 md:p-8 select-none transition-all duration-300 border border-neutral-800/80 shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]"
      style={{
        filter: `brightness(${brightness}) contrast(${0.9 + brightness * 0.15})`
      }}
    >
      {/* Background Static Noise Canvas */}
      <canvas
        ref={staticCanvasRef}
        width={300}
        height={220}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 mix-blend-screen"
      />

      {/* CRT Scanline and Glare Overlays */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none z-20 opacity-60" />
      <div className="absolute inset-0 crt-glare pointer-events-none z-30 opacity-50" />

      {/* Phosphor Glow Backlight */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-colors duration-500 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentCategory.accentColor} 0%, transparent 70%)`
        }}
      />

      {/* TOP STATUS BAR: Channel Code, Frequency, Live Telemetry */}
      <div className="relative z-40 flex items-center justify-between border-b border-neutral-700/60 pb-2 sm:pb-3 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 relative">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: currentCategory.accentColor }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5"
              style={{ backgroundColor: currentCategory.accentColor }}
            />
          </span>
          <span className="font-bold tracking-wider text-neutral-200">
            CH {currentCategory.code}
          </span>
          <span className="text-neutral-500 font-mono text-[9px] sm:text-[10px] hidden xs:inline">
            [{currentCategory.frequency}]
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-neutral-400">
          <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
          <span className="font-mono text-amber-300/90 font-bold">SIGNAL LOCKED</span>
        </div>
      </div>

      {/* CENTER CONTENT: Category Display & Information */}
      <div className="relative z-40 my-auto py-1 sm:py-2 text-center">
        {/* Symposium Subtitle */}
        <div className="text-[9px] sm:text-[11px] font-mono tracking-widest text-amber-500/90 font-bold uppercase mb-1 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>SYGNELS ’26 TRANSMISSION</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>

        {/* Large CRT Phosphor Category Title */}
        <h2
          className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-mono uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
          style={{ color: currentCategory.accentColor }}
        >
          {currentCategory.name}
        </h2>

        {/* Tagline */}
        <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 font-mono italic max-w-md mx-auto mt-1 sm:mt-2 text-neutral-300/90 leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
          "{currentCategory.tagline}"
        </p>

        {/* Live Oscilloscope Waveform Display */}
        <div className="mt-2.5 sm:mt-4 flex items-center justify-center">
          <div className="bg-black/60 border border-neutral-700/80 rounded-lg px-2 sm:px-3 py-1 flex items-center gap-2 sm:gap-3 backdrop-blur-sm shadow-inner">
            <Activity className="w-3.5 h-3.5 text-neutral-500" />
            <canvas ref={waveCanvasRef} width={160} height={32} className="h-5 sm:h-7 w-28 sm:w-36" />
            <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400">
              {currentCategory.frequency}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR: Enter Channel Button */}
      <div className="relative z-40 pt-2 sm:pt-3 border-t border-neutral-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 flex items-center gap-1 text-center sm:text-left">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>DEPT OF ECE • ACGCET KARAIKUDI</span>
        </div>

        {/* Primary Glowing Action Button */}
        <button
          onClick={() => {
            audioSystem.playButtonPress();
            onEnterChannel(currentCategory.id);
          }}
          className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.03] active:scale-98 shadow-lg"
          style={{
            backgroundColor: currentCategory.accentColor,
            color: '#08080c',
            boxShadow: `0 0 20px ${currentCategory.glowColor}`
          }}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>ENTER {currentCategory.shortName} CHANNEL</span>
        </button>
      </div>
    </div>
  );
}