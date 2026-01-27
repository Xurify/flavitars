"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { HairIds, HairId } from "@/lib/avatar/parts/hair";
import { HatIds, HatId, SMALL_HATS } from "@/lib/avatar/parts/hats";
import { parsePath, serializePath, extractNodes, updateNodePosition, PathCommand, PathNode } from "@/lib/svg-editor/path-parser";
import { getHairPathData, hasHairVariants } from "./hair-data";
import { AvatarCanvas } from "./AvatarCanvas";
import { PathBreakdown } from "./PathBreakdown";
import { CodeExport } from "./CodeExport";
import { HistoryPanel } from "./HistoryPanel";
import { ProjectsPanel } from "./ProjectsPanel";
import { ClickableAvatarPreview } from "./ClickableAvatarPreview";
import { useProjectsPersistence } from "@/hooks/use-editor-persistence";
import { AvatarState, DEFAULT_AVATAR_STATE } from "@/lib/avatar/types";
import { SelectedPart, CATEGORY_DISPLAY_NAMES, parseAvatarStateFromParams } from "@/lib/svg-editor/part-data";

interface HistoryEntry {
  id: string;
  timestamp: number;
  commands: PathCommand[];
  label: string;
}

export function SvgPathEditor() {
  const [avatarState, setAvatarState] = useState<AvatarState>(() => {
    if (typeof window !== "undefined") {
      return parseAvatarStateFromParams(new URLSearchParams(window.location.search));
    }
    return DEFAULT_AVATAR_STATE;
  });

  const [selectedPart, setSelectedPart] = useState<SelectedPart | null>(null);
  const [previewMode, setPreviewMode] = useState<"full" | "head-only">("full");

  const [selectedHair, setSelectedHair] = useState<HairId>(() => avatarState.hair);
  const [selectedHat, setSelectedHat] = useState<HatId>(() => avatarState.hat);
  const [layer, setLayer] = useState<"front" | "back">("front");
  const [showGrid, setShowGrid] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [showHat, setShowHat] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [useHatVariant, setUseHatVariant] = useState<boolean | null>(null);
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
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [minLoadingFinished, setMinLoadingFinished] = useState(false);

  const {
    projects,
    activeProject,
    hasLoaded,
    lastSavedAt,
    wasManualSave,
    createProject,
    updateActiveProject,
    renameProject,
    deleteProject,
    loadProject,
    duplicateProject,
    saveNow,
    closeProject,
  } = useProjectsPersistence();

  const formatLabel = useCallback((id: string): string => {
    const spaced = id.replace(/([A-Z])/g, " $1").trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }, []);

  useEffect(() => {
    setAvatarState((prev) => ({
      ...prev,
      hair: selectedHair,
      hat: selectedHat,
    }));
  }, [selectedHair, selectedHat]);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingFinished(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lastSavedAt && wasManualSave) {
      setShowSavedMessage(true);
      const timer = setTimeout(() => setShowSavedMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSavedAt, wasManualSave]);

  const hasVariants = useMemo(() => hasHairVariants(selectedHair, layer), [selectedHair, layer]);

  const effectiveUseHatVariant = useMemo(() => {
    if (useHatVariant !== null) return useHatVariant;
    return selectedHat !== "none" && !SMALL_HATS.includes(selectedHat);
  }, [useHatVariant, selectedHat]);

  const rawPathData = useMemo(() => {
    // Pass a known "physical" hat ID if we want the hat variant
    const hatIdForData = effectiveUseHatVariant ? "topHat" : "none";
    return getHairPathData(selectedHair, layer, hatIdForData as HatId);
  }, [selectedHair, layer, effectiveUseHatVariant]);

  const [commands, setCommands] = useState<PathCommand[]>(() => parsePath(rawPathData).commands);

  const hasCreatedInitialProject = useRef(false);
  useEffect(() => {
    if (hasLoaded && projects.length === 0 && !hasCreatedInitialProject.current) {
      hasCreatedInitialProject.current = true;
      const defaultName = `(Draft) ${formatLabel(selectedHair)} - ${new Date().toLocaleDateString()}`;
      createProject(defaultName, selectedHair, selectedHat, layer, parsePath(rawPathData).commands);
    }
  }, [hasLoaded, projects.length, selectedHair, selectedHat, layer, rawPathData, createProject, formatLabel]);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const isDirty = useMemo(() => {
    if (!activeProject) return false;
    return JSON.stringify(commands) !== JSON.stringify(activeProject.commands);
  }, [commands, activeProject?.commands, activeProject]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        updateActiveProject(selectedHair, selectedHat, layer, commands);
        saveNow();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveNow, updateActiveProject, selectedHair, selectedHat, layer, commands]);

  useEffect(() => {
    if (activeProject && hasLoaded) {
      const urlParams = new URLSearchParams(window.location.search);
      const hasUrlHair = urlParams.has("hair");

      if (!hasUrlHair) {
        setSelectedHair(activeProject.selectedHair);
        setSelectedHat(activeProject.selectedHat);
        setLayer(activeProject.layer);
        setCommands(activeProject.commands);
      } else {
        const hairFromUrl = urlParams.get("hair") as HairId;
        const hatFromUrl = (urlParams.get("hat") as HatId) || "none";
        setSelectedHair(hairFromUrl);
        setSelectedHat(hatFromUrl);
        setLayer("front");

        const pathData = getHairPathData(hairFromUrl, "front", hatFromUrl);
        const initialCommands = parsePath(pathData).commands;
        setCommands(initialCommands);
      }

      const initialEntry: HistoryEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        commands: hasUrlHair
          ? parsePath(getHairPathData(urlParams.get("hair") as HairId, "front", (urlParams.get("hat") as HatId) || "none"))
              .commands
          : activeProject.commands,
        label: hasUrlHair ? `Initial ${urlParams.get("hair")} (front)` : `Loaded ${activeProject.name}`,
      };
      setHistory([initialEntry]);
      setHistoryIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject?.id, hasLoaded]);

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

  const pushToHistory = (newCommands: PathCommand[], label: string) => {
    const newEntry: HistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      commands: newCommands,
      label,
    };

    const newHistory = [...history.slice(0, historyIndex + 1), newEntry];
    if (newHistory.length > 50) newHistory.shift();

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCommands(newCommands);
  };

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        undo();
      } else if ((event.ctrlKey || event.metaKey) && (event.key === "y" || (event.shiftKey && event.key === "Z"))) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history, redo, undo]);

  const nodes = useMemo(() => extractNodes(commands), [commands]);

  const pathString = useMemo(() => serializePath(commands), [commands]);

  const handleNodeDrag = (node: PathNode, newX: number, newY: number) => {
    const updated = updateNodePosition(commands, node, Math.round(newX), Math.round(newY));
    setCommands(updated);
  };

  const handlePathDrag = (deltaX: number, deltaY: number) => {
    const updated = commands.map((cmd) => {
      const type = cmd.type;
      const upperType = type.toUpperCase();
      const isRelative = type === type.toLowerCase() && type !== "Z" && type !== "z";

      // Re-map params based on coordinate type
      const newParams = [...cmd.params];

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

      return { ...cmd, params: newParams };
    });
    setCommands(updated);
  };

  const handleDragEnd = () => {
    const label = editMode === "drag" ? "Re-position Path" : "Drag Node";
    pushToHistory(commands, label);
  };

  const handleCommandUpdate = (index: number, params: number[]) => {
    const updated = [...commands];
    updated[index] = { ...updated[index], params };
    pushToHistory(updated, `Update Command ${commands[index].type}`);
  };

  const handleDeleteCommand = (index: number) => {
    if (commands.length <= 1) return;
    const deletedType = commands[index].type;
    const updated = commands.filter((_, idx) => idx !== index);
    pushToHistory(updated, `Delete ${deletedType} Segment`);
  };

  const handlePathSplit = (newCommands: PathCommand[]) => {
    pushToHistory(newCommands, "Split Path");
  };

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      if (isResizingBreakdown) {
        const newWidth = window.innerWidth - event.clientX - (showHistory ? historyWidth : 0);
        if (newWidth >= 280 && newWidth <= 800) {
          setBreakdownWidth(newWidth);
        }
      } else if (isResizingHistory) {
        const newWidth = window.innerWidth - event.clientX;
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
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg group">
              <div
                className={`w-2 h-2 rounded-full transition-all ${isDirty ? "bg-amber-500 animate-pulse scale-110 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-zinc-600"}`}
              />
              <span className={`text-xs font-medium transition-colors ${isDirty ? "text-zinc-100" : "text-zinc-400"}`}>
                {activeProject.name}
                {isDirty ? "*" : ""}
              </span>
            </div>
          )}
          {showSavedMessage && lastSavedAt && <span className="text-xs text-emerald-500 animate-in fade-in">Saved</span>}
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

          <button
            onClick={() => {
              updateActiveProject(selectedHair, selectedHat, layer, commands);
              saveNow();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
              isDirty
                ? "bg-amber-500 hover:bg-amber-400 text-zinc-900 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-zinc-700 grayscale-[0.5]"
            }`}
            title={isDirty ? "Save Unsaved Changes (Ctrl+S)" : "All Changes Saved"}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            {isDirty ? "Save" : "Saved"}
          </button>

          <div className="flex items-center gap-3 border-l border-zinc-800 pl-6">
            <CodeExport
              pathString={pathString}
              hairId={selectedHair}
              layer={layer}
              hatId={effectiveUseHatVariant ? "topHat" : "none"}
            />
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

      {!hasLoaded || !minLoadingFinished ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 backdrop-blur-sm animate-in fade-in duration-700">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center p-3 shadow-2xl border border-zinc-800 relative z-10">
                <Image src="/images/icons/drew.png" alt="Loading" width={40} height={40} className="rounded-lg opacity-80" />
              </div>

              <div className="absolute -inset-4 bg-amber-500/5 rounded-full blur-2xl animate-pulse" />
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-zinc-300 font-semibold text-base tracking-wide animate-pulse">Initializing Workspace</h2>
              <div className="flex gap-1 justify-center mt-4">
                <div className="w-1 h-1 rounded-full bg-amber-500/30 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1 h-1 rounded-full bg-amber-500/40 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1 h-1 rounded-full bg-amber-500/50 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-72 border-r border-zinc-800 bg-zinc-900/40 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
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
                onChange={(event) => setSelectedHair(event.target.value as HairId)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {HairIds.map((id) => (
                  <option key={id} value={id}>
                    {formatLabel(id)}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 border-b border-zinc-800">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Hat Overlay</label>
              <select
                value={selectedHat}
                onChange={(event) => {
                  setSelectedHat(event.target.value as HatId);
                  // Reset variant override when hat changes to follow hat logic again
                  setUseHatVariant(null);
                }}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {HatIds.map((id) => (
                  <option key={id} value={id}>
                    {id === "none" ? "No Hat" : formatLabel(id)}
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
                    onChange={(event) => setShowGrid(event.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                  />
                  <span className="text-sm">Show Grid</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNodes}
                    onChange={(event) => setShowNodes(event.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                  />
                  <span className="text-sm">Show Nodes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHat}
                    onChange={(event) => setShowHat(event.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                  />
                  <span className="text-sm">Show Hat</span>
                </label>
                {hasVariants && (
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={effectiveUseHatVariant}
                      onChange={(event) => setUseHatVariant(event.target.checked)}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm group-hover:text-zinc-100 transition-colors">Tucked Hair</span>
                    </div>
                  </label>
                )}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showPreview}
                    onChange={(event) => setShowPreview(event.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/50"
                  />
                  <span className="text-sm group-hover:text-zinc-100 transition-colors">Show Mini Preview</span>
                </label>
              </div>
            </div>

            {selectedNodeId && (
              <div className="p-4 border-b border-zinc-800 bg-amber-500/5 transition-all animate-in fade-in slide-in-from-left-2">
                <label className="block text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Selected Node</label>
                <p className="text-sm font-mono text-zinc-200">{nodes.find((n) => n.id === selectedNodeId)?.label}</p>
              </div>
            )}

            {showPreview && (
              <div className="mt-auto p-4 border-t border-zinc-800 bg-zinc-900/50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">Preview</label>
                  <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                    <button
                      onClick={() => setPreviewMode("full")}
                      className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                        previewMode === "full" ? "bg-amber-500 text-zinc-900" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Full
                    </button>
                    <button
                      onClick={() => setPreviewMode("head-only")}
                      className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                        previewMode === "head-only" ? "bg-amber-500 text-zinc-900" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Head
                    </button>
                  </div>
                </div>

                <ClickableAvatarPreview
                  state={avatarState}
                  selectedPart={selectedPart}
                  onPartSelect={(part) => {
                    setSelectedPart(part);
                    if (part.category === "hair") {
                      setSelectedHair(avatarState.hair);
                      setLayer(part.layer || "front");
                    }
                  }}
                  size="preview"
                  previewMode={previewMode}
                  showBackground={true}
                  showHoverEffects={true}
                  pathOverride={{
                    path: pathString,
                    layer: layer,
                  }}
                />

                {selectedPart && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-amber-400">
                        {CATEGORY_DISPLAY_NAMES[selectedPart.category]}
                        {selectedPart.layer && ` (${selectedPart.layer})`}
                      </span>
                      <button
                        onClick={() => setSelectedPart(null)}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">{selectedPart.id}</span>
                  </div>
                )}
              </div>
            )}
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
      )}

      {showProjectsPanel && (
        <ProjectsPanel
          projects={projects}
          activeProject={activeProject}
          defaultName={`${formatLabel(selectedHair)} - ${new Date().toLocaleDateString()}`}
          onCreateProject={(name) => {
            createProject(name, selectedHair, selectedHat, layer, commands);
            setShowProjectsPanel(false);
          }}
          onLoadProject={(projectId) => {
            if (isDirty && !window.confirm("You have unsaved changes that will be lost. Continue?")) {
              return;
            }
            const project = projects.find((project) => project.id === projectId);
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
          onCloseProject={() => {
            if (isDirty && !window.confirm("You have unsaved changes that will be lost. Continue?")) {
              return;
            }
            closeProject();
            // Reset state to current hair's default
            const pathData = getHairPathData(selectedHair, layer);
            const initialCommands = parsePath(pathData).commands;
            setCommands(initialCommands);

            const initialEntry: HistoryEntry = {
              id: Math.random().toString(36).substr(2, 9),
              timestamp: Date.now(),
              commands: initialCommands,
              label: `New Draft: ${selectedHair} (${layer})`,
            };
            setHistory([initialEntry]);
            setHistoryIndex(0);
            setShowProjectsPanel(false);
          }}
          onClose={() => setShowProjectsPanel(false)}
        />
      )}
    </div>
  );
}
