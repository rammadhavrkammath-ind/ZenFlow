package com.zenflow.patterns;

import com.zenflow.model.DifficultyLevel;
import com.zenflow.model.YogaAsana;
import com.zenflow.model.YogaRoutine;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * ============================================================================
 * OBJECT-ORIENTED DESIGN PATTERN: BUILDER PATTERN
 * 
 * Separates the construction of a complex YogaRoutine from its representation,
 * enabling the step-by-step assembly of personalized yoga sequences with fluent API.
 * ============================================================================
 */
public class RoutineBuilder {

    private String id;
    private String name;
    private String description;
    private DifficultyLevel difficulty;
    private final List<YogaAsana> poses;
    private int restBetweenPosesSeconds;

    public RoutineBuilder() {
        this.id = "routine-" + UUID.randomUUID().toString().substring(0, 8);
        this.name = "My Custom Flow";
        this.description = "Personalized yoga flow sequence";
        this.difficulty = DifficultyLevel.BEGINNER;
        this.poses = new ArrayList<>();
        this.restBetweenPosesSeconds = 5;
    }

    public RoutineBuilder withId(String id) {
        this.id = id;
        return this;
    }

    public RoutineBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public RoutineBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public RoutineBuilder withDifficulty(DifficultyLevel difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public RoutineBuilder withRestBetweenPoses(int restSeconds) {
        this.restBetweenPosesSeconds = restSeconds;
        return this;
    }

    public RoutineBuilder addPose(YogaAsana pose) {
        this.poses.add(pose);
        return this;
    }

    public RoutineBuilder addPose(YogaAsana pose, int customDurationSeconds) {
        pose.setHoldDurationSeconds(customDurationSeconds);
        this.poses.add(pose);
        return this;
    }

    /**
     * Builds and validates the resulting YogaRoutine instance.
     */
    public YogaRoutine build() {
        if (poses.isEmpty()) {
            throw new IllegalStateException("Cannot build a yoga routine with zero poses. Add at least one pose.");
        }
        return new YogaRoutine(id, name, description, difficulty, poses, restBetweenPosesSeconds);
    }
}
