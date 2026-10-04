"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowUp, ArrowDown, Play, Save, Check, Layers } from "lucide-react";
import { POSES_DATA } from "../data/poses";
import { DifficultyLevel, RoutineData } from "../types/yoga";
import { saveCustomRoutine } from "../lib/storage";

export const RoutineBuilderView: React.FC = () => {
  const router = useRouter();

  const [routineName, setRoutineName] = useState("Custom Flow");
  const [description, setDescription] = useState("Personalized movement sequence");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("BEGINNER");
  const [restSeconds, setRestSeconds] = useState(5);

  const [selectedPoses, setSelectedPoses] = useState<{ poseId: string; customDuration: number }[]>([
    { poseId: "tadasana", customDuration: 30 },
    { poseId: "virabhadrasana-2", customDuration: 45 },
    { poseId: "trikonasana", customDuration: 40 },
    { poseId: "savasana", customDuration: 60 },
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddPose = (poseId: string) => {
    const pose = POSES_DATA.find((p) => p.id === poseId);
    setSelectedPoses((prev) => [
      ...prev,
      { poseId, customDuration: pose ? pose.durationSeconds : 30 },
    ]);
  };

  const handleRemovePose = (index: number) => {
    setSelectedPoses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setSelectedPoses((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= selectedPoses.length - 1) return;
    setSelectedPoses((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleDurationChange = (index: number, delta: number) => {
    setSelectedPoses((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const newDur = Math.max(10, Math.min(300, item.customDuration + delta));
        return { ...item, customDuration: newDur };
      })
    );
  };

  const totalDurationSeconds =
    selectedPoses.reduce((acc, p) => acc + p.customDuration, 0) +
    (selectedPoses.length > 1 ? (selectedPoses.length - 1) * restSeconds : 0);

  const handleSave = () => {
    if (selectedPoses.length === 0) return;
    const customRoutine: RoutineData = {
      id: "custom-" + Math.random().toString(36).substring(2, 9),
      name: routineName,
      description,
      difficulty,
      poses: selectedPoses,
      restBetweenPoses: restSeconds,
      isCustom: true,
    };
    saveCustomRoutine(customRoutine);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleStartNow = () => {
    if (selectedPoses.length === 0) return;
    const customRoutine: RoutineData = {
      id: "custom-" + Math.random().toString(36).substring(2, 9),
      name: routineName,
      description,
      difficulty,
      poses: selectedPoses,
      restBetweenPoses: restSeconds,
      isCustom: true,
    };
    saveCustomRoutine(customRoutine);
    router.push(`/practice/${customRoutine.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-pill text-sky-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>SEQUENCE DESIGNER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Flow Builder
        </h1>
        <p className="text-stone-400 max-w-md mx-auto text-xs sm:text-sm">
          Chain asanas, calibrate hold times, and save your personalized sequence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Sequence Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata Card */}
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  Flow Name
                </label>
                <input
                  type="text"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl glass-card text-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500/40"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full px-4 py-2 rounded-xl glass-card text-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500/40"
                >
                  <option value="BEGINNER" className="bg-[#0e141a]">Beginner</option>
                  <option value="INTERMEDIATE" className="bg-[#0e141a]">Intermediate</option>
                  <option value="ADVANCED" className="bg-[#0e141a]">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Rest Between Poses: {restSeconds} seconds
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={restSeconds}
                onChange={(e) => setRestSeconds(parseInt(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>

          {/* Sequence List */}
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Flow Order</h3>
                <p className="text-xs text-stone-400">
                  {selectedPoses.length} postures • ~{Math.round(totalDurationSeconds / 60)} minutes
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={selectedPoses.length === 0}
                  className="px-4 py-2 rounded-full glass-pill hover:bg-white/[0.1] text-stone-300 text-xs font-medium flex items-center space-x-1.5 transition-all disabled:opacity-40"
                >
                  {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{savedSuccess ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={handleStartNow}
                  disabled={selectedPoses.length === 0}
                  className="px-4 py-2 rounded-full bg-emerald-400 hover:bg-emerald-300 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_20px_-3px_rgba(52,211,153,0.4)] disabled:opacity-40"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start</span>
                </button>
              </div>
            </div>

            {selectedPoses.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-white/[0.1] rounded-2xl text-stone-500 text-xs">
                Sequence is empty. Tap any pose from the catalog to add it.
              </div>
            ) : (
              <div className="space-y-2">
                {selectedPoses.map((item, idx) => {
                  const pose = POSES_DATA.find((p) => p.id === item.poseId);
                  if (!pose) return null;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl glass-card text-xs border border-white/[0.06]"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-5 text-center font-mono text-[11px] font-bold text-stone-500">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white">{pose.englishName}</div>
                          <div className="text-[10px] text-stone-400 font-serif italic">{pose.sanskritName}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        {/* Duration Changer */}
                        <div className="flex items-center space-x-1 glass-pill px-2 py-0.5 rounded-lg">
                          <button
                            onClick={() => handleDurationChange(idx, -5)}
                            className="text-stone-400 hover:text-white px-1 font-bold"
                          >
                            -
                          </button>
                          <span className="font-mono text-white font-semibold w-8 text-center">
                            {item.customDuration}s
                          </span>
                          <button
                            onClick={() => handleDurationChange(idx, 5)}
                            className="text-stone-400 hover:text-white px-1 font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Reorder Buttons */}
                        <button
                          onClick={() => handleMoveUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded-md text-stone-400 hover:text-white disabled:opacity-20"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(idx)}
                          disabled={idx === selectedPoses.length - 1}
                          className="p-1 rounded-md text-stone-400 hover:text-white disabled:opacity-20"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleRemovePose(idx)}
                          className="p-1 rounded-md text-stone-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Add from Catalog */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/[0.08]">
          <div>
            <h3 className="text-sm font-bold text-white">Pose Catalog</h3>
            <p className="text-xs text-stone-400">Click (+) to append posture</p>
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
            {POSES_DATA.map((pose) => (
              <div
                key={pose.id}
                className="flex items-center justify-between p-2.5 rounded-xl glass-card border border-white/[0.05]"
              >
                <div>
                  <div className="text-xs font-bold text-white">{pose.englishName}</div>
                  <div className="text-[10px] text-stone-400">{pose.category} • {pose.durationSeconds}s</div>
                </div>

                <button
                  onClick={() => handleAddPose(pose.id)}
                  className="p-1.5 rounded-xl glass-pill text-emerald-400 hover:bg-white/[0.1] transition-colors"
                  title="Add to sequence"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
