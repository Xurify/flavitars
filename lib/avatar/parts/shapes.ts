export type Point = readonly [number, number];

/** Bumpy outline through the given points (clockwise), for curls and fluffy volume. */
export const scallop = (points: readonly Point[], { bulge = 0.62, closed = true } = {}) => {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  const count = closed ? points.length : points.length - 1;
  for (let i = 1; i <= count; i++) {
    const [x, y] = points[i % points.length];
    const [px, py] = points[i - 1];
    const r = +(Math.hypot(x - px, y - py) * bulge).toFixed(2);
    d += ` A ${r} ${r} 0 0 1 ${x} ${y}`;
  }
  return closed ? `${d} Z` : d;
};

/** Points on an ellipse arc, clockwise in screen space, angles in degrees (0 = right, 90 = down). */
export const arcPoints = (cx: number, cy: number, rx: number, ry: number, from: number, to: number, steps: number): Point[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    return [+(cx + rx * Math.cos(a)).toFixed(2), +(cy + ry * Math.sin(a)).toFixed(2)] as const;
  });
