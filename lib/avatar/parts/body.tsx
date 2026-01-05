import { PartRegistry, PartComponent } from "./common";

export const BodyId = [
  "bareShoulders",
  "basicWhiteTee",
  "basicBlackTee",
  "whiteRibbedTank",
  "greyRibbedTank",
  "whiteStrappyTank",
  "blueStrappyTank",
  "redRibbedTop",
  "blackElegantTop",
  "floralBlouse",
  "heartSweater",
  "pinkHeartSweater",
  "houndstoothPurpShirt",
  "blueLeopardTop",
  "featherCuffBlouse",
  "blueShinyShirt",
  "blackHoodie",
  "hoodieUnderJacket",
  "sweatshirtOverShirt",
  "denimShirtButtoned",
  "knitSweater",
  "redBlazer",
  "stripedBlazer",
  "blackPufferJacket",
  "darkGreenFuzzyCoat",
  "yellowFuzzySet",
  "pinkLatexDress",
  "pajamas",
  "blueShirtBlackCardigan",
] as const;
export type BodyId = (typeof BodyId)[number];

const basicWhiteTee: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Plain White Tee */}
    <path
      d="M-38 0 Q-42 15, -45 40 L 45 40 Q 42 15, 38 0 L 16 -8 Q 0 -3, -16 -8 Z"
      fill="white"
      stroke="#e2e8f0"
      strokeWidth="2"
    />
    {/* Subtle creases / fabric lines */}
    <path
      d="M-28 15 Q-15 20, -10 35 M 28 15 Q 15 20, 10 35"
      fill="none"
      stroke="#e2e8f0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M-16 -8 Q 0 -4, 16 -8" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const basicBlackTee: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Basic Black Crew Neck */}
    <path
      d="M-35 2 Q -38 15, -42 40 L 42 40 Q 38 15, 35 2 L 20 -4 Q 0 0, -20 -4 Z"
      fill="#171717"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Subtle collar edge shadow */}
    <path d="M-20 -4 Q 0 0, 20 -4" fill="none" stroke="white" opacity="0.08" strokeWidth="2.5" strokeLinecap="round" />
    {/* Soft folds */}
    <path d="M-25 15 Q-20 25, -22 35 M 25 15 Q 20 25, 22 35" fill="none" stroke="white" opacity="0.05" strokeWidth="2.5" />
  </g>
);

const pajamas: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Main Base */}
    <path d="M-36 10 Q -36 0, -20 -5 L 20 -5 Q 36 0, 36 10 V 30 H -36 Z" fill="white" stroke="black" strokeWidth="1.5" />
    {/* Red Piping / Collar */}
    <path d="M-15 -5 L 0 5 L 15 -5" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <path d="M0 5 V 30" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.5" />
    {/* Pattern - Simple red dots or skiers like in photo */}
    <g opacity="0.8">
      <circle cx="-25" cy="5" r="1.5" fill="#EF4444" />
      <circle cx="-15" cy="15" r="1.5" fill="#EF4444" />
      <circle cx="-28" cy="20" r="1.5" fill="#EF4444" />
      <circle cx="25" cy="5" r="1.5" fill="#EF4444" />
      <circle cx="15" cy="15" r="1.5" fill="#EF4444" />
      <circle cx="28" cy="20" r="1.5" fill="#EF4444" />
    </g>
  </g>
);

const heartSweater: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Creamy White Sweater Base */}
    <path d="M-38 10 Q -38 0, -22 -5 L 22 -5 Q 38 0, 38 10 V 30 H -38 Z" fill="#FDFBF7" stroke="#1a1a1a" strokeWidth="1.5" />
    {/* Red Collar Trim */}
    <path d="M-15 -5 Q 0 8, 15 -5" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />

    {/* Heart Pattern */}
    <g fill="#EF4444" opacity="0.9">
      {/* Heart shape function */}
      <defs>
        <path id="heart" d="M0 2 Q -2 0, -4 2 Q -6 6, 0 10 Q 6 6, 4 2 Q 2 0, 0 2" transform="scale(0.4)" />
      </defs>

      <use href="#heart" x="-25" y="5" />
      <use href="#heart" x="-10" y="15" />
      <use href="#heart" x="10" y="15" />
      <use href="#heart" x="25" y="5" />
      <use href="#heart" x="0" y="22" />
      <use href="#heart" x="-30" y="25" />
      <use href="#heart" x="30" y="25" />
    </g>

    {/* Knitted Texture */}
    <path d="M-35 5 H 35 M -35 15 H 35 M -35 25 H 35" stroke="black" opacity="0.05" strokeWidth="0.5" />
  </g>
);

const floralBlouse: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Black Blouse Base */}
    {/* Using the slimmer silhouette */}
    <path d="M-36 10 Q -36 0, -20 -5 L 20 -5 Q 36 0, 36 10 V 30 H -36 Z" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />

    {/* V-Neckline */}
    <path d="M-15 -5 Q 0 10, 15 -5" fill="none" stroke="#e0e0e0" strokeWidth="1" opacity="0.1" />

    {/* Floral Pattern */}
    <g opacity="0.9">
      {/* Flower Definition */}
      <defs>
        <g id="flower-yellow">
          <circle r="2.5" fill="#FBBF24" />
          <circle r="1" fill="#FFF" opacity="0.5" />
        </g>
        <g id="flower-pink">
          <circle r="2.5" fill="#EC4899" />
          <circle r="1" fill="#FFF" opacity="0.3" />
        </g>
        <path id="leaf" d="M0 0 Q 3 -3, 6 0 Q 3 3, 0 0" fill="#4ADE80" />
      </defs>

      <use href="#flower-yellow" x="-20" y="5" />
      <use href="#leaf" x="-18" y="7" transform="rotate(45, -18, 7)" />

      <use href="#flower-pink" x="-10" y="15" />
      <use href="#leaf" x="-8" y="13" transform="rotate(-45, -8, 13)" />

      <use href="#flower-yellow" x="15" y="8" />
      <use href="#leaf" x="12" y="10" transform="rotate(90, 12, 10)" />

      <use href="#flower-pink" x="25" y="20" />
      <use href="#leaf" x="28" y="18" transform="rotate(180, 28, 18)" />

      <use href="#flower-yellow" x="0" y="25" />
      <use href="#flower-pink" x="-30" y="22" />
    </g>
  </g>
);

const sweatshirtOverShirt: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* --- LAYER 1: The Undershirt & Tie --- */}
    {/* White Oxford Collar - Crisp & Angular */}
    <path d="M-12 -6 L -15 2 L -5 4 L 0 0 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
    <path d="M 12 -6 L  15 2 L  5 4 L 0 0 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
    {/* Back of collar */}
    <path d="M-12 -6 L 12 -6 L 0 -2 Z" fill="#E2E8F0" />
    {/* The Tie - Repp Stripe (Burgundy/Gold) */}
    <path d="M-3 0 L 3 0 L 4 8 L 0 10 L -4 8 Z" fill="#7F1D1D" /> {/* Knot */}
    <path d="M-4 8 L 4 8 L 5 25 L -5 25 Z" fill="#991B1B" /> {/* Body */}
    {/* Gold Stripes on Tie */}
    <path d="M-4 12 L 4 10 M -4 18 L 4 16" stroke="#FBBF24" strokeWidth="0.5" opacity="0.8" />
    {/* --- LAYER 2: The Sweatshirt (Deep Navy) --- */}
    {/* Main Body - rounded, relaxed fit */}
    <path
      d="M-42 10 Q -46 -2, -32 -6 Q -20 -9, -16 -2 Q 0 8, 16 -2 Q 20 -9, 32 -6 Q 46 -2, 42 10 L 40 40 H -40 Z"
      fill="#172554"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    {/* --- LAYER 3: Texture & Lighting --- */}
    {/* Subtle Noise/Grain (Simulated with specks) */}
    <g fill="#3B82F6" opacity="0.05">
      <circle cx="-30" cy="10" r="0.5" /> <circle cx="-20" cy="20" r="0.5" />
      <circle cx="30" cy="15" r="0.5" /> <circle cx="10" cy="30" r="0.5" />
      <circle cx="0" cy="15" r="0.5" /> <circle cx="-10" cy="35" r="0.5" />
    </g>
    {/* Deep Shadows (Folds) */}
    <path d="M-32 5 Q -25 15, -28 30" fill="none" stroke="#000" opacity="0.2" strokeWidth="2" strokeLinecap="round" />
    <path d="M 32 5 Q  25 15,  28 30" fill="none" stroke="#000" opacity="0.2" strokeWidth="2" strokeLinecap="round" />
    {/* Highlights (Top of shoulders) */}
    <path d="M-35 -2 Q -25 -4, -18 -2" fill="none" stroke="white" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
    <path d="M 35 -2 Q  25 -4,  18 -2" fill="none" stroke="white" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
    {/* --- LAYER 4: Ribbing --- */}
    {/* Thick Crew Neck Ribbing */}
    <path d="M-16 -2 Q 0 9, 16 -2 L 16 3 Q 0 14, -16 3 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="0.5" />
    {/* Vertical Rib lines */}
    <g stroke="#60A5FA" strokeWidth="0.5" opacity="0.2">
      {[-12, -8, -4, 0, 4, 8, 12].map((x) => (
        <path key={x} d={`M${x} 0 V 6`} />
      ))}
    </g>
    {/* --- LAYER 5: The "Extraordinary" Detail --- */}
    {/* Chenille "F" Patch with Fuzzy Edge */}
    <g transform="translate(-20, 18) rotate(-5)">
      {/* Felt Backing */}
      <circle r="9" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />

      {/* The Letter "F" */}
      <text x="0" y="3" fontSize="12" fontWeight="900" fill="#DC2626" textAnchor="middle" fontFamily="serif">
        F
      </text>

      {/* "Fuzzy" Chenille Stitch Effect */}
      {/* We use a dashed stroke to simulate the tufts of yarn */}
      <text
        x="0"
        y="3"
        fontSize="12"
        fontWeight="900"
        fill="none"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeDasharray="0.5 0.5"
        textAnchor="middle"
        fontFamily="serif"
        opacity="0.8"
      >
        F
      </text>
      {/* Gold Border Stitching around patch */}
      <circle r="8.5" fill="none" stroke="#FBBF24" strokeWidth="0.8" strokeDasharray="1 1" />
    </g>
    {/* Gold Enamel Pin on Right Side */}
    <g transform="translate(25, 12)">
      <circle r="2.5" fill="#FBBF24" stroke="#B45309" strokeWidth="0.5" />
      <path d="M-1 -1 L 1 1 M 1 -1 L -1 1" stroke="#F59E0B" strokeWidth="0.5" /> {/* Sparkle */}
    </g>
  </g>
);

const featherCuffBlouse: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* White Satin Blouse */}
    <path
      d="M-35 0 Q -38 15, -45 40 L 45 40 Q 38 15, 35 0 L 15 -6 Q 0 -2, -15 -6 Z"
      fill="#F8FAFC"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Subtle sheen */}
    <path d="M-28 5 Q -25 20, -30 35" fill="none" stroke="white" strokeWidth="4" opacity="0.8" />

    {/* Feather Cuffs at the bottom edge (simulating wrists) */}
    <g transform="translate(-40, 35)">
      <path d="M-5 0 Q -2 -10, 2 -2 Q 5 -12, 8 -3 Q 12 -10, 15 0" fill="white" stroke="currentColor" strokeWidth="1" />
      <path d="M-3 -2 Q 0 -7, 4 -3" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1" />
    </g>
    <g transform="translate(40, 35) scale(-1, 1)">
      <path d="M-5 0 Q -2 -10, 2 -2 Q 5 -12, 8 -3 Q 12 -10, 15 0" fill="white" stroke="currentColor" strokeWidth="1" />
      <path d="M-3 -2 Q 0 -7, 4 -3" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1" />
    </g>

    {/* V-neck / Button detail */}
    <path d="M-15 -6 L 0 4 L 15 -6" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="0" cy="12" r="2" fill="white" stroke="currentColor" strokeWidth="1" />
    <circle cx="0" cy="22" r="2" fill="white" stroke="currentColor" strokeWidth="1" />
  </g>
);

const hoodieUnderJacket: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Dark Jacket */}
    <path
      d="M-38 2 Q-42 15, -45 40 L 45 40 Q 42 15, 38 2 L 25 -4 Q 0 0, -25 -4 Z"
      fill="#1a1a1a"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Gray Hoodie Layer */}
    <path d="M-22 -4 Q 0 4, 22 -4 L 18 15 Q 0 22, -18 15 Z" fill="#94a3b8" stroke="currentColor" strokeWidth="1.5" />
    {/* Visible Hood behind head */}
    <path d="M-25 -4 C-35 -15, 35 -15, 25 -4" fill="#94a3b8" stroke="currentColor" strokeWidth="2" />
    {/* Hoodie Strings */}
    <path d="M-5 8 L-6 22 M 5 8 L 6 22" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="-6" cy="24" r="1.2" fill="#cbd5e1" />
    <circle cx="6" cy="24" r="1.2" fill="#cbd5e1" />

    {/* Jacket Zipper/Edge */}
    <path d="M-8 0 L-10 40 M 8 0 L 10 40" fill="none" stroke="white" opacity="0.1" strokeWidth="2" />
  </g>
);

const houndstoothPurpShirt: PartComponent = () => (
  <g transform="translate(50, 92)">
    <defs>
      <pattern id="houndstooth" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="white" />
        <path d="M 0 0 L 5 0 L 5 5 L 0 5 Z M 5 5 L 10 5 L 10 10 L 5 10 Z" fill="#7C3AED" />
        <path d="M 0 5 L 2.5 5 L 5 2.5 L 5 0 Z M 5 10 L 7.5 10 L 10 7.5 L 10 5 Z" fill="#7C3AED" />
      </pattern>
    </defs>
    {/* Shirt Mass */}
    <path
      d="M-38 0 Q-40 15, -45 40 L 45 40 Q 40 15, 38 0 L 15 -6 Q 0 -2, -15 -6 Z"
      fill="url(#houndstooth)"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Collar Detail */}
    <path d="M-15 -6 L 0 2 L 15 -6" fill="none" stroke="currentColor" strokeWidth="2" />
    {/* Shadow under neck */}
    <path d="M-15 -6 Q 0 -2, 15 -6" fill="rgba(0,0,0,0.1)" stroke="none" />
  </g>
);

const denimShirtButtoned: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Denim Shirt Mass */}
    <path
      d="M-38 0 Q-40 15, -45 40 L 45 40 Q 40 15, 38 0 L 15 -6 Q 0 -2, -15 -6 Z"
      fill="#4B6A9B"
      stroke="#2D4367"
      strokeWidth="2"
    />
    {/* Denim Texture / Creases */}
    <path
      d="M-25 10 Q-15 15, -10 35 M 25 10 Q 15 15, 10 35"
      fill="none"
      stroke="#2D4367"
      opacity="0.3"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Button Placket */}
    <path d="M 0 -2 V 40" fill="none" stroke="#2D4367" opacity="0.4" strokeWidth="6" />
    <path d="M 0 -2 V 40" fill="none" stroke="#60A5FA" opacity="0.1" strokeWidth="2" />
    {/* Buttons */}
    <circle cx="0" cy="10" r="1.5" fill="#E2E8F0" />
    <circle cx="0" cy="22" r="1.5" fill="#E2E8F0" />
    <circle cx="0" cy="34" r="1.5" fill="#E2E8F0" />
    {/* Collar */}
    <path d="M-15 -6 L 0 3 L 15 -6" fill="#4B6A9B" stroke="#2D4367" strokeWidth="2" />
    <path d="M-15 -6 Q 0 -2, 15 -6" fill="rgba(0,0,0,0.15)" stroke="none" />
  </g>
);

const knitSweater: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Beige/Taupe Knit Sweater Base */}
    <path d="M-38 10 Q -38 0, -22 -5 L 22 -5 Q 38 0, 38 10 V 30 H -38 Z" fill="#C8B6A6" stroke="#5D4037" strokeWidth="1.5" />
    {/* Ribbed Collar */}
    <path d="M-15 -5 Q 0 8, 15 -5" fill="none" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M-15 -5 Q 0 8, 15 -5" fill="none" stroke="#EFEBE9" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />

    {/* Knitted Texture */}
    <g stroke="#5D4037" opacity="0.1" strokeWidth="0.5">
      <path d="M-35 5 H 35" />
      <path d="M-36 10 H 36" />
      <path d="M-36 15 H 36" />
      <path d="M-36 20 H 36" />
      <path d="M-36 25 H 36" />
    </g>

    {/* Cable knit detail (center) */}
    <path d="M -5 5 Q 0 10, 5 5 Q 0 15, -5 20 Q 0 25, 5 20" fill="none" stroke="#5D4037" opacity="0.1" strokeWidth="1" />
  </g>
);

const redRibbedTop: PartComponent = () => (
  <g transform="translate(50, 94)">
    {/* Red Ribbed Top - Tighter Crew/Mock Neck - Fixed Shoulders */}
    <path
      d="M-36 8 Q -38 20, -40 40 L 40 40 Q 38 20, 36 8 L 15 -5 Q 0 0, -15 -5 Z"
      fill="#DC2626"
      stroke="#991B1B"
      strokeWidth="1.5"
    />

    {/* Texture - Vertical Ribbing */}
    <g stroke="#991B1B" opacity="0.2" strokeWidth="0.5">
      <path d="M-30 5 V 40" />
      <path d="M-20 5 V 40" />
      <path d="M-10 0 V 40" />
      <path d="M0 5 V 40" />
      <path d="M10 0 V 40" />
      <path d="M20 5 V 40" />
      <path d="M30 5 V 40" />
    </g>

    {/* Neckline Hems */}
    <path d="M-15 -5 Q 0 2, 15 -5" fill="none" stroke="#991B1B" strokeWidth="1.5" opacity="0.5" />
  </g>
);

const blueShinyShirt: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Deep Blue Satin Shirt */}
    <path
      d="M-38 0 Q-40 15, -45 40 L 45 40 Q 40 15, 38 0 L 15 -6 Q 0 -2, -15 -6 Z"
      fill="#1E3A8A"
      stroke="#172554"
      strokeWidth="1.5"
    />
    {/* Satin sheen reflection */}
    <path
      d="M-28 10 Q -25 25, -30 38 M 28 10 Q 25 25, 30 38"
      fill="none"
      stroke="#3B82F6"
      opacity="0.3"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Collar */}
    <path d="M-15 -6 L 0 5 L 15 -6" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
    <path d="M-15 -6 L -5 0 M 15 -6 L 5 0" stroke="#3B82F6" opacity="0.2" strokeWidth="1" />
  </g>
);

const blackElegantTop: PartComponent = () => (
  <g transform="translate(50, 91)">
    {/* Black Elegant Top - Adjusted for better fit */}
    <path
      d="M-36 8 Q -40 20, -42 40 L 42 40 Q 40 20, 36 8 L 25 0 Q 0 12, -25 0 Z"
      fill="#171717"
      stroke="#000000"
      strokeWidth="1.5"
    />
    {/* Subtle shine/lighting */}
    <path d="M-20 2 Q 0 14, 20 2" fill="none" stroke="#404040" opacity="0.3" strokeWidth="1" />
  </g>
);

const redBlazer: PartComponent = () => (
  <g transform="translate(50, 92)">
    {/* Red Blazer Jacket */}
    <path
      d="M-38 0 L -45 15 L -45 40 L 45 40 L 45 15 L 38 0 L 15 -6 L -15 -6 Z"
      fill="#DC2626"
      stroke="#991B1B"
      strokeWidth="1.5"
    />
    {/* Lapels */}
    <path d="M-15 -6 L -5 15 L -20 15 L -15 -6 Z" fill="#B91C1C" stroke="#991B1B" strokeWidth="1" />
    <path d="M 15 -6 L  5 15 L  20 15 L  15 -6 Z" fill="#B91C1C" stroke="#991B1B" strokeWidth="1" />
    {/* Inner Shirt (Black) */}
    <path d="M-5 15 L 0 25 L 5 15 L 0 -6 Z" fill="#171717" />
    {/* Buttons / Details */}
    <circle cx="0" cy="30" r="1.5" fill="#991B1B" />
    <path d="M-45 15 L -35 40 M 45 15 L 35 40" stroke="#991B1B" opacity="0.2" strokeWidth="1" />
  </g>
);

const whiteRibbedTank: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Bare Shoulders/Skin Base */}
    <path d="M-36 10 Q -36 0, -20 -5 L 20 -5 Q 36 0, 36 10 V 20 H -36 Z" fill={skinTone || "#F5D0C5"} stroke="none" />

    {/* White Ribbed Tank Top */}
    <g>
      {/* Refined Tank Shape */}
      <path
        d="M-28 40 L -24 0 Q -20 -5, -16 -5 H -8 Q -10 15, -10 20 Q 0 25, 10 20 Q 10 15, 8 -5 H 16 Q 20 -5, 24 0 L 28 40 H -28 Z"
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth="1.5"
      />

      {/* Ribbed Texture */}
      <g stroke="#D4D4D4" strokeWidth="0.5" opacity="0.4">
        <path d="M-20 0 V 40" />
        <path d="M-15 0 V 40" />
        <path d="M-5 20 V 40" />
        <path d="M0 22 V 40" />
        <path d="M5 20 V 40" />
        <path d="M15 0 V 40" />
        <path d="M20 0 V 40" />
      </g>
    </g>
  </g>
);

const blackPufferJacket: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* 1. Underlying Skin/Chest */}
    <path d="M-20 -5 Q 0 0, 20 -5 L 20 25 H -20 Z" fill={skinTone || "#F5D0C5"} stroke="none" />

    {/* 2. Lace / Sheer Black Top */}
    <g opacity="0.8">
      <path d="M-20 -5 Q 0 0, 20 -5 L 18 30 H -18 Z" fill="#171717" />
      {/* Lace details (crosshatch) */}
      <path d="M-15 0 L 15 20 M 15 0 L -15 20" stroke="#333" strokeWidth="0.5" opacity="0.5" />
      <path d="M-15 10 L 15 30 M 15 10 L -15 30" stroke="#333" strokeWidth="0.5" opacity="0.5" />
    </g>

    {/* 3. Black Puffer Jacket - Redesigned for volume */}
    <g stroke="#000" strokeWidth="1.5" fill="#111">
      {/* Left Collar/Shoulder */}
      <path d="M-45 15 Q-48 5, -35 -5 Q -25 -8, -18 -2 L -20 40 L -45 15 Z" />
      {/* Right Collar/Shoulder */}
      <path d="M45 15 Q 48 5, 35 -5 Q 25 -8, 18 -2 L 20 40 L 45 15 Z" />

      {/* Puffer Segments (Horizontal contours) */}
      <path d="M-46 15 Q -30 20, -20 18" stroke="#333" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M-46 25 Q -30 30, -21 28" stroke="#333" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M46 15 Q 30 20, 20 18" stroke="#333" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M46 25 Q 30 30, 21 28" stroke="#333" strokeWidth="1" opacity="0.3" fill="none" />
    </g>
  </g>
);

const pinkLatexDress: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 94)">
    {/* 1. Underlying Skin Base - Wider coverage for the deep scoop */}
    <path
      d="M-36 10 L -36 0 Q -25 -6, -15 -6 L 15 -6 Q 25 -6, 36 0 L 36 10 V 25 H -36 Z"
      fill={skinTone || "#D1A384"}
      stroke="none"
    />

    {/* 2. Hot Pink Latex Dress */}
    <g>
      {/* Main Bodice - Deep Scoop Neck */}
      <path
        d="M-30 40 L -28 0 Q -20 -6, -14 -6 L -8 -6 Q -10 10, -10 15 Q 0 25, 10 15 Q 10 10, 8 -6 L 14 -6 Q 20 -6, 28 0 L 30 40 H -30 Z"
        fill="#EC4899"
        stroke="#BE185D"
        strokeWidth="1.5"
      />

      {/* Latex Glossy Highlights - UPDATED POSITIONS */}
      <ellipse cx="-12" cy="18" rx="5" ry="7" fill="white" opacity="0.3" transform="rotate(-15, -12, 18)" />
      <ellipse cx="12" cy="18" rx="5" ry="7" fill="white" opacity="0.3" transform="rotate(15, 12, 18)" />

      {/* Collarbone/Chest shine (skin) */}
      <path d="M-15 0 Q 0 4, 15 0" fill="none" stroke="white" opacity="0.2" strokeWidth="2" strokeLinecap="round" />

      {/* Tight ripples/creases */}
      <path d="M-10 15 Q 0 20, 10 15" fill="none" stroke="#9D174D" opacity="0.2" strokeWidth="1" />

      {/* Side reflections */}
      <path d="M-26 5 Q -24 20, -25 35" fill="none" stroke="white" opacity="0.15" strokeWidth="2" />
      <path d="M26 5 Q 24 20, 25 35" fill="none" stroke="white" opacity="0.15" strokeWidth="2" />
    </g>
  </g>
);

const greyRibbedTank: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Bare Shoulders/Skin Base */}
    <path d="M-36 10 Q -36 0, -20 -5 L 20 -5 Q 36 0, 36 10 V 20 H -36 Z" fill={skinTone || "#F5D0C5"} stroke="none" />

    {/* Grey Ribbed Tank Top */}
    <g>
      {/* Tank Shape */}
      <path
        d="M-28 40 L -24 0 Q -20 -5, -16 -5 H -8 Q -10 15, -10 20 Q 0 25, 10 20 Q 10 15, 8 -5 H 16 Q 20 -5, 24 0 L 28 40 H -28 Z"
        fill="#4B5563" /* Cool Gray 600 */
        stroke="#374151" /* Cool Gray 700 */
        strokeWidth="1.5"
      />

      {/* Ribbed Texture */}
      <g stroke="#1f2937" strokeWidth="0.5" opacity="0.2">
        <path d="M-20 0 V 40" />
        <path d="M-15 0 V 40" />
        <path d="M-5 20 V 40" />
        <path d="M0 22 V 40" />
        <path d="M5 20 V 40" />
        <path d="M15 0 V 40" />
        <path d="M20 0 V 40" />
      </g>
    </g>
  </g>
);

const yellowFuzzySet: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* 1. Underlying Skin for V-Neck */}
    <path d="M-20 -5 Q 0 5, 20 -5 L 15 25 H -15 Z" fill={skinTone || "#D1A384"} stroke="none" />

    {/* 2. Yellow Fuzzy Cardigan */}
    <g>
      {/* Cardigan Base Shape - Relaxed Fit */}
      <path
        d="M-40 10 Q -42 0, -25 -5 L -20 -5 L -5 30 L 0 35 L 5 30 L 20 -5 L 25 -5 Q 42 0, 40 10 V 40 H -40 Z"
        fill="#FEF08A" /* Yellow 200 */
        stroke="#FDE047" /* Yellow 300 to outline */
        strokeWidth="1.5"
      />
      {/* V-Neck Collar / Placket */}
      <path d="M-20 -5 Q -10 0, -5 30" fill="none" stroke="#FDE047" strokeWidth="2" />
      <path d="M20 -5 Q 10 0, 5 30" fill="none" stroke="#FDE047" strokeWidth="2" />
      {/* Fuzzy Texture - Small dashes scattered */}
      <g stroke="#EAB308" /* Yellow 500 for contrast */ opacity="0.3" strokeWidth="0.5" strokeLinecap="round">
        {/* Shoulders */}
        <path d="M-35 5 L -33 7" /> <path d="M-30 8 L -28 6" />
        <path d="M35 5 L 33 7" /> <path d="M30 8 L 28 6" />
        {/* Body */}
        <path d="M-25 20 L -23 22" /> <path d="M-15 25 L -13 23" />
        <path d="M25 20 L 23 22" /> <path d="M15 25 L 13 23" />
        <path d="M-30 30 L -28 32" /> <path d="M30 30 L 28 32" />
      </g>
      {/* Buttons */}
      <circle cx="0" cy="25" r="1.8" fill="#FBBF24" /> {/* Yellow 400 button */}
      <circle cx="0" cy="35" r="1.8" fill="#FBBF24" />
    </g>
  </g>
);

const whiteStrappyTank: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Bare Shoulders/Skin Base */}
    <path d="M-36 10 Q -36 0, -20 -5 L 20 -5 Q 36 0, 36 10 V 25 H -36 Z" fill={skinTone || "#D1A384"} stroke="none" />

    {/* White Strappy Tank Top */}
    <g>
      {/* Tank Shape with deeper neckline */}
      <path
        d="M-26 40 L -22 5 Q -18 -2, -12 -2 L -6 -2 Q -8 12, -8 18 Q 0 28, 8 18 Q 8 12, 6 -2 L 12 -2 Q 18 -2, 22 5 L 26 40 H -26 Z"
        fill="#FAFAFA"
        stroke="#E5E5E5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Thin Straps */}
      <path d="M -12 -2 L -15 -8" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 12 -2 L 15 -8" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M -12 -2 L -15 -8" stroke="#E5E5E5" strokeWidth="1" strokeLinecap="round" />
      <path d="M 12 -2 L 15 -8" stroke="#E5E5E5" strokeWidth="1" strokeLinecap="round" />

      {/* Subtle fabric texture */}
      <g stroke="#D4D4D4" strokeWidth="0.3" opacity="0.3">
        <path d="M-18 10 V 40" />
        <path d="M-10 15 V 40" />
        <path d="M0 25 V 40" />
        <path d="M10 15 V 40" />
        <path d="M18 10 V 40" />
      </g>
    </g>
  </g>
);

const blueLeopardTop: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    <defs>
      <pattern id="leopardPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#BFDBFE" />
        <path d="M 2 2 Q 3 1, 4 2 M 1 4 Q 0 5, 1 6 M 4 5 Q 5 6, 4 7" fill="none" stroke="#60A5FA" strokeWidth="1" />
        <circle cx="7" cy="3" r="1" fill="#3B82F6" opacity="0.4" />
        <circle cx="3" cy="8" r="0.8" fill="#3B82F6" opacity="0.3" />
      </pattern>
    </defs>
    <path d="M-20 -5 Q 0 5, 20 -5 L 15 25 H -15 Z" fill={skinTone || "#D1A384"} stroke="none" />
    <path
      d="M-32 0 Q-36 15, -38 40 L 38 40 Q 36 15, 32 0 L 20 -6 Q 0 0, -20 -6 Z"
      fill="url(#leopardPattern)"
      stroke="#60A5FA"
      strokeWidth="2"
    />
  </g>
);

const blueStrappyTank: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    <path d="M-36 10 Q -36 0, -20 -5 L 20 -5 Q 36 0, 36 10 V 25 H -36 Z" fill={skinTone || "#D1A384"} stroke="none" />
    <path
      d="M-26 40 L -22 5 Q -18 -2, -12 -2 L -6 -2 Q -8 12, -8 18 Q 0 28, 8 18 Q 8 12, 6 -2 L 12 -2 Q 18 -2, 22 5 L 26 40 H -26 Z"
      fill="#93C5FD"
      stroke="#60A5FA"
      strokeWidth="1.5"
    />
    <path d="M -12 -2 L -15 -8 M 12 -2 L 15 -8" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M -12 -2 L -15 -8 M 12 -2 L 15 -8" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" />
  </g>
);

const darkGreenFuzzyCoat: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* 1. Underlying Skin for V-Neck */}
    <path d="M-15 -5 Q 0 5, 15 -5 L 10 25 H -10 Z" fill={skinTone || "#D1A384"} stroke="none" />

    {/* 2. Dark Green Fuzzy Coat */}
    <g>
      {/* Coat Base Shape - Wide Silhouette */}
      <path
        d="M-42 10 Q -44 0, -28 -5 L -15 -5 L -5 15 Q 0 18, 5 15 L 15 -5 L 28 -5 Q 44 0, 42 10 V 40 H -42 Z"
        fill="#1A3C34"
        stroke="#0F2620"
        strokeWidth="1.5"
      />
      {/* Collar / Lapel */}
      <path d="M-15 -5 Q -10 5, -5 15" fill="none" stroke="#0F2620" strokeWidth="4" />
      <path d="M15 -5 Q 10 5, 5 15" fill="none" stroke="#0F2620" strokeWidth="4" />
      {/* Inner collar highlight */}
      <path d="M-15 -5 Q -10 3, -6 12" fill="none" stroke="#2D5248" strokeWidth="2" opacity="0.5" />
      <path d="M15 -5 Q 10 3, 6 12" fill="none" stroke="#2D5248" strokeWidth="2" opacity="0.5" />

      {/* Fuzzy Texture */}
      <g stroke="#0F2620" opacity="0.2" strokeWidth="0.6" strokeLinecap="round">
        {/* Left shoulder */}
        <path d="M-38 5 L -36 7" />
        <path d="M-32 3 L -30 5" />
        <path d="M-34 10 L -32 8" />
        {/* Right shoulder */}
        <path d="M38 5 L 36 7" />
        <path d="M32 3 L 30 5" />
        <path d="M34 10 L 32 8" />
        {/* Body texture */}
        <path d="M-28 18 L -26 20" />
        <path d="M-18 22 L -16 20" />
        <path d="M-30 28 L -28 30" />
        <path d="M28 18 L 26 20" />
        <path d="M18 22 L 16 20" />
        <path d="M30 28 L 28 30" />
        <path d="M-25 35 L -23 33" />
        <path d="M25 35 L 23 33" />
      </g>

      {/* Button (like in photo - single button visible) */}
      <circle cx="0" cy="28" r="2" fill="#0F2620" />
      <circle cx="0" cy="28" r="1" fill="#1A3C34" opacity="0.5" />
    </g>
  </g>
);

const blackHoodie: PartComponent = () => (
  <g transform="translate(50, 98)">
    {/* Black Hoodie Base */}
    <path
      d="M-40 5 Q -42-5, -25 -8 L -20 -8 Q 0-4, 20 -8 L 25 -8 Q 42-5, 40 5 V 40 H -40 Z"
      fill="#111111"
      stroke="#000000"
      strokeWidth="2"
    />
    {/* Hood texture behind head */}
    <path d="M-28-8 C-35-20, 35-20, 28-8" fill="#111111" stroke="#000000" strokeWidth="1.5" />
    {/* Hoodie Strings */}
    <path d="M-6 8 L-8 25 M 6 8 L 8 25" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    <rect x="-9.5" y="25" width="3" height="4" rx="1" fill="#333" />
    <rect x="6.5" y="25" width="3" height="4" rx="1" fill="#333" />
    {/* Kangaroo Pocket */}
    <path d="M-20 25 H 20 L 15 40 H -15 Z" fill="none" stroke="#222" strokeWidth="1.5" opacity="0.5" />
    {/* Subtle folds */}
    <g stroke="white" opacity="0.05" strokeWidth="1" fill="none">
      <path d="M-30 10 Q -25 20, -28 30" />
      <path d="M30 10 Q 25 20, 28 30" />
    </g>
  </g>
);

const pinkHeartSweater: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Skin showing at V-neck */}
    <path d="M-15 -5 Q 0 5, 15 -5 L 10 10 H -10 Z" fill={skinTone || "#F5D0C5"} stroke="none" />

    {/* Pink Cardigan/Sweater Base with argyle pattern */}
    <defs>
      {/* Argyle Pattern Definition */}
      <pattern id="pinkArgylePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        {/* Pink background */}
        <rect width="20" height="20" fill="#F9A8D4" />
        {/* Red diagonal stripes forming diamonds */}
        <path d="M 10 0 L 20 10 L 10 20 L 0 10 Z" fill="#EF4444" />
        {/* Pink diamond in center */}
        <path d="M 10 5 L 15 10 L 10 15 L 5 10 Z" fill="#FB7185" />
      </pattern>
    </defs>

    {/* Main sweater body */}
    <path
      d="M-38 10 Q -38 0, -22 -5 L 22 -5 Q 38 0, 38 10 V 30 H -38 Z"
      fill="url(#pinkArgylePattern)"
      stroke="#EC4899"
      strokeWidth="1.5"
    />

    {/* Black undershirt/tee visible at V-neck */}
    <path d="M-12 -3 Q 0 8, 12 -3 L 10 12 Q 0 18, -10 12 Z" fill="#171717" stroke="#000" strokeWidth="1" />

    {/* V-Neck Collar / Placket */}
    <path d="M-20 -5 Q -10 0, -5 30" fill="none" stroke="#DB2777" strokeWidth="2" />
    <path d="M20 -5 Q 10 0, 5 30" fill="none" stroke="#DB2777" strokeWidth="2" />

    {/* Buttons */}
    <circle cx="0" cy="25" r="1.8" fill="#BE185D" />
    <circle cx="0" cy="35" r="1.8" fill="#BE185D" />

    {/* Heart decorations scattered on the sweater */}
    <g fill="#EF4444" opacity="0.9">
      <path d="M-28 12 C-30 10, -32 12, -30 15 C-28 18, -28 18, -26 15 C-24 12, -26 10, -28 12" />
      <path d="M28 20 C26 18, 24 20, 26 23 C28 26, 28 26, 30 23 C32 20, 30 18, 28 20" />
      <path d="M-25 32 C-27 30, -29 32, -27 35 C-25 38, -25 38, -23 35 C-21 32, -23 30, -25 32" />
      <path d="M30 8 C28 6, 26 8, 28 11 C30 14, 30 14, 32 11 C34 8, 32 6, 30 8" />
    </g>

    {/* White/Pink heart accents */}
    <g fill="#FFF" opacity="0.3">
      <path d="M-32 22 C-33 21, -34 22, -33 24 C-32 25, -32 25, -31 24 C-30 22, -31 21, -32 22" transform="scale(0.8)" />
      <path d="M32 30 C31 29, 30 30, 31 32 C32 33, 32 33, 33 32 C34 30, 33 29, 32 30" transform="scale(0.8)" />
    </g>

    {/* Subtle fabric texture lines */}
    <g stroke="#DB2777" opacity="0.1" strokeWidth="0.5">
      <path d="M-35 10 V 40" />
      <path d="M-20 5 V 40" />
      <path d="M20 5 V 40" />
      <path d="M35 10 V 40" />
    </g>
  </g>
);

const stripedBlazer: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Skin at neckline */}
    <path d="M-12 -5 Q 0 5, 12 -5 L 8 15 H -8 Z" fill={skinTone || "#D1A384"} stroke="none" />

    {/* Grey/green striped blazer */}
    <defs>
      <pattern id="pinstripePattern" x="0" y="0" width="4" height="10" patternUnits="userSpaceOnUse">
        <rect width="4" height="10" fill="#4B5548" />
        <path d="M 2 0 V 10" stroke="#6B7268" strokeWidth="0.5" />
      </pattern>
    </defs>

    {/* Blazer body */}
    <path
      d="M-40 10 Q -42 0, -25 -5 L -12 -5 Q 0 5, 12 -5 L 25 -5 Q 42 0, 40 10 V 40 H -40 Z"
      fill="url(#pinstripePattern)"
      stroke="#3D4438"
      strokeWidth="1.5"
    />

    {/* Lapels */}
    <path d="M-12 -5 L -5 20 L -18 18 Z" fill="#3D4438" stroke="#2D3328" strokeWidth="1" />
    <path d="M 12 -5 L  5 20 L  18 18 Z" fill="#3D4438" stroke="#2D3328" strokeWidth="1" />

    {/* Collar notch */}
    <path d="M-12 -5 Q -15 -8, -18 -5" fill="none" stroke="#3D4438" strokeWidth="1.5" />
    <path d="M 12 -5 Q  15 -8,  18 -5" fill="none" stroke="#3D4438" strokeWidth="1.5" />
  </g>
);

const bareShoulders: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Bare shoulders/upper body - natural skin look */}
    <path
      d="M-38 15 Q -38 5, -25 0 L -15 -5 Q 0 0, 15 -5 L 25 0 Q 38 5, 38 15 V 40 H -38 Z"
      fill={skinTone || "#F5D0C5"}
      stroke="none"
    />
    {/* Subtle collarbone definition */}
    <path d="M-20 8 Q 0 5, 20 8" fill="none" stroke="currentColor" opacity="0.1" strokeWidth="1" />
    {/* Shoulder highlight */}
    <path d="M-30 5 Q -25 2, -18 5" fill="none" stroke="white" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
    <path d="M 30 5 Q  25 2,  18 5" fill="none" stroke="white" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const blueShirtBlackCardigan: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Base skin showing at neckline */}
    <path d="M-10 -4 Q 0 6, 10 -4" fill={skinTone || "#F5D0C5"} stroke="none" />

    {/* Light Blue Collared Shirt - Wider V visible at center */}
    <path d="M-8 4 L 0 -1 L 8 4 L 5 40 H -5 Z" fill="#A7C7E7" stroke="#8FAFC7" strokeWidth="0.8" />

    {/* Pointed Collar - Renarrowed to be congruent */}
    {/* Left collar point */}
    <path d="M -6 -4 L -22 12 L -12 8 L -4 0 Z" fill="#A7C7E7" stroke="#7BA3C7" strokeWidth="1.2" />
    {/* Right collar point */}
    <path d="M  6 -4 L  22 12 L  12 8 L  4 0 Z" fill="#A7C7E7" stroke="#7BA3C7" strokeWidth="1.2" />
    {/* Collar inner shadow/fold */}
    <path d="M-10 0 L -18 6" stroke="#5A88A7" strokeWidth="1" opacity="0.4" />
    <path d="M 10 0 L  18 6" stroke="#5A88A7" strokeWidth="1" opacity="0.4" />

    {/* Black Cardigan - Left side - stops before center */}
    <path d="M-40 10 Q -42 0, -28 -5 L -15 -5 Q -10 -2, -8 4 L -5 40 H -40 Z" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1.5" />
    {/* Black Cardigan - Right side */}
    <path d="M 40 10 Q 42 0, 28 -5 L 15 -5 Q 10 -2, 8 4 L 5 40 H 40 Z" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1.5" />

    {/* Cardigan ribbed/knit texture - Left side only */}
    <g stroke="#333" opacity="0.4" strokeWidth="0.6">
      <path d="M-38 12 V 40" />
      <path d="M-35 10 V 40" />
      <path d="M-32 8 V 40" />
      <path d="M-29 6 V 40" />
      <path d="M-26 5 V 40" />
      <path d="M-23 4 V 40" />
      <path d="M-20 3 V 40" />
      <path d="M-17 3 V 40" />
      <path d="M-14 3 V 40" />
      <path d="M-11 5 V 40" />
    </g>
    {/* Cardigan ribbed/knit texture - Right side only */}
    <g stroke="#333" opacity="0.4" strokeWidth="0.6">
      <path d="M 38 12 V 40" />
      <path d="M 35 10 V 40" />
      <path d="M 32 8 V 40" />
      <path d="M 29 6 V 40" />
      <path d="M 26 5 V 40" />
      <path d="M 23 4 V 40" />
      <path d="M 20 3 V 40" />
      <path d="M 17 3 V 40" />
      <path d="M 14 3 V 40" />
      <path d="M 11 5 V 40" />
    </g>

    {/* Subtle shoulder definition */}
    <path d="M-38 8 Q -30 4, -18 5" fill="none" stroke="#333" opacity="0.2" strokeWidth="1" />
    <path d="M 38 8 Q  30 4,  18 5" fill="none" stroke="#333" opacity="0.2" strokeWidth="1" />
  </g>
);

export const Bodies: PartRegistry<BodyId> = {
  bareShoulders: { component: bareShoulders, label: "Bare Shoulders" },
  basicWhiteTee: { component: basicWhiteTee, label: "White Tee" },
  basicBlackTee: { component: basicBlackTee, label: "Black Tee" },
  whiteRibbedTank: { component: whiteRibbedTank, label: "White Tank" },
  greyRibbedTank: { component: greyRibbedTank, label: "Grey Tank" },
  whiteStrappyTank: { component: whiteStrappyTank, label: "Strappy Tank" },
  blueStrappyTank: { component: blueStrappyTank, label: "Blue Tank" },
  redRibbedTop: { component: redRibbedTop, label: "Red Ribbed Top" },
  blackElegantTop: { component: blackElegantTop, label: "Elegant Top" },
  floralBlouse: { component: floralBlouse, label: "Floral Blouse" },
  heartSweater: { component: heartSweater, label: "Heart Sweater" },
  pinkHeartSweater: { component: pinkHeartSweater, label: "Pink Sweater" },
  houndstoothPurpShirt: { component: houndstoothPurpShirt, label: "Houndstooth Shirt" },
  blueLeopardTop: { component: blueLeopardTop, label: "Leopard Top" },
  featherCuffBlouse: { component: featherCuffBlouse, label: "Feather Blouse" },
  blueShinyShirt: { component: blueShinyShirt, label: "Shiny Shirt" },
  blackHoodie: { component: blackHoodie, label: "Black Hoodie" },
  hoodieUnderJacket: { component: hoodieUnderJacket, label: "Hoodie Jacket" },
  sweatshirtOverShirt: { component: sweatshirtOverShirt, label: "Sweatshirt Layer" },
  denimShirtButtoned: { component: denimShirtButtoned, label: "Denim Shirt" },
  knitSweater: { component: knitSweater, label: "Knit Sweater" },
  redBlazer: { component: redBlazer, label: "Red Blazer" },
  stripedBlazer: { component: stripedBlazer, label: "Striped Blazer" },
  blackPufferJacket: { component: blackPufferJacket, label: "Puffer Jacket" },
  darkGreenFuzzyCoat: { component: darkGreenFuzzyCoat, label: "Fuzzy Coat" },
  yellowFuzzySet: { component: yellowFuzzySet, label: "Yellow Set" },
  pinkLatexDress: { component: pinkLatexDress, label: "Latex Dress" },
  pajamas: { component: pajamas, label: "Pajamas" },
  blueShirtBlackCardigan: { component: blueShirtBlackCardigan, label: "Cardigan" },
};
