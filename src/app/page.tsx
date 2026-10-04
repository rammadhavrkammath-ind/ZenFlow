import { Navbar } from "../components/Navbar";
import { HomeDashboard } from "../components/HomeDashboard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070a0d] text-stone-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main className="flex-1">
        <HomeDashboard />
      </main>
      <footer className="py-8 border-t border-white/[0.06] text-center text-xs text-stone-500">
        <p>ZenFlow Yoga Sanctuary • Mindful Movement & Breathwork</p>
      </footer>
    </div>
  );
}
