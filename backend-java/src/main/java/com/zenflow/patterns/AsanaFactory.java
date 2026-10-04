package com.zenflow.patterns;

import com.zenflow.model.*;
import java.util.Arrays;
import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED DESIGN PATTERN: FACTORY PATTERN
 * 
 * Centralizes the creation of heterogeneous YogaAsana subclasses. Decouples
 * client code from concrete constructors (StandingAsana, BalancingAsana, etc.),
 * allowing instantiation using dynamic parameters and category classification.
 * ============================================================================
 */
public class AsanaFactory {

    /**
     * Factory method creating appropriate YogaAsana subclass based on category.
     */
    public static YogaAsana createAsana(String id, String englishName, String sanskritName,
                                        AsanaCategory category, DifficultyLevel difficulty,
                                        int durationSeconds, List<String> targetMuscles) {
        switch (category) {
            case STANDING:
                return new StandingAsana(id, englishName, sanskritName, difficulty, durationSeconds,
                        targetMuscles, 45.0, "Root both feet like an ancient banyan tree.");

            case BALANCING:
                return new BalancingAsana(id, englishName, sanskritName, difficulty, durationSeconds,
                        targetMuscles, "A fixed point on the horizon at eye level", 3);

            case INVERSION:
                return new InversionAsana(id, englishName, sanskritName, difficulty, durationSeconds,
                        targetMuscles, false, Arrays.asList("Uncontrolled hypertension", "Recent eye surgery", "Glaucoma"));

            case RESTORATIVE:
                return new RestorativeAsana(id, englishName, sanskritName, difficulty, durationSeconds,
                        targetMuscles, Arrays.asList("Yoga bolster", "Two cork blocks", "Warm blanket"), 0.95);

            case BACKBEND:
                return new BackbendAsana(id, englishName, sanskritName, difficulty, durationSeconds,
                        targetMuscles, 3, true);

            case SEATED:
            default:
                // Default standing/grounded posture
                return new StandingAsana(id, englishName, sanskritName, difficulty, durationSeconds,
                        targetMuscles, 30.0, "Sink sit bones evenly into the mat.");
        }
    }
}
