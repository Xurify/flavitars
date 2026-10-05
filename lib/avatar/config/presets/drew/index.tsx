import { PartRegistry, PartComponent } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { mirrorPath } from "../../../anatomy";

/** Drew: long sleek copper hair, green eyes with a lilac lid and a wing, auburn brows, mauve lips. */
export const DrewHairIds = ["drewLong"] as const;
export const DrewEyesIds = ["drewEyes"] as const;
export const DrewEyebrowsIds = ["drewBrows"] as const;
export const DrewMouthIds = ["drewLips"] as const;
export const DrewBodyIds = ["drewShirt"] as const;

const both = (leftSide: string) => `${leftSide} ${mirrorPath(leftSide)}`;

const DREW_HAIR: Record<(typeof DrewHairIds)[number], HairSpec> = {
  drewLong: {
    cap: capAbove(
      "M 12 76 L 21.5 76 C 22.5 70, 24 64, 24.5 58 C 25 52, 24.8 45, 25.5 40 C 27 33, 35 29.5, 44 28.5 C 47 28.1, 49.2 27, 50 24.5 C 50.8 27, 53 28.1, 56 28.5 C 65 29.5, 73 33, 74.5 40 C 75.2 45, 75 52, 75.5 58 C 76 64, 77.5 70, 78.5 76 L 88 76",
    ),
    front:
      "M 9 104 C 9.5 86, 11 66, 13.5 50 C 12 36, 14 13, 50 12 C 86 13, 88 36, 86.5 50 C 89 66, 90.5 86, 91 104 L 70 104 C 70.5 96, 71.5 88, 73 80 L 73 60 L 27 60 L 27 80 C 28.5 88, 29.5 96, 30 104 Z",
    back: "M 18 44 L 82 44 L 84 104 L 16 104 Z",
    details: `M 50 13 L 50 24.5 ${both("M 47 14.5 C 37 16, 27 22, 21 34 M 17 48 C 15 64, 14 84, 14 104 M 23 82 C 24 90, 25 97, 25.5 104")}`,
    shine: both(
      "M 40 14.5 C 31 16.5, 23 23, 19.5 32 C 23 26, 30 20.5, 41 17.5 Z M 12.5 58 C 12 72, 11.5 86, 11.5 100 L 14 100 C 14 86, 14.5 72, 15 58 Z",
    ),
    top: 12,
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

const drewBrows: PartComponent = () => (
  <path
    d={both(
      "M 44.6 34 C 41 32.4, 37 30.6, 33.6 30.2 C 31.2 30, 29.2 30.8, 27.6 32.4 C 29.6 31.8, 31.6 31.7, 33.6 32.1 C 37.2 32.8, 41 34.2, 44 35.4 C 44.9 35.4, 45.2 34.6, 44.6 34 Z",
    )}
    fill="#9C5235"
    stroke="#7A3D26"
    strokeWidth="0.4"
    strokeLinejoin="round"
  />
);

const drewLips: PartComponent = () => (
  <g transform="translate(50, 78)">
    <path
      d="M -9.8 -1.2 Q -5.2 -4.6, 0 -2.5 Q 5.2 -4.6, 9.8 -1.2 Q 5.4 5.4, 0 5.6 Q -5.4 5.4, -9.8 -1.2 Z"
      fill="#C27A80"
      stroke="#985258"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path d="M -9.8 -1.2 Q 0 1.5, 9.8 -1.2" fill="none" stroke="#7C3F46" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M -4 3.4 Q 0 4.3, 4 3.4" fill="none" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.35" />
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
