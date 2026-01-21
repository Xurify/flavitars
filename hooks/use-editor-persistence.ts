"use client";

import { useState, useEffect, useCallback } from "react";
import { PathCommand } from "@/lib/svg-editor/path-parser";
import { HairId } from "@/lib/avatar/parts/hair";
import { HatId } from "@/lib/avatar/parts/hats";

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  selectedHair: HairId;
  selectedHat: HatId;
  layer: "front" | "back";
  commands: PathCommand[];
}

interface ProjectsStore {
  version: number;
  activeProjectId: string | null;
  projects: Project[];
}

const STORAGE_KEY = "flavitar-svg-editor-projects-v1";
const DEFAULT_PROJECT_NAME = "Untitled Project";

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function getInitialStore(): ProjectsStore {
  return {
    version: 1,
    activeProjectId: null,
    projects: [],
  };
}

export function useProjectsPersistence() {
  const [store, setStore] = useState<ProjectsStore>(getInitialStore);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ProjectsStore = JSON.parse(saved);
        if (parsed.version === 1 && Array.isArray(parsed.projects)) {
          setStore(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Save to storage when store changes (with debounce tracking)
  useEffect(() => {
    if (!hasLoaded) return;
    
    setHasUnsavedChanges(true);
    setPendingSave(true);
    
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        setHasUnsavedChanges(false);
        setPendingSave(false);
      } catch (error) {
        console.error("Failed to save projects", error);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [store, hasLoaded]);

  // Only warn on close if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges || pendingSave) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, pendingSave]);

  const activeProject = store.projects.find((p) => p.id === store.activeProjectId) || null;

  const createProject = useCallback(
    (
      name: string,
      selectedHair: HairId,
      selectedHat: HatId,
      layer: "front" | "back",
      commands: PathCommand[]
    ): Project => {
      const newProject: Project = {
        id: generateId(),
        name: name || DEFAULT_PROJECT_NAME,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        selectedHair,
        selectedHat,
        layer,
        commands,
      };

      setStore((prev) => ({
        ...prev,
        activeProjectId: newProject.id,
        projects: [...prev.projects, newProject],
      }));

      return newProject;
    },
    []
  );

  const updateActiveProject = useCallback(
    (selectedHair: HairId, selectedHat: HatId, layer: "front" | "back", commands: PathCommand[]) => {
      if (!store.activeProjectId) return;

      setStore((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === prev.activeProjectId
            ? { ...p, selectedHair, selectedHat, layer, commands, updatedAt: Date.now() }
            : p
        ),
      }));
    },
    [store.activeProjectId]
  );

  const renameProject = useCallback((projectId: string, newName: string) => {
    setStore((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, name: newName, updatedAt: Date.now() } : p
      ),
    }));
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setStore((prev) => {
      const newProjects = prev.projects.filter((p) => p.id !== projectId);
      const newActiveId =
        prev.activeProjectId === projectId
          ? newProjects.length > 0
            ? newProjects[0].id
            : null
          : prev.activeProjectId;

      return {
        ...prev,
        activeProjectId: newActiveId,
        projects: newProjects,
      };
    });
  }, []);

  const loadProject = useCallback((projectId: string) => {
    setStore((prev) => ({
      ...prev,
      activeProjectId: projectId,
    }));
  }, []);

  const duplicateProject = useCallback((projectId: string) => {
    const project = store.projects.find((p) => p.id === projectId);
    if (!project) return;

    const newProject: Project = {
      ...project,
      id: generateId(),
      name: `${project.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setStore((prev) => ({
      ...prev,
      activeProjectId: newProject.id,
      projects: [...prev.projects, newProject],
    }));
  }, [store.projects]);

  return {
    projects: store.projects,
    activeProject,
    hasLoaded,
    createProject,
    updateActiveProject,
    renameProject,
    deleteProject,
    loadProject,
    duplicateProject,
  };
}
