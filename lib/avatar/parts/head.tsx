import {
  HeadIds,
  type HeadId,
  HEADS,
  HEAD_PATHS,
  getHead,
  getEarPath,
  getEarDetailPath,
  getHeadFacialTransform,
  NECK_PATH,
} from "../anatomy";
import { PartRegistry, PartComponent } from "./common";

export { HeadIds, type HeadId, HEAD_PATHS };

const HEAD_LABELS: Record<HeadId, string> = {
  square: "Square",
  rounded: "Rounded",
  angular: "Angular",
  oval: "Oval",
  slender: "Slender",
};

const headPart = (headId: HeadId): PartComponent => {
  const Head: PartComponent = ({ fill }) => (
    <path d={HEADS[headId].path} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  );
  return Head;
};

export const HeadShapes: PartRegistry<HeadId> = Object.fromEntries(
  HeadIds.map((id) => [id, { component: headPart(id), label: HEAD_LABELS[id] }]),
) as PartRegistry<HeadId>;

export const Ears: PartComponent = ({ headId, fill }) => (
  <g transform={getHeadFacialTransform(headId)} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    {[true, false].map((isLeft) => (
      <g key={String(isLeft)}>
        <path d={getEarPath(headId, isLeft)} />
        <path d={getEarDetailPath(headId, isLeft)} fill="none" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
      </g>
    ))}
  </g>
);

export const Neck: PartComponent = ({ headId, fill, uid = "fv" }) => (
  <g>
    <defs>
      <clipPath id={`${uid}-neck`}>
        <path d={NECK_PATH} />
      </clipPath>
    </defs>
    <path d={NECK_PATH} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path
      d={getHead(headId).path}
      transform="translate(0, 5)"
      fill="black"
      opacity="0.12"
      clipPath={`url(#${uid}-neck)`}
    />
  </g>
);
