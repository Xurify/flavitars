"use client";

import React, { useState } from "react";
import { HairId } from "@/lib/avatar/parts/hair";
import { HatId, SMALL_HATS } from "@/lib/avatar/parts/hats";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CodeIcon, ClipboardIcon, CheckIcon } from "lucide-react";

interface CodeExportProps {
  pathString: string;
  hairId: HairId;
  layer: "front" | "back";
  hatId: HatId;
}

export function CodeExport({ pathString, hairId, layer, hatId }: CodeExportProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isWearingAHat = hatId !== "none" && !SMALL_HATS.includes(hatId);
  const componentName = `${hairId}${layer === "front" ? "Front" : "Back"}`;

  const code = isWearingAHat
    ? `/**
 * Implementation Note: Add this logic to the ${componentName} component
 * 
 * const hasHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
 * 
 * if (hasHat) {
 *   return (
 *     <path
 *       d="${pathString}"
 *       fill={fill || "var(--avatar-hair, #000)"}
 *       stroke="currentColor"
 *       strokeWidth="2"
 *     />
 *   );
 * }
 */`
    : `const ${componentName}: PartComponent = ({ fill }) => (
  <path
    d="${pathString}"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);`;

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-lg text-sm font-semibold transition-colors">
          <CodeIcon className="w-4 h-4" />
          Export Code
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-zinc-900 border-zinc-700 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 items-start">
          <DialogTitle className="text-lg font-semibold text-zinc-100">Export Component</DialogTitle>
          <p className="text-sm text-zinc-400 mt-0.5">
            Copy this code to <code className="text-amber-400">hair.tsx</code> ({isWearingAHat ? "Tucked Hair" : "Full Hair"})
          </p>
        </DialogHeader>

        <div className="p-6">
          <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
              <span className="text-xs font-mono text-zinc-500">{componentName}.tsx</span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }`}
              >
                {copied ? (
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
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-zinc-300">
                <span className="text-purple-400">const</span> <span className="text-amber-400">{componentName}</span>
                <span className="text-zinc-500">: PartComponent</span> <span className="text-zinc-500">=</span>{" "}
                <span className="text-zinc-400">
                  ({"{ "}fill{" }"})
                </span>{" "}
                <span className="text-purple-400">=&gt;</span> <span className="text-zinc-400">(</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-400">&lt;</span>
                <span className="text-emerald-400">path</span>
                {"\n"}
                {"    "}
                <span className="text-blue-400">d</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">
                  &quot;{pathString.slice(0, 50)}
                  {pathString.length > 50 ? "..." : ""}&quot;
                </span>
                {"\n"}
                {"    "}
                <span className="text-blue-400">fill</span>
                <span className="text-zinc-500">=</span>
                <span className="text-zinc-400">{"{"}</span>
                <span className="text-zinc-300">fill || &quot;var(--avatar-hair, #000)&quot;</span>
                <span className="text-zinc-400">{"}"}</span>
                {"\n"}
                {"    "}
                <span className="text-blue-400">stroke</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;currentColor&quot;</span>
                {"\n"}
                {"    "}
                <span className="text-blue-400">strokeWidth</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;2&quot;</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-400">/&gt;</span>
                {"\n"}
                <span className="text-zinc-400">);</span>
              </code>
            </pre>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Raw Path String</label>
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-3">
              <code className="text-xs text-zinc-400 break-all font-mono">{pathString}</code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-lg text-sm font-semibold transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
