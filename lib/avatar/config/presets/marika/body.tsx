import React from "react";
import { PartComponent } from "../../../parts/common";

export const MarikaBodyIds = [
  "marikaSparkleTop",
  "marikaBlackTurtleneck",
  "marikaLeatherJacket",
  "marikaMilitaryJacket",
  "marikaRedMilitaryJacket",
  "marikaAtelier",
] as const;

export type MarikaBodyId = (typeof MarikaBodyIds)[number];

export const MarikaBodies: Record<MarikaBodyId, PartComponent> = {
  marikaSparkleTop: () => (
    <g transform="translate(50, 95)">
      {/* Black Mock-Neck/High Collar Base */}
      <path
        d="M-38 5 Q -42 15, -45 40 H 45 Q 42 15, 38 5 L 15 -8 Q 0 -4, -15 -8 Z"
        fill="#0a0a0a"
        stroke="black"
        strokeWidth="2"
      />

      {/* MORE Sparkly Texture - fine dots everywhere */}
      <g fill="white" opacity="0.2">
        <circle cx="-25" cy="15" r="0.6" />
        <circle cx="-10" cy="25" r="0.6" />
        <circle cx="5" cy="12" r="0.6" />
        <circle cx="20" cy="28" r="0.6" />
        <circle cx="-5" cy="35" r="0.6" />
        <circle cx="30" cy="10" r="0.6" />
        <circle cx="15" cy="38" r="0.6" />
        <circle cx="-35" cy="32" r="0.6" />
        <circle cx="40" cy="20" r="0.6" />
        <circle cx="0" cy="5" r="0.6" />
        <circle cx="-18" cy="8" r="0.5" />
        <circle cx="12" cy="22" r="0.5" />
        <circle cx="-28" cy="38" r="0.5" />
      </g>

      {/* Prominent Gold Glitzy Cuffs showing at wrists */}
      <g transform="translate(-42, 30) rotate(10)">
        <rect x="-10" y="0" width="20" height="12" rx="2" fill="#B8860B" stroke="#8B4513" strokeWidth="1" />
        {/* Cuff sparkles */}
        <circle cx="-5" cy="4" r="1" fill="#FFD700" opacity="0.8" />
        <circle cx="5" cy="8" r="1" fill="#FFF8DC" opacity="0.9" />
        <circle cx="0" cy="6" r="1" fill="#DAA520" opacity="0.7" />
      </g>
      <g transform="translate(42, 30) rotate(-10)">
        <rect x="-10" y="0" width="20" height="12" rx="2" fill="#B8860B" stroke="#8B4513" strokeWidth="1" />
        {/* Cuff sparkles */}
        <circle cx="5" cy="4" r="1" fill="#FFD700" opacity="0.8" />
        <circle cx="-5" cy="8" r="1" fill="#FFF8DC" opacity="0.9" />
        <circle cx="0" cy="6" r="1" fill="#DAA520" opacity="0.7" />
      </g>

      {/* Center collar line */}
      <path d="M-15 -8 Q 0 -4, 15 -8" fill="none" stroke="white" opacity="0.1" strokeWidth="1.5" />
    </g>
  ),
  marikaBlackTurtleneck: () => (
    <g transform="translate(50, 95)">
      {/* Black Turtleneck - High and sleek */}
      <path
        d="M-35 5 Q -40 15, -42 40 H 42 Q 40 15, 35 5 L 18 -10 Q 0 -8, -18 -10 Z"
        fill="#111111"
        stroke="black"
        strokeWidth="2"
      />
      {/* Neck area detail */}
      <path d="M-18 -10 Q 0 -4, 18 -10" fill="none" stroke="black" strokeWidth="2" />
      <path d="M-18 -2 Q 0 2, 18 -2" fill="none" stroke="white" opacity="0.1" strokeWidth="1.5" />
    </g>
  ),
  marikaLeatherJacket: () => (
    <g transform="translate(50, 95)">
      {/* White Shirt Underneath */}
      <path d="M-20 -5 L-20 40 H 20 L 20 -5 L 0 0 Z" fill="white" />

      {/* Black Leather Jacket */}
      <path d="M-40 0 L -25 -5 L -20 40 H -45 L -40 0 Z" fill="#1A1A1A" stroke="black" strokeWidth="1.5" />
      <path d="M40 0 L 25 -5 L 20 40 H 45 L 40 0 Z" fill="#1A1A1A" stroke="black" strokeWidth="1.5" />

      {/* Collar / Lapels */}
      <path d="M-25 -5 L -35 5 L -20 15 L -15 -5 Z" fill="#111" stroke="black" strokeWidth="1" />
      <path d="M25 -5 L 35 5 L 20 15 L 15 -5 Z" fill="#111" stroke="black" strokeWidth="1" />

      {/* Zippers/Details */}
      <path d="M-30 15 L -25 30" stroke="#Silver" strokeWidth="1" />
      <path d="M30 15 L 25 30" stroke="#Silver" strokeWidth="1" />
    </g>
  ),
  marikaMilitaryJacket: () => (
    <g transform="translate(50, 95)">
      {/* Red Military Jacket */}
      <path
        d="M-38 0 L -45 10 L -45 40 H 45 L 45 10 L 38 0 L 15 -8 L -15 -8 Z"
        fill="#C62828"
        stroke="#8E0000"
        strokeWidth="1.5"
      />
      {/* Gold Epaulets */}
      <rect x="-45" y="-2" width="15" height="8" fill="#FFD700" stroke="#B8860B" transform="rotate(-15, -45, -2)" />
      <rect x="30" y="-2" width="15" height="8" fill="#FFD700" stroke="#B8860B" transform="rotate(15, 30, -2)" />

      {/* Gold Buttons / Braiding */}
      <path d="M-15 -8 L -15 40" stroke="#FFD700" strokeWidth="1" strokeDasharray="4 2" />
      <path d="M15 -8 L 15 40" stroke="#FFD700" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="-8" cy="10" r="1.5" fill="#FFD700" />
      <circle cx="8" cy="10" r="1.5" fill="#FFD700" />
      <circle cx="-8" cy="20" r="1.5" fill="#FFD700" />
      <circle cx="8" cy="20" r="1.5" fill="#FFD700" />
      <circle cx="-8" cy="30" r="1.5" fill="#FFD700" />
      <circle cx="8" cy="30" r="1.5" fill="#FFD700" />
    </g>
  ),
  marikaRedMilitaryJacket: () => (
    <g transform="translate(50, 95)">
      {/* 1. Black Turtleneck Undertop */}
      <path d="M-20 -10 Q 0 -5, 20 -10 L 20 8 H -20 Z" fill="#0A0A0A" />

      {/* 2. Red Military Jacket Base */}
      <path
        d="M-42 0 Q -45 15, -48 40 L 48 40 Q 45 15, 42 0 L 18 -6 L 12 5 L -12 5 L -18 -6 Z"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="1.5"
      />

      {/* 3. Thin Gold Shoulder Trim Stripes */}
      {/* Left Shoulder - thin horizontal gold stripe */}
      <path d="M -42 0 L -18 -6" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      {/* Right Shoulder - thin horizontal gold stripe */}
      <path d="M 42 0 L 18 -6" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

      {/* 4. Gold Collar Trim - Subtle Linings */}
      {/* High collar standing part */}
      <path d="M -18 -6 L -18 -10 L -12 5" stroke="none" fill="#D31F1F" />
      <path d="M 18 -6 L 18 -10 L 12 5" stroke="none" fill="#D31F1F" />

      {/* Gold Edging on Collar */}
      <path d="M -18 -8 Q -15 -8, -12 5" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.9" />
      <path d="M 18 -8 Q 15 -8, 12 5" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.9" />
      <path d="M -18 -8 L -24 -6" stroke="#FBBF24" strokeWidth="0.8" opacity="0.8" />
      <path d="M 18 -8 L 24 -6" stroke="#FBBF24" strokeWidth="0.8" opacity="0.8" />

      {/* 5. Chest Braiding - horizontal gold rows */}
      <g stroke="#F59E0B" strokeWidth="2" fill="none">
        <path d="M -45 18 L -15 18" />
        <path d="M 45 18 L 15 18" />
        <path d="M -46 26 L -15 26" />
        <path d="M 46 26 L 15 26" />
      </g>

      {/* 6. Gold Buttons */}
      <g fill="#FFD700" stroke="#B45309" strokeWidth="0.5">
        <circle cx="-15" cy="18" r="1.5" />
        <circle cx="15" cy="18" r="1.5" />
        <circle cx="-15" cy="26" r="1.5" />
        <circle cx="15" cy="26" r="1.5" />
      </g>

      {/* 4. Gloved Hands Posed Near Face ("Paws") */}
      <g transform="translate(0, 0)">
        {/* Left Hand (Viewer's Left) */}
        <g transform="translate(-15, 25) rotate(-20)">
          {/* Glove Base - Black Leather */}
          <path d="M -12 0 Q -15 10, -10 20 Q 5 20, 10 10 Q 5 -5, -12 0" fill="#111" stroke="#000" strokeWidth="1" />
          {/* Fingers folded */}
          <path d="M -8 2 Q -5 8, 0 5" fill="none" stroke="#333" strokeWidth="1.5" />
          <path d="M -4 4 Q 0 10, 5 6" fill="none" stroke="#333" strokeWidth="1.5" />
          {/* Jeweled Studs - Sparkles */}
          <circle cx="-5" cy="8" r="1.5" fill="#333" stroke="#555" />
          <g fill="white" opacity="0.8">
            <circle cx="-6" cy="6" r="0.8" />
            <circle cx="-2" cy="9" r="0.8" />
            <circle cx="-8" cy="12" r="0.8" />
            <circle cx="0" cy="14" r="0.8" />
            <circle cx="-4" cy="16" r="0.8" />
          </g>
        </g>

        {/* Right Hand (Viewer's Right) */}
        <g transform="translate(15, 25) rotate(20)">
          {/* Glove Base */}
          <path d="M 12 0 Q 15 10, 10 20 Q -5 20, -10 10 Q -5 -5, 12 0" fill="#111" stroke="#000" strokeWidth="1" />
          {/* Fingers */}
          <path d="M 8 2 Q 5 8, 0 5" fill="none" stroke="#333" strokeWidth="1.5" />
          <path d="M 4 4 Q 0 10, -5 6" fill="none" stroke="#333" strokeWidth="1.5" />
          {/* Jeweled Studs */}
          <g fill="white" opacity="0.8">
            <circle cx="6" cy="6" r="0.8" />
            <circle cx="2" cy="9" r="0.8" />
            <circle cx="8" cy="12" r="0.8" />
            <circle cx="0" cy="14" r="0.8" />
            <circle cx="4" cy="16" r="0.8" />
          </g>
        </g>
      </g>
    </g>
  ),
  marikaAtelier: () => (
    <g transform="translate(50, 95)">
      {/* 1. Gold Mesh / Sequin Cowl Neck - Tighter & Denser */}
      <defs>
        <pattern id="goldMeshDenser" patternUnits="userSpaceOnUse" width="1.2" height="1.2">
          <circle cx="0.6" cy="0.6" r="0.4" fill="#F59E0B" />
        </pattern>
      </defs>

      {/* Base shape - Narrow (similar to Military turtleneck width) */}
      <path
        d="M -16 -12 Q 0 -6, 16 -12 L 18 20 Q 0 28, -18 20 Z"
        fill="url(#goldMeshDenser)"
        stroke="#B45309"
        strokeWidth="0.5"
      />

      {/* Texture Overlay - Shine/Sparkle */}
      <path
        d="M -16 -12 Q 0 -6, 16 -12 L 18 20 Q 0 28, -18 20 Z"
        fill="url(#goldMeshDenser)"
        opacity="0.6"
        style={{ mixBlendMode: "overlay" } as React.CSSProperties}
      />

      {/* 2. White Shirt Collar - Prominent, Popped & Framing the Mesh */}
      {/* Left Collar Flap */}
      <path d="M -15 -8 L -32 5 L -16 15 L -10 5 Z" fill="white" stroke="#E5E5E5" strokeWidth="0.5" />
      {/* Right Collar Flap */}
      <path d="M 15 -8 L 32 5 L 16 15 L 10 5 Z" fill="white" stroke="#E5E5E5" strokeWidth="0.5" />

      {/* Inner collar shadow/depth */}
      <path d="M -15 -8 L -10 5" stroke="#DDD" strokeWidth="1" />
      <path d="M 15 -8 L 10 5" stroke="#DDD" strokeWidth="1" />

      {/* 3. Black Blazer Jacket Overlay - Narrow Shoulders */}
      <path
        d="M -38 -5 Q -42 10, -45 40 L 45 40 Q 42 10, 38 -5 L 20 0 L 16 25 L -16 25 L -20 0 Z"
        fill="#111"
        stroke="black"
        strokeWidth="1.5"
      />

      {/* Blazer Lapels - framing the white collar */}
      <path d="M -20 0 L -30 10 L -16 25 Z" fill="#1A1A1A" stroke="black" strokeWidth="0.5" />
      <path d="M 20 0 L 30 10 L 16 25 Z" fill="#1A1A1A" stroke="black" strokeWidth="0.5" />

      {/* Shoulder definition */}
      <path d="M -38 -5 L -25 0" stroke="#333" strokeWidth="1" />
      <path d="M 38 -5 L 25 0" stroke="#333" strokeWidth="1" />

      {/* Additional Gold Chain/Necklace Detail from reference */}
      <path d="M -12 20 Q 0 28, 12 20" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="1.5 1" opacity="0.8" />
    </g>
  ),
};
