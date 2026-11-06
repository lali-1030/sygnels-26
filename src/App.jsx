import React, { useState } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import RetroTV from './components/RetroTV';
import FilmArchive from './components/FilmArchive';
import EventDetail from './components/EventDetail';
import { CATEGORIES } from './data/eventsData';
import { Tv, Film, Sparkles, Radio, Zap, Volume2, VolumeX } from 'lucide-react';
import { audioSystem } from './utils/audioSystem';

export default function App() {
  // Navigation States: 'TV_HOME' | 'FILM_ARCHIVE' | 'EVENT_DETAIL'
  const [activeView, setActiveView] = useState('TV_HOME');

  // TV Power State: Initially OFF as specified
  const [isTvOn, setIsTvOn] = useState(false);
  const [isStartingUp, setIsStartingUp] = useState(false);

  // Channel Tuning State: 0 (Technical), 1 (Non-Technical), 2 (Special)
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Selected event for dossier view
  const [selectedEvent, setSelectedEvent] = useState(null);

  // TV Signal Loading Overlay State
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);
  const [loadingCountdown, setLoadingCountdown] = useState(3);

  const activeCategory = CATEGORIES[currentChannel] || CATEGORIES[0];

  // Toggle TV Power Switch
  const handleTogglePower = () => {
    if (!isTvOn) {
      setIsStartingUp(true);
      setTimeout(() => {
        setIsStartingUp(false);
        setIsTvOn(true);
      }, 700);
    } else {
      setIsTvOn(false);
      setIsStartingUp(false);
    }
  };

  // Change Channel Knob
  const handleChannelChange = (newChannelIndex) => {
    setIsGlitching(true);
    setCurrentChannel(newChannelIndex);
    setTimeout(() => {
      setIsGlitching(false);
    }, 350);
  };

  // Enter Channel: TV Signal Loading -> Transition to 35mm Film Archive
  const handleEnterChannel = (categoryId) => {
    setIsLoadingTransition(true);
    setLoadingCountdown(3);
    audioSystem.playStaticBurst(0.8, 0.25);

    const interval = setInterval(() => {
      setLoadingCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsLoadingTransition(false);
          setActiveView('FILM_ARCHIVE');
          return 0;
        }
        return prev - 1;
      });
    }, 450);
  };

  const handleBackToTV = () => {
    setActiveView('TV_HOME');
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setActiveView('EVENT_DETAIL');
  };

  const handleBackToFilm = () => {
    setActiveView('FILM_ARCHIVE');
    setSelectedEvent(null);
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-neutral-100 flex flex-col justify-between selection:bg-amber-600 selection:text-black overflow-x-hidden font-mono">
      {/* Three.js Ambient Cinema Dust & Projector Light Beam Background */}
      <ThreeCanvas
        currentCategoryIndex={currentChannel}
        isProjectorMode={activeView === 'FILM_ARCHIVE'}
      />

      {/* TOP RETRO NAV & TELEMETRY HEADER */}
      <header className="relative z-20 w-full border-b border-neutral-800/80 bg-black/60 backdrop-blur-md py-2.5 sm:py-3.5 px-3 sm:px-8 flex items-center justify-between">
        {/* Left: Department & Symposium Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-widest text-amber-400">
                SYGNELS ’26
              </span>
              <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold hidden xs:inline">
                EST. 1984
              </span>
            </div>
            <p className="text-[8px] sm:text-[10px] text-neutral-500 uppercase tracking-tight">
              ECE SYMPOSIUM • ACGCET KARAIKUDI
            </p>
          </div>
        </div>

        {/* Center: Active View Breadcrumb Indicator (Visible on medium+ screens) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs">
          <span className={`w-2 h-2 rounded-full ${isTvOn ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-neutral-400">
            {activeView === 'TV_HOME'
              ? isTvOn ? `RECEIVING: ${activeCategory.shortName}` : 'STANDBY'
              : activeView === 'FILM_ARCHIVE'
              ? '35MM FILM PROJECTION ROOM'
              : 'CLASSIFIED MISSION DOSSIER'}
          </span>
        </div>

        {/* Right: Quick View Navigation */}
        <div className="flex items-center gap-2">
          {activeView !== 'TV_HOME' && (
            <button
              onClick={() => {
                audioSystem.playButtonPress();
                handleBackToTV();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>RETRO TV</span>
            </button>
          )}

          {activeView === 'EVENT_DETAIL' && (
            <button
              onClick={() => {
                audioSystem.playButtonPress();
                handleBackToFilm();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Film className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">FILM REEL</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN VIEW CONTENT AREA */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 sm:p-6 w-full">
        {/* VIEW 1: VINTAGE CRT TELEVISION EXPERIENCE */}
        {activeView === 'TV_HOME' && (
          <div className="w-full flex flex-col items-center justify-center py-4 sm:py-8 md:py-10 animate-fade-in">
            {/* Atmospheric Retro Headline */}
            <div className="text-center mb-4 sm:mb-6 px-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-1.5 sm:mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>WHERE IDEAS TAKE FLIGHT</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-100 uppercase">
                {isTvOn ? 'TURN THE DIAL TO EXPLORE SYGNELS ’26' : 'THE SYGNELS ’26 EVENT TELEVISION'}
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400 mt-1 max-w-lg mx-auto leading-relaxed">
                {isTvOn
                  ? 'Use the physical channel knob on the right to tune between 01 Technical, 02 Non-Technical, and 03 Special Events.'
                  : 'The cathode ray tube is offline. Press the physical POWER button in the TV bottom right corner to turn on.'}
              </p>
            </div>

            {/* Vintage CRT Television Centerpiece Assembly */}
            <RetroTV
              isTvOn={isTvOn}
              onTogglePower={handleTogglePower}
              isStartingUp={isStartingUp}
              currentChannel={currentChannel}
              onChannelChange={handleChannelChange}
              isGlitching={isGlitching}
              currentCategory={activeCategory}
              onEnterChannel={handleEnterChannel}
            />
          </div>
        )}

        {/* VIEW 2: 35MM FILM ARCHIVE PROJECTION ROOM */}
        {activeView === 'FILM_ARCHIVE' && (
          <FilmArchive
            selectedCategoryId={activeCategory.id}
            onBackToTV={handleBackToTV}
            onSelectEvent={handleSelectEvent}
          />
        )}

        {/* VIEW 3: EVENT DOSSIER / VINTAGE LETTER PAGE */}
        {activeView === 'EVENT_DETAIL' && (
          <EventDetail
            event={selectedEvent}
            onBackToFilm={handleBackToFilm}
            onBackToTV={handleBackToTV}
          />
        )}
      </main>

      {/* TV SIGNAL LOADING COUNTDOWN TRANSITION MODAL */}
      {isLoadingTransition && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-6 select-none font-mono">
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-70" />

          <div className="relative z-10 text-center px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-amber-500/80 border-t-amber-300 animate-spin mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)]">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 animate-pulse">
                {loadingCountdown}
              </span>
            </div>

            <div className="text-[10px] sm:text-xs tracking-widest text-amber-500 font-bold uppercase mb-2">
              TUNING OPTICAL SOUNDTRACK & PROJECTION BEAM
            </div>
            <h2 className="text-xl sm:text-3xl font-black uppercase text-neutral-100">
              LOCKING {activeCategory.name}
            </h2>
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-1.5 sm:mt-2">
              FREQUENCY: {activeCategory.frequency} // 35MM REEL MOUNTING...
            </p>
          </div>
        </div>
      )}

      {/* VINTAGE BOTTOM FOOTER & TRANSMISSION TELEMETRY */}
      <footer className="relative z-20 w-full border-t border-neutral-800/80 py-3 sm:py-4 px-4 sm:px-6 bg-black/70 backdrop-blur-md font-mono text-[10px] sm:text-[11px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center sm:justify-start">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-neutral-400 font-bold">SYGNELS ’26 ARCHIVAL RECORD</span>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span>DEPARTMENT OF ECE</span>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span>ACGCET KARAIKUDI</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-neutral-400 text-[10px] sm:text-[11px]">
          <span>RETRO TV + 35MM CINEMA ARCHIVE</span>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="text-amber-500/80 font-bold">TRANSMISSIONS ONLINE</span>
        </div>
      </footer>
    </div>
  );
}