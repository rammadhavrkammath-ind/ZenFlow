/**
 * ZenFlow Audio & Voice Engine
 * 
 * Uses Web Audio API for zero-latency, offline-capable Tibetan singing bowl synthesis
 * and the Web Speech API for hands-free voice coach guidance.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes an authentic Tibetan singing bowl chime with rich acoustic overtones.
 */
export function playTibetanBowlChime(frequency: number = 432, durationSeconds: number = 3.5): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.08); // Gentle bell attack
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds); // Long resonant decay
    masterGain.connect(ctx.destination);

    // Fundamental and resonant acoustic overtone multipliers
    const harmonics = [1.0, 1.51, 2.78, 4.02];
    const amplitudes = [0.6, 0.25, 0.1, 0.05];

    harmonics.forEach((multiplier, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency * multiplier, now);

      // Subtle vibrational modulation (binaural beating effect)
      if (i > 0) {
        osc.detune.setValueAtTime(i * 1.5, now);
      }

      gain.gain.setValueAtTime(amplitudes[i], now);
      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + durationSeconds);
    });
  } catch (e) {
    console.warn("Audio playback not allowed or failed:", e);
  }
}

/**
 * Short gentle tick chime for countdown (3, 2, 1)
 */
export function playTickChime(isFinal: boolean = false): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(isFinal ? 880 : 520, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isFinal ? 0.6 : 0.2));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + (isFinal ? 0.6 : 0.2));
  } catch (e) {
    console.warn("Tick audio error:", e);
  }
}

/**
 * Speaks a pose announcement hands-free using Web Speech API
 */
export function speakVoiceCue(text: string, voiceEnabled: boolean = true): void {
  if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92; // Calm, meditative pace
    utterance.pitch = 0.95; // Warm, grounded pitch
    utterance.volume = 0.85;

    // Look for calm, natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("Speech synthesis error:", e);
  }
}
