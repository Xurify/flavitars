import { PartRegistry, PartComponent, AvatarItem, createAvatarItem } from "./common";

export const ExtrasId = ["none", "freckles", "blush", "beautyMark"] as const;
export type ExtrasId = (typeof ExtrasId)[number];

const noneExtra: PartComponent = () => null;

// [x, y, r] on the left cheek and across the nose bridge; the right cheek mirrors the cheek ones.
const CHEEK_FRECKLES = [
  [29.5, 56.6, 0.75],
  [32.6, 55.4, 0.6],
  [35.4, 57.2, 0.8],
  [31.4, 59.1, 0.65],
  [34.3, 60.2, 0.55],
  [37.9, 55.6, 0.5],
  [38.4, 59.3, 0.6],
] as const;
const NOSE_FRECKLES = [
  [46.2, 55.1, 0.45],
  [50.3, 54.2, 0.4],
  [53.9, 55.3, 0.45],
] as const;

const frecklesExtra: PartComponent = () => (
  <g fill="#7A3E1D" opacity="0.55">
    {CHEEK_FRECKLES.flatMap(([x, y, r]) => [
      <circle key={`l${x}`} cx={x} cy={y} r={r} />,
      <circle key={`r${x}`} cx={100 - x} cy={y + (x % 2 ? 0.3 : -0.2)} r={r} />,
    ])}
    {NOSE_FRECKLES.map(([x, y, r]) => (
      <circle key={`n${x}`} cx={x} cy={y} r={r} />
    ))}
  </g>
);

const blushExtra: PartComponent = () => (
  <g>
    <g transform="translate(30, 57)" opacity="0.15">
      <circle r="6" fill="#F87171" />
      <circle r="3" fill="#EF4444" opacity="0.5" />
    </g>
    <g transform="translate(70, 57)" opacity="0.15">
      <circle r="6" fill="#F87171" />
      <circle r="3" fill="#EF4444" opacity="0.5" />
    </g>
  </g>
);

const beautyMarkExtra: PartComponent = () => (
  <g>
    <circle cx="67" cy="67.5" r="1.1" fill="#4B2C20" opacity="0.85" />
  </g>
);

export const ExtrasItems: AvatarItem[] = [
  createAvatarItem({ id: "none", name: "None", svg: noneExtra }),
  createAvatarItem({ id: "freckles", name: "Freckles", svg: frecklesExtra }),
  createAvatarItem({ id: "blush", name: "Blush", svg: blushExtra }),
  createAvatarItem({ id: "beautyMark", name: "Beauty Mark", svg: beautyMarkExtra }),
];

export const Extras: PartRegistry<ExtrasId> = Object.fromEntries(
  ExtrasItems.map((item) => [item.id, { component: item.svg, label: item.name }])
) as PartRegistry<ExtrasId>;
