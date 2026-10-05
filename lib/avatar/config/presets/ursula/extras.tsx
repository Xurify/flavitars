import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

/** A soft peach flush high on the cheeks. */
const ursulaCheeks: PartComponent = () => (
  <g opacity="0.22" fill="#EF9A86" filter="blur(2px)">
    <circle cx="32" cy="57" r="6.5" />
    <circle cx="68" cy="57" r="6.5" />
  </g>
);

export const UrsulaExtras: PartRegistry<UrsulaExtrasId> = {
  ursulaCheeks: {
    component: ursulaCheeks,
    label: "Ursula Cheeks",
    presetOnly: true,
    isExclusive: true,
  },
};
