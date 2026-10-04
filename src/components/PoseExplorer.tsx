"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ChevronRight, Compass } from "lucide-react";
import { POSES_DATA } from "../data/poses";
import { PoseData } from "../types/yoga";
import { PoseIllustration } from "./PoseIllustration";

export const PoseExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [activePoseModal, setActivePoseModal] = useState<PoseData | null>(null);

  const categories = [
    { label: "All", value: "ALL" },
    { label: "Standing", value: "STANDING" },
    { label: "Balancing", value: "BALANCING" },
    { label: "Inversion", value: "INVERSION" },
    { label: "Backbend", value: "BACKBEND" },
    { label: "Restorative", value: "RESTORATIVE" },
  ];

  const filteredPoses = useMemo(() => {
    return POSES_DATA.filter((pose) => {
      const matchesSearch =
        pose.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pose.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pose.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pose.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === "ALL" || pose.category === selectedCategory;
      const matchesDiff = selectedDifficulty === "ALL" || pose.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-pill text-emerald-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>ASANA DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Movement Library
        </h1>
        <p className="text-stone-400 max-w-md mx-auto text-xs sm:text-sm">
          Crystal-clear alignment axes, joint placement, and anatomical focus.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Glass Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search postures, Sanskrit names, or target muscles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-card text-white text-xs placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2.5 rounded-2xl glass-card text-stone-300 text-xs focus:outline-hidden focus:border-emerald-500/40"
          >
            <option value="ALL" className="bg-[#0e141a]">All Levels</option>
            <option value="BEGINNER" className="bg-[#0e141a]">Beginner</option>
            <option value="INTERMEDIATE" className="bg-[#0e141a]">Intermediate</option>
            <option value="ADVANCED" className="bg-[#0e141a]">Advanced</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-white/[0.1] text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_-3px_rgba(52,211,153,0.2)]"
                    : "glass-pill text-stone-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Pose Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoses.map((pose) => (
          <div
            key={pose.id}
            onClick={() => setActivePoseModal(pose)}
            className="group cursor-pointer glass-card rounded-3xl p-5 flex flex-col justify-between"
          >
            <div>
              {/* Illustration Canvas */}
              <div className="h-44 w-full rounded-2xl glass-pill flex items-center justify-center p-3 mb-4 border border-white/[0.05]">
                <PoseIllustration category={pose.category} poseId={pose.id} />
              </div>

              {/* Category & Difficulty */}
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <span className="font-bold text-emerald-400 uppercase tracking-wider">
                  {pose.category}
                </span>
                <span className="px-2 py-0.5 rounded-md glass-pill text-stone-300">
                  {pose.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {pose.englishName}
              </h3>
              <p className="text-xs text-stone-400 font-serif italic mb-3">{pose.sanskritName}</p>

              {/* Benefit Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pose.benefits.map((b, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md glass-pill text-[10px] text-stone-300">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-stone-400">
              <span>Hold: {pose.durationSeconds}s</span>
              <span className="flex items-center space-x-1 text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
                <span>View Form</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pose Detail Modal (Crisp Form Alignment) */}
      {activePoseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-lg w-full p-6 space-y-4 border border-white/[0.1] shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  {activePoseModal.category} • {activePoseModal.difficulty}
                </span>
                <h3 className="text-xl font-bold text-white">{activePoseModal.englishName}</h3>
                <p className="text-xs text-stone-400 font-serif italic">{activePoseModal.sanskritName}</p>
              </div>
              <button
                onClick={() => setActivePoseModal(null)}
                className="p-1.5 rounded-full glass-pill text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Illustration */}
            <div className="h-44 w-full glass-pill rounded-2xl flex items-center justify-center p-3 border border-white/[0.05]">
              <PoseIllustration category={activePoseModal.category} poseId={activePoseModal.id} />
            </div>

            {/* 3 Form Checkpoints */}
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Form Checkpoints
                </h4>
                <ul className="space-y-2">
                  {activePoseModal.alignmentCues.map((cue, i) => (
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
                  {activePoseModal.targetMuscles.map((m, i) => (
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
                  {activePoseModal.benefits.map((b, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md glass-pill text-stone-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePoseModal(null)}
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
