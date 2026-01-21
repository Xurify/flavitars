"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { HairIds, HairId } from "@/lib/avatar/parts/hair";
import { HatIds, HatId } from "@/lib/avatar/parts/hats";
import { parsePath, serializePath, extractNodes, updateNodePosition, PathCommand, PathNode } from "@/lib/svg-editor/path-parser";
import { getHairPathData } from "./hair-data";
import { AvatarCanvas } from "./AvatarCanvas";
import { PathBreakdown } from "./PathBreakdown";
import { CodeExport } from "./CodeExport";
import { LivePreview } from "./LivePreview";
import { HistoryPanel } from "./HistoryPanel";
import { ProjectsPanel } from "./ProjectsPanel";
import { useProjectsPersistence } from "@/hooks/use-editor-persistence";

interface HistoryEntry {
  id: string;
  timestamp: number;
  commands: PathCommand[];
  label: string;
}

export function SvgPathEditor() {
  const [selectedHair, setSelectedHair] = useState<HairId>("sweptFringe");
  const [selectedHat, setSelectedHat] = useState<HatId>("none");
  const [layer, setLayer] = useState<"front" | "back">("back");
  const [showGrid, setShowGrid] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [showHat, setShowHat] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState(false);
  const [editMode, setEditMode] = useState<"node" | "drag" | "split">("node");
  const [showHistory, setShowHistory] = useState(true);
  const [breakdownWidth, setBreakdownWidth] = useState(384);
  const [historyWidth, setHistoryWidth] = useState(240);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizingBreakdown, setIsResizingBreakdown] = useState(false);
  const [isResizingHistory, setIsResizingHistory] = useState(false);
  const [showProjectsPanel, setShowProjectsPanel] = useState(false);

  const {
    projects,
    activeProject,
    hasLoaded,
    createProject,
    updateActiveProject,
    renameProject,
    deleteProject,
    loadProject,
    duplicateProject,
  } = useProjectsPersistence();

  // Get the raw path data for the selected hair + layer
  const rawPathData = useMemo(() => {
    return getHairPathData(selectedHair, layer);
  }, [selectedHair, layer]);

  // Path state (Source of Truth)
  const [commands, setCommands] = useState<PathCommand[]>(() => parsePath(rawPathData).commands);

  // History State
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize history when hair/layer changes
  useEffect(() => {
    const initialCommands = parsePath(rawPathData).commands;
    setCommands(initialCommands);
    const initialEntry: HistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      commands: initialCommands,
      label: `Initial ${selectedHair} (${layer})`,
    };
    setHistory([initialEntry]);
    setHistoryIndex(0);
    setSelectedNodeId(null);
  }, [rawPathData, selectedHair, layer]);

  // Function to push to history
  const pushToHistory = (newCommands: PathCommand[], label: string) => {
    const newEntry: HistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      commands: newCommands,
      label,
    };

    const newHistory = [...history.slice(0, historyIndex + 1), newEntry];
    // Limit history to 50 items
    if (newHistory.length > 50) newHistory.shift();

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCommands(newCommands);
  };

  // Undo / Redo logic
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCommands(history[prevIndex].commands);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCommands(history[nextIndex].commands);
    }
  }, [history, historyIndex]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history, redo, undo]);

  // Extract draggable nodes
  const nodes = useMemo(() => extractNodes(commands), [commands]);

  // Serialized path string
  const pathString = useMemo(() => serializePath(commands), [commands]);

  // Handle node drag
  const handleNodeDrag = (node: PathNode, newX: number, newY: number) => {
    const updated = updateNodePosition(commands, node, Math.round(newX), Math.round(newY));
    setCommands(updated);
  };

  // Handle path unit drag (alignment)
  const handlePathDrag = (deltaX: number, deltaY: number) => {
    const updated = commands.map((cmd) => {
      const type = cmd.type;
      const upperType = type.toUpperCase();
      const isRelative = type === type.toLowerCase() && type !== "Z" && type !== "z";

      // Re-map params based on coordinate type
      const newParams = [...cmd.params];

      // Absolute commands: update all coordinates
      if (!isRelative) {
        if (upperType === "M" || upperType === "L" || upperType === "T") {
          newParams[0] += deltaX;
          newParams[1] += deltaY;
        } else if (upperType === "H") {
          newParams[0] += deltaX;
        } else if (upperType === "V") {
          newParams[0] += deltaY;
        } else if (upperType === "S" || upperType === "Q") {
          newParams[0] += deltaX;
          newParams[1] += deltaY;
          newParams[2] += deltaX;
          newParams[3] += deltaY;
        } else if (upperType === "C") {
          newParams[0] += deltaX;
          newParams[1] += deltaY;
          newParams[2] += deltaX;
          newParams[3] += deltaY;
          newParams[4] += deltaX;
          newParams[5] += deltaY;
        } else if (upperType === "A") {
          newParams[5] += deltaX;
          newParams[6] += deltaY;
        }
      }
      // Relative commands: usually don't need update unless it's the starting 'm'
      // but for simplicity, the path-parser primarily handles absolute for our editor

      return { ...cmd, params: newParams };
    });
    setCommands(updated);
  };

  // Finalize drag (push to history)
  const handleDragEnd = () => {
    const label = editMode === "drag" ? "Re-position Path" : "Drag Node";
    pushToHistory(commands, label);
  };

  // Handle direct command update from breakdown
  const handleCommandUpdate = (index: number, params: number[]) => {
    const updated = [...commands];
    updated[index] = { ...updated[index], params };
    pushToHistory(updated, `Update Command ${commands[index].type}`);
  };

  // Delete command segment
  const handleDeleteCommand = (index: number) => {
    if (commands.length <= 1) return; // Don't delete last segment
    const deletedType = commands[index].type;
    const updated = commands.filter((_, idx) => idx !== index);
    pushToHistory(updated, `Delete ${deletedType} Segment`);
  };

  // Smart split at position (To be fully implemented via AvatarCanvas)
  const handlePathSplit = (newCommands: PathCommand[]) => {
    pushToHistory(newCommands, "Split Path");
  };

  // Performance-Optimized Resizing Logic
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isResizingBreakdown) {
        const newWidth = window.innerWidth - e.clientX - (showHistory ? historyWidth : 0);
        if (newWidth >= 280 && newWidth <= 800) {
          setBreakdownWidth(newWidth);
        }
      } else if (isResizingHistory) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
          setHistoryWidth(newWidth);
        }
      }
    };

    const handleWindowMouseUp = () => {
      setIsResizingBreakdown(false);
      setIsResizingHistory(false);
    };

    if (isResizingBreakdown || isResizingHistory) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseup", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isResizingBreakdown, isResizingHistory, showHistory, historyWidth]);

  return (
    <div
      ref={containerRef}
      className={`h-full flex flex-col bg-zinc-950 text-zinc-300 ${
        isResizingBreakdown || isResizingHistory ? "cursor-col-resize select-none" : ""
      }`}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
              <Image src="/images/icons/drew.png" alt="Flavitar Logo" fill className="object-cover" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">SVG Path Editor</h1>
          </Link>
          {activeProject && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-xs font-medium text-zinc-300">{activeProject.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 bg-zinc-950/50 p-1.5 rounded-xl border border-zinc-800 shadow-inner">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-lg transition-all ${showGrid ? "bg-amber-500/10 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Toggle Show Grid"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path opacity="0.4" d="M3 3h18v18H3z" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
            </button>
            <button
              onClick={() => setShowNodes(!showNodes)}
              className={`p-2 rounded-lg transition-all ${showNodes ? "bg-amber-500/10 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Toggle Show Nodes"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
              </svg>
            </button>
            <button
              onClick={() => setShowHat(!showHat)}
              className={`p-2 rounded-lg transition-all ${showHat ? "bg-amber-500/10 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Toggle Hat Visibility"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4 0-7.5 3-8 7.5V15h16v-4.5c-.5-4.5-4-7.5-8-7.5z" />
                <rect x="4" y="15" width="16" height="5" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1" opacity="0.5" />
              </svg>
            </button>
            <div className="w-px h-4 bg-zinc-800 mx-1" />
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-all ${showHistory ? "bg-amber-500/10 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Toggle History Panel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setShowProjectsPanel(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
            title="Manage Projects"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Projects
          </button>

          <div className="flex items-center gap-3 border-l border-zinc-800 pl-6">
            <CodeExport pathString={pathString} hairId={selectedHair} layer={layer} />
            <button
              onClick={() => {
                navigator.clipboard.writeText(pathString);
                setCopiedPath(true);
                setTimeout(() => setCopiedPath(false), 2000);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2 ${
                copiedPath
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
              }`}
            >
              {copiedPath ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Path
                </>
              )}
            </button>
            <button
              onClick={() => {
                const resetCommands = parsePath(rawPathData).commands;
                pushToHistory(resetCommands, "Reset Path");
              }}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
            >
              Reset Path
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 border-r border-zinc-800 bg-zinc-900/40 flex flex-col">
          <div className="p-4 border-b border-zinc-800">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Edit Mode</label>
            <div className="flex bg-zinc-950 p-2 rounded-xl border border-zinc-800">
              <button
                onClick={() => setEditMode("node")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  editMode === "node"
                    ? "bg-amber-500 text-zinc-900 shadow-lg shadow-amber-500/20"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                Node
              </button>
              <button
                onClick={() => setEditMode("drag")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  editMode === "drag"
                    ? "bg-amber-500 text-zinc-900 shadow-lg shadow-amber-500/20"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 11l5 5m0 0l5-5m-5 5v12"
                    transform="rotate(180 12 12)"
                  />
                </svg>
                Drag
              </button>
              <button
                onClick={() => setEditMode("split")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  editMode === "split"
                    ? "bg-amber-500 text-zinc-900 shadow-lg shadow-amber-500/20"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" transform="rotate(45 12 12)" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Split
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-zinc-800">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Hair Style</label>
            <select
              value={selectedHair}
              onChange={(e) => setSelectedHair(e.target.value as HairId)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {HairIds.map((id) => (
                <option key={id} value={id}>
                  {id.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 border-b border-zinc-800">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Hat Overlay</label>
            <select
              value={selectedHat}
              onChange={(e) => setSelectedHat(e.target.value as HatId)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {HatIds.map((id) => (
                <option key={id} value={id}>
                  {id === "none" ? "No Hat" : id.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 border-b border-zinc-800">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Layer</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLayer("front")}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  layer === "front" ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setLayer("back")}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  layer === "back" ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                Back
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-zinc-800">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">View Options</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                />
                <span className="text-sm">Show Grid</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showNodes}
                  onChange={(e) => setShowNodes(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                />
                <span className="text-sm">Show Nodes</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHat}
                  onChange={(e) => setShowHat(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                />
                <span className="text-sm">Show Hat</span>
              </label>
            </div>
          </div>

          {selectedNodeId && (
            <div className="p-4 border-b border-zinc-800 bg-amber-500/5 transition-all animate-in fade-in slide-in-from-left-2">
              <label className="block text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Selected Node</label>
              <p className="text-sm font-mono text-zinc-200">{nodes.find((n) => n.id === selectedNodeId)?.label}</p>
            </div>
          )}

          <div className="mt-auto p-4 border-t border-zinc-800 bg-zinc-900/50">
            <LivePreview
              frontPath={layer === "front" ? pathString : getHairPathData(selectedHair, "front")}
              backPath={layer === "back" ? pathString : getHairPathData(selectedHair, "back")}
              selectedHat={selectedHat}
            />
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <AvatarCanvas
            pathString={pathString}
            nodes={nodes}
            showGrid={showGrid}
            showNodes={showNodes}
            showHat={showHat}
            selectedHat={selectedHat}
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
            onNodeDrag={handleNodeDrag}
            onNodeDelete={handleDeleteCommand}
            onPathDrag={handlePathDrag}
            onPathSplit={handlePathSplit}
            onDragEnd={handleDragEnd}
            commands={commands}
            editMode={editMode}
          />
        </div>

        <aside
          className="relative flex h-full transition-all duration-300 border-l border-zinc-800 bg-zinc-900/40"
          style={{ width: `${breakdownWidth + (showHistory ? historyWidth : 0)}px` }}
        >
          <div
            className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-amber-500 active:bg-amber-600 transition-all z-20"
            onMouseDown={() => setIsResizingBreakdown(true)}
          />

          <div className="flex-1 flex flex-col min-w-0 border-r border-zinc-800/50">
            <PathBreakdown
              commands={commands}
              selectedNodeId={selectedNodeId}
              nodes={nodes}
              onNodeSelect={setSelectedNodeId}
              onCommandUpdate={handleCommandUpdate}
              onDeleteCommand={handleDeleteCommand}
            />
          </div>

          {showHistory && (
            <div
              className="relative flex flex-col shrink-0 overflow-hidden animate-in slide-in-from-right duration-300"
              style={{ width: `${historyWidth}px` }}
            >
              <div
                className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-amber-500 active:bg-amber-600 transition-all z-20"
                onMouseDown={() => setIsResizingHistory(true)}
              />

              <HistoryPanel
                history={history}
                currentIndex={historyIndex}
                onRevert={(index) => {
                  setHistoryIndex(index);
                  setCommands(history[index].commands);
                }}
              />
            </div>
          )}
        </aside>
      </div>

      {showProjectsPanel && (
        <ProjectsPanel
          projects={projects}
          activeProject={activeProject}
          onCreateProject={(name) => {
            createProject(name, selectedHair, selectedHat, layer, commands);
            setShowProjectsPanel(false);
          }}
          onLoadProject={(projectId) => {
            const project = projects.find((p) => p.id === projectId);
            if (project) {
              setSelectedHair(project.selectedHair);
              setSelectedHat(project.selectedHat);
              setLayer(project.layer);
              setCommands(project.commands);
              loadProject(projectId);
            }
            setShowProjectsPanel(false);
          }}
          onRenameProject={renameProject}
          onDeleteProject={deleteProject}
          onDuplicateProject={duplicateProject}
          onClose={() => setShowProjectsPanel(false)}
        />
      )}
    </div>
  );
}
