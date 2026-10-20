type Beep = {
  freq: number;
  dur: number;
  gain?: number;
  type?: OscillatorType;
};

let ctx: AudioContext | null = null;
let muted = false;

function audio(): AudioContext | null {
  if (muted || typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function setMuted(next: boolean) {
  muted = next;
  if (next) {
    ctx?.suspend().catch(() => undefined);
  } else {
    ctx?.resume().catch(() => undefined);
  }
}

export function isMuted() {
  return muted;
}

function tone({ freq, dur, gain = 0.05, type = "sine" }: Beep) {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.value = gain;
  amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  osc.connect(amp);
  amp.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + dur);
}

export function sfx(kind: "fire" | "chip" | "hit" | "miss" | "win" | "lose") {
  switch (kind) {
    case "fire":
      tone({ freq: 420, dur: 0.12, type: "triangle" });
      break;
    case "chip":
      tone({ freq: 180, dur: 0.07, type: "square", gain: 0.03 });
      break;
    case "hit":
      tone({ freq: 240, dur: 0.16, type: "sawtooth", gain: 0.06 });
      tone({ freq: 520, dur: 0.2, type: "sine", gain: 0.04 });
      break;
    case "miss":
      tone({ freq: 110, dur: 0.18, type: "sine", gain: 0.04 });
      break;
    case "win":
      tone({ freq: 523, dur: 0.18 });
      setTimeout(() => tone({ freq: 659, dur: 0.18 }), 90);
      setTimeout(() => tone({ freq: 784, dur: 0.28 }), 180);
      break;
    case "lose":
      tone({ freq: 196, dur: 0.28, type: "triangle" });
      setTimeout(() => tone({ freq: 147, dur: 0.35, type: "triangle" }), 120);
      break;
    default: {
      const neverKind: never = kind;
      throw new Error(`Unhandled sfx ${neverKind}`);
    }
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
