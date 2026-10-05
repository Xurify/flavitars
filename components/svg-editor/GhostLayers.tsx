"use client";

import React from "react";
import { AvatarState } from "@/lib/avatar/types";
import { resolveAvatarColors, resolveAvatarParts } from "@/lib/utils/avatar-resolver";
import { getHeadFacialTransform } from "@/lib/avatar/parts";
import { getHairPathData, HairLayer } from "@/lib/avatar/parts/hair-paths";
import { HatId, Hats } from "@/lib/avatar/parts/hats";
import { HeadId } from "@/lib/avatar/parts/head";

export interface GhostLayerSettings {
  showHead: boolean;
  headOpacity: number;
  showOppositeHair: boolean;
  oppositeHairOpacity: number;
  showHat: boolean;
  hatOpacity: number;
  showCap: boolean;
  capOpacity: number;
  showCenterLine: boolean;
  showGrid: boolean;
  snapStep: number;
}

export const DEFAULT_GHOST_SETTINGS: GhostLayerSettings = {
  showHead: true,
  headOpacity: 0.35,
  showOppositeHair: true,
  oppositeHairOpacity: 0.45,
  showHat: true,
  hatOpacity: 0.4,
  showCap: true,
  capOpacity: 0.6,
  showCenterLine: true,
  showGrid: true,
  snapStep: 1,
};

interface GhostLayersProps {
  avatarState: AvatarState;
  currentLayer: HairLayer;
  settings: GhostLayerSettings;
}

export function GhostLayers({
  avatarState,
  currentLayer,
  settings,
}: GhostLayersProps): React.JSX.Element {
  const { skinTone, hairColor, hatColor, facialFeaturesColor } = resolveAvatarColors(avatarState);
  const {
    HeadShape,
    EyebrowSet,
    EyeSet,
    NoseSet,
    MouthSet,
  } = resolveAvatarParts(avatarState);

  const oppositeHairPath = getHairPathData(avatarState.hair, currentLayer === "back" ? "front" : "back");
  const capPath = getHairPathData(avatarState.hair, "cap");

  const HatComponent = Hats[avatarState.hat]?.component;

  return (
    <g className="ghost-reference-layers" pointerEvents="none">
      {/* Grid Lines */}
      {settings.showGrid && (
        <g opacity="0.18">
          {Array.from({ length: 21 }).map((_, index) => {
            const coordinate = index * 5;
            const isMajor = coordinate % 10 === 0;
            return (
              <React.Fragment key={`grid-${coordinate}`}>
                <line
                  x1={coordinate}
                  y1={0}
                  x2={coordinate}
                  y2={100}
                  stroke="#71717a"
                  strokeWidth={isMajor ? "0.4" : "0.2"}
                  strokeDasharray={isMajor ? "none" : "1 1"}
                />
                <line
                  x1={0}
                  y1={coordinate}
                  x2={100}
                  y2={coordinate}
                  stroke="#71717a"
                  strokeWidth={isMajor ? "0.4" : "0.2"}
                  strokeDasharray={isMajor ? "none" : "1 1"}
                />
              </React.Fragment>
            );
          })}
        </g>
      )}

      {/* Center Symmetry Axis (X = 50) */}
      {settings.showCenterLine && (
        <g opacity="0.75">
          <line
            x1={50}
            y1={-20}
            x2={50}
            y2={120}
            stroke="#f97316"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <text
            x={51.5}
            y={2}
            fontSize="2.8"
            fill="#f97316"
            fontFamily="monospace"
            fontWeight="bold"
            opacity="0.8"
          >
            X:50
          </text>
        </g>
      )}

      {/* Ghost Head & Face Silhouette */}
      {settings.showHead && (
        <g opacity={settings.headOpacity}>
          <g fill={skinTone} stroke="#a1a1aa" strokeWidth="0.5">
            <HeadShape fill={skinTone} headId={avatarState.head} hatId={avatarState.hat} />
          </g>

          <g style={{ color: facialFeaturesColor }} transform={getHeadFacialTransform(avatarState.head)}>
            <EyebrowSet headId={avatarState.head} hatId={avatarState.hat} />
            <EyeSet headId={avatarState.head} hatId={avatarState.hat} />
            <NoseSet headId={avatarState.head} hatId={avatarState.hat} />
            <MouthSet headId={avatarState.head} hatId={avatarState.hat} />
          </g>
        </g>
      )}

      {/* Ghost Opposite Hair Layer */}
      {settings.showOppositeHair && oppositeHairPath && (
        <g opacity={settings.oppositeHairOpacity}>
          <path
            d={oppositeHairPath}
            fill={hairColor}
            stroke="#e4e4e7"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Ghost Hairline (cap region) */}
      {settings.showCap && capPath && currentLayer !== "cap" && (
        <g opacity={settings.capOpacity}>
          <path
            d={capPath}
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="0.6"
            strokeDasharray="1 1"
          />
        </g>
      )}

      {/* Ghost Hat & Clip Zone */}
      {settings.showHat && avatarState.hat !== "none" && (
        <g opacity={settings.hatOpacity}>
          {HatComponent ? (
            <HatComponent
              fill={hatColor}
              headId={avatarState.head as HeadId}
              hatId={avatarState.hat as HatId}
            />
          ) : null}
        </g>
      )}
    </g>
  );
}
