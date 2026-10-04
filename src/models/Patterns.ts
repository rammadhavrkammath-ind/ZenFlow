import { BaseAsana } from "./BaseAsana";
import { StandingAsana } from "./StandingAsana";
import { BalancingAsana, InversionAsana, RestorativeAsana } from "./SpecializedAsanas";
import { PoseData, RoutineData, DifficultyLevel } from "../types/yoga";

/**
 * OBJECT-ORIENTED DESIGN PATTERN: FACTORY PATTERN
 */
export class AsanaFactory {
  public static create(data: PoseData): BaseAsana {
    switch (data.category) {
      case "STANDING":
        return new StandingAsana(data);
      case "BALANCING":
        return new BalancingAsana(data);
      case "INVERSION":
        return new InversionAsana(data);
      case "RESTORATIVE":
        return new RestorativeAsana(data);
      default:
        return new StandingAsana(data);
    }
  }
}

/**
 * OBJECT-ORIENTED DESIGN PATTERN: BUILDER PATTERN
 */
export class RoutineBuilder {
  private _routine: RoutineData;

  constructor(name: string = "Custom Flow") {
    this._routine = {
      id: "routine-" + Math.random().toString(36).substring(2, 9),
      name,
      description: "Custom crafted yoga practice",
      difficulty: "BEGINNER",
      poses: [],
      restBetweenPoses: 5,
      isCustom: true,
    };
  }

  public setDescription(desc: string): this {
    this._routine.description = desc;
    return this;
  }

  public setDifficulty(level: DifficultyLevel): this {
    this._routine.difficulty = level;
    return this;
  }

  public setRestBetweenPoses(seconds: number): this {
    this._routine.restBetweenPoses = Math.max(0, seconds);
    return this;
  }

  public addPose(poseId: string, customDuration?: number): this {
    this._routine.poses.push({ poseId, customDuration });
    return this;
  }

  public build(): RoutineData {
    if (this._routine.poses.length === 0) {
      throw new Error("Cannot build routine with zero poses");
    }
    return { ...this._routine, poses: [...this._routine.poses] };
  }
}
