// SYGNELS ’26 Procedural Web Audio Synthesizer
// 100% Client-side synthetic audio - requires zero external audio files
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.5;
    this.humNode = null;
    this.humGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.humGain) {
      this.humGain.gain.setValueAtTime(muted ? 0 : 0.02 * this.volume, this.ctx?.currentTime || 0);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.humGain && !this.isMuted) {
      this.humGain.gain.setValueAtTime(0.02 * this.volume, this.ctx?.currentTime || 0);
    }
  }

  // TV Power Switch Clunk & CRT Startup Whine
  playPowerOn() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // 1. Mechanical switch click
      const switchOsc = this.ctx.createOscillator();
      const switchGain = this.ctx.createGain();
      switchOsc.type = 'square';
      switchOsc.frequency.setValueAtTime(180, now);
      switchOsc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
      switchGain.gain.setValueAtTime(0.3 * this.volume, now);
      switchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      switchOsc.connect(switchGain);
      switchGain.connect(this.ctx.destination);
      switchOsc.start(now);
      switchOsc.stop(now + 0.05);

      // 2. High-frequency 15kHz flyback transformer rising whistle
      const whineOsc = this.ctx.createOscillator();
      const whineGain = this.ctx.createGain();
      whineOsc.type = 'sine';
      whineOsc.frequency.setValueAtTime(800, now + 0.02);
      whineOsc.frequency.exponentialRampToValueAtTime(15625, now + 0.35); // standard NTSC/PAL CRT frequency
      whineGain.gain.setValueAtTime(0.001, now);
      whineGain.gain.linearRampToValueAtTime(0.06 * this.volume, now + 0.3);
      whineGain.gain.exponentialRampToValueAtTime(0.005 * this.volume, now + 0.7);
      whineOsc.connect(whineGain);
      whineGain.connect(this.ctx.destination);
      whineOsc.start(now + 0.02);
      whineOsc.stop(now + 0.75);

      // 3. Short static pop
      this.playStaticBurst(0.25, 0.15);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playPowerOff() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(15625, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
      gain.gain.setValueAtTime(0.1 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Rotary Channel Knob Clunk
  playKnobClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Heavy mechanical thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.04);
      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);

      // Momentary frequency detune static
      this.playStaticBurst(0.18, 0.2);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Procedural White/Pink Noise Static Burst
  playStaticBurst(duration = 0.2, level = 0.1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(level * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Vintage 35mm Projector Ticking / Sprocket click
  playProjectorTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.025);
      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Push Button Tactile Click
  playButtonPress() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.035);
      gain.gain.setValueAtTime(0.18 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Heavy Ink Stamp Thud
  playStampThud() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
      gain.gain.setValueAtTime(0.35 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

export const audioSystem = new AudioSynthesizer();