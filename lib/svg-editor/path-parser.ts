/**
 * SVG Path Parser & Serializer
 * Converts SVG path strings to/from a structured representation with human-readable explanations.
 */

export type PathCommandType = 'M' | 'm' | 'L' | 'l' | 'H' | 'h' | 'V' | 'v' | 'Q' | 'q' | 'C' | 'c' | 'S' | 's' | 'A' | 'a' | 'Z' | 'z';

export interface PathCommand {
  type: PathCommandType;
  params: number[];
  startIndex: number;
  endIndex: number;
}

export interface ParsedPath {
  commands: PathCommand[];
  original: string;
}

export interface CommandExplanation {
  name: string;
  description: string;
  paramLabels: string[];
}

const COMMAND_EXPLANATIONS: Record<string, CommandExplanation> = {
  M: { name: 'Move To', description: 'Move pen to position without drawing', paramLabels: ['x', 'y'] },
  m: { name: 'Move To (relative)', description: 'Move pen by offset without drawing', paramLabels: ['dx', 'dy'] },
  L: { name: 'Line To', description: 'Draw straight line to position', paramLabels: ['x', 'y'] },
  l: { name: 'Line To (relative)', description: 'Draw straight line by offset', paramLabels: ['dx', 'dy'] },
  H: { name: 'Horizontal Line', description: 'Draw horizontal line to X coordinate', paramLabels: ['x'] },
  h: { name: 'Horizontal Line (rel)', description: 'Draw horizontal line by X offset', paramLabels: ['dx'] },
  V: { name: 'Vertical Line', description: 'Draw vertical line to Y coordinate', paramLabels: ['y'] },
  v: { name: 'Vertical Line (rel)', description: 'Draw vertical line by Y offset', paramLabels: ['dy'] },
  Q: { name: 'Quadratic Curve', description: 'Smooth curve with 1 control point', paramLabels: ['cx', 'cy', 'x', 'y'] },
  q: { name: 'Quadratic Curve (rel)', description: 'Smooth curve with 1 control point (relative)', paramLabels: ['dcx', 'dcy', 'dx', 'dy'] },
  C: { name: 'Cubic Curve', description: 'Smooth curve with 2 control points', paramLabels: ['c1x', 'c1y', 'c2x', 'c2y', 'x', 'y'] },
  c: { name: 'Cubic Curve (rel)', description: 'Smooth curve with 2 control points (relative)', paramLabels: ['dc1x', 'dc1y', 'dc2x', 'dc2y', 'dx', 'dy'] },
  S: { name: 'Smooth Cubic', description: 'Cubic curve continuing from previous', paramLabels: ['c2x', 'c2y', 'x', 'y'] },
  s: { name: 'Smooth Cubic (rel)', description: 'Cubic curve continuing from previous (relative)', paramLabels: ['dc2x', 'dc2y', 'dx', 'dy'] },
  A: { name: 'Arc', description: 'Draw elliptical arc', paramLabels: ['rx', 'ry', 'angle', 'largeArc', 'sweep', 'x', 'y'] },
  a: { name: 'Arc (relative)', description: 'Draw elliptical arc (relative)', paramLabels: ['rx', 'ry', 'angle', 'largeArc', 'sweep', 'dx', 'dy'] },
  Z: { name: 'Close Path', description: 'Close path back to starting point', paramLabels: [] },
  z: { name: 'Close Path', description: 'Close path back to starting point', paramLabels: [] },
};

export function getCommandExplanation(type: PathCommandType): CommandExplanation {
  return COMMAND_EXPLANATIONS[type] || { name: 'Unknown', description: 'Unknown command', paramLabels: [] };
}

export function parsePath(d: string): ParsedPath {
  const commands: PathCommand[] = [];
  const regex = /([MmLlHhVvQqCcSsAaZz])([^MmLlHhVvQqCcSsAaZz]*)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(d)) !== null) {
    const type = match[1] as PathCommandType;
    const paramString = match[2].trim();
    const params = paramString
      ? paramString.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n))
      : [];

    commands.push({
      type,
      params,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    });
  }

  return { commands, original: d };
}

export function serializePath(commands: PathCommand[]): string {
  return commands
    .map((cmd) => {
      if (cmd.params.length === 0) return cmd.type;
      return `${cmd.type}${cmd.params.join(' ')}`;
    })
    .join(' ');
}

const READABLE_GROUP: Record<PathCommandType, number> = {
  M: 2,
  m: 2,
  L: 2,
  l: 2,
  H: 1,
  h: 1,
  V: 1,
  v: 1,
  Q: 2,
  q: 2,
  C: 2,
  c: 2,
  S: 2,
  s: 2,
  A: 7,
  a: 7,
  Z: 0,
  z: 0,
};

/**
 * Serialize path with a consistent readable style: space after each command letter,
 * and commas between logical groups (e.g. Q control, end and C c1, c2, end).
 * Same semantics as serializePath; use for display or when copying into source.
 */
export function serializePathReadable(commands: PathCommand[]): string {
  return commands
    .map((cmd) => {
      if (cmd.params.length === 0) return cmd.type;
      const groupSize = READABLE_GROUP[cmd.type] ?? 0;
      if (groupSize <= 0) return `${cmd.type}${cmd.params.join(' ')}`;
      const parts: string[] = [];
      for (let i = 0; i < cmd.params.length; i += groupSize) {
        parts.push(cmd.params.slice(i, i + groupSize).join(' '));
      }
      return `${cmd.type} ${parts.join(', ')}`;
    })
    .join(' ');
}

/**
 * Parse a path and return it in the same readable format as serializePathReadable.
 * Use when copying paths into hair-paths.ts so they are easy to read and consistent.
 */
export function formatPathReadable(pathString: string): string {
  if (!pathString.trim()) return pathString;
  const { commands } = parsePath(pathString);
  return serializePathReadable(commands);
}

export function commandsEqual(a: PathCommand[], b: PathCommand[]): boolean {
  if (a.length !== b.length) return false;
  return serializePath(a) === serializePath(b);
}

export interface PathNode {
  id: string;
  commandIndex: number;
  paramIndex: number;
  x: number;
  y: number;
  type: "endpoint" | "control";
  label: string;
  commandType?: PathCommandType;
  controlIndex?: number;
}

export function extractNodes(commands: PathCommand[]): PathNode[] {
  const nodes: PathNode[] = [];
  let nodeId = 0;
  let currentPenX = 0;
  let currentPenY = 0;

  commands.forEach((command, commandIndex) => {
    const explanation = getCommandExplanation(command.type);
    const labels = explanation.paramLabels;
    const upperType = command.type.toUpperCase();

    switch (upperType) {
      case "M":
      case "L":
        if (command.params.length >= 2) {
          currentPenX = command.params[0];
          currentPenY = command.params[1];
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 0,
            x: currentPenX,
            y: currentPenY,
            type: "endpoint",
            label: `${command.type}(${labels[0]}, ${labels[1]})`,
            commandType: command.type,
          });
        }
        break;
      case "H":
        if (command.params.length >= 1) {
          currentPenX = command.params[0];
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 0,
            x: currentPenX,
            y: currentPenY,
            type: "endpoint",
            label: `H(${labels[0]})`,
            commandType: command.type,
          });
        }
        break;
      case "V":
        if (command.params.length >= 1) {
          currentPenY = command.params[0];
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 0,
            x: currentPenX,
            y: currentPenY,
            type: "endpoint",
            label: `V(${labels[0]})`,
            commandType: command.type,
          });
        }
        break;
      case "Q":
        if (command.params.length >= 4) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 0,
            x: command.params[0],
            y: command.params[1],
            type: "control",
            label: `Control (${labels[0]}, ${labels[1]})`,
            commandType: command.type,
            controlIndex: 1,
          });
          currentPenX = command.params[2];
          currentPenY = command.params[3];
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 2,
            x: currentPenX,
            y: currentPenY,
            type: "endpoint",
            label: `End (${labels[2]}, ${labels[3]})`,
            commandType: command.type,
          });
        }
        break;
      case "C":
        if (command.params.length >= 6) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 0,
            x: command.params[0],
            y: command.params[1],
            type: "control",
            label: `Control 1 (${labels[0]}, ${labels[1]})`,
            commandType: command.type,
            controlIndex: 1,
          });
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 2,
            x: command.params[2],
            y: command.params[3],
            type: "control",
            label: `Control 2 (${labels[2]}, ${labels[3]})`,
            commandType: command.type,
            controlIndex: 2,
          });
          currentPenX = command.params[4];
          currentPenY = command.params[5];
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 4,
            x: currentPenX,
            y: currentPenY,
            type: "endpoint",
            label: `End (${labels[4]}, ${labels[5]})`,
            commandType: command.type,
          });
        }
        break;
      case "A":
        if (command.params.length >= 7) {
          currentPenX = command.params[5];
          currentPenY = command.params[6];
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex,
            paramIndex: 5,
            x: currentPenX,
            y: currentPenY,
            type: "endpoint",
            label: `Arc End (${labels[5]}, ${labels[6]})`,
            commandType: command.type,
          });
        }
        break;
    }
  });

  return nodes;
}

export function updateNodePosition(
  commands: PathCommand[],
  node: PathNode,
  newX: number,
  newY: number,
  moveConnectedHandles = true
): PathCommand[] {
  const deltaX = Math.round(newX - node.x);
  const deltaY = Math.round(newY - node.y);

  const updated = commands.map((command, index) => {
    if (index !== node.commandIndex) return command;

    const newParameters = [...command.params];
    const commandType = command.type.toUpperCase();

    if (commandType === "H") {
      newParameters[node.paramIndex] = Math.round(newX);
    } else if (commandType === "V") {
      newParameters[node.paramIndex] = Math.round(newY);
    } else {
      newParameters[node.paramIndex] = Math.round(newX);
      newParameters[node.paramIndex + 1] = Math.round(newY);
    }

    return { ...command, params: newParameters };
  });

  if (moveConnectedHandles && node.type === "endpoint" && (deltaX !== 0 || deltaY !== 0)) {
    const nextCommandIndex = node.commandIndex + 1;
    if (nextCommandIndex < updated.length) {
      const nextCommand = updated[nextCommandIndex];
      const nextType = nextCommand.type.toUpperCase();
      if (nextType === "Q" || nextType === "C") {
        const nextParams = [...nextCommand.params];
        nextParams[0] = Math.round(nextParams[0] + deltaX);
        nextParams[1] = Math.round(nextParams[1] + deltaY);
        updated[nextCommandIndex] = { ...nextCommand, params: nextParams };
      }
    }
  }

  return updated;
}
