"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Menu,
  X,
  Compass,
  Wind,
  Layers,
  BarChart2,
  Sparkles,
} from "lucide-react";
import { loadUserStats, loadSettings, saveSettings, AppSettings } from "../lib/storage";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [streak, setStreak] = useState(0);
  const [settings, setSettings] = useState<AppSettings>({ soundEnabled: true, voiceEnabled: true });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stats = loadUserStats();
    setStreak(stats.currentStreak);
    setSettings(loadSettings());

    const handleStorage = () => {
      const updated = loadUserStats();
      setStreak(updated.currentStreak);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    setSettings(updated);
    saveSettings(updated);
  };

  const toggleVoice = () => {
    const updated = { ...settings, voiceEnabled: !settings.voiceEnabled };
    setSettings(updated);
    saveSettings(updated);
  };

  const navLinks = [
    { href: "/", label: "Routines", icon: Sparkles },
    { href: "/poses", label: "Pose Guide", icon: Compass },
    { href: "/breathe", label: "Breathwork", icon: Wind },
    { href: "/builder", label: "Flow Builder", icon: Layers },
    { href: "/progress", label: "Journey", icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Bespoke Minimalist Vector Emblem */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-9 h-9 rounded-xl glass-pill flex items-center justify-center group-hover:border-emerald-500/40 transition-all">
              {/* Minimalist Geometric Lotus Icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-emerald-400 fill-none stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3 C12 10 7 14 7 18 C7 20.2 8.8 22 11 22 C11.5 22 12 21.5 12 21 C12 21.5 12.5 22 13 22 C15.2 22 17 20.2 17 18 C17 14 12 10 12 3 Z" />
                <path d="M7 14 C4 14.5 2 17 2 19 C2 20.7 3.3 22 5 22 C6.5 22 8 20.5 8 18" />
                <path d="M17 14 C20 14.5 22 17 22 19 C22 20.7 20.7 22 19 22 C17.5 22 16 20.5 16 18" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-sm pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                ZenFlow
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-emerald-400 font-semibold -mt-1">
                Yoga Sanctuary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white/[0.08] text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(52,211,153,0.15)]"
                      : "text-stone-400 hover:text-stone-100 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Controls & Streak Badge */}
          <div className="flex items-center space-x-2.5">
            {/* Streak Counter Glass Badge */}
            <Link
              href="/progress"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full glass-pill text-amber-300 text-xs font-semibold hover:border-amber-500/30 transition-all"
              title="Consecutive Day Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span>{streak} {streak === 1 ? "day" : "days"}</span>
            </Link>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl glass-pill transition-colors ${
                settings.soundEnabled
                  ? "text-emerald-400 border-emerald-500/30"
                  : "text-stone-500 hover:text-stone-300"
              }`}
              title={settings.soundEnabled ? "Mute Chimes" : "Unmute Chimes"}
            >
              {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Voice Toggle */}
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-xl glass-pill transition-colors ${
                settings.voiceEnabled
                  ? "text-teal-400 border-teal-500/30"
                  : "text-stone-500 hover:text-stone-300"
              }`}
              title={settings.voiceEnabled ? "Mute Voice Coach" : "Unmute Voice Coach"}
            >
              {settings.voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl glass-pill text-stone-300"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Glass Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/[0.07] px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/[0.08] text-emerald-300 border border-emerald-500/30"
                    : "text-stone-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
