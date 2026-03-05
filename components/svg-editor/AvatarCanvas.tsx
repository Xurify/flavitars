"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { PathNode, PathCommand } from "@/lib/svg-editor/path-parser";
import { HeadId } from "@/lib/avatar/parts/head";
import { HatId, HAT_CLIP_ZONES, Hats } from "@/lib/avatar/parts/hats";

interface AvatarCanvasProps {
  pathString: string;
  nodes: PathNode[];
  showGrid: boolean;
  showNodes: boolean;
  showHat: boolean;
  selectedHat: HatId;
  headId?: string;
  hatFill?: string;
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
  onNodeDrag: (node: PathNode, newX: number, newY: number) => void;
  onNodeDelete: (index: number) => void;
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
}: AvatarCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<PathNode | null>(null);
  const [isPathDragging, setIsPathDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(4);

  const viewBox = `${-VIEW_PADDING} ${-VIEW_PADDING} ${CANVAS_SIZE + VIEW_PADDING * 2} ${CANVAS_SIZE + VIEW_PADDING * 2}`;

  const getSvgCoords = useCallback((event: React.MouseEvent): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * (CANVAS_SIZE + VIEW_PADDING * 2) - VIEW_PADDING;
    const y = ((event.clientY - rect.top) / rect.height) * (CANVAS_SIZE + VIEW_PADDING * 2) - VIEW_PADDING;
    return { x, y };
  }, []);

  const handleMouseDown = (node: PathNode) => (event: React.MouseEvent) => {
    if (editMode !== "node") return;
    event.stopPropagation();
    setDragging(node);
    onNodeSelect(node.id);
  };

  const handlePathMouseDown = (event: React.MouseEvent) => {
    if (editMode === "drag") {
      event.stopPropagation();
      const { x, y } = getSvgCoords(event);
      setIsPathDragging(true);
      setDragStartPos({ x, y });
      onNodeSelect(null);
    } else if (editMode === "split") {
      event.stopPropagation();
      const { x, y } = getSvgCoords(event);
      splitPathAt(x, y);
    }
  };

  const splitPathAt = (clickX: number, clickY: number) => {
    // Insert a new Line segment at the end of the clicked path
    // In a future update, this could be made more precise by splitting the specific segment.
    const newCommands = [...commands];
    const insertIdx = newCommands.length - 1; // Insert before 'Z' or at the end

    newCommands.splice(insertIdx, 0, {
      type: "L",
      params: [Math.round(clickX), Math.round(clickY)],
      startIndex: 0,
      endIndex: 0,
    });

    onPathSplit(newCommands);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { x, y } = getSvgCoords(event);

    if (editMode === "node" && dragging) {
      onNodeDrag(dragging, x, y);
    } else if (editMode === "drag" && isPathDragging) {
      const deltaX = x - dragStartPos.x;
      const deltaY = y - dragStartPos.y;
      onPathDrag(deltaX, deltaY);
      setDragStartPos({ x, y });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "Delete" || event.key === "Backspace") && selectedNodeId) {
        if (document.activeElement?.tagName === "INPUT") return;

        const node = nodes.find((n) => n.id === selectedNodeId);
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

  const handleMouseUp = () => {
    if ((dragging || isPathDragging) && onDragEnd) {
      onDragEnd();
    }
    setDragging(null);
    setIsPathDragging(false);
  };

  const handleCanvasClick = () => {
    onNodeSelect(null);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.5 : 0.5;
    setScale((s) => Math.max(2, Math.min(8, s + delta)));
  };

  const selectedNodeLabel = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId)?.label : null;

  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="px-3 py-1.5 bg-zinc-800/80 rounded-lg text-xs font-mono text-zinc-400">
          {scale.toFixed(1)}x
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center gap-2 min-w-32">
          <span className="text-xs font-medium text-amber-500 uppercase tracking-wider shrink-0">Node</span>
          <span className="text-xs font-mono text-zinc-300 truncate">{selectedNodeLabel ?? "—"}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setScale((s) => Math.min(8, s + 0.5))}
          className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => setScale((s) => Math.max(2, s - 0.5))}
          className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 transition-colors"
        >
          −
        </button>
      </div>

      <svg
        ref={svgRef}
        viewBox={viewBox}
        width={CANVAS_SIZE * scale}
        height={CANVAS_SIZE * scale}
        className="select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        style={{ cursor: dragging ? "grabbing" : editMode === "drag" ? "move" : editMode === "split" ? "crosshair" : "default" }}
      >
        {showGrid && (
          <g opacity="0.15">
            {Array.from({ length: 11 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1={i * 10} y1={0} x2={i * 10} y2={CANVAS_SIZE} stroke="#fff" strokeWidth="0.5" />
                <line x1={0} y1={i * 10} x2={CANVAS_SIZE} y2={i * 10} stroke="#fff" strokeWidth="0.5" />
              </React.Fragment>
            ))}
            <line x1={50} y1={0} x2={50} y2={CANVAS_SIZE} stroke="#f59e0b" strokeWidth="0.75" />
            <line x1={0} y1={50} x2={CANVAS_SIZE} y2={50} stroke="#f59e0b" strokeWidth="0.75" />
          </g>
        )}

        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="none" stroke="#18181b" strokeWidth="0.5" />

        <g opacity="0.1" pointerEvents="none">
          <path
            d="M20 40 Q 20 10, 50 10 Q 80 10, 80 40 L 80 70 Q 80 95, 50 95 Q 20 95, 20 70 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
          <circle cx="35" cy="45" r="3" fill="#fff" />
          <circle cx="65" cy="45" r="3" fill="#fff" />
          <path d="M40 75 Q 50 82, 60 75" fill="none" stroke="#fff" strokeWidth="1" />
        </g>

        {pathString && (
          <path
            d={pathString}
            fill={currentLayer === "highlight" ? "#FDE68A" : "#4a4a4a"}
            stroke={editMode === "drag" ? "#f59e0b" : currentLayer === "highlight" ? "#b45309" : "#a1a1aa"}
            strokeWidth={editMode === "drag" ? "2" : "1.5"}
            opacity="0.9"
            className={editMode === "drag" ? "cursor-move" : ""}
            onMouseDown={handlePathMouseDown}
          />
        )}

        {highlightPath && currentLayer !== "highlight" && (
          <path
            d={highlightPath}
            fill="#FDE68A"
            stroke="#b45309"
            strokeWidth="1"
            opacity="0.4"
            pointerEvents="none"
            strokeDasharray="2 2"
          />
        )}

        {showHat && selectedHat !== "none" && (
          <g opacity="0.5" pointerEvents="none">
            <HatPreview hatId={selectedHat} headId={headId} hatFill={hatFill} />
          </g>
        )}

        {showNodes && (
          <g>
            {nodes.map((node, i) => {
              if (node.type !== "control") return null;

              // Find the next endpoint for this command
              const nextEndpoint = nodes.slice(i + 1).find((n) => n.commandIndex === node.commandIndex && n.type === "endpoint");
              // Or find the previous endpoint (for the first control point of a Cubic curve)
              const prevEndpoint = nodes
                .slice(0, i)
                .reverse()
                .find((n) => n.type === "endpoint") || { x: 0, y: 0 };

              return (
                <line
                  key={`handle-${node.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={nextEndpoint ? nextEndpoint.x : prevEndpoint.x}
                  y2={nextEndpoint ? nextEndpoint.y : prevEndpoint.y}
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeDasharray="1 1"
                  opacity="0.6"
                />
              );
            })}

            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isControl = node.type === "control";

              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 4 : 2.5}
                    fill={isControl ? "#3b82f6" : "#f59e0b"}
                    stroke={isSelected ? "#fff" : "rgba(0,0,0,0.3)"}
                    strokeWidth={isSelected ? 1.5 : 0.5}
                    className="cursor-grab active:cursor-grabbing transition-all"
                    onMouseDown={handleMouseDown(node)}
                    style={{
                      filter: isSelected ? `drop-shadow(0 0 6px ${isControl ? "#3b82f6" : "#f59e0b"})` : "none",
                    }}
                  />

                  {isSelected && (
                    <g pointerEvents="none">
                      <rect x={node.x + 5} y={node.y - 12} width="30" height="8" rx="2" fill="rgba(0,0,0,0.8)" />
                      <text x={node.x + 8} y={node.y - 6} fontSize="4" fill="#fff" fontFamily="monospace" fontWeight="bold">
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

function HatPreview({ hatId, headId, hatFill }: { hatId: HatId; headId: string; hatFill: string }) {
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
