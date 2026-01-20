"use client";

import React, { useEffect, useRef } from "react";
import { PathCommand, PathNode, getCommandExplanation } from "@/lib/svg-editor/path-parser";

interface PathBreakdownProps {
  commands: PathCommand[];
  selectedNodeId: string | null;
  nodes: PathNode[];
  onNodeSelect: (id: string | null) => void;
  onCommandUpdate: (index: number, params: number[]) => void;
  onDeleteCommand: (index: number) => void;
}

export function PathBreakdown({
  commands,
  selectedNodeId,
  nodes,
  onNodeSelect,
  onCommandUpdate,
  onDeleteCommand,
}: PathBreakdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  const getNodesForCommand = (cmdIndex: number) => {
    return nodes.filter((n) => n.commandIndex === cmdIndex);
  };

  // Auto-scroll to selected command
  useEffect(() => {
    if (selectedNodeId && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedNodeId]);

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/40">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Path Breakdown</h2>
        <p className="text-xs text-zinc-500 mt-1">Click a command to select its nodes</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {commands.length === 0 ? (
          <div className="p-4 text-sm text-zinc-500 italic">No path data available</div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {commands.map((cmd, idx) => {
              const explanation = getCommandExplanation(cmd.type);
              const cmdNodes = getNodesForCommand(idx);
              const isSelected = cmdNodes.some((n) => n.id === selectedNodeId);

              return (
                <div
                  key={idx}
                  ref={isSelected ? selectedRef : null}
                  className={`p-4 transition-colors cursor-pointer hover:bg-zinc-800/30 group relative ${
                    isSelected ? "bg-amber-500/10" : ""
                  }`}
                  onClick={() => {
                    if (cmdNodes.length > 0) {
                      onNodeSelect(cmdNodes[0].id);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        cmd.type === "Z" || cmd.type === "z"
                          ? "bg-zinc-700 text-zinc-300"
                          : cmd.type === "M" || cmd.type === "m"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : cmd.type === "L" ||
                                cmd.type === "l" ||
                                cmd.type === "H" ||
                                cmd.type === "h" ||
                                cmd.type === "V" ||
                                cmd.type === "v"
                              ? "bg-blue-500/20 text-blue-400"
                              : cmd.type === "Q" || cmd.type === "q" || cmd.type === "C" || cmd.type === "c"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {cmd.type}
                    </span>
                    <span className="text-sm font-medium text-zinc-200">{explanation.name}</span>

                    <div className="flex gap-1 ml-2">
                      {cmdNodes.map((node) => (
                        <div
                          key={node.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            node.id === selectedNodeId ? "ring-2 ring-white scale-125" : ""
                          }`}
                          style={{ backgroundColor: node.type === "control" ? "#3b82f6" : "#f59e0b" }}
                          title={node.label}
                        />
                      ))}
                    </div>

                    {commands.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCommand(idx);
                        }}
                        className="ml-auto p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Segment"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 mb-3">{explanation.description}</p>

                  {cmd.params.length > 0 && (
                    <div className="bg-zinc-900/50 rounded-xl p-3 font-mono text-xs border border-zinc-800/50 shadow-inner">
                      <div className="grid grid-cols-2 gap-2">
                        {explanation.paramLabels.map((label, paramIdx) => {
                          const value = cmd.params[paramIdx];
                          if (value === undefined) return null;

                          return (
                            <div
                              key={paramIdx}
                              className="flex items-center justify-between bg-zinc-800/50 rounded-lg px-2 py-1.5 border border-zinc-700/30 group/param"
                            >
                              <span className="text-zinc-500 font-medium">{label}:</span>
                              <input
                                type="number"
                                value={Math.round(value)}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  const newParams = [...cmd.params];
                                  newParams[paramIdx] = Number(e.target.value);
                                  onCommandUpdate(idx, newParams);
                                }}
                                className="w-12 bg-transparent text-amber-400 font-bold text-right focus:outline-none focus:ring-1 focus:ring-amber-500/30 rounded px-1 transition-all hover:bg-zinc-700/50"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-5 space-y-4">
                    <div className="bg-zinc-950/30 p-3 rounded-xl border border-zinc-800/50">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Human Translation
                      </p>
                      <p className="text-[13px] text-zinc-300 leading-relaxed font-medium italic">
                        {getHumanTranslation(cmd.type, cmd.params)}
                      </p>
                    </div>

                    <div className="bg-zinc-950/30 p-3 rounded-xl border border-zinc-800/50">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Visual Reference
                      </p>
                      <CommandVisual type={cmd.type} params={cmd.params} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #3f3f46 transparent;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #3f3f46;
          border-radius: 20px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: #52525b;
        }
      `}</style>

      <div className="p-4 border-t border-zinc-800 bg-amber-500/5 group">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Avatar Editing Pro Tips</h3>
        </div>
        <ul className="text-[11px] text-zinc-400 space-y-1.5 list-disc pl-4 marker:text-amber-500/50">
          <li>
            Use <span className="text-zinc-200">Quadratic (Q)</span> for smooth hair curves.
          </li>
          <li>
            Close paths with <span className="text-zinc-200">Z</span> to enable fill colors.
          </li>
          <li>
            Keep hair within <span className="text-zinc-200">X=10 to 90</span> for standard heads.
          </li>
          <li>
            Hats clip at <span className="text-zinc-200">Y=28-40</span>; position hair accordingly!
          </li>
        </ul>
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Command Legend</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              M
            </span>
            <span className="text-zinc-400">Move to point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">L</span>
            <span className="text-zinc-400">Line to point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">Q</span>
            <span className="text-zinc-400">Curve (1 ctrl)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">C</span>
            <span className="text-zinc-400">Curve (2 ctrl)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">H</span>
            <span className="text-zinc-400">Horizontal line</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-zinc-700 flex items-center justify-center text-zinc-300 font-bold">Z</span>
            <span className="text-zinc-400">Close path</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandVisual({ type, params }: { type: string; params: number[] }) {
  const upperType = type.toUpperCase();

  if (upperType === "M") {
    return (
      <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-emerald-500">
          <circle cx="10" cy="10" r="3" fill="currentColor" />
          <path d="M10 3 L10 7 M10 13 L10 17 M3 10 L7 10 M13 10 L17 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
        <span>
          Moves pen to ({params[0]}, {params[1]}) without drawing
        </span>
      </div>
    );
  }

  if (upperType === "L") {
    return (
      <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-500">
          <line x1="3" y1="17" x2="17" y2="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="3" r="2" fill="currentColor" />
        </svg>
        <span>
          Draws straight line to ({params[0]}, {params[1]})
        </span>
      </div>
    );
  }

  if (upperType === "Q") {
    return (
      <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-purple-500">
          <path d="M3 17 Q10 3 17 17" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="3" r="2" fill="currentColor" opacity="0.5" />
          <line x1="3" y1="17" x2="10" y2="3" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
          <line x1="17" y1="17" x2="10" y2="3" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
        </svg>
        <span>
          Quadratic curve via control ({params[0]}, {params[1]}) to ({params[2]}, {params[3]})
        </span>
      </div>
    );
  }

  if (upperType === "H") {
    return (
      <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-500">
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="10" r="2" fill="currentColor" />
        </svg>
        <span>Horizontal line to X={params[0]}</span>
      </div>
    );
  }

  if (upperType === "Z") {
    return (
      <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-zinc-400">
          <path d="M10 3 L17 10 L10 17 L3 10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Closes path back to starting point</span>
      </div>
    );
  }

  return null;
}

function getHumanTranslation(type: string, params: number[]): string {
  const upperType = type.toUpperCase();
  const rounded = params.map(Math.round);

  switch (upperType) {
    case "M":
      return `Pick up the pen and put it down at ${rounded[0]}, ${rounded[1]}.`;
    case "L":
      return `Draw a perfectly straight line to the point ${rounded[0]}, ${rounded[1]}.`;
    case "Q":
      return `Pull a smooth curve toward ${rounded[0]}, ${rounded[1]} and land at ${rounded[2]}, ${rounded[3]}.`;
    case "C":
      return `Shape a complex wave using two control points, ending at ${rounded[4]}, ${rounded[5]}.`;
    case "H":
      return `Slide the pen horizontally across to X coordinate ${rounded[0]}.`;
    case "V":
      return `Drop the pen vertically down to Y coordinate ${rounded[0]}.`;
    case "Z":
      return "Finish the shape by drawing back to where you started.";
    default:
      return "Add a new direction to the avatar's design.";
  }
}
