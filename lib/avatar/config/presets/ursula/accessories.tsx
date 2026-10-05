import { PartRegistry, PartComponent, getEarringTransform } from "../../../parts/common";

export const UrsulaAccessoryIds = ["ursulaPearlEarrings"] as const;
export type UrsulaAccessoryId = (typeof UrsulaAccessoryIds)[number];

const ursulaPearlEarrings: PartComponent = ({ headId }) => {
  return (
    <g>
      {/* Left Earring */}
      <g transform={getEarringTransform(headId, true, 22, 55)}>
        <circle cx="22" cy="61" r="0.8" fill="#F59E0B" />
        <circle cx="22" cy="64" r="2.2" fill="#FAFAFA" stroke="#D1D5DB" strokeWidth="0.5" />
        <circle cx="21.3" cy="63.3" r="0.6" fill="white" opacity="0.6" />
      </g>
      {/* Right Earring */}
      <g transform={getEarringTransform(headId, false, 78, 55)}>
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
