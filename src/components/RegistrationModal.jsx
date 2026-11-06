import React, { useState } from 'react';
import { X, CheckCircle, Ticket, Printer, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSystem } from '../utils/audioSystem';

export default function RegistrationModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    department: '',
    year: 'III Year',
    email: '',
    phone: '',
    teamMembers: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    audioSystem.playStampThud();

    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const id = `SYG-26-${event.code}-${randomHex}`;
    setTicketId(id);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#f43f5e', '#ffffff']
      });
    } catch (err) {
      console.warn('Confetti error:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#f7f0e4] text-neutral-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 sm:border-4 border-[#e2d5c1] font-serif">
        {/* Parchment Background Texture */}
        <div className="absolute inset-0 aged-paper pointer-events-none opacity-50 mix-blend-multiply" />

        {/* Close Button */}
        <button
          onClick={() => {
            audioSystem.playButtonPress();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full bg-neutral-900/10 hover:bg-neutral-900/20 text-neutral-700 cursor-pointer transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          /* REGISTRATION FORM TELEGRAM */
          <div className="relative z-10">
            {/* Header */}
            <div className="border-b-2 border-neutral-900/20 pb-3 sm:pb-4 mb-4 text-center">
              <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-red-800 border border-red-800 px-2 py-0.5 rounded">
                TELEGRAPHIC ADMISSION DISPATCH
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-mono uppercase tracking-tight text-neutral-900 mt-1.5 sm:mt-2">
                MISSION REGISTRATION
              </h2>
              <p className="font-mono text-[11px] sm:text-xs text-neutral-600 mt-0.5">
                TARGET: [{event.code}] {event.name}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1 text-[11px] sm:text-xs">
                  CANDIDATE FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/80 border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-700 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1 text-[11px] sm:text-xs">
                    COLLEGE / INSTITUTION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. ACGCET Karaikudi"
                    className="w-full bg-white/80 border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-700 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-bold mb-1 text-[11px] sm:text-xs">
                    BRANCH / YEAR *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="ECE / III Year"
                    className="w-full bg-white/80 border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-700 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1 text-[11px] sm:text-xs">
                    DISPATCH EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="candidate@acgcet.ac.in"
                    className="w-full bg-white/80 border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-700 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-bold mb-1 text-[11px] sm:text-xs">
                    TELEPHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/80 border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-700 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1 text-[11px] sm:text-xs">
                  ADDITIONAL CREW / TEAM MEMBERS (IF ANY)
                </label>
                <input
                  type="text"
                  value={formData.teamMembers}
                  onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                  placeholder="Names separated by comma (e.g. Alice, Bob)"
                  className="w-full bg-white/80 border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-700 text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-800 to-amber-950 text-amber-100 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:from-amber-700 hover:to-amber-900 transition-all shadow-lg border border-amber-600/70 active:scale-98"
                >
                  <Feather className="w-4 h-4 text-amber-400" />
                  <span>TRANSMIT TELEGRAM & GENERATE PASS</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ISSUED VINTAGE BOARDING PASS TICKET */
          <div className="relative z-10 text-center py-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-900/10 text-amber-900 mx-auto flex items-center justify-center mb-2 sm:mb-3 border-2 border-amber-900/30">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-amber-800" />
            </div>

            <h3 className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-900">
              TRANSMISSION VERIFIED & ARCHIVED
            </h3>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-900 mt-1 uppercase">
              OFFICIAL ADMISSION PASS
            </h2>

            {/* PUNCHED TICKET BOARDING PASS STUB */}
            <div className="my-4 sm:my-5 p-3.5 sm:p-5 bg-white border-2 border-dashed border-neutral-800 rounded-2xl text-left font-mono relative shadow-inner">
              <div className="flex justify-between items-start border-b border-neutral-300 pb-2 mb-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 block">SYMPOSIUM:</span>
                  <span className="text-sm sm:text-base font-black text-neutral-900">SYGNELS ’26</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 block">PASS ID:</span>
                  <span className="text-[11px] sm:text-xs font-black text-red-800 truncate block max-w-36">{ticketId}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-[8px] sm:text-[9px] text-neutral-500 block">CANDIDATE:</span>
                  <span className="font-bold text-neutral-900 truncate block">{formData.name}</span>
                </div>
                <div>
                  <span className="text-[8px] sm:text-[9px] text-neutral-500 block">COLLEGE:</span>
                  <span className="font-bold text-neutral-900 truncate block">{formData.college}</span>
                </div>
                <div>
                  <span className="text-[8px] sm:text-[9px] text-neutral-500 block">EVENT:</span>
                  <span className="font-bold text-neutral-900 truncate block">{event.name}</span>
                </div>
                <div>
                  <span className="text-[8px] sm:text-[9px] text-neutral-500 block">DATE:</span>
                  <span className="font-bold text-neutral-900 text-[10px] sm:text-xs">{event.date}</span>
                </div>
              </div>

              {/* Simulated Punch Barcode */}
              <div className="pt-2 border-t border-neutral-300 flex justify-between items-center text-[10px] text-neutral-600">
                <div className="tracking-widest font-mono text-[10px] sm:text-xs text-neutral-800">
                  ||| | |||| | ||||| || |||
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase font-bold text-neutral-500">DEPT OF ECE</span>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-2 sm:py-2.5 rounded-xl bg-neutral-900 text-amber-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-neutral-800 cursor-pointer shadow active:scale-98"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT / SAVE</span>
              </button>
              <button
                onClick={() => {
                  audioSystem.playButtonPress();
                  onClose();
                }}
                className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl border border-neutral-500 font-mono text-xs font-bold text-neutral-800 hover:bg-neutral-200 cursor-pointer active:scale-98"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}