package com.zenflow.model;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * ============================================================================
 * OBJECT-ORIENTED PROGRAMMING CONCEPT: ENCAPSULATION & DATA HIDING
 * 
 * Strict encapsulation protecting internal state invariants. Progress metrics
 * cannot be directly modified; they are altered exclusively through domain business
 * methods that enforce validation rules and trigger milestone badges.
 * ============================================================================
 */
public class UserProgress {

    private int totalMinutesPracticed;
    private int completedSessionsCount;
    private int currentStreakDays;
    private long lastPracticeTimestampMs;
    private final Set<String> unlockedBadges;

    public UserProgress() {
        this.totalMinutesPracticed = 0;
        this.completedSessionsCount = 0;
        this.currentStreakDays = 0;
        this.lastPracticeTimestampMs = 0;
        this.unlockedBadges = new HashSet<>();
    }

    /**
     * Domain business method with invariant protection.
     * Automatically updates streak and checks milestone achievements.
     */
    public synchronized void recordCompletedWorkout(int durationSeconds) {
        if (durationSeconds <= 0) {
            throw new IllegalArgumentException("Workout duration must be greater than zero.");
        }

        int minutes = Math.max(1, durationSeconds / 60);
        this.totalMinutesPracticed += minutes;
        this.completedSessionsCount++;

        long now = System.currentTimeMillis();
        long oneDayMs = 24L * 60 * 60 * 1000;

        if (lastPracticeTimestampMs == 0) {
            currentStreakDays = 1;
        } else {
            long diff = now - lastPracticeTimestampMs;
            if (diff <= oneDayMs * 2 && diff >= oneDayMs / 2) {
                currentStreakDays++;
            } else if (diff > oneDayMs * 2) {
                currentStreakDays = 1; // Streak reset
            }
        }
        this.lastPracticeTimestampMs = now;

        // Check and award badges
        evaluateMilestones();
    }

    private void evaluateMilestones() {
        if (completedSessionsCount >= 1) {
            unlockedBadges.add("FIRST_FLOW");
        }
        if (currentStreakDays >= 3) {
            unlockedBadges.add("THREE_DAY_WARRIOR");
        }
        if (currentStreakDays >= 7) {
            unlockedBadges.add("SEVEN_DAY_YOGI");
        }
        if (totalMinutesPracticed >= 60) {
            unlockedBadges.add("ONE_HOUR_MINDFUL");
        }
        if (totalMinutesPracticed >= 300) {
            unlockedBadges.add("ZEN_MASTER");
        }
    }

    // Encapsulated read-only accessors
    public int getTotalMinutesPracticed() {
        return totalMinutesPracticed;
    }

    public int getCompletedSessionsCount() {
        return completedSessionsCount;
    }

    public int getCurrentStreakDays() {
        return currentStreakDays;
    }

    public Set<String> getUnlockedBadges() {
        return Collections.unmodifiableSet(unlockedBadges);
    }
}
