# Deploying ZenFlow Yoga to Vercel

This web application is built with **Next.js 14+ (App Router)** and **TypeScript**, the native framework developed by Vercel. It is 100% pre-configured for instant zero-configuration deployment on Vercel.

---

## Method 1: Deploy via Vercel CLI (Fastest - 1 Minute)

You can deploy directly from your local terminal using the Vercel CLI.

1. Open your terminal in the project directory:
   ```bash
   cd C:\Users\User\.gemini\antigravity\scratch\zenflow-yoga
   ```

2. Run the Vercel deploy command:
   ```bash
   npx vercel
   ```

3. Follow the quick terminal prompts:
   - *Set up and deploy?* -> `Y`
   - *Which scope?* -> Select your personal Vercel account
   - *Link to existing project?* -> `N`
   - *What's your project's name?* -> `zenflow-yoga`
   - *In which directory is your code located?* -> `./` (press Enter)
   - *Want to modify settings?* -> `N` (Next.js settings are automatically detected!)

4. To deploy directly to production with custom domain / live SSL:
   ```bash
   npx vercel --prod
   ```

---

## Method 2: Deploy via GitHub (Recommended for Continuous Deployment)

1. Initialize a git repository and commit your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ZenFlow Yoga WebApp"
   ```

2. Push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/zenflow-yoga.git
   git push -u origin main
   ```

3. Go to [https://vercel.com/new](https://vercel.com/new):
   - Click **"Import"** next to your `zenflow-yoga` repository.
   - Framework Preset will automatically be detected as **Next.js**.
   - Root Directory: `./`
   - Click **"Deploy"**.

4. In approximately 45 seconds, Vercel will generate your live production URL (e.g. `https://zenflow-yoga.vercel.app`) with automatic worldwide edge caching, HTTPS SSL, and mobile responsive optimization.

---

## What Works Out-of-the-Box on Vercel

- 🧘 **Interactive Workout Player**: Circular timer, real-time pose switching, hold extension (+15s).
- 🔔 **Tibetan Singing Bowl Audio**: Synthesized on-the-fly using the Web Audio API with zero external audio assets required.
- 🗣️ **Voice Coach Guidance**: Hands-free spoken pose announcements using the Web Speech API.
- 🌬️ **Pranayama Studio**: Box Breathing and 4-7-8 relaxing breath with animated breathing orb.
- 📖 **30+ Asana Directory**: Multi-tag filtering by category, difficulty, and muscle groups.
- 🛠️ **Flow Builder**: Custom sequence creation saved to local browser storage.
- 📊 **Streak & Progress Tracking**: Daily streak counter, minutes practiced, and milestone achievement badges.
- ☕ **Interactive Java OOP Docs**: Interactive spec viewer showcasing the Java OOP architecture.
