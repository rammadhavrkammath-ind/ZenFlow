package com.zenflow.interfaces;

/**
 * OBJECT-ORIENTED CONCEPT: INTERFACE & POLYMORPHISM
 * 
 * Provides calorie calculation and intensity scoring metrics across diverse asanas.
 */
public interface PoseScorable {

    /**
     * Calculates estimated calories burned during the pose hold.
     * Implemented polymorphically by different pose subclasses.
     */
    double calculateCalorieBurn(int durationSeconds);

    /**
     * Metabolic Equivalent of Task (MET) score representing physical intensity.
     */
    double getMetMultiplier();
}
