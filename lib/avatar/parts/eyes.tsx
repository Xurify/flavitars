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
 * Every style is built from the same cartoon pieces so they read as one family: a round eye (an
 * iris in an ink ring, or a plain ink dot) that always stays fully open, an optional liner hugging
 * its top, tapered lashes rooted on its outer edge, and a flat patch of eyeshadow.
 *
 * Lashes, liner and shadow are drawn in a frame where +x points away from the nose (the left eye's
 * frame is mirrored). The iris and its highlights are not mirrored, so light falls the same way on
 * both eyes and the gaze stays straight.
 */
interface EyeStyle {
  /** Iris colour; without one the eye is a plain ink dot. */
  iris?: string;
  /** Liner hugging the top of the eye; "wing" flicks out at the outer corner. */
  liner?: "thin" | "bold" | "wing";
  /** Lashes on the outer upper edge. */
  lashes?: 0 | 1 | 2 | 3;
  /** Flat eyeshadow above the eye. */
  shadow?: string;
  /** Star-shaped highlight instead of a round one. */
  sparkle?: boolean;
}

const PUPIL = "#1F2933";
const IRIS_R = 4.6;
const DOT_R = 4.2;
const SHADOW = "M -8 -3 C -6 -10, 6 -11, 10 -4 C 6 -7.6, -3 -7.8, -8 -3 Z";
const SPARKLE = "M 1.6 -4 Q 1.9 -2, 3.9 -1.7 Q 1.9 -1.4, 1.6 0.6 Q 1.3 -1.4, -0.7 -1.7 Q 1.3 -2, 1.6 -4 Z";
const LASH_ANGLES = [-34, -56, -78];

const round = (n: number) => +n.toFixed(2);
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [r * Math.cos(a), r * Math.sin(a)] as const;
};

/** A lash as a filled wedge: base centred on (x, y), tip `length` away at angle `deg`. */
const wedge = (x: number, y: number, deg: number, length: number, base = 0.8) => {
  const [px, py] = polar(base, deg + 90);
  const [dx, dy] = polar(length, deg);
  return `M ${round(x - px)} ${round(y - py)} L ${round(x + dx)} ${round(y + dy)} L ${round(x + px)} ${round(y + py)} Z`;
};

/** A lash rooted on a circle of radius `r` at angle `deg`, leaning slightly outwards. */
const ringLash = (r: number, deg: number, length: number) => {
  const [x, y] = polar(r, deg);
  return wedge(x, y, deg + 14, length);
};

const arc = (r: number, from: number, to: number) => {
  const [x0, y0] = polar(r, from);
  const [x1, y1] = polar(r, to);
  return `M ${round(x0)} ${round(y0)} A ${r} ${r} 0 0 1 ${round(x1)} ${round(y1)}`;
};

const Highlights = ({ sparkle }: { sparkle?: boolean }) => (
  <g fill="white">
    {sparkle ? <path d={SPARKLE} /> : <circle cx="1.6" cy="-1.7" r="1.6" />}
    <circle cx="-1.5" cy="1.6" r="0.7" opacity="0.6" />
  </g>
);

const Iris = ({ color, sparkle }: { color?: string; sparkle?: boolean }) => (
  <g>
    {color ? (
      <g>
        <circle r={IRIS_R} fill={color} stroke="currentColor" strokeWidth="1.2" />
        <circle r="2.1" fill={PUPIL} />
      </g>
    ) : (
      <circle r={DOT_R} fill="currentColor" />
    )}
    <Highlights sparkle={sparkle} />
  </g>
);

/** Liner, wing and lashes for one eye, in the outward-facing frame. */
const Lining = ({ style }: { style: EyeStyle }) => {
  const edge = style.iris ? IRIS_R + 0.6 : DOT_R;
  const liner = style.liner && (style.liner === "thin" ? { r: edge, width: 1.6 } : { r: edge + 0.6, width: 2.6 });
  const root = liner ? liner.r : edge;
  const [wingX, wingY] = polar(root, -10);
  return (
    <g>
      {liner && <path d={arc(liner.r, -165, -12)} fill="none" stroke="currentColor" strokeWidth={liner.width} strokeLinecap="round" />}
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round">
        {style.liner === "wing" && <path d={wedge(wingX, wingY, -32, 4.8, 1.3)} />}
        {LASH_ANGLES.slice(0, style.lashes ?? 0).map((deg, i) => (
          <path key={deg} d={ringLash(root, deg, 3.6 - i * 0.3)} />
        ))}
      </g>
    </g>
  );
};

const outward = (x: number) => (x < 50 ? "scale(-1, 1)" : undefined);

const eyes = (style: EyeStyle): PartComponent => {
  const Eyes: PartComponent = () => (
    <g>
      {[35, 65].map((x) => (
        <g key={x} transform={`translate(${x}, 45)`}>
          {style.shadow && <path d={SHADOW} transform={outward(x)} fill={style.shadow} opacity="0.55" />}
          <Iris color={style.iris} sparkle={style.sparkle} />
          <g transform={outward(x)}>
            <Lining style={style} />
          </g>
        </g>
      ))}
    </g>
  );
  return Eyes;
};

/** Outlined almond eye looking straight ahead, with one lash flicking out at the outer corner. */
const almondEyes = (iris?: string): PartComponent => {
  const Eyes: PartComponent = () => (
    <g>
      {[35, 65].map((x) => (
        <g key={x} transform={`translate(${x}, 45)`}>
          <path d="M -8 0 Q 0 -8, 8 0 Q 0 8, -8 0 Z" fill="white" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          {iris && <circle r="3.4" fill={iris} />}
          <circle r={iris ? 1.8 : 2.8} fill={PUPIL} />
          <circle cx="1.1" cy="-1.2" r="1" fill="white" />
          <path
            d={wedge(6.4, -1.6, -36, 4, 1.1)}
            transform={outward(x)}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </g>
  );
  return Eyes;
};

/** The left eye squeezed shut in a happy arc with two lashes, the right one wide open. */
const winkingEyes: PartComponent = () => (
  <g>
    <g transform="translate(35, 45) scale(-1, 1)">
      <path d="M -5.5 0.8 Q 0 -4.4, 5.5 0.8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round">
        <path d={wedge(4.4, -0.3, -38, 3.4)} />
        <path d={wedge(2.2, -1.5, -62, 3.1)} />
      </g>
    </g>
    <g transform="translate(65, 45)">
      <Iris />
    </g>
  </g>
);

const HALF_X = round(Math.sqrt(DOT_R ** 2 - 1.4 ** 2));
const HALF_DOT = `M ${-HALF_X} -1.4 A ${DOT_R} ${DOT_R} 0 1 0 ${HALF_X} -1.4 Z`;

/** Sleepy: the lid drops to the middle of the eye, with a soft line underneath. */
const tiredEyes: PartComponent = () => (
  <g>
    {[35, 65].map((x) => (
      <g key={x} transform={`translate(${x}, 46)`}>
        <path d={HALF_DOT} fill="currentColor" />
        <circle cx="1.4" cy="0.4" r="1" fill="white" />
        <path d="M -5.8 -1.2 Q 0 -2.6, 5.8 -1.2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M -4 5.4 Q 0 6.8, 4 5.4" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      </g>
    ))}
  </g>
);

export const Eyes: PartRegistry<EyesId> = {
  standard: { label: "Standard", component: eyes({}) },
  almond: { label: "Almond", component: almondEyes() },
  brownAlmond: { label: "Brown Almond", component: almondEyes("#8B5A2B") },
  warmBrownNatural: { label: "Warm Brown", component: eyes({ iris: "#8B5A2B", lashes: 2 }) },
  warmBrownSoft: { label: "Soft Brown", component: eyes({ iris: "#6B3F1D" }) },
  blueGreyNatural: { label: "Blue Grey", component: eyes({ iris: "#7D9AAA", lashes: 1 }) },
  hazelGreenNatural: { label: "Hazel Green", component: eyes({ iris: "#8FA66B", lashes: 1 }) },
  aquaBlueNatural: { label: "Aqua Blue", component: eyes({ iris: "#4FB3C4", lashes: 1 }) },
  calmBlueGrey: { label: "Calm Blue Grey", component: eyes({ iris: "#8B9DB3", liner: "thin", lashes: 1, shadow: "#C8B8C4" }) },
  softBlueGrey: { label: "Soft Blue Grey", component: eyes({ iris: "#6E8AA3" }) },
  brightBlueNatural: { label: "Bright Blue", component: eyes({ iris: "#3B82F6", lashes: 1 }) },
  lashes: { label: "Lashes", component: eyes({ lashes: 3 }) },
  heavyLashes: { label: "Heavy Lashes", component: eyes({ liner: "bold", lashes: 3 }) },
  wingedLashes: { label: "Winged Lashes", component: eyes({ liner: "wing", lashes: 2 }) },
  wingedGlamEyes: { label: "Winged Glam", component: eyes({ iris: "#5E7B87", liner: "wing", lashes: 1 }) },
  glamGreyEyes: { label: "Glam Grey", component: eyes({ iris: "#94A3B8", liner: "bold", lashes: 2, shadow: "#C9A27E" }) },
  blueGreyGlam: { label: "Blue Grey Glam", component: eyes({ iris: "#64748B", liner: "wing", lashes: 1 }) },
  lightHazel: { label: "Light Hazel", component: eyes({ iris: "#A3E635", liner: "bold", lashes: 2 }) },
  brightBlueGlam: { label: "Bright Blue Glam", component: eyes({ iris: "#3B82F6", liner: "bold", lashes: 2 }) },
  greenLavenderGlam: { label: "Green Lavender Glam", component: eyes({ iris: "#22C55E", liner: "bold", lashes: 2, shadow: "#A78BFA" }) },
  blueWinged: { label: "Blue Winged", component: eyes({ iris: "#3B82F6", liner: "wing", lashes: 2 }) },
  happyBrownFeminine: { label: "Happy Brown", component: eyes({ iris: "#8B5A2B", lashes: 2, sparkle: true, shadow: "#E8C9B8" }) },
  winking: { label: "Winking", component: winkingEyes },
  tired: { label: "Tired", component: tiredEyes },
};
