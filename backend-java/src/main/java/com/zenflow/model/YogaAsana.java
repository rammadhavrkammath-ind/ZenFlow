package com.zenflow.model;

import com.zenflow.interfaces.AudioCueEmitter;
import com.zenflow.interfaces.PoseScorable;
import com.zenflow.interfaces.Trainable;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. ABSTRACTION: Cannot be instantiated directly; provides template contracts
 *    via abstract methods (getAlignmentCues, getPrimaryBenefits, calculateCalorieBurn).
 * 2. ENCAPSULATION: All internal states (id, name, duration) are strictly private
 *    and accessed via validated getter and setter methods.
 * 3. INTERFACE IMPLEMENTATION: Implements Trainable, AudioCueEmitter, PoseScorable.
 * ============================================================================
 */
public abstract class YogaAsana implements Trainable, AudioCueEmitter, PoseScorable {

    // Encapsulation: Private member fields
    private final String id;
    private String englishName;
    private String sanskritName;
    private AsanaCategory category;
    private DifficultyLevel difficulty;
    private int holdDurationSeconds;
    private List<String> targetMuscles;
    private boolean active;
    private double chimeFrequencyHz;

    /**
     * Protected constructor to ensure instantiation only through specialized subclasses
     * or the AsanaFactory.
     */
    protected YogaAsana(String id, String englishName, String sanskritName,
                        AsanaCategory category, DifficultyLevel difficulty,
                        int holdDurationSeconds, List<String> targetMuscles,
                        double chimeFrequencyHz) {
        this.id = Objects.requireNonNull(id, "Asana ID cannot be null");
        this.englishName = Objects.requireNonNull(englishName, "English name cannot be null");
        this.sanskritName = Objects.requireNonNull(sanskritName, "Sanskrit name cannot be null");
        this.category = Objects.requireNonNull(category, "Category cannot be null");
        this.difficulty = Objects.requireNonNull(difficulty, "Difficulty cannot be null");
        setHoldDurationSeconds(holdDurationSeconds); // Validation through setter
        this.targetMuscles = targetMuscles != null ? targetMuscles : Collections.emptyList();
        this.chimeFrequencyHz = chimeFrequencyHz > 0 ? chimeFrequencyHz : 432.0;
        this.active = false;
    }

    // ========================================================================
    // ABSTRACT METHODS (ABSTRACTION): Enforced on all subclasses
    // ========================================================================
    
    /** Returns precise anatomical alignment instructions for proper form. */
    public abstract String getAlignmentCues();

    /** Returns therapeutic, mental, and physical benefits of the pose. */
    public abstract String getPrimaryBenefits();

    /** Polymorphic calorie burn calculation based on pose physics & duration. */
    @Override
    public abstract double calculateCalorieBurn(int durationSeconds);

    // ========================================================================
    // INTERFACE METHODS: Trainable
    // ========================================================================
    @Override
    public void start() {
        this.active = true;
        System.out.println("🧘 Entering Pose: " + englishName + " (" + sanskritName + ")");
    }

    @Override
    public void pause() {
        this.active = false;
        System.out.println("⏸️ Paused Pose: " + englishName);
    }

    @Override
    public void resume() {
        this.active = true;
        System.out.println("▶️ Resumed Pose: " + englishName);
    }

    @Override
    public void complete() {
        this.active = false;
        System.out.println("✅ Completed Pose: " + englishName + " (" + holdDurationSeconds + "s)");
    }

    @Override
    public boolean isActive() {
        return active;
    }

    // ========================================================================
    // INTERFACE METHODS: AudioCueEmitter
    // ========================================================================
    @Override
    public double getChimeFrequencyHz() {
        return chimeFrequencyHz;
    }

    @Override
    public String getVoiceInstruction() {
        return "Transition into " + englishName + ", " + sanskritName + ". Hold for " + holdDurationSeconds + " seconds.";
    }

    @Override
    public String getBreathingCue() {
        return "Inhale lengthen the spine, exhale ground into the earth.";
    }

    // ========================================================================
    // ENCAPSULATION: Getters and Validated Setters
    // ========================================================================
    public String getId() {
        return id;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        if (englishName == null || englishName.trim().isEmpty()) {
            throw new IllegalArgumentException("English name cannot be empty");
        }
        this.englishName = englishName;
    }

    public String getSanskritName() {
        return sanskritName;
    }

    public void setSanskritName(String sanskritName) {
        if (sanskritName == null || sanskritName.trim().isEmpty()) {
            throw new IllegalArgumentException("Sanskrit name cannot be empty");
        }
        this.sanskritName = sanskritName;
    }

    public AsanaCategory getCategory() {
        return category;
    }

    public DifficultyLevel getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(DifficultyLevel difficulty) {
        this.difficulty = Objects.requireNonNull(difficulty, "Difficulty cannot be null");
    }

    public int getHoldDurationSeconds() {
        return holdDurationSeconds;
    }

    public void setHoldDurationSeconds(int holdDurationSeconds) {
        if (holdDurationSeconds < 5) {
            throw new IllegalArgumentException("Pose hold duration must be at least 5 seconds.");
        }
        this.holdDurationSeconds = holdDurationSeconds;
    }

    public List<String> getTargetMuscles() {
        return Collections.unmodifiableList(targetMuscles);
    }

    public void setTargetMuscles(List<String> targetMuscles) {
        this.targetMuscles = targetMuscles != null ? targetMuscles : Collections.emptyList();
    }

    @Override
    public String toString() {
        return String.format("[%s] %s (%s) - %s | %ds",
                category.getDisplayName(), englishName, sanskritName, difficulty.getLabel(), holdDurationSeconds);
    }
}
