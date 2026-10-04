package com.zenflow.patterns;

import com.zenflow.interfaces.SessionObserver;
import com.zenflow.model.YogaAsana;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED DESIGN PATTERN: OBSERVER PATTERN (SUBJECT)
 * 
 * Manages the collection of observers and notifies them of active session events
 * (ticks, transitions, pause/resume, completion).
 * ============================================================================
 */
public class SessionSubject {

    private final List<SessionObserver> observers = new ArrayList<>();

    public void addObserver(SessionObserver observer) {
        if (observer != null && !observers.contains(observer)) {
            observers.add(observer);
        }
    }

    public void removeObserver(SessionObserver observer) {
        observers.remove(observer);
    }

    public void notifyTick(int secondsRemaining, int totalDuration) {
        for (SessionObserver observer : observers) {
            observer.onTick(secondsRemaining, totalDuration);
        }
    }

    public void notifyPoseTransition(YogaAsana previousPose, YogaAsana nextPose, int poseIndex, int totalPoses) {
        for (SessionObserver observer : observers) {
            observer.onPoseTransition(previousPose, nextPose, poseIndex, totalPoses);
        }
    }

    public void notifyPaused() {
        for (SessionObserver observer : observers) {
            observer.onSessionPaused();
        }
    }

    public void notifyResumed() {
        for (SessionObserver observer : observers) {
            observer.onSessionResumed();
        }
    }

    public void notifyCompleted(int totalSecondsPracticed, double totalCaloriesBurned) {
        for (SessionObserver observer : observers) {
            observer.onSessionCompleted(totalSecondsPracticed, totalCaloriesBurned);
        }
    }
}
