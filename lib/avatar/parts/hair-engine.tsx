import React from "react";
import { getHead } from "../anatomy";
import type { PartComponent, PartProps } from "./common";

/**
 * A hairstyle is described as regions instead of finished drawings, so it fits any head:
 *
 * - `cap`: the part of the skull covered by hair. The renderer intersects it with the actual
 *   head outline, so the hairline always hugs the head. Bangs and fringes are part of the cap.
 * - `front`: volume drawn over the head layer (puffs, spikes, side locks). It can never cover
 *   the face: inside the head only the cap is painted.
 * - `back`: lengths, buns and tails drawn behind the head and body.
 *
 * Each layer is outlined as one merged silhouette, so overlapping pieces never show seams.
 */
export interface HairSpec {
  cap?: string;
  front?: string;
  back?: string;
  /** Shade strokes, clipped to the front silhouette. */
  details?: string;
  /** Light regions (white, low opacity), clipped to the front silhouette. */
  shine?: string;
  /** Shade strokes, clipped to the back silhouette. */
  backDetails?: string;
  /** Short-cropped areas: the head inside this region is tinted with the hair colour, no volume. */
  stubble?: string;
  /** Colour work inside the hair (streaks, dyed tips, skin peeking through), clipped to the front silhouette. */
  paint?: (hairColor: string, props: PartProps) => React.ReactNode;
  /** Ornaments with their own colours (bows, clips, ties), drawn on top unclipped. */
  accents?: (hairColor: string, props: PartProps) => React.ReactNode;
  /**
   * Where things resting on the hair sit (crowns, halos, headphone bands): the top of the hair
   * mass, ignoring spikes, buns and bows that poke above it. Defaults to the top of the cap.
   */
  top?: number;
  /** Highest point including spikes, buns and bows; floating items (halo) clear it. Defaults to `top`. */
  peak?: number;
}

export const HAIR_OUTLINE = 2;
const DETAIL_STYLE = { stroke: "black", strokeOpacity: 0.16, strokeWidth: 1.2, strokeLinecap: "round", fill: "none" } as const;
const CUT_STYLE = { fill: "none", stroke: "currentColor", strokeWidth: HAIR_OUTLINE, strokeLinejoin: "round" } as const;
const OUTSIDE = "M -100 -100 H 200 V 200 H -100 Z";

const hairFill = (fill?: string) => fill || "var(--avatar-hair, #1a1a1a)";

export const getHairPeak = (spec: HairSpec | undefined, headId: string | undefined) =>
  Math.min(getHairTop(spec, headId), spec?.peak ?? Infinity);

export const getHairTop = (spec: HairSpec | undefined, headId: string | undefined) => {
  const headTop = getHead(headId).top;
  if (!spec) return headTop;
  const capTop = spec.cap ? headTop - HAIR_OUTLINE : headTop;
  return Math.min(capTop, spec.top ?? capTop);
};

const SilhouettePass = ({
  headPath,
  spec,
  ids,
  outline,
  fill,
}: {
  headPath: string;
  spec: HairSpec;
  ids: HairIds;
  outline: boolean;
  fill: string;
}) => (
  <g
    fill={outline ? "currentColor" : fill}
    stroke={outline ? "currentColor" : "none"}
    strokeWidth={outline ? HAIR_OUTLINE * 2 : 0}
    strokeLinejoin="round"
  >
    {spec.cap && <path d={headPath} clipPath={`url(#${ids.cap})`} />}
    {spec.front && <path d={spec.front} clipPath={`url(#${ids.notFace})`} />}
  </g>
);

interface HairIds {
  cap: string;
  notFace: string;
  notCap: string;
  head: string;
  shape: string;
  headOrFront: string;
  back: string;
  keep: string;
  backKeep: string;
}

const hairIds = (uid: string): HairIds => ({
  cap: `${uid}-hair-cap`,
  notFace: `${uid}-hair-notface`,
  notCap: `${uid}-hair-notcap`,
  head: `${uid}-hair-head`,
  shape: `${uid}-hair-shape`,
  headOrFront: `${uid}-hair-headorfront`,
  back: `${uid}-hair-back`,
  keep: `${uid}-hair-keep`,
  backKeep: `${uid}-hair-backkeep`,
});

type HairViewProps = PartProps & { spec: HairSpec };

export const HairFrontView: React.FC<HairViewProps> = ({ spec, ...props }) => {
  const { fill, headId, uid = "fv", keep } = props;
  if (!spec.cap && !spec.front && !spec.stubble && !spec.accents) return null;
  const headPath = getHead(headId).path;
  const ids = hairIds(uid);
  const color = hairFill(fill);
  const cap = spec.cap ?? "M 0 0 Z";

  return (
    <g>
      <defs>
        <clipPath id={ids.cap}>
          <path d={cap} />
        </clipPath>
        <clipPath id={ids.notFace}>
          <path d={cap} />
          <path d={`${OUTSIDE} ${headPath}`} clipRule="evenodd" />
        </clipPath>
        <clipPath id={ids.notCap}>
          <path d={`${OUTSIDE} ${cap}`} clipRule="evenodd" />
        </clipPath>
        <clipPath id={ids.head}>
          <path d={headPath} />
        </clipPath>
        <clipPath id={ids.shape}>
          <path d={cap} />
          {spec.front && <path d={spec.front} />}
        </clipPath>
        <clipPath id={ids.headOrFront}>
          <path d={headPath} />
          {spec.front && <path d={spec.front} />}
        </clipPath>
        {keep && (
          <clipPath id={ids.keep}>
            <path d={keep} />
          </clipPath>
        )}
      </defs>
      <g clipPath={keep ? `url(#${ids.keep})` : undefined}>
        {spec.stubble && (
          <g clipPath={`url(#${ids.head})`}>
            <path d={spec.stubble} fill={color} fillOpacity="0.4" />
          </g>
        )}
        <SilhouettePass headPath={headPath} spec={spec} ids={ids} outline fill={color} />
        <SilhouettePass headPath={headPath} spec={spec} ids={ids} outline={false} fill={color} />
        {(spec.details || spec.shine || spec.paint) && (
          <InsideHair ids={ids}>
            {spec.paint?.(color, props)}
            {spec.shine && <path d={spec.shine} fill="white" fillOpacity="0.2" />}
            {spec.details && <path d={spec.details} {...DETAIL_STYLE} />}
          </InsideHair>
        )}
        {spec.cap && <path d={cap} {...CUT_STYLE} clipPath={`url(#${ids.head})`} />}
        {spec.front && <path d={headPath} {...CUT_STYLE} clipPath={`url(#${ids.notCap})`} />}
        {spec.accents?.(color, props)}
      </g>
      {keep && (spec.cap || spec.front) && (
        <InsideHair ids={ids}>
          <path d={keep} {...CUT_STYLE} />
        </InsideHair>
      )}
    </g>
  );
};

/** Clips children to the visible front-hair silhouette: (cap ∩ head) ∪ (front outside the face). */
const InsideHair = ({ ids, children }: { ids: HairIds; children: React.ReactNode }) => (
  <g clipPath={`url(#${ids.notFace})`}>
    <g clipPath={`url(#${ids.shape})`}>
      <g clipPath={`url(#${ids.headOrFront})`}>{children}</g>
    </g>
  </g>
);

export const HairBackView: React.FC<HairViewProps> = ({ spec, fill, uid = "fv", keep }) => {
  if (!spec.back) return null;
  const ids = hairIds(uid);
  const color = hairFill(fill);
  return (
    <g>
      <defs>
        <clipPath id={ids.back}>
          <path d={spec.back} />
        </clipPath>
        {keep && (
          <clipPath id={ids.backKeep}>
            <path d={keep} />
          </clipPath>
        )}
      </defs>
      <g clipPath={keep ? `url(#${ids.backKeep})` : undefined}>
        <path d={spec.back} fill="currentColor" stroke="currentColor" strokeWidth={HAIR_OUTLINE * 2} strokeLinejoin="round" />
        <path d={spec.back} fill={color} />
        {spec.backDetails && <path d={spec.backDetails} clipPath={`url(#${ids.back})`} {...DETAIL_STYLE} />}
      </g>
      {keep && <path d={keep} clipPath={`url(#${ids.back})`} {...CUT_STYLE} />}
    </g>
  );
};

export const renderHairFront = (spec: HairSpec): PartComponent => {
  const HairFront: PartComponent = (props) => <HairFrontView spec={spec} {...props} />;
  return HairFront;
};

export const renderHairBack = (spec: HairSpec): PartComponent => {
  const HairBack: PartComponent = (props) => <HairBackView spec={spec} {...props} />;
  return HairBack;
};
