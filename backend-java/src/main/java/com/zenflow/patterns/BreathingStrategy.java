package com.zenflow.patterns;

/**
 * ============================================================================
 * OBJECT-ORIENTED DESIGN PATTERN: STRATEGY PATTERN
 * 
 * Defines a family of interchangeable breathing algorithms (Pranayama),
 * encapsulates each one, and makes them interchangeable at runtime.
 * The client (PranayamaStudio) can switch strategies dynamically without altering
 * its timer execution loop.
 * ============================================================================
 */
public interface BreathingStrategy {

    String getStrategyName();

    int getInhaleSeconds();

    int getInhaleHoldSeconds();

    int getExhaleSeconds();

    int getExhaleHoldSeconds();

    String getPhysiologicalEffect();

    default int getTotalCycleSeconds() {
        return getInhaleSeconds() + getInhaleHoldSeconds() + getExhaleSeconds() + getExhaleHoldSeconds();
    }
}
