import { PartComponent, getHeadSideTransform, getHeadSideOffset } from "./common";

export const AccessoryId = [
  "none",
  "roundGlasses",
  "sunglasses",
  "monocle",
  "headphones",
  "aviators",
  "vrHeadset",
  "eyepatch",
  "catEyeGlasses",
  "squareGlasses",
  "smallSunglasses",
  "safetyGoggles",
  "hoops",
  "chunkyHoops",
  "skiGoggles",
  "retroGlasses",
  "browlineGlasses",
  "goldDropEarrings",
  "pinkDropEarrings",
  "pearlNecklace",
  "pearlEarrings",
  "diamondStuds",
  "layeredSilverChains",
  "silverNecklace",
  "goldNecklace",
  "goldHexHoops",
  "goldChain",
  "goldHoopSingle",
] as const;
export type AccessoryId = (typeof AccessoryId)[number];

export const Accessories: Record<AccessoryId, PartComponent> = {
  none: () => null,
  roundGlasses: () => (
    <g>
      <circle cx="35" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="65" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M47 45 H 53" stroke="currentColor" strokeWidth="2" />
      <path d="M23 45 L 10 42" stroke="currentColor" strokeWidth="1.5" />
      <path d="M77 45 L 90 42" stroke="currentColor" strokeWidth="1.5" />
    </g>
  ),
  sunglasses: () => (
    <g>
      <rect x="22" y="38" width="26" height="15" rx="3" fill="currentColor" />
      <rect x="52" y="38" width="26" height="15" rx="3" fill="currentColor" />
      <path d="M48 45 H 52" stroke="currentColor" strokeWidth="2" />
      <path d="M22 42 L 10 38" stroke="currentColor" strokeWidth="2" />
      <path d="M78 42 L 90 38" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  monocle: () => (
    <g>
      <circle cx="70" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M82 45 L 95 63" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    </g>
  ),
  headphones: ({ headId }) => {
    const leftX = getHeadSideOffset(headId, true);
    const rightX = getHeadSideOffset(headId, false);
    return (
      <g>
        <path
          d={`M${10 + leftX} 45 Q ${10 + leftX} 5, 50 5 Q ${90 + rightX} 5, ${90 + rightX} 45`}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <g transform={`translate(${leftX}, 0)`}>
          <rect x="5" y="40" width="12" height="20" rx="4" fill="currentColor" />
        </g>
        <g transform={`translate(${rightX}, 0)`}>
          <rect x="83" y="40" width="12" height="20" rx="4" fill="currentColor" />
        </g>
      </g>
    );
  },
  aviators: () => (
    <g>
      <path d="M20 38 L 46 38 L 44 55 Q 35 60, 22 55 Z" fill="currentColor" />
      <path d="M54 38 L 80 38 L 78 55 Q 65 60, 56 55 Z" fill="currentColor" />
      <path d="M46 42 H 54" stroke="currentColor" strokeWidth="2" />
      <path d="M20 40 L 10 35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M80 40 L 90 35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 42 L 35 45" stroke="white" opacity="0.1" strokeWidth="2" />
    </g>
  ),
  vrHeadset: () => (
    <g>
      <rect x="20" y="35" width="60" height="22" rx="4" fill="currentColor" />
      <rect x="25" y="40" width="50" height="12" rx="2" fill="white" opacity="0.1" />
      <path d="M50 35 V 30 M 35 35 V 32 M 65 35 V 32" stroke="currentColor" strokeWidth="2" />
      <rect x="40" y="44" width="20" height="4" rx="1" fill="#60A5FA" opacity="0.8" />
    </g>
  ),
  eyepatch: ({ headId }) => {
    const leftX = getHeadSideOffset(headId, true) * 0.5;
    const rightX = getHeadSideOffset(headId, false) * 0.5;
    return (
      <g>
        <path d={`M${22 + leftX} 38 L ${78 + rightX} 42`} stroke="currentColor" strokeWidth="2" />
        <rect x="25" y="35" width="20" height="20" rx="4" fill="currentColor" transform="rotate(-5, 35, 45)" />
      </g>
    );
  },
  catEyeGlasses: () => (
    <g>
      <path d="M20 38 Q 35 35, 48 45 L 45 52 Q 35 55, 20 48 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M80 38 Q 65 35, 52 45 L 55 52 Q 65 55, 80 48 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M48 45 H 52" stroke="currentColor" strokeWidth="2" />
      <path d="M20 38 L 10 32 M 80 38 L 90 32" stroke="currentColor" strokeWidth="1.5" />
    </g>
  ),
  retroGlasses: () => (
    <g>
      {/* Large 70s Aviator Frame - Tortoise Shell Color default if currentcolor used appropriately */}
      <path d="M20 35 L 45 35 L 42 55 Q 32 60, 20 52 Z" fill="white" fillOpacity="0.1" stroke="currentColor" strokeWidth="3.5" />
      <path d="M55 35 L 80 35 L 80 52 Q 68 60, 58 55 Z" fill="white" fillOpacity="0.1" stroke="currentColor" strokeWidth="3.5" />
      {/* Double Bridge */}
      <path d="M45 38 H 55" stroke="currentColor" strokeWidth="2.5" />
      <path d="M45 42 H 55" stroke="currentColor" strokeWidth="2" />

      {/* Arms */}
      <path d="M20 38 L 8 40" stroke="currentColor" strokeWidth="2" />
      <path d="M80 38 L 92 40" stroke="currentColor" strokeWidth="2" />

      {/* Reflections */}
      <path d="M22 38 L 40 38" stroke="white" opacity="0.3" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 38 L 76 38" stroke="white" opacity="0.3" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  squareGlasses: () => (
    <g>
      <rect x="22" y="38" width="24" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="54" y="38" width="24" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M46 47 H 54" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  smallSunglasses: () => (
    <g>
      <ellipse cx="32" cy="46" rx="12" ry="6" fill="currentColor" />
      <ellipse cx="68" cy="46" rx="12" ry="6" fill="currentColor" />
      <path d="M44 46 H 56" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  safetyGoggles: () => (
    <g>
      <rect x="18" y="38" width="64" height="20" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M18 48 H 82" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <rect x="15" y="42" width="5" height="12" rx="1" fill="currentColor" />
      <rect x="80" y="42" width="5" height="12" rx="1" fill="currentColor" />
    </g>
  ),
  hoops: ({ headId }) => (
    <g>
      <g transform={getHeadSideTransform(headId, true)}>
        <circle cx="15" cy="60" r="3" fill="none" stroke="#EAB308" strokeWidth="1.5" />
      </g>
      <g transform={getHeadSideTransform(headId, false)}>
        <circle cx="85" cy="60" r="3" fill="none" stroke="#EAB308" strokeWidth="1.5" />
      </g>
    </g>
  ),
  chunkyHoops: ({ headId }) => (
    <g>
      {/* Large Chunky Mustard Hoops - from photo */}
      <g transform={getHeadSideTransform(headId, true)}>
        <circle cx="15" cy="62" r="6" fill="none" stroke="#FBBF24" strokeWidth="3.5" />
        <path d="M 12 58 Q 15 56, 18 58" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        {/* Knitted Texture Left */}
        <g fill="black" opacity="0.12" transform="translate(15, 62)">
          <circle cx="-3" cy="-3" r="0.6" /> <circle cx="0" cy="-4" r="0.6" /> <circle cx="3" cy="-3" r="0.6" />
          <circle cx="-4" cy="0" r="0.6" /> <circle cx="4" cy="0" r="0.6" />
          <circle cx="-3" cy="3" r="0.6" /> <circle cx="0" cy="4" r="0.6" /> <circle cx="3" cy="3" r="0.6" />
        </g>
      </g>
      <g transform={getHeadSideTransform(headId, false)}>
        <circle cx="85" cy="62" r="6" fill="none" stroke="#FBBF24" strokeWidth="3.5" />
        <path d="M 82 58 Q 85 56, 88 58" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        {/* Knitted Texture Right */}
        <g fill="black" opacity="0.12" transform="translate(85, 62)">
          <circle cx="-3" cy="-3" r="0.6" /> <circle cx="0" cy="-4" r="0.6" /> <circle cx="3" cy="-3" r="0.6" />
          <circle cx="-4" cy="0" r="0.6" /> <circle cx="4" cy="0" r="0.6" />
          <circle cx="-3" cy="3" r="0.6" /> <circle cx="0" cy="4" r="0.6" /> <circle cx="3" cy="3" r="0.6" />
        </g>
      </g>
    </g>
  ),
  skiGoggles: ({ secondaryFill, accessoryColorId }) => {
    const LENS_GRADIENTS: Record<string, { start: string; mid1: string; mid2: string; end: string }> = {
      fire: { start: "#F472B6", mid1: "#FB923C", mid2: "#FBBF24", end: "#C026D3" },
      electric: { start: "#6366F1", mid1: "#22D3EE", mid2: "#14B8A6", end: "#3B82F6" },
      emerald: { start: "#22C55E", mid1: "#84CC16", mid2: "#FACC15", end: "#10B981" },
      nebula: { start: "#A855F7", mid1: "#EC4899", mid2: "#8B5CF6", end: "#6366F1" },
      solar: { start: "#F97316", mid1: "#EF4444", mid2: "#FBBF24", end: "#F59E0B" },
      chrome: { start: "#E2E8F0", mid1: "#94A3B8", mid2: "#CBD5E1", end: "#64748B" },
      obsidian: { start: "#475569", mid1: "#1A1A1A", mid2: "#000000", end: "#334155" },
    };

    const gradient = LENS_GRADIENTS[accessoryColorId || "electric"] || LENS_GRADIENTS.electric;
    const gradientId = `skiGogglesGradient-${accessoryColorId || "default"}`;

    return (
      <g>
        {/* Define gradient */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient.start} />
            <stop offset="35%" stopColor={gradient.mid1} />
            <stop offset="65%" stopColor={gradient.mid2} />
            <stop offset="100%" stopColor={gradient.end} />
          </linearGradient>
        </defs>

        {/* Thick strap */}
        <rect x="0" y="40" width="100" height="12" fill={"#1A1A1A"} opacity="0.8" />

        {/* Premium Protective Frame */}
        <path
          d="M8 35 Q 8 28, 20 28 H 80 Q 92 28, 92 35 V 55 Q 92 62, 80 62 H 58 L 50 52 L 42 62 H 20 Q 8 62, 8 55 Z"
          fill={"#1A1A1A"}
          stroke="black"
          strokeWidth="1"
        />

        {/* High-Performance Mirror Lens with Gradient */}
        <path
          d="M12 38 Q 12 32, 22 32 H 78 Q 88 32, 88 38 V 52 Q 88 58, 78 58 H 56 L 50 48 L 44 58 H 22 Q 12 58, 12 52 Z"
          fill={`url(#${gradientId})`}
          opacity="0.95"
        />

        {/* Layered subtle base color for depth */}
        <path
          d="M12 38 Q 12 32, 22 32 H 78 Q 88 32, 88 38 V 52 Q 88 58, 78 58 H 56 L 50 48 L 44 58 H 22 Q 12 58, 12 52 Z"
          fill={secondaryFill}
          opacity="0.15"
        />

        {/* Enhanced Reflection Highlights - top arc */}
        <path d="M16 36 Q 50 32, 84 36" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.25" />
        <path d="M20 38 Q 50 35, 80 38" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.15" />

        {/* Left side reflections */}
        <path d="M16 42 L 32 40" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
        <path d="M16 47 L 28 45" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.15" />

        {/* Right side subtle reflection */}
        <path d="M84 42 L 70 40" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

        {/* Center shine */}
        <ellipse cx="50" cy="42" rx="12" ry="6" fill="white" opacity="0.08" />
      </g>
    );
  },
  browlineGlasses: () => (
    <g transform="translate(50, 45)">
      {/* Thick Top Frame */}
      <path
        d="M-28 -4.5 C-25 -7, -15 -7, -8 -4 L-4 -3.5 C 4 -3.5, 4 -3.5, 8 -4 C 15 -7, 25 -7, 28 -4.5 L 29 0 Q 25 -1, 20 0 L -20 0 Q -25 -1, -29 0 Z"
        fill="#1e293b"
        stroke="black"
        strokeWidth="1"
      />
      {/* Thin Bottom Metal Rim */}
      <path d="M-28 -5 Q-30 15, -15 15 Q-5 15, -4 -4" fill="rgba(59, 130, 246, 0.1)" stroke="#94a3b8" strokeWidth="0.8" />
      <path d="M 28 -5 Q 30 15, 15 15 Q 5 15, 4 -4" fill="rgba(59, 130, 246, 0.1)" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Nose Bridge */}
      <path d="M-4 -4 Q 0 -6, 4 -4" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      {/* Lense Shine */}
      <path d="M-24 2 L-18 6 M 18 2 L 24 6" stroke="white" opacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  goldDropEarrings: ({ headId }) => (
    <g>
      <g transform={getHeadSideTransform(headId, true)}>
        {/* Simple Gold Drop */}
        <line x1="15" y1="58" x2="15" y2="65" stroke="#FBBF24" strokeWidth="1" />
        <circle cx="15" cy="66" r="2.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5" />
        <circle cx="15" cy="66" r="1" fill="white" opacity="0.4" />
      </g>
      <g transform={getHeadSideTransform(headId, false)}>
        {/* Simple Gold Drop */}
        <line x1="85" y1="58" x2="85" y2="65" stroke="#FBBF24" strokeWidth="1" />
        <circle cx="85" cy="66" r="2.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5" />
        <circle cx="85" cy="66" r="1" fill="white" opacity="0.4" />
      </g>
    </g>
  ),
  pinkDropEarrings: ({ headId }) => (
    <g>
      <g transform={getHeadSideTransform(headId, true)}>
        {/* Pink Feather/Fringe Drop */}
        <line x1="15" y1="58" x2="15" y2="62" stroke="#F9A8D4" strokeWidth="1" />
        <path d="M12 62 L 18 62 L 15 72 Z" fill="#FBCFE8" stroke="#F472B6" strokeWidth="0.5" />
      </g>
      <g transform={getHeadSideTransform(headId, false)}>
        {/* Pink Feather/Fringe Drop */}
        <line x1="85" y1="58" x2="85" y2="62" stroke="#F9A8D4" strokeWidth="1" />
        <path d="M82 62 L 88 62 L 85 72 Z" fill="#FBCFE8" stroke="#F472B6" strokeWidth="0.5" />
      </g>
    </g>
  ),
  pearlNecklace: () => (
    <g transform="translate(50, 95)">
      {/* Necklace Curve */}
      <path d="M-22 -10 Q 0 10, 22 -10" fill="none" stroke="none" id="necklacePath" />
      <g fill="#FDFCF8" stroke="#E5E5E5" strokeWidth="0.3">
        {/* Many small pearls */}
        {[-22, -19, -16, -13, -10, -7, -4, -1.5, 1.5, 4, 7, 10, 13, 16, 19, 22].map((x) => {
          const y = Math.pow(x / 7, 2) - 8; // Curved parabola for pearls
          return <circle key={x} cx={x} cy={y} r="1.6" />;
        })}
      </g>
    </g>
  ),
  pearlEarrings: ({ headId }) => (
    <g>
      <g transform={getHeadSideTransform(headId, true)}>
        <circle cx="15" cy="58" r="2.5" fill="#FDFCF8" stroke="#E5E5E5" strokeWidth="0.5" />
        <circle cx="14.5" cy="57.5" r="0.8" fill="white" opacity="0.6" />
      </g>
      <g transform={getHeadSideTransform(headId, false)}>
        <circle cx="85" cy="58" r="2.5" fill="#FDFCF8" stroke="#E5E5E5" strokeWidth="0.5" />
        <circle cx="84.5" cy="57.5" r="0.8" fill="white" opacity="0.6" />
      </g>
    </g>
  ),
  diamondStuds: ({ headId }) => (
    <g>
      <g transform={getHeadSideTransform(headId, true)}>
        <circle cx="15" cy="58" r="2.2" fill="white" stroke="#CBD5E1" strokeWidth="0.5" />
        <circle cx="14.5" cy="57.2" r="1.2" fill="white" />
        <circle cx="15.2" cy="58.5" r="0.6" fill="#60A5FA" opacity="0.3" />
      </g>
      <g transform={getHeadSideTransform(headId, false)}>
        <circle cx="85" cy="58" r="2.2" fill="white" stroke="#CBD5E1" strokeWidth="0.5" />
        <circle cx="84.5" cy="57.2" r="1.2" fill="white" />
        <circle cx="85.2" cy="58.5" r="0.6" fill="#60A5FA" opacity="0.3" />
      </g>
    </g>
  ),
  layeredSilverChains: () => (
    <g transform="translate(50, 95)">
      {/* Top tight chain */}
      <path d="M -18 -12 Q 0 0, 18 -12" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
      <path d="M -16 -10 Q 0 -2, 16 -10" fill="none" stroke="white" opacity="0.3" strokeWidth="1" />

      {/* Middle Diamond Tennis Necklace */}
      <path d="M -22 -6 Q 0 12, 22 -6" fill="none" stroke="none" id="tennisPath" />
      <g fill="white" stroke="#CBD5E1" strokeWidth="0.3">
        {[-22, -18, -14, -10, -6, -2, 2, 6, 10, 14, 18, 22].map((x) => {
          const y = Math.pow(x / 6, 2) - 6;
          return (
            <g key={x}>
              <rect x={x - 1} y={y - 1} width="2" height="2" rx="0.5" />
              <rect x={x - 0.5} y={y - 0.5} width="1" height="1" rx="0.2" fill="white" opacity="0.8" />
            </g>
          );
        })}
      </g>

      {/* Bottom long chain with Padlock */}
      <path d="M -25 -2 Q 0 25, 25 -2" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" />
      {/* Padlock Charm */}
      <g transform="translate(-10, 18) rotate(-5)">
        <rect x="-2.5" y="0" width="5" height="4" rx="1" fill="#94A3B8" />
        <path d="M -1.5 0 V -2 A 1.5 1.5 0 0 1 1.5 0" fill="none" stroke="#64748B" strokeWidth="1" />
      </g>
      {/* Ball Charm */}
      <circle cx="12" cy="15" r="3" fill="#94A3B8" />
      <circle cx="11" cy="14" r="1" fill="white" opacity="0.4" />
    </g>
  ),
  silverNecklace: () => (
    <g transform="translate(50, 95)">
      {/* Silver Chain */}
      <path d="M -15 -8 Q 0 8, 15 -8" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Circular Charm */}
      <g transform="translate(0, 7)">
        <circle r="4.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
        {/* Letter B */}
        <text x="0" y="1.5" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#475569" fontFamily="Arial, sans-serif">
          B
        </text>
      </g>
    </g>
  ),
  goldNecklace: () => (
    <g transform="translate(50, 95)">
      {/* Gold Chain */}
      <path d="M -15 -8 Q 0 8, 15 -8" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
      {/* Circular Charm with A initial - Gold Style */}
      <g transform="translate(0, 7)">
        <circle r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5" />
        {/* Letter A with diamonds/studs */}
        <text x="0" y="2" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#FFFBEB" fontFamily="serif">
          A
        </text>
        {/* Decorative dots around/on the letter */}
        <circle cx="-2" cy="0" r="0.4" fill="white" opacity="0.8" />
        <circle cx="2" cy="0" r="0.4" fill="white" opacity="0.8" />
        <circle cx="0" cy="-2.5" r="0.4" fill="white" opacity="0.8" />
        {/* Shine */}
        <circle cx="-2" cy="-2" r="1" fill="white" opacity="0.2" />
      </g>
    </g>
  ),
  goldHexHoops: ({ headId }) => (
    <g>
      {/* Left side hexagon hoop */}
      <g transform={getHeadSideTransform(headId, true)}>
        <path
          d="M 12 55 L 8 58 L 8 64 L 12 67 L 16 64 L 16 58 Z"
          fill="none"
          stroke="#DBB353"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="55.5" r="0.8" fill="white" opacity="0.3" />
      </g>
      {/* Right side hexagon hoop */}
      <g transform={getHeadSideTransform(headId, false)}>
        <path
          d="M 88 55 L 84 58 L 84 64 L 88 67 L 92 64 L 92 58 Z"
          fill="none"
          stroke="#DBB353"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="88" cy="55.5" r="0.8" fill="white" opacity="0.3" />
      </g>
    </g>
  ),
  goldChain: () => (
    <g transform="translate(50, 95)">
      {/* Gold Chain Curve */}
      <path d="M-20-10 Q 0 12, 20-10" fill="none" stroke="#D97706" strokeWidth="2.5" />
      <path d="M-18-9 Q 0 10, 18-9" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.6" />
      {/* Subtle link texture */}
      <path d="M-20-10 Q 0 12, 20-10" fill="none" stroke="black" opacity="0.1" strokeWidth="2.5" strokeDasharray="2 1" />
    </g>
  ),
  goldHoopSingle: ({ headId }) => (
    <g>
      {/* Right side single gold hoop (viewer's left) */}
      <g transform={getHeadSideTransform(headId, true)}>
        <circle cx="15" cy="58" r="4" fill="none" stroke="#D97706" strokeWidth="2" />
        <circle cx="15" cy="58" r="4" fill="none" stroke="#FBBF24" strokeWidth="0.8" opacity="0.5" />
      </g>
    </g>
  ),
};

// Metadata for items
Accessories.skiGoggles.colors = ["fire", "electric", "emerald", "nebula", "solar", "chrome", "obsidian"];
