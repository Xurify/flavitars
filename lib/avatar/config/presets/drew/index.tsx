import { PartRegistry, PartComponent } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { mirrorPath } from "../../../anatomy";

/** Drew: copper hair pushed back under her blue headband, green eyes with a lilac lid, a raised brow and a cheeky pursed smile. */
export const DrewHairIds = ["drewLong"] as const;
export const DrewEyesIds = ["drewEyes"] as const;
export const DrewEyebrowsIds = ["drewBrows"] as const;
export const DrewMouthIds = ["drewLips"] as const;
export const DrewBodyIds = ["drewShirt"] as const;
export const DrewExtrasIds = ["drewBlush"] as const;

const both = (leftSide: string) => `${leftSide} ${mirrorPath(leftSide)}`;

const HEADBAND = "M 16.5 36 C 15 18, 30 7, 50 7 C 70 7, 85 18, 83.5 36";

const DREW_HAIR: Record<(typeof DrewHairIds)[number], HairSpec> = {
  drewLong: {
    cap: capAbove("M 12 50 L 21 50 L 21 44 C 22 36, 27 30.5, 36 28.5 Q 50 26, 64 28.5 C 73 30.5, 78 36, 79 44 L 79 50 L 88 50"),
    front: "M 15 48 C 10 40, 9 26, 14 15 C 21 4, 36 0.5, 50 0.5 C 64 0.5, 79 4, 86 15 C 91 26, 90 40, 85 48 L 79 46 L 21 46 Z",
    back: "M 15 30 C 5 46, 6 80, 9 104 L 91 104 C 94 80, 95 46, 85 30 Z",
    details: both("M 30 30 C 26 24, 21 18, 16 15 M 40 27.5 C 38 21, 34 14, 29 9 M 48 26.5 C 47 20, 45 13, 42 7"),
    backDetails: both("M 11 48 C 9 64, 9 84, 10 102"),
    shine: "M 36 6 C 42 3.5, 56 3, 64 5.5 C 56 6, 44 7, 38 9.5 Z",
    // Padded headband over the pushed-back hair; it comes off when a hat goes on.
    accents: (_color, { hatId }) =>
      hatId && hatId !== "none" ? null : (
        <g fill="none" strokeLinecap="round">
          <path d={HEADBAND} stroke="currentColor" strokeWidth="9.5" />
          <path d={HEADBAND} stroke="#A9CBE8" strokeWidth="6.5" />
          <path d="M 20 24 C 24 15, 36 10.5, 50 10.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        </g>
      ),
    top: 6,
  },
};

const hair = createHairRegistries(DREW_HAIR, { drewLong: "Drew Long" }, { presetOnly: true, isExclusive: true });

/** Shadow, lid and lashes are drawn for the left eye and mirrored; the iris highlight is not. */
const DrewEye = ({ x }: { x: number }) => {
  const side = `translate(${x}, 46) scale(${x < 50 ? 1 : -1}, 1)`;
  return (
    <g>
      <path transform={side} d="M -9.5 -2 C -6 -9.5, 5 -10, 9 -3.5 C 4 -6.8, -4 -6.4, -9.5 -2 Z" fill="#B49AE0" opacity="0.45" />
      <g transform={`translate(${x}, 46)`}>
        <circle r="4.3" fill="#86B48A" stroke="#4F7D57" strokeWidth="0.6" />
        <circle r="2" fill="#1C2620" />
        <circle cx="1.5" cy="-1.6" r="1.3" fill="white" />
      </g>
      <g transform={side} fill="none" stroke="black" strokeLinecap="round">
        <path d="M -7.5 -1 C -5 -5.2, 3 -5.6, 7 -2.4" strokeWidth="1.9" />
        <path d="M -7.5 -1 L -10.2 -3" strokeWidth="1.5" />
        <path d="M -5.4 -3.4 L -7 -5.8 M -3 -4.5 L -4 -7" strokeWidth="0.9" />
      </g>
    </g>
  );
};

const drewEyes: PartComponent = () => (
  <g>
    <DrewEye x={35} />
    <DrewEye x={65} />
  </g>
);

const leftBrow =
  "M 44.6 34 C 41 32.4, 37 30.6, 33.6 30.2 C 31.2 30, 29.2 30.8, 27.6 32.4 C 29.6 31.8, 31.6 31.7, 33.6 32.1 C 37.2 32.8, 41 34.2, 44 35.4 C 44.9 35.4, 45.2 34.6, 44.6 34 Z";

/** Auburn brows, the right one cocked up mid-sentence. */
const drewBrows: PartComponent = () => (
  <g fill="#9C5235" stroke="#7A3D26" strokeWidth="0.4" strokeLinejoin="round">
    <path d={leftBrow} />
    <path d={mirrorPath(leftBrow)} transform="translate(0, -2.6) rotate(-8, 65, 32)" />
  </g>
);

/** Lopsided closed smirk in pink: one corner tucked up with a dimple beside it. */
const drewLips: PartComponent = () => (
  <g transform="translate(51, 78)">
    <path
      d="M -8.5 0 Q -4.5 -3, 0 -2.2 Q 4.5 -3.8, 7.5 -3.2 Q 5.5 2.8, 0 3.6 Q -5 3.4, -8.5 0 Z"
      fill="#E09AA4"
      stroke="#B36A76"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path d="M -8.5 0 Q 0 1.6, 7.5 -3.2" fill="none" stroke="#9A525F" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M 10.5 -3.6 q 1.4 1.6 0.8 3.8" fill="none" stroke="#B36A76" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
    <path d="M -3 2.2 Q 0 3, 3 2.2" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
  </g>
);

const drewBlush: PartComponent = () => (
  <g opacity="0.22" fill="#F07A8A" filter="blur(2px)">
    <circle cx="31" cy="57" r="6.5" />
    <circle cx="69" cy="57" r="6.5" />
  </g>
);

/** Lilac houndstooth button-up with an open collar. */
const drewShirt: PartComponent = ({ uid = "fv" }) => {
  const pattern = `${uid}-drew-houndstooth`;
  return (
    <g transform="translate(50, 92)">
      <defs>
        <pattern id={pattern} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="scale(0.42)">
          <rect width="10" height="10" fill="#F3EEFB" />
          <path
            d="M 0 0 L 5 0 L 5 5 L 0 5 Z M 5 5 L 10 5 L 10 10 L 5 10 Z M 0 5 L 2.5 5 L 5 2.5 L 5 0 Z M 5 10 L 7.5 10 L 10 7.5 L 10 5 Z"
            fill="#7D5BC6"
          />
        </pattern>
      </defs>
      <path
        d="M -38 0 Q -40 15, -45 40 L 45 40 Q 40 15, 38 0 L 15 -6 L 0 7 L -15 -6 Z"
        fill={`url(#${pattern})`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 0 7 V 40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <g fill="#F3EEFB" stroke="currentColor" strokeWidth="0.6">
        <circle cx="0" cy="15" r="1.2" />
        <circle cx="0" cy="25" r="1.2" />
        <circle cx="0" cy="35" r="1.2" />
      </g>
      <path
        d="M -15 -7 L -1.5 6 L -11 9.5 L -20 -2.5 Z M 15 -7 L 1.5 6 L 11 9.5 L 20 -2.5 Z"
        fill={`url(#${pattern})`}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
  );
};

const preset = { presetOnly: true, isExclusive: true };

export const DrewHairFront: PartRegistry<(typeof DrewHairIds)[number]> = hair.front;
export const DrewHairBack: PartRegistry<(typeof DrewHairIds)[number]> = hair.back;
export const DrewEyes: PartRegistry<(typeof DrewEyesIds)[number]> = {
  drewEyes: { component: drewEyes, label: "Drew Eyes", ...preset },
};
export const DrewEyebrows: PartRegistry<(typeof DrewEyebrowsIds)[number]> = {
  drewBrows: { component: drewBrows, label: "Drew Brows", ...preset },
};
export const DrewMouths: PartRegistry<(typeof DrewMouthIds)[number]> = {
  drewLips: { component: drewLips, label: "Drew Lips", ...preset },
};
export const DrewBodies: PartRegistry<(typeof DrewBodyIds)[number]> = {
  drewShirt: { component: drewShirt, label: "Drew Shirt", ...preset },
};
export const DrewExtras: PartRegistry<(typeof DrewExtrasIds)[number]> = {
  drewBlush: { component: drewBlush, label: "Drew Blush", ...preset },
};
