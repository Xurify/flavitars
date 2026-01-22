"use client";

import React from "react";
import { PathCommand } from "@/lib/svg-editor/path-parser";

interface HistoryEntry {
  id: string;
  timestamp: number;
  commands: PathCommand[];
  label: string;
}

interface HistoryPanelProps {
  history: HistoryEntry[];
  currentIndex: number;
  onRevert: (index: number) => void;
}

export function HistoryPanel({ history, currentIndex, onRevert }: HistoryPanelProps) {
  return (
    <div className="flex flex-col h-full bg-zinc-900/30 border-l border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">History</h2>
          <span className="text-xs font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">{history.length} steps</span>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Jump to any previous state</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {history.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-zinc-500 italic">No history yet</p>
          </div>
        ) : (
          <div className="flex flex-col-reverse">
            {history.map((entry, idx) => {
              const isCurrent = idx === currentIndex;
              const isFuture = idx > currentIndex;

              return (
                <button
                  key={entry.id}
                  onClick={() => onRevert(idx)}
                  className={`flex items-center gap-3 p-4 text-left transition-all border-l-2 hover:bg-zinc-800/40 ${
                    isCurrent
                      ? "bg-amber-500/10 border-amber-500"
                      : isFuture
                        ? "border-transparent opacity-40 grayscale"
                        : "border-transparent text-zinc-400 group"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isCurrent ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${isCurrent ? "text-zinc-100" : "text-zinc-400"}`}>
                      {entry.label}
                    </p>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>

                  {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Undo</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 font-sans shadow-sm">
                Ctrl
              </kbd>
              <span className="text-zinc-600 text-xs">+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 font-sans shadow-sm">
                Z
              </kbd>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Redo</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 font-sans shadow-sm">
                Ctrl
              </kbd>
              <span className="text-zinc-600 text-xs">+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 font-sans shadow-sm">
                Y
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
