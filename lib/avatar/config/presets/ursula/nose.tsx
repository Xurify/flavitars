import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaNoseIds = ["ursulaNose"] as const;
export type UrsulaNoseId = (typeof UrsulaNoseIds)[number];

/** A neat straight nose: a short line down one side into a rounded tip. */
const ursulaNose: PartComponent = () => (
  <path
    d="M 48.3 52.5 C 47.4 55, 46.7 56.8, 47.1 58.3 C 47.8 60.2, 52 60.4, 53.3 58.4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export const UrsulaNoses: PartRegistry<UrsulaNoseId> = {
  ursulaNose: {
    component: ursulaNose,
    label: "Ursula Nose",
    presetOnly: true,
    isExclusive: true,
  },
};
