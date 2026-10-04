package com.zenflow.model;

/**
 * ENUM: Categorization of authentic yoga postures.
 */
public enum AsanaCategory {
    STANDING("Standing", "Grounding, stability, and lower body strength"),
    BALANCING("Balancing", "Focus, core stabilization, and neuromuscular control"),
    INVERSION("Inversion", "Circulation, lymphatic drainage, and mental clarity"),
    BACKBEND("Backbend", "Spinal mobility, heart opening, and thoracic expansion"),
    SEATED("Seated", "Hip opening, forward extension, and grounding stillness"),
    RESTORATIVE("Restorative", "Parasympathetic nervous system recovery and deep surrender");

    private final String displayName;
    private final String description;

    AsanaCategory(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}
