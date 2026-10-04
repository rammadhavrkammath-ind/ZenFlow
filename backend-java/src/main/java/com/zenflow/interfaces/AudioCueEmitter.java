package com.zenflow.interfaces;

/**
 * OBJECT-ORIENTED CONCEPT: INTERFACE SEGREGATION & POLYMORPHIC NOTIFICATION
 * 
 * Defines audio-related contracts for exercises that produce sound frequencies
 * (Tibetan singing bowl frequencies) or spoken cues for hands-free yoga flow.
 */
public interface AudioCueEmitter {

    /**
     * Gets the base acoustic frequency in Hz for transition chime.
     * (e.g. 432 Hz for meditative root tone, 528 Hz for solar plexus transformation).
     */
    double getChimeFrequencyHz();

    /**
     * Gets the spoken voice instruction to be read by speech synthesis.
     */
    String getVoiceInstruction();

    /**
     * Returns the rhythmic breathing prompt (Inhale, Exhale, or Hold).
     */
    String getBreathingCue();
}
