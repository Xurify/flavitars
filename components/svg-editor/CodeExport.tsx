"use client";

import React, { useState } from "react";
import { HairId } from "@/lib/avatar/parts/hair";

interface CodeExportProps {
  pathString: string;
  hairId: HairId;
  layer: "front" | "back";
}

export function CodeExport({ pathString, hairId, layer }: CodeExportProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const componentName = `${hairId}${layer === "front" ? "Front" : "Back"}`;

  const code = `const ${componentName}: PartComponent = ({ fill }) => (
  <path
    d="${pathString}"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-lg text-sm font-semibold transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Export Code
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Export Component</h3>
                <p className="text-sm text-zinc-400 mt-0.5">
                  Copy this code to <code className="text-amber-400">hair.tsx</code>
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Code Block */}
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
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-zinc-300">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-amber-400">{componentName}</span>
                    <span className="text-zinc-500">: PartComponent</span>{" "}
                    <span className="text-zinc-500">=</span>{" "}
                    <span className="text-zinc-400">({"{ "}fill{" }"})</span>{" "}
                    <span className="text-purple-400">=&gt;</span>{" "}
                    <span className="text-zinc-400">(</span>
                    {"\n"}
                    {"  "}<span className="text-zinc-400">&lt;</span>
                    <span className="text-emerald-400">path</span>
                    {"\n"}
                    {"    "}<span className="text-blue-400">d</span>
                    <span className="text-zinc-500">=</span>
                    <span className="text-amber-300">&quot;{pathString.slice(0, 50)}{pathString.length > 50 ? "..." : ""}&quot;</span>
                    {"\n"}
                    {"    "}<span className="text-blue-400">fill</span>
                    <span className="text-zinc-500">=</span>
                    <span className="text-zinc-400">{"{"}</span>
                    <span className="text-zinc-300">fill || &quot;var(--avatar-hair, #000)&quot;</span>
                    <span className="text-zinc-400">{"}"}</span>
                    {"\n"}
                    {"    "}<span className="text-blue-400">stroke</span>
                    <span className="text-zinc-500">=</span>
                    <span className="text-amber-300">&quot;currentColor&quot;</span>
                    {"\n"}
                    {"    "}<span className="text-blue-400">strokeWidth</span>
                    <span className="text-zinc-500">=</span>
                    <span className="text-amber-300">&quot;2&quot;</span>
                    {"\n"}
                    {"  "}<span className="text-zinc-400">/&gt;</span>
                    {"\n"}
                    <span className="text-zinc-400">);</span>
                  </code>
                </pre>
              </div>

              {/* Raw Path */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Raw Path String</label>
                <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-3">
                  <code className="text-xs text-zinc-400 break-all font-mono">{pathString}</code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
              <button
                onClick={() => setShowModal(false)}
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
          </div>
        </div>
      )}
    </>
  );
}
