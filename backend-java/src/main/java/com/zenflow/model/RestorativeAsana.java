package com.zenflow.model;

import java.util.Collections;
import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. INHERITANCE: Specializes YogaAsana for slow, restorative, parasympathetic recovery.
 * 2. POLYMORPHISM: Overrides calorie burn (low expenditure, high restorative value)
 *    and breathing cue.
 * ============================================================================
 */
public class RestorativeAsana extends YogaAsana {

    private List<String> recommendedProps;
    private double relaxationIndex; // 0.0 to 1.0

    public RestorativeAsana(String id, String englishName, String sanskritName,
                            DifficultyLevel difficulty, int holdDurationSeconds,
                            List<String> targetMuscles, List<String> recommendedProps,
                            double relaxationIndex) {
        super(id, englishName, sanskritName, AsanaCategory.RESTORATIVE, difficulty,
              holdDurationSeconds, targetMuscles, 396.0);
        this.recommendedProps = recommendedProps != null ? recommendedProps : Collections.emptyList();
        this.relaxationIndex = Math.max(0.0, Math.min(1.0, relaxationIndex));
    }

    @Override
    public double getMetMultiplier() {
        // Restorative poses emphasize stillness and autonomic nervous system regulation
        return 1.8;
    }

    @Override
    public double calculateCalorieBurn(int durationSeconds) {
        double met = getMetMultiplier();
        return (met * 3.5 * 70.0 / 200.0) * (durationSeconds / 60.0);
    }

    @Override
    public String getAlignmentCues() {
        return "Surrender all muscular tension. Let props carry your weight completely. Recommended props: " +
               String.join(", ", recommendedProps);
    }

    @Override
    public String getPrimaryBenefits() {
        return "Stimulates parasympathetic vagus nerve tone, lowers cortisol, and promotes cellular tissue release.";
    }

    @Override
    public String getBreathingCue() {
        return "Slow, oceanic exhalations. Allow each breath out to sink you deeper into gravity.";
    }

    public List<String> getRecommendedProps() {
        return Collections.unmodifiableList(recommendedProps);
    }

    public double getRelaxationIndex() {
        return relaxationIndex;
    }
}
