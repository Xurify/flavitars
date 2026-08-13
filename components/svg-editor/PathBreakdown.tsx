"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Trash2Icon,
  SparklesIcon,
  HelpCircleIcon,
  FlipHorizontalIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignHorizontalDistributeCenterIcon,
  AlignVerticalDistributeCenterIcon,
  CheckIcon,
} from "lucide-react";
import { PathCommand, PathNode, getCommandExplanation } from "@/lib/svg-editor/path-parser";
import {
  convertSegmentType,
  alignNodes,
  mirrorPathSymmetric,
  roundAllCoordinates,
} from "@/lib/svg-editor/path-engine";
import { cn } from "@/lib/utils/strings";

interface PathBreakdownProperties {
  commands: PathCommand[];
  selectedNodeIds: Set<string>;
  nodes: PathNode[];
  onNodeSelect: (selectedIds: Set<string>) => void;
  onCommandUpdate: (commandIndex: number, parameters: number[]) => void;
  onDeleteCommand: (commandIndex: number) => void;
  onCommandsReplace: (newCommands: PathCommand[], actionLabel: string) => void;
}

export function PathBreakdown({
  commands,
  selectedNodeIds,
  nodes,
  onNodeSelect,
  onCommandUpdate,
  onDeleteCommand,
  onCommandsReplace,
}: PathBreakdownProperties): React.JSX.Element {
  const containerReference = useRef<HTMLDivElement>(null);
  const selectedReference = useRef<HTMLDivElement>(null);
  const [showTips, setShowTips] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string): void => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const selectedNodes = useMemo(
    () => nodes.filter((node) => selectedNodeIds.has(node.id)),
    [nodes, selectedNodeIds]
  );

  const primarySelectedNode = selectedNodes.length === 1 ? selectedNodes[0] : null;

  const getNodesForCommand = (commandIndex: number): PathNode[] => {
    return nodes.filter((node) => node.commandIndex === commandIndex);
  };

  useEffect(() => {
    if (primarySelectedNode && selectedReference.current) {
      selectedReference.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [primarySelectedNode]);

  const handleConvertSegment = (targetType: "L" | "Q" | "C"): void => {
    if (!primarySelectedNode) return;
    const updated = convertSegmentType(commands, primarySelectedNode.commandIndex, targetType);
    onCommandsReplace(updated, `Convert to ${targetType}`);
    triggerToast(`Converted segment to ${targetType}`);
  };

  const handleAlign = (
    alignment: "left" | "right" | "top" | "bottom" | "centerX" | "centerY" | "midlineX"
  ): void => {
    if (selectedNodeIds.size === 0) return;
    const updated = alignNodes(commands, selectedNodeIds, nodes, alignment);
    onCommandsReplace(updated, `Align ${alignment}`);
    triggerToast(`Aligned nodes (${alignment})`);
  };

  const handleMirrorSymmetric = (): void => {
    const updated = mirrorPathSymmetric(commands, 50);
    onCommandsReplace(updated, "Mirror Path (X=50)");
    triggerToast("Mirrored path across X=50");
  };

  const handleRoundCoordinates = (): void => {
    const updated = roundAllCoordinates(commands, 0);
    onCommandsReplace(updated, "Round Coordinates");
    triggerToast("Rounded all coordinates to integers");
  };

  const handleDeleteSelectedNodes = (): void => {
    if (selectedNodeIds.size === 0 || commands.length <= 1) return;
    const commandIndicesToDelete = new Set(selectedNodes.map((node) => node.commandIndex));
    const updated = commands.filter((_, index) => !commandIndicesToDelete.has(index));
    if (updated.length > 0) {
      onCommandsReplace(updated, `Delete ${commandIndicesToDelete.size} segments`);
      onNodeSelect(new Set());
      triggerToast(`Deleted ${commandIndicesToDelete.size} segment(s)`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/80 select-none min-h-0" ref={containerReference}>
      {/* Header */}
      <div className="p-3.5 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Vector Inspector
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {commands.length} segments • {nodes.length} nodes
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowTips((previous) => !previous)}
            className={cn(
              "px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors border",
              showTips
                ? "bg-primary/20 text-primary border-primary/40"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 border-zinc-700/60"
            )}
            title="Toggle Pro Tips"
          >
            <SparklesIcon className="w-3 h-3" />
            <span>Tips</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLegend((previous) => !previous)}
            className={cn(
              "p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors border border-zinc-700/60",
              showLegend && "bg-zinc-800 text-zinc-200"
            )}
            title="Command Legend"
          >
            <HelpCircleIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Global Quick Action Deck */}
      <div className="p-2.5 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center gap-1.5 flex-wrap shrink-0">
        <button
          type="button"
          onClick={handleMirrorSymmetric}
          className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-200 rounded-lg text-xs font-medium border border-zinc-700/60 transition-colors"
          title="Mirror path horizontally across X=50"
        >
          <FlipHorizontalIcon className="w-3.5 h-3.5 text-primary" />
          <span>Mirror X=50</span>
        </button>

        <button
          type="button"
          onClick={handleRoundCoordinates}
          className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-200 rounded-lg text-xs font-medium border border-zinc-700/60 transition-colors"
          title="Round all coordinates to integers"
        >
          <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>Clean Ints</span>
        </button>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="mx-3 my-1.5 px-2.5 py-1 rounded-lg bg-primary/20 border border-primary/40 text-primary text-xs font-medium flex items-center gap-1.5 animate-in fade-in duration-150 shrink-0">
          <CheckIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Multi-Node Selected Inspector Card */}
      {selectedNodes.length > 1 && (
        <div className="p-3 m-2.5 rounded-xl bg-zinc-900/90 border border-primary/40 shadow-sm shrink-0 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {selectedNodes.length} Nodes Selected
            </span>
            <button
              type="button"
              onClick={handleDeleteSelectedNodes}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:bg-red-500/10 px-2 py-0.5 rounded-md transition-colors"
            >
              <Trash2Icon className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Align Nodes
            </label>
            <div className="grid grid-cols-5 gap-1">
              <button
                type="button"
                onClick={() => handleAlign("left")}
                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center justify-center"
                title="Align Left"
              >
                <AlignLeftIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleAlign("midlineX")}
                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-primary font-bold text-[10px] flex items-center justify-center"
                title="Align to Midline (X=50)"
              >
                X:50
              </button>
              <button
                type="button"
                onClick={() => handleAlign("right")}
                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center justify-center"
                title="Align Right"
              >
                <AlignRightIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleAlign("centerX")}
                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center justify-center"
                title="Center Horizontally"
              >
                <AlignHorizontalDistributeCenterIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleAlign("centerY")}
                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center justify-center"
                title="Center Vertically"
              >
                <AlignVerticalDistributeCenterIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Node Selected Inspector Card */}
      {primarySelectedNode && (
        <div className="p-3 m-2.5 rounded-xl bg-zinc-900/90 border border-primary/40 shadow-sm shrink-0 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  primarySelectedNode.type === "control" ? "bg-sky-400" : "bg-primary"
                )}
              />
              <span className="text-xs font-bold text-zinc-100">
                {primarySelectedNode.type === "control" ? "Control Handle" : "Anchor Node"}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              Cmd #{primarySelectedNode.commandIndex} ({commands[primarySelectedNode.commandIndex]?.type})
            </span>
          </div>

          {/* Segment Type Convert Buttons */}
          {primarySelectedNode.type === "endpoint" &&
            commands[primarySelectedNode.commandIndex]?.type.toUpperCase() !== "M" && (
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Convert Segment Type
                </label>
                <div className="flex bg-zinc-950/80 p-0.5 rounded-lg border border-zinc-800 gap-0.5">
                  <button
                    type="button"
                    onClick={() => handleConvertSegment("L")}
                    className={cn(
                      "flex-1 py-1 rounded text-xs font-semibold transition-colors",
                      commands[primarySelectedNode.commandIndex]?.type.toUpperCase() === "L"
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    Line (L)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConvertSegment("Q")}
                    className={cn(
                      "flex-1 py-1 rounded text-xs font-semibold transition-colors",
                      commands[primarySelectedNode.commandIndex]?.type.toUpperCase() === "Q"
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    Quad (Q)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConvertSegment("C")}
                    className={cn(
                      "flex-1 py-1 rounded text-xs font-semibold transition-colors",
                      commands[primarySelectedNode.commandIndex]?.type.toUpperCase() === "C"
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    Cubic (C)
                  </button>
                </div>
              </div>
            )}
        </div>
      )}

      {/* Pro Tips Collapsible Panel */}
      {showTips && (
        <div className="p-3 border-b border-zinc-800 bg-primary/5 shrink-0 text-xs animate-in slide-in-from-top-2 duration-200">
          <ul className="space-y-1 text-zinc-300 text-[11px] list-disc pl-4 marker:text-primary">
            <li><strong className="text-zinc-100">Arrow keys</strong> nudge selected node by 1px (Shift + Arrow for 5px).</li>
            <li><strong className="text-zinc-100">Space + Drag</strong> to pan around the canvas.</li>
            <li><strong className="text-zinc-100">Pen Mode (P)</strong>: hover over any curve to insert points cleanly.</li>
            <li><strong className="text-zinc-100">Marquee / Shift-click</strong> to select multiple nodes together.</li>
          </ul>
        </div>
      )}

      {/* Command Legend Collapsible Panel */}
      {showLegend && (
        <div className="p-3 border-b border-zinc-800 bg-zinc-900/90 shrink-0 text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">M</span>
              <span className="text-zinc-400">Move To (Start)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-[10px]">L</span>
              <span className="text-zinc-400">Straight Line</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">Q</span>
              <span className="text-zinc-400">Quad Curve (1 handle)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">C</span>
              <span className="text-zinc-400">Cubic Curve (2 handles)</span>
            </div>
          </div>
        </div>
      )}

      {/* Command Cards List */}
      <div className="flex-1 overflow-y-auto scrollbar-refined p-3 space-y-2 min-h-0">
        {commands.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-500 italic">
            No path commands available
          </div>
        ) : (
          commands.map((command, commandIndex) => {
            const explanation = getCommandExplanation(command.type);
            const commandNodes = getNodesForCommand(commandIndex);
            const isSelected = commandNodes.some((node) => selectedNodeIds.has(node.id));

            return (
              <div
                key={`command-${commandIndex}`}
                ref={isSelected ? selectedReference : null}
                onClick={() => {
                  if (commandNodes.length > 0) {
                    onNodeSelect(new Set(commandNodes.map((node) => node.id)));
                  }
                }}
                className={cn(
                  "p-2.5 rounded-xl border transition-all cursor-pointer group relative",
                  isSelected
                    ? "bg-zinc-900 border-primary/60 ring-1 ring-primary/40 shadow-sm"
                    : "bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700/80"
                )}
              >
                {/* Command Header */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shrink-0",
                        command.type === "Z" || command.type === "z"
                          ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                          : command.type === "M" || command.type === "m"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : command.type === "L" ||
                                command.type === "l" ||
                                command.type === "H" ||
                                command.type === "h" ||
                                command.type === "V" ||
                                command.type === "v"
                              ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                              : command.type === "Q" || command.type === "q"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      )}
                    >
                      {command.type}
                    </span>
                    <span className="text-xs font-semibold text-zinc-200">
                      {explanation.name}
                    </span>
                  </div>

                  {/* Node Indicators & Delete */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {commandNodes.map((node) => (
                        <span
                          key={node.id}
                          className={cn(
                            "w-2 h-2 rounded-full transition-transform",
                            selectedNodeIds.has(node.id) ? "ring-2 ring-white scale-125" : ""
                          )}
                          style={{
                            backgroundColor: node.type === "control" ? "#38bdf8" : "#fb923c",
                          }}
                          title={node.label}
                        />
                      ))}
                    </div>

                    {commands.length > 1 && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteCommand(commandIndex);
                        }}
                        className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Command Segment"
                      >
                        <Trash2Icon className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Coordinate Inputs */}
                {command.params.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5 mt-1.5 bg-zinc-950/60 p-1.5 rounded-lg border border-zinc-800/60 font-mono text-xs">
                    {explanation.paramLabels.map((label, parameterIndex) => {
                      const value = command.params[parameterIndex];
                      if (value === undefined) return null;

                      return (
                        <div
                          key={`param-${parameterIndex}`}
                          className="flex items-center justify-between bg-zinc-900/80 rounded px-1.5 py-1 border border-zinc-800"
                        >
                          <span className="text-zinc-400 text-[10px] font-medium">{label}:</span>
                          <input
                            type="number"
                            value={Math.round(value)}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => {
                              const newParameters = [...command.params];
                              newParameters[parameterIndex] = Number(event.target.value);
                              onCommandUpdate(commandIndex, newParameters);
                            }}
                            className="w-12 bg-transparent text-primary font-bold text-right focus:outline-none focus:ring-1 focus:ring-primary/50 rounded px-1 transition-all hover:bg-zinc-800 text-xs"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
