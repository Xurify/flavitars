"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  GridIcon,
  HistoryIcon,
  FolderIcon,
  SaveIcon,
  RotateCcwIcon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
  MousePointerIcon,
  MoveIcon,
  PenToolIcon,
  LayersIcon,
  KeyboardIcon,
  CopyPlusIcon,
  HandIcon,
  SquareDashedMousePointerIcon,
  EyeIcon,
} from "lucide-react";
import { HairIds, HairId } from "@/lib/avatar/parts/hair-ids";
import { HatIds, HatId } from "@/lib/avatar/parts/hats";
import {
  parsePath,
  serializePath,
  commandsEqual,
  extractNodes,
  PathCommand,
} from "@/lib/svg-editor/path-parser";
import {
  getHairPathData,
  hasHairVariants,
  hasHairHighlight,
  getHairHighlightPath,
} from "@/lib/avatar/parts/hair-paths";
import { AvatarCanvas } from "./AvatarCanvas";
import { PathBreakdown } from "./PathBreakdown";
import { CodeExport } from "./CodeExport";
import { HistoryPanel } from "./HistoryPanel";
import { ProjectsPanel } from "./ProjectsPanel";
import { ClickableAvatarPreview } from "./ClickableAvatarPreview";
import { GhostLayerSettings, DEFAULT_GHOST_SETTINGS } from "./GhostLayers";
import { useProjectsPersistence } from "@/hooks/use-editor-persistence";
import { AvatarState, DEFAULT_AVATAR_STATE, HAIR_COLORS } from "@/lib/avatar/types";
import {
  SelectedPart,
  parseAvatarStateFromParams,
} from "@/lib/svg-editor/part-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/strings";

const MAX_HISTORY = 100;

interface HistoryEntry {
  id: string;
  timestamp: number;
  commands: PathCommand[];
  label: string;
}

export function SvgPathEditor(): React.JSX.Element {
  const searchParams = useSearchParams();

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
  const [layer, setLayer] = useState<"front" | "back" | "highlight">("front");
  const [useHatVariant, setUseHatVariant] = useState<boolean | null>(null);

  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());
  const [copiedPath, setCopiedPath] = useState(false);
  const [editMode, setEditMode] = useState<"select" | "marquee" | "pen" | "move" | "pan">("select");

  const [ghostSettings, setGhostSettings] = useState<GhostLayerSettings>(DEFAULT_GHOST_SETTINGS);
  const [showGhostControls, setShowGhostControls] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  const [showPreview, setShowPreview] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [breakdownWidth, setBreakdownWidth] = useState(380);
  const [historyWidth, setHistoryWidth] = useState(240);
  const containerReference = useRef<HTMLDivElement>(null);
  const [isResizingBreakdown, setIsResizingBreakdown] = useState(false);
  const [isResizingHistory, setIsResizingHistory] = useState(false);

  const [showProjectsPanel, setShowProjectsPanel] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [minLoadingFinished, setMinLoadingFinished] = useState(false);
  const [layerCommands, setLayerCommands] = useState<Record<string, PathCommand[]>>({});

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

  const formatLabel = useCallback((identifier: string): string => {
    const spaced = identifier.replace(/([A-Z])/g, " $1").trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }, []);

  useEffect(() => {
    setAvatarState((previousState) => ({
      ...previousState,
      hair: selectedHair,
      hat: selectedHat,
    }));
  }, [selectedHair, selectedHat]);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingFinished(true), 800);
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
  const hasHighlight = useMemo(() => hasHairHighlight(selectedHair), [selectedHair]);
  const effectiveUseHatVariant = useHatVariant ?? (selectedHat !== "none" && hasVariants);

  const rawPathData = useMemo(() => {
    if (layer === "highlight") {
      return getHairHighlightPath(selectedHair);
    }
    return getHairPathData(selectedHair, layer, effectiveUseHatVariant ? "topHat" : "none");
  }, [selectedHair, layer, effectiveUseHatVariant]);

  const [commands, setCommands] = useState<PathCommand[]>([]);
  const initialCommandsLoadedRef = useRef(false);

  const [{ history, index: historyIndex }, setHistoryState] = useState<{
    history: HistoryEntry[];
    index: number;
  }>({
    history: [],
    index: 0,
  });

  const historyRef = useRef(history);
  const historyIndexRef = useRef(historyIndex);
  const commandsRef = useRef(commands);

  useEffect(() => {
    commandsRef.current = commands;
  }, [commands]);

  const pushToHistory = useCallback((newCommands: PathCommand[], label: string): void => {
    const currentCommands = commandsRef.current;
    if (commandsEqual(newCommands, currentCommands) && historyRef.current.length > 0) {
      return;
    }

    setCommands(newCommands);

    const newEntry: HistoryEntry = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: Date.now(),
      commands: newCommands,
      label,
    };

    const currentHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    const updatedHistory = [...currentHistory, newEntry].slice(-MAX_HISTORY);

    const newIndex = updatedHistory.length - 1;
    historyRef.current = updatedHistory;
    historyIndexRef.current = newIndex;

    setHistoryState({
      history: updatedHistory,
      index: newIndex,
    });
  }, []);

  const previousContextKey = useRef("");

  useEffect(() => {
    const currentContextKey = `${selectedHair}-${selectedHat}-${layer}-${effectiveUseHatVariant}`;

    if (activeProject && !initialCommandsLoadedRef.current) {
      initialCommandsLoadedRef.current = true;
      previousContextKey.current = currentContextKey;
      setCommands(activeProject.commands);

      const initialEntry: HistoryEntry = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: Date.now(),
        commands: activeProject.commands,
        label: `Loaded: ${activeProject.name}`,
      };
      setHistoryState({ history: [initialEntry], index: 0 });
      return;
    }

    if (previousContextKey.current === currentContextKey && initialCommandsLoadedRef.current) {
      return;
    }

    previousContextKey.current = currentContextKey;

    const layerKey = `${layer}-${effectiveUseHatVariant}`;
    if (layerCommands[layerKey]) {
      const savedCommands = layerCommands[layerKey];
      setCommands(savedCommands);
      const initialEntry: HistoryEntry = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: Date.now(),
        commands: savedCommands,
        label: `Switched to ${layer}`,
      };
      setHistoryState({ history: [initialEntry], index: 0 });
      return;
    }

    const parsed = parsePath(rawPathData);
    setCommands(parsed.commands);

    const initialEntry: HistoryEntry = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: Date.now(),
      commands: parsed.commands,
      label: `Initial ${selectedHair} (${layer})`,
    };
    setHistoryState({ history: [initialEntry], index: 0 });
  }, [selectedHair, selectedHat, layer, rawPathData, effectiveUseHatVariant, activeProject, layerCommands]);

  const nodes = useMemo(() => extractNodes(commands), [commands]);
  const pathString = useMemo(() => serializePath(commands), [commands]);

  const isDirty = useMemo(() => {
    if (!activeProject) return false;
    return JSON.stringify(commands) !== JSON.stringify(activeProject.commands);
  }, [commands, activeProject]);

  const showDirty = hasLoaded && isDirty;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        updateActiveProject(selectedHair, selectedHat, layer, commands);
        saveNow();
        return;
      }

      if (event.key === "v" || event.key === "V") {
        setEditMode("select");
      } else if (event.key === "m" || event.key === "M") {
        setEditMode("marquee");
      } else if (event.key === "p" || event.key === "P") {
        setEditMode("pen");
      } else if (event.key === "g" || event.key === "G") {
        setEditMode("move");
      } else if (event.key === "h" || event.key === "H") {
        setEditMode("pan");
      } else if (event.key === "?") {
        setShowShortcutsModal(true);
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        if (historyIndexRef.current > 0) {
          const newIndex = historyIndexRef.current - 1;
          historyIndexRef.current = newIndex;
          setHistoryState((previous) => ({ ...previous, index: newIndex }));
          setCommands(historyRef.current[newIndex].commands);
        }
        return;
      }

      if (
        ((event.ctrlKey || event.metaKey) && event.key === "y") ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "z")
      ) {
        event.preventDefault();
        if (historyIndexRef.current < historyRef.current.length - 1) {
          const newIndex = historyIndexRef.current + 1;
          historyIndexRef.current = newIndex;
          setHistoryState((previous) => ({ ...previous, index: newIndex }));
          setCommands(historyRef.current[newIndex].commands);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commands, layer, saveNow, selectedHair, selectedHat, updateActiveProject]);

  const mainEditorUrl = useMemo(() => {
    const parameters = new URLSearchParams(searchParams?.toString() ?? "");
    parameters.set("hair", selectedHair);
    parameters.set("hat", selectedHat);
    return `/?${parameters.toString()}`;
  }, [searchParams, selectedHair, selectedHat]);

  const handleNodeDrag = useCallback((updatedCommands: PathCommand[]): void => {
    setCommands(updatedCommands);
  }, []);

  const handleDragEnd = useCallback((): void => {
    const label = editMode === "move" ? "Move Path" : "Move Nodes";
    pushToHistory(commandsRef.current, label);
  }, [editMode, pushToHistory]);

  const handleCommandUpdate = (index: number, parameters: number[]): void => {
    const updated = [...commands];
    updated[index] = { ...updated[index], params: parameters };
    pushToHistory(updated, `Update ${commands[index].type}`);
  };

  const handleDeleteCommands = (commandIndices: number[]): void => {
    if (commands.length <= commandIndices.length) return;
    const indicesSet = new Set(commandIndices);
    const updated = commands.filter((_, index) => !indicesSet.has(index));
    pushToHistory(updated, `Delete ${commandIndices.length} Segment(s)`);
  };

  const handlePathSplit = (newCommands: PathCommand[]): void => {
    pushToHistory(newCommands, "Insert Node on Curve");
  };

  const handleLayerSwitch = (newLayer: "front" | "back" | "highlight"): void => {
    const currentKey = `${layer}-${effectiveUseHatVariant}`;
    setLayerCommands((previous) => ({ ...previous, [currentKey]: commands }));
    setLayer(newLayer);
    setSelectedNodeIds(new Set());
  };

  const handleCopyVariantToOther = (): void => {
    const targetVariant = !effectiveUseHatVariant;
    const targetKey = `${layer}-${targetVariant}`;
    setLayerCommands((previous) => ({ ...previous, [targetKey]: commands }));
    setUseHatVariant(targetVariant);
    pushToHistory(commands, `Copied to ${targetVariant ? "Tucked" : "Default"} Variant`);
  };

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent): void => {
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

    const handleWindowMouseUp = (): void => {
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
      ref={containerReference}
      className={cn(
        "h-full flex flex-col bg-zinc-950 text-zinc-300 overflow-hidden font-sans select-none",
        (isResizingBreakdown || isResizingHistory) && "cursor-col-resize select-none"
      )}
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-zinc-800/80 bg-zinc-900/80 backdrop-blur-md shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden relative ring-1 ring-zinc-700 group-hover:ring-primary transition-all shrink-0">
              <Image src="/images/icons/drew.png" alt="Flavitars" fill className="object-cover" priority />
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-100 font-heading">
              Flavitars
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/20 text-primary border border-primary/40">
              Vector Lab
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-zinc-800">
            <Link
              href={mainEditorUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/60 transition-colors"
            >
              <ExternalLinkIcon className="w-3.5 h-3.5 text-primary" />
              <span>Studio</span>
            </Link>

            {activeProject && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/70 border border-zinc-700/60 rounded-xl">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isDirty ? "bg-primary animate-pulse" : "bg-emerald-500"
                  )}
                />
                <span className="text-xs font-medium text-zinc-200">
                  {activeProject.name}
                  {isDirty ? " *" : ""}
                </span>
              </div>
            )}

            {showSavedMessage && lastSavedAt && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckIcon className="w-3.5 h-3.5" />
                Saved
              </span>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick HUD Toggles */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-950/80 p-1 rounded-xl border border-zinc-800 shadow-inner">
            <button
              type="button"
              onClick={() => setShowGhostControls(!showGhostControls)}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1",
                showGhostControls ? "bg-primary/20 text-primary" : "text-zinc-400 hover:text-zinc-200"
              )}
              title="Ghost Reference Layers"
            >
              <LayersIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setGhostSettings((previous) => ({ ...previous, showGrid: !previous.showGrid }))
              }
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors",
                ghostSettings.showGrid ? "bg-primary/20 text-primary" : "text-zinc-400 hover:text-zinc-200"
              )}
              title="Toggle Grid"
            >
              <GridIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors",
                showPreview ? "bg-primary/20 text-primary" : "text-zinc-400 hover:text-zinc-200"
              )}
              title="Toggle Live Preview"
            >
              <EyeIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowShortcutsModal(true)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              title="Keyboard Shortcuts (?)"
            >
              <KeyboardIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors",
                showHistory ? "bg-primary/20 text-primary" : "text-zinc-400 hover:text-zinc-200"
              )}
              title="Toggle History Timeline"
            >
              <HistoryIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowProjectsPanel(true)}
            className="flex items-center h-8 sm:h-9 shrink-0 gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs sm:text-sm font-medium transition-colors border border-zinc-700"
            title="Manage Projects"
          >
            <FolderIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Projects</span>
          </button>

          <button
            type="button"
            onClick={() => {
              updateActiveProject(selectedHair, selectedHat, layer, commands);
              saveNow();
            }}
            className={cn(
              "flex items-center justify-center h-8 sm:h-9 shrink-0 gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border",
              showDirty
                ? "bg-primary hover:bg-primary/90 text-white border-primary/40 shadow-xs"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-zinc-700"
            )}
            title={showDirty ? "Save Changes (Ctrl+S)" : "All Saved"}
          >
            <SaveIcon className="w-3.5 h-3.5" />
            <span>{showDirty ? "Save" : "Saved"}</span>
          </button>

          <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-2 sm:pl-3">
            <CodeExport
              pathString={pathString}
              originalPathString={rawPathData}
              hairId={selectedHair}
              layer={layer}
              hatId={effectiveUseHatVariant ? "topHat" : "none"}
            />

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(pathString);
                setCopiedPath(true);
                setTimeout(() => setCopiedPath(false), 2000);
              }}
              className={cn(
                "hidden sm:flex items-center justify-center h-8 sm:h-9 shrink-0 gap-1.5 w-22 rounded-xl text-xs sm:text-sm font-medium transition-all border",
                copiedPath
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
              )}
            >
              {copiedPath ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                const resetCommands = parsePath(rawPathData).commands;
                pushToHistory(resetCommands, "Reset Path");
                setSelectedNodeIds(new Set());
              }}
              className="flex items-center h-8 sm:h-9 shrink-0 p-2 sm:px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs sm:text-sm font-medium transition-colors border border-zinc-700"
              title="Reset Path to Preset"
            >
              <RotateCcwIcon className="w-3.5 h-3.5" />
              <span className="hidden lg:inline ml-1">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      {!hasLoaded || !minLoadingFinished ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 animate-in fade-in duration-500">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center p-3 shadow-2xl border border-zinc-800 relative z-10">
                <Image
                  src="/images/icons/drew.png"
                  alt="Loading"
                  width={36}
                  height={36}
                  className="rounded-lg opacity-80"
                />
              </div>
              <div className="absolute -inset-3 bg-primary/10 rounded-full blur-xl animate-pulse" />
            </div>

            <h2 className="text-zinc-200 font-semibold text-sm tracking-wide">
              Initializing Vector Workspace
            </h2>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Controls & Properties Deck */}
          <aside className="w-64 sm:w-72 border-r border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xs flex flex-col min-h-0 overflow-y-auto scrollbar-refined shrink-0">
            {/* Vector Tool Picker */}
            <div className="p-3 border-b border-zinc-800/80 shrink-0">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Vector Tools
              </label>
              <div className="grid grid-cols-5 gap-1 bg-zinc-950/80 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditMode("select")}
                  className={cn(
                    "flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-semibold transition-all",
                    editMode === "select"
                      ? "bg-primary text-white shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                  title="Direct Node Select (V)"
                >
                  <MousePointerIcon className="w-3.5 h-3.5 mb-0.5" />
                  <span>Node</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode("marquee")}
                  className={cn(
                    "flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-semibold transition-all",
                    editMode === "marquee"
                      ? "bg-primary text-white shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                  title="Marquee Box Select (M)"
                >
                  <SquareDashedMousePointerIcon className="w-3.5 h-3.5 mb-0.5" />
                  <span>Box</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode("pen")}
                  className={cn(
                    "flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-semibold transition-all",
                    editMode === "pen"
                      ? "bg-primary text-white shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                  title="Pen / Insert Node on Curve (P)"
                >
                  <PenToolIcon className="w-3.5 h-3.5 mb-0.5" />
                  <span>Pen</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode("move")}
                  className={cn(
                    "flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-semibold transition-all",
                    editMode === "move"
                      ? "bg-primary text-white shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                  title="Move Whole Path (G)"
                >
                  <MoveIcon className="w-3.5 h-3.5 mb-0.5" />
                  <span>Move</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode("pan")}
                  className={cn(
                    "flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-semibold transition-all",
                    editMode === "pan"
                      ? "bg-primary text-white shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                  title="Pan Canvas (H or Space+Drag)"
                >
                  <HandIcon className="w-3.5 h-3.5 mb-0.5" />
                  <span>Pan</span>
                </button>
              </div>
            </div>

            {/* Part & Layer Selection */}
            <div className="p-3 border-b border-zinc-800/80 space-y-2.5 shrink-0">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Active Hair Part
              </label>

              <div>
                <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
                  Hairstyle
                </label>
                <select
                  value={selectedHair}
                  onChange={(event) => {
                    setSelectedHair(event.target.value as HairId);
                    setSelectedNodeIds(new Set());
                  }}
                  className="w-full px-3 py-1.5 bg-zinc-800/90 border border-zinc-700/80 rounded-xl text-xs text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {HairIds.map((identifier) => (
                    <option key={identifier} value={identifier}>
                      {formatLabel(identifier)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
                  Active Layer
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleLayerSwitch("front")}
                    className={cn(
                      "flex-1 px-2 py-1.5 rounded-xl text-xs font-semibold transition-colors",
                      layer === "front"
                        ? "bg-primary text-white shadow-xs"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    )}
                  >
                    Front
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLayerSwitch("back")}
                    className={cn(
                      "flex-1 px-2 py-1.5 rounded-xl text-xs font-semibold transition-colors",
                      layer === "back"
                        ? "bg-primary text-white shadow-xs"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    )}
                  >
                    Back
                  </button>
                  {hasHighlight && (
                    <button
                      type="button"
                      onClick={() => handleLayerSwitch("highlight")}
                      className={cn(
                        "flex-1 px-2 py-1.5 rounded-xl text-xs font-semibold transition-colors",
                        layer === "highlight"
                          ? "bg-amber-400 text-zinc-950 shadow-xs"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      )}
                    >
                      Highlight
                    </button>
                  )}
                </div>
              </div>

              {/* Hair Color Palette */}
              <div>
                <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
                  Preview Hair Color
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {HAIR_COLORS.slice(0, 10).map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() =>
                        setAvatarState((previous) => ({
                          ...previous,
                          hairColor: color.id,
                        }))
                      }
                      className={cn(
                        "w-5 h-5 rounded-full border transition-all",
                        avatarState.hairColor === color.id
                          ? "border-white scale-110 shadow-sm ring-2 ring-primary"
                          : "border-zinc-700/80 hover:scale-105"
                      )}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Hat & Variant Controls */}
              <div className="pt-2 border-t border-zinc-800/60 space-y-2">
                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
                    Hat Interaction
                  </label>
                  <select
                    value={selectedHat}
                    onChange={(event) => {
                      setSelectedHat(event.target.value as HatId);
                      setUseHatVariant(null);
                    }}
                    className="w-full px-3 py-1.5 bg-zinc-800/90 border border-zinc-700/80 rounded-xl text-xs text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {HatIds.map((identifier) => (
                      <option key={identifier} value={identifier}>
                        {identifier === "none" ? "No Hat (Standard)" : formatLabel(identifier)}
                      </option>
                    ))}
                  </select>
                </div>

                {hasVariants && (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-zinc-950/60 border border-zinc-800">
                    <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={effectiveUseHatVariant}
                        onChange={(event) => setUseHatVariant(event.target.checked)}
                        className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-primary"
                      />
                      <span className="text-xs">Tucked Variant</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleCopyVariantToOther}
                      className="text-[10px] text-primary hover:text-primary/80 flex items-center gap-1 font-semibold"
                      title="Copy current path to other variant"
                    >
                      <CopyPlusIcon className="w-3 h-3" />
                      <span>Sync</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Ghost Reference Layers Panel */}
            <div className="p-3 border-b border-zinc-800/80 space-y-2.5 shrink-0">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <LayersIcon className="w-3 h-3 text-primary" />
                  <span>Ghost Reference</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowGhostControls(!showGhostControls)}
                  className="text-[10px] text-primary hover:underline font-semibold"
                >
                  {showGhostControls ? "Hide Controls" : "Adjust Opacity"}
                </button>
              </div>

              {showGhostControls ? (
                <div className="space-y-2 text-xs bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>Head Silhouette</span>
                      <span>{Math.round(ghostSettings.headOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={ghostSettings.showHead ? ghostSettings.headOpacity : 0}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({
                          ...previous,
                          showHead: Number(event.target.value) > 0,
                          headOpacity: Number(event.target.value),
                        }))
                      }
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>Opposite Hair Layer</span>
                      <span>{Math.round(ghostSettings.oppositeHairOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={ghostSettings.showOppositeHair ? ghostSettings.oppositeHairOpacity : 0}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({
                          ...previous,
                          showOppositeHair: Number(event.target.value) > 0,
                          oppositeHairOpacity: Number(event.target.value),
                        }))
                      }
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>Hat Outline</span>
                      <span>{Math.round(ghostSettings.hatOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={ghostSettings.showHat ? ghostSettings.hatOpacity : 0}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({
                          ...previous,
                          showHat: Number(event.target.value) > 0,
                          hatOpacity: Number(event.target.value),
                        }))
                      }
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={ghostSettings.showHead}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({ ...previous, showHead: event.target.checked }))
                      }
                      className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-primary"
                    />
                    <span>Head Silhouette</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={ghostSettings.showOppositeHair}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({
                          ...previous,
                          showOppositeHair: event.target.checked,
                        }))
                      }
                      className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-primary"
                    />
                    <span>Opposite Hair</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={ghostSettings.showCenterLine}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({
                          ...previous,
                          showCenterLine: event.target.checked,
                        }))
                      }
                      className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-primary"
                    />
                    <span>Center Axis (50)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={ghostSettings.showHat}
                      onChange={(event) =>
                        setGhostSettings((previous) => ({ ...previous, showHat: event.target.checked }))
                      }
                      className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-primary"
                    />
                    <span>Hat Preview</span>
                  </label>
                </div>
              )}

              {/* Snapping Control */}
              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Grid Snap
                </span>
                <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-800 gap-0.5">
                  {[0, 1, 2, 5].map((step) => (
                    <button
                      key={`snap-${step}`}
                      type="button"
                      onClick={() =>
                        setGhostSettings((previous) => ({ ...previous, snapStep: step }))
                      }
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-semibold transition-colors",
                        ghostSettings.snapStep === step
                          ? "bg-primary text-white"
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      {step === 0 ? "Off" : `${step}px`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Avatar Live Preview */}
            {showPreview && (
              <div className="mt-auto p-3 border-t border-zinc-800/80 bg-zinc-950/40 flex flex-col gap-2 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Avatar Preview
                  </span>
                  <div className="flex bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("full")}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-semibold transition-colors",
                        previewMode === "full"
                          ? "bg-primary text-white"
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      Full
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("head-only")}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-semibold transition-colors",
                        previewMode === "head-only"
                          ? "bg-primary text-white"
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      Head
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-zinc-700/80 bg-zinc-800/40 p-2 flex items-center justify-center shadow-md">
                  <ClickableAvatarPreview
                    state={avatarState}
                    selectedPart={selectedPart}
                    onPartSelect={(part) => {
                      setSelectedPart(part);
                      if (part.category === "hair") {
                        setSelectedHair(avatarState.hair);
                        handleLayerSwitch(part.layer || "front");
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
                </div>
              </div>
            )}
          </aside>

          {/* Central Vector Canvas */}
          <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">
            <AvatarCanvas
              pathString={pathString}
              nodes={nodes}
              commands={commands}
              avatarState={avatarState}
              selectedNodeIds={selectedNodeIds}
              onNodeSelect={setSelectedNodeIds}
              onNodeDrag={handleNodeDrag}
              onNodeDelete={handleDeleteCommands}
              onPathSplit={handlePathSplit}
              onDragEnd={handleDragEnd}
              editMode={editMode}
              currentLayer={layer}
              ghostSettings={ghostSettings}
              useHatVariant={effectiveUseHatVariant}
            />
          </div>

          {/* Right Resizable Panels: Path Breakdown & History Timeline */}
          <aside
            className="relative flex h-full transition-all duration-150 border-l border-zinc-800/80 bg-zinc-900/40 shrink-0 min-h-0"
            style={{ width: `${breakdownWidth + (showHistory ? historyWidth : 0)}px` }}
          >
            {/* Drag Resize Handle for Breakdown */}
            <div
              className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-primary active:bg-primary transition-all z-20"
              onMouseDown={() => setIsResizingBreakdown(true)}
            />

            {/* Path Breakdown Deck */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-zinc-800/60 min-h-0">
              <PathBreakdown
                commands={commands}
                selectedNodeIds={selectedNodeIds}
                nodes={nodes}
                onNodeSelect={setSelectedNodeIds}
                onCommandUpdate={handleCommandUpdate}
                onDeleteCommand={(commandIndex) => handleDeleteCommands([commandIndex])}
                onCommandsReplace={(newCommands, label) => pushToHistory(newCommands, label)}
              />
            </div>

            {/* History Timeline Panel */}
            {showHistory && (
              <div
                className="relative flex flex-col shrink-0 overflow-hidden animate-in slide-in-from-right duration-200 min-h-0"
                style={{ width: `${historyWidth}px` }}
              >
                <div
                  className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-primary active:bg-primary transition-all z-20"
                  onMouseDown={() => setIsResizingHistory(true)}
                />

                <HistoryPanel
                  history={history}
                  currentIndex={historyIndex}
                  onRevert={(index) => {
                    historyIndexRef.current = index;
                    setHistoryState((previous) => ({ ...previous, index }));
                    setCommands(history[index].commands);
                  }}
                />
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Projects Modal */}
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
            const project = projects.find((item) => item.id === projectId);
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
            setLayerCommands({});
            const pathData = getHairPathData(selectedHair, layer, "none");
            const initialCommands = parsePath(pathData).commands;
            setCommands(initialCommands);

            const initialEntry: HistoryEntry = {
              id: Math.random().toString(36).substring(2, 11),
              timestamp: Date.now(),
              commands: initialCommands,
              label: `New Draft: ${selectedHair} (${layer})`,
            };
            setHistoryState({ history: [initialEntry], index: 0 });
            setShowProjectsPanel(false);
          }}
          onClose={() => setShowProjectsPanel(false)}
        />
      )}

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showShortcutsModal} onOpenChange={setShowShortcutsModal}>
        <DialogContent className="max-w-md bg-zinc-900 border-zinc-800 text-zinc-100 p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2 text-zinc-100 uppercase tracking-wider">
              <KeyboardIcon className="w-4 h-4 text-primary" />
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-xs mt-3">
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Direct Node Tool</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">V</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Marquee Box Select</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">M</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Pen / Split Curve Tool</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">P</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Move Entire Path</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">G</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Pan Canvas</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Space + Drag / H</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Nudge Selected Node(s)</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Arrow Keys (1px)</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Fast Nudge</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Shift + Arrow (5px)</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Select All Nodes</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Ctrl + A</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Delete Selected Node(s)</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Delete / Backspace</kbd>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800">
              <span className="text-zinc-400">Undo / Redo</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Ctrl + Z / Ctrl + Y</kbd>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Save Project</span>
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[11px]">Ctrl + S</kbd>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
