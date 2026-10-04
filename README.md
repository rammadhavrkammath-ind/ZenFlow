# 🕉️ ZenFlow Yoga: Mindful Yoga Training WebApp

A modern, serene, and responsive **Yoga Training Web Application** designed for zero-configuration hosting on **Vercel**, backed by a comprehensive **Java Object-Oriented Programming (OOP) Engine** implementing all foundational OOP principles and design patterns.

---

## 🌟 Key Features

### 1. 🧘 Interactive Workout Player
- **Real-Time Circular Countdown Timer**: Smooth animated SVG circular progress ring.
- **Tibetan Singing Bowl Audio**: Synthesized via the Web Audio API with resonant acoustic harmonic overtones (432 Hz, 528 Hz). 100% offline, zero latency, no audio file downloads needed.
- **Hands-Free Voice Coach**: Spoken pose transitions and alignment reminders powered by the Web Speech API.
- **Breath Pacing Guide**: Live Inhale / Hold / Exhale breathing orb synced with the active pose.
- **Controls**: Pause, Resume, Skip, Previous, +15s Hold Extension, and Pose Info Drawer.
- **Celebration Confetti**: Rewarding finish screen with duration and estimated calorie burn.

### 2. 📖 Comprehensive Asana Pose Directory
- 17+ authentic yoga postures with Sanskrit and English names, categories (Standing, Balancing, Inversion, Backbend, Restorative), and difficulty levels.
- Anatomical targets, step-by-step alignment cues, and contraindication warnings.
- Instant search and multi-tag filtering.

### 3. 🌬️ Pranayama (Breathwork) Studio
- Dedicated breathwork visualizer with expanding/contracting animated orb.
- Supported rhythms:
  - **Box Breathing (4-4-4-4)**: Tactical nervous system reset.
  - **4-7-8 Deep Relaxation**: Natural tranquilizer and sleep aid.
  - **Equal Breath (5-5)**: Coherent Heart Rate Variability (HRV).
  - **Awakening Breath**: Prana energy activation.

### 4. 🛠️ Custom Flow Builder
- Assemble your own sequence from the pose catalog.
- Drag and reorder poses or fine-tune individual hold durations.
- Save custom routines to your browser or launch directly into practice.

### 5. 📊 Practice Journey & Streak Tracker
- Automatic streak calculation and daily activity history.
- Milestone achievement badges (*First Flow*, *3-Day Warrior*, *7-Day Yogi*, *Zen Master*).
- Zero-login persistence via browser `localStorage`.

### 6. ☕ Java Object-Oriented Programming Core
- Complete standalone Java project in `/backend-java`.
- Demonstrates **all 10 OOP concepts**:
  1. **Abstraction**: `abstract class YogaAsana`
  2. **Encapsulation**: Strict private fields, validated accessors in `UserProgress`
  3. **Inheritance**: Subclasses `StandingAsana`, `BalancingAsana`, `InversionAsana`, etc.
  4. **Polymorphism**: Dynamic method overriding & compile-time method overloading
  5. **Interfaces**: `Trainable`, `AudioCueEmitter`, `PoseScorable`, `SessionObserver`
  6. **Factory Pattern**: `AsanaFactory`
  7. **Strategy Pattern**: `BreathingStrategy` (Box, 4-7-8, Equal)
  8. **Observer Pattern**: `SessionSubject` broadcasting ticks and phase transitions
  9. **Builder Pattern**: `RoutineBuilder` fluent sequence constructor
  10. **Singleton Pattern**: `SessionManager.getInstance()`
- Includes a demonstrator CLI (`Main.java`) and a built-in REST API server (`YogaHttpServer.java`).

---

## 🚀 Quick Start (Local Development)

### 1. Web Application (Next.js)
```bash
# Navigate to project directory
cd zenflow-yoga

# Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the webapp in your browser.

### 2. Java OOP Engine
```bash
# Navigate to Java backend
cd backend-java

# Run with standard Java 17+
javac -d bin -sourcepath src/main/java src/main/java/com/zenflow/Main.java
java -cp bin com.zenflow.Main

# Start Java REST API Server (Optional)
java -cp bin com.zenflow.server.YogaHttpServer
```

---

## 🌐 Deploying to Vercel

See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for full instructions:

```bash
# 1-click terminal deployment
npx vercel
```
Or import the repository directly on [vercel.com](https://vercel.com/new).

---

## 📚 OOP Architecture Documentation

See [OOP_ARCHITECTURE.md](./OOP_ARCHITECTURE.md) or visit `/oop-docs` in the running web application for interactive code snippets and explanations of every Object-Oriented concept.
