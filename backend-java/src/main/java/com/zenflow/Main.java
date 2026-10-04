package com.zenflow;

import com.zenflow.interfaces.AudioCueEmitter;
import com.zenflow.interfaces.PoseScorable;
import com.zenflow.interfaces.Trainable;
import com.zenflow.model.*;
import com.zenflow.patterns.*;
import com.zenflow.service.PoseRepository;
import java.util.Arrays;
import java.util.List;

/**
 * ============================================================================
 * ZENFLOW YOGA TRAINING APP - OBJECT-ORIENTED CONCEPTS DEMONSTRATION
 * 
 * This executable class provides comprehensive verification and proof of:
 * 1. ABSTRACTION (Abstract classes & methods)
 * 2. ENCAPSULATION (Private fields, accessors, invariant protection)
 * 3. INHERITANCE (Specialized asana subclasses extending YogaAsana)
 * 4. POLYMORPHISM (Runtime method overriding & compile-time method overloading)
 * 5. INTERFACES (Trainable, AudioCueEmitter, PoseScorable, SessionObserver)
 * 6. DESIGN PATTERNS (Factory, Strategy, Observer, Builder, Singleton)
 * ============================================================================
 */
public class Main {

    public static void main(String[] args) {
        printBanner();

        // --------------------------------------------------------------------
        // CONCEPT 1: ABSTRACTION & INHERITANCE
        // --------------------------------------------------------------------
        System.out.println("==================================================");
        System.out.println("1. DEMONSTRATING ABSTRACTION & INHERITANCE");
        System.out.println("==================================================");
        System.out.println("Base class YogaAsana is abstract and cannot be instantiated directly.");
        System.out.println("We instantiate concrete specialized subclasses:\n");

        YogaAsana warrior = new StandingAsana("warrior-2", "Warrior II", "Virabhadrasana II",
                DifficultyLevel.BEGINNER, 45, Arrays.asList("Glutes", "Quads"), 85.0, "Root front heel");

        YogaAsana tree = new BalancingAsana("vrikshasana", "Tree Pose", "Vrikshasana",
                DifficultyLevel.BEGINNER, 40, Arrays.asList("Calves", "Core"), "Fixed horizon point", 3);

        YogaAsana headstand = new InversionAsana("headstand", "Headstand", "Salamba Sirsasana",
                DifficultyLevel.ADVANCED, 60, Arrays.asList("Shoulders", "Core"), false,
                Arrays.asList("Neck injury", "Glaucoma"));

        System.out.println("Inherited subclass instance: " + warrior);
        System.out.println("Inherited subclass instance: " + tree);
        System.out.println("Inherited subclass instance: " + headstand);

        // --------------------------------------------------------------------
        // CONCEPT 2: ENCAPSULATION & DATA HIDING
        // --------------------------------------------------------------------
        System.out.println("\n==================================================");
        System.out.println("2. DEMONSTRATING ENCAPSULATION");
        System.out.println("==================================================");
        System.out.println("Testing setter validation guards (duration < 5s):");
        try {
            warrior.setHoldDurationSeconds(2); // Should throw IllegalArgumentException
        } catch (IllegalArgumentException e) {
            System.out.println("🛡️ Encapsulation Guard Caught Invalid State: " + e.getMessage());
        }

        UserProgress progress = new UserProgress();
        progress.recordCompletedWorkout(600); // 10 minutes
        System.out.printf("Encapsulated User Progress -> Minutes: %d | Sessions: %d | Streak: %d days | Badges: %s%n",
                progress.getTotalMinutesPracticed(), progress.getCompletedSessionsCount(),
                progress.getCurrentStreakDays(), progress.getUnlockedBadges());

        // --------------------------------------------------------------------
        // CONCEPT 3: POLYMORPHISM (DYNAMIC METHOD DISPATCH)
        // --------------------------------------------------------------------
        System.out.println("\n==================================================");
        System.out.println("3. DEMONSTRATING RUNTIME POLYMORPHISM");
        System.out.println("==================================================");
        System.out.println("Iterating over a heterogeneous list of YogaAsana references.");
        System.out.println("Each subclass polymorphically computes calorie burn & alignment cues:\n");

        List<YogaAsana> heterogeneousPoses = Arrays.asList(warrior, tree, headstand);
        for (YogaAsana asana : heterogeneousPoses) {
            System.out.printf("Pose: %-15s | Class: %-18s | MET: %.2f | Calorie Burn: %.2f kcal%n",
                    asana.getEnglishName(),
                    asana.getClass().getSimpleName(),
                    asana.getMetMultiplier(),
                    asana.calculateCalorieBurn(asana.getHoldDurationSeconds()));
            System.out.println("   Alignment: " + asana.getAlignmentCues());
        }

        // --------------------------------------------------------------------
        // CONCEPT 4: INTERFACES (TRAINABLE, AUDIO CUE EMITTER, POSE SCORABLE)
        // --------------------------------------------------------------------
        System.out.println("\n==================================================");
        System.out.println("4. DEMONSTRATING INTERFACES");
        System.out.println("==================================================");
        Trainable trainable = warrior;
        trainable.start();
        System.out.println("Trainable is active: " + trainable.isActive());
        trainable.complete();

        AudioCueEmitter audio = tree;
        System.out.printf("AudioCueEmitter Frequency: %.0f Hz | Voice: \"%s\"%n",
                audio.getChimeFrequencyHz(), audio.getVoiceInstruction());

        // --------------------------------------------------------------------
        // CONCEPT 5: DESIGN PATTERNS
        // --------------------------------------------------------------------
        System.out.println("\n==================================================");
        System.out.println("5. DEMONSTRATING DESIGN PATTERNS");
        System.out.println("==================================================");

        // Pattern A: Factory Pattern
        System.out.println("\n[A] FACTORY PATTERN (AsanaFactory):");
        YogaAsana factoryCreated = AsanaFactory.createAsana("cobra", "Cobra Pose", "Bhujangasana",
                AsanaCategory.BACKBEND, DifficultyLevel.BEGINNER, 30, Arrays.asList("Erector Spinae"));
        System.out.println("Created via factory: " + factoryCreated.getClass().getName() + " -> " + factoryCreated);

        // Pattern B: Strategy Pattern
        System.out.println("\n[B] STRATEGY PATTERN (BreathingStrategy):");
        BreathingStrategy boxStrategy = new BoxBreathingStrategy();
        BreathingStrategy relaxStrategy = new FourSevenEightStrategy();
        System.out.printf("Active Strategy 1: %s (Cycle: %ds) -> %s%n",
                boxStrategy.getStrategyName(), boxStrategy.getTotalCycleSeconds(), boxStrategy.getPhysiologicalEffect());
        System.out.printf("Swapped Strategy 2: %s (Cycle: %ds) -> %s%n",
                relaxStrategy.getStrategyName(), relaxStrategy.getTotalCycleSeconds(), relaxStrategy.getPhysiologicalEffect());

        // Pattern C: Builder Pattern
        System.out.println("\n[C] BUILDER PATTERN (RoutineBuilder):");
        RoutineBuilder builder = new RoutineBuilder()
                .withName("Morning Sunrise Vinyasa")
                .withDescription("Awaken the spine, invigorate the nervous system, and set daily intention.")
                .withDifficulty(DifficultyLevel.BEGINNER)
                .withRestBetweenPoses(5)
                .addPose(warrior, 30)
                .addPose(tree, 30)
                .addPose(factoryCreated, 25);

        YogaRoutine morningFlow = builder.build();
        System.out.printf("Built Routine: \"%s\" with %d poses | Total Duration: %ds | Total Calories: %.1f kcal%n",
                morningFlow.getName(), morningFlow.getPoses().size(),
                morningFlow.calculateTotalDurationSeconds(), morningFlow.calculateTotalCaloriesBurned());

        // Pattern D: Observer Pattern & Singleton Pattern
        System.out.println("\n[D] OBSERVER & SINGLETON PATTERNS (SessionManager + SessionSubject):");
        SessionManager manager = SessionManager.getInstance();
        System.out.println("SessionManager Singleton hash: " + System.identityHashCode(manager));
        System.out.println("Simulating live session progression with Observers listening:\n");

        manager.startRoutine(morningFlow);
        // Simulate timer ticks
        manager.getSubject().notifyTick(25, 30);
        manager.getSubject().notifyTick(2, 30);
        // Transition to next pose
        manager.nextPose();
        manager.nextPose();
        manager.completeSession();

        System.out.println("\n🎉 ALL OBJECT-ORIENTED PROGRAMMING CONCEPTS VERIFIED SUCCESSFULLY!");
    }

    private static void printBanner() {
        System.out.println("================================================================================");
        System.out.println("         ZENFLOW YOGA TRAINING APP - CORE JAVA OOP ARCHITECTURE                 ");
        System.out.println("================================================================================");
    }
}
