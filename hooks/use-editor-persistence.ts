"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const storeRef = useRef<ProjectsStore>(store);
  
  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [wasManualSave, setWasManualSave] = useState(false);

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

  useEffect(() => {
    if (!hasLoaded) return;
    
    setHasUnsavedChanges(true);
    setPendingSave(true);
    
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        setHasUnsavedChanges(false);
        setPendingSave(false);
        setLastSavedAt(new Date());
        setWasManualSave(false);
      } catch (error) {
        console.error("Failed to save projects", error);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [store, hasLoaded]);

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

  const activeProject = store.projects.find((project) => project.id === store.activeProjectId) || null;

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

      setStore((prev) => {
        const next = {
          ...prev,
          activeProjectId: newProject.id,
          projects: [...prev.projects, newProject],
        };
        storeRef.current = next;
        return next;
      });

      return newProject;
    },
    []
  );

  const updateActiveProject = useCallback(
    (selectedHair: HairId, selectedHat: HatId, layer: "front" | "back", commands: PathCommand[]) => {
      const currentStore = storeRef.current;
      if (!currentStore.activeProjectId) return;

      const updatedStore: ProjectsStore = {
        ...currentStore,
        projects: currentStore.projects.map((project) =>
          project.id === currentStore.activeProjectId
            ? { ...project, selectedHair, selectedHat, layer, commands, updatedAt: Date.now() }
            : project
        ),
      };

      setStore(updatedStore);
      storeRef.current = updatedStore;
    },
    []
  );

  const renameProject = useCallback((projectId: string, newName: string) => {
    setStore((prev) => {
      const next = {
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === projectId ? { ...project, name: newName, updatedAt: Date.now() } : project
        ),
      };
      storeRef.current = next;
      return next;
    });
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setStore((prev) => {
      const newProjects = prev.projects.filter((project) => project.id !== projectId);
      const newActiveId =
        prev.activeProjectId === projectId
          ? newProjects.length > 0
            ? newProjects[0].id
            : null
          : prev.activeProjectId;

      const next = {
        ...prev,
        activeProjectId: newActiveId,
        projects: newProjects,
      };
      storeRef.current = next;
      return next;
    });
  }, []);

  const loadProject = useCallback((projectId: string) => {
    setStore((prev) => {
      const next = {
        ...prev,
        activeProjectId: projectId,
      };
      storeRef.current = next;
      return next;
    });
  }, []);

  const duplicateProject = useCallback((projectId: string) => {
    const currentStore = storeRef.current;
    const project = currentStore.projects.find((project) => project.id === projectId);
    if (!project) return;

    const newProject: Project = {
      ...project,
      id: generateId(),
      name: `${project.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setStore((prev) => {
      const next = {
        ...prev,
        activeProjectId: newProject.id,
        projects: [...prev.projects, newProject],
      };
      storeRef.current = next;
      return next;
    });
  }, []);

  const closeProject = useCallback(() => {
    setStore((prev) => {
      const next = {
        ...prev,
        activeProjectId: null,
      };
      storeRef.current = next;
      return next;
    });
  }, []);

  const saveNow = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storeRef.current));
      setHasUnsavedChanges(false);
      setPendingSave(false);
      setLastSavedAt(new Date());
      setWasManualSave(true);
    } catch (error) {
      console.error("Failed to save projects", error);
    }
  }, []);

  return {
    projects: store.projects,
    activeProject,
    hasLoaded,
    hasUnsavedChanges,
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
  };
}
