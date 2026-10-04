package com.zenflow.model;

import java.util.Collections;
import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. INHERITANCE: Subclass of YogaAsana.
 * 2. POLYMORPHISM: Overrides methods with specialized inversion biomechanics.
 * 3. DEFENSIVE PROGRAMMING & ENCAPSULATION: Immutable contraindication safety lists.
 * ============================================================================
 */
public class InversionAsana extends YogaAsana {

    private boolean wallSupported;
    private List<String> contraindications;

    public InversionAsana(String id, String englishName, String sanskritName,
                          DifficultyLevel difficulty, int holdDurationSeconds,
                          List<String> targetMuscles, boolean wallSupported,
                          List<String> contraindications) {
        super(id, englishName, sanskritName, AsanaCategory.INVERSION, difficulty,
              holdDurationSeconds, targetMuscles, 639.0);
        this.wallSupported = wallSupported;
        this.contraindications = contraindications != null ? contraindications : Collections.emptyList();
    }

    @Override
    public double getMetMultiplier() {
        return 3.8 * getDifficulty().getIntensityFactor();
    }

    @Override
    public double calculateCalorieBurn(int durationSeconds) {
        double met = getMetMultiplier();
        return (met * 3.5 * 70.0 / 200.0) * (durationSeconds / 60.0);
    }

    @Override
    public String getAlignmentCues() {
        return "Keep neck neutral without rotating head. Push shoulders actively away from ears. " +
               (wallSupported ? "Position heels against the wall for stable support." : "Maintain strong hollow body core engagement.");
    }

    @Override
    public String getPrimaryBenefits() {
        return "Decompresses lumbar spine, increases venous return to the heart, and refreshes mental focus.";
    }

    public boolean isWallSupported() {
        return wallSupported;
    }

    public void setWallSupported(boolean wallSupported) {
        this.wallSupported = wallSupported;
    }

    public List<String> getContraindications() {
        return Collections.unmodifiableList(contraindications);
    }
}
