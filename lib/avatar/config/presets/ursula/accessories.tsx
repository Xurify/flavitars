import { PartRegistry, PartComponent, getHeadSideOffset } from "../../../parts/common";

export const UrsulaAccessoryIds = ["ursulaPearlEarrings"] as const;
export type UrsulaAccessoryId = (typeof UrsulaAccessoryIds)[number];

const ursulaPearlEarrings: PartComponent = ({ headId }) => {
  const leftX = getHeadSideOffset(headId, true) * 0.5;
  const rightX = getHeadSideOffset(headId, false) * 0.5;
  return (
    <g>
      {/* Left Earring */}
      <g transform={`translate(${leftX}, 0)`}>
        <circle cx="22" cy="61" r="0.8" fill="#F59E0B" />
        <circle cx="22" cy="64" r="2.2" fill="#FAFAFA" stroke="#D1D5DB" strokeWidth="0.5" />
        <circle cx="21.3" cy="63.3" r="0.6" fill="white" opacity="0.6" />
      </g>
      {/* Right Earring */}
      <g transform={`translate(${rightX}, 0)`}>
        <circle cx="78" cy="61" r="0.8" fill="#F59E0B" />
        <circle cx="78" cy="64" r="2.2" fill="#FAFAFA" stroke="#D1D5DB" strokeWidth="0.5" />
        <circle cx="77.3" cy="63.3" r="0.6" fill="white" opacity="0.6" />
      </g>
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
