import { BaseAsana } from "./BaseAsana";
import { PoseData } from "../types/yoga";

/**
 * OBJECT-ORIENTED CONCEPT: INHERITANCE & POLYMORPHISM
 */
export class BalancingAsana extends BaseAsana {
  private _drishtiPoint: string;

  constructor(data: PoseData, drishtiPoint: string = "A still point on the horizon") {
    super(data);
    this._drishtiPoint = drishtiPoint;
  }

  public override getMetScore(): number {
    return 4.2;
  }

  public override calculateCalories(durationSeconds: number): number {
    const met = this.getMetScore();
    return (met * 3.5 * 70) / 200 * (durationSeconds / 60);
  }

  public get drishtiPoint(): string {
    return this._drishtiPoint;
  }
}

export class InversionAsana extends BaseAsana {
  private _wallSupported: boolean;

  constructor(data: PoseData, wallSupported: boolean = false) {
    super(data);
    this._wallSupported = wallSupported;
  }

  public override getMetScore(): number {
    return 4.0;
  }

  public override calculateCalories(durationSeconds: number): number {
    const met = this.getMetScore();
    return (met * 3.5 * 70) / 200 * (durationSeconds / 60);
  }

  public get wallSupported(): boolean {
    return this._wallSupported;
  }
}

export class RestorativeAsana extends BaseAsana {
  private _relaxationIndex: number;

  constructor(data: PoseData, relaxationIndex: number = 0.9) {
    super(data);
    this._relaxationIndex = relaxationIndex;
  }

  public override getMetScore(): number {
    return 1.8;
  }

  public override calculateCalories(durationSeconds: number): number {
    const met = this.getMetScore();
    return (met * 3.5 * 70) / 200 * (durationSeconds / 60);
  }

  public get relaxationIndex(): number {
    return this._relaxationIndex;
  }
}
