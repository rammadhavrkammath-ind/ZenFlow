import { BaseAsana } from "./BaseAsana";
import { PoseData } from "../types/yoga";

/**
 * OBJECT-ORIENTED CONCEPT: INHERITANCE & POLYMORPHISM
 * Extends BaseAsana and overrides calculateCalories and getMetScore.
 */
export class StandingAsana extends BaseAsana {
  private _stanceWidthCm: number;

  constructor(data: PoseData, stanceWidthCm: number = 45) {
    super(data);
    this._stanceWidthCm = stanceWidthCm;
  }

  public override getMetScore(): number {
    const factor = this.difficulty === "ADVANCED" ? 2.0 : this.difficulty === "INTERMEDIATE" ? 1.5 : 1.0;
    return 3.5 * factor;
  }

  public override calculateCalories(durationSeconds: number): number {
    const met = this.getMetScore();
    return (met * 3.5 * 70) / 200 * (durationSeconds / 60);
  }

  public get stanceWidthCm(): number {
    return this._stanceWidthCm;
  }
}
