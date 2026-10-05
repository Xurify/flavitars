import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

/** Rosy, lifted cheeks. */
const ursulaCheeks: PartComponent = () => (
  <g fill="#F08A80" opacity="0.2" filter="blur(2px)">
    <ellipse cx="30.5" cy="57.5" rx="6.5" ry="5" />
    <ellipse cx="69.5" cy="57.5" rx="6.5" ry="5" />
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
