import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaNoseIds = ["ursulaNose"] as const;
export type UrsulaNoseId = (typeof UrsulaNoseIds)[number];

/** Long, straight nose from the reference: shaded bridge, rounded wings and a soft dip under the tip. */
const BRIDGE = "M 45.4 43.6 C 46.6 45.6, 47.4 48, 47.6 50.8 M 55.4 43.6 C 54 45.6, 53.4 48.4, 53.3 51.5 C 53.3 53.4, 53.4 55.2, 53.8 57";
const TIP_SHADE = "M 43.6 61 C 46.2 61.2, 48.4 62.6, 50.45 63.3 C 52.5 62.6, 54.7 61.2, 57.3 61";
const PHILTRUM = "M 50.45 66 L 50.5 69.4";
const WINGS = "M 44.3 58.1 C 43.2 59.2, 42.6 60.8, 42.9 62.2 C 43.1 62.9, 43.6 63.3, 44.4 63.5 M 56.6 58.1 C 57.7 59.2, 58.3 60.8, 58 62.2 C 57.8 62.9, 57.3 63.3, 56.5 63.5";
const BASE = "M 45.3 62.3 C 46.9 62.6, 48.2 63.6, 49.2 64.6 C 49.9 65.3, 51 65.3, 51.7 64.6 C 52.7 63.6, 54 62.6, 55.6 62.3";

const ursulaNose: PartComponent = () => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={BRIDGE} stroke="#C4947C" strokeWidth="0.95" strokeOpacity="0.75" />
    <path d={TIP_SHADE} stroke="#D8A890" strokeWidth="1.6" strokeOpacity="0.7" />
    <path d={PHILTRUM} stroke="#D8A890" strokeWidth="1.7" strokeOpacity="0.55" />
    <path d={`${WINGS} ${BASE}`} stroke="currentColor" strokeWidth="1.05" />
  </g>
);

export const UrsulaNoses: PartRegistry<UrsulaNoseId> = {
  ursulaNose: {
    component: ursulaNose,
    label: "Ursula Nose",
    presetOnly: true,
    isExclusive: true,
  },
};
