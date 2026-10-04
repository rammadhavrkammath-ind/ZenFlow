package com.zenflow.model;

/**
 * ENUM: Difficulty levels for yoga postures and routines.
 */
public enum DifficultyLevel {
    BEGINNER("Beginner", 1.0),
    INTERMEDIATE("Intermediate", 1.5),
    ADVANCED("Advanced", 2.0);

    private final String label;
    private final double intensityFactor;

    DifficultyLevel(String label, double intensityFactor) {
        this.label = label;
        this.intensityFactor = intensityFactor;
    }

    public String getLabel() {
        return label;
    }

    public double getIntensityFactor() {
        return intensityFactor;
    }
}
