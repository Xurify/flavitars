import { PartRegistry, PartComponent } from "../../../parts/common";
import { registerPresetHead } from "../../../anatomy";

export const MarikaHeadIds = ["marikaHead"] as const;
export type MarikaHeadId = (typeof MarikaHeadIds)[number];

/** The rounded skull (so her hair sits as on "rounded"), with a soft oval jaw and a rounded chin. */
const MARIKA_HEAD_PATH =
  "M 20 30 C 20 10, 80 10, 80 30 C 80 50, 78.5 66, 72 77.5 C 66 87, 58 92, 50 92 C 42 92, 34 87, 28 77.5 C 21.5 66, 20 50, 20 30 Z";

registerPresetHead("marikaHead", { path: MARIKA_HEAD_PATH, top: 15, faceOffset: 3, earX: 80 });

const marikaHead: PartComponent = ({ fill }) => (
  <path d={MARIKA_HEAD_PATH} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
);

export const MarikaHeads: PartRegistry<MarikaHeadId> = {
  marikaHead: { component: marikaHead, label: "Marika Head", presetOnly: true, isExclusive: true },
};
