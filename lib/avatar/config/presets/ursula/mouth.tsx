import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

const OPENING = "M 37 69.5 C 39.2 71.1, 43.8 71.75, 50.5 71.85 C 57.2 71.75, 61.8 71.1, 64 69.4 C 62.4 72.6, 57.4 75.5, 50.5 75.7 C 43.6 75.5, 38.6 72.6, 37 69.5 Z";
const TEETH = "M 38.4 69 L 62.6 69 L 62.6 70.4 C 59 73, 54.6 74.75, 50.5 74.8 C 46.4 74.75, 42 73, 38.4 70.4 Z";
const TEETH_GAPS = "M 45.4 71.6 L 45.7 74.3 M 50.5 71.85 L 50.5 74.8 M 55.6 71.6 L 55.3 74.3";
const UPPER_LIP = "M 37 69.5 C 39.6 69.2, 43 69.25, 45.8 69.3 C 47.8 69.35, 49.4 69.8, 50.5 70 C 51.6 69.8, 53.2 69.35, 55.2 69.3 C 58 69.25, 61.4 69.15, 64 69.4 C 61.8 71.1, 57.2 71.75, 50.5 71.85 C 43.8 71.75, 39.2 71.1, 37 69.5 Z";
const LOWER_LIP = "M 37 69.5 C 38.6 72.6, 43.6 75.5, 50.5 75.7 C 57.4 75.5, 62.4 72.6, 64 69.4 C 63 73.6, 58.4 78.4, 50.5 78.7 C 42.6 78.4, 38 73.6, 37 69.5 Z";

/** Her wide, warm smile with the top teeth showing and the corners pulled up. */
const ursulaSmile: PartComponent = ({ uid = "fv" }) => (
  <g>
    <defs>
      <clipPath id={`${uid}-ursula-smile`}>
        <path d={OPENING} />
      </clipPath>
    </defs>
    <path d={LOWER_LIP} fill="#C27A73" />
    <path d={UPPER_LIP} fill="#B86F69" />
    <ellipse cx="53.2" cy="77.3" rx="1.7" ry="0.55" fill="#EBA99E" />
    <path d={OPENING} fill="#5E2629" />
    <g clipPath={`url(#${uid}-ursula-smile)`}>
      <path d={TEETH} fill="#FCFAF6" />
      <path d={TEETH_GAPS} fill="none" stroke="#45201A" strokeWidth="0.4" strokeOpacity="0.18" strokeLinecap="round" />
    </g>
    <path d={OPENING} fill="none" stroke="#45201A" strokeWidth="0.95" strokeLinejoin="round" />
  </g>
);

export const UrsulaMouths: PartRegistry<UrsulaMouthId> = {
  ursulaSmile: {
    component: ursulaSmile,
    label: "Ursula Smile",
    presetOnly: true,
    isExclusive: true,
  },
};
