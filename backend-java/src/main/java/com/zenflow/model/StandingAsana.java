package com.zenflow.model;

import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. INHERITANCE: Extends YogaAsana base class, inheriting core attributes.
 * 2. POLYMORPHISM (Method Overriding): Overrides abstract methods calculateCalorieBurn,
 *    getAlignmentCues, and getPrimaryBenefits with standing-specific implementations.
 * 3. SPECIALIZATION: Adds standing-specific fields (stanceWidthCm, groundingCues).
 * ============================================================================
 */
public class StandingAsana extends YogaAsana {

    private double stanceWidthCm;
    private String groundingCue;

    public StandingAsana(String id, String englishName, String sanskritName,
                         DifficultyLevel difficulty, int holdDurationSeconds,
                         List<String> targetMuscles, double stanceWidthCm, String groundingCue) {
        super(id, englishName, sanskritName, AsanaCategory.STANDING, difficulty,
              holdDurationSeconds, targetMuscles, 432.0);
        this.stanceWidthCm = stanceWidthCm;
        this.groundingCue = groundingCue;
    }

    // ========================================================================
    // RUNTIME POLYMORPHISM (@Override)
    // ========================================================================
    @Override
    public double getMetMultiplier() {
        // Standing poses have higher muscular activation and metabolic load
        return 3.5 * getDifficulty().getIntensityFactor();
    }

    @Override
    public double calculateCalorieBurn(int durationSeconds) {
        // Calorie burn formula based on MET score for standing postures
        // (MET * 3.5 * avg 70kg bodyweight / 200) * (duration / 60)
        double met = getMetMultiplier();
        return (met * 3.5 * 70.0 / 200.0) * (durationSeconds / 60.0);
    }

    @Override
    public String getAlignmentCues() {
        return "Press firmly through the four corners of both feet. Stance: " + stanceWidthCm + 
               "cm. Engage quadriceps, draw tailbone down, and root: " + groundingCue;
    }

    @Override
    public String getPrimaryBenefits() {
        return "Builds foundational leg strength, ankle stability, postural alignment, and earth grounding.";
    }

    public double getStanceWidthCm() {
        return stanceWidthCm;
    }

    public void setStanceWidthCm(double stanceWidthCm) {
        this.stanceWidthCm = stanceWidthCm;
    }

    public String getGroundingCue() {
        return groundingCue;
    }

    public void setGroundingCue(String groundingCue) {
        this.groundingCue = groundingCue;
    }
}
