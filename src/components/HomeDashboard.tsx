"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Clock,
  Flame,
  Wind,
  Compass,
  Layers,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PREBUILT_ROUTINES } from "../data/routines";
import { POSES_DATA } from "../data/poses";
import { loadCustomRoutines } from "../lib/storage";
import { RoutineData } from "../types/yoga";

export const HomeDashboard: React.FC = () => {
  const [customRoutines, setCustomRoutines] = useState<RoutineData[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  useEffect(() => {
    setCustomRoutines(loadCustomRoutines());
  }, []);

  const allRoutines = [...customRoutines, ...PREBUILT_ROUTINES];

  const filteredRoutines = allRoutines.filter((r) => {
    if (selectedDifficulty === "ALL") return true;
    return r.difficulty === selectedDifficulty;
  });

  const getRoutineStats = (routine: RoutineData) => {
    const totalDuration = routine.poses.reduce((acc, item) => {
      const pose = POSES_DATA.find((p) => p.id === item.poseId);
      return acc + (item.customDuration || (pose ? pose.durationSeconds : 30));
    }, 0);

    const estCalories = Math.round(
      routine.poses.reduce((acc, item) => {
        const pose = POSES_DATA.find((p) => p.id === item.poseId);
        const dur = item.customDuration || (pose ? pose.durationSeconds : 30);
        const met = pose ? pose.metMultiplier : 3.0;
        return acc + ((met * 3.5 * 70) / 200) * (dur / 60);
      }, 0)
    );

    return {
      minutes: Math.max(1, Math.round(totalDuration / 60)),
      calories: estCalories,
      posesCount: routine.poses.length,
    };
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Ambient Blurred Light Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none -z-10 animate-float" />
      <div className="absolute top-60 right-10 w-96 h-96 rounded-full bg-teal-500/8 blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />

      {/* Hero Glass Panel */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 sm:p-14 border border-white/[0.1] shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-pill text-emerald-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>MINDFUL YOGA & BREATHWORK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Move with intention. <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
              Breathe with clarity.
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Real-time guided postures with acoustic bowl harmonics, hands-free voice coaching, and autonomic nervous system breath pacing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Link
              href="/practice/morning-sun"
              className="px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Begin Daily Flow (10m)</span>
            </Link>

            <Link
              href="/breathe"
              className="px-6 py-3.5 rounded-full glass-pill text-stone-200 font-medium text-xs uppercase tracking-wider flex items-center space-x-2 hover:text-white transition-all"
            >
              <Wind className="w-3.5 h-3.5 text-teal-300" />
              <span>Pranayama Studio</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Pillar Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/poses"
          className="group glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
              Asana Pose Guide
            </h3>
            <p className="text-xs text-stone-400 mt-1">17+ poses with alignment cues & joint axis</p>
          </div>
        </Link>

        <Link
          href="/breathe"
          className="group glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-teal-300 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
              Pranayama Studio
            </h3>
            <p className="text-xs text-stone-400 mt-1">Box breathing & 4-7-8 relaxation guide</p>
          </div>
        </Link>

        <Link
          href="/builder"
          className="group glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-sky-300 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">
              Flow Builder
            </h3>
            <p className="text-xs text-stone-400 mt-1">Craft & time your custom yoga sequence</p>
          </div>
        </Link>
      </div>

      {/* Curated Programs Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Curated Practice Flows
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              Structured sequences for morning vitality, desk decompression, and deep recovery.
            </p>
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex space-x-1.5 p-1 rounded-full glass-panel border border-white/[0.08]">
            {["ALL", "BEGINNER", "INTERMEDIATE"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? "bg-white/[0.1] text-emerald-300 border border-emerald-500/30"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {diff === "ALL" ? "All" : diff.charAt(0) + diff.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Routines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.map((routine) => {
            const stats = getRoutineStats(routine);
            return (
              <div
                key={routine.id}
                className="group glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase glass-pill text-emerald-300 border-emerald-500/20">
                      {routine.difficulty}
                    </span>

                    {routine.isCustom && (
                      <span className="px-2 py-0.5 rounded-md glass-pill text-teal-300 text-[10px] font-semibold">
                        Custom
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {routine.name}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {routine.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-stone-400 pt-3 border-t border-white/[0.06]">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{stats.minutes}m</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>{stats.posesCount} poses</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>~{stats.calories} kcal</span>
                    </span>
                  </div>
                </div>

                <Link
                  href={`/practice/${routine.id}`}
                  className="w-full py-3 px-4 rounded-full bg-white/[0.05] hover:bg-emerald-500 hover:text-stone-950 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 border border-white/[0.1] hover:border-emerald-400 transition-all hover:shadow-[0_0_20px_-3px_rgba(52,211,153,0.4)]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Practice</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
