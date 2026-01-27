"use client";

import React, { useState } from "react";
import { Project } from "@/hooks/use-editor-persistence";

interface ProjectsPanelProps {
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
}: ProjectsPanelProps) {
  const [newProjectName, setNewProjectName] = useState(defaultName);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleCreate = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName("");
    }
  };

  const handleNewDraft = () => {
    onCloseProject();
    onClose();
  };

  const handleStartRename = (project: Project) => {
    setEditingId(project.id);
    setEditingName(project.name);
  };

  const handleConfirmRename = () => {
    if (editingId && editingName.trim()) {
      onRenameProject(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName("");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <h2 className="text-lg font-semibold text-zinc-100">Projects</h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Session</span>
              <button
                onClick={handleNewDraft}
                className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors uppercase tracking-widest"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Draft
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(event) => setNewProjectName(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleCreate()}
                placeholder="Name your session..."
                className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
              />
              <button
                onClick={handleCreate}
                disabled={!newProjectName.trim()}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-zinc-900 font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                {activeProject ? "Save Copy" : "Save Project"}
              </button>
            </div>
            {activeProject && (
              <p className="text-xs text-zinc-500">
                Currently attached to: <span className="text-amber-500/80 font-medium">{activeProject.name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {projects.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <p className="text-zinc-500 text-sm">No projects yet</p>
              <p className="text-zinc-600 text-xs mt-1">Create your first project above</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/50">
              {projects
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((project) => {
                  const isActive = activeProject?.id === project.id;
                  const isEditing = editingId === project.id;

                  return (
                    <div
                      key={project.id}
                      className={`group flex items-center gap-4 px-6 py-4 transition-colors ${
                        isActive ? "bg-amber-500/10" : "hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-amber-500" : "bg-zinc-600"}`} />

                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(event) => setEditingName(event.target.value)}
                            onBlur={handleConfirmRename}
                            onKeyDown={(event) => event.key === "Enter" && handleConfirmRename()}
                            autoFocus
                            className="w-full px-2 py-1 bg-zinc-800 border border-amber-500/50 rounded text-sm text-zinc-100 focus:outline-none"
                          />
                        ) : (
                          <p className={`text-sm font-medium truncate ${isActive ? "text-amber-400" : "text-zinc-200"}`}>
                            {project.name}
                          </p>
                        )}
                        <p className="text-xs text-zinc-500 mt-1">
                          {project.selectedHair} • {project.layer} • Updated {formatDate(project.updatedAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!isActive && (
                          <button
                            onClick={() => onLoadProject(project.id)}
                            className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                            title="Load Project"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleStartRename(project)}
                          className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Rename"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDuplicateProject(project.id)}
                          className="p-1.5 text-zinc-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteProject(project.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
          <p className="text-xs text-zinc-500 text-center uppercase tracking-widest font-medium">
            {projects.length} project{projects.length !== 1 ? "s" : ""} saved locally
          </p>
        </div>
      </div>
    </div>
  );
}
