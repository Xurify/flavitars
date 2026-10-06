import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { scallop, type Point } from "../../../parts/shapes";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

/** A hairline run whose bumps hang towards the face (curly bangs). */
const curlyRun = (points: Point[]) => scallop(points, { closed: false, inward: true }).replace(/^M/, "L");

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

const curlyFringe = curlyRun(curlyHairline);

/** Catmull-Rom spline through the points, `steps` samples per span. */
const spline = (points: Point[], steps = 24): Point[] => {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [points[i - 1] ?? points[i], points[i], points[i + 1], points[i + 2] ?? points[i + 1]];
    for (let step = 0; step < steps; step++) {
      const t = step / steps;
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

interface Lock {
  spine: Point[];
  root: number;
  tip: number;
  /** Behind the others: tinted darker. */
  deep?: boolean;
  /** How far down the lock (0–1) the coils begin; perms stay looser at the root. */
  coilFrom?: number;
}

/**
 * A spiral ringlet hanging along `spine`, tapering from `root` to `tip` wide. Its sides wave a
 * half turn out of step with each other, the way a coiled lock looks; `coils` are the turns
 * crossing it. Both are built from as few curve commands as possible: there are 18 locks, and
 * the hair engine repeats the silhouette several times.
 */
const ringlet = ({ spine, root, tip, coilFrom = 0 }: Lock, phase = 0, pitch = 7, ripple = 0.16) => {
  const line = spline(spine);
  const along = [0];
  for (let i = 1; i < line.length; i++) along.push(along[i - 1] + Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]));
  const total = along[along.length - 1];

  const frame = (s: number) => {
    let i = 1;
    while (i < line.length - 1 && along[i] < s) i++;
    const [x0, y0] = line[i - 1];
    const [x1, y1] = line[i];
    const seg = along[i] - along[i - 1] || 1;
    const k = Math.min(1, Math.max(0, (s - along[i - 1]) / seg));
    const [tx, ty] = [(x1 - x0) / seg, (y1 - y0) / seg];
    const half = (root + (tip - root) * (s / total)) / 2;
    return { x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k, tx, ty, nx: -ty, ny: tx, half };
  };
  const pt = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const side = (s: number, dir: 1 | -1, width = 1) => {
    const { x, y, nx, ny, half } = frame(s);
    return pt(x + dir * nx * half * width, y + dir * ny * half * width);
  };
  /**
   * One side as a wave of half turns (`dir` +1 = left of the direction of travel), bulging out on
   * the half turns from `shift` and in on the others; `from` > `to` runs it back up the lock.
   * Full half turns after the second are `T`s: each mirrors the one before, at half the size.
   */
  const wave = (dir: 1 | -1, shift: number, from: number, to: number) => {
    const half = pitch / 2;
    const up = from > to;
    const cuts = [from];
    const first = (Math.floor((Math.min(from, to) / pitch - shift) * 2) + 1) / 2;
    for (let k = first; (k + shift) * pitch < Math.max(from, to); k += 0.5) cuts.push((k + shift) * pitch);
    if (up) cuts.splice(1, cuts.length - 1, ...cuts.slice(1).reverse());
    cuts.push(to);
    return cuts
      .slice(1)
      .map((end, i) => {
        const begin = cuts[i];
        const mid = (begin + end) / 2;
        const outward = Math.round((mid / pitch - shift) * 2 - 0.5) % 2 === 0;
        const full = Math.abs(end - begin) > half - 0.01;
        if (full && i > 1 && i < cuts.length - 2) return ` T ${side(end, dir)}`;
        return ` Q ${side(mid, dir, outward ? 1 + 2 * ripple : 1 - 2 * ripple)} ${side(end, dir)}`;
      })
      .join("");
  };

  const r = (tip / 2).toFixed(1);
  // Clockwise, like the crown: overlapping subpaths wound the other way would cancel out.
  const edge = `M ${side(0, -1)}${wave(-1, phase + 0.5, 0, total)} A ${r} ${r} 0 0 1 ${side(total, 1)}${wave(1, phase, total, 0)}`;

  const coils: string[] = [];
  for (let s0 = ((((phase + 0.75) % 1) + 1) % 1) * pitch; s0 < total - pitch / 2; s0 += pitch) {
    if (s0 < coilFrom * total) continue;
    const mid = frame(s0 + pitch / 4);
    const bow = pitch * 0.36;
    coils.push(`M ${side(s0, 1, 0.8)} Q ${pt(mid.x + mid.tx * bow, mid.y + mid.ty * bow)} ${side(s0 + pitch / 2, -1, 0.8)}`);
  }
  // The root end is buried in the mass, so only the sides and tip get a shade line.
  return { outline: `${edge} Z`, edge, coils: coils.join(" ") };
};

/** Left side, back to front: the deep locks by the neck, the long outer ones, then the crown falling over them. */
const LOCKS: Lock[] = [
  { spine: [[24, 54], [24, 68], [26, 82], [29, 95]], root: 9, tip: 4.5, deep: true },
  { spine: [[15, 46], [11, 62], [9, 78], [10, 98]], root: 13, tip: 5, deep: true },
  { spine: [[10, 36], [3, 52], [-1, 68], [-2.5, 86]], root: 12, tip: 5 },
  { spine: [[19, 48], [17, 64], [18, 80], [21, 99]], root: 11, tip: 4.5 },
  { spine: [[16, 26], [8, 40], [3.5, 56], [0.5, 72], [0, 92]], root: 11, tip: 5 },
  { spine: [[23, 26], [17, 40], [13.5, 56], [11.5, 72], [12.5, 89]], root: 10, tip: 4.5 },
  { spine: [[54, 8.5], [42, 8.5], [29.5, 12.5], [19.5, 20.5], [12, 32.5]], root: 11, tip: 7, coilFrom: 0.3 },
  { spine: [[53, 13.5], [42, 14.5], [31.5, 19], [23.5, 27.5], [18.5, 38]], root: 10, tip: 6.5, coilFrom: 0.3 },
  { spine: [[52, 18.5], [43, 19.5], [35.5, 23], [29.5, 29.5]], root: 8, tip: 6, coilFrom: 0.25 },
];

const lockPaths = LOCKS.flatMap((lock, i) => [
  { ...lock, ...ringlet(lock, (i * 0.37) % 1) },
  { ...lock, ...ringlet({ ...lock, spine: lock.spine.map(([x, y]) => [100 - x, y] as const) }, (i * 0.37 + 0.45) % 1) },
]);

/** Crown and core the locks hang from; only its top edge shows. */
const curlyCrown = scallop([
  [10, 88],
  [4, 76],
  [2.5, 62],
  [4, 48],
  [7, 37],
  [10.5, 28],
  [15, 20.5],
  [20, 14.5],
  [25.5, 10],
  [31.5, 7],
  [37.5, 5.2],
  [43.5, 4.3],
  [49.5, 4],
  [55.5, 4.4],
  [61.5, 5.4],
  [67.5, 7.4],
  [73.5, 10.6],
  [79, 15],
  [84, 21],
  [88.5, 29],
  [92, 38],
  [95, 48.5],
  [96.5, 62],
  [96, 76],
  [90, 88],
  [73, 91],
  [69.5, 83],
  [66, 74],
  [34, 74],
  [30.5, 83],
  [27, 91],
], { bulge: 0.55 });

const curlyMass = [curlyCrown, ...lockPaths.map((lock) => lock.outline)].join(" ");
const curlShade = "#7A4A12";

const MARIKA_HAIR: Record<MarikaHairId, HairSpec> = {
  marikaCurlyBangs: {
    cap: capAbove(`M 12 70 L 22 70 ${curlyFringe} L 88 70`),
    front: curlyMass,
    paint: (color) => (
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d={curlyCrown} fill={curlShade} fillOpacity="0.12" />
        {lockPaths.map((lock, i) => (
          <g key={i}>
            <path d={lock.outline} fill={color} />
            <path d={lock.edge} fill="none" stroke={curlShade} strokeOpacity="0.4" strokeWidth="0.8" />
            {lock.deep && <path d={lock.outline} fill={curlShade} fillOpacity="0.16" />}
            <path d={lock.coils} fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="0.9" transform="translate(0.5, -0.7)" />
            <path d={lock.coils} fill="none" stroke={curlShade} strokeOpacity="0.28" strokeWidth="0.8" />
          </g>
        ))}
        <path d={`M 22 70 ${curlyFringe}`} fill="none" stroke={curlShade} strokeOpacity="0.2" strokeWidth="6" />
      </g>
    ),
    shine: "M 30 11 C 40 6, 58 5.5, 70 10 C 58 9.5, 44 10.5, 34 15 Z",
    top: 3,
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
