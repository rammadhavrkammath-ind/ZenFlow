package com.zenflow.patterns;

/**
 * STRATEGY IMPLEMENTATION: 4-7-8 Relaxing Breath (Dr. Andrew Weil / Yogic Pranayama)
 * Natural tranquilizer for the nervous system; stimulates vagus nerve.
 */
public class FourSevenEightStrategy implements BreathingStrategy {

    @Override
    public String getStrategyName() {
        return "4-7-8 Deep Relaxation";
    }

    @Override
    public int getInhaleSeconds() {
        return 4;
    }

    @Override
    public int getInhaleHoldSeconds() {
        return 7;
    }

    @Override
    public int getExhaleSeconds() {
        return 8;
    }

    @Override
    public int getExhaleHoldSeconds() {
        return 0;
    }

    @Override
    public String getPhysiologicalEffect() {
        return "Maximizes oxygen delivery in bloodstream, slows heart rate via vagus nerve, and promotes restorative sleep.";
    }
}
