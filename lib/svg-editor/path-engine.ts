import { PathCommand, PathNode } from "./path-parser";

export interface Point {
  x: number;
  y: number;
}

export interface SegmentProjection {
  commandIndex: number;
  t: number;
  point: Point;
  distance: number;
}

export function distanceBetween(point1: Point, point2: Point): number {
  const deltaX = point1.x - point2.x;
  const deltaY = point1.y - point2.y;
  return Math.hypot(deltaX, deltaY);
}

export function projectPointOnLineSegment(
  point: Point,
  start: Point,
  end: Point
): { point: Point; t: number; distance: number } {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;

  if (lengthSquared === 0) {
    const dist = distanceBetween(point, start);
    return { point: { ...start }, t: 0, distance: dist };
  }

  let t = ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared;
  t = Math.max(0, Math.min(1, t));

  const projectedPoint: Point = {
    x: start.x + t * deltaX,
    y: start.y + t * deltaY,
  };

  return {
    point: projectedPoint,
    t,
    distance: distanceBetween(point, projectedPoint),
  };
}

export function quadraticBezierPoint(p0: Point, p1: Point, p2: Point, t: number): Point {
  const oneMinusT = 1 - t;
  return {
    x: oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x,
    y: oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y,
  };
}

export function cubicBezierPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const oneMinusT = 1 - t;
  const oneMinusTSquared = oneMinusT * oneMinusT;
  const tSquared = t * t;
  return {
    x:
      oneMinusTSquared * oneMinusT * p0.x +
      3 * oneMinusTSquared * t * p1.x +
      3 * oneMinusT * tSquared * p2.x +
      tSquared * t * p3.x,
    y:
      oneMinusTSquared * oneMinusT * p0.y +
      3 * oneMinusTSquared * t * p1.y +
      3 * oneMinusT * tSquared * p2.y +
      tSquared * t * p3.y,
  };
}

export function projectPointOnQuadraticSegment(
  point: Point,
  p0: Point,
  p1: Point,
  p2: Point,
  samples = 30
): { point: Point; t: number; distance: number } {
  let closestDistance = Infinity;
  let bestT = 0;
  let bestPoint = p0;

  for (let index = 0; index <= samples; index++) {
    const candidateT = index / samples;
    const evaluatedPoint = quadraticBezierPoint(p0, p1, p2, candidateT);
    const dist = distanceBetween(point, evaluatedPoint);
    if (dist < closestDistance) {
      closestDistance = dist;
      bestT = candidateT;
      bestPoint = evaluatedPoint;
    }
  }

  const step = 1 / samples;
  const refinementStart = Math.max(0, bestT - step);
  const refinementEnd = Math.min(1, bestT + step);
  for (let index = 0; index <= 20; index++) {
    const candidateT = refinementStart + (index / 20) * (refinementEnd - refinementStart);
    const evaluatedPoint = quadraticBezierPoint(p0, p1, p2, candidateT);
    const dist = distanceBetween(point, evaluatedPoint);
    if (dist < closestDistance) {
      closestDistance = dist;
      bestT = candidateT;
      bestPoint = evaluatedPoint;
    }
  }

  return { point: bestPoint, t: bestT, distance: closestDistance };
}

export function projectPointOnCubicSegment(
  point: Point,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  samples = 40
): { point: Point; t: number; distance: number } {
  let closestDistance = Infinity;
  let bestT = 0;
  let bestPoint = p0;

  for (let index = 0; index <= samples; index++) {
    const candidateT = index / samples;
    const evaluatedPoint = cubicBezierPoint(p0, p1, p2, p3, candidateT);
    const dist = distanceBetween(point, evaluatedPoint);
    if (dist < closestDistance) {
      closestDistance = dist;
      bestT = candidateT;
      bestPoint = evaluatedPoint;
    }
  }

  const step = 1 / samples;
  const refinementStart = Math.max(0, bestT - step);
  const refinementEnd = Math.min(1, bestT + step);
  for (let index = 0; index <= 20; index++) {
    const candidateT = refinementStart + (index / 20) * (refinementEnd - refinementStart);
    const evaluatedPoint = cubicBezierPoint(p0, p1, p2, p3, candidateT);
    const dist = distanceBetween(point, evaluatedPoint);
    if (dist < closestDistance) {
      closestDistance = dist;
      bestT = candidateT;
      bestPoint = evaluatedPoint;
    }
  }

  return { point: bestPoint, t: bestT, distance: closestDistance };
}

export function splitQuadraticBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  t: number
): { first: [Point, Point, Point]; second: [Point, Point, Point] } {
  const q0 = {
    x: p0.x + t * (p1.x - p0.x),
    y: p0.y + t * (p1.y - p0.y),
  };
  const q1 = {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y),
  };
  const splitPoint = {
    x: q0.x + t * (q1.x - q0.x),
    y: q0.y + t * (q1.y - q0.y),
  };

  return {
    first: [p0, q0, splitPoint],
    second: [splitPoint, q1, p2],
  };
}

export function splitCubicBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): { first: [Point, Point, Point, Point]; second: [Point, Point, Point, Point] } {
  const p01 = { x: p0.x + t * (p1.x - p0.x), y: p0.y + t * (p1.y - p0.y) };
  const p12 = { x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y) };
  const p23 = { x: p2.x + t * (p3.x - p2.x), y: p2.y + t * (p3.y - p2.y) };

  const p012 = { x: p01.x + t * (p12.x - p01.x), y: p01.y + t * (p12.y - p01.y) };
  const p123 = { x: p12.x + t * (p23.x - p12.x), y: p12.y + t * (p23.y - p12.y) };

  const splitPoint = { x: p012.x + t * (p123.x - p012.x), y: p012.y + t * (p123.y - p012.y) };

  return {
    first: [p0, p01, p012, splitPoint],
    second: [splitPoint, p123, p23, p3],
  };
}

export function findClosestSegmentProjection(
  commands: PathCommand[],
  cursorPoint: Point,
  maxDetectionDistance = 15
): SegmentProjection | null {
  let closest: SegmentProjection | null = null;
  let currentPen: Point = { x: 0, y: 0 };
  let startPen: Point = { x: 0, y: 0 };

  for (let index = 0; index < commands.length; index++) {
    const command = commands[index];
    const type = command.type.toUpperCase();

    if (type === "M") {
      currentPen = { x: command.params[0] ?? 0, y: command.params[1] ?? 0 };
      startPen = { ...currentPen };
      continue;
    }

    if (type === "L") {
      const endPoint: Point = { x: command.params[0] ?? 0, y: command.params[1] ?? 0 };
      const projection = projectPointOnLineSegment(cursorPoint, currentPen, endPoint);
      if (
        projection.distance <= maxDetectionDistance &&
        (!closest || projection.distance < closest.distance)
      ) {
        closest = {
          commandIndex: index,
          t: projection.t,
          point: projection.point,
          distance: projection.distance,
        };
      }
      currentPen = endPoint;
    } else if (type === "H") {
      const endPoint: Point = { x: command.params[0] ?? 0, y: currentPen.y };
      const projection = projectPointOnLineSegment(cursorPoint, currentPen, endPoint);
      if (
        projection.distance <= maxDetectionDistance &&
        (!closest || projection.distance < closest.distance)
      ) {
        closest = {
          commandIndex: index,
          t: projection.t,
          point: projection.point,
          distance: projection.distance,
        };
      }
      currentPen = endPoint;
    } else if (type === "V") {
      const endPoint: Point = { x: currentPen.x, y: command.params[0] ?? 0 };
      const projection = projectPointOnLineSegment(cursorPoint, currentPen, endPoint);
      if (
        projection.distance <= maxDetectionDistance &&
        (!closest || projection.distance < closest.distance)
      ) {
        closest = {
          commandIndex: index,
          t: projection.t,
          point: projection.point,
          distance: projection.distance,
        };
      }
      currentPen = endPoint;
    } else if (type === "Q") {
      const controlPoint: Point = { x: command.params[0] ?? 0, y: command.params[1] ?? 0 };
      const endPoint: Point = { x: command.params[2] ?? 0, y: command.params[3] ?? 0 };
      const projection = projectPointOnQuadraticSegment(cursorPoint, currentPen, controlPoint, endPoint);
      if (
        projection.distance <= maxDetectionDistance &&
        (!closest || projection.distance < closest.distance)
      ) {
        closest = {
          commandIndex: index,
          t: projection.t,
          point: projection.point,
          distance: projection.distance,
        };
      }
      currentPen = endPoint;
    } else if (type === "C") {
      const control1: Point = { x: command.params[0] ?? 0, y: command.params[1] ?? 0 };
      const control2: Point = { x: command.params[2] ?? 0, y: command.params[3] ?? 0 };
      const endPoint: Point = { x: command.params[4] ?? 0, y: command.params[5] ?? 0 };
      const projection = projectPointOnCubicSegment(cursorPoint, currentPen, control1, control2, endPoint);
      if (
        projection.distance <= maxDetectionDistance &&
        (!closest || projection.distance < closest.distance)
      ) {
        closest = {
          commandIndex: index,
          t: projection.t,
          point: projection.point,
          distance: projection.distance,
        };
      }
      currentPen = endPoint;
    } else if (type === "Z") {
      const projection = projectPointOnLineSegment(cursorPoint, currentPen, startPen);
      if (
        projection.distance <= maxDetectionDistance &&
        (!closest || projection.distance < closest.distance)
      ) {
        closest = {
          commandIndex: index,
          t: projection.t,
          point: projection.point,
          distance: projection.distance,
        };
      }
      currentPen = startPen;
    }
  }

  return closest;
}

export function splitCommandAtProjection(
  commands: PathCommand[],
  projection: SegmentProjection,
  precision = 1
): PathCommand[] {
  const { commandIndex, t } = projection;
  const targetCommand = commands[commandIndex];
  if (!targetCommand) return commands;

  let currentPen: Point = { x: 0, y: 0 };
  let startPen: Point = { x: 0, y: 0 };
  for (let index = 0; index < commandIndex; index++) {
    const cmd = commands[index];
    const type = cmd.type.toUpperCase();
    if (type === "M") {
      currentPen = { x: cmd.params[0], y: cmd.params[1] };
      startPen = { ...currentPen };
    } else if (type === "L") {
      currentPen = { x: cmd.params[0], y: cmd.params[1] };
    } else if (type === "H") {
      currentPen = { x: cmd.params[0], y: currentPen.y };
    } else if (type === "V") {
      currentPen = { x: currentPen.x, y: cmd.params[0] };
    } else if (type === "Q") {
      currentPen = { x: cmd.params[2], y: cmd.params[3] };
    } else if (type === "C") {
      currentPen = { x: cmd.params[4], y: cmd.params[5] };
    } else if (type === "Z") {
      currentPen = startPen;
    }
  }

  const roundNum = (num: number): number => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  const newCommands = [...commands];
  const type = targetCommand.type.toUpperCase();

  if (type === "L" || type === "H" || type === "V") {
    const endPoint: Point =
      type === "L"
        ? { x: targetCommand.params[0], y: targetCommand.params[1] }
        : type === "H"
          ? { x: targetCommand.params[0], y: currentPen.y }
          : { x: currentPen.x, y: targetCommand.params[0] };

    const splitPoint: Point = {
      x: roundNum(currentPen.x + t * (endPoint.x - currentPen.x)),
      y: roundNum(currentPen.y + t * (endPoint.y - currentPen.y)),
    };

    const firstLine: PathCommand = {
      type: "L",
      params: [splitPoint.x, splitPoint.y],
      startIndex: 0,
      endIndex: 0,
    };
    const secondLine: PathCommand = {
      type: "L",
      params: [roundNum(endPoint.x), roundNum(endPoint.y)],
      startIndex: 0,
      endIndex: 0,
    };

    newCommands.splice(commandIndex, 1, firstLine, secondLine);
  } else if (type === "Q") {
    const controlPoint: Point = { x: targetCommand.params[0], y: targetCommand.params[1] };
    const endPoint: Point = { x: targetCommand.params[2], y: targetCommand.params[3] };

    const { first, second } = splitQuadraticBezier(currentPen, controlPoint, endPoint, t);

    const firstQuad: PathCommand = {
      type: "Q",
      params: [
        roundNum(first[1].x),
        roundNum(first[1].y),
        roundNum(first[2].x),
        roundNum(first[2].y),
      ],
      startIndex: 0,
      endIndex: 0,
    };
    const secondQuad: PathCommand = {
      type: "Q",
      params: [
        roundNum(second[1].x),
        roundNum(second[1].y),
        roundNum(second[2].x),
        roundNum(second[2].y),
      ],
      startIndex: 0,
      endIndex: 0,
    };

    newCommands.splice(commandIndex, 1, firstQuad, secondQuad);
  } else if (type === "C") {
    const control1: Point = { x: targetCommand.params[0], y: targetCommand.params[1] };
    const control2: Point = { x: targetCommand.params[2], y: targetCommand.params[3] };
    const endPoint: Point = { x: targetCommand.params[4], y: targetCommand.params[5] };

    const { first, second } = splitCubicBezier(currentPen, control1, control2, endPoint, t);

    const firstCubic: PathCommand = {
      type: "C",
      params: [
        roundNum(first[1].x),
        roundNum(first[1].y),
        roundNum(first[2].x),
        roundNum(first[2].y),
        roundNum(first[3].x),
        roundNum(first[3].y),
      ],
      startIndex: 0,
      endIndex: 0,
    };
    const secondCubic: PathCommand = {
      type: "C",
      params: [
        roundNum(second[1].x),
        roundNum(second[1].y),
        roundNum(second[2].x),
        roundNum(second[2].y),
        roundNum(second[3].x),
        roundNum(second[3].y),
      ],
      startIndex: 0,
      endIndex: 0,
    };

    newCommands.splice(commandIndex, 1, firstCubic, secondCubic);
  } else if (type === "Z") {
    const splitPoint: Point = {
      x: roundNum(currentPen.x + t * (startPen.x - currentPen.x)),
      y: roundNum(currentPen.y + t * (startPen.y - currentPen.y)),
    };

    const insertedLine: PathCommand = {
      type: "L",
      params: [splitPoint.x, splitPoint.y],
      startIndex: 0,
      endIndex: 0,
    };
    newCommands.splice(commandIndex, 0, insertedLine);
  }

  return newCommands;
}

export function convertSegmentType(
  commands: PathCommand[],
  commandIndex: number,
  targetType: "L" | "Q" | "C"
): PathCommand[] {
  const command = commands[commandIndex];
  if (!command) return commands;

  let currentPen: Point = { x: 0, y: 0 };
  let startPen: Point = { x: 0, y: 0 };
  for (let index = 0; index < commandIndex; index++) {
    const cmd = commands[index];
    const type = cmd.type.toUpperCase();
    if (type === "M" || type === "L") {
      currentPen = { x: cmd.params[0], y: cmd.params[1] };
      if (type === "M") startPen = { ...currentPen };
    } else if (type === "Q") {
      currentPen = { x: cmd.params[2], y: cmd.params[3] };
    } else if (type === "C") {
      currentPen = { x: cmd.params[4], y: cmd.params[5] };
    } else if (type === "H") {
      currentPen = { x: cmd.params[0], y: currentPen.y };
    } else if (type === "V") {
      currentPen = { x: currentPen.x, y: cmd.params[0] };
    } else if (type === "Z") {
      currentPen = { ...startPen };
    }
  }

  let endPoint: Point = { x: 0, y: 0 };
  const currentType = command.type.toUpperCase();
  if (currentType === "L") {
    endPoint = { x: command.params[0], y: command.params[1] };
  } else if (currentType === "Q") {
    endPoint = { x: command.params[2], y: command.params[3] };
  } else if (currentType === "C") {
    endPoint = { x: command.params[4], y: command.params[5] };
  } else {
    return commands;
  }

  const updated = [...commands];

  if (targetType === "L") {
    updated[commandIndex] = {
      type: "L",
      params: [Math.round(endPoint.x), Math.round(endPoint.y)],
      startIndex: 0,
      endIndex: 0,
    };
  } else if (targetType === "Q") {
    const controlPoint: Point = {
      x: Math.round((currentPen.x + endPoint.x) / 2),
      y: Math.round((currentPen.y + endPoint.y) / 2 - 5),
    };
    updated[commandIndex] = {
      type: "Q",
      params: [controlPoint.x, controlPoint.y, Math.round(endPoint.x), Math.round(endPoint.y)],
      startIndex: 0,
      endIndex: 0,
    };
  } else if (targetType === "C") {
    const control1: Point = {
      x: Math.round(currentPen.x + (endPoint.x - currentPen.x) * 0.33),
      y: Math.round(currentPen.y + (endPoint.y - currentPen.y) * 0.33 - 5),
    };
    const control2: Point = {
      x: Math.round(currentPen.x + (endPoint.x - currentPen.x) * 0.66),
      y: Math.round(currentPen.y + (endPoint.y - currentPen.y) * 0.66 - 5),
    };
    updated[commandIndex] = {
      type: "C",
      params: [
        control1.x,
        control1.y,
        control2.x,
        control2.y,
        Math.round(endPoint.x),
        Math.round(endPoint.y),
      ],
      startIndex: 0,
      endIndex: 0,
    };
  }

  return updated;
}

export function mirrorPathSymmetric(
  commands: PathCommand[],
  mirrorAxisX = 50
): PathCommand[] {
  return commands.map((command) => {
    const newParameters = [...command.params];
    const type = command.type;
    const upperType = type.toUpperCase();
    const isRelative = type === type.toLowerCase() && type !== type.toUpperCase();

    if (upperType === "M" || upperType === "L") {
      if (isRelative) {
        newParameters[0] = -newParameters[0];
      } else {
        newParameters[0] = Math.round(2 * mirrorAxisX - newParameters[0]);
      }
    } else if (upperType === "H") {
      if (isRelative) {
        newParameters[0] = -newParameters[0];
      } else {
        newParameters[0] = Math.round(2 * mirrorAxisX - newParameters[0]);
      }
    } else if (upperType === "V") {
      // Y-only, no X mirroring needed for either relative or absolute
    } else if (upperType === "Q") {
      if (isRelative) {
        newParameters[0] = -newParameters[0];
        newParameters[2] = -newParameters[2];
      } else {
        newParameters[0] = Math.round(2 * mirrorAxisX - newParameters[0]);
        newParameters[2] = Math.round(2 * mirrorAxisX - newParameters[2]);
      }
    } else if (upperType === "C") {
      if (isRelative) {
        newParameters[0] = -newParameters[0];
        newParameters[2] = -newParameters[2];
        newParameters[4] = -newParameters[4];
      } else {
        newParameters[0] = Math.round(2 * mirrorAxisX - newParameters[0]);
        newParameters[2] = Math.round(2 * mirrorAxisX - newParameters[2]);
        newParameters[4] = Math.round(2 * mirrorAxisX - newParameters[4]);
      }
    } else if (upperType === "A") {
      // A: rx ry x-rotation large-arc-flag sweep-flag x y
      if (isRelative) {
        newParameters[5] = -newParameters[5];
      } else {
        newParameters[5] = Math.round(2 * mirrorAxisX - newParameters[5]);
      }
      // Invert sweep flag to preserve arc direction after horizontal reflection
      newParameters[4] = newParameters[4] === 1 ? 0 : 1;
    }

    return { ...command, params: newParameters };
  });
}

export function translateNodes(
  commands: PathCommand[],
  targetNodeIds: Set<string>,
  nodes: PathNode[],
  deltaX: number,
  deltaY: number,
  moveConnectedHandles = true
): PathCommand[] {
  if (targetNodeIds.size === 0 || (deltaX === 0 && deltaY === 0)) return commands;

  const targetNodes = nodes.filter((node) => targetNodeIds.has(node.id));
  const updatedCommands = commands.map((command) => ({
    ...command,
    params: [...command.params],
  }));

  const handledCommands = new Set<string>();

  for (const node of targetNodes) {
    const command = updatedCommands[node.commandIndex];
    if (!command) continue;

    const commandKey = `${node.commandIndex}-${node.paramIndex}`;
    if (handledCommands.has(commandKey)) continue;
    handledCommands.add(commandKey);

    const type = command.type.toUpperCase();
    if (type === "H") {
      command.params[node.paramIndex] = Math.round(command.params[node.paramIndex] + deltaX);
    } else if (type === "V") {
      command.params[node.paramIndex] = Math.round(command.params[node.paramIndex] + deltaY);
    } else {
      command.params[node.paramIndex] = Math.round(command.params[node.paramIndex] + deltaX);
      command.params[node.paramIndex + 1] = Math.round(command.params[node.paramIndex + 1] + deltaY);
    }

    if (moveConnectedHandles && node.type === "endpoint") {
      const nextCommandIndex = node.commandIndex + 1;
      if (nextCommandIndex < updatedCommands.length) {
        const nextCommand = updatedCommands[nextCommandIndex];
        const nextType = nextCommand.type.toUpperCase();
        const nextControlKey = `${nextCommandIndex}-0`;
        if (
          (nextType === "Q" || nextType === "C") &&
          !handledCommands.has(nextControlKey) &&
          !targetNodes.some(
            (candidate) => candidate.commandIndex === nextCommandIndex && candidate.paramIndex === 0
          )
        ) {
          nextCommand.params[0] = Math.round(nextCommand.params[0] + deltaX);
          nextCommand.params[1] = Math.round(nextCommand.params[1] + deltaY);
          handledCommands.add(nextControlKey);
        }
      }
    }
  }

  return updatedCommands;
}

export function alignNodes(
  commands: PathCommand[],
  selectedNodeIds: Set<string>,
  nodes: PathNode[],
  alignment: "left" | "right" | "top" | "bottom" | "centerX" | "centerY" | "midlineX"
): PathCommand[] {
  const targetNodes = nodes.filter((node) => selectedNodeIds.has(node.id));
  if (targetNodes.length === 0) return commands;

  let targetValue = 0;
  if (alignment === "midlineX") {
    targetValue = 50;
  } else if (alignment === "left") {
    targetValue = Math.min(...targetNodes.map((node) => node.x));
  } else if (alignment === "right") {
    targetValue = Math.max(...targetNodes.map((node) => node.x));
  } else if (alignment === "top") {
    targetValue = Math.min(...targetNodes.map((node) => node.y));
  } else if (alignment === "bottom") {
    targetValue = Math.max(...targetNodes.map((node) => node.y));
  } else if (alignment === "centerX") {
    targetValue = Math.round(
      targetNodes.reduce((sum, node) => sum + node.x, 0) / targetNodes.length
    );
  } else if (alignment === "centerY") {
    targetValue = Math.round(
      targetNodes.reduce((sum, node) => sum + node.y, 0) / targetNodes.length
    );
  }

  const updated = commands.map((command) => ({
    ...command,
    params: [...command.params],
  }));

  for (const node of targetNodes) {
    const command = updated[node.commandIndex];
    if (!command) continue;

    const type = command.type.toUpperCase();
    if (alignment === "left" || alignment === "right" || alignment === "centerX" || alignment === "midlineX") {
      if (type === "H") {
        command.params[node.paramIndex] = targetValue;
      } else if (type !== "V") {
        command.params[node.paramIndex] = targetValue;
      }
    } else {
      if (type === "V") {
        command.params[node.paramIndex] = targetValue;
      } else if (type !== "H") {
        command.params[node.paramIndex + 1] = targetValue;
      }
    }
  }

  return updated;
}

export function roundAllCoordinates(commands: PathCommand[], decimals = 0): PathCommand[] {
  const factor = Math.pow(10, decimals);
  return commands.map((command) => ({
    ...command,
    params: command.params.map((parameter) => Math.round(parameter * factor) / factor),
  }));
}
