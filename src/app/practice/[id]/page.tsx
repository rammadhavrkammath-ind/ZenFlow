"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "../../../components/Navbar";
import { WorkoutPlayer } from "../../../components/WorkoutPlayer";
import { PREBUILT_ROUTINES } from "../../../data/routines";
import { loadCustomRoutines } from "../../../lib/storage";
import { RoutineData } from "../../../types/yoga";

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [routine, setRoutine] = useState<RoutineData | null>(null);

  useEffect(() => {
    const foundPrebuilt = PREBUILT_ROUTINES.find((r) => r.id === id);
    if (foundPrebuilt) {
      setRoutine(foundPrebuilt);
      return;
    }

    const custom = loadCustomRoutines();
    const foundCustom = custom.find((r) => r.id === id);
    if (foundCustom) {
      setRoutine(foundCustom);
      return;
    }

    setRoutine(PREBUILT_ROUTINES[0]);
  }, [id]);

  if (!routine) {
    return (
      <div className="min-h-screen bg-[#070a0d] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a0d] text-stone-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main className="flex-1 py-4">
        <WorkoutPlayer routine={routine} />
      </main>
    </div>
  );
}
