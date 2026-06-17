import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 76)">
    {/* Warm-pink lips, parted in a big open smile */}
    <path
      d="M -11.3 -3.0
         Q -5.5 -4.2, 0 -3.6
         Q 5.5 -4.2, 11.3 -3.0
         Q 6.2 2.7, 0 3.4
         Q -6.2 2.7, -11.3 -3.0 Z"
      fill="#E6A3A0"
      stroke="#CB8480"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    {/* Open mouth interior (soft shadow behind the teeth) */}
    <path
      d="M -10.2 -2.7
         Q -4.8 -1.5, 0 -1.1
         Q 4.8 -1.5, 10.2 -2.7
         Q 4.8 1.4, 0 2.0
         Q -4.8 1.4, -10.2 -2.7 Z"
      fill="#9A5E60"
    />
    {/* Upper teeth */}
    <path
      d="M -9 -2.3
         Q -4.4 -1.1, 0 -0.8
         Q 4.4 -1.1, 9 -2.3
         Q 4.4 1.0, 0 1.3
         Q -4.4 1.0, -9 -2.3 Z"
      fill="#FCFCFA"
    />
    {/* Subtle tooth separations */}
    <g stroke="#C7B5AD" strokeWidth="0.3" opacity="0.5" strokeLinecap="round">
      <line x1="0" y1="-0.8" x2="0" y2="1.2" />
      <line x1="-2.9" y1="-0.95" x2="-3.0" y2="1.0" />
      <line x1="2.9" y1="-0.95" x2="3.0" y2="1.0" />
      <line x1="-5.6" y1="-1.4" x2="-5.8" y2="0.5" />
      <line x1="5.6" y1="-1.4" x2="5.8" y2="0.5" />
    </g>
    {/* Upper lip line meeting the teeth */}
    <path
      d="M -10.2 -2.7 Q -4.8 -1.5, 0 -1.1 Q 4.8 -1.5, 10.2 -2.7"
      fill="none"
      stroke="#B97A78"
      strokeWidth="0.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Upturned mouth corners for a strong smile */}
    <path d="M -11.3 -3.0 Q -12.1 -4.0, -10.9 -4.2" fill="none" stroke="#CB8480" strokeWidth="0.5" strokeLinecap="round" opacity="0.7" />
    <path d="M 11.3 -3.0 Q 12.1 -4.0, 10.9 -4.2" fill="none" stroke="#CB8480" strokeWidth="0.5" strokeLinecap="round" opacity="0.7" />
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
