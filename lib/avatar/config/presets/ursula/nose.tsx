import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaNoseIds = ["ursulaNose"] as const;
export type UrsulaNoseId = (typeof UrsulaNoseIds)[number];

/** Long, straight nose: a soft line down the bridge that hooks into a rounded tip. */
const ursulaNose: PartComponent = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 47.6 47 C 47.2 51, 46.6 54.5, 46.4 56.5" strokeWidth="1.2" strokeOpacity="0.4" />
    <path d="M 46.4 56.5 C 46 59.4, 48.6 60.8, 51.4 60.2 C 52.8 59.9, 53.8 59.2, 54.2 58.2" strokeWidth="1.5" />
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
