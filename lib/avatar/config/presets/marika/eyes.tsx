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

/** Soft lavender lids over blue-grey eyes. */
const marikaSoftBlue = glamEyes({ shadow: "#C9B8EC", iris: "#8EA7C2", lid: 1.3 });

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
