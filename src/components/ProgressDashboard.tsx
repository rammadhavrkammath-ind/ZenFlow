"use client";

import React, { useState, useEffect } from "react";
import { Flame, Clock, Award, Calendar, Sparkles, Trophy, Trash2, Compass, BarChart2 } from "lucide-react";
import { loadUserStats } from "../lib/storage";
import { UserStats } from "../types/yoga";

export const ProgressDashboard: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    totalMinutes: 0,
    completedSessions: 0,
    currentStreak: 0,
    lastPracticeDate: null,
    unlockedBadges: [],
    history: [],
  });

  useEffect(() => {
    setStats(loadUserStats());
  }, []);

  const badgeDefinitions = [
    {
      id: "first_flow",
      name: "First Breath",
      description: "Completed your first practice session.",
      icon: Sparkles,
    },
    {
      id: "three_day_streak",
      name: "3-Day Consistency",
      description: "Maintained a 3-day continuous practice.",
      icon: Flame,
    },
    {
      id: "week_yogi",
      name: "7-Day Dedication",
      description: "7 consecutive days on the mat.",
      icon: Compass,
    },
    {
      id: "hour_zen",
      name: "Hour of Presence",
      description: "Accumulated 60+ minutes of practice.",
      icon: Clock,
    },
    {
      id: "master_yogi",
      name: "Devoted Practitioner",
      description: "Accumulated 300+ minutes of practice.",
      icon: Award,
    },
  ];

  const handleReset = () => {
    if (confirm("Reset practice history and statistics?")) {
      localStorage.removeItem("zenflow_user_stats");
      setStats(loadUserStats());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-pill text-emerald-300 text-xs font-semibold">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>PRACTICE JOURNEY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Consistency & Growth
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm">
            Tracking your practice regularity, total mat time, and milestones.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-stone-500 hover:text-rose-400 flex items-center space-x-1.5 glass-pill px-3 py-1.5 rounded-xl transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reset Stats</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-3xl p-6 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5 fill-amber-400/20" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {stats.currentStreak}
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Day Streak</div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {stats.totalMinutes}
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Minutes Practiced</div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-teal-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {stats.completedSessions}
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Completed Flows</div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-sky-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {stats.unlockedBadges.length}/{badgeDefinitions.length}
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Milestones</div>
          </div>
        </div>
      </div>

      {/* Milestone Badges */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-white/[0.08]">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Milestone Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badgeDefinitions.map((b) => {
            const Icon = b.icon;
            const isUnlocked = stats.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? "glass-card border-emerald-500/40 shadow-[0_0_20px_-5px_rgba(52,211,153,0.15)]"
                    : "glass-pill border-white/[0.05] opacity-40 grayscale"
                }`}
              >
                <div className="p-2.5 rounded-xl glass-pill text-emerald-300 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>{b.name}</span>
                    {isUnlocked && <span className="text-[9px] text-emerald-400 font-bold uppercase">Earned</span>}
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice Log */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-white/[0.08]">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-teal-400" />
          <span>Recent Sessions</span>
        </h2>

        {stats.history.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-xs">
            No completed sessions recorded yet. Start your first practice flow today.
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
            {stats.history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl glass-card text-xs border border-white/[0.05]"
              >
                <div>
                  <div className="font-bold text-white">{item.routineName}</div>
                  <div className="text-[10px] text-stone-400">
                    {new Date(item.completedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {item.posesCount} Poses
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-400">
                    {Math.max(1, Math.round(item.durationSeconds / 60))}m
                  </div>
                  <div className="text-[10px] text-stone-500">~{item.caloriesBurned} kcal</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
