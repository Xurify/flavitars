"use client";

import React, { useState, useMemo } from "react";
import { CodeIcon, ClipboardIcon, CheckIcon } from "lucide-react";
import { HairId } from "@/lib/avatar/parts/hair";
import { HatId } from "@/lib/avatar/parts/hats";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPathReadable, parsePath, serializePath } from "@/lib/svg-editor/path-parser";
import { cn } from "@/lib/utils/strings";

interface CodeExportProperties {
  pathString: string;
  originalPathString: string;
  hairId: HairId;
  layer: "front" | "back" | "highlight";
  hatId: HatId;
}

function useCopyFeedback(): [(text: string, key: string) => Promise<void>, string | null] {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = async (text: string, key: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      console.error("Failed to copy path code:", error);
    }
  };

  return [copy, copiedKey];
}

export function CodeExport({
  pathString,
  originalPathString,
  hairId: _hairId,
  layer: _layer,
  hatId: _hatId,
}: CodeExportProperties): React.JSX.Element {
  const [handleCopy, copiedKey] = useCopyFeedback();
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOriginal = useMemo(
    () => serializePath(parsePath(originalPathString).commands),
    [originalPathString]
  );
  const isModified = pathString !== normalizedOriginal;

  const displayOriginal = useMemo(
    () => formatPathReadable(originalPathString),
    [originalPathString]
  );
  const displayEdited = useMemo(() => formatPathReadable(pathString), [pathString]);

  const copyOriginal = (): Promise<void> => handleCopy(displayOriginal, "original");
  const copyEdited = (): Promise<void> => handleCopy(displayEdited, "edited");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center h-8 sm:h-9 shrink-0 gap-1.5 px-3 sm:px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
        >
          <CodeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Export Code</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[min(42rem,calc(100vw-2rem))]! w-full bg-zinc-900 border-zinc-700/80 p-0 overflow-hidden flex flex-col rounded-2xl">
        <DialogHeader className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 items-start shrink-0">
          <DialogTitle className="text-base font-bold text-zinc-100 uppercase tracking-wider">
            Export SVG Path
          </DialogTitle>
          <p className="text-xs text-zinc-400 mt-1">
            Copy vector path strings directly to <code className="text-primary font-mono font-semibold">hair-paths.ts</code>.
          </p>
        </DialogHeader>

        <div className="p-6 flex flex-col gap-4 min-h-0 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">
                Original Path
              </label>
              <button
                type="button"
                onClick={copyOriginal}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 border",
                  copiedKey === "original"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
                )}
              >
                {copiedKey === "original" ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-3 max-h-24 min-w-0 overflow-hidden">
              <code className="text-xs text-zinc-500 font-mono whitespace-nowrap block">
                {displayOriginal || "—"}
              </code>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-2">
                <span>Edited Path</span>
                {isModified && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-primary/20 text-primary border border-primary/40 normal-case">
                    Modified
                  </span>
                )}
              </label>
              <button
                type="button"
                onClick={copyEdited}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 border",
                  copiedKey === "edited"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
                )}
              >
                {copiedKey === "edited" ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-3 max-h-24 min-w-0 overflow-hidden">
              <code
                className={cn(
                  "text-xs font-mono whitespace-nowrap block",
                  isModified ? "text-primary font-medium" : "text-zinc-500"
                )}
              >
                {displayEdited}
              </code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={copyEdited}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            Copy Edited Path
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
