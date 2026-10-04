"use client";

import React from "react";
import { AsanaCategory } from "../types/yoga";

interface Props {
  category: AsanaCategory;
  poseId: string;
  className?: string;
  showGuides?: boolean;
}

export const PoseIllustration: React.FC<Props> = ({
  category,
  poseId,
  className = "w-full h-full",
  showGuides = true,
}) => {
  const jointStyle = "fill-emerald-400 stroke-emerald-200 stroke-1";
  const bodyStroke = "stroke-emerald-300 stroke-[3] stroke-linecap-round stroke-linejoin-round fill-none";
  const headStyle = "fill-emerald-400/20 stroke-emerald-300 stroke-[2.5]";
  const guideStyle = "stroke-emerald-500/30 stroke-1 stroke-dasharray-2-2";
  const groundStyle = "stroke-white/10 stroke-1.5 stroke-dasharray-4-3";
  const highlightPoint = "fill-teal-300 animate-pulse";

  const renderVectorFigure = () => {
    switch (poseId) {
      // ======================================================================
      // 1. TADASANA (Mountain Pose / Samasthiti)
      // True Mountain Pose: Standing erect, feet together and grounded, legs zipped,
      // spine straight, shoulders rolled down & back, arms at sides with open palms.
      // ======================================================================
      case "tadasana":
        return (
          <svg viewBox="0 0 120 140" className={className}>
            {/* Ground Line */}
            <line x1="20" y1="128" x2="100" y2="128" className={groundStyle} />
            {/* Central Plumbline Vertical Axis */}
            {showGuides && <line x1="60" y1="8" x2="60" y2="128" className={guideStyle} />}
            {/* Head: Crown reaching skyward, chin level */}
            <circle cx="60" cy="20" r="7.5" className={headStyle} />
            {/* Spine: Tall, straight, erect through center */}
            <line x1="60" y1="28" x2="60" y2="74" className={bodyStroke} />
            {/* Shoulders: Broad, rolled back */}
            <line x1="46" y1="36" x2="74" y2="36" className={bodyStroke} />
            {/* Arms: Alongside body with slight natural angle, palms open forward */}
            <path d="M46 36 L42 60 L38 84" className={bodyStroke} />
            <path d="M74 36 L78 60 L82 84" className={bodyStroke} />
            {/* Hips: Level & centered */}
            <line x1="52" y1="74" x2="68" y2="74" className={bodyStroke} />
            {/* Legs: Together, thighs & calves touching in true Samasthiti */}
            <line x1="56" y1="74" x2="57" y2="126" className={bodyStroke} />
            <line x1="64" y1="74" x2="63" y2="126" className={bodyStroke} />
            {/* Feet: Grounded together at center */}
            <line x1="52" y1="126" x2="68" y2="126" className={bodyStroke} strokeWidth="3.5" />
            {/* Anatomical Key Joint Markers */}
            <circle cx="46" cy="36" r="2" className={jointStyle} />
            <circle cx="74" cy="36" r="2" className={jointStyle} />
            <circle cx="42" cy="60" r="1.5" className={jointStyle} />
            <circle cx="78" cy="60" r="1.5" className={jointStyle} />
            <circle cx="57" cy="98" r="2" className={jointStyle} />
            <circle cx="63" cy="98" r="2" className={jointStyle} />
            <circle cx="60" cy="126" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 2. VRIKSHASANA (Tree Pose)
      // Standing on one foot, other foot pressed against inner thigh, hands in prayer.
      // ======================================================================
      case "vrikshasana":
        return (
          <svg viewBox="0 0 120 140" className={className}>
            <line x1="25" y1="128" x2="95" y2="128" className={groundStyle} />
            {showGuides && <line x1="60" y1="10" x2="60" y2="128" className={guideStyle} />}
            {/* Raised Hands in Anjali Mudra (Prayer) */}
            <path d="M60 8 L55 20 M60 8 L65 20" className={bodyStroke} />
            <circle cx="60" cy="27" r="7" className={headStyle} />
            {/* Arms overhead joining at hands */}
            <path d="M48 42 L42 28 L55 20" className={bodyStroke} />
            <path d="M72 42 L78 28 L65 20" className={bodyStroke} />
            {/* Spine */}
            <line x1="60" y1="35" x2="60" y2="76" className={bodyStroke} />
            {/* Grounded Standing Leg */}
            <line x1="60" y1="76" x2="60" y2="126" className={bodyStroke} />
            {/* Bent Tree Leg turned 45 degrees outward */}
            <path d="M60 76 L86 92 L62 96" className={bodyStroke} />
            <circle cx="60" cy="42" r="2" className={jointStyle} />
            <circle cx="86" cy="92" r="2.5" className={jointStyle} />
            <circle cx="60" cy="126" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 3. VIRABHADRASANA I (Warrior I)
      // 90° front knee lunge, angled back foot, squared hips, arms overhead.
      // ======================================================================
      case "virabhadrasana-1":
        return (
          <svg viewBox="0 0 140 140" className={className}>
            <line x1="15" y1="126" x2="125" y2="126" className={groundStyle} />
            {/* Vertical Arm Reach */}
            <path d="M68 10 L64 28 M76 10 L72 28" className={bodyStroke} />
            <circle cx="70" cy="34" r="7" className={headStyle} />
            <line x1="70" y1="41" x2="68" y2="78" className={bodyStroke} />
            <path d="M62 48 L64 28 M76 48 L72 28" className={bodyStroke} />
            {/* 90 degree front lunge leg */}
            <path d="M68 78 L98 84 L98 126" className={bodyStroke} />
            {/* Straight back anchored leg */}
            <line x1="68" y1="78" x2="28" y2="126" className={bodyStroke} />
            {showGuides && <path d="M92 84 L92 90 L98 90" className={guideStyle} />}
            <circle cx="98" cy="84" r="2.5" className={jointStyle} />
            <circle cx="98" cy="126" r="3" className={highlightPoint} />
            <circle cx="28" cy="126" r="2.5" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 4. VIRABHADRASANA II (Warrior II)
      // Deep 90° knee lunge, straight back leg, arms horizontal, gaze over front hand.
      // ======================================================================
      case "virabhadrasana-2":
        return (
          <svg viewBox="0 0 150 130" className={className}>
            <line x1="10" y1="122" x2="140" y2="122" className={groundStyle} />
            {showGuides && <line x1="18" y1="46" x2="132" y2="46" className={guideStyle} />}
            <circle cx="74" cy="28" r="7" className={headStyle} />
            <line x1="74" y1="35" x2="72" y2="76" className={bodyStroke} />
            {/* Extended parallel arms */}
            <line x1="74" y1="46" x2="130" y2="46" className={bodyStroke} />
            <line x1="74" y1="46" x2="20" y2="46" className={bodyStroke} />
            {/* Front 90 degree lunge */}
            <path d="M72 76 L108 82 L108 122" className={bodyStroke} />
            {/* Back grounded leg */}
            <line x1="72" y1="76" x2="30" y2="122" className={bodyStroke} />
            <circle cx="108" cy="82" r="3" className={jointStyle} />
            <circle cx="108" cy="122" r="3" className={highlightPoint} />
            <circle cx="30" cy="122" r="2.5" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 5. TRIKONASANA (Triangle Pose)
      // Straight legs, lateral side hinge, top arm reaching sky, bottom hand on shin.
      // ======================================================================
      case "trikonasana":
        return (
          <svg viewBox="0 0 140 130" className={className}>
            <line x1="15" y1="122" x2="125" y2="122" className={groundStyle} />
            {showGuides && <line x1="88" y1="10" x2="88" y2="122" className={guideStyle} />}
            <circle cx="74" cy="40" r="7" className={headStyle} />
            {/* Hips to Torso Lateral Tilt */}
            <line x1="55" y1="76" x2="88" y2="50" className={bodyStroke} />
            {/* Top arm vertical */}
            <line x1="88" y1="50" x2="88" y2="14" className={bodyStroke} />
            {/* Bottom arm reaching shin */}
            <line x1="88" y1="50" x2="92" y2="114" className={bodyStroke} />
            {/* Front & Back straight legs */}
            <line x1="55" y1="76" x2="95" y2="122" className={bodyStroke} />
            <line x1="55" y1="76" x2="25" y2="122" className={bodyStroke} />
            <circle cx="88" cy="50" r="2.5" className={jointStyle} />
            <circle cx="95" cy="122" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 6. ADHO MUKHA SVANASANA (Downward-Facing Dog)
      // Crisp Inverted V: Flat palms, straight lengthened spine, sit bones apex.
      // ======================================================================
      case "adho-mukha-svanasana":
        return (
          <svg viewBox="0 0 140 110" className={className}>
            <line x1="10" y1="102" x2="130" y2="102" className={groundStyle} />
            {showGuides && <path d="M26 100 L72 26 L118 100" className={guideStyle} />}
            <circle cx="48" cy="62" r="7" className={headStyle} />
            {/* Arms from palms to shoulders */}
            <line x1="72" y1="28" x2="26" y2="100" className={bodyStroke} />
            {/* Legs from sit bones to grounded heels */}
            <line x1="72" y1="28" x2="118" y2="100" className={bodyStroke} />
            <circle cx="72" cy="28" r="3.5" className={highlightPoint} />
            <circle cx="26" cy="100" r="3" className={jointStyle} />
            <circle cx="118" cy="100" r="3" className={jointStyle} />
          </svg>
        );

      // ======================================================================
      // 7. BHUJANGASANA (Cobra Pose)
      // Gentle spinal arch, hips on mat, heart lifted, elbows tucked.
      // ======================================================================
      case "bhujangasana":
      case "urdhva-mukha-svanasana":
        return (
          <svg viewBox="0 0 140 90" className={className}>
            <line x1="15" y1="82" x2="130" y2="82" className={groundStyle} />
            <circle cx="44" cy="22" r="7" className={headStyle} />
            {/* Curved Spine */}
            <path d="M44 29 Q 58 60 92 76 L124 78" className={bodyStroke} />
            {/* Pushing Hands */}
            <path d="M52 48 L46 80 L38 80" className={bodyStroke} />
            <circle cx="44" cy="22" r="2" className={jointStyle} />
            <circle cx="46" cy="80" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 8. GARUDASANA (Eagle Pose) - FULLY REFURBISHED
      // Deep single-leg chair squat, wrapped thigh over thigh with calf hook,
      // intertwined forearms at eye level (Eagle arms and legs).
      // ======================================================================
      case "garudasana":
        return (
          <svg viewBox="0 0 120 140" className={className}>
            <line x1="25" y1="128" x2="95" y2="128" className={groundStyle} />
            {showGuides && <line x1="60" y1="10" x2="60" y2="128" className={guideStyle} />}
            {/* Intertwined Eagle Hands & Forearms */}
            {/* Palms pressed together in front of face */}
            <path d="M60 20 L58 36 M60 20 L62 36" className={bodyStroke} />
            {/* Head focused through fingers */}
            <circle cx="60" cy="26" r="7" className={headStyle} />
            {/* Wrapped Elbows crossed at shoulder height */}
            <path d="M48 46 L54 50 L66 50 L72 46" className={bodyStroke} />
            {/* Forearms wrapping up to center */}
            <path d="M54 50 L58 36 M66 50 L62 36" className={bodyStroke} />
            {/* Upright compressed Torso */}
            <line x1="60" y1="46" x2="60" y2="76" className={bodyStroke} />
            {/* Deep Sunk Chair Hips */}
            <path d="M50 76 L70 76" className={bodyStroke} />
            {/* Standing Bent Knee (Left Leg) */}
            <path d="M56 76 L54 98 L56 126" className={bodyStroke} />
            {/* Wrapped Right Thigh crossing OVER Left Knee */}
            <path d="M64 76 L48 88 L52 104 L60 108" className={bodyStroke} strokeWidth="3.2" />
            {/* Joint Markers */}
            <circle cx="60" cy="50" r="2.5" className={jointStyle} />
            <circle cx="54" cy="98" r="2.5" className={jointStyle} />
            <circle cx="56" cy="126" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 9. NATARAJASANA (Dancer Pose / Lord of the Dance) - FULLY REFURBISHED
      // Supporting leg straight, torso forward in graceful bow arch, back leg
      // kicked high and gripped by hand, other arm reaching forward.
      // ======================================================================
      case "natarajasana":
        return (
          <svg viewBox="0 0 150 140" className={className}>
            <line x1="15" y1="126" x2="135" y2="126" className={groundStyle} />
            {/* Extended Front Arm reaching forward */}
            <path d="M60 48 L32 38 L14 36" className={bodyStroke} />
            <circle cx="14" cy="36" r="2" className={highlightPoint} />
            {/* Head looking forward over outstretched fingertips */}
            <circle cx="62" cy="32" r="7.5" className={headStyle} />
            {/* Arched Torso bowing forward */}
            <path d="M62 40 Q 68 56 68 76" className={bodyStroke} />
            {/* Firm Grounded Standing Leg */}
            <line x1="68" y1="76" x2="68" y2="126" className={bodyStroke} />
            {/* Raised Back Leg forming graceful bow arc */}
            <path d="M68 76 Q 96 68 112 40 L108 26" className={bodyStroke} strokeWidth="3" />
            {/* Back Arm reaching overhead/behind to grip raised foot */}
            <path d="M64 48 Q 88 34 108 26" className={bodyStroke} strokeWidth="2.5" strokeDasharray="none" />
            {/* Grip Joint (Hand holding Foot) */}
            <circle cx="108" cy="26" r="3" className={jointStyle} />
            <circle cx="68" cy="126" r="3" className={highlightPoint} />
            <circle cx="68" cy="76" r="2" className={jointStyle} />
          </svg>
        );

      // ======================================================================
      // 10. BAKASANA (Crow Pose / Crane Pose) - FULLY REFURBISHED
      // Arm balance: Hands flat on floor, elbows slightly bent, knees tucked
      // high onto triceps, feet lifted off floor, rounded cat back.
      // ======================================================================
      case "bakasana":
        return (
          <svg viewBox="0 0 140 120" className={className}>
            {/* Ground Line */}
            <line x1="15" y1="106" x2="125" y2="106" className={groundStyle} />
            {/* Head gazing slightly forward ahead of hands */}
            <circle cx="42" cy="46" r="7" className={headStyle} />
            {/* Supporting Straight/Bent Arms (Bearing weight) */}
            {/* Wrist contact points on ground */}
            <line x1="60" y1="62" x2="62" y2="104" className={bodyStroke} strokeWidth="3.5" />
            <line x1="72" y1="62" x2="78" y2="104" className={bodyStroke} strokeWidth="3.5" />
            {/* Rounded Dome Back / Spine */}
            <path d="M48 50 Q 72 32 94 48 L98 62" className={bodyStroke} strokeWidth="3.2" />
            {/* Knees tucked tight on backs of triceps */}
            <path d="M94 48 L68 58" className={bodyStroke} strokeWidth="3.5" />
            {/* Floating Folded Feet (Toes pointing back, completely off floor!) */}
            <path d="M98 62 L108 72 L112 68" className={bodyStroke} />
            {/* Hands Ground Anchors */}
            <line x1="56" y1="104" x2="68" y2="104" className={bodyStroke} strokeWidth="3.5" />
            <line x1="72" y1="104" x2="84" y2="104" className={bodyStroke} strokeWidth="3.5" />
            <circle cx="62" cy="104" r="3" className={highlightPoint} />
            <circle cx="78" cy="104" r="3" className={highlightPoint} />
            {/* Tricep Contact / Knee Pivot Marker */}
            <circle cx="68" cy="58" r="2.5" className={jointStyle} />
            {showGuides && <line x1="110" y1="72" x2="110" y2="106" className={guideStyle} />}
          </svg>
        );

      // ======================================================================
      // 11. SALAMBA SARVANGASANA (Supported Shoulderstand) - FULLY REFURBISHED
      // Inverted candle: Elbows & shoulders grounded, hands supporting back,
      // legs straight up to ceiling in vertical 90 degree plumbline.
      // ======================================================================
      case "salamba-sarvangasana":
        return (
          <svg viewBox="0 0 120 140" className={className}>
            <line x1="20" y1="126" x2="100" y2="126" className={groundStyle} />
            {showGuides && <line x1="60" y1="10" x2="60" y2="126" className={guideStyle} />}
            {/* Head flat on mat */}
            <circle cx="44" cy="120" r="7" className={headStyle} />
            {/* Shoulders on mat bearing weight */}
            <circle cx="56" cy="122" r="3" className={highlightPoint} />
            {/* Elbows on mat */}
            <line x1="56" y1="122" x2="74" y2="122" className={bodyStroke} />
            {/* Forearms pointing up, hands supporting mid-back */}
            <line x1="74" y1="122" x2="64" y2="95" className={bodyStroke} />
            {/* Inverted Vertical Torso */}
            <line x1="56" y1="122" x2="60" y2="78" className={bodyStroke} />
            {/* Straight Vertical Legs extending skyward */}
            <line x1="60" y1="78" x2="60" y2="16" className={bodyStroke} strokeWidth="3.5" />
            {/* Pointed Toes */}
            <line x1="60" y1="16" x2="62" y2="10" className={bodyStroke} />
            <circle cx="60" cy="78" r="2.5" className={jointStyle} />
            <circle cx="60" cy="16" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 12. SALAMBA SIRSASANA (Supported Headstand) - FULLY REFURBISHED
      // Crown on mat, forearms forming tripod base, legs vertically stacked.
      // ======================================================================
      case "salamba-sirsasana":
        return (
          <svg viewBox="0 0 120 140" className={className}>
            <line x1="20" y1="128" x2="100" y2="128" className={groundStyle} />
            {showGuides && <line x1="60" y1="10" x2="60" y2="128" className={guideStyle} />}
            {/* Head crown on mat */}
            <circle cx="60" cy="120" r="7.5" className={headStyle} />
            {/* Forearm Tripod Base on ground */}
            <path d="M46 126 L60 126 L74 126" className={bodyStroke} strokeWidth="3.5" />
            <path d="M46 126 L54 104 M74 126 L66 104" className={bodyStroke} />
            {/* Active Shoulders pressing away from ears */}
            <circle cx="54" cy="104" r="2.5" className={jointStyle} />
            <circle cx="66" cy="104" r="2.5" className={jointStyle} />
            {/* Inverted Straight Spine */}
            <line x1="60" y1="104" x2="60" y2="68" className={bodyStroke} />
            {/* Inverted Straight Legs */}
            <line x1="60" y1="68" x2="60" y2="16" className={bodyStroke} strokeWidth="3.5" />
            <line x1="60" y1="16" x2="60" y2="10" className={bodyStroke} />
            <circle cx="60" cy="16" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 13. USTRASANA (Camel Pose) - FULLY REFURBISHED
      // Kneeling 90°, hips forward over knees, chest arched back, hands on heels.
      // ======================================================================
      case "ustrasana":
        return (
          <svg viewBox="0 0 140 130" className={className}>
            <line x1="15" y1="118" x2="125" y2="118" className={groundStyle} />
            {/* Shins & Feet flat on floor */}
            <line x1="44" y1="116" x2="100" y2="116" className={bodyStroke} strokeWidth="3.5" />
            {/* Thighs vertical at 90 degrees */}
            <line x1="44" y1="116" x2="44" y2="74" className={bodyStroke} />
            {/* Hips pushing forward guide */}
            {showGuides && <line x1="44" y1="74" x2="44" y2="116" className={guideStyle} />}
            {/* Deep Backbend Arch of Spine */}
            <path d="M44 74 Q 52 46 72 44" className={bodyStroke} />
            {/* Head tilted back, throat open */}
            <circle cx="78" cy="40" r="7" className={headStyle} />
            {/* Arms reaching back to grasp heels */}
            <path d="M68 50 L94 82 L98 114" className={bodyStroke} />
            <circle cx="44" cy="74" r="2.5" className={jointStyle} />
            <circle cx="98" cy="114" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 14. SUPTA BADDHA KONASANA (Reclining Bound Angle) - FULLY REFURBISHED
      // Lying on back, soles together, knees relaxed open in diamond shape.
      // ======================================================================
      case "supta-baddha-konasana":
        return (
          <svg viewBox="0 0 140 100" className={className}>
            <line x1="10" y1="84" x2="130" y2="84" className={groundStyle} />
            {/* Head relaxed */}
            <circle cx="26" cy="70" r="7" className={headStyle} />
            {/* Spine flat on mat */}
            <line x1="33" y1="74" x2="72" y2="74" className={bodyStroke} />
            {/* Open Arms with receptive palms */}
            <path d="M44 74 L60 56 M44 74 L60 92" className={bodyStroke} />
            {/* Soles touching, Knees dropped open wide in diamond */}
            <path d="M72 74 L92 58 L108 74" className={bodyStroke} strokeWidth="3" />
            <path d="M72 74 L92 90 L108 74" className={bodyStroke} strokeWidth="3" />
            {/* Soles connection point */}
            <circle cx="108" cy="74" r="3" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 15. BALASANA (Child's Pose)
      // Hips on heels, forehead on floor, arms reaching forward in surrender.
      // ======================================================================
      case "balasana":
        return (
          <svg viewBox="0 0 140 80" className={className}>
            <line x1="10" y1="74" x2="130" y2="74" className={groundStyle} />
            <circle cx="36" cy="56" r="7" className={headStyle} />
            <path d="M36 60 Q 64 36 86 52 L94 72" className={bodyStroke} />
            <path d="M42 62 L18 68" className={bodyStroke} />
            <path d="M86 52 L64 72 L94 72" className={bodyStroke} />
            <circle cx="36" cy="56" r="2" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // 16. SAVASANA (Corpse Pose)
      // Supine stillness, arms relaxed, feet falling outward, complete release.
      // ======================================================================
      case "savasana":
        return (
          <svg viewBox="0 0 140 60" className={className}>
            <line x1="10" y1="50" x2="130" y2="50" className={groundStyle} />
            <circle cx="28" cy="34" r="7" className={headStyle} />
            <line x1="35" y1="36" x2="108" y2="36" className={bodyStroke} />
            <path d="M46 38 L82 46" className={bodyStroke} />
            <path d="M108 36 L118 32" className={bodyStroke} />
            <circle cx="28" cy="34" r="2" className={highlightPoint} />
          </svg>
        );

      // ======================================================================
      // DEFAULT FALLBACK
      // ======================================================================
      default:
        return (
          <svg viewBox="0 0 120 120" className={className}>
            <circle cx="60" cy="60" r="44" className="stroke-emerald-500/20 fill-emerald-500/5 stroke-1" />
            <circle cx="60" cy="36" r="8" className={headStyle} />
            <path d="M60 44 L60 80 M42 60 L78 60 M46 100 L60 80 L74 100" className={bodyStroke} />
            <circle cx="60" cy="60" r="3" className={highlightPoint} />
          </svg>
        );
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full transition-transform duration-500 hover:scale-[1.03]">
      {renderVectorFigure()}
    </div>
  );
};
