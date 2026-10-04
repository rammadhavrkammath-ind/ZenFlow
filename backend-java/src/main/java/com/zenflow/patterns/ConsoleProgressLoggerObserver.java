package com.zenflow.patterns;

import com.zenflow.interfaces.SessionObserver;
import com.zenflow.model.YogaAsana;

/**
 * OBSERVER IMPLEMENTATION: Console Progress Logger
 * Tracks session statistics and logs live metrics.
 */
public class ConsoleProgressLoggerObserver implements SessionObserver {

    @Override
    public void onTick(int secondsRemaining, int totalDurationSeconds) {
        int elapsed = totalDurationSeconds - secondsRemaining;
        double pct = ((double) elapsed / totalDurationSeconds) * 100.0;
        if (secondsRemaining % 10 == 0 || secondsRemaining <= 3) {
            System.out.printf("⏱️  Pose Progress: %d/%ds (%.0f%%) remaining: %ds%n",
                    elapsed, totalDurationSeconds, pct, secondsRemaining);
        }
    }

    @Override
    public void onPoseTransition(YogaAsana previousPose, YogaAsana nextPose, int poseIndex, int totalPoses) {
        System.out.printf("%n=== POSE %d of %d: %s (%s) ===%n",
                poseIndex + 1, totalPoses, nextPose.getEnglishName(), nextPose.getSanskritName());
        System.out.println("Align: " + nextPose.getAlignmentCues());
        System.out.println("Benefits: " + nextPose.getPrimaryBenefits());
        System.out.printf("Est. Calorie Burn: %.1f kcal%n", nextPose.calculateCalorieBurn(nextPose.getHoldDurationSeconds()));
    }

    @Override
    public void onSessionPaused() {
        System.out.println("📊 Session state: PAUSED");
    }

    @Override
    public void onSessionResumed() {
        System.out.println("📊 Session state: ACTIVE");
    }

    @Override
    public void onSessionCompleted(int totalSecondsPracticed, double totalCaloriesBurned) {
        System.out.println("\n🏆 ==========================================");
        System.out.println("   YOGA SESSION SUMMARY");
        System.out.printf("   Total Duration: %d seconds (%d mins)%n", totalSecondsPracticed, totalSecondsPracticed / 60);
        System.out.printf("   Total Energy Expended: %.1f kcal%n", totalCaloriesBurned);
        System.out.println("==========================================\n");
    }
}
