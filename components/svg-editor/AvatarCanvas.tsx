"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { PlusIcon, MinusIcon, Maximize2Icon } from "lucide-react";
import { PathNode, PathCommand } from "@/lib/svg-editor/path-parser";
import { AvatarState } from "@/lib/avatar/types";
import {
  findClosestSegmentProjection,
  splitCommandAtProjection,
  translateNodes,
  SegmentProjection,
  Point,
} from "@/lib/svg-editor/path-engine";
import { GhostLayers, GhostLayerSettings } from "./GhostLayers";
import { cn } from "@/lib/utils/strings";

interface AvatarCanvasProperties {
  pathString: string;
  nodes: PathNode[];
  commands: PathCommand[];
  avatarState: AvatarState;
  selectedNodeIds: Set<string>;
  onNodeSelect: (selectedIds: Set<string>) => void;
  onNodeDrag: (updatedCommands: PathCommand[]) => void;
  onNodeDelete: (deletedCommandIndices: number[]) => void;
  onPathSplit: (newCommands: PathCommand[]) => void;
  onDragEnd?: () => void;
  editMode: "select" | "marquee" | "pen" | "move" | "pan";
  currentLayer: "front" | "back" | "highlight";
  ghostSettings: GhostLayerSettings;
  useHatVariant?: boolean;
}

const CANVAS_SIZE = 100;
const VIEW_PADDING = 25;
const DEFAULT_SCALE = 4.5;

export function AvatarCanvas({
  pathString,
  nodes,
  commands,
  avatarState,
  selectedNodeIds,
  onNodeSelect,
  onNodeDrag,
  onNodeDelete,
  onPathSplit,
  onDragEnd,
  editMode,
  currentLayer,
  ghostSettings,
  useHatVariant = false,
}: AvatarCanvasProperties): React.JSX.Element {
  const containerReference = useRef<HTMLDivElement>(null);
  const svgReference = useRef<SVGSVGElement>(null);

  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [panOffset, setPanOffset] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartReference = useRef<Point>({ x: 0, y: 0 });

  const [isDraggingNodes, setIsDraggingNodes] = useState(false);
  const dragStartPointReference = useRef<Point>({ x: 0, y: 0 });
  const dragInitialCommandsReference = useRef<PathCommand[]>([]);
  const dragInitialNodesReference = useRef<PathNode[]>([]);

  const [isMarqueeActive, setIsMarqueeActive] = useState(false);
  const [marqueeBox, setMarqueeBox] = useState<{ start: Point; current: Point } | null>(null);

  const [isPathDragging, setIsPathDragging] = useState(false);
  const pathDragStartReference = useRef<Point>({ x: 0, y: 0 });
  const pathDragInitialCommandsReference = useRef<PathCommand[]>([]);

  const [cursorCoordinates, setCursorCoordinates] = useState<Point | null>(null);
  const [hoverProjection, setHoverProjection] = useState<SegmentProjection | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [canvasTheme, setCanvasTheme] = useState<"slate" | "light" | "checker" | "dark">("slate");

  const snapStep = ghostSettings.snapStep || 1;

  const applySnapping = useCallback(
    (value: number): number => {
      if (snapStep <= 0) return Math.round(value);
      return Math.round(value / snapStep) * snapStep;
    },
    [snapStep]
  );

  const getSvgCoordinates = useCallback(
    (clientX: number, clientY: number): Point => {
      if (!svgReference.current) return { x: 0, y: 0 };
      const boundingRectangle = svgReference.current.getBoundingClientRect();
      const x =
        ((clientX - boundingRectangle.left) / boundingRectangle.width) *
          (CANVAS_SIZE + VIEW_PADDING * 2) -
        VIEW_PADDING;
      const y =
        ((clientY - boundingRectangle.top) / boundingRectangle.height) *
          (CANVAS_SIZE + VIEW_PADDING * 2) -
        VIEW_PADDING;
      return { x, y };
    },
    []
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.code === "Space" && !isSpacePressed) {
        setIsSpacePressed(true);
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        event.preventDefault();
        const allIds = new Set(nodes.map((node) => node.id));
        onNodeSelect(allIds);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onNodeSelect(new Set());
        return;
      }

      if (selectedNodeIds.size > 0) {
        const step = event.shiftKey ? 5 : 1;
        let deltaX = 0;
        let deltaY = 0;

        if (event.key === "ArrowLeft") deltaX = -step;
        else if (event.key === "ArrowRight") deltaX = step;
        else if (event.key === "ArrowUp") deltaY = -step;
        else if (event.key === "ArrowDown") deltaY = step;

        if (deltaX !== 0 || deltaY !== 0) {
          event.preventDefault();
          const updated = translateNodes(commands, selectedNodeIds, nodes, deltaX, deltaY, true);
          onNodeDrag(updated);
          if (onDragEnd) onDragEnd();
          return;
        }

        if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault();
          const commandIndicesToDelete = Array.from(
            new Set(
              nodes
                .filter((node) => selectedNodeIds.has(node.id))
                .map((node) => node.commandIndex)
            )
          );
          if (commandIndicesToDelete.length > 0) {
            onNodeDelete(commandIndicesToDelete);
            onNodeSelect(new Set());
          }
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    commands,
    isSpacePressed,
    nodes,
    onDragEnd,
    onNodeDelete,
    onNodeDrag,
    onNodeSelect,
    selectedNodeIds,
  ]);

  // Window-level mouse/pointer listener for rock-solid drag stability
  useEffect(() => {
    if (!isDraggingNodes && !isPathDragging && !isPanning) return;

    const handleWindowPointerMove = (event: PointerEvent): void => {
      if (isPanning) {
        setPanOffset({
          x: event.clientX - panStartReference.current.x,
          y: event.clientY - panStartReference.current.y,
        });
        return;
      }

      const svgPoint = getSvgCoordinates(event.clientX, event.clientY);
      setCursorCoordinates({
        x: Math.round(svgPoint.x * 10) / 10,
        y: Math.round(svgPoint.y * 10) / 10,
      });

      if (isDraggingNodes) {
        let rawDeltaX = svgPoint.x - dragStartPointReference.current.x;
        let rawDeltaY = svgPoint.y - dragStartPointReference.current.y;

        if (event.shiftKey) {
          if (Math.abs(rawDeltaX) > Math.abs(rawDeltaY)) {
            rawDeltaY = 0;
          } else {
            rawDeltaX = 0;
          }
        }

        const snappedDeltaX = applySnapping(rawDeltaX);
        const snappedDeltaY = applySnapping(rawDeltaY);

        const updated = translateNodes(
          dragInitialCommandsReference.current,
          selectedNodeIds,
          dragInitialNodesReference.current,
          snappedDeltaX,
          snappedDeltaY,
          true
        );
        onNodeDrag(updated);
        return;
      }

      if (isPathDragging) {
        const deltaX = Math.round(svgPoint.x - pathDragStartReference.current.x);
        const deltaY = Math.round(svgPoint.y - pathDragStartReference.current.y);

        const updated = pathDragInitialCommandsReference.current.map((command) => {
          const newParameters = [...command.params];
          for (let index = 0; index < newParameters.length; index += 2) {
            if (index + 1 < newParameters.length) {
              newParameters[index] = Math.round(newParameters[index] + deltaX);
              newParameters[index + 1] = Math.round(newParameters[index + 1] + deltaY);
            }
          }
          return { ...command, params: newParameters };
        });
        onNodeDrag(updated);
      }
    };

    const handleWindowPointerUp = (): void => {
      if (isDraggingNodes || isPathDragging) {
        if (onDragEnd) onDragEnd();
      }
      setIsDraggingNodes(false);
      setIsPathDragging(false);
      setIsPanning(false);
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
  }, [
    applySnapping,
    getSvgCoordinates,
    isDraggingNodes,
    isPanning,
    isPathDragging,
    onDragEnd,
    onNodeDrag,
    selectedNodeIds,
  ]);

  const handleMouseDownOnCanvas = (event: React.MouseEvent): void => {
    if (event.button === 1 || isSpacePressed || editMode === "pan") {
      event.preventDefault();
      setIsPanning(true);
      panStartReference.current = { x: event.clientX - panOffset.x, y: event.clientY - panOffset.y };
      return;
    }

    if (event.button !== 0) return;

    const svgPoint = getSvgCoordinates(event.clientX, event.clientY);

    if (editMode === "pen") {
      if (hoverProjection) {
        event.stopPropagation();
        const splitCommands = splitCommandAtProjection(commands, hoverProjection, 1);
        onPathSplit(splitCommands);
        setHoverProjection(null);
      }
      return;
    }

    if (editMode === "move") {
      event.stopPropagation();
      setIsPathDragging(true);
      pathDragStartReference.current = svgPoint;
      pathDragInitialCommandsReference.current = commands;
      return;
    }

    if (editMode === "marquee" || editMode === "select") {
      setIsMarqueeActive(true);
      setMarqueeBox({ start: svgPoint, current: svgPoint });
      if (!event.shiftKey && !event.ctrlKey) {
        onNodeSelect(new Set());
      }
    }
  };

  const handleMouseDownNode =
    (node: PathNode) =>
    (event: React.MouseEvent): void => {
      if (editMode === "pan" || isSpacePressed) return;
      event.stopPropagation();

      const nextSelection = new Set(selectedNodeIds);
      if (event.shiftKey || event.ctrlKey) {
        if (nextSelection.has(node.id)) {
          nextSelection.delete(node.id);
        } else {
          nextSelection.add(node.id);
        }
      } else {
        if (!nextSelection.has(node.id)) {
          nextSelection.clear();
          nextSelection.add(node.id);
        }
      }
      onNodeSelect(nextSelection);

      const svgPoint = getSvgCoordinates(event.clientX, event.clientY);
      setIsDraggingNodes(true);
      dragStartPointReference.current = svgPoint;
      dragInitialCommandsReference.current = commands;
      dragInitialNodesReference.current = nodes;
    };

  const handleMouseMove = (event: React.MouseEvent): void => {
    const svgPoint = getSvgCoordinates(event.clientX, event.clientY);
    setCursorCoordinates({
      x: Math.round(svgPoint.x * 10) / 10,
      y: Math.round(svgPoint.y * 10) / 10,
    });

    if (editMode === "pen") {
      const projection = findClosestSegmentProjection(commands, svgPoint, 12);
      setHoverProjection(projection);
      return;
    }

    if (isMarqueeActive && marqueeBox) {
      setMarqueeBox((previous) => (previous ? { ...previous, current: svgPoint } : null));

      const minX = Math.min(marqueeBox.start.x, svgPoint.x);
      const maxX = Math.max(marqueeBox.start.x, svgPoint.x);
      const minY = Math.min(marqueeBox.start.y, svgPoint.y);
      const maxY = Math.max(marqueeBox.start.y, svgPoint.y);

      const enclosedNodeIds = new Set(
        nodes
          .filter(
            (node) => node.x >= minX && node.x <= maxX && node.y >= minY && node.y <= maxY
          )
          .map((node) => node.id)
      );

      onNodeSelect(enclosedNodeIds);
    }
  };

  const handleMouseUp = (): void => {
    setIsMarqueeActive(false);
    setMarqueeBox(null);
  };

  const handleWheel = (event: React.WheelEvent): void => {
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 1.15 : 0.87;
    setScale((previous) => Math.max(1.5, Math.min(10, previous * zoomFactor)));
  };

  const handleResetZoom = (): void => {
    setScale(DEFAULT_SCALE);
    setPanOffset({ x: 0, y: 0 });
  };

  const selectedNodesList = useMemo(
    () => nodes.filter((node) => selectedNodeIds.has(node.id)),
    [nodes, selectedNodeIds]
  );

  const selectionBounds = useMemo(() => {
    if (selectedNodesList.length < 2) return null;
    const xs = selectedNodesList.map((node) => node.x);
    const ys = selectedNodesList.map((node) => node.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
      x: minX - 2,
      y: minY - 2,
      width: Math.max(4, maxX - minX + 4),
      height: Math.max(4, maxY - minY + 4),
    };
  }, [selectedNodesList]);

  const cursorClass = useMemo(() => {
    if (isPanning || isSpacePressed || editMode === "pan") return "cursor-grab active:cursor-grabbing";
    if (editMode === "pen") return "cursor-crosshair";
    if (editMode === "move") return "cursor-move";
    if (isMarqueeActive) return "cursor-crosshair";
    return "cursor-default";
  }, [editMode, isMarqueeActive, isPanning, isSpacePressed]);

  return (
    <div
      ref={containerReference}
      className={`flex-1 flex items-center justify-center bg-zinc-950 relative overflow-hidden select-none ${cursorClass}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onMouseDown={handleMouseDownOnCanvas}
    >
      {/* Background Radial Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Canvas Top-Left HUD (Zoom + Theme + Fit) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl p-1 shadow-lg">
          <button
            type="button"
            onClick={() => setScale((previous) => Math.max(1.5, previous - 0.5))}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Zoom Out"
          >
            <MinusIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="px-2.5 py-1 text-xs font-mono font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            title="Reset Zoom & Pan"
          >
            {scale.toFixed(1)}x
          </button>
          <button
            type="button"
            onClick={() => setScale((previous) => Math.min(10, previous + 0.5))}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Zoom In"
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-zinc-800 mx-1" />
          <button
            type="button"
            onClick={handleResetZoom}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Fit to Screen"
          >
            <Maximize2Icon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Canvas Theme Switcher */}
        <div className="hidden sm:flex items-center bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl p-0.5 shadow-lg text-[10px] font-semibold">
          <button
            type="button"
            onClick={() => setCanvasTheme("slate")}
            className={cn(
              "px-2 py-1 rounded-lg transition-colors",
              canvasTheme === "slate" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
            title="Slate Backdrop"
          >
            Slate
          </button>
          <button
            type="button"
            onClick={() => setCanvasTheme("light")}
            className={cn(
              "px-2 py-1 rounded-lg transition-colors",
              canvasTheme === "light" ? "bg-white text-zinc-950 shadow-xs" : "text-zinc-400 hover:text-zinc-200"
            )}
            title="Light Paper Backdrop"
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setCanvasTheme("checker")}
            className={cn(
              "px-2 py-1 rounded-lg transition-colors",
              canvasTheme === "checker" ? "bg-primary text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
            title="Checkerboard Grid"
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setCanvasTheme("dark")}
            className={cn(
              "px-2 py-1 rounded-lg transition-colors",
              canvasTheme === "dark" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
            title="Pure Dark Backdrop"
          >
            Dark
          </button>
        </div>

        {/* Selection Status Badge */}
        {selectedNodeIds.size > 0 && (
          <div className="hidden sm:flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-primary/40 rounded-xl px-3 py-1.5 shadow-lg animate-in fade-in duration-150">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-zinc-200">
              {selectedNodeIds.size} node{selectedNodeIds.size > 1 ? "s" : ""} selected
            </span>
          </div>
        )}
      </div>

      {/* Floating Canvas Top-Right Coordinates HUD */}
      {cursorCoordinates && (
        <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl px-3 py-1.5 shadow-lg text-xs font-mono text-zinc-400">
          <span>
            X: <strong className="text-zinc-200">{cursorCoordinates.x}</strong>
          </span>
          <span>
            Y: <strong className="text-zinc-200">{cursorCoordinates.y}</strong>
          </span>
          {snapStep > 0 && (
            <span className="text-[10px] text-primary/80 uppercase font-sans font-semibold">
              Snap {snapStep}px
            </span>
          )}
        </div>
      )}

      {/* Main Vector SVG Stage */}
      <div
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          transition: isPanning ? "none" : "transform 0.1s ease-out",
        }}
      >
        <svg
          ref={svgReference}
          viewBox={`${-VIEW_PADDING} ${-VIEW_PADDING} ${CANVAS_SIZE + VIEW_PADDING * 2} ${CANVAS_SIZE + VIEW_PADDING * 2}`}
          width={CANVAS_SIZE * scale}
          height={CANVAS_SIZE * scale}
          className="select-none drop-shadow-2xl overflow-visible"
        >
          <defs>
            <pattern id="canvas-checker-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="#1e2029" />
              <rect x="4" width="4" height="4" fill="#282a36" />
              <rect y="4" width="4" height="4" fill="#282a36" />
              <rect x="4" y="4" width="4" height="4" fill="#1e2029" />
            </pattern>
          </defs>

          {/* Workspace Canvas Frame */}
          <rect
            x={0}
            y={0}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            rx={3}
            fill={
              canvasTheme === "light"
                ? "#f8fafc"
                : canvasTheme === "checker"
                  ? "url(#canvas-checker-pattern)"
                  : canvasTheme === "slate"
                    ? "#1e2028"
                    : "#121215"
            }
            stroke={canvasTheme === "light" ? "#cbd5e1" : "#383b47"}
            strokeWidth="0.8"
          />

          {/* Reference Ghost Layers (Head, Features, Opposite Hair, Hat, Grid) */}
          <GhostLayers
            avatarState={avatarState}
            currentLayer={currentLayer}
            settings={ghostSettings}
            useHatVariant={useHatVariant}
          />

          {/* Editable Hair Vector Path with High-Contrast Stroke */}
          {pathString && (
            <g pointerEvents="none">
              <path
                d={pathString}
                fill="none"
                stroke={canvasTheme === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.2)"}
                strokeWidth="3.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={pathString}
                fill={
                  currentLayer === "highlight"
                    ? "#fde68a"
                    : currentLayer === "back"
                      ? canvasTheme === "light"
                        ? "#475569"
                        : "#334155"
                      : canvasTheme === "light"
                        ? "#1e293b"
                        : "#475569"
                }
                stroke={
                  editMode === "move"
                    ? "#f97316"
                    : currentLayer === "highlight"
                      ? "#b45309"
                      : canvasTheme === "light"
                        ? "#0f172a"
                        : "#f4f4f5"
                }
                strokeWidth={editMode === "move" ? "2.2" : "1.8"}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.95"
              />
            </g>
          )}

          {/* Pen / Add Node Hover Guide Dot */}
          {editMode === "pen" && hoverProjection && (
            <g pointerEvents="none" className="animate-in fade-in duration-100">
              <circle
                cx={hoverProjection.point.x}
                cy={hoverProjection.point.y}
                r={4}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeDasharray="1.5 1.5"
              />
              <circle
                cx={hoverProjection.point.x}
                cy={hoverProjection.point.y}
                r={2.2}
                fill="#38bdf8"
              />
            </g>
          )}

          {/* Multi-Selection Bounding Box */}
          {selectionBounds && (
            <rect
              x={selectionBounds.x}
              y={selectionBounds.y}
              width={selectionBounds.width}
              height={selectionBounds.height}
              fill="rgba(249, 115, 22, 0.05)"
              stroke="#f97316"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              pointerEvents="none"
            />
          )}

          {/* Tangent Handle Connecting Guide Lines */}
          <g pointerEvents="none">
            {nodes.map((node, index) => {
              if (node.type !== "control") return null;

              const nextEndpoint = nodes
                .slice(index + 1)
                .find(
                  (candidate) =>
                    candidate.commandIndex === node.commandIndex && candidate.type === "endpoint"
                );
              const previousEndpoint =
                nodes
                  .slice(0, index)
                  .reverse()
                  .find((candidate) => candidate.type === "endpoint") || { x: 0, y: 0 };

              const targetEndpoint =
                node.controlIndex === 2 ? nextEndpoint : previousEndpoint || nextEndpoint;

              return (
                <line
                  key={`handle-line-${node.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetEndpoint ? targetEndpoint.x : node.x}
                  y2={targetEndpoint ? targetEndpoint.y : node.y}
                  stroke="#38bdf8"
                  strokeWidth="0.6"
                  strokeDasharray="1.5 1.5"
                  opacity="0.8"
                />
              );
            })}
          </g>

          {/* Interactive Vector Nodes & Control Handles */}
          <g>
            {nodes.map((node, index) => {
              const isSelected = selectedNodeIds.has(node.id);
              const isHovered = hoveredNodeId === node.id;
              const isControl = node.type === "control";
              const isStartNode = index === 0 && node.commandType === "M";

              const diamondRadius = isSelected ? 4.2 : isHovered ? 3.8 : 3.2;
              const circleRadius = isSelected
                ? isControl
                  ? 3.6
                  : 4.2
                : isHovered
                  ? isControl
                    ? 3.0
                    : 3.6
                  : isControl
                    ? 2.4
                    : 2.8;

              return (
                <g
                  key={node.id}
                  onMouseDown={handleMouseDownNode(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId((previous) => (previous === node.id ? null : previous))}
                  className="cursor-pointer"
                >
                  {/* Invisible Generous Hit-Target Area (16px diameter) */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={8}
                    fill="transparent"
                    stroke="transparent"
                  />

                  {/* Selection & Hover Halo */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isControl ? 6.5 : 7.5}
                      fill="none"
                      stroke={isControl ? "#38bdf8" : "#f97316"}
                      strokeWidth={isSelected ? 1.4 : 0.9}
                      opacity={isSelected ? 0.95 : 0.6}
                      pointerEvents="none"
                    />
                  )}

                  {/* Marker Shape: Diamond for start, circle for anchor & control */}
                  {isStartNode ? (
                    <polygon
                      points={`${node.x},${node.y - diamondRadius} ${node.x + diamondRadius},${node.y} ${node.x},${node.y + diamondRadius} ${node.x - diamondRadius},${node.y}`}
                      fill={isSelected ? "#10b981" : isHovered ? "#34d399" : "#059669"}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 1.0 : 0.8}
                      pointerEvents="none"
                    />
                  ) : (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={circleRadius}
                      fill={
                        isControl
                          ? isSelected
                            ? "#38bdf8"
                            : isHovered
                              ? "#7dd3fc"
                              : "#0284c7"
                          : isSelected
                            ? "#f97316"
                            : isHovered
                              ? "#fdba74"
                              : "#ea580c"
                      }
                      stroke={isSelected ? "#ffffff" : "rgba(0,0,0,0.6)"}
                      strokeWidth={isSelected ? 1.2 : 0.6}
                      pointerEvents="none"
                    />
                  )}

                  {/* Single Selected Node Coordinate Tooltip */}
                  {isSelected && selectedNodeIds.size === 1 && !isDraggingNodes && (
                    <g pointerEvents="none">
                      <rect
                        x={node.x + 6}
                        y={node.y - 13}
                        width="32"
                        height="9"
                        rx="2"
                        fill="rgba(15, 23, 42, 0.95)"
                        stroke="#334155"
                        strokeWidth="0.5"
                      />
                      <text
                        x={node.x + 9}
                        y={node.y - 7}
                        fontSize="4"
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

          {/* Marquee Selection Drag Rectangle */}
          {isMarqueeActive && marqueeBox && (
            <rect
              x={Math.min(marqueeBox.start.x, marqueeBox.current.x)}
              y={Math.min(marqueeBox.start.y, marqueeBox.current.y)}
              width={Math.abs(marqueeBox.current.x - marqueeBox.start.x)}
              height={Math.abs(marqueeBox.current.y - marqueeBox.start.y)}
              fill="rgba(249, 115, 22, 0.15)"
              stroke="#f97316"
              strokeWidth="0.75"
              strokeDasharray="2 2"
              pointerEvents="none"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
