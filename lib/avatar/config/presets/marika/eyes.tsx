import { PartRegistry, PartComponent } from "../../../parts/common";

export const MarikaEyesIds = ["marikaSoftBlue", "marikaProfoundBlue", "marikaAtelier"] as const;

export type MarikaEyesId = (typeof MarikaEyesIds)[number];

interface GlamEyeStyle {
  shadow: string;
  iris: string;
  /** Upper lid line weight; heavier reads as liner. */
  lid: number;
  /** Soft smudge under the eye (smoky looks). */
  smudge?: string;
}

/** Shadow, lid and lashes are drawn with +x pointing away from the nose (mirrored for the left eye), so the wings point outwards. */
const GlamEye = ({ x, style }: { x: number; style: GlamEyeStyle }) => {
  const side = `translate(${x}, 46) scale(${x < 50 ? -1 : 1}, 1)`;
  return (
    <g>
      <path transform={side} d="M -9.5 -2.2 C -6 -9.2, 5 -9.8, 9.5 -3.6 C 4.5 -6.8, -4 -6.4, -9.5 -2.2 Z" fill={style.shadow} opacity="0.5" />
      <g transform={`translate(${x}, 46)`}>
        <circle r="4.3" fill={style.iris} />
        <circle r="1.9" fill="#1F2933" />
        <circle cx="1.5" cy="-1.6" r="1.3" fill="white" />
      </g>
      <g transform={side} fill="none" stroke="#3A2E2A" strokeLinecap="round">
        <path d="M -7.2 -1.6 C -4.6 -5.6, 3.8 -6, 7.4 -2.6" strokeWidth={style.lid} />
        <path d="M 7.4 -2.6 L 9.8 -4.3" strokeWidth={style.lid * 0.75} />
        <path d="M 4.8 -4.4 L 5.8 -6.3 M 2 -5.3 L 2.4 -7.2" strokeWidth="0.6" />
        {style.smudge && <path d="M -5.2 3.2 Q 0.5 5, 6.2 2.8" stroke={style.smudge} strokeWidth="0.9" opacity="0.55" />}
        {!style.smudge && <path d="M -4.8 3.1 Q 0 4.6, 4.8 3.1" strokeWidth="0.5" opacity="0.3" />}
      </g>
    </g>
  );
};

const glamEyes = (style: GlamEyeStyle): PartComponent => {
  const Eyes: PartComponent = () => (
    <g>
      <GlamEye x={35} style={style} />
      <GlamEye x={65} style={style} />
    </g>
  );
  return Eyes;
};

/* Drawn around the eye centre with +x pointing away from the nose (the left eye is mirrored). */
const ALMOND = "M -7.4 0.4 C -4.8 -4.6, 3.8 -5.4, 8 -1.4 C 4.8 2.8, -3 3.9, -7.4 0.4 Z";
const UPPER_LID = "M -7.4 0.4 C -4.8 -4.6, 3.8 -5.4, 8 -1.4 L 10.6 -3.2";
const LOWER_LID = "M -5.6 1.9 C -2.2 3.7, 3.2 3.4, 7.6 -0.8";
const CREASE = "M -6.6 -2 C -4 -6.8, 4.2 -7.6, 9 -3.2";
const SMOKE = "M -7.8 0.2 C -5.6 -7.6, 5.6 -9, 11.2 -3.3 C 7 -3.6, 4 -5.4, 0 -5.2 C -3.4 -5, -5.8 -2.6, -7.8 0.2 Z";
const LASHES = "M 3.6 -4.6 L 4.2 -6.3 M 5.7 -3.8 L 6.7 -5.4 M 7.5 -2.6 L 8.9 -3.8";

/** Almond, slightly hooded eyes with smoky mauve lids and liner, as in her portraits. */
const AlmondEye = ({ x, uid }: { x: number; uid: string }) => {
  const outward = x < 50 ? "scale(-1, 1)" : undefined;
  const clipId = `${uid}-marika-eye-${x}`;
  return (
    <g transform={`translate(${x}, 46)`}>
      <defs>
        <clipPath id={clipId}>
          <path d={ALMOND} transform={outward} />
        </clipPath>
      </defs>
      <path d={SMOKE} transform={outward} fill="#A9879E" opacity="0.5" />
      <path d={ALMOND} transform={outward} fill="#FBF8F6" />
      <g clipPath={`url(#${clipId})`}>
        <circle cx="0.3" cy="-0.4" r="3.8" fill="#8C9CC6" stroke="#5B6890" strokeWidth="0.5" />
        <circle cx="0.3" cy="-0.4" r="1.7" fill="#1F2933" />
        <circle cx="1.5" cy="-1.7" r="1" fill="white" />
        <path d={UPPER_LID} transform={outward} fill="none" stroke="black" strokeOpacity="0.2" strokeWidth="2.2" />
      </g>
      <g transform={outward} fill="none" stroke="#2E2428" strokeLinecap="round" strokeLinejoin="round">
        <path d={CREASE} stroke="#9C7480" strokeWidth="0.6" strokeOpacity="0.7" />
        <path d={LOWER_LID} stroke="#5E4652" strokeWidth="0.8" strokeOpacity="0.55" />
        <path d={UPPER_LID} strokeWidth="1.4" />
        <path d={LASHES} strokeWidth="0.55" />
      </g>
    </g>
  );
};

const marikaSoftBlue: PartComponent = ({ uid = "fv" }) => (
  <g>
    <AlmondEye x={35} uid={uid} />
    <AlmondEye x={65} uid={uid} />
  </g>
);

/** Smoky taupe lids with liner, blue-grey eyes. */
const marikaProfoundBlue = glamEyes({ shadow: "#B99CA6", iris: "#7A9BBA", lid: 1.6, smudge: "#6B5560" });

const marikaAtelier: PartComponent = () => (
  <g>
    <path d="M 20 42 Q 32 25, 45 42" fill="#D946EF" opacity="0.4" filter="blur(1px)" />
    <path d="M 55 42 Q 68 25, 80 42" fill="#D946EF" opacity="0.4" filter="blur(1px)" />

    <g transform="translate(35, 45)">
      <circle r="4.6" fill="#3B82F6" />
      <circle r="2.5" fill="#1e1b4b" />
      <circle r="1.5" fill="black" />
      <circle cx="1.5" cy="-2" r="1.2" fill="white" />

      <path d="M -10 -2 Q -5 -8, 2 -5" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" />

      <path d="M -9 2 Q 0 5, 9 2" fill="none" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </g>

    <g transform="translate(65, 45)">
      <circle r="4.6" fill="#3B82F6" />
      <circle r="2.5" fill="#1e1b4b" />
      <circle r="1.5" fill="black" />
      <circle cx="1.5" cy="-2" r="1.2" fill="white" />

      <path d="M 10 -2 Q 5 -8, -2 -5" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" />

      <path d="M 9 2 Q 0 5, -9 2" fill="none" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </g>
  </g>
);

const preset = { presetOnly: true, isExclusive: true };

export const MarikaEyes: PartRegistry<MarikaEyesId> = {
  marikaSoftBlue: { component: marikaSoftBlue, label: "Marika Soft Blue", ...preset },
  marikaProfoundBlue: { component: marikaProfoundBlue, label: "Marika Profound Blue", ...preset },
  marikaAtelier: { component: marikaAtelier, label: "Marika Atelier", ...preset },
};
