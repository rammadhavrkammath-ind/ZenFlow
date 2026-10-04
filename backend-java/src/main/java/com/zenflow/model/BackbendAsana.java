package com.zenflow.model;

import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. INHERITANCE: Specializes YogaAsana for thoracic extension and heart opening.
 * 2. POLYMORPHISM: Custom calorie calculation based on back extension demand.
 * ============================================================================
 */
public class BackbendAsana extends YogaAsana {

    private int spinalExtensionGrade; // 1 to 5
    private boolean requiresWarmup;

    public BackbendAsana(String id, String englishName, String sanskritName,
                         DifficultyLevel difficulty, int holdDurationSeconds,
                         List<String> targetMuscles, int spinalExtensionGrade,
                         boolean requiresWarmup) {
        super(id, englishName, sanskritName, AsanaCategory.BACKBEND, difficulty,
              holdDurationSeconds, targetMuscles, 528.0);
        this.spinalExtensionGrade = Math.max(1, Math.min(5, spinalExtensionGrade));
        this.requiresWarmup = requiresWarmup;
    }

    @Override
    public double getMetMultiplier() {
        return 3.2 + (spinalExtensionGrade * 0.3);
    }

    @Override
    public double calculateCalorieBurn(int durationSeconds) {
        double met = getMetMultiplier();
        return (met * 3.5 * 70.0 / 200.0) * (durationSeconds / 60.0);
    }

    @Override
    public String getAlignmentCues() {
        return "Broaden the collarbones and lift sternum skyward. Do not crunch into the lumbar spine; distribute the curve evenly across the thoracic spine.";
    }

    @Override
    public String getPrimaryBenefits() {
        return "Counters sedentary kyphosis, opens respiratory capacity in the ribs, and energizes the central nervous system.";
    }

    public int getSpinalExtensionGrade() {
        return spinalExtensionGrade;
    }

    public boolean isRequiresWarmup() {
        return requiresWarmup;
    }
}
