package com.zenflow.patterns;

import com.zenflow.model.UserProgress;
import com.zenflow.model.YogaAsana;
import com.zenflow.model.YogaRoutine;
import java.util.List;

/**
 * ============================================================================
 * OBJECT-ORIENTED DESIGN PATTERN: SINGLETON PATTERN
 * 
 * Ensures a single global instance manages active yoga practice state, avoiding
 * concurrent conflicting sessions and centralizing state transitions.
 * ============================================================================
 */
public class SessionManager {

    private static volatile SessionManager instance;

    private YogaRoutine activeRoutine;
    private int currentPoseIndex;
    private boolean inSession;
    private boolean paused;
    private final SessionSubject subject;
    private final UserProgress userProgress;

    // Private constructor prevents external instantiation (Singleton)
    private SessionManager() {
        this.subject = new SessionSubject();
        this.userProgress = new UserProgress();
        this.inSession = false;
        this.paused = false;
        this.currentPoseIndex = 0;

        // Register default observers
        this.subject.addObserver(new AudioNotifierObserver(false));
        this.subject.addObserver(new ConsoleProgressLoggerObserver());
    }

    /**
     * Thread-safe double-checked locking Singleton accessor.
     */
    public static SessionManager getInstance() {
        if (instance == null) {
            synchronized (SessionManager.class) {
                if (instance == null) {
                    instance = new SessionManager();
                }
            }
        }
        return instance;
    }

    public synchronized void startRoutine(YogaRoutine routine) {
        if (routine == null || routine.getPoses().isEmpty()) {
            throw new IllegalArgumentException("Cannot start an empty or null routine");
        }
        this.activeRoutine = routine;
        this.currentPoseIndex = 0;
        this.inSession = true;
        this.paused = false;

        System.out.println("🕉️ Starting Routine: " + routine.getName() + " (" + routine.getPoses().size() + " poses)");
        YogaAsana firstPose = routine.getPoses().get(0);
        firstPose.start();
        subject.notifyPoseTransition(null, firstPose, 0, routine.getPoses().size());
    }

    public synchronized void nextPose() {
        if (!inSession || activeRoutine == null) return;

        List<YogaAsana> poses = activeRoutine.getPoses();
        YogaAsana currentPose = poses.get(currentPoseIndex);
        currentPose.complete();

        currentPoseIndex++;
        if (currentPoseIndex < poses.size()) {
            YogaAsana nextPose = poses.get(currentPoseIndex);
            nextPose.start();
            subject.notifyPoseTransition(currentPose, nextPose, currentPoseIndex, poses.size());
        } else {
            completeSession();
        }
    }

    public synchronized void pauseSession() {
        if (inSession && !paused) {
            paused = true;
            subject.notifyPaused();
        }
    }

    public synchronized void resumeSession() {
        if (inSession && paused) {
            paused = false;
            subject.notifyResumed();
        }
    }

    public synchronized void completeSession() {
        if (!inSession) return;
        inSession = false;
        paused = false;

        int totalDuration = activeRoutine != null ? activeRoutine.calculateTotalDurationSeconds() : 0;
        double totalCalories = activeRoutine != null ? activeRoutine.calculateTotalCaloriesBurned() : 0.0;

        userProgress.recordCompletedWorkout(totalDuration);
        subject.notifyCompleted(totalDuration, totalCalories);
    }

    public SessionSubject getSubject() {
        return subject;
    }

    public UserProgress getUserProgress() {
        return userProgress;
    }

    public YogaRoutine getActiveRoutine() {
        return activeRoutine;
    }

    public boolean isInSession() {
        return inSession;
    }

    public boolean isPaused() {
        return paused;
    }
}
