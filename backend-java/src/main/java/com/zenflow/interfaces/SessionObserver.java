package com.zenflow.interfaces;

import com.zenflow.model.YogaAsana;

/**
 * OBJECT-ORIENTED DESIGN PATTERN: OBSERVER PATTERN
 * 
 * Defines the Observer interface in the Observer Pattern. Listeners (audio cues,
 * UI timers, progress loggers, streak recorders) register to receive real-time
 * notifications from the active workout session subject without tight coupling.
 */
public interface SessionObserver {

    /** Invoked on each second tick of the active pose timer. */
    void onTick(int secondsRemaining, int totalDurationSeconds);

    /** Invoked when transitioning to a new yoga asana. */
    void onPoseTransition(YogaAsana previousPose, YogaAsana nextPose, int poseIndex, int totalPoses);

    /** Invoked when the session is paused. */
    void onSessionPaused();

    /** Invoked when the session is resumed. */
    void onSessionResumed();

    /** Invoked when the entire routine or workout finishes. */
    void onSessionCompleted(int totalSecondsPracticed, double totalCaloriesBurned);
}
