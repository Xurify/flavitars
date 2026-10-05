import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaNoseIds = ["ursulaNose"] as const;
export type UrsulaNoseId = (typeof UrsulaNoseIds)[number];

/** A long, straight nose: faint lines down both sides of the bridge into a rounded tip with nostril wings. */
const ursulaNose: PartComponent = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 46.6 46 C 46.4 51, 46 55.5, 45.6 58.6 M 53.4 46 C 53.6 51, 54 55.5, 54.4 58.6" strokeWidth="1" strokeOpacity="0.22" />
    <path d="M 44.8 60.6 C 43.6 62.8, 45.2 64.6, 47.4 64 C 48.6 65.4, 51.4 65.4, 52.6 64 C 54.8 64.6, 56.4 62.8, 55.2 60.6" strokeWidth="1.4" />
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
