package com.zenflow.patterns;

import com.zenflow.interfaces.SessionObserver;
import com.zenflow.model.YogaAsana;

/**
 * OBSERVER IMPLEMENTATION: Audio Notifier
 * Responds to session transitions by simulating audio chimes and voice coaching.
 */
public class AudioNotifierObserver implements SessionObserver {

    private boolean muted = false;

    public AudioNotifierObserver(boolean muted) {
        this.muted = muted;
    }

    @Override
    public void onTick(int secondsRemaining, int totalDurationSeconds) {
        if (!muted && secondsRemaining <= 3 && secondsRemaining > 0) {
            System.out.println("🔔 [Audio Chime Beep]: " + secondsRemaining + "s remaining...");
        }
    }

    @Override
    public void onPoseTransition(YogaAsana previousPose, YogaAsana nextPose, int poseIndex, int totalPoses) {
        if (!muted && nextPose != null) {
            System.out.println("🎵 [Tibetan Bowl Chime " + nextPose.getChimeFrequencyHz() + " Hz] Rings serenely!");
            System.out.println("🗣️ [Voice Coach]: \"" + nextPose.getVoiceInstruction() + "\"");
        }
    }

    @Override
    public void onSessionPaused() {
        if (!muted) System.out.println("⏸️ [Audio]: Audio paused.");
    }

    @Override
    public void onSessionResumed() {
        if (!muted) System.out.println("▶️ [Audio]: Audio resumed.");
    }

    @Override
    public void onSessionCompleted(int totalSecondsPracticed, double totalCaloriesBurned) {
        if (!muted) {
            System.out.println("🎉 [Tibetan Bowl Chord]: Deep resonance harmonic celebrating completed session!");
            System.out.println("🗣️ [Voice Coach]: \"Namaste. Your practice is complete. Honoring the light within you.\"");
        }
    }

    public boolean isMuted() {
        return muted;
    }

    public void setMuted(boolean muted) {
        this.muted = muted;
    }
}
