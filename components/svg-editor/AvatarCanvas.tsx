"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { PathNode, PathCommand } from "@/lib/svg-editor/path-parser";
import { HeadId } from "@/lib/avatar/parts/head";
import { HatId, HAT_CLIP_ZONES, Hats } from "@/lib/avatar/parts/hats";

interface AvatarCanvasProperties {
  pathString: string;
  nodes: PathNode[];
  showGrid: boolean;
  showNodes: boolean;
  showHat: boolean;
  selectedHat: HatId;
  headId?: string;
  hatFill?: string;
  selectedNodeId: string | null;
  onNodeSelect: (identifier: string | null) => void;
  onNodeDrag: (node: PathNode, newX: number, newY: number) => void;
  onNodeDelete: (commandIndex: number) => void;
  onPathDrag: (deltaX: number, deltaY: number) => void;
  onPathSplit: (newCommands: PathCommand[]) => void;
  onDragEnd?: () => void;
  commands: PathCommand[];
  editMode: "node" | "drag" | "split";
  highlightPath?: string;
  currentLayer?: string;
}

const CANVAS_SIZE = 100;
const VIEW_PADDING = 20;
const DEFAULT_SCALE = 4;

export function AvatarCanvas({
  pathString,
  nodes,
  showGrid,
  showNodes,
  showHat,
  selectedHat,
  headId = "angular",
  hatFill = "#71717a",
  selectedNodeId,
  onNodeSelect,
  onNodeDrag,
  onNodeDelete,
  onPathDrag,
  onPathSplit,
  onDragEnd,
  commands,
  editMode,
  highlightPath,
  currentLayer,
}: AvatarCanvasProperties): React.JSX.Element {
  const svgReference = useRef<SVGSVGElement>(null);
  const [draggingNode, setDraggingNode] = useState<PathNode | null>(null);
  const [isPathDragging, setIsPathDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [cursorCoordinates, setCursorCoordinates] = useState<{ x: number; y: number } | null>(null);

  const viewBox = `${-VIEW_PADDING} ${-VIEW_PADDING} ${CANVAS_SIZE + VIEW_PADDING * 2} ${CANVAS_SIZE + VIEW_PADDING * 2}`;

  const getSvgCoordinates = useCallback((event: React.MouseEvent): { x: number; y: number } => {
    if (!svgReference.current) return { x: 0, y: 0 };
    const boundingRectangle = svgReference.current.getBoundingClientRect();
    const x = ((event.clientX - boundingRectangle.left) / boundingRectangle.width) * (CANVAS_SIZE + VIEW_PADDING * 2) - VIEW_PADDING;
    const y = ((event.clientY - boundingRectangle.top) / boundingRectangle.height) * (CANVAS_SIZE + VIEW_PADDING * 2) - VIEW_PADDING;
    return { x, y };
  }, []);

  const handleMouseDownNode = (node: PathNode) => (event: React.MouseEvent) => {
    if (editMode !== "node") return;
    event.stopPropagation();
    setDraggingNode(node);
    onNodeSelect(node.id);
  };

  const handlePathMouseDown = (event: React.MouseEvent): void => {
    if (editMode === "drag") {
      event.stopPropagation();
      const { x, y } = getSvgCoordinates(event);
      setIsPathDragging(true);
      setDragStartPosition({ x, y });
      onNodeSelect(null);
    } else if (editMode === "split") {
      event.stopPropagation();
      const { x, y } = getSvgCoordinates(event);
      splitPathAt(x, y);
    }
  };

  const splitPathAt = (clickX: number, clickY: number): void => {
    const newCommands = [...commands];
    const insertionIndex = newCommands.length - 1;

    newCommands.splice(insertionIndex, 0, {
      type: "L",
      params: [Math.round(clickX), Math.round(clickY)],
      startIndex: 0,
      endIndex: 0,
    });

    onPathSplit(newCommands);
  };

  const handleMouseMove = (event: React.MouseEvent): void => {
    const { x, y } = getSvgCoordinates(event);
    setCursorCoordinates({ x: Math.round(x), y: Math.round(y) });

    if (editMode === "node" && draggingNode) {
      onNodeDrag(draggingNode, x, y);
    } else if (editMode === "drag" && isPathDragging) {
      const deltaX = x - dragStartPosition.x;
      const deltaY = y - dragStartPosition.y;
      onPathDrag(deltaX, deltaY);
      setDragStartPosition({ x, y });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if ((event.key === "Delete" || event.key === "Backspace") && selectedNodeId) {
        if (document.activeElement?.tagName === "INPUT") return;

        const node = nodes.find((item) => item.id === selectedNodeId);
        if (node) {
          event.preventDefault();
          onNodeDelete(node.commandIndex);
          onNodeSelect(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, nodes, onNodeDelete, onNodeSelect]);

  const handleMouseUp = (): void => {
    if ((draggingNode || isPathDragging) && onDragEnd) {
      onDragEnd();
    }
    setDraggingNode(null);
    setIsPathDragging(false);
  };

  const handleCanvasClick = (): void => {
    onNodeSelect(null);
  };

  const handleWheel = (event: React.WheelEvent): void => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.5 : 0.5;
    setScale((previousScale) => Math.max(2, Math.min(8, previousScale + delta)));
  };

  const selectedNodeLabel = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId)?.label : null;

  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-950 relative overflow-hidden select-none">
      {/* Background subtle radial texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Canvas Top-Left HUD */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        {/* Zoom Controls */}
        <div className="flex items-center bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl p-1 shadow-lg">
          <button
            type="button"
            onClick={() => setScale((previous) => Math.max(2, previous - 0.5))}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Zoom Out"
          >
            <MinusIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setScale(DEFAULT_SCALE)}
            className="px-2.5 py-1 text-xs font-mono font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            title="Reset Zoom (4x)"
          >
            {scale.toFixed(1)}x
          </button>
          <button
            type="button"
            onClick={() => setScale((previous) => Math.min(8, previous + 0.5))}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Zoom In"
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mode & Node Info */}
        <div className="hidden sm:flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl px-3 py-1.5 shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-zinc-200 capitalize">{editMode} Mode</span>
          </div>
          {selectedNodeLabel && (
            <>
              <div className="w-px h-3.5 bg-zinc-800" />
              <span className="text-xs font-mono text-primary font-medium">{selectedNodeLabel}</span>
            </>
          )}
        </div>
      </div>

      {/* Floating Canvas Top-Right Coordinates HUD */}
      {cursorCoordinates && (
        <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl px-3 py-1.5 shadow-lg text-xs font-mono text-zinc-400">
          <span>X: <strong className="text-zinc-200">{cursorCoordinates.x}</strong></span>
          <span>Y: <strong className="text-zinc-200">{cursorCoordinates.y}</strong></span>
        </div>
      )}

      {/* Main Vector SVG Stage */}
      <svg
        ref={svgReference}
        viewBox={viewBox}
        width={CANVAS_SIZE * scale}
        height={CANVAS_SIZE * scale}
        className="select-none drop-shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setCursorCoordinates(null);
        }}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        style={{
          cursor: draggingNode
            ? "grabbing"
            : editMode === "drag"
              ? "move"
              : editMode === "split"
                ? "crosshair"
                : "default",
        }}
      >
        {/* Workspace Canvas Frame */}
        <rect
          x={0}
          y={0}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          rx={2}
          fill="#121215"
          stroke="#27272a"
          strokeWidth="0.8"
        />

        {/* Grid Lines */}
        {showGrid && (
          <g opacity="0.25">
            {Array.from({ length: 11 }).map((_, index) => (
              <React.Fragment key={index}>
                <line x1={index * 10} y1={0} x2={index * 10} y2={CANVAS_SIZE} stroke="#52525b" strokeWidth="0.4" strokeDasharray={index % 5 === 0 ? "none" : "1 1"} />
                <line x1={0} y1={index * 10} x2={CANVAS_SIZE} y2={index * 10} stroke="#52525b" strokeWidth="0.4" strokeDasharray={index % 5 === 0 ? "none" : "1 1"} />
              </React.Fragment>
            ))}
            {/* Center Origin Crosshair */}
            <line x1={50} y1={0} x2={50} y2={CANVAS_SIZE} stroke="#e25a36" strokeWidth="0.75" opacity="0.6" />
            <line x1={0} y1={50} x2={CANVAS_SIZE} y2={50} stroke="#e25a36" strokeWidth="0.75" opacity="0.6" />
          </g>
        )}

        {/* Head Silhouette Reference */}
        <g opacity="0.12" pointerEvents="none">
          <path
            d="M20 40 Q 20 10, 50 10 Q 80 10, 80 40 L 80 70 Q 80 95, 50 95 Q 20 95, 20 70 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <circle cx="35" cy="45" r="3" fill="#ffffff" />
          <circle cx="65" cy="45" r="3" fill="#ffffff" />
          <path d="M40 75 Q 50 82, 60 75" fill="none" stroke="#ffffff" strokeWidth="1" />
        </g>

        {/* Editable Vector Path */}
        {pathString && (
          <path
            d={pathString}
            fill={currentLayer === "highlight" ? "#fde68a" : "#3f3f46"}
            stroke={editMode === "drag" ? "#e25a36" : currentLayer === "highlight" ? "#b45309" : "#a1a1aa"}
            strokeWidth={editMode === "drag" ? "2" : "1.5"}
            opacity="0.9"
            className={editMode === "drag" ? "cursor-move" : ""}
            onMouseDown={handlePathMouseDown}
          />
        )}

        {/* Highlight Accent Path Preview */}
        {highlightPath && currentLayer !== "highlight" && (
          <path
            d={highlightPath}
            fill="#fde68a"
            stroke="#b45309"
            strokeWidth="1"
            opacity="0.4"
            pointerEvents="none"
            strokeDasharray="2 2"
          />
        )}

        {/* Hat Overlay */}
        {showHat && selectedHat !== "none" && (
          <g opacity="0.5" pointerEvents="none">
            <HatPreview hatId={selectedHat} headId={headId} hatFill={hatFill} />
          </g>
        )}

        {/* Interactive Vector Nodes */}
        {showNodes && (
          <g>
            {/* Control Point Connecting Guide Lines */}
            {nodes.map((node, index) => {
              if (node.type !== "control") return null;

              const nextEndpoint = nodes
                .slice(index + 1)
                .find((candidate) => candidate.commandIndex === node.commandIndex && candidate.type === "endpoint");
              const previousEndpoint = nodes
                .slice(0, index)
                .reverse()
                .find((candidate) => candidate.type === "endpoint") || { x: 0, y: 0 };

              return (
                <line
                  key={`handle-${node.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={nextEndpoint ? nextEndpoint.x : previousEndpoint.x}
                  y2={nextEndpoint ? nextEndpoint.y : previousEndpoint.y}
                  stroke="#38bdf8"
                  strokeWidth="0.6"
                  strokeDasharray="1.5 1.5"
                  opacity="0.75"
                />
              );
            })}

            {/* Anchor & Control Point Handles */}
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isControl = node.type === "control";

              return (
                <g key={node.id}>
                  {/* Subtle hover/select halo */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isControl ? 5.5 : 6}
                      fill="none"
                      stroke={isControl ? "#38bdf8" : "#e25a36"}
                      strokeWidth="1"
                      opacity="0.8"
                    />
                  )}

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 3.5 : 2.5}
                    fill={isControl ? "#38bdf8" : isSelected ? "#e25a36" : "#fb923c"}
                    stroke={isSelected ? "#ffffff" : "rgba(0,0,0,0.5)"}
                    strokeWidth={isSelected ? 1.2 : 0.6}
                    className="cursor-grab active:cursor-grabbing transition-all"
                    onMouseDown={handleMouseDownNode(node)}
                    style={{
                      filter: isSelected
                        ? `drop-shadow(0 0 6px ${isControl ? "#38bdf8" : "#e25a36"})`
                        : "none",
                    }}
                  />

                  {/* Coordinate Badge on Active Node */}
                  {isSelected && (
                    <g pointerEvents="none">
                      <rect
                        x={node.x + 5}
                        y={node.y - 12}
                        width="30"
                        height="8"
                        rx="2"
                        fill="rgba(15, 23, 42, 0.9)"
                        stroke="#334155"
                        strokeWidth="0.5"
                      />
                      <text
                        x={node.x + 8}
                        y={node.y - 6.5}
                        fontSize="3.8"
                        fill="#f8fafc"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {Math.round(node.x)},{Math.round(node.y)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}

function HatPreview({
  hatId,
  headId,
  hatFill,
}: {
  hatId: HatId;
  headId: string;
  hatFill: string;
}): React.JSX.Element | null {
  const HatComponent = Hats[hatId]?.component;
  if (HatComponent) {
    return (
      <HatComponent
        fill={hatFill}
        headId={headId as HeadId}
        hatId={hatId}
      />
    );
  }
  const clipPath = HAT_CLIP_ZONES[hatId]?.clipPath ?? "";
  if (!clipPath) return null;
  return <path d={clipPath} fill="#f59e0b" stroke="#d97706" strokeWidth="1" />;
}
