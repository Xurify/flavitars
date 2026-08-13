"use client";

import React, { useState } from "react";
import {
  FolderIcon,
  XIcon,
  PencilIcon,
  CopyIcon,
  Trash2Icon,
  UploadIcon,
  SparklesIcon,
} from "lucide-react";
import { Project } from "@/hooks/use-editor-persistence";
import { cn } from "@/lib/utils/strings";

interface ProjectsPanelProperties {
  projects: Project[];
  activeProject: Project | null;
  defaultName?: string;
  onCreateProject: (name: string) => void;
  onLoadProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newName: string) => void;
  onDeleteProject: (projectId: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onCloseProject: () => void;
  onClose: () => void;
}

export function ProjectsPanel({
  projects,
  activeProject,
  defaultName = "",
  onCreateProject,
  onLoadProject,
  onRenameProject,
  onDeleteProject,
  onDuplicateProject,
  onCloseProject,
  onClose,
}: ProjectsPanelProperties): React.JSX.Element {
  const [newProjectName, setNewProjectName] = useState(defaultName);
  const [editingIdentifier, setEditingIdentifier] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleCreate = (): void => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName("");
    }
  };

  const handleNewDraft = (): void => {
    onCloseProject();
    onClose();
  };

  const handleStartRename = (project: Project): void => {
    setEditingIdentifier(project.id);
    setEditingName(project.name);
  };

  const handleConfirmRename = (): void => {
    if (editingIdentifier && editingName.trim()) {
      onRenameProject(editingIdentifier, editingName.trim());
    }
    setEditingIdentifier(null);
    setEditingName("");
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <FolderIcon className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Projects Manager
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Create / Active Project Section */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950/60 shrink-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Create or Save Session
              </span>
              <button
                type="button"
                onClick={handleNewDraft}
                className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
              >
                <SparklesIcon className="w-3 h-3" />
                <span>New Blank Draft</span>
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(event) => setNewProjectName(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleCreate()}
                placeholder="Project title..."
                className="flex-1 px-3.5 py-2 bg-zinc-800/90 border border-zinc-700 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              />
              <button
                type="button"
                onClick={handleCreate}
                disabled={!newProjectName.trim()}
                className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap shadow-xs"
              >
                {activeProject ? "Save Copy" : "Save Project"}
              </button>
            </div>
            {activeProject && (
              <p className="text-xs text-zinc-400">
                Active project: <span className="text-primary font-medium">{activeProject.name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto scrollbar-refined">
          {projects.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-3 border border-zinc-700/60">
                <FolderIcon className="w-6 h-6 text-zinc-500" />
              </div>
              <p className="text-zinc-400 text-sm font-medium">No saved projects yet</p>
              <p className="text-zinc-500 text-xs mt-0.5">Name and save your first project above</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60">
              {projects
                .sort((first, second) => second.updatedAt - first.updatedAt)
                .map((project) => {
                  const isActive = activeProject?.id === project.id;
                  const isEditing = editingIdentifier === project.id;

                  return (
                    <div
                      key={project.id}
                      className={cn(
                        "group flex items-center gap-3.5 px-5 py-3.5 transition-colors",
                        isActive ? "bg-primary/10" : "hover:bg-zinc-800/50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-2.5 h-2.5 rounded-full shrink-0",
                          isActive ? "bg-primary" : "bg-zinc-600"
                        )}
                      />

                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(event) => setEditingName(event.target.value)}
                            onBlur={handleConfirmRename}
                            onKeyDown={(event) => event.key === "Enter" && handleConfirmRename()}
                            autoFocus
                            className="w-full px-2 py-1 bg-zinc-800 border border-primary/50 rounded-lg text-sm text-zinc-100 focus:outline-none"
                          />
                        ) : (
                          <p
                            className={cn(
                              "text-sm font-medium truncate",
                              isActive ? "text-primary font-semibold" : "text-zinc-200"
                            )}
                          >
                            {project.name}
                          </p>
                        )}
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {project.selectedHair} • {project.layer} • {formatDate(project.updatedAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {!isActive && (
                          <button
                            type="button"
                            onClick={() => onLoadProject(project.id)}
                            className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                            title="Load Project"
                          >
                            <UploadIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleStartRename(project)}
                          className="p-1.5 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 rounded-lg transition-colors"
                          title="Rename"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDuplicateProject(project.id)}
                          className="p-1.5 text-zinc-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProject(project.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/60 shrink-0 text-center">
          <p className="text-[11px] text-zinc-400 font-mono">
            {projects.length} project{projects.length !== 1 ? "s" : ""} saved in local storage
          </p>
        </div>
      </div>
    </div>
  );
}
