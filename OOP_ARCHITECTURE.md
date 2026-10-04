# ZenFlow Yoga: Object-Oriented Programming (OOP) Architecture

This document provides a comprehensive technical mapping of **all Object-Oriented Programming (OOP) concepts and classical design patterns** implemented in the **ZenFlow Yoga** codebase.

The system is architected in two complementary layers:
1. **Java Core Engine (`/backend-java`)**: A pure Java 17+ implementation with strict OOP hierarchy, domain models, interfaces, patterns, and a lightweight REST API server.
2. **Web Application (`/src`)**: A TypeScript & Next.js application that mirrors the OOP concepts in the browser and deploys seamlessly to Vercel.

---

## Complete OOP Concepts Index

| # | Concept | Java File Location | Key Class / Interface |
|---|---|---|---|
| **1** | **Abstraction** | `backend-java/src/main/java/com/zenflow/model/YogaAsana.java` | `abstract class YogaAsana` |
| **2** | **Encapsulation** | `backend-java/src/main/java/com/zenflow/model/UserProgress.java` | `class UserProgress` |
| **3** | **Inheritance** | `backend-java/src/main/java/com/zenflow/model/StandingAsana.java`, `BalancingAsana.java`, `InversionAsana.java` | `StandingAsana extends YogaAsana`, etc. |
| **4** | **Polymorphism (Dynamic & Static)** | `backend-java/src/main/java/com/zenflow/model/YogaRoutine.java` | `@Override calculateCalorieBurn()`, Overloaded constructors |
| **5** | **Interfaces** | `backend-java/src/main/java/com/zenflow/interfaces/` | `Trainable`, `AudioCueEmitter`, `PoseScorable`, `SessionObserver` |
| **6** | **Factory Pattern** | `backend-java/src/main/java/com/zenflow/patterns/AsanaFactory.java` | `AsanaFactory.createAsana(...)` |
| **7** | **Strategy Pattern** | `backend-java/src/main/java/com/zenflow/patterns/BreathingStrategy.java` | `BoxBreathingStrategy`, `FourSevenEightStrategy` |
| **8** | **Observer Pattern** | `backend-java/src/main/java/com/zenflow/patterns/SessionSubject.java` | `SessionSubject`, `AudioNotifierObserver`, `ConsoleLogger` |
| **9** | **Builder Pattern** | `backend-java/src/main/java/com/zenflow/patterns/RoutineBuilder.java` | `RoutineBuilder` |
| **10** | **Singleton Pattern** | `backend-java/src/main/java/com/zenflow/patterns/SessionManager.java` | `SessionManager.getInstance()` |

---

## 1. Abstraction
- **Definition**: Abstraction separates what an object does from how it does it. In Java, this is achieved using abstract classes and abstract methods.
- **Implementation**: [`YogaAsana.java`](file:///backend-java/src/main/java/com/zenflow/model/YogaAsana.java)
- **Code snippet**:
  ```java
  public abstract class YogaAsana implements Trainable, AudioCueEmitter, PoseScorable {
      // Abstract methods enforced on all specialized subclasses
      public abstract String getAlignmentCues();
      public abstract String getPrimaryBenefits();
      public abstract double calculateCalorieBurn(int durationSeconds);
  }
  ```
- **Why in Yoga App**: `YogaAsana` represents the general concept of a yoga posture. You cannot do an "abstract asana"—you must perform a specific posture like *Mountain Pose* or *Headstand*. The base class enforces alignment cues and calorie burn calculations without exposing low-level biomechanical differences.

---

## 2. Encapsulation & Data Hiding
- **Definition**: Restricting direct access to an object's internal state, hiding sensitive data, and providing controlled access via validated getters and setters.
- **Implementation**: [`UserProgress.java`](file:///backend-java/src/main/java/com/zenflow/model/UserProgress.java) & [`YogaAsana.java`](file:///backend-java/src/main/java/com/zenflow/model/YogaAsana.java)
- **Code snippet**:
  ```java
  public class UserProgress {
      private int totalMinutesPracticed;
      private int currentStreakDays;
      private final Set<String> unlockedBadges;

      // Invariant protection: cannot directly alter streak or minutes
      public synchronized void recordCompletedWorkout(int durationSeconds) {
          if (durationSeconds <= 0) {
              throw new IllegalArgumentException("Workout duration must be greater than zero.");
          }
          this.totalMinutesPracticed += durationSeconds / 60;
          evaluateMilestones(); // Guarded state mutation
      }

      public int getTotalMinutesPracticed() {
          return totalMinutesPracticed;
      }
  }
  ```
- **Why in Yoga App**: Prevents invalid durations (e.g. negative seconds or poses shorter than 5 seconds) and protects user streak integrity from unauthorized mutations.

---

## 3. Inheritance
- **Definition**: Mechanism where a child class acquires the properties and behaviors of a parent class (`extends` keyword), enabling code reuse and specialization.
- **Implementation**:
  - `StandingAsana extends YogaAsana`
  - `BalancingAsana extends YogaAsana`
  - `InversionAsana extends YogaAsana`
  - `RestorativeAsana extends YogaAsana`
  - `BackbendAsana extends YogaAsana`
- **Code snippet**:
  ```java
  public class BalancingAsana extends YogaAsana {
      private String drishtiPoint; // Eye gaze focal point
      private int stabilityRating; // 1 to 5 neuromuscular challenge rating

      public BalancingAsana(String id, String englishName, String sanskritName,
                            DifficultyLevel difficulty, int duration,
                            List<String> targetMuscles, String drishtiPoint, int stabilityRating) {
          super(id, englishName, sanskritName, AsanaCategory.BALANCING, difficulty, duration, targetMuscles, 528.0);
          this.drishtiPoint = drishtiPoint;
          this.stabilityRating = stabilityRating;
      }
  }
  ```
- **Why in Yoga App**: Standing poses, balance poses, inversions, and restorative postures share fundamental traits (English name, Sanskrit name, duration), but balance postures require gaze focus (`drishti`), while inversions require contraindication warnings.

---

## 4. Polymorphism
Polymorphism allows objects of different classes to be treated as objects of a common superclass, with behaviors resolving at runtime (Dynamic) or compile-time (Static).

### 4.1 Runtime Polymorphism (Method Overriding `@Override`)
- **Implementation**: Each subclass overrides `calculateCalorieBurn()`, `getAlignmentCues()`, and `getMetMultiplier()`.
- **Dynamic Dispatch in [`YogaRoutine.java`](file:///backend-java/src/main/java/com/zenflow/model/YogaRoutine.java)**:
  ```java
  public double calculateTotalCaloriesBurned() {
      double totalCalories = 0.0;
      for (YogaAsana asana : poses) {
          // Dynamic method dispatch resolves to the concrete subclass at runtime!
          totalCalories += asana.calculateCalorieBurn(asana.getHoldDurationSeconds());
      }
      return totalCalories;
  }
  ```

### 4.2 Compile-Time Polymorphism (Method Overloading)
- **Implementation**: Multiple constructors and overloaded methods with differing parameter lists:
  ```java
  public YogaRoutine(String id, String name, DifficultyLevel targetDifficulty) { ... }
  public YogaRoutine(String id, String name, String description, DifficultyLevel targetDifficulty, List<YogaAsana> poses, int rest) { ... }

  public void addPose(YogaAsana pose) { ... }
  public void addPose(YogaAsana pose, int customDurationSeconds) { ... }
  ```

---

## 5. Interfaces
- **Definition**: Abstract types specifying a set of method signatures that implementing classes must fulfill.
- **Interfaces implemented**:
  - `Trainable`: Lifecycle controls (`start()`, `pause()`, `resume()`, `complete()`, `isActive()`).
  - `AudioCueEmitter`: Acoustic frequency (`getChimeFrequencyHz()`) and spoken voice instructions (`getVoiceInstruction()`).
  - `PoseScorable`: Calorie expenditure and metabolic intensity factor (`getMetMultiplier()`).
  - `SessionObserver`: Event listener for workout progress ticks and phase transitions.
- **Why in Yoga App**: Decouples the audio synthesis engine and timer player from any specific pose representation.

---

## 6. Design Patterns

### 6.1 Factory Pattern (`AsanaFactory.java`)
Instantiates the appropriate `YogaAsana` subclass based on the `AsanaCategory` without exposing the concrete constructors:
```java
YogaAsana pose = AsanaFactory.createAsana("vrikshasana", "Tree Pose", "Vrikshasana",
                                          AsanaCategory.BALANCING, DifficultyLevel.BEGINNER, 40, muscles);
```

### 6.2 Strategy Pattern (`BreathingStrategy.java`)
Defines a family of interchangeable Pranayama breathing algorithms. The client switches between `BoxBreathingStrategy` (4-4-4-4) and `FourSevenEightStrategy` (4-7-8) at runtime without rewriting the timer loop.

### 6.3 Observer Pattern (`SessionSubject.java` & `SessionObserver.java`)
Implements event-driven decoupled broadcasting. When the timer ticks or a pose changes, the `SessionSubject` notifies all registered observers:
- `AudioNotifierObserver`: Triggers Tibetan bowl chimes and voice guidance.
- `ConsoleProgressLoggerObserver`: Logs timestamped metrics.

### 6.4 Builder Pattern (`RoutineBuilder.java`)
Fluent API to assemble customized yoga sequences step-by-step:
```java
YogaRoutine routine = new RoutineBuilder()
    .withName("Morning Flow")
    .withDifficulty(DifficultyLevel.BEGINNER)
    .withRestBetweenPoses(5)
    .addPose(tadasana, 30)
    .addPose(tree, 40)
    .build();
```

### 6.5 Singleton Pattern (`SessionManager.java`)
Thread-safe double-checked locking singleton managing the active practice session state across the application:
```java
SessionManager manager = SessionManager.getInstance();
```

---

## How to Run the Java Engine

```bash
cd backend-java

# 1. Compile all Java files
javac -d bin -sourcepath src/main/java src/main/java/com/zenflow/Main.java

# 2. Run the OOP Demonstration CLI
java -cp bin com.zenflow.Main

# 3. Start the Lightweight REST API Server
java -cp bin com.zenflow.server.YogaHttpServer
```
