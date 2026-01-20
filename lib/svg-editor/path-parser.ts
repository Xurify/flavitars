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

export interface PathNode {
  id: string;
  commandIndex: number;
  paramIndex: number;
  x: number;
  y: number;
  type: 'endpoint' | 'control';
  label: string;
}

export function extractNodes(commands: PathCommand[]): PathNode[] {
  const nodes: PathNode[] = [];
  let nodeId = 0;

  commands.forEach((cmd, cmdIndex) => {
    const explanation = getCommandExplanation(cmd.type);
    const labels = explanation.paramLabels;

    switch (cmd.type.toUpperCase()) {
      case 'M':
      case 'L':
        if (cmd.params.length >= 2) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 0,
            x: cmd.params[0],
            y: cmd.params[1],
            type: 'endpoint',
            label: `${cmd.type}(${labels[0]}, ${labels[1]})`,
          });
        }
        break;
      case 'H':
        if (cmd.params.length >= 1) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 0,
            x: cmd.params[0],
            y: 0, // Will need current Y from context
            type: 'endpoint',
            label: `H(${labels[0]})`,
          });
        }
        break;
      case 'V':
        if (cmd.params.length >= 1) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 0,
            x: 0, // Will need current X from context
            y: cmd.params[0],
            type: 'endpoint',
            label: `V(${labels[0]})`,
          });
        }
        break;
      case 'Q':
        if (cmd.params.length >= 4) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 0,
            x: cmd.params[0],
            y: cmd.params[1],
            type: 'control',
            label: `Control (${labels[0]}, ${labels[1]})`,
          });
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 2,
            x: cmd.params[2],
            y: cmd.params[3],
            type: 'endpoint',
            label: `End (${labels[2]}, ${labels[3]})`,
          });
        }
        break;
      case 'C':
        if (cmd.params.length >= 6) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 0,
            x: cmd.params[0],
            y: cmd.params[1],
            type: 'control',
            label: `Control 1 (${labels[0]}, ${labels[1]})`,
          });
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 2,
            x: cmd.params[2],
            y: cmd.params[3],
            type: 'control',
            label: `Control 2 (${labels[2]}, ${labels[3]})`,
          });
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 4,
            x: cmd.params[4],
            y: cmd.params[5],
            type: 'endpoint',
            label: `End (${labels[4]}, ${labels[5]})`,
          });
        }
        break;
      case 'A':
        if (cmd.params.length >= 7) {
          nodes.push({
            id: `node-${nodeId++}`,
            commandIndex: cmdIndex,
            paramIndex: 5,
            x: cmd.params[5],
            y: cmd.params[6],
            type: 'endpoint',
            label: `Arc End (${labels[5]}, ${labels[6]})`,
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
  newY: number
): PathCommand[] {
  const updated = commands.map((cmd, idx) => {
    if (idx !== node.commandIndex) return cmd;

    const newParams = [...cmd.params];
    const cmdType = cmd.type.toUpperCase();

    if (cmdType === 'H') {
      newParams[node.paramIndex] = newX;
    } else if (cmdType === 'V') {
      newParams[node.paramIndex] = newY;
    } else {
      newParams[node.paramIndex] = newX;
      newParams[node.paramIndex + 1] = newY;
    }

    return { ...cmd, params: newParams };
  });

  return updated;
}
