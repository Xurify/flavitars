import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { scallop, type Point } from "../../../parts/shapes";
import { mirrorPath } from "../../../anatomy";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

/** A hairline run whose bumps hang towards the face (curly bangs). */
const curlyRun = (points: Point[]) => scallop(points, { closed: false, inward: true }).replace(/^M/, "L");

/**
 * Loose 80s perm: rounded but close on top, flaring out past the jaw into an A-line, with the
 * lengths resting on the shoulders. Uneven spacing keeps the ringlets from reading as a wig.
 */
const curlyMane = scallop([
  [7, 100],
  [0.5, 95],
  [-2.5, 87.5],
  [-3.5, 79],
  [-3, 70],
  [-4, 65.5],
  [-1.5, 61],
  [0.5, 52.5],
  [3, 44],
  [6, 36],
  [6.3, 31.2],
  [10, 28.5],
  [14.5, 21.5],
  [20, 15.5],
  [26.5, 10.5],
  [33.5, 7],
  [41, 5],
  [48, 4.2],
  [55, 4.6],
  [58.7, 3.9],
  [62, 6.2],
  [68.5, 9],
  [74.5, 13.5],
  [80, 19.5],
  [85, 26.5],
  [89, 34],
  [92.5, 42],
  [95.4, 45.8],
  [95, 50.5],
  [97.5, 59],
  [99.5, 68],
  [100.5, 77],
  [100.5, 86],
  [101.2, 90.2],
  [98.5, 93.5],
  [93, 100],
  [85.5, 101],
  [78.5, 97.5],
  [73, 91],
  [69.5, 83],
  [66, 74],
  [34, 74],
  [30.5, 83],
  [27, 91],
  [21.5, 97.5],
  [14.5, 101],
]);

/** Hairline: lifted off the forehead in the middle, curling down over the temples to the cheeks. */
const curlyHairline: Point[] = [
  [22, 70],
  [22, 62.5],
  [22.5, 55],
  [23, 48],
  [24, 41],
  [26, 34.5],
  [29.5, 29],
  [34.5, 25.5],
  [40.5, 23.5],
  [47, 22.5],
  [53.5, 22.5],
  [60, 23.5],
  [65.5, 25.5],
  [70.5, 29],
  [74, 34.5],
  [76, 41],
  [77, 48],
  [77.5, 55],
  [78, 62.5],
  [78, 70],
];

/** A slim lock hanging `length` below the hairline between two of its points, ending in a rounded tip. */
const fringeLock = ([x0, y0]: Point, [x1, y1]: Point, length: number) => {
  const tipY = Math.max(y0, y1) + length;
  const mid = (x0 + x1) / 2;
  return [
    `C ${x0 - 0.4} ${y0 + length * 0.5}, ${mid - 2.6} ${tipY - 2.2}, ${mid - 1.4} ${tipY - 0.2}`,
    `C ${mid - 0.4} ${tipY + 1.3}, ${mid + 2.2} ${tipY + 0.8}, ${mid + 2} ${tipY - 1.4}`,
    `C ${mid + 1.9} ${tipY - 2.8}, ${x1 + 0.4} ${y1 + length * 0.4}, ${x1} ${y1}`,
  ].join(" ");
};

/** Locks falling onto the forehead, either side of centre: [hairline point they start from, length]. */
const FRINGE_LOCKS = [
  [7, 4.5],
  [10, 4],
] as const;

const curlyFringe = (() => {
  const runs: string[] = [];
  let start = 0;
  for (const [at, length] of FRINGE_LOCKS) {
    runs.push(curlyRun(curlyHairline.slice(start, at + 1)), fringeLock(curlyHairline[at], curlyHairline[at + 1], length));
    start = at + 1;
  }
  return [...runs, curlyRun(curlyHairline.slice(start))].join(" ");
})();

/** Where the ringlets run on the left side: from the crown, down and out with the flare. */
const curlyFlow: Point[][] = [
  [[45, 6], [33, 9], [22.5, 17], [15, 28], [10, 41], [6, 55], [3.5, 69], [3, 82], [6, 95]],
  [[47.5, 11.5], [38.5, 14], [29.5, 20], [22.5, 29.5], [17.5, 41.5], [14, 55], [12, 69], [12, 83], [14.5, 96]],
  [[49, 17.5], [42, 19], [35, 22], [30, 26.5]],
  [[20.5, 62], [20.5, 74], [22, 85], [24.5, 95]],
];

/** Catmull-Rom spline through the points, sampled ten times per span. */
const spline = (points: Point[]): Point[] => {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [points[i - 1] ?? points[i], points[i], points[i + 1], points[i + 2] ?? points[i + 1]];
    for (let step = 0; step < 10; step++) {
      const t = step / 10;
      const at = (k: 0 | 1) =>
        0.5 *
        (2 * p1[k] +
          (p2[k] - p0[k]) * t +
          (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t +
          (3 * p1[k] - p0[k] - 3 * p2[k] + p3[k]) * t * t * t);
      out.push([at(0), at(1)]);
    }
  }
  return [...out, points[points.length - 1]];
};

/**
 * A strand coiling along `points` (one curl of radius `r` every `pitch`), drawn in `on`-long runs
 * with `off` gaps: unbroken, neighbouring strands read as braids instead of separate ringlets.
 */
const ringlets = (points: Point[], { r = 1.3, pitch = 7, on = 13, off = 5, offset = 0, lift = 0 } = {}) => {
  const line = spline(points);
  let travelled = offset;
  let d = "";
  let drawing = false;
  for (let i = 0; i < line.length - 1; i++) {
    const [x0, y0] = line[i];
    const [x1, y1] = line[i + 1];
    const length = Math.hypot(x1 - x0, y1 - y0);
    const [tx, ty] = [(x1 - x0) / length, (y1 - y0) / length];
    for (let s = 0; s < length; s += 0.5) {
      const at = travelled + s;
      if (at % (on + off) >= on) {
        drawing = false;
        continue;
      }
      const a = (at / pitch) * 2 * Math.PI;
      const x = x0 + tx * s + r * (Math.sin(a) * tx - Math.cos(a) * ty) + lift;
      const y = y0 + ty * s + r * (Math.sin(a) * ty + Math.cos(a) * tx) - lift;
      d += `${drawing ? " " : " M "}${x.toFixed(1)} ${y.toFixed(1)}`;
      drawing = true;
    }
    travelled += length;
  }
  return d.trim();
};

/** Both sides, the right one phase-shifted so the curls don't mirror one for one. */
const curlStrands = (lift = 0) => {
  const side = (shift: number) => curlyFlow.map((flow, i) => ringlets(flow, { offset: shift + i * 7, lift })).join(" ");
  return `${side(0)} ${mirrorPath(side(9))}`;
};

const curls = curlStrands();
const curlLights = curlStrands(0.8);
const curlShade = "#7A4A12";

const MARIKA_HAIR: Record<MarikaHairId, HairSpec> = {
  marikaCurlyBangs: {
    cap: capAbove(`M 12 70 L 22 70 ${curlyFringe} L 88 70`),
    front: curlyMane,
    // Shade round the rim and along the fringe gives the mass depth; the ringlets carry the flow.
    paint: () => (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={curlyMane} stroke={curlShade} strokeOpacity="0.14" strokeWidth="7" />
        <path d={`M 22 70 ${curlyFringe}`} stroke={curlShade} strokeOpacity="0.2" strokeWidth="7" />
        <path d={curlLights} stroke="white" strokeOpacity="0.45" strokeWidth="0.9" />
        <path d={curls} stroke={curlShade} strokeOpacity="0.4" strokeWidth="1.2" />
      </g>
    ),
    shine: "M 30 11 C 40 6, 58 5.5, 70 10 C 58 9.5, 44 10.5, 34 15 Z",
    top: 4.2,
  },
  marikaBangsUpdo: {
    // Short crop: a wispy fringe (uneven strands ending in soft points), volume on top, and the
    // sides tucked behind the ears as back hair.
    cap: capAbove(
      "M 12 50 L 21 50 L 21 39.5 C 23 36.5, 24 36.5, 26 40.5 C 28.5 36.6, 30.5 36.6, 33 39.8 C 35 36.2, 37 36.2, 39 41 C 41.5 36.4, 43.5 36.4, 46 40.2 C 48 36, 50 36, 52 40.8 C 54.5 36.3, 56.5 36.3, 59 39.9 C 61.5 36.2, 63.5 36.2, 66 40.6 C 68.5 36.5, 70.5 36.5, 73 40 C 75 36.6, 77 36.6, 79 39.5 L 79 50 L 88 50",
    ),
    front:
      "M 13 45 C 8.5 40, 7.5 30, 10 20 C 14 8, 30 1.5, 50 1.5 C 70 1.5, 86 8, 90 20 C 92.5 30, 91.5 40, 87 45 L 79 44 L 21 44 Z",
    back: "M 18 30 C 12 37, 9.5 48, 13 60 C 20 63, 30 61, 36 59 L 64 59 C 70 61, 80 63, 87 60 C 90.5 48, 88 37, 82 30 Z",
    details:
      "M 26 40 C 26.5 34, 28 28, 30.5 22 M 39 40.5 C 39 34, 40 28, 42 21 M 52 40 C 52 33, 52.5 27, 53.5 20 M 66 40 C 66 34, 65 28, 63 21 M 73 39.5 C 72.5 34, 71 28, 68.5 22 M 32 8 C 24 12, 18 20, 15 30 M 68 8 C 76 12, 82 20, 85 30 M 22 14 C 16 22, 13 32, 13 43 M 78 14 C 84 22, 87 32, 87 43",
    backDetails: "M 13 44 C 11.5 50, 12 55, 14 59 M 87 44 C 88.5 50, 88 55, 86 59",
    shine: "M 28 12 C 37 5.5, 50 3.5, 62 5 C 50 7.5, 39 11, 32 17 Z",
    top: 2,
  },
  marika1: {
    cap: capAbove(
      "M 12 50 L 21 50 L 21 36 Q 23 40, 25 34 L 30 36 Q 34 42, 38 34 L 43 35 Q 47 42, 50 34 L 55 35 Q 59 42, 62 34 L 68 36 Q 72 40, 75 34 Q 77 40, 79 36 L 79 50 L 88 50",
    ),
    front: "M 13 32 C 11 5, 89 5, 87 32 L 90 44 C 94 50, 88 54, 84 48 L 78 40 L 22 40 L 16 48 C 12 54, 6 50, 10 44 Z",
    back: "M 15 25 C 5 45, 0 85, 20 95 L 80 95 C 100 85, 95 45, 85 25 L 75 15 Q 50 5, 25 15 Z",
    details: "M 30 18 Q 32 26, 30 30 M 45 18 Q 48 28, 46 32 M 60 18 Q 58 28, 60 30 M 75 18 Q 72 26, 74 30",
    backDetails: "M 20 35 Q 15 55, 22 75 M 80 35 Q 85 55, 78 75",
    top: 11,
  },
  marikaAtelier: {
    cap: capAbove("M 12 60 L 21 60 L 21 40 Q 30 33, 40 36 Q 46 31, 50 35 Q 54 31, 60 36 Q 70 33, 79 40 L 79 60 L 88 60"),
    front:
      "M 14 36 L 7 26 L 12 16 L 7 6 L 17 3.5 L 15 -2.7 L 26 -1.4 L 30 -7.6 L 40 -5.2 L 46 -11.4 L 55 -9.5 L 64 -13.2 L 72 -7.6 L 81 -10.7 L 86 -3.9 L 83 2.3 L 93 4.8 L 88 14 L 95 25 L 86 36 Z",
    back: "M 10 30 C -5 60, -2 105, 15 115 L 35 110 L 50 115 L 65 110 L 85 115 C 102 105, 105 60, 90 30 Z",
    details: "M 22 16 L 26 10 L 22 4.8 M 78 16 L 74 10 L 78 4.8 M 40 12 L 45 4.8 L 40 -0.2 M 60 12 L 55 4.8 L 60 -0.2",
    backDetails: "M 25 40 Q 15 65, 20 95 M 75 40 Q 85 65, 80 95",
    top: 2,
    peak: -13,
  },
};

const registries = createHairRegistries(
  MARIKA_HAIR,
  {
    marikaCurlyBangs: "Marika Curls",
    marikaBangsUpdo: "Marika Wispy Crop",
    marika1: "Marika Style 1",
    marikaAtelier: "Marika Atelier",
  },
  { presetOnly: true, isExclusive: true },
);

export const MarikaHairBack: PartRegistry<MarikaHairId> = registries.back;
export const MarikaHairFront: PartRegistry<MarikaHairId> = registries.front;
