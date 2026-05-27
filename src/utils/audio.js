// Synthesized Retro/Eerie Sound Effects using Web Audio API
// No assets or network requests required. Offline friendly and zero-latency.

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a quick retro-synth pluck when selecting a cell.
 */
export function playSelectSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Retro-spooky square wave
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.1);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.error('Failed to play select sound:', e);
  }
}

/**
 * Play a lower, slightly shorter pluck when deselecting a cell.
 */
export function playDeselectSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error('Failed to play deselect sound:', e);
  }
}

/**
 * Play an ascending C-minor arpeggio with retro synth lead styling when a word is matched.
 */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 311.13, 392.00, 523.25]; // C4, Eb4 (minor third for eerie feel), G4, C5
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const noteTime = startTime + index * 0.08;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Triangle for retro chime vibe
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      // Pitch envelope: slight slide up for eerie synth feel
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, noteTime + 0.25);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.15, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  } catch (e) {
    console.error('Failed to play success sound:', e);
  }
}

/**
 * Play an epic retro synthwave melody inspired by Stranger Things when the game is won.
 */
export function playVictorySound() {
  try {
    const ctx = getAudioContext();
    
    // Stranger Things arpeggio motif: C4 - E4 - G4 - B4 - C5 - B4 - G4 - E4 - C4
    const notes = [
      261.63, // C4
      329.63, // E4
      392.00, // G4
      493.88, // B4
      523.25, // C5
      493.88, // B4
      392.00, // G4
      329.63, // E4
      261.63  // C4
    ];
    
    const startTime = ctx.currentTime;
    const tempo = 0.13; // Fast arpeggiator speed

    notes.forEach((freq, index) => {
      const noteTime = startTime + index * tempo;
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator(); // Sub-oscillator for fat bass feel
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Analog synth sweep sound
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, noteTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq / 2, noteTime); // Octave below

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, noteTime);
      filter.frequency.exponentialRampToValueAtTime(1600, noteTime + 0.05);
      filter.frequency.exponentialRampToValueAtTime(300, noteTime + 0.3);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(noteTime);
      osc2.start(noteTime);
      
      osc1.stop(noteTime + 0.38);
      osc2.stop(noteTime + 0.38);
    });

    // Deep synth drone at the end
    const droneTime = startTime + (notes.length * tempo);
    const droneNotes = [130.81, 164.81, 196.00]; // C3, E3, G3 (Major chord drone)

    droneNotes.forEach(freq => {
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, droneTime);

      sub.type = 'triangle';
      sub.frequency.setValueAtTime(freq / 2, droneTime); // Deep sub-bass

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, droneTime);
      filter.frequency.exponentialRampToValueAtTime(600, droneTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(150, droneTime + 2.0);

      gain.gain.setValueAtTime(0, droneTime);
      gain.gain.linearRampToValueAtTime(0.1, droneTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, droneTime + 2.2);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(droneTime);
      sub.start(droneTime);
      osc.stop(droneTime + 2.3);
      sub.stop(droneTime + 2.3);
    });

  } catch (e) {
    console.error('Failed to play victory sound:', e);
  }
}

/**
 * Play a quick retro-synth mechanical click when rotating a tile.
 */
export function playRotateSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {
    console.error('Failed to play rotate sound:', e);
  }
}

/**
 * Play a specific musical note based on the sequence index (Simon Says style).
 * Uses notes from the C-minor scale for that retro Stranger Things feel.
 */
export function playSequenceBeep(index) {
  try {
    const ctx = getAudioContext();
    // C minor scale notes: C4, D4, Eb4, F4, G4, Ab4, Bb4, C5, D5, Eb5
    const notes = [261.63, 293.66, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25, 587.33, 622.25];
    const freq = notes[index % notes.length];
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle'; // triangle wave gives a warmer, retro musical chime
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.error('Failed to play sequence beep:', e);
  }
}

/**
 * Play a deep, detuned buzzy error synth sweep when user fails the sequence.
 */
export function playErrorSound() {
  try {
    const ctx = getAudioContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator(); // Detuned helper oscillator for harshness
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(120, ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.45);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(123, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(61, ctx.currentTime + 0.45);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.5);
    osc2.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.error('Failed to play error sound:', e);
  }
}


