import { PartRegistry, PartComponent } from "../../../parts/common";

export const MarikaNoseIds = ["marikaNose"] as const;
export type MarikaNoseId = (typeof MarikaNoseIds)[number];

/** Long, narrow, straight nose: a shaded bridge, small rounded wings and a soft tip. */
const BRIDGE = "M 46.6 44 C 47.4 46.6, 47.8 50, 47.6 54";
const TIP_SHADE = "M 45.6 59 C 47.4 59.4, 48.9 60.3, 50 60.9 C 51.1 60.3, 52.6 59.4, 54.4 59";
const WINGS = "M 46.6 57 C 45.6 57.9, 45.3 59.2, 46 60.1 M 53.4 57 C 54.4 57.9, 54.7 59.2, 54 60.1";
const BASE = "M 47.8 60.7 C 48.7 61.4, 49.4 61.7, 50 61.7 C 50.6 61.7, 51.3 61.4, 52.2 60.7";

const marikaNose: PartComponent = () => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={BRIDGE} stroke="#D7A493" strokeWidth="0.9" strokeOpacity="0.75" />
    <path d={TIP_SHADE} stroke="#E2B2A2" strokeWidth="1.4" strokeOpacity="0.6" />
    <path d={`${WINGS} ${BASE}`} stroke="currentColor" strokeOpacity="0.8" strokeWidth="0.85" />
  </g>
);

export const MarikaNoses: PartRegistry<MarikaNoseId> = {
  marikaNose: { component: marikaNose, label: "Marika Nose", presetOnly: true, isExclusive: true },
};
