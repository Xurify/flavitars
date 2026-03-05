"use client";

import React, { useState, useMemo } from "react";
import { HairId } from "@/lib/avatar/parts/hair";
import { HatId, SMALL_HATS } from "@/lib/avatar/parts/hats";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CodeIcon, ClipboardIcon, CheckIcon } from "lucide-react";
import { formatPathReadable, parsePath, serializePath } from "@/lib/svg-editor/path-parser";

interface CodeExportProps {
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
      console.error("Failed to copy:", error);
    }
  };
  return [copy, copiedKey];
}

export function CodeExport({ pathString, originalPathString, hairId: _hairId, layer: _layer, hatId: _hatId }: CodeExportProps): React.JSX.Element {
  const [handleCopy, copiedKey] = useCopyFeedback();
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOriginal = useMemo(
    () => serializePath(parsePath(originalPathString).commands),
    [originalPathString],
  );
  const isModified = pathString !== normalizedOriginal;

  const displayOriginal = useMemo(() => formatPathReadable(originalPathString), [originalPathString]);
  const displayEdited = useMemo(() => formatPathReadable(pathString), [pathString]);

  const copyOriginal = () => handleCopy(displayOriginal, "original");
  const copyEdited = () => handleCopy(displayEdited, "edited");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center h-9 shrink-0 gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-lg text-sm font-semibold transition-colors border border-amber-400">
          <CodeIcon className="w-4 h-4" />
          Export Code
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[min(42rem,calc(100vw-2rem))]! w-full bg-zinc-900 border-zinc-700 p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 items-start shrink-0">
          <DialogTitle className="text-lg font-semibold text-zinc-100">Export Path</DialogTitle>
          <p className="text-sm text-zinc-400 mt-0.5">
            Copy path strings to <code className="text-amber-400">hair-paths.ts</code>. Paths match file format for easy
            find/replace.
          </p>
        </DialogHeader>

        <div className="p-6 flex flex-col gap-4 min-h-0 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider shrink-0">Original Path</label>
              <button
                onClick={copyOriginal}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  copiedKey === "original"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }`}
              >
                {copiedKey === "original" ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-3 max-h-24 min-w-0 overflow-hidden">
              <code className="text-xs text-zinc-500 font-mono whitespace-nowrap block">
                {displayOriginal || "—"}
              </code>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider shrink-0">
                Edited Path
                {isModified && (
                  <span className="ml-2 text-amber-500 normal-case tracking-normal">modified</span>
                )}
              </label>
              <button
                onClick={copyEdited}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  copiedKey === "edited"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }`}
              >
                {copiedKey === "edited" ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-3 max-h-24 min-w-0 overflow-hidden">
              <code className={`text-xs font-mono whitespace-nowrap block ${isModified ? "text-amber-400/80" : "text-zinc-500"}`}>
                {displayEdited}
              </code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={copyEdited}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-lg text-sm font-semibold transition-colors"
          >
            Copy edited path
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
