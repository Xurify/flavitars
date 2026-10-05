import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaNoseIds = ["ursulaNose"] as const;
export type UrsulaNoseId = (typeof UrsulaNoseIds)[number];

/** A small centred nose: a faint line down one side into the rounded tip. */
const ursulaNose: PartComponent = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 47.2 58.8 C 48.2 60.6, 51.8 60.6, 52.8 58.8" strokeWidth="1.6" />
    <path d="M 48.6 51.5 C 48.2 54, 47.4 56.2, 46.6 57.6" strokeWidth="1.1" strokeOpacity="0.35" />
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
