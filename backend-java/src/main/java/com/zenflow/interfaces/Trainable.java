package com.zenflow.interfaces;

/**
 * OBJECT-ORIENTED CONCEPT: INTERFACE
 * 
 * An interface in Java provides full abstraction. It defines a strict behavioral
 * contract that implementing classes must satisfy, decoupling the execution
 * pipeline from specific yoga pose or routine implementations.
 */
public interface Trainable {
    
    /** Starts or enters the exercise. */
    void start();

    /** Pauses the current exercise timer. */
    void pause();

    /** Resumes the exercise timer from paused state. */
    void resume();

    /** Completes the exercise and records completion metrics. */
    void complete();

    /** Checks if the exercise is currently active. */
    boolean isActive();
}
