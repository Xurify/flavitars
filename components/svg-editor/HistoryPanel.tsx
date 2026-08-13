"use client";

import React from "react";
import { HistoryIcon, ClockIcon } from "lucide-react";
import { PathCommand } from "@/lib/svg-editor/path-parser";
import { cn } from "@/lib/utils/strings";

interface HistoryEntry {
  id: string;
  timestamp: number;
  commands: PathCommand[];
  label: string;
}

interface HistoryPanelProperties {
  history: HistoryEntry[];
  currentIndex: number;
  onRevert: (index: number) => void;
}

export function HistoryPanel({
  history,
  currentIndex,
  onRevert,
}: HistoryPanelProperties): React.JSX.Element {
  const canUndo = history.length > 0 && currentIndex > 0;
  const canRedo = history.length > 0 && currentIndex < history.length - 1;

  return (
    <div className="flex flex-col h-full bg-zinc-950/90 border-l border-zinc-800/80 select-none">
      <div className="p-3.5 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-3.5 h-3.5 text-primary" />
            <h2 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              History
            </h2>
          </div>
          <span className="text-[11px] font-bold text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700/60">
            {history.length} steps
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 mt-1">Jump to any previous state</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-refined p-2 space-y-1">
        {history.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center mb-2 border border-zinc-800">
              <ClockIcon className="w-5 h-5 text-zinc-600" />
            </div>
            <p className="text-xs text-zinc-400 italic">No history yet</p>
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-1">
            {history.map((entry, index) => {
              const isCurrent = index === currentIndex;
              const isFuture = index > currentIndex;

              return (
                <button
                  type="button"
                  key={entry.id}
                  onClick={() => onRevert(index)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors w-full rounded-xl cursor-pointer border",
                    isCurrent
                      ? "bg-primary/10 border-primary/40 text-zinc-100 shadow-xs"
                      : isFuture
                        ? "border-transparent opacity-30 hover:opacity-60"
                        : "border-transparent text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[11px] font-bold font-mono",
                      isCurrent
                        ? "bg-primary text-white shadow-xs"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700/50"
                    )}
                  >
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-xs font-medium truncate",
                        isCurrent ? "text-zinc-100 font-semibold" : "text-zinc-400"
                      )}
                    >
                      {entry.label}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>

                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(226,90,54,0.6)]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/60 shrink-0">
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div
            className={cn(
              "flex flex-col gap-1 p-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60",
              !canUndo && "opacity-40"
            )}
          >
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Undo
            </span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                Ctrl
              </kbd>
              <span className="text-zinc-600">+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                Z
              </kbd>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col gap-1 p-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60",
              !canRedo && "opacity-40"
            )}
          >
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Redo
            </span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                Ctrl
              </kbd>
              <span className="text-zinc-600">+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                Y
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
