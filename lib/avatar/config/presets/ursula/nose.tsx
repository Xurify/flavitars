import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaNoseIds = ["ursulaNose"] as const;
export type UrsulaNoseId = (typeof UrsulaNoseIds)[number];

/** A straight nose with a defined tip and nostril wings, and a faint line down one side. */
const ursulaNose: PartComponent = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 47.4 48 C 47.2 52, 46.8 55.5, 46.4 57.4" strokeWidth="1" strokeOpacity="0.3" />
    <path d="M 45.6 57.8 C 44.8 59.6, 46 60.8, 47.6 60.3 C 48.7 61.4, 51.3 61.4, 52.4 60.3 C 54 60.8, 55.2 59.6, 54.4 57.8" strokeWidth="1.3" />
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
