import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const MarikaEyebrowsIds = ["marikaArch"] as const;

export type MarikaEyebrowsId = (typeof MarikaEyebrowsIds)[number];

const leftArch = "M 25.5 37.5 C 29 33.5, 36 31.8, 44.5 35";

/** Thin, gently arched brows in a warm brown, so the eyes do the talking. */
const marikaArch: PartComponent = () => (
  <path
    d={`${leftArch} ${mirrorPath(leftArch)}`}
    fill="none"
    stroke="#8A6A55"
    strokeWidth="1.5"
    strokeLinecap="round"
    opacity="0.9"
  />
);

export const MarikaEyebrows: PartRegistry<MarikaEyebrowsId> = {
  marikaArch: { component: marikaArch, label: "Marika Arch", presetOnly: true, isExclusive: true },
};
