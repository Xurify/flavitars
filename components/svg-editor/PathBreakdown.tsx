"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Trash2Icon,
  ChevronUpIcon,
  SparklesIcon,
  HelpCircleIcon,
} from "lucide-react";
import { PathCommand, PathNode, getCommandExplanation } from "@/lib/svg-editor/path-parser";
import { cn } from "@/lib/utils/strings";

interface PathBreakdownProperties {
  commands: PathCommand[];
  selectedNodeId: string | null;
  nodes: PathNode[];
  onNodeSelect: (identifier: string | null) => void;
  onCommandUpdate: (commandIndex: number, parameters: number[]) => void;
  onDeleteCommand: (commandIndex: number) => void;
}

export function PathBreakdown({
  commands,
  selectedNodeId,
  nodes,
  onNodeSelect,
  onCommandUpdate,
  onDeleteCommand,
}: PathBreakdownProperties): React.JSX.Element {
  const containerReference = useRef<HTMLDivElement>(null);
  const selectedReference = useRef<HTMLDivElement>(null);
  const [showTips, setShowTips] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const getNodesForCommand = (commandIndex: number): PathNode[] => {
    return nodes.filter((node) => node.commandIndex === commandIndex);
  };

  useEffect(() => {
    if (selectedNodeId && selectedReference.current) {
      selectedReference.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedNodeId]);

  return (
    <div className="flex flex-col h-full bg-zinc-950/80 select-none" ref={containerReference}>
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Path Breakdown
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {commands.length} SVG command segments
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

      {/* Pro Tips Collapsible Panel */}
      {showTips && (
        <div className="p-3.5 border-b border-zinc-800 bg-primary/5 shrink-0 text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <SparklesIcon className="w-3 h-3" />
              Editor Tips
            </span>
            <button
              type="button"
              onClick={() => setShowTips(false)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              <ChevronUpIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul className="space-y-1 text-zinc-300 text-[11px] list-disc pl-4 marker:text-primary">
            <li>Use <strong className="text-zinc-100">Quadratic (Q)</strong> for smooth curves.</li>
            <li>Close paths with <strong className="text-zinc-100">Z</strong> to enable fill colors.</li>
            <li>Keep hair within <strong className="text-zinc-100">X=10 to 90</strong> for standard heads.</li>
          </ul>
        </div>
      )}

      {/* Command Legend Collapsible Panel */}
      {showLegend && (
        <div className="p-3.5 border-b border-zinc-800 bg-zinc-900/90 shrink-0 text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">
              Command Legend
            </span>
            <button
              type="button"
              onClick={() => setShowLegend(false)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              <ChevronUpIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">M</span>
              <span className="text-zinc-400">Move To</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-[10px]">L</span>
              <span className="text-zinc-400">Line To</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">Q</span>
              <span className="text-zinc-400">Quad Curve</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">C</span>
              <span className="text-zinc-400">Cubic Curve</span>
            </div>
          </div>
        </div>
      )}

      {/* Command Cards List */}
      <div className="flex-1 overflow-y-auto scrollbar-refined p-3 space-y-2.5">
        {commands.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-500 italic">
            No path commands available
          </div>
        ) : (
          commands.map((command, commandIndex) => {
            const explanation = getCommandExplanation(command.type);
            const commandNodes = getNodesForCommand(commandIndex);
            const isSelected = commandNodes.some((node) => node.id === selectedNodeId);

            return (
              <div
                key={`command-${commandIndex}`}
                ref={isSelected ? selectedReference : null}
                onClick={() => {
                  if (commandNodes.length > 0) {
                    onNodeSelect(commandNodes[0].id);
                  }
                }}
                className={cn(
                  "p-3 rounded-xl border transition-all cursor-pointer group relative",
                  isSelected
                    ? "bg-zinc-900 border-primary/60 ring-1 ring-primary/40 shadow-sm"
                    : "bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700/80"
                )}
              >
                {/* Command Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
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
                            node.id === selectedNodeId ? "ring-2 ring-white scale-125" : ""
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
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/60 font-mono text-xs">
                    {explanation.paramLabels.map((label, parameterIndex) => {
                      const value = command.params[parameterIndex];
                      if (value === undefined) return null;

                      return (
                        <div
                          key={`param-${parameterIndex}`}
                          className="flex items-center justify-between bg-zinc-900/80 rounded px-2 py-1 border border-zinc-800"
                        >
                          <span className="text-zinc-400 text-[11px] font-medium">{label}:</span>
                          <input
                            type="number"
                            value={Math.round(value)}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => {
                              const newParameters = [...command.params];
                              newParameters[parameterIndex] = Number(event.target.value);
                              onCommandUpdate(commandIndex, newParameters);
                            }}
                            className="w-12 bg-transparent text-primary font-bold text-right focus:outline-none focus:ring-1 focus:ring-primary/50 rounded px-1 transition-all hover:bg-zinc-800"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Plain English Translation */}
                <div className="mt-2 text-[11px] text-zinc-400 italic bg-zinc-950/30 px-2 py-1.5 rounded-md border border-zinc-800/40">
                  {getHumanTranslation(command.type, command.params)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function getHumanTranslation(type: string, parameters: number[]): string {
  const upperType = type.toUpperCase();
  const rounded = parameters.map(Math.round);

  switch (upperType) {
    case "M":
      return `Move pen to (${rounded[0]}, ${rounded[1]}) without drawing.`;
    case "L":
      return `Draw straight line to (${rounded[0]}, ${rounded[1]}).`;
    case "Q":
      return `Curve through control (${rounded[0]}, ${rounded[1]}) to (${rounded[2]}, ${rounded[3]}).`;
    case "C":
      return `Wave curve with 2 controls to (${rounded[4]}, ${rounded[5]}).`;
    case "H":
      return `Horizontal line to X=${rounded[0]}.`;
    case "V":
      return `Vertical line to Y=${rounded[0]}.`;
    case "Z":
      return "Close path back to origin.";
    default:
      return "Add custom path segment.";
  }
}
