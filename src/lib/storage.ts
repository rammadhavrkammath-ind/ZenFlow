import { RoutineData, UserStats, WorkoutSessionLog } from "../types/yoga";

const STORAGE_KEYS = {
  STATS: "zenflow_user_stats",
  CUSTOM_ROUTINES: "zenflow_custom_routines",
  SETTINGS: "zenflow_settings",
};

const DEFAULT_STATS: UserStats = {
  totalMinutes: 0,
  completedSessions: 0,
  currentStreak: 0,
  lastPracticeDate: null,
  unlockedBadges: [],
  history: [],
};

export interface AppSettings {
  soundEnabled: boolean;
  voiceEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  voiceEnabled: true,
};

export function loadUserStats(): UserStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveWorkoutSession(log: Omit<WorkoutSessionLog, "id" | "completedAt">): UserStats {
  const current = loadUserStats();
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  let streak = current.currentStreak;
  if (!current.lastPracticeDate) {
    streak = 1;
  } else {
    const lastDate = new Date(current.lastPracticeDate);
    const diffDays = Math.round((now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1; // streak reset
    }
  }

  const sessionDurationMinutes = Math.max(1, Math.round(log.durationSeconds / 60));
  const newTotalMinutes = current.totalMinutes + sessionDurationMinutes;
  const newCompletedSessions = current.completedSessions + 1;

  const newBadges = new Set(current.unlockedBadges);
  if (newCompletedSessions >= 1) newBadges.add("first_flow");
  if (streak >= 3) newBadges.add("three_day_streak");
  if (streak >= 7) newBadges.add("week_yogi");
  if (newTotalMinutes >= 60) newBadges.add("hour_zen");
  if (newTotalMinutes >= 300) newBadges.add("master_yogi");

  const newLog: WorkoutSessionLog = {
    ...log,
    id: "session-" + Math.random().toString(36).substring(2, 9),
    completedAt: now.toISOString(),
  };

  const updatedStats: UserStats = {
    totalMinutes: newTotalMinutes,
    completedSessions: newCompletedSessions,
    currentStreak: streak,
    lastPracticeDate: todayStr,
    unlockedBadges: Array.from(newBadges),
    history: [newLog, ...current.history].slice(0, 30), // keep last 30
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
    } catch (e) {
      console.error("Failed to save stats", e);
    }
  }

  return updatedStats;
}

export function loadCustomRoutines(): RoutineData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_ROUTINES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomRoutine(routine: RoutineData): void {
  if (typeof window === "undefined") return;
  const existing = loadCustomRoutines();
  const updated = [routine, ...existing.filter((r) => r.id !== routine.id)];
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ROUTINES, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save custom routine", e);
  }
}

export function deleteCustomRoutine(routineId: string): void {
  if (typeof window === "undefined") return;
  const existing = loadCustomRoutines();
  const updated = existing.filter((r) => r.id !== routineId);
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ROUTINES, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to delete custom routine", e);
  }
}

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings", e);
  }
}
