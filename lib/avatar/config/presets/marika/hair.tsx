import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { scallop, type Point } from "../../../parts/shapes";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

/** A hairline run whose bumps hang towards the face (curly bangs). */
const curlyRun = (points: Point[]) => scallop(points, { closed: false, inward: true }).replace(/^M/, "L");

/** Deterministic pseudo-random numbers, so the frizz comes out the same on every render. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const pt = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Clockwise on screen, like every other part of the mass: subpaths wound the other way cancel out. */
const clockwise = (points: Point[]) => {
  let area = 0;
  points.forEach(([x, y], i) => {
    const [nx, ny] = points[(i + 1) % points.length];
    area += x * ny - nx * y;
  });
  return area < 0 ? [...points].reverse() : points;
};

/** Smooth closed outline through the points (Catmull-Rom, as cubic Béziers). */
const smoothLoop = (points: Point[]) => {
  const at = (i: number) => points[(i + points.length) % points.length];
  let d = `M ${pt(points[0])}`;
  points.forEach((_, i) => {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d += ` C ${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
  });
  return `${d} Z`;
};

interface Flick {
  base: Point;
  /** Direction it springs out in, radians (0 = right, π/2 = down). */
  heading: number;
  length: number;
  width: number;
  /** How far it hooks round by the tip, radians; the sign picks the way. */
  curl: number;
}

/** A curl springing out of the mass: tapering from its base to a point that hooks round. */
const flickPoints = ({ base, heading, length, width, curl }: Flick): Point[] => {
  const steps = 9;
  const left: Point[] = [];
  const right: Point[] = [];
  let [x, y] = base;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = heading + curl * t * t;
    const w = (width / 2) * Math.pow(1 - t, 0.8);
    left.push([x - Math.sin(a) * w, y + Math.cos(a) * w]);
    right.push([x + Math.sin(a) * w, y - Math.cos(a) * w]);
    x += (Math.cos(a) * length) / steps;
    y += (Math.sin(a) * length) / steps;
  }
  return [...left, ...right.reverse().slice(1)];
};

const flick = (f: Flick) => `M ${clockwise(flickPoints(f)).map(pt).join(" ")} Z`;

/**
 * The big 90s perm, exaggerated: a lifted cloud, widest by the cheeks, whose edge is all curls
 * springing out and hooking down. Points run clockwise from the ends on her right shoulder.
 */
const PERM_CORE: Point[] = [
  [9, 96],
  [3, 88],
  [0, 77.5],
  [-1, 66],
  [-0.5, 54.5],
  [1.5, 43.5],
  [5, 33],
  [10, 23.5],
  [16.5, 13.5],
  [25.5, 6.5],
  [36, 2],
  [46.5, 0.5],
  [57, 1],
  [67.5, 4],
  [76.5, 10],
  [84, 19],
  [89.5, 30],
  [93.5, 41],
  [95.5, 52.5],
  [96.5, 64.5],
  [96, 76.5],
  [93, 87.5],
  [87, 95.5],
  [76, 95.5],
  [69.5, 87],
  [64.5, 75],
  [35.5, 75],
  [30.5, 87],
  [24, 95.5],
];
/** The outer stretch of the core, where curls spring out: shoulder end to shoulder end. */
const PERM_EDGE = PERM_CORE.slice(0, 23);

const angleTo = (from: number, to: number) => Math.atan2(Math.sin(to - from), Math.cos(to - from));

/** Even-odd point-in-polygon test. */
const inside = ([x, y]: Point, polygon: Point[]) => {
  let hit = false;
  polygon.forEach(([x0, y0], i) => {
    const [x1, y1] = polygon[(i + 1) % polygon.length];
    if (y0 > y !== y1 > y && x < x0 + ((y - y0) * (x1 - x0)) / (y1 - y0)) hit = !hit;
  });
  return hit;
};

/** Which way a curl at `heading` hooks: down, or outwards if it already hangs down. */
const hookWay = (heading: number, x: number) => {
  const turn = angleTo(heading, Math.PI / 2);
  return Math.sign(Math.abs(turn) < 0.6 ? angleTo(heading, x < 50 ? Math.PI : 0) : turn);
};

/** Curls springing out round the edge, and curls scattered through the mass for texture (`inner`). */
const permCurls = () => {
  const rand = seeded(7);
  const edge: Flick[] = [];
  let carry = 0;
  for (let i = 0; i < PERM_EDGE.length - 1; i++) {
    const [x0, y0] = PERM_EDGE[i];
    const [x1, y1] = PERM_EDGE[i + 1];
    const seg = Math.hypot(x1 - x0, y1 - y0);
    const [tx, ty] = [(x1 - x0) / seg, (y1 - y0) / seg];
    const [ox, oy] = [ty, -tx];
    let s = carry;
    for (; s < seg; s += 8 + rand() * 3) {
      const [x, y] = [x0 + tx * s, y0 + ty * s];
      const low = Math.min(1, Math.max(0, (y - 15) / 75));
      const heading = Math.atan2(oy + 0.1 + 0.9 * low, ox) + (rand() - 0.5) * 0.5;
      edge.push({
        base: [x - ox * 3, y - oy * 3],
        heading,
        length: 7 + rand() * 3 + low * 3,
        width: 7.5 + rand() * 2.5,
        curl: (rand() < 0.15 ? -1 : 1) * hookWay(heading, x) * (2.3 + rand() * 0.7),
      });
    }
    carry = s - seg;
  }

  const inner: Flick[] = [];
  for (let gy = 0; gy < 100; gy += 7) {
    for (let gx = -4; gx < 104; gx += 7.5) {
      const p: Point = [gx + rand() * 6, gy + rand() * 6];
      // Skip the face: nothing drawn there would show.
      if (!inside(p, PERM_CORE) || ((p[0] - 50) / 29) ** 2 + ((p[1] - 60) / 37) ** 2 < 1) continue;
      const [dx, dy] = [p[0] - 50, p[1] - 45];
      const low = Math.min(1, Math.max(0, (p[1] - 15) / 75));
      const heading = Math.atan2(dy / Math.hypot(dx, dy) + 0.4 + low, dx / Math.hypot(dx, dy)) + (rand() - 0.5) * 0.8;
      inner.push({
        base: p,
        heading,
        length: 6 + rand() * 3,
        width: 2.4 + rand() * 0.9,
        curl: hookWay(heading, p[0]) * (2.3 + rand() * 0.8),
      });
    }
  }
  return { edge, inner };
};

const { edge: edgeCurls, inner: innerCurls } = permCurls();

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

const permMass = [smoothLoop(PERM_CORE), ...edgeCurls.map(flick)].join(" ");
const innerShade = innerCurls.map(flick).join(" ");
const innerLight = innerCurls.map((c) => flick({ ...c, base: [c.base[0] + 0.9, c.base[1] - 1.2], width: c.width * 0.6 })).join(" ");
const curlShade = "#7A4A12";

const MARIKA_HAIR: Record<MarikaHairId, HairSpec> = {
  marikaCurlyBangs: {
    cap: capAbove(`M 12 70 L 22 70 ${curlyFringe} L 88 70`),
    front: permMass,
    // Darker underneath and round the face, lighter on top; curls inside carry the texture.
    paint: (_color, { uid = "fv" }) => (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id={`${uid}-perm-depth`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.28" />
            <stop offset="0.45" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor={curlShade} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect x="-10" y="-5" width="120" height="107" fill={`url(#${uid}-perm-depth)`} />
        <path d={`M 22 70 ${curlyFringe}`} stroke={curlShade} strokeOpacity="0.22" strokeWidth="7" />
        <path d={innerShade} fill={curlShade} fillOpacity="0.32" />
        <path d={innerLight} fill="white" fillOpacity="0.45" />
      </g>
    ),
    shine: "M 26 12 C 36 5.5, 56 4.5, 70 9.5 C 58 9, 42 10, 31 16 Z",
    top: 1,
    peak: -3,
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
