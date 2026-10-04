package com.zenflow.patterns;

/**
 * STRATEGY IMPLEMENTATION: Box Breathing (Sama Vritti Pranayama 4-4-4-4)
 * Balances sympathetic and parasympathetic nervous systems.
 */
public class BoxBreathingStrategy implements BreathingStrategy {

    @Override
    public String getStrategyName() {
        return "Box Breathing (4-4-4-4)";
    }

    @Override
    public int getInhaleSeconds() {
        return 4;
    }

    @Override
    public int getInhaleHoldSeconds() {
        return 4;
    }

    @Override
    public int getExhaleSeconds() {
        return 4;
    }

    @Override
    public int getExhaleHoldSeconds() {
        return 4;
    }

    @Override
    public String getPhysiologicalEffect() {
        return "Reduces physiological arousal, resets amygdala stress response, and sharpens tactical clarity.";
    }
}
