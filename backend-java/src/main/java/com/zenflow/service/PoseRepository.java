package com.zenflow.service;

import com.zenflow.model.*;
import com.zenflow.patterns.AsanaFactory;
import java.util.*;

/**
 * Service repository providing authentic Asana dataset and curated routines.
 */
public class PoseRepository {

    private final Map<String, YogaAsana> poseCatalog = new LinkedHashMap<>();

    public PoseRepository() {
        seedPoses();
    }

    private void seedPoses() {
        // 1. Tadasana (Mountain Pose)
        add(AsanaFactory.createAsana("tadasana", "Mountain Pose", "Tadasana",
                AsanaCategory.STANDING, DifficultyLevel.BEGINNER, 30,
                Arrays.asList("Quads", "Ankles", "Spine stabilizers")));

        // 2. Vrikshasana (Tree Pose)
        add(AsanaFactory.createAsana("vrikshasana", "Tree Pose", "Vrikshasana",
                AsanaCategory.BALANCING, DifficultyLevel.BEGINNER, 45,
                Arrays.asList("Calves", "Gluteus medius", "Pelvic floor", "Adductors")));

        // 3. Virabhadrasana I (Warrior I)
        add(AsanaFactory.createAsana("warrior-1", "Warrior I", "Virabhadrasana I",
                AsanaCategory.STANDING, DifficultyLevel.BEGINNER, 40,
                Arrays.asList("Psoas", "Quadriceps", "Deltoids", "Thoracic spine")));

        // 4. Virabhadrasana II (Warrior II)
        add(AsanaFactory.createAsana("warrior-2", "Warrior II", "Virabhadrasana II",
                AsanaCategory.STANDING, DifficultyLevel.BEGINNER, 45,
                Arrays.asList("Glutes", "Hamstrings", "Groin", "Shoulders")));

        // 5. Utthita Trikonasana (Triangle Pose)
        add(AsanaFactory.createAsana("triangle", "Extended Triangle", "Utthita Trikonasana",
                AsanaCategory.STANDING, DifficultyLevel.BEGINNER, 40,
                Arrays.asList("Hamstrings", "Obliques", "Spine", "Hips")));

        // 6. Adho Mukha Svanasana (Downward-Facing Dog)
        add(AsanaFactory.createAsana("downward-dog", "Downward-Facing Dog", "Adho Mukha Svanasana",
                AsanaCategory.INVERSION, DifficultyLevel.BEGINNER, 50,
                Arrays.asList("Calves", "Hamstrings", "Lats", "Rotator cuff")));

        // 7. Bhujangasana (Cobra Pose)
        add(AsanaFactory.createAsana("cobra", "Cobra Pose", "Bhujangasana",
                AsanaCategory.BACKBEND, DifficultyLevel.BEGINNER, 35,
                Arrays.asList("Erector spinae", "Chest", "Anterior deltoids")));

        // 8. Urdhva Mukha Svanasana (Upward-Facing Dog)
        add(AsanaFactory.createAsana("upward-dog", "Upward-Facing Dog", "Urdhva Mukha Svanasana",
                AsanaCategory.BACKBEND, DifficultyLevel.INTERMEDIATE, 30,
                Arrays.asList("Triceps", "Spine extensors", "Abdominals", "Quadriceps")));

        // 9. Garudasana (Eagle Pose)
        add(AsanaFactory.createAsana("eagle", "Eagle Pose", "Garudasana",
                AsanaCategory.BALANCING, DifficultyLevel.INTERMEDIATE, 40,
                Arrays.asList("Rhomboids", "Rotator cuff", "Hips", "Ankles")));

        // 10. Natarajasana (Dancer Pose)
        add(AsanaFactory.createAsana("dancer", "Lord of the Dance", "Natarajasana",
                AsanaCategory.BALANCING, DifficultyLevel.ADVANCED, 45,
                Arrays.asList("Quadriceps", "Psoas", "Chest", "Ankle stabilizer")));

        // 11. Bakasana (Crow Pose)
        add(AsanaFactory.createAsana("crow", "Crow Pose", "Bakasana",
                AsanaCategory.BALANCING, DifficultyLevel.ADVANCED, 30,
                Arrays.asList("Wrist flexors", "Core", "Serratus anterior", "Pec major")));

        // 12. Sarvangasana (Shoulderstand)
        add(AsanaFactory.createAsana("shoulderstand", "Supported Shoulderstand", "Salamba Sarvangasana",
                AsanaCategory.INVERSION, DifficultyLevel.INTERMEDIATE, 60,
                Arrays.asList("Triceps", "Upper back", "Core", "Thyroid stimulation")));

        // 13. Sirsasana (Headstand)
        add(AsanaFactory.createAsana("headstand", "Supported Headstand", "Salamba Sirsasana",
                AsanaCategory.INVERSION, DifficultyLevel.ADVANCED, 60,
                Arrays.asList("Deltoids", "Core", "Spinal erectors", "Serratus")));

        // 14. Ustrasana (Camel Pose)
        add(AsanaFactory.createAsana("camel", "Camel Pose", "Ustrasana",
                AsanaCategory.BACKBEND, DifficultyLevel.INTERMEDIATE, 35,
                Arrays.asList("Quadriceps", "Hip flexors", "Intercostals", "Throat")));

        // 15. Balasana (Child's Pose)
        add(AsanaFactory.createAsana("childs-pose", "Child's Pose", "Balasana",
                AsanaCategory.RESTORATIVE, DifficultyLevel.BEGINNER, 60,
                Arrays.asList("Lumbar spine", "Hips", "Thighs", "Ankles")));

        // 16. Supta Baddha Konasana (Reclining Bound Angle)
        add(AsanaFactory.createAsana("reclining-bound-angle", "Reclining Bound Angle", "Supta Baddha Konasana",
                AsanaCategory.RESTORATIVE, DifficultyLevel.BEGINNER, 90,
                Arrays.asList("Inner groins", "Pelvic floor", "Lower abdomen")));

        // 17. Savasana (Corpse Pose)
        add(AsanaFactory.createAsana("savasana", "Corpse Pose", "Savasana",
                AsanaCategory.RESTORATIVE, DifficultyLevel.BEGINNER, 120,
                Arrays.asList("Full body parasympathetic restoration")));
    }

    private void add(YogaAsana asana) {
        poseCatalog.put(asana.getId(), asana);
    }

    public List<YogaAsana> getAllPoses() {
        return new ArrayList<>(poseCatalog.values());
    }

    public Optional<YogaAsana> getPoseById(String id) {
        return Optional.ofNullable(poseCatalog.get(id));
    }

    public List<YogaAsana> getPosesByCategory(AsanaCategory category) {
        List<YogaAsana> filtered = new ArrayList<>();
        for (YogaAsana asana : poseCatalog.values()) {
            if (asana.getCategory() == category) {
                filtered.add(asana);
            }
        }
        return filtered;
    }
}
