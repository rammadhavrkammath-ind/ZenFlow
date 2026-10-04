import { BreathingStrategyData } from "../types/yoga";

export const BREATHING_PATTERNS: BreathingStrategyData[] = [
  {
    id: "box",
    name: "Box Breathing (Sama Vritti 4-4-4-4)",
    description: "Equal-sided tactical breath used by yogis and athletes to achieve immediate composure and steady the sympathetic fight-or-flight response.",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    effect: "Instant grounding, Amygdala regulation, sharp focused calm",
  },
  {
    id: "478",
    name: "4-7-8 Relaxing Breath",
    description: "Ancient yogic Pranayama (Pranayama Kumbhaka) popularized as a natural nervous system tranquilizer.",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    effect: "Promotes parasympathetic dominance, slows heart rate, relieves insomnia",
  },
  {
    id: "sama-vritti",
    name: "Equal Flow Breath (5-5)",
    description: "Simple, continuous harmonic breathing without breath retention, creating coherent heart rate variability (HRV).",
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    effect: "Optimal autonomic balance, lowered blood pressure, meditative flow",
  },
  {
    id: "energizing",
    name: "Awakening Breath (Prana Activation)",
    description: "Invigorating rhythmic breath designed to clear morning grogginess and expand lung capacity.",
    inhale: 4,
    hold1: 2,
    exhale: 3,
    hold2: 1,
    effect: "Elevates alertness, clears sinus passages, stimulates blood flow",
  },
];
