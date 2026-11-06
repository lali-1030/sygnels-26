import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Award, ShieldAlert, CheckCircle2, Phone, Mail, FileText, Bookmark, Feather } from 'lucide-react';
import RegistrationModal from './RegistrationModal';
import { audioSystem } from '../utils/audioSystem';

export default function EventDetail({ event, onBackToFilm, onBackToTV }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  if (!event) return null;

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-start relative z-10 animate-fade-in">
      {/* DESK ENVIRONMENT HEADER CONTROLS */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 sm:mb-8 z-20 gap-2">
        <button
          onClick={() => {
            audioSystem.playButtonPress();
            onBackToFilm();
          }}
          className="px-3 sm:px-4 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all shadow-lg hover:border-amber-500/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO 35MM REEL</span>
        </button>

        <button
          onClick={() => {
            audioSystem.playButtonPress();
            onBackToTV();
          }}
          className="px-3 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-200 font-mono text-xs cursor-pointer transition-all"
        >
          RETRO TV TUNER
        </button>
      </div>

      {/* THE VINTAGE WOODEN DESK & UNFOLDED PARCHMENT DOSSIER */}
      <div className="relative w-full max-w-4xl">
        {/* DESK ACCESSORY: Glass Ink Bottle (Hidden on Mobile/Tablet, Visible on Large Desktops) */}
        <div className="hidden xl:flex absolute -left-20 top-16 flex-col items-center pointer-events-none select-none opacity-85 z-10">
          <div className="w-14 h-20 rounded-xl bg-gradient-to-b from-neutral-800 via-neutral-950 to-black border-2 border-amber-900/50 shadow-2xl relative flex flex-col items-center justify-between p-1.5">
            <div className="w-6 h-3 bg-amber-900/60 rounded-t border-t border-amber-600/40" />
            <div className="w-10 py-1 bg-amber-100 rounded text-[7px] font-mono text-center text-amber-950 font-bold border border-amber-800/40">
              INDIA INK
            </div>
            <div className="w-8 h-2 bg-neutral-800 rounded-b" />
          </div>
          <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase tracking-wider">
            ARCHIVAL INK
          </span>
        </div>

        {/* DESK ACCESSORY: Feather Quill (Hidden on Mobile/Tablet, Visible on Large Desktops) */}
        <div className="hidden xl:flex absolute -right-16 top-10 flex-col items-center pointer-events-none select-none opacity-85 z-10">
          <div
            className="w-1.5 h-36 bg-gradient-to-t from-neutral-400 via-amber-200 to-amber-700 rounded-full shadow-lg"
            style={{ transform: 'rotate(24deg)' }}
          >
            <div className="w-8 h-16 bg-gradient-to-tr from-amber-100/70 to-amber-400/40 rounded-full -ml-3 -mt-6 blur-[0.5px]" />
          </div>
          <span className="text-[8px] font-mono text-neutral-500 mt-2 uppercase tracking-wider">
            QUILL PEN
          </span>
        </div>

        {/* MAIN UNFOLDED AGED PARCHMENT DOSSIER DOCUMENT */}
        <div className="relative bg-[#f5ede0] text-neutral-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 sm:border-4 border-[#e2d3bc] overflow-hidden select-text font-serif">
          {/* Subtle Parchment Aging Texture */}
          <div className="absolute inset-0 aged-paper pointer-events-none opacity-60 mix-blend-multiply" />

          {/* Coffee Cup Ring Watermark Stain in Corner */}
          <div className="absolute -top-12 -right-12 w-36 sm:w-48 h-36 sm:h-48 rounded-full border-8 border-amber-900/10 pointer-events-none transform rotate-12" />

          {/* Top Brass Paperclip & Scotch Tape Simulation */}
          <div className="absolute top-0 left-8 sm:left-12 w-5 sm:w-6 h-10 sm:h-12 border-2 border-neutral-600 rounded-b-xl z-20 pointer-events-none shadow-sm" />
          <div className="absolute top-2 right-8 sm:right-12 w-20 sm:w-24 h-5 sm:h-6 bg-amber-200/40 transform rotate-2 border border-amber-300/30 backdrop-blur-[1px] pointer-events-none shadow-sm hidden xs:block" />

          {/* DOCUMENT HEADER: Classification, Postage Stamps & Seals */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-neutral-900/20 pb-4 sm:pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-block px-2.5 py-0.5 border-2 border-red-700 text-red-800 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded transform -rotate-1 shadow-sm">
                  ★ CLASSIFIED DOSSIER ★
                </span>
                <span className="font-mono text-xs text-neutral-700 font-bold">
                  REF: {event.code}
                </span>
              </div>
              <h4 className="font-mono text-[10px] sm:text-xs text-neutral-700 uppercase tracking-widest font-bold">
                DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING
              </h4>
              <p className="font-mono text-[9px] sm:text-[10px] text-neutral-600">
                ALAGAPPA CHETTIAR GOVERNMENT COLLEGE OF ENGINEERING & TECHNOLOGY (ACGCET)
              </p>
            </div>

            {/* Vintage Postage Stamp with Cancellation Marks */}
            <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
              <div className="w-14 h-16 sm:w-16 sm:h-20 bg-amber-50 border-2 border-dashed border-amber-800 rounded p-1 flex flex-col items-center justify-between shadow-md transform rotate-2 select-none">
                <span className="text-[6px] sm:text-[7px] font-mono font-bold text-amber-900 uppercase">
                  SYGNELS '26
                </span>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-amber-900/20 flex items-center justify-center font-mono text-[10px] sm:text-xs font-black text-amber-950">
                  26¢
                </div>
                <span className="text-[5px] sm:text-[6px] font-mono text-neutral-600">AIR MAIL</span>
              </div>

              {/* Red Wax Seal Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-700 to-red-950 text-amber-100 flex flex-col items-center justify-center text-center p-1 border-2 border-red-500 shadow-xl transform -rotate-6 select-none">
                <span className="text-[6px] sm:text-[7px] font-mono font-black uppercase tracking-tighter">
                  SEALED
                </span>
                <span className="text-[7px] sm:text-[8px] font-serif font-black">ECE</span>
              </div>
            </div>
          </div>

          {/* MAIN EVENT TITLE & TAGLINE */}
          <div className="relative z-10 my-4 sm:my-6">
            <div className="font-mono text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">
              MISSION DOSSIER // {event.categoryName}
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-neutral-900 uppercase">
              {event.name}
            </h1>
            <p className="text-xs sm:text-base font-serif italic text-neutral-700 mt-1.5 sm:mt-2 font-medium border-l-4 border-amber-800/40 pl-3">
              "{event.tagline}"
            </p>
          </div>

          {/* MISSION BRIEFING */}
          <div className="relative z-10 my-4 sm:my-6 bg-neutral-900/5 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-neutral-900/10">
            <h3 className="font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase text-neutral-800 mb-1.5 sm:mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800" />
              <span>CLASSIFIED OPERATIONAL BRIEFING</span>
            </h3>
            <p className="font-serif text-xs sm:text-sm md:text-base text-neutral-800 leading-relaxed text-justify">
              {event.briefing}
            </p>
          </div>

          {/* KEY OPERATIONAL SPECS (GRID: Date, Venue, Team, Fee, Prize) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-4 sm:my-6 font-mono text-xs">
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-900/20 shadow-sm">
              <span className="flex items-center gap-1.5 text-neutral-600 mb-1 font-bold">
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>SCHEDULE</span>
              </span>
              <p className="text-neutral-900 font-bold">{event.date}</p>
              <p className="text-neutral-600 text-[10px]">{event.time}</p>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-900/20 shadow-sm">
              <span className="flex items-center gap-1.5 text-neutral-600 mb-1 font-bold">
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span>LOCATION</span>
              </span>
              <p className="text-neutral-900 font-bold">{event.venue}</p>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-900/20 shadow-sm">
              <span className="flex items-center gap-1.5 text-neutral-600 mb-1 font-bold">
                <Users className="w-3.5 h-3.5 text-amber-800" />
                <span>CREW & FEE</span>
              </span>
              <p className="text-neutral-900 font-bold">{event.teamSize}</p>
              <p className="text-neutral-700 text-[10px] font-bold">{event.fee}</p>
            </div>

            <div className="p-3 bg-amber-100/90 rounded-xl border border-amber-800/40 shadow-sm">
              <span className="flex items-center gap-1.5 text-amber-900 mb-1 font-bold">
                <Award className="w-3.5 h-3.5 text-amber-900" />
                <span>PRIZE ARCHIVE</span>
              </span>
              <p className="text-amber-950 font-black text-sm">{event.prizePool}</p>
            </div>
          </div>

          {/* RULES AND DIRECTIVES */}
          <div className="relative z-10 my-4 sm:my-6">
            <h3 className="font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase text-neutral-800 mb-2 sm:mb-3 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-800" />
              <span>RULES & PROTOCOLS OF ENGAGEMENT</span>
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 font-mono text-[11px] sm:text-xs text-neutral-800">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-900/10 text-amber-900 font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-900/30">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ROUNDS TIMELINE */}
          {event.rounds && (
            <div className="relative z-10 my-4 sm:my-6 bg-amber-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-900/20">
              <h3 className="font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase text-neutral-800 mb-2 sm:mb-3 flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800" />
                <span>MISSION STAGES & ROUNDS</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {event.rounds.map((round, idx) => (
                  <div key={idx} className="border-b border-neutral-900/10 pb-2 last:border-none">
                    <span className="font-bold text-neutral-900">{round.name}</span>
                    <p className="text-neutral-700 text-[11px] mt-0.5">{round.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONVENERS & CONTACT TELEMETRY */}
          <div className="relative z-10 my-4 sm:my-6 pt-3 sm:pt-4 border-t-2 border-neutral-900/20">
            <h3 className="font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase text-neutral-700 mb-2 sm:mb-3">
              AUTHORIZING CONVENERS & DISPATCH
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs">
              {event.coordinators.map((c, idx) => (
                <div key={idx} className="p-2 sm:p-2.5 bg-neutral-900/5 rounded-lg border border-neutral-900/10">
                  <p className="font-bold text-neutral-900">{c.name}</p>
                  <p className="text-[10px] text-neutral-600">{c.role}</p>
                  <p className="text-amber-900 font-bold text-[10px] mt-0.5">{c.contact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PRIMARY ACTION: WAX-SEALED REGISTRATION BUTTON */}
          <div className="relative z-10 pt-4 sm:pt-6 border-t-2 border-neutral-900/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="font-mono text-[9px] sm:text-[10px] text-neutral-600 italic text-center sm:text-left">
              * Official admission pass generated immediately upon telegram dispatch.
            </div>

            <button
              onClick={() => {
                audioSystem.playStampThud();
                setIsRegisterOpen(true);
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-100 font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:from-amber-600 hover:to-amber-800 transition-all transform hover:scale-[1.02] active:scale-98 shadow-xl border-2 border-amber-600/80"
            >
              <Feather className="w-4 h-4 text-amber-300" />
              <span>REGISTER FOR THIS MISSION</span>
            </button>
          </div>
        </div>
      </div>

      {/* REGISTRATION TELEGRAM MODAL & PASS */}
      {isRegisterOpen && (
        <RegistrationModal
          event={event}
          onClose={() => setIsRegisterOpen(false)}
        />
      )}
    </div>
  );
}