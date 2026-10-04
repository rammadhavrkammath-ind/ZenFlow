package com.zenflow.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. COMPOSITION / AGGREGATION: A YogaRoutine HAS-A collection of YogaAsana instances.
 * 2. COMPILE-TIME POLYMORPHISM (Method Overloading): Overloaded constructors
 *    and overloaded addPose() methods with differing method signatures.
 * 3. RUNTIME POLYMORPHIC DISPATCH: Iterates through heterogeneous YogaAsana
 *    objects (StandingAsana, BalancingAsana, etc.) invoking polymorphic calculateCalorieBurn().
 * ============================================================================
 */
public class YogaRoutine {

    private final String id;
    private String name;
    private String description;
    private DifficultyLevel targetDifficulty;
    private final List<YogaAsana> poses;
    private int restBetweenPosesSeconds;

    // ========================================================================
    // COMPILE-TIME POLYMORPHISM (CONSTRUCTOR OVERLOADING)
    // ========================================================================

    /** Overloaded Constructor 1: Basic initialization */
    public YogaRoutine(String id, String name, DifficultyLevel targetDifficulty) {
        this(id, name, "Custom ZenFlow practice routine", targetDifficulty, new ArrayList<>(), 5);
    }

    /** Overloaded Constructor 2: Full initialization with pre-existing pose list */
    public YogaRoutine(String id, String name, String description,
                       DifficultyLevel targetDifficulty, List<YogaAsana> initialPoses,
                       int restBetweenPosesSeconds) {
        this.id = Objects.requireNonNull(id, "Routine ID cannot be null");
        this.name = Objects.requireNonNull(name, "Routine name cannot be null");
        this.description = description;
        this.targetDifficulty = targetDifficulty != null ? targetDifficulty : DifficultyLevel.BEGINNER;
        this.poses = new ArrayList<>(initialPoses != null ? initialPoses : Collections.emptyList());
        this.restBetweenPosesSeconds = Math.max(0, restBetweenPosesSeconds);
    }

    // ========================================================================
    // COMPILE-TIME POLYMORPHISM (METHOD OVERLOADING)
    // ========================================================================

    /** Overloaded Method 1: Appends pose with its default duration */
    public void addPose(YogaAsana pose) {
        Objects.requireNonNull(pose, "Cannot add null pose to routine");
        this.poses.add(pose);
    }

    /** Overloaded Method 2: Appends pose with a customized hold duration */
    public void addPose(YogaAsana pose, int customDurationSeconds) {
        Objects.requireNonNull(pose, "Cannot add null pose to routine");
        pose.setHoldDurationSeconds(customDurationSeconds);
        this.poses.add(pose);
    }

    // ========================================================================
    // RUNTIME POLYMORPHIC DISPATCH ACROSS HETEROGENEOUS ASANA SUBCLASSES
    // ========================================================================

    /**
     * Calculates total estimated calories burned across all poses in the routine.
     * Demonstrates dynamic method dispatch: each asana's subclass calculateCalorieBurn()
     * is resolved at runtime.
     */
    public double calculateTotalCaloriesBurned() {
        double totalCalories = 0.0;
        for (YogaAsana asana : poses) {
            // Polymorphic call resolved dynamically
            totalCalories += asana.calculateCalorieBurn(asana.getHoldDurationSeconds());
        }
        return totalCalories;
    }

    /**
     * Calculates total routine duration including pose holds and transition rests.
     */
    public int calculateTotalDurationSeconds() {
        int totalSeconds = 0;
        for (YogaAsana asana : poses) {
            totalSeconds += asana.getHoldDurationSeconds();
        }
        if (poses.size() > 1) {
            totalSeconds += (poses.size() - 1) * restBetweenPosesSeconds;
        }
        return totalSeconds;
    }

    // Getters and Setters (Encapsulation)
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DifficultyLevel getTargetDifficulty() {
        return targetDifficulty;
    }

    public void setTargetDifficulty(DifficultyLevel targetDifficulty) {
        this.targetDifficulty = targetDifficulty;
    }

    public List<YogaAsana> getPoses() {
        return Collections.unmodifiableList(poses);
    }

    public int getRestBetweenPosesSeconds() {
        return restBetweenPosesSeconds;
    }

    public void setRestBetweenPosesSeconds(int restBetweenPosesSeconds) {
        this.restBetweenPosesSeconds = Math.max(0, restBetweenPosesSeconds);
    }
}
