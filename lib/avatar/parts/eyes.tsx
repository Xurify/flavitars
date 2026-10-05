import { PartRegistry, PartComponent } from "./common";

export const EyesId = [
  "standard",
  "almond",
  "brownAlmond",
  "warmBrownNatural",
  "warmBrownSoft",
  "blueGreyNatural",
  "hazelGreenNatural",
  "aquaBlueNatural",
  "calmBlueGrey",
  "softBlueGrey",
  "brightBlueNatural",
  "lashes",
  "heavyLashes",
  "wingedLashes",
  "wingedGlamEyes",
  "glamGreyEyes",
  "blueGreyGlam",
  "lightHazel",
  "brightBlueGlam",
  "greenLavenderGlam",
  "blueWinged",
  "happyBrownFeminine",
  "winking",
  "tired",
] as const;
export type EyesId = (typeof EyesId)[number];

/**
 * Every eye is built from the same few ink shapes so the styles read as one family: a round
 * iris with an ink ring (or a plain ink dot), one lid stroke, a few bold lash ticks, and a flat
 * patch of eyeshadow. The left eye is drawn and the right one is its mirror.
 */
interface EyeStyle {
  /** Iris colour; without one the eye is a plain ink dot. */
  iris?: string;
  /** Upper lid: a soft ink arc, a bold liner, or a liner that flicks out into a wing. */
  lid?: "soft" | "bold" | "wing";
  /** Lash ticks at the outer corner. */
  lashes?: 0 | 1 | 2 | 3;
  /** Flat eyeshadow above the eye. */
  shadow?: string;
  /** Lower lid pushed up by a smile. */
  happy?: boolean;
  /** Lid drooping over the top of the iris. */
  hooded?: boolean;
}

const PUPIL = "#1F2933";
const LASHES = ["M 6 -3 L 8.6 -5.4", "M 3.6 -4.8 L 5 -7.8", "M 0.8 -5.6 L 1.4 -8.8"];

const Iris = ({ color, hooded }: { color?: string; hooded?: boolean }) =>
  color ? (
    <g>
      <circle r="4.4" fill={color} stroke="currentColor" strokeWidth="1.2" />
      <circle r="2" fill={PUPIL} />
      <circle cx="1.6" cy={hooded ? -0.4 : -1.6} r="1.5" fill="white" />
      <circle cx="-1.3" cy="1.5" r="0.6" fill="white" opacity="0.6" />
    </g>
  ) : (
    <g>
      <circle r="4" fill="currentColor" />
      <circle cx="1.5" cy={hooded ? -0.4 : -1.5} r="1.3" fill="white" />
    </g>
  );

const Eye = ({ style }: { style: EyeStyle }) => (
  <g>
    {style.shadow && <path d="M -9 -2 C -6 -9.5, 6 -10, 9.5 -3 C 5 -6.6, -4 -6.2, -9 -2 Z" fill={style.shadow} opacity="0.5" />}
    <Iris color={style.iris} hooded={style.hooded} />
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      {style.hooded && <path d="M -5.4 -1.2 Q 0 -3.8, 5.4 -1.2" strokeWidth="2.6" />}
      {style.lid === "soft" && <path d="M -6 -1.8 Q 0 -6, 6 -1.8" strokeWidth="1.8" />}
      {(style.lid === "bold" || style.lid === "wing") && <path d="M -6.5 -2.4 Q 0 -7, 6.5 -2.4" strokeWidth="2.6" />}
      {style.lid === "wing" && <path d="M 6.5 -2.4 L 10.5 -5.5" strokeWidth="2.4" />}
      {LASHES.slice(0, style.lashes ?? 0).map((d) => (
        <path key={d} d={d} strokeWidth="1.4" />
      ))}
      {style.happy && <path d="M -5 2.8 Q 0 5.2, 5 2.8" strokeWidth="1.6" />}
    </g>
  </g>
);

const eyes = (style: EyeStyle): PartComponent => {
  const Eyes: PartComponent = () => (
    <g>
      <g transform="translate(35, 45)">
        <Eye style={style} />
      </g>
      <g transform="translate(65, 45) scale(-1, 1)">
        <Eye style={style} />
      </g>
    </g>
  );
  return Eyes;
};

/** Outlined almond-shaped eye with the pupil (and optionally an iris) inside. */
const AlmondEye = ({ iris }: { iris?: string }) => (
  <g>
    <path d="M -8 0 Q 0 -6.8, 8 0 Q 0 6.8, -8 0 Z" fill="white" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    {iris && <circle cx="0.8" r="3.2" fill={iris} />}
    <circle cx="0.8" r={iris ? 1.7 : 2.6} fill={PUPIL} />
    <circle cx="1.9" cy="-1.3" r="1" fill="white" />
    <path d="M 7 -1.8 L 10 -4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </g>
);

const almondEyes = (iris?: string): PartComponent => {
  const Eyes: PartComponent = () => (
    <g>
      <g transform="translate(35, 45)">
        <AlmondEye iris={iris} />
      </g>
      <g transform="translate(65, 45) scale(-1, 1)">
        <AlmondEye iris={iris} />
      </g>
    </g>
  );
  return Eyes;
};

/** One eye squeezed shut in a cheeky arc, the other wide open. */
const winkingEyes: PartComponent = () => (
  <g>
    <g transform="translate(35, 45)" fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M -5.5 0.5 Q 0 -4.5, 5.5 0.5" strokeWidth="2.4" />
      <path d="M -5.5 0.5 L -8 -1.5 M -4 -2.4 L -6 -4.8" strokeWidth="1.4" />
    </g>
    <g transform="translate(65, 45)">
      <Iris />
    </g>
  </g>
);

const tiredEyes: PartComponent = () => (
  <g>
    {[35, 65].map((x) => (
      <g key={x} transform={`translate(${x}, 46)`}>
        <Iris hooded />
        <path d="M -5.4 -1.2 Q 0 -3.8, 5.4 -1.2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M -4 5 Q 0 6.4, 4 5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      </g>
    ))}
  </g>
);

const STYLES: Record<EyesId, { label: string; component: PartComponent }> = {
  standard: { label: "Standard", component: eyes({}) },
  almond: { label: "Almond", component: almondEyes() },
  brownAlmond: { label: "Brown Almond", component: almondEyes("#8B5A2B") },
  warmBrownNatural: { label: "Warm Brown", component: eyes({ iris: "#8B5A2B", lid: "soft", lashes: 2 }) },
  warmBrownSoft: { label: "Soft Brown", component: eyes({ iris: "#6B3F1D", lid: "soft" }) },
  blueGreyNatural: { label: "Blue Grey", component: eyes({ iris: "#7D9AAA", lid: "soft", lashes: 1 }) },
  hazelGreenNatural: { label: "Hazel Green", component: eyes({ iris: "#8FA66B", lid: "soft", lashes: 1 }) },
  aquaBlueNatural: { label: "Aqua Blue", component: eyes({ iris: "#4FB3C4", lid: "soft", lashes: 1 }) },
  calmBlueGrey: { label: "Calm Blue Grey", component: eyes({ iris: "#8B9DB3", hooded: true, lashes: 1, shadow: "#C8B8C4" }) },
  softBlueGrey: { label: "Soft Blue Grey", component: eyes({ iris: "#6E8AA3", lid: "soft" }) },
  brightBlueNatural: { label: "Bright Blue", component: eyes({ iris: "#3B82F6", lid: "soft", lashes: 1 }) },
  lashes: { label: "Lashes", component: eyes({ lid: "soft", lashes: 3 }) },
  heavyLashes: { label: "Heavy Lashes", component: eyes({ lid: "bold", lashes: 3 }) },
  wingedLashes: { label: "Winged Lashes", component: eyes({ lid: "wing", lashes: 2 }) },
  wingedGlamEyes: { label: "Winged Glam", component: eyes({ iris: "#5E7B87", lid: "wing", lashes: 1 }) },
  glamGreyEyes: { label: "Glam Grey", component: eyes({ iris: "#94A3B8", lid: "bold", lashes: 2, shadow: "#C9A27E" }) },
  blueGreyGlam: { label: "Blue Grey Glam", component: eyes({ iris: "#64748B", lid: "wing", lashes: 1 }) },
  lightHazel: { label: "Light Hazel", component: eyes({ iris: "#A3E635", lid: "bold", lashes: 2 }) },
  brightBlueGlam: { label: "Bright Blue Glam", component: eyes({ iris: "#3B82F6", lid: "bold", lashes: 2 }) },
  greenLavenderGlam: { label: "Green Lavender Glam", component: eyes({ iris: "#22C55E", lid: "bold", lashes: 2, shadow: "#A78BFA" }) },
  blueWinged: { label: "Blue Winged", component: eyes({ iris: "#3B82F6", lid: "wing", lashes: 2 }) },
  happyBrownFeminine: { label: "Happy Brown", component: eyes({ iris: "#8B5A2B", lid: "soft", lashes: 2, happy: true, shadow: "#E8C9B8" }) },
  winking: { label: "Winking", component: winkingEyes },
  tired: { label: "Tired", component: tiredEyes },
};

export const Eyes: PartRegistry<EyesId> = STYLES;
