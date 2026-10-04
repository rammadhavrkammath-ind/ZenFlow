import { AsanaCategory, DifficultyLevel, PoseData } from "../types/yoga";

/**
 * ============================================================================
 * OBJECT-ORIENTED CONCEPT: ABSTRACTION & ENCAPSULATION
 * 
 * BaseAsana abstract domain model.
 * Demonstrates Abstraction through abstract methods, and Encapsulation
 * through private fields with validated accessors.
 * ============================================================================
 */
export abstract class BaseAsana {
  private readonly _id: string;
  private _englishName: string;
  private _sanskritName: string;
  private _category: AsanaCategory;
  private _difficulty: DifficultyLevel;
  private _durationSeconds: number;
  private _targetMuscles: string[];
  private _alignmentCues: string[];
  private _benefits: string[];
  private _chimeFrequencyHz: number;

  constructor(data: PoseData) {
    this._id = data.id;
    this._englishName = data.englishName;
    this._sanskritName = data.sanskritName;
    this._category = data.category;
    this._difficulty = data.difficulty;
    this._durationSeconds = Math.max(5, data.durationSeconds);
    this._targetMuscles = data.targetMuscles || [];
    this._alignmentCues = data.alignmentCues || [];
    this._benefits = data.benefits || [];
    this._chimeFrequencyHz = data.chimeFrequencyHz || 432;
  }

  // ==========================================================================
  // ABSTRACT METHODS (ABSTRACTION): Implemented by specialized subclasses
  // ==========================================================================
  public abstract calculateCalories(durationSeconds: number): number;
  public abstract getMetScore(): number;

  // ==========================================================================
  // ENCAPSULATION: Getters and validated Setters
  // ==========================================================================
  public get id(): string {
    return this._id;
  }

  public get englishName(): string {
    return this._englishName;
  }

  public set englishName(val: string) {
    if (!val || val.trim().length === 0) {
      throw new Error("English name cannot be empty");
    }
    this._englishName = val;
  }

  public get sanskritName(): string {
    return this._sanskritName;
  }

  public get category(): AsanaCategory {
    return this._category;
  }

  public get difficulty(): DifficultyLevel {
    return this._difficulty;
  }

  public get durationSeconds(): number {
    return this._durationSeconds;
  }

  public set durationSeconds(seconds: number) {
    if (seconds < 5) throw new Error("Duration must be at least 5 seconds");
    this._durationSeconds = seconds;
  }

  public get targetMuscles(): string[] {
    return [...this._targetMuscles];
  }

  public get alignmentCues(): string[] {
    return [...this._alignmentCues];
  }

  public get benefits(): string[] {
    return [...this._benefits];
  }

  public get chimeFrequencyHz(): number {
    return this._chimeFrequencyHz;
  }

  public toJSON(): PoseData {
    return {
      id: this._id,
      englishName: this._englishName,
      sanskritName: this._sanskritName,
      category: this._category,
      difficulty: this._difficulty,
      durationSeconds: this._durationSeconds,
      targetMuscles: this.targetMuscles,
      alignmentCues: this.alignmentCues,
      benefits: this.benefits,
      chimeFrequencyHz: this._chimeFrequencyHz,
      metMultiplier: this.getMetScore(),
    };
  }
}
