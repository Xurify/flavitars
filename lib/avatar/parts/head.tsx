import { PartComponent } from "./common";

export const HeadIds = ["square", "rounded", "angular", "oval"] as const;
export type HeadId = (typeof HeadIds)[number];

export const HEAD_PATHS: Record<string, string> = {
  square: "M20 22 Q 50 18, 80 22 L 78 85 Q 50 92, 22 85 Z",
  rounded: "M20 30 C 20 10, 80 10, 80 30 C 80 60, 80 85, 50 92 C 20 85, 20 60, 20 30 Z",
  angular: "M20 20 L 80 20 L 75 75 L 50 92 L 25 75 Z",
  oval: "M20 40 C 20 10, 80 10, 80 40 C 80 70, 75 90, 50 90 C 25 90, 20 70, 20 40 Z",
};

export const HeadShapes: Record<string, PartComponent> = {
  square: ({ fill }) => <path d={HEAD_PATHS.square} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  rounded: ({ fill }) => <path d={HEAD_PATHS.rounded} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  angular: ({ fill }) => <path d={HEAD_PATHS.angular} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  oval: ({ fill }) => <path d={HEAD_PATHS.oval} fill={fill} stroke="currentColor" strokeWidth="2" />,
};
