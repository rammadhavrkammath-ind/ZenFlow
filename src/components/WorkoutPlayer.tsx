"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Plus,
  Info,
  ArrowLeft,
  Flame,
  Award,
  Clock,
  Sparkles,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { RoutineData, PoseData } from "../types/yoga";
import { POSES_DATA } from "../data/poses";
import { playTibetanBowlChime, playTickChime, speakVoiceCue } from "../lib/audio";
import { saveWorkoutSession, loadSettings, AppSettings } from "../lib/storage";
import { PoseIllustration } from "./PoseIllustration";

interface Props {
  routine: RoutineData;
}

type Phase = "PREPARE" | "ACTIVE" | "REST" | "COMPLETED";

export const WorkoutPlayer: React.FC<Props> = ({ routine }) => {
  const posesSequence = useMemo(() => {
    return routine.poses
      .map((item) => {
        const poseObj = POSES_DATA.find((p) => p.id === item.poseId);
        if (!poseObj) return null;
        return {
          ...poseObj,
          durationSeconds: item.customDuration || poseObj.durationSeconds,
        };
      })
      .filter((p): p is PoseData => p !== null);
  }, [routine]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("PREPARE");
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPoseModal, setShowPoseModal] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({ soundEnabled: true, voiceEnabled: true });
  const [breathPhase, setBreathPhase] = useState<"INHALE" | "HOLD" | "EXHALE">("INHALE");
  const [totalSecondsExpended, setTotalSecondsExpended] = useState(0);

  const activePose = posesSequence[currentIndex] || POSES_DATA[0];
  const currentTotalDuration =
    phase === "PREPARE"
      ? 5
      : phase === "REST"
      ? routine.restBetweenPoses
      : activePose.durationSeconds;

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    if (phase === "ACTIVE" && activePose) {
      if (settings.soundEnabled) {
        playTibetanBowlChime(activePose.chimeFrequencyHz, 3.5);
      }
      if (settings.voiceEnabled) {
        speakVoiceCue(
          `${activePose.englishName}. ${activePose.alignmentCues[0]}`,
          true
        );
      }
    } else if (phase === "REST") {
      if (settings.soundEnabled) {
        playTickChime(false);
      }
      if (settings.voiceEnabled && posesSequence[currentIndex + 1]) {
        speakVoiceCue(`Rest. Next is ${posesSequence[currentIndex + 1].englishName}`, true);
      }
    } else if (phase === "COMPLETED") {
      if (settings.soundEnabled) {
        playTibetanBowlChime(528, 5.0);
      }
      if (settings.voiceEnabled) {
        speakVoiceCue("Practice complete. Well done.", true);
      }
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#34d399", "#2dd4bf", "#38bdf8", "#fbbf24"],
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }

      const totalCalories = posesSequence.reduce((acc, p) => {
        return acc + ((p.metMultiplier * 3.5 * 70) / 200) * (p.durationSeconds / 60);
      }, 0);

      saveWorkoutSession({
        routineId: routine.id,
        routineName: routine.name,
        durationSeconds: Math.max(totalSecondsExpended, 60),
        caloriesBurned: Math.round(totalCalories * 10) / 10,
        posesCount: posesSequence.length,
      });
    }
  }, [phase, currentIndex]);

  useEffect(() => {
    if (!isPlaying || phase === "COMPLETED") return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phase === "PREPARE") {
            setPhase("ACTIVE");
            return activePose.durationSeconds;
          } else if (phase === "ACTIVE") {
            setTotalSecondsExpended((tot) => tot + activePose.durationSeconds);
            if (currentIndex < posesSequence.length - 1) {
              if (routine.restBetweenPoses > 0) {
                setPhase("REST");
                return routine.restBetweenPoses;
              } else {
                setCurrentIndex((idx) => idx + 1);
                return posesSequence[currentIndex + 1].durationSeconds;
              }
            } else {
              setPhase("COMPLETED");
              return 0;
            }
          } else if (phase === "REST") {
            setCurrentIndex((idx) => idx + 1);
            setPhase("ACTIVE");
            return posesSequence[currentIndex + 1].durationSeconds;
          }
          return 0;
        }

        if (prev <= 4 && prev > 1 && settings.soundEnabled) {
          playTickChime(prev === 2);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, phase, currentIndex, activePose, posesSequence, routine.restBetweenPoses, settings.soundEnabled]);

  useEffect(() => {
    if (phase !== "ACTIVE" || !isPlaying) return;

    const breathCycle = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === "INHALE") return "HOLD";
        if (prev === "HOLD") return "EXHALE";
        return "INHALE";
      });
    }, 4000);

    return () => clearInterval(breathCycle);
  }, [phase, isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    if (currentIndex < posesSequence.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setPhase("ACTIVE");
      setSecondsLeft(posesSequence[currentIndex + 1].durationSeconds);
    } else {
      setPhase("COMPLETED");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setPhase("ACTIVE");
      setSecondsLeft(posesSequence[currentIndex - 1].durationSeconds);
    } else {
      setSecondsLeft(activePose.durationSeconds);
    }
  };

  const handleAdd15s = () => {
    if (phase === "ACTIVE") {
      setSecondsLeft((s) => s + 15);
    }
  };

  const restartWorkout = () => {
    setCurrentIndex(0);
    setPhase("PREPARE");
    setSecondsLeft(5);
    setIsPlaying(true);
    setTotalSecondsExpended(0);
  };

  const progressRatio = Math.max(0, Math.min(1, secondsLeft / currentTotalDuration));
  const circleRadius = 105;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const overallPct = Math.round(((currentIndex + (phase === "COMPLETED" ? 1 : 0)) / posesSequence.length) * 100);

  // --------------------------------------------------------------------------
  // COMPLETED SCREEN (Glassy, Zero Emojis)
  // --------------------------------------------------------------------------
  if (phase === "COMPLETED") {
    const estCalories = Math.round(
      posesSequence.reduce((acc, p) => acc + ((p.metMultiplier * 3.5 * 70) / 200) * (p.durationSeconds / 60), 0)
    );

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl glass-pill mx-auto flex items-center justify-center text-emerald-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Practice Complete
            </h2>
            <p className="text-stone-400 text-xs">
              Mind and body aligned. Take this clarity into the rest of your day.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/[0.08]">
            <div className="p-3 glass-pill rounded-2xl">
              <Clock className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">
                {Math.max(1, Math.round(totalSecondsExpended / 60))}
              </div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Minutes</div>
            </div>

            <div className="p-3 glass-pill rounded-2xl">
              <Award className="w-4 h-4 text-teal-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">
                {posesSequence.length}
              </div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Poses</div>
            </div>

            <div className="p-3 glass-pill rounded-2xl">
              <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">
                ~{estCalories}
              </div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">kcal</div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={restartWorkout}
              className="w-full py-3.5 px-6 rounded-full bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_0_25px_-5px_rgba(52,211,153,0.4)]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Again</span>
            </button>

            <Link
              href="/"
              className="block w-full py-3 px-6 rounded-full glass-pill text-stone-300 font-medium text-xs uppercase tracking-wider hover:text-white transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // ACTIVE WORKOUT PLAYER (Glassy HUD)
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-medium text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit</span>
        </Link>

        <div className="text-center">
          <h1 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
            {routine.name}
          </h1>
          <p className="text-[11px] text-stone-500">
            Pose {currentIndex + 1} of {posesSequence.length} ({overallPct}%)
          </p>
        </div>

        <button
          onClick={() => setShowPoseModal(true)}
          className="p-2 rounded-xl glass-pill text-stone-400 hover:text-white transition-colors"
          title="Pose Instructions"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Thin Glassy Progress Bar */}
      <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden border border-white/[0.05]">
        <div
          className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full transition-all duration-700 rounded-full"
          style={{ width: `${overallPct}%` }}
        />
      </div>

      {/* Main Glass Panel */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 border border-white/[0.08]">
        {/* Left: Animated Glowing Circular Timer */}
        <div className="relative flex flex-col items-center justify-center shrink-0">
          <svg className="w-60 h-60 -rotate-90 transform" viewBox="0 0 240 240">
            <circle
              cx="120"
              cy="120"
              r={circleRadius}
              className="stroke-white/[0.06] fill-none"
              strokeWidth="10"
            />
            <circle
              cx="120"
              cy="120"
              r={circleRadius}
              className={`fill-none transition-all duration-1000 ease-linear ${
                phase === "PREPARE"
                  ? "stroke-amber-400"
                  : phase === "REST"
                  ? "stroke-sky-400"
                  : "stroke-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
              }`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Countdown */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full glass-pill text-stone-300 mb-1">
              {phase === "PREPARE" ? "Get Ready" : phase === "REST" ? "Rest" : "Hold Asana"}
            </span>

            <span className="text-5xl font-black tracking-tight text-white font-mono">
              {secondsLeft}s
            </span>

            {phase === "ACTIVE" && (
              <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-stone-400">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-transform duration-700 ${
                    breathPhase === "INHALE"
                      ? "bg-teal-400 scale-150"
                      : breathPhase === "HOLD"
                      ? "bg-amber-400 scale-125"
                      : "bg-emerald-400 scale-100"
                  }`}
                />
                <span className="font-semibold uppercase tracking-wider text-stone-300">{breathPhase}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pose Diagram & Crisp Cues */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {activePose.category} • {activePose.difficulty}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activePose.englishName}
              </h2>
              <p className="text-xs text-stone-400 font-serif italic">
                {activePose.sanskritName}
              </p>
            </div>

            {phase === "ACTIVE" && (
              <button
                onClick={handleAdd15s}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl glass-pill text-stone-300 text-xs hover:text-white transition-colors"
                title="Extend pose hold by 15s"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+15s</span>
              </button>
            )}
          </div>

          {/* Refurbished Vector Silhouette Display */}
          <div className="h-44 w-full glass-card rounded-2xl flex items-center justify-center p-3 border border-white/[0.06]">
            <PoseIllustration category={activePose.category} poseId={activePose.id} />
          </div>

          {/* Crisp Alignment Checklist (No verbose text) */}
          <div className="glass-pill p-3.5 rounded-2xl border border-emerald-500/20 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Key Alignment
            </div>
            <p className="text-xs text-stone-300">
              {activePose.alignmentCues[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Glass Control Bar */}
      <div className="flex items-center justify-center space-x-4 py-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 && phase === "ACTIVE"}
          className="p-3.5 rounded-2xl glass-pill text-stone-400 hover:text-white disabled:opacity-30 transition-all active:scale-95"
          title="Previous Pose"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          className="p-5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-stone-950 shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)] transition-all hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
        </button>

        <button
          onClick={handleNext}
          className="p-3.5 rounded-2xl glass-pill text-stone-400 hover:text-white transition-all active:scale-95"
          title="Next / Skip"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Flow Sequence Horizon Strip */}
      <div className="glass-card rounded-2xl p-3.5 border border-white/[0.06]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2 px-1">
          Sequence Timeline ({posesSequence.length} Poses)
        </span>
        <div className="flex space-x-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {posesSequence.map((pose, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setPhase("ACTIVE");
                  setSecondsLeft(pose.durationSeconds);
                }}
                className={`cursor-pointer shrink-0 px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all ${
                  isCurrent
                    ? "bg-white/[0.1] border border-emerald-400 text-emerald-300 font-semibold"
                    : isDone
                    ? "glass-pill text-stone-500 line-through opacity-60"
                    : "glass-pill text-stone-400 hover:text-white"
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{pose.englishName}</span>
                <span className="text-[10px] text-stone-500">({pose.durationSeconds}s)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Modal (Zero Emojis, Crisp 3-Point Checklist) */}
      {showPoseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-lg w-full p-6 space-y-4 border border-white/[0.1] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{activePose.englishName}</h3>
                <p className="text-xs text-stone-400 font-serif italic">{activePose.sanskritName}</p>
              </div>
              <button
                onClick={() => setShowPoseModal(false)}
                className="p-1.5 rounded-full glass-pill text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Alignment Checkpoints
                </h4>
                <ul className="space-y-2">
                  {activePose.alignmentCues.map((cue, i) => (
                    <li key={i} className="p-2.5 rounded-xl glass-pill text-stone-300 leading-relaxed">
                      {cue}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-teal-400 mb-1.5">
                  Target Muscles
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activePose.targetMuscles.map((m, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md glass-pill text-teal-300">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  Benefits
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activePose.benefits.map((b, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md glass-pill text-stone-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPoseModal(false)}
              className="w-full py-2.5 rounded-full bg-white/[0.1] hover:bg-white/[0.15] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
