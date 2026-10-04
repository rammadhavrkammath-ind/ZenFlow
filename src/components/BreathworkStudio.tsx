"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Wind, Sparkles } from "lucide-react";
import { BREATHING_PATTERNS } from "../data/breathing";
import { BreathingStrategyData } from "../types/yoga";
import { playTibetanBowlChime } from "../lib/audio";
import { loadSettings } from "../lib/storage";

export const BreathworkStudio: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingStrategyData>(BREATHING_PATTERNS[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<"INHALE" | "HOLD_IN" | "EXHALE" | "HOLD_OUT">("INHALE");
  const [stepSecondsLeft, setStepSecondsLeft] = useState(selectedPattern.inhale);
  const [completedCycles, setCompletedCycles] = useState(0);

  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const s = loadSettings();
    setSoundEnabled(s.soundEnabled);
  }, []);

  const handleSelectPattern = (pattern: BreathingStrategyData) => {
    setSelectedPattern(pattern);
    setIsActive(false);
    setCurrentStep("INHALE");
    setStepSecondsLeft(pattern.inhale);
    setCompletedCycles(0);
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setStepSecondsLeft((prev) => {
        if (prev <= 1) {
          if (currentStep === "INHALE") {
            if (selectedPattern.hold1 > 0) {
              setCurrentStep("HOLD_IN");
              if (soundEnabled) playTibetanBowlChime(528, 2.0);
              return selectedPattern.hold1;
            } else {
              setCurrentStep("EXHALE");
              if (soundEnabled) playTibetanBowlChime(432, 2.0);
              return selectedPattern.exhale;
            }
          } else if (currentStep === "HOLD_IN") {
            setCurrentStep("EXHALE");
            if (soundEnabled) playTibetanBowlChime(432, 2.0);
            return selectedPattern.exhale;
          } else if (currentStep === "EXHALE") {
            if (selectedPattern.hold2 > 0) {
              setCurrentStep("HOLD_OUT");
              return selectedPattern.hold2;
            } else {
              setCompletedCycles((c) => c + 1);
              setCurrentStep("INHALE");
              if (soundEnabled) playTibetanBowlChime(528, 2.0);
              return selectedPattern.inhale;
            }
          } else if (currentStep === "HOLD_OUT") {
            setCompletedCycles((c) => c + 1);
            setCurrentStep("INHALE");
            if (soundEnabled) playTibetanBowlChime(528, 2.0);
            return selectedPattern.inhale;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentStep, selectedPattern, soundEnabled]);

  const toggleSession = () => {
    if (!isActive && soundEnabled) {
      playTibetanBowlChime(528, 3.0);
    }
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setCurrentStep("INHALE");
    setStepSecondsLeft(selectedPattern.inhale);
    setCompletedCycles(0);
  };

  const getOrbStateClass = () => {
    if (!isActive) return "scale-100 opacity-80 border-white/[0.15]";
    switch (currentStep) {
      case "INHALE":
        return "scale-135 bg-gradient-to-tr from-emerald-500/30 to-teal-400/40 border-emerald-400/50 shadow-[0_0_80px_10px_rgba(52,211,153,0.35)]";
      case "HOLD_IN":
        return "scale-135 bg-gradient-to-tr from-teal-500/30 to-emerald-400/40 border-teal-400/60 shadow-[0_0_90px_15px_rgba(20,184,166,0.4)]";
      case "EXHALE":
        return "scale-90 bg-gradient-to-tr from-sky-500/20 to-indigo-500/30 border-sky-400/40 shadow-[0_0_60px_5px_rgba(56,189,248,0.25)]";
      case "HOLD_OUT":
        return "scale-90 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-indigo-400/30 shadow-[0_0_40px_0px_rgba(99,102,241,0.2)]";
    }
  };

  const getStepLabel = () => {
    switch (currentStep) {
      case "INHALE":
        return "Inhale";
      case "HOLD_IN":
        return "Hold";
      case "EXHALE":
        return "Exhale";
      case "HOLD_OUT":
        return "Stillness";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-pill text-teal-300 text-xs font-semibold">
          <Wind className="w-3.5 h-3.5" />
          <span>PRANAYAMA STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Breath Regulation
        </h1>
        <p className="text-stone-400 max-w-md mx-auto text-xs sm:text-sm">
          Scientifically paced breath control to balance Heart Rate Variability and reset the nervous system.
        </p>
      </div>

      {/* Pattern Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BREATHING_PATTERNS.map((p) => {
          const isSelected = selectedPattern.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPattern(p)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-white/[0.08] border-teal-500/50 shadow-[0_0_20px_-3px_rgba(20,184,166,0.3)]"
                  : "glass-card hover:bg-white/[0.04]"
              }`}
            >
              <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-1">
                {p.inhale}-{p.hold1}-{p.exhale}-{p.hold2}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">{p.name}</div>
            </button>
          );
        })}
      </div>

      {/* Main Glass Breathwork Canvas */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-8 sm:p-14 flex flex-col items-center justify-center min-h-[440px] border border-white/[0.08]">
        {/* Soft Radial Ambient Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-96 h-96 rounded-full border border-teal-400/40 animate-ping duration-1000" />
          <div className="w-72 h-72 rounded-full border border-emerald-400/30" />
        </div>

        {/* Central Frosted Glass Breathing Orb */}
        <div className="relative flex items-center justify-center my-6">
          <div
            className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full flex flex-col items-center justify-center backdrop-blur-3xl border transition-all duration-[2200ms] ease-in-out ${getOrbStateClass()}`}
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-200">
              {isActive ? getStepLabel() : "Ready"}
            </span>
            <span className="text-6xl font-black tracking-tight text-white font-mono mt-1">
              {isActive ? `${stepSecondsLeft}s` : "Start"}
            </span>
            {isActive && (
              <span className="text-[11px] font-medium text-stone-300 mt-2 glass-pill px-2.5 py-0.5 rounded-full">
                Cycle {completedCycles + 1}
              </span>
            )}
          </div>
        </div>

        {/* Pattern Information */}
        <div className="max-w-md text-center space-y-1.5 mt-4">
          <h3 className="text-base font-bold text-white">{selectedPattern.name}</h3>
          <p className="text-xs text-stone-400">{selectedPattern.description}</p>
        </div>

        {/* Studio Controls */}
        <div className="flex items-center space-x-4 mt-8">
          <button
            onClick={resetSession}
            className="p-3.5 rounded-2xl glass-pill text-stone-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSession}
            className="py-3.5 px-8 rounded-full bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105 shadow-[0_0_25px_-5px_rgba(52,211,153,0.4)]"
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Begin Flow</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
