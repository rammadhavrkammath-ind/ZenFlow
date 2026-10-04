package com.zenflow.interfaces;

import com.zenflow.model.DifficultyLevel;

/**
 * OBJECT-ORIENTED CONCEPT: INTERFACE
 * 
 * Contract allowing routines or individual asanas to be dynamically
 * scaled up or down according to the yogi's experience level.
 */
public interface DifficultyAdjustable {

    /**
     * Scales durations, breath counts, and modifications based on target difficulty.
     * @param targetLevel Beginner, Intermediate, or Advanced
     */
    void scaleDifficulty(DifficultyLevel targetLevel);

    /**
     * Retrieves the current difficulty rating.
     */
    DifficultyLevel getDifficultyLevel();
}
