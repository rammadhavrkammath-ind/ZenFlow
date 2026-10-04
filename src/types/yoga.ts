export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type AsanaCategory =
  | "STANDING"
  | "BALANCING"
  | "INVERSION"
  | "BACKBEND"
  | "SEATED"
  | "RESTORATIVE";

export interface PoseData {
  id: string;
  englishName: string;
  sanskritName: string;
  category: AsanaCategory;
  difficulty: DifficultyLevel;
  durationSeconds: number;
  targetMuscles: string[];
  alignmentCues: string[];
  benefits: string[];
  chimeFrequencyHz: number;
  contraindications?: string[];
  metMultiplier: number;
  drishtiPoint?: string;
  recommendedProps?: string[];
}

export interface RoutineData {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  poses: {
    poseId: string;
    customDuration?: number;
  }[];
  restBetweenPoses: number;
  isCustom?: boolean;
}

export interface BreathingStrategyData {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  effect: string;
}

export interface WorkoutSessionLog {
  id: string;
  routineId: string;
  routineName: string;
  completedAt: string;
  durationSeconds: number;
  caloriesBurned: number;
  posesCount: number;
}

export interface UserStats {
  totalMinutes: number;
  completedSessions: number;
  currentStreak: number;
  lastPracticeDate: string | null;
  unlockedBadges: string[];
  history: WorkoutSessionLog[];
}
