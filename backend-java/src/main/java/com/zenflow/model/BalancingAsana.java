package com.zenflow.model;

import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. INHERITANCE: Inherits from YogaAsana.
 * 2. POLYMORPHISM: Overrides calorie burn, alignment cues, and audio voice instruction.
 * 3. ENCAPSULATION: Encapsulates drishti gaze focus point and stability challenge rating.
 * ============================================================================
 */
public class BalancingAsana extends YogaAsana {

    private String drishtiPoint;
    private int stabilityRating; // 1 (gentle) to 5 (high instability)

    public BalancingAsana(String id, String englishName, String sanskritName,
                          DifficultyLevel difficulty, int holdDurationSeconds,
                          List<String> targetMuscles, String drishtiPoint, int stabilityRating) {
        super(id, englishName, sanskritName, AsanaCategory.BALANCING, difficulty,
              holdDurationSeconds, targetMuscles, 528.0);
        this.drishtiPoint = drishtiPoint;
        this.stabilityRating = Math.max(1, Math.min(5, stabilityRating));
    }

    @Override
    public double getMetMultiplier() {
        // High neuromuscular stabilizing muscle recruitment
        return 4.0 + (stabilityRating * 0.4);
    }

    @Override
    public double calculateCalorieBurn(int durationSeconds) {
        double met = getMetMultiplier();
        return (met * 3.5 * 70.0 / 200.0) * (durationSeconds / 60.0);
    }

    @Override
    public String getAlignmentCues() {
        return "Fix your gaze (Drishti) on " + drishtiPoint + 
               ". Engage deep core stabilizers (Mula Bandha) and keep breath fluid.";
    }

    @Override
    public String getPrimaryBenefits() {
        return "Enhances proprioception, concentration, cerebellar balance, and ankle tendon resilience.";
    }

    @Override
    public String getVoiceInstruction() {
        return "Find your balance in " + getEnglishName() + ". Steady your Drishti gaze on " + drishtiPoint + ".";
    }

    public String getDrishtiPoint() {
        return drishtiPoint;
    }

    public void setDrishtiPoint(String drishtiPoint) {
        this.drishtiPoint = drishtiPoint;
    }

    public int getStabilityRating() {
        return stabilityRating;
    }

    public void setStabilityRating(int stabilityRating) {
        this.stabilityRating = Math.max(1, Math.min(5, stabilityRating));
    }
}
