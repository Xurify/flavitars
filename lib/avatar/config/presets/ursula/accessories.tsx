import { PartRegistry, PartComponent, getEarLobe } from "../../../parts/common";

export const UrsulaAccessoryIds = ["ursulaPearlEarrings"] as const;
export type UrsulaAccessoryId = (typeof UrsulaAccessoryIds)[number];

/** A single pearl hanging just below each ear lobe. */
const Pearl = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle r="2.45" fill="#B7B5AD" />
    <circle r="1.75" fill="#FCFCFA" />
    <circle cx="-0.55" cy="-0.6" r="0.55" fill="white" />
  </g>
);

const ursulaPearlEarrings: PartComponent = ({ headId }) => {
  const left = getEarLobe(headId, true);
  const right = getEarLobe(headId, false);
  return (
    <g>
      <Pearl x={left.x + 1.3} y={left.y + 6.1} />
      <Pearl x={right.x - 1.3} y={right.y + 6.1} />
    </g>
  );
};

export const UrsulaAccessories: PartRegistry<UrsulaAccessoryId> = {
  ursulaPearlEarrings: {
    component: ursulaPearlEarrings,
    label: "Ursula Pearl Earrings",
    presetOnly: true,
    isExclusive: true,
  },
};
